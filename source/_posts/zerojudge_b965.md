---
title: APCS 矩陣轉換
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
abbrlink: 28531
date: 2023-09-13 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=b965)

矩陣是將一群元素整齊的排列成一個矩形，在矩陣中的橫排稱為列 (row) ，直排稱為行 (column) ，其中以 Xij 來表示 矩陣X 中的第 i 列第 j 行的元素。
我們可以對矩陣定義兩種操作如下：
　　翻轉：即第一列與最後一列交換、第二列與倒數第二列交換、… 依此類推。
　　旋轉：將矩陣以順時針方向轉 90 度。
一個 矩陣A 可以經過一連串的旋轉與翻轉操作後，轉換成 新矩陣B 。
給定 矩陣B 和一連串的操作，請算出原始的 矩陣A 。
{% endnote %}
<!--more-->

{% note info %}
解題思路：
這題題目測資範圍R,C,M都小於10，如果直接做的話複雜度應該就是O(RCM)（就是按照題目的意思把輸入的矩陣反著操作），限制2s應該是可以順利通關

🌟因為是要從B推回原先的矩陣，因此需要將輸入指令倒著走一次（例如原本是A矩陣翻轉、翻轉、順時針旋轉90度得到B矩陣，就要將B矩陣逆時針旋轉90度、翻轉、翻轉，才能變成原先的A矩陣），因此現在問題就只剩下如何完成翻轉和逆時針旋轉90度了
1. 翻轉：這邊是指上下翻轉，因此較為簡單，只要將第i列第j行的元素跟第(c-i)列第j行的元素交換即可，且其中i跟(c-i)會在一半的地方交會，且在c是奇數時(c+1)/2的那行可以不做任何操作，因此讓i從0~c/2執行過一次即可
2. 逆時針旋轉90度：這個稍微難一點，可以想做事將左上角固定，逆時針旋轉90度，如此一來可以發現就是將(i,j)位置的元素移動到(r-j-1,i)
![Image](https://i.imgur.com/nLZVb9U.png)
{% endnote %}

```c++ b965. 第 2 題 矩陣轉換
#include <bits/stdc++.h>
using namespace std;

int arr[11][11];
int c,r,m;

void turn(){
    int tmp[11][11];
    for(int i = 0; i<c; i++)
        for(int j = r-1; j>=0; j--)
            tmp[r-1-j][i]=arr[i][j];
    swap(c,r);
    for(int i = 0; i< c; i++)
        for(int j = 0; j<r; j++)
            arr[i][j] = tmp[i][j];
}

void reverse(){
    for(int i = 0; i<c/2; i++)
        for(int j = 0; j<r; j++)
            swap(arr[i][j], arr[c-1-i][j]);
}

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    while(cin >> c >> r >> m){
        for(int i = 0; i< c; i++)
            for(int j = 0; j<r; j++)
                cin >> arr[i][j];
        bool cmd[11];
        for(int i = 0; i<m; i++) cin >> cmd[i];
        for(int i = m-1; i>=0; i--){
            if(cmd[i]) reverse();
            else turn();
        }
        cout << c << ' ' << r << '\n';
        for(int i = 0; i< c; i++){
            for(int j = 0; j<r; j++){
                cout << arr[i][j];
                if(j<r-1) cout << ' ';
            }
            cout << '\n';
        }
    }
    return 0;
}
```
