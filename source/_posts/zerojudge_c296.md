---
title: APCS-2016-1029-3定時K彈 (zerojudge c296)
lang: zh-TW
tags:
  - APCS
  - 線段樹
  - 約瑟夫問題
categories:
  - 程式題解
  - APCS
mathjax: true
abbrlink: 52190
date: 2023-09-22 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=c296)

「定時 K彈」 是一個團康遊戲，N個人圍成一圈，由1號依序到N號，從1號開 始依序傳遞一枚玩具炸彈，每次到第M個人就會爆炸，此人即淘汰，被淘汰的人要離開圓圈，然後炸彈再從該淘汰者的下一個開始傳遞。遊戲之所以稱 K彈是因為這枚炸彈只會爆K次，在第 K次爆炸後，遊戲即停止，而此時在第K個淘汰者的下一位遊戲者被稱為幸運者，通常就會要求表演節目。  
輸入只有一行包含三個正整數，依序為N、M與 K，請輸出幸運者的號碼。
{% endnote %}
<!--more-->

{% note info %}
解題思路：

1. 直接模擬$O(N^2)$（有機會AC）  
   雖然依照這題的限制應該是絕對TLE，但實際試過之後還是有機會過的，可能是測資還不夠極限，總之這個方法就是假解。  
   實際來講，我的方法是找到最後剩下的個數，以及最後一圈走的步數，最後就可以知道誰是幸運者了，但因為我模擬時出局的人要花$O(N)$的時間erase，所以就會花上$O(KN)$的時間(K<N所以就寫成$O(N^2)$)，實際可以看底下的程式。  
2. 線段樹做$O(N log N)$（一定AC）  
   一樣直接模擬，但erase時間可以縮短至$O(log N)$  
3. 使用約瑟夫問題演算法$O(N)$（一定AC）  
   約瑟夫問題就等價這題$k=N-1$，也就是最後只剩下一個人的狀況，也就是70%的測資，那在講正確解前，就先說原始的約瑟夫問題，這個方法的邏輯是「倒推」，假設當你已經知道有$N-1$人時，留下來的那個人會是哪一號，那應該怎麼推得$N$人時，留下來的人是誰呢？可以看一下底下這張圖（以下會用0-base為說明，但實際是1-base，所以記得最後要+1）  
   ![N-1人的狀況](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/zerojudge_c296_yXB0sd2.webp)  
   我們不知道N個人誰會是幸運者，但是我們可以知道$m-1$號（從0開始所以第$m$個人是$m-1$號）會在第一輪出局，這時候想想看，那個人出局後就變成$N-1$人了！那出局後的狀況跟上一張圖之間有什麼差別，有什麼辦法可以將一人出局後的狀況轉換到$N-1$人的狀況呢？  
   ![N人時m-1人在第一局會被淘汰](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/zerojudge_c296_ZNeXqkN.webp)  
   ❗️把出局後那個人的下一個人當成是$N-1$狀況$0$的位置，旋轉看看！  
   ![恭喜～](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/zerojudge_c296_OzH0NI7.webp)  
   把$m$號對齊$0$號就可以找到幸運人的位置（暫且先叫他$Y$），可以簡單看一下就知道，原先$N-1$圖的每個人會相較外圈對齊的數字少$m$，因此$Y$就會是$X+m$(另外要注意如果加$m$超過$N$的話要再繞回來，就是對$X+m$取其除以$N$的餘數)
   因為知道最後剩下一個人的狀況就是自己當一個圈且編號是0，那麼就可以列出一遞迴式
   $$f(N)=(f(N-1)+m) mod N, f(1)=0$$  
   那麼當$k \neq N-1$時，可以再把$k$加入判斷條件，將$N$人$k$次爆炸轉換成$N-1$人$k-1$次爆炸，一樣的，每個人會被往後挪$m$格，那終端條件呢？$N-K$人爆炸0次時！  
   那這時的幸運者就是$0$！（因為爆炸$0$次，或者倒過來講就是$N-k+1$時$m-1$號的下一個$m$號，前一圈會比後一圈多$m$，所以當然就是$0$了），而我們也可以藉此推出以下這個遞迴式  
   $$f(N,k)=(f(N-1,k-1)+m) mod N, f(N-k,0)=0, k<N$$  
   到這邊應該就知道如何快速解決這題了！

🌟 如果有時間的話可以用線段樹解法寫寫看，不然直接用約瑟夫問題的方法一下就解決了，這樣不夠有趣🫠
{% endnote %}

```c++ 模擬法 O(N^2)
//https://zerojudge.tw/ShowProblem?problemid=c296
#include <bits/stdc++.h>
using namespace std;

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    // 直到最後還沒淘汰的
    vector<int> available_num;
    // 最後一圈時要走幾步才是那個被淘汰的，要先剪掉最後一圈被淘汰的人
    int step=-1, n, m ,k;
    cin >> n >> m >> k;
    for(int i = 1; i<=n; i++) available_num.push_back(i);
    for(int i = 0; i<k; i++){
        step = (step+m)%available_num.size();
        vector<int>::iterator it = available_num.begin()+step;
        // cout << *it << '\n';
        available_num.erase(it);
        step--;
    }
    cout << available_num[(step+1)%available_num.size()] << '\n';
    return 0;
}
```

```c++ 模擬＋線段樹 O(N log N)
#include <bits/stdc++.h>
#define N 200005
using namespace std;

int sg[4*N];
// sg[idx]的右界
int sg_R[4*N];

void build(int l, int r, int idx){
    if(r-l==1){
        sg[idx]=1,sg_R[idx]=r;
        return;
    }
    int mid = (r+l)/2;
    build(l,mid,idx*2), build(mid,r,idx*2+1);
    sg[idx]=sg[idx*2]+sg[idx*2+1], sg_R[idx]=r;
}

void del(int l, int r, int idx, int del_pos){
    sg[idx]--;
    if(r-l==1) return;
    int mid = (l+r)/2;
    if(del_pos<mid) del(l,mid,idx*2,del_pos);
    else del(mid,r,idx*2+1,del_pos);
}

//找第k大的idx
int search_bigger_idx(int l, int r, int idx, int order){
    if(r-l==1) return idx;
    int mid = (r+l)/2;
    if(sg[idx*2]>=order) {
        return search_bigger_idx(l, mid, idx*2, order);
    }
    else return search_bigger_idx(mid, r, idx*2+1, order-sg[idx*2]);
}

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0); 
    int n, m ,k, step=0;
    cin >> n >> m >> k;
    build(0,n,1);
    for(int i = 0; i<k; i++){
        step = (step+m)%sg[1];
        if(step==0) step=sg[1];
        int idx = search_bigger_idx(0,n,1,step);
        del(0,n,1,sg_R[idx]-1);
        step--;
    }
    step = (step+1)%sg[1];
    if(step==0) step=sg[1];
    // 應該會是該位置的右界-1，但因為要從0-base轉1-base還要+1，所以就抵銷了
    cout << sg_R[search_bigger_idx(0,n,1,step)] << '\n';
    return 0;
}
```

```c++ 約瑟夫問題演算法O(N)
#include <bits/stdc++.h>
using namespace std;

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0); 
    int ans=0, n, m ,k;
    cin >> n >> m >> k;
    for(int i = n-k+1; i<=n; i++) ans=(ans+m)%i;
    cout << ans+1 << '\n';
    return 0;
}

```

AC的Submission們～
![AC假解O(N^2)](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/zerojudge_c296_AYYXaEc.webp)
![線段樹O(N log N)](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/zerojudge_c296_gOl4OLM.webp)
![約瑟夫演算法O(N)](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/zerojudge_c296_NqPLLat.webp)
