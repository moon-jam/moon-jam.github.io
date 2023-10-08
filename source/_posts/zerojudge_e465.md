---
title: APCS置物櫃分配 (zerojudge e465)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 14276
date: 2023-10-08 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=e465)

你是個櫃子租借商，總共擁有 M 個櫃子。
現在這 M 個櫃子分別被 N 個人借用，借用量分別為 (x0, x1, x2, ...xN-1) 個櫃子，
其中 x0 + x1 + x2 + ... + xN-1 ≤ M

現在你想要使用 S 個空櫃子，
在被借用的櫃子只能夠 全退 或 全不退之下，最少需要請這 N 個人退還多少櫃子？
也就是當有一個人借用 10 個櫃子時，不能夠只請他退還 5 個櫃子。
{% endnote %}
<!--more-->

{% note info %}
解題思路：
這題我的做法是先整理出哪些櫃子數量可以由數個x相加而成，然後再找大於等於需要櫃子量的最小值，不過這樣依照題目給定的N、M範圍應該是過不了的，在最糟狀況下會是$O(N^2+M)$，只是試了之後是可以AC的，後來看別人的解法是用01背包問題解，但也會到$O(MN)$，如果這題要過應該是比較像[中一中judge上的這題](https://judge.tcirc.tw/ShowProblem?problemid=d075)，不過輸入順序不同，需要稍微修改。

🌟題目給的S是需要的空櫃子，但事實上那些人要給你的數量只有S-(M-total_x)，total_x表示所有x的和，也就是說，如果S-(M-total_x)是負的，那就代表你不需要請人退櫃子，因為你已經有足夠的空櫃子了，而當正的時候，就是你需要請人退櫃子的數量。
{% endnote %}

```c++ APCS置物櫃分配
#include <bits/stdc++.h>

using namespace std;

int n, m, s, total_x=0, x[100005];
bool add[100005];
vector<int> add_history;
//add[i] 表示x陣列是否能任意選取使得加總為i
//將題目轉換判斷x陣列是否能任意選取使得加總為k，再遍歷整個陣列找大於等於需要量的最小值

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    memset(add,0,sizeof(add));
    cin>> m>> s >> n;
    for(int i = 0; i<n; i++) cin >> x[i], total_x+=x[i];
    add_history.push_back(0), add[0]=1;
    for(int i = n-1;i>=0;i--){
        vector<int> new_history;
        for(int num : add_history){
            int cur = num+x[i];
            if(!add[cur]) add[cur]=1, new_history.push_back(cur);
        }for(int num : new_history) add_history.push_back(num),add[num]=1;
    }

    s -= (m-total_x); //s表示還需要的櫃子數量
    if(s<=0){
        cout << 0 << '\n';
    }else{
        for(int i = s;i<=total_x; i++)
            if(add[i]){
                cout << i << '\n'; break;
            }
    }

    return 0;
}
```

![AC的Submission～](https://i.imgur.com/UkCAPWE.png)
![中一中judge AC的Submission～](https://i.imgur.com/95B9Abz.png)
