---
title: APCS 2017-0304-2小群體
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
abbrlink: 55864
date: 2023-09-12 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=c291)

Q同學正在習程式， P老師出了以下的題目讓他練習。
一群人在一起時經常會形成一個一個的小群體。假設有 N個人，編號由 0到 N-1，每個人都寫下他最好朋友的編號（最好朋友有可能是他自己的編號，如果他自己沒有其他好友）， 在本題中，每個人的好友編號絕對不會重複，也就是說0到 N-1每個數字 都恰好出現一次。
本題的問題是：按照順序輸入每個人好友編號，計算出總共有幾小群體。
{% endnote %}
<!--more-->

{% note info %}
解題思路：
這題剛看完之後一開始想到用併查集(Disjoint-set)，後來發現我想太多，我後來用dfs遍歷看會不會重複拜訪到就完成了。

🌟可以看成是好幾顆聯通的節點，題目問的就是看說總共有幾群節點，因為有規定數字不會重複，所以當出現環（子孫接回祖先的時候），就代表這個群體結束了
{% endnote %}

```c++ APCS 2017-0304-2小群體
#include <bits/stdc++.h>
#define Max 50005

using namespace std;

bool vis[Max];
int people[Max];
int group = 0;

void dfs(int i){
    if(vis[i]) return;
    vis[i] = true;
    if(vis[people[i]])
        group++;
    dfs(people[i]);
}

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    memset(vis,0, sizeof(vis));
    int n;
    cin >> n;
    for(int i = 0; i< n; i++) cin >> people[i];
    for(int i = 0; i< n; i++) dfs(people[i]);
    cout << group << '\n';
    return 0;
}
```

![AC的Submissions～](https://i.imgur.com/EX8G4n9.png)
