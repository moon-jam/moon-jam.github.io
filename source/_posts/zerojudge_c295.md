---
title: APCS-2016-1029-2最大和 (zerojudge c295)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 50086
date: 2023-09-18 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=c295)

給定N群數字，每群都恰有M個正整數。若從每群數字中各選擇一個數字 (假設第 i群所選出數字為ti)，將所選出的N個數字加總即可得和 S = t1+t2+…+ +…+ tN。請寫程式計算 S的最大值 (最大總和 )，並判斷各群所選出的數字是否可以整除 S。
{% endnote %}
<!--more-->

{% note info %}
解題思路：  
就是找到每一群裡最大的然後加起來，再一一檢查哪些可以被整除，這題N、M都給<20，可以放心做，不用超時問題

🌟可以在一開始接收數據時就把最大值抓出來，其他的就直接丟掉不用理他，後面會需要用到的也都只有每一個群裡面的最大值而已，這樣會比較簡單
{% endnote %}

```c++ APCS-2016-1029-2最大和
#include <bits/stdc++.h>

using namespace std;

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n,m,max_nums[22],s=0;
    cin >> n >> m;
    for(int i = 0,max_=0; i<n; i++,max_=0){
        for(int j=0,tmp; j<m; j++)
            cin>>tmp, max_=max(max_,tmp);
        s+=max_,max_nums[i]=max_;
    }cout<<s<<'\n';
    bool first=0;
    for(int i = 0; i<n; i++){
        if(s%max_nums[i]==0&&!first) cout<<max_nums[i],first=1;
        else if(s%max_nums[i]==0) cout<<' '<<max_nums[i];
    }if(!first) cout<<-1;
    return 0;
}

```

![AC的Submission～](https://i.imgur.com/38CuDQa.png)
