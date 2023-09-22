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
date: 2023-09-22
mathjax: true
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


🌟 如果有時間的話可以順便練一下線段樹解法，蠻有趣的
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
![AC假解O(N^2)](https://i.imgur.com/AYYXaEc.png)
![線段樹O(N log N)](https://i.imgur.com/gOl4OLM.png)
![約瑟夫演算法O(N)](https://i.imgur.com/NqPLLat.png)
