---
title: APCS-2016-1029-1三角形辨別 (zerojudge c294)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 59785
date: 2023-09-21 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=c294)

三角形除了是最基本的多邊形外，亦可進一步細分為鈍角三形、直角三角形及銳角三角形。若給定三個線段的長度，透過下列公式運算，即可得知此三線段能否構成三角形，亦可判斷是直角、銳角和鈍角三角形。
提示：若a、b、c為三個線段的邊長，且c為最大值，則  
　　若 a+b ≦ c　　　　　，三線段無法構成三角形  
　　若 a×a+b×b ＜ c×c　　，三線段構成鈍角三角形(Obtuse triangle)  
　　若 a×a+b×b ＝ c×c　　，,三線段構成直角三角形(Right triangle)  
　　若 a×a+b×b ＞ c×c　　，三線段構成銳角三角形(Acute triangle)  
請設計程式以讀入三個線段的長度判斷並輸出此三線段可否構成三角形？若可，判斷 並輸出其所屬三角形類型。
{% endnote %}
<!--more-->

{% note info %}
解題思路：
直接按照題目敘述判斷是哪一種三角形即可。

🌟如果不想要自己比三個數字的話可以開個陣列儲存然後sort一下就好了
{% endnote %}

```c++ 三角形辨別
#include <bits/stdc++.h>

using namespace std;

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    int arr[4];
    cin >> arr[0] >> arr[1] >> arr[2];
    sort(arr, arr+3);
    cout << arr[0] << ' ' << arr[1] << ' ' << arr[2] << '\n';
    if(arr[0]+arr[1]<=arr[2]) cout << "No\n";
    else if(arr[0]*arr[0]+arr[1]*arr[1]<arr[2]*arr[2]) cout << "Obtuse\n";
    else if(arr[0]*arr[0]+arr[1]*arr[1]==arr[2]*arr[2]) cout << "Right\n";
    else if(arr[0]*arr[0]+arr[1]*arr[1]>=arr[2]*arr[2]) cout << "Acute\n";

    return 0;
}

```

![AC的Submission～](https://i.imgur.com/Sb1KHnS.png)
