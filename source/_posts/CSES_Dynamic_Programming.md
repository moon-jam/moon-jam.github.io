---
title: CSES Dynamic Programming
lang: zh-TW
tags:
  - CSES
categories:
  - 程式題解
  - CSES
abbrlink: 23956
date: 2023-11-16
hidden: true
---

## CSES Dynamic Programming

<!--more-->

[CSES Problem Set](https://cses.fi/problemset/)  

[我的Profile](https://cses.fi/user/203349)

[我的程式們](https://github.com/moon-jam/CSES)

## Dice Combinations

```c++ Dice Combinations
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a; i>=b; i--)
#define tomax(a,b) (a)=max((a),(b))
#define tomin(a,b) (a)=min((a),(b))
#define pb push_back
#define eb emplace_back
#define all(a) a.begin(), a.end()
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
using namespace std;

const int mod = 1e9 + 7;

signed main(){
    ios;
    int n, dp[1000006], pre = 1;
    cin >> n;
    fill(dp, dp+n+3, 0);
    rep(i, 1, 6){
        dp[i] = pre;
        pre += dp[i];
    }rep(i, 7, n){
        rep(j, i-6, i-1)
            dp[i]+=dp[j], dp[i]%=mod;
    }cout << dp[n] << '\n';
    return 0;
}
```

## Minimizing Coins

```c++ Minimizing Coins
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a; i>=b; i--)
#define tomax(a,b) (a)=max((a),(b))
#define tomin(a,b) (a)=min((a),(b))
#define pb push_back
#define eb emplace_back
#define all(a) a.begin(), a.end()
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
using namespace std;

const int MAX = 1e9;

signed main(){
    ios;
    int n, x, dp[1000006], c[102];
    cin >> n >> x;
    fill(dp, dp+x+1, MAX);
    dp[0]=0;
    rep(i, 0, n-1){
        cin >> c[i];
        for (int j = 0; j+c[i] <= x; j++){
            dp[j+c[i]] = min(dp[j+c[i]], dp[j]+1);
        }
    }
    if(dp[x]!=MAX) cout << dp[x] << '\n';
    else cout << "-1\n";
    return 0;
}
```

## Coin Combinations I

```c++ Coin Combinations I
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a; i>=b; i--)
#define tomax(a,b) (a)=max((a),(b))
#define tomin(a,b) (a)=min((a),(b))
#define pb push_back
#define eb emplace_back
#define all(a) a.begin(), a.end()
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
using namespace std;

const int mod = 1e9+7;

signed main(){
    ios;
    int n, x, dp[1000006], c[102];
    cin >> n >> x;
    memset(dp, 0, sizeof(dp));
    dp[0]=1;
    rep(i, 0, n-1) cin >> c[i];
    rep(i, 1, x){
        rep(j, 0, n-1)
            if(i-c[j]>=0)
                dp[i]+=dp[i-c[j]], dp[i]%=mod;
                //每個最多用i次加到dp[i]的方法數
    }
    cout << dp[x] << '\n';
    return 0;
}
```

## Coin Combinations II

```c++ Coin Combinations II
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a; i>=b; i--)
#define tomax(a,b) (a)=max((a),(b))
#define tomin(a,b) (a)=min((a),(b))
#define pb push_back
#define eb emplace_back
#define all(a) a.begin(), a.end()
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
using namespace std;

const int mod = 1e9+7;

signed main(){
    ios;
    int n, x, dp[1000006], c[102];
    cin >> n >> x;
    memset(dp, 0, sizeof(dp));
    dp[0]=1;
    rep(i, 0, n-1){
        cin >> c[i];
        for (int j = 0; j+c[i] <= x; j++){
            dp[j+c[i]]+=dp[j], dp[j+c[i]]%=mod;
            //用第0~i個數字加到任意可達的組合數
        }
    }
    cout << dp[x] << '\n';
    return 0;
}
```
