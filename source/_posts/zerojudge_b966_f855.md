---
title: APCS 線段覆蓋長度 (zerojudge b966/f855)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
abbrlink: 51954
date: 2023-09-15 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=b966)([測資加強版](https://zerojudge.tw/ShowProblem?problemid=f855))

給定一維座標上一些線段，求這些線段所覆蓋的長度，注意，重疊的部分只能算一次。
例如給定4個線段(5, 6)、(1, 2)、(4, 8)、(7, 9)，如下圖，線段覆蓋長度為6(包含1～2、4～9)。
![覆蓋了1~2、4~9共6個格子](https://i.imgur.com/Oq742JS.png)
{% endnote %}
<!--more-->

{% note info %}
解題思路：
如果直接開個陣列記錄每格格子走過了沒，最後再去檢查，但時間複雜度會是O(NL)會到10^11次方(L代表覆蓋範圍)，肯定會TLE，改成用priority queue（Heap）去存輸入，讓左界是由小到大排列（或者可以一開始用陣列儲存之後再sort，時間複雜度一樣不變是O(N log N)），並紀錄目前右界最大值，就可以確定後續資料的左界不會比前面的小，並用result紀錄目前覆蓋的格子數，這樣只要判斷以下兩種狀況

1. 輸入的左界目前右界最大值還大：將result加上整段區間長度，並更新右界最大值為輸入的右界
2. 輸入的左界目前右界最大值小且輸入的右界也比前右界最大值大：將result加上輸入右界到目前最大值的範圍，並更新右界最大值為輸入的右界
（若輸入的左界目前右界最大值小且輸入的右界也比前右界最大值小，則目前這個區間都在目前已涵蓋的格子內）

而如此一來就可以讓時間複雜度小至O(N log N)，能夠在題目給定時間內完成

🌟 可以搭配pair使用會比較方便
{% endnote %}

```c++ APCS 線段覆蓋長度 
#include <bits/stdc++.h>
#define pii pair<int, int>
#define l first
#define r second
using namespace std;

priority_queue<pii, vector<pii>, greater<pii> > pq;
int n;

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cin>> n;
    for(int i = 0, tmp1, tmp2; i<n; i++)
        cin >> tmp1 >> tmp2, pq.push(make_pair(tmp1, tmp2));
    int max=pq.top().l, result=0;
    while(!pq.empty()) {
        pii cur = pq.top();
        pq.pop();
        if(cur.r<=max) continue;
        else if(cur.first<=max) result+=cur.r-max, max=cur.r;
        else result+=(cur.r-cur.l), max=cur.r;
    }

    cout << result << '\n';
    
    return 0;
}

```

![AC的Submission～](https://i.imgur.com/iXeRWtQ.png)
![zerojudge f855 測資加強版](https://i.imgur.com/f5e2FHF.png)
