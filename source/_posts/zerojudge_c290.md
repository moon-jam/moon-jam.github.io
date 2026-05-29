---
title: APCS 2017-0304-1秘密差 (zerojudge c290)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 5961
date: 2023-09-14 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=c290)

將一個十進位正整數的奇數位數的和稱為A ，偶數位數的和稱為B，則A與B的絕對差值 |A －B| 稱為這個正整數的秘密差。
例如： 263541 的秘密差是 |(6+5+1) － (2+3+4)|= 3 。
給定一個 十進位正整數 X，請找出 X的秘密差。
{% endnote %}
<!--more-->

{% note info %}
解題思路：  
就直接做，不用什麼特別的技巧

🌟用string讀輸入，方便讀取奇位數跟偶位數的值
{% endnote %}

```c++ APCS 2017-0304-1秘密差
#include <bits/stdc++.h>

using namespace std;

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    string input;
    cin >> input;
    int odd = 0, even = 0;
    for(int i = 0; input[i]; i++){
        if(i%2) even += input[i]-'0';
        else odd += input[i]-'0';
    }
    cout << abs(odd-even) << '\n';
    return 0;
}
```

![AC的Submission～](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/zerojudge_c290_vMzsXX4.webp)
