---
title: APCS 勇者修練 (zerojudge f314)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 11781
date: 2023-10-10 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=f314)

輸入為$m \times n$大小的的陣列，每一格是一個介於 -100 與 100 之間的整數，表示經過這格可以累積的經驗值。
你可以從最上面一排任何一個位置開始，在最下面一排任何一個位置結束。
過程中每一步可以選擇往左、往右或往下走，但不能走回已經經過的位置。
請你算出最多可以獲得的經驗值總和(可能是負數)。
{% endnote %}
<!--more-->

{% note info %}
解題思路：
這題比較困難的地方是每一步是可以往左也可以往右的，我的解決方法是一樣使用DP，每層計算時先從左邊往右跑一次，再從右邊往左跑一次，最後取兩個方向中比較大的當作那個點的值，可以這樣做是因為在每一層中到達一個點一定是在該層移動時，方向必定不變(也就是說左邊來的就會是一路向左，從右邊來的就會是一路向右)，因此只要個別比較這兩種狀況就能解決了。
詳細的狀態轉移式可以見程式碼中的註解。

🌟 因為每次在比較兩個方向時都是在比較同一層的，所以可以就單純開一個一為陣列紀錄，但兩個方向的值一定要在最後都跑完之後再比較，假設事先計算由左往右再計算由右往左，如果在右往左時每算完一個數就比跟左往右的比較一次，那當計算新的點時其右邊的最大經驗就可能會是從左邊加過去的，那目前這格的數字就會被重複計算。
{% endnote %}

```c++ 勇者修練
#include <bits/stdc++.h>

using namespace std;

int n, m, arr[51][10004], dp[51][10004];
// dp[i][j] 表示第i層的第j個到第0層的最大經驗
// 左至右
// dp[0][0]=arr[0][0]
// dp[0][j]=max(dp[0][j-1], 0)+arr[0][j], j>0
// dp[i][0]=dp[i-1][0]+arr[i][0], i>0
// dp[i][j]=max(dp[i-1][j], dp[i][j-1])+arr[i][j], j>0, i>0
// 右至左
// _dp[0][n-1]=arr[0][n-1]
// _dp[0][j]=max(_dp[0][j+1], 0)+arr[0][j], j<n-1
// _dp[i][n-1]=_dp[i-1][n-1]+arr[i][n-1], i>0
// _dp[i][j]=max(_dp[i-1][j], _dp[i][j+1])+arr[i][j], j<n-1, i>0
// 每層先取完左至右跟右至左後，去較大者為dp[i][j]
// ans=max(dp[m-1][j]), 0<=j<=n-1

signed main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    memset(dp, 0, sizeof(dp));
    cin >> m >> n;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) 
            cin >> arr[i][j];
    
    for (int i = 0; i < m; i++){
        for(int j = 0; j < n; j++){
            if (i == 0 && j==0)
                dp[0][0] = arr[0][0];
            else if (i==0)
                dp[0][j] = max(dp[0][j-1], 0)+arr[0][j];
            else if (j == 0)
                dp[i][0] = dp[i-1][0] + arr[i][0];
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]) + arr[i][j];
        }
        int tmp_r_dir[10004];
        for(int j = n-1; j >= 0; j--){
            if (i == 0 && j==n-1)
                tmp_r_dir[j] = arr[0][n-1];
            else if (i==0)
                tmp_r_dir[j] = max(tmp_r_dir[j+1], 0)+arr[0][j];
            else if (j == n-1)
                tmp_r_dir[n-1] = dp[i-1][n-1]+arr[i][n-1];
            else
                tmp_r_dir[j] = max(dp[i-1][j], tmp_r_dir[j+1])+arr[i][j];
        }for(int j = 0; j < n; j++) dp[i][j] = max(dp[i][j], tmp_r_dir[j]);
    }
    
    int ans = -5000006;
    for(int j = 0; j < n; j++)
        ans = max(ans, dp[m - 1][j]);
    cout << ans << '\n';
    return 0;
}
```

![AC的Submission～!](https://i.imgur.com/Y4nntSL.png)