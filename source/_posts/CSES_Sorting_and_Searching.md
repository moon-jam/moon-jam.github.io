---
title: CSES Sorting and Searching
lang: zh-TW
tags:
  - CSES
categories:
  - 程式題解
  - CSES
abbrlink: 23956
date: 2023-11-16
---

## CSES Sorting and Searching

<!--more-->

[CSES Problem Set](https://cses.fi/problemset/)  

[我的Profile](https://cses.fi/user/203349)

[我的程式們](https://github.com/moon-jam/CSES)

## Distinct Number

```c++ Distinct Number
#include <bits/stdc++.h>
#define int long long
#define pii pair<int ,int>
#define F first
#define S second
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a; i>=b; i--)
#define tomax(a, b) (a)=max((a),(b))
#define tomin(a, b) (a)=min((a),(b))
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
using namespace std;

signed main(){
    ios;
    int n;
    set<int> x;
    cin >> n;
    int tmp;
    rep(i, 1, n) cin >> tmp, x.insert(tmp);
    cout << x.size() << '\n';
    return 0;
}
```

## Apartments

排序+雙指針

```c++ Apartments
#include <bits/stdc++.h>
// #define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for (int i = a; i <= b; i++)
#define rev(i, a, b) for (int i = a; i >= b; i--)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define pb push_back
#define eb emplace_back
#define all(a) a.begin(), a.end()
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
using namespace std;

signed main()
{
    ios;
    int n, m, k, ans = 0, a[200005], b[200005];
    cin >> n >> m >> k;
    rep(i, 1, n) cin >> a[i];
    rep(i, 1, m) cin >> b[i];
    sort(a + 1, a + n + 1);
    sort(b + 1, b + m + 1);
    for (int i = 1, j = 1; i <= n && j <= m;) {
        if (a[i] + k >= b[j] && a[i] - k <= b[j])
            i++, j++, ans++;
        else if (a[i] + k < b[j])
            i++;
        else if (a[i] - k > b[j])
            j++;
    }
    cout << ans << '\n';
    return 0;
}
```

## Ferris Wheel

排序+雙指針

```c++ Ferris Wheel
#include <bits/stdc++.h>
// #define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for (int i = a; i <= b; i++)
#define rev(i, a, b) for (int i = a; i >= b; i--)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define pb push_back
#define eb emplace_back
#define all(a) a.begin(), a.end()
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
using namespace std;

signed main()
{
    ios;
    int n, x, ans = 0;
    cin >> n >> x;
    vector<int> p(n);
    for (int& i : p)
        cin >> i;
    sort(all(p));
    for (int l = 0, r = n - 1; r >= l;) {
        if (p[l] + p[r] <= x)
            ans++, l++, r--;
        else if (p[l] + p[r] >= x)
            ans++, r--;
    }
    cout << ans << '\n';
    return 0;
}
```
