---
title: 圖論（c++）
lang: 
tags:
  - 圖論
  - 演算法
categories:
  - 演算法
  - 圖論
date: 2023-10-27
hidden : true
---

## 拓樸排序

``` c++ 拓樸排序
const int N = 1E5 + 5;
vector<int> edge[N];

void Topological_sort(int V){
    vector<int> res;
    int enter_deg[N];
    memset(enter_deg, 0, sizeof(enter_deg));
    for(int i = 0; i < V; i++)
        for(int cur : edge[i])
            enter_deg[cur]++;
    priority_queue<int, vector<int>, greater<int>> q;
    for(int i = 0; i<V; i++)
        if(enter_deg[i]==0)
            q.push(i);
    while(!q.empty()){
        int cur = q.top(); q.pop();
        res.eb(cur);
        for(int ch : edge[cur]){
            if(--enter_deg[ch] == 0)
                q.push(ch);
        }
    }
    bool is_dag=true;
    for(int i = 0; i<V; i++)
        if(enter_deg[i]!=0)
            is_dag=false;
    if(is_dag==false) cout << "QAQ\n";
    else for(int i : res){
        cout << i;
        if(i!=res.back())
            cout << ' ';
        else
            cout << '\n';
    }
}
```

## 最小生成🌲

## 最短路徑

## 寫點題目

[neoj165](https://neoj.sprout.tw/problem/165/)
[neoj391](https://neoj.sprout.tw/problem/391/)
[neoj431](https://neoj.sprout.tw/problem/431/)
[neoj734](https://neoj.sprout.tw/problem/734/)
[neoj394](https://neoj.sprout.tw/problem/394/)
[neoj375](https://neoj.sprout.tw/problem/735/)
[neoj736](https://neoj.sprout.tw/problem/736/)
[neoj179](https://neoj.sprout.tw/problem/179/)
[neoj183](https://neoj.sprout.tw/problem/183/)
[neoj184](https://neoj.sprout.tw/problem/184/)
[neoj739](https://neoj.sprout.tw/problem/739/)
[neoj737](https://neoj.sprout.tw/problem/737/)
[neoj738](https://neoj.sprout.tw/problem/738/)

[2022附中校內賽PD](https://codeforces.com/gym/401059/problem/D)

[2022 師大附中暑期資訊培訓模擬競賽I PB](https://codeforces.com/gym/401057/problem/B)

[2022 師大附中暑期資訊培訓模擬競賽II PC](https://codeforces.com/gym/401058/problem/C)

[2020花中一模](https://codeforces.com/group/GG44hyrVLY/contest/297533/problem/E)
