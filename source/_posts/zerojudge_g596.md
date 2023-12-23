---
title: APCS 動線安排 (zerojudge g596)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 26992
date: 2023-12-23 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=g596)

你是一個遊樂園展場的管理員，展場是一個$m\times n$的矩形，可以使用木樁和線來排動線，你可以有兩種操作

- 加入木樁 r c 0  
  加一木樁在 , 並且向他的上下左右盡量找離最近的木樁連線, 題目保證 $(r,c)$ 上一定沒有木樁, 若 $(r,c)$ 有線經過則先將那些線拆掉後再來連線  
- 移除木樁 r c 1  
  $(r,c)$ 拔木樁, 並把他的線也拔掉, 保證 $(r,c)$ 上一定有木樁  

總共有 $h$ 次操作，輸出過程中有線和有木樁佔據空間的面積最大是多少, 以及 $h$ 次操作後有線和有木樁佔據空間的面積
{% endnote %}
<!--more-->

{% note info %}
解題思路：  
<span id="inline-yellow">狀態</span>
每個格子存在的5種狀況(空的、木樁、直線、橫線、交線)用五個數字表示：0、1、2、3、5(交線用5是因為後面實作連線和拔線的時候，可以直接用加或減，讓一條線的狀態轉移到交線，或將交線的狀態轉移到一條線)

<span id="inline-yellow">算面積</span>
遍歷整張圖的每個格子，若該格子的狀態不為0，則將面積加一(因為最後要輸出過程中最大面積，因此我多開一個變數$max\_cnt$紀錄)
{% details mode:close 程式碼 %}

```c++ 算面積
int cnt() {
    int c = 0;
    rep(i, 0, n - 1) rep(j, 0, m - 1) c += (g[i][j] != 0);
    tomax(max_cnt, c);
    return c;
}
```

{% enddetails %}
<p></p>  
  
<span id="inline-yellow">拔木樁</span>
先把該點木樁拔掉(設為0)，再往四個方向找線，如果有線就將跟目前前進方向相同的線拔掉(假設目前是往上找，如果確認這個點是線，那就將那個點的狀態減2，因此該點是直線會變0(空的)，交線則變3(橫線))
{% details mode:close 程式碼 %}

```c++ 拔木樁
void rm(int x, int y) {
    g[x][y] = 0;
    int dir_x[] = {0, 1, 0, -1}, dir_y[] = {1, 0, -1, 0};
    rep(d, 0, 3) {
        int _x = x, _y = y;
        while (g[_x += dir_x[d]][_y += dir_y[d]] == (2 + d % 2) || g[_x][_y] == 5)
            g[_x][_y] -= (2 + d % 2);
    }
}
```

{% enddetails %}
<p></p>  
  
<span id="inline-yellow">建木樁</span>
先將指定點的狀態設為1，接著往四個方向找木樁，如果確認有木樁就建線，建線的作法跟拔線相似(假設目前是往上找，如果目前點的狀態是2(直線)或0(空的)那就設成2，如果狀態是3(橫線)就設成5(交線)，而如果狀態是5就不改變)
{% details mode:close 程式碼 %}

```c++ 建木樁
void build(int x, int y) {
    g[x][y] = 1;
    int dir_x[] = {0, 1, 0, -1}, dir_y[] = {1, 0, -1, 0};
    rep(d, 0, 3) {
        int _x = x, _y = y;
        bool ok = false;
        while ((_x + dir_x[d]) < n && (_x + dir_x[d]) >= 0 &&
               (_y + dir_y[d]) < m && (_y + dir_y[d]) >= 0)
            if (g[_x += dir_x[d]][_y += dir_y[d]] == 1) ok = true;
        if (!ok) continue;
        _x = x, _y = y;
        while (g[_x += dir_x[d]][_y += dir_y[d]] != 1)
            if (g[_x][_y] == 2 + (d + 1) % 2)
                g[_x][_y] = 5;
            else if(g[_x][_y] != 5)
                g[_x][_y] = (2 + d % 2);
    }
}
```

{% enddetails %}
<p></p>  
  
<span id="inline-yellow">主程式</span>
有前面那些函式後就簡單了，讀輸入然後呼叫建木樁或拔木樁，最後再輸出答案就完成了
{% details mode:close 程式碼 %}

```c++ 主程式
signed main() {
    ios;
    cin >> n >> m >> h;
    memset(g, 0, sizeof(g));
    while (h--) {
        int x, y, cmd;
        cin >> x >> y >> cmd;
        if (cmd)
            rm(x, y);
        else
            build(x, y);
        cnt();
    }
    cout << max_cnt << '\n' << cnt() << '\n';
    return 0;
}
```

{% enddetails %}
<p></p>
🌟 要注意的是線有分成直向和橫向，直的被刪掉之後橫的不會被刪掉，若一個格子內同時存在直線和橫線，在刪掉其中一個的時候，另一個方向的線還要繼續存在，另外就是新的木樁放上去之後，不管原先那個格子上的線是什麼，會直接被刪掉，然後再由那個木樁往四個方向連線(~~我就因為這樣修了兩次bug🥲~~)  
{% endnote %}

```c++ APCS 動線安排
#include <bits/stdc++.h>
using namespace std;
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define tomax(a, b) (a) = max((a), (b))
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

int g[103][103];
int n, m, max_cnt = 0, h;

int cnt() {
    int c = 0;
    rep(i, 0, n - 1) rep(j, 0, m - 1) c += (g[i][j] != 0);
    tomax(max_cnt, c);
    return c;
}

void rm(int x, int y) {
    g[x][y] = 0;
    int dir_x[] = {0, 1, 0, -1}, dir_y[] = {1, 0, -1, 0};
    rep(d, 0, 3) {
        int _x = x, _y = y;
        while (g[_x += dir_x[d]][_y += dir_y[d]] == (2 + d % 2) || g[_x][_y] == 5)
            g[_x][_y] -= (2 + d % 2);
    }
}

void build(int x, int y) {
    g[x][y] = 1;
    int dir_x[] = {0, 1, 0, -1}, dir_y[] = {1, 0, -1, 0};
    rep(d, 0, 3) {
        int _x = x, _y = y;
        bool ok = false;
        while ((_x + dir_x[d]) < n && (_x + dir_x[d]) >= 0 &&
               (_y + dir_y[d]) < m && (_y + dir_y[d]) >= 0)
            if (g[_x += dir_x[d]][_y += dir_y[d]] == 1) ok = true;
        if (!ok) continue;
        _x = x, _y = y;
        while (g[_x += dir_x[d]][_y += dir_y[d]] != 1)
            if (g[_x][_y] == 2 + (d + 1) % 2)
                g[_x][_y] = 5;
            else if(g[_x][_y] != 5)
                g[_x][_y] = (2 + d % 2);
    }
}

signed main() {
    ios;
    cin >> n >> m >> h;
    memset(g, 0, sizeof(g));
    while (h--) {
        int x, y, cmd;
        cin >> x >> y >> cmd;
        if (cmd)
            rm(x, y);
        else
            build(x, y);
        cnt();
    }
    cout << max_cnt << '\n' << cnt() << '\n';
    return 0;
}
```

![AC的Submission～](https://i.imgur.com/TEeF8ZG.png)
