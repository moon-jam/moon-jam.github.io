---
title: APCS 磁軌移動序列 (zerojudge k733)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 32441
date: 2023-09-29 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=k733)

你拿到一個磁帶和一串指令。磁帶上的指針初始位置為 10，我們將其表示為 T10。指令是一個由多個 T 和 loop 指令組成的字串，每個指令都會影響指針的移動。

T 指令的格式為 Txx，其中 xx 是兩位數的整數（10~99），代表指針從當前位置移動到 xx 所指示的位置。

除了 T 指令外，還有一個 loop 指令結構，其格式為 Lx...E，其中 x 是一位數的整數（1~9）。loop 指令允許重複執行一系列指令。loop 指令的開始標記為 Lx，結束標記為 E，指令序列位於這兩個標記之間。loop 指令可以嵌套，也就是說，一個 loop 指令的內部可以包含其他的 loop 指令。保證所有 loop 指令內一定會有至少一個 T 指令。

請寫一個程式，根據給定的指令串，計算指針總共移動的距離。

範例： 給定指令串：T10T15T23T23T22T22T44 指針總共移動的距離為：5 + 8 + 0 + 1 + 0 + 22 = 36
{% endnote %}
<!--more-->

{% note info %}
解題思路：
感覺起來這題有點像是有括號的四則運算，T之間就是加法和減法，L跟E之間是括號，L後面的數字就是乘法，不過實作上要注意的比較多，像是當L在當第一個的時候，L跟E中間的部分應該怎麼與前後串連起來，要是一個不小心，就會跟AC失之交臂。

🌟可以先把字串指令轉換成方便處理的格式，再用陣列或資料結構處理會比較方便
{% endnote %}

```c++ APCS 磁軌移動序列
#include <bits/stdc++.h>
#define int long long
#define piii pair<int,pair<int,int> >
#define sum first
#define first_num second.first
#define last_num second.second
#define out(s,f,l) make_pair(s,make_pair(f,l))
using namespace std;

queue<int> in;
char S[100006];

piii get_dis(){
    int dis=0, last = in.front(), _first = in.front();
    while(in.front()!=-1){
        int cur = in.front();
        in.pop();
        if(cur >= 10) dis+=abs(cur-last), last=cur;
        else{
            int time=cur;
            piii inside=get_dis();
            dis+=time*inside.sum+(time-1)*abs(inside.first_num-inside.last_num);
            if(_first<10) _first=inside.first_num;
            else dis+=abs(last-inside.first_num);
            last = inside.last_num;
        }
    }in.pop();
    return out(dis, _first, last);
}

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cin >> S;
    for(int i=0; S[i]; i++){
        if(S[i]=='T') in.push((S[i+1]-'0')*10+(S[i+2]-'0')),i+=2;
        if(S[i]=='L') in.push((S[i+1]-'0')),i+=1;
        if(S[i]=='E') in.push(-1);
    }in.push(-1);
    piii res = get_dis();
    cout << res.sum + abs(10 - res.first_num) << '\n';
    return 0;
}
```

![AC的Submission～](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/zerojudge_k733_upxnMfO.webp)
