---
title: APCS內積 (zerojudge i402)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 16492
date: 2023-10-07
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=i402)  
你有兩個數組分別為 $n$ 和 $m$ 的長度：  
$A_1, A_2, \dots, A_n$和$B_1, B_2, \dots, B_m$  
你可以自由決定是否要鏡射 $A, B$ 陣列(reverse)，也可以自由決定一個正整數 $r$。  
且當選擇 $A, B$ 分別交換一個長度為 $r$ 的子陣列(subarray)，並讓該兩個子陣列的內積最大化。  

內積的定義如下：  
假設從 $A$ 陣列選擇了一段長度為 $r$ 的子陣列 $A_{i}, A_{i+1}, A_{i+2}, \dots, A_{i+r-1}$，  
並在 $B$ 陣列選擇了一段長度為 $r$ 的子陣列 $B_{j}, B_{j+1}, B_{j+2}, \dots, B_{j+r-1}$，  
這兩個子陣列的內積就是$A_i \times B_j + A_{i+1} \times B_{j+1} + A_{i+2} \times B_{j+2} + \dots + A_{i+r-1} \times B_{j+r-1}$  
或可以簡單寫成$\sum_{k=0}^{r-1} A_{i+k} \times B_{j+k}$  
{% endnote %}
<!--more-->

{% note info %}
解題思路：  
這題我的做法是使用DP，給定$dp[i][j]$為$a[i]$與$b[j]$往後直到其中一個底端的區間內任意$r$值最大內積，可以知道當$r=1$時，$dp[i][j] = a[i]*b[j]$，而對於$n-i>1$ 且 $m-j>1$的狀態轉移就會是：  

$$dp[i][j]=max(a[i]*b[j], dp[i+1][j+1], pre[i+1][j+1]+a[i]*b[j])$$

其中$pre[i][j]$ 代表以$a[i]$與$b[j]$為開頭的最大內積前綴和，由此應該就能很清楚的理解轉移式的意義，$a[i]$與$b[j]$後的最大內積，只有可能是$a[i+1]$跟$b[i+1]$為開頭的最大內積、$a[i]$跟$b[j]$為開頭的最大內積前綴和加上$a[i]*b[j]$的內積或是自己本身$a[i]*b[j]$。  

🌟 在翻轉的部分只要將其中一個陣列翻轉過來即可，因為不論是正向還是反向，兩個陣列的內積都是一樣的，因此只要將其中一個陣列翻轉過來，再做一次正向的內積即可。  

❗️ $dp[0][0]$不一定會是整個陣列的最大值，因為$n、m$可能不一樣大，$dp[i][j]$的定義是$a[i]$與$b[j]$，往後直到其中一個底端的區間內任意$r$值最大內積，因此若其中一個先碰到了底端，但事實上另一個陣列跟其他段內積會更大的話，就會使得$dp[0][0]$不是最大值，因此較簡單的方法是在做狀態轉移時，將用一個變數紀錄$dp[i][j]$的最大值。
{% endnote %}

```c++ APCS內積
#include <bits/stdc++.h>
#define Max(a,b,c) max(a,max(b,c))
using namespace std;

int a[1005], b[1005], n, m, dp[1005][1005], pre[1005][1005], ans=-100000008;
//dp[i][j]表示a[i]與b[j]之後的最大內積
//pre[i][j]表示包含a[i]與b[j]最大前綴合
//init: dp[i][j]=a[i]*b[j]
//dp[i][j]=max(a[i]*b[j], dp[i+1][j+1], pre[i+1][j+1]+a[i]*b[j]) | n-i>1 && m-j>1
//pre[i][j]=max(a[i]*b[j], pre[i+1][j+1]+a[i]*b[j])

void calculate(){
    memset(dp, 0, sizeof(dp));
    memset(pre, 0, sizeof(pre));
    for(int i = n-1;i>=0;i--){
        for(int j = m-1;j>=0;j--){
            dp[i][j]=a[i]*b[j];
            if(n-i>1 && m-j>1)
                dp[i][j] = Max(a[i]*b[j], dp[i+1][j+1], pre[i+1][j+1]+a[i]*b[j]);
            pre[i][j]=max(a[i]*b[j], pre[i+1][j+1]+a[i]*b[j]); //pre[i][j]超過範圍的地方會是0
            ans=max(ans, dp[i][j]);
        }
    }
}

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cin>>n>>m;
    for(int i = 0; i<n;i++) cin>> a[i];
    for(int i = 0; i<m;i++) cin >> b[i];
    calculate();
    for(int i = 0; i< n/2; i++) swap(a[i],a[n-i-1]);
    calculate();
    cout<<ans<<'\n';
    return 0;
}
```

![AC的Submission～](https://i.imgur.com/IbR0NzM.png)
