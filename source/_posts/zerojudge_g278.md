---
title: APCS 美食博覽會 (zerojudge g278)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 34057
date: 2023-09-25 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=g278)

在一個美食博覽會上，有$n$個攤位在販售美食，已知每個攤位只會販售一種美食，且他們販售的美食依序是$a1,a2,…,an$，其中可能會有某些攤位販售相同種類的美食。

國王及大臣們總共$k$人要依序品嚐所有美食，已知每位品嚐員會選擇一段連續的攤位進行試吃，而每個人都不想要試吃到同一種自己曾經吃過的美食，因此一位品嚐員所選到的範圍不能有同一種美食重複出現。另外，品嚐員們都不喜歡被別人打擾用餐，所以任意兩個品嚐員所選到的連續區間必須是沒有重疊的。

給你$n$,$k$，以及這$n$個攤位分別販售的美食編號，請計算出這些試吃員們總共最多可以吃到幾攤的美食？
{% endnote %}
<!--more-->

{% note info %}
解題思路：
先從50%的測資數來想，$k=1$時應該怎麼做，這時要解的問題就變成，最大不重複子序列，可以再轉換成以第$i$為開頭往後幾項不重複！（最後再找多不重複的就好），可能還是不知道怎麼做嗎？  
我的想法是從最後一項開始做，因為以最後一項為開頭，一定就只有一項不重複（因為它也沒有後面的了），接下來倒數第二項就是看他跟倒數第一項是不是一樣，倒數三項就是看它跟前兩項一不一樣，那倒數第$i$項要怎麼求呢？如果一項項比對會花到$O(N^2)$的時間，因此我這裡使用了一個資料結構，Queue，具體來說從$n-1$開始往前推(我使用0-base)，如果該項沒有出現在Queue中，就把那項推進去，而已那項為開頭的不重複連續子字串就會是Queue的長度（把自己推進去後），而如果發現自己的號碼就已經在裡面的話，就把Queue一項一項pop掉，直到Queue裡面沒有跟自己一樣的號碼，那要怎麼在$O(1)$時間內判斷自己有沒有在Queue內呢？可以自己先想一想，最後有給出一個方法，而如此一來因為Queue最多就是裝下$n$個數字，所以最多也就只會pop$n$次，如此一來，就可以確定此方法能在$O(n)$內完成。  

接下來要解決$k \neq 1$的狀況，這邊我使用動態規劃，開一個$dp[k][n]$大小的陣列，$dp[i][j]$代表i個人從$0～j$可以吃多少的攤位，因此最後答案就會是$dp[k][n-1]$，首先我們可以先從前面提到$k = 1$將$dp[1][j]$全部填滿，接著因為$i$個人吃，最少就會有$i$個攤位，因此還會有$dp[j][j-1]=j$，接著接下來就可以進行狀態轉移了：  

1. 假設$dp[i][j]$的第$j$不選  

   $$dp[i][j] = max(dp[i][j], dp[i][j-1])$$

2. 假設$dp[i][j]$的第$j$選  

   $$dp[i][j+len[j]-1] = max(dp[i+1][j+len[j]-1], dp[i][j-1]+len[j])$$

(len[i]表示以i為開頭的最大不重複子序列長度)  

🌟可以開一個vis陣列，以vis[i]表示i有沒有在連續部分  
🌟$dp[1][j]$可以在一開始推最大不重複子序列時先設定好部分內容

$$dp[1][j+num[j]-1]=max(dp[1][j+num[j]-1],num[j])$$

然後再利用動態規劃狀態轉移時$dp[i][j] = max(dp[i][j], dp[i][j-1])$完成整組$dp[1][j]$  
{% endnote %}

```c++ 美食博覽會 - 50%
#include <bits/stdc++.h>

using namespace std;
//len[i]代表第i個攤位為開頭可以往後吃多遠都不重複
int len[1000006], num[1000006], n, k;
//用一個queue從後面開始裝，同時用vis[i]代表在queue內存不存在
queue<int> q;
bool vis[1000006];

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cin >> n >> k;
    for(int i =0;i < n; i++) cin >> num[i];
    q.push(num[n-1]),vis[num[n-1]]=1;
    int max_len=0;
    for(int i = n-2; i>=0; i--){
        while(vis[num[i]] && !q.empty())
            vis[q.front()]=0, q.pop();
        q.push(num[i]),vis[num[i]]=1;
        len[i]=q.size(), max_len=max(len[i], max_len);
    }
    cout<<max_len<<'\n';
    return 0;
}
```

```c++ 美食博覽會 - 100%
#include <bits/stdc++.h>

using namespace std;
//len[i]代表第i個攤位為開頭可以往後吃多遠都不重複
//dp[i][j]代表i個人從0~j可以吃多少
int len[1000006], num[1000006], n, k, dp[22][1000006];
//dp[i][j] = max(dp[i][j], dp[i][j-1])
//dp[i+1][j+len[j]-1] = max(dp[i+1][j+len[j]-1], dp[i][j-1]+len[j])
//dp[j][j-1]=j
//用一個queue從後面開始裝，同時用vis[i]代表在queue內存不存在
queue<int> q;
bool vis[1000006];

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    memset(dp, 0, sizeof(dp));
    cin >> n >> k;
    for(int i =0;i < n; i++) cin >> num[i];
    q.push(num[n-1]),vis[num[n-1]]=1;
    for(int i = n-2; i>=0; i--){
        while(vis[num[i]] && !q.empty())
            vis[q.front()]=0, q.pop();
        q.push(num[i]),vis[num[i]]=1;
        len[i]=q.size();
        dp[1][i+len[i]-1]= max(dp[1][i+len[i]-1], len[i]);
    }
    for(int i = 1; i<=k; i++){
        dp[i][i-1]=i;
        for(int j = i;j<n; j++){
            dp[i][j] = max(dp[i][j], dp[i][j-1]);
            dp[i+1][j+len[j]-1] = max(dp[i+1][j+len[j]-1], dp[i][j-1]+len[j]);
        }
    }
    cout<<dp[k][n-1]<<'\n';
    return 0;
}
```

![AC的Submission～](https://i.imgur.com/EnpZEkz.png)
