---
title: APCS 開啟寶盒 (zerojudge k734)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
mathjax: true
abbrlink: 29852
date: 2023-10-06 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=k734)

已知有$n$個寶盒編號$0$到$n-1$以及$m$種鑰匙編號$0$到$m-1$。一開始你有$t$種鑰匙分別為$x_1,..., x_t$  
每一個寶盒要打開都需要同時擁有$k$種鑰匙，第$i$個寶盒分別需要$r_{i1},r_{i2}, ... , r_{ik}$種類的鑰匙。每個寶盒打開後都會得到$k$種鑰匙，第個寶盒打開後分別會得到$s_{i1},s_{i2}, ... , s_{ik}$種類的鑰匙，當拿到新的鑰匙之後可以繼續開啟新的寶盒。保證寶盒內的鑰匙不會重複，並且每種鑰匙可以開啟的寶盒數量不超過$60$。  
請輸出最多可以開啟多少個寶盒。
{% endnote %}
<!--more-->

{% note info %}
解題思路：
我在這題使用了三個陣列分別代表以下意義：

1. 每個寶盒目前還需要幾個鑰匙才可以打開，初始化每個設為$k$  
2. 紀錄鑰匙可以打開哪些寶箱  
3. 紀錄寶箱打開後可以得到哪些鑰匙  

之後再將目前已有的鑰匙拿去開寶箱，因為有鑰匙對應寶箱的陣列，因此就把對應到的寶箱需開啟鑰匙數-1，若發現歸零就把他的鑰匙釋放出來繼續開新的寶箱，直到不能開為止。  

🌟第2、3兩個陣列可以使用vector會在實作上比較方便，另外在開寶箱的過程可以使用遞迴的方式撰寫會比較簡單
{% endnote %}

```c++ APCS 開啟寶盒
#include <bits/stdc++.h>

using namespace std;

vector<int> keys[100005]; //鑰匙索引可被開啟的
vector<int> keys_get[100005]; //開啟後得到的
int need_many_keys[100005], n ,m ,k;

void add_key(int num){
    while(!keys[num].empty()){
        int cur = keys[num].back(); keys[num].pop_back();
        need_many_keys[cur]--;
        if(!need_many_keys[cur])
            for(int i : keys_get[cur])
                add_key(i);
    }
}

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cin>>n>>m>>k;
    for(int i=0;i<n;i++) need_many_keys[i]=k;
    int ans = 0, now_key[100005], t;
    cin>>t;
    for(int i=0;i<t;i++) cin >> now_key[i];
    for(int i = 0; i< n;i++)
        for(int j = 0,tmp;j<k;j++)
            cin>>tmp, keys[tmp].push_back(i);
    for(int i = 0; i< n;i++)
        for(int j = 0,tmp;j<k;j++)
            cin>>tmp, keys_get[i].push_back(tmp);
    for(int i =0; i<t; i++) add_key(now_key[i]);
    
    for(int i = 0; i<n;i++) ans += (need_many_keys[i]<=0);
    cout<<ans<<'\n';
    return 0;
}
```

![AC的Submission～](https://i.imgur.com/RJ1Dm1y.png)
