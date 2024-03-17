---
title: CSES Range Queries
lang: zh-TW
tags:
  - CSES
categories:
  - 程式題解
  - CSES
abbrlink: 23956
date: 2024-03-16
---

## CSES Range Queries

CSES Range Queries 的 AC 程式碼

<!--more-->

[CSES Problem Set](https://cses.fi/problemset/)  

[我的Profile](https://cses.fi/user/203349)

[我的程式們](https://github.com/moon-jam/CSES)

## Static Range Sum Queries

```c++ Static Range Sum Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    ios;
    int n, q;
    cin >> n >> q;
    vi pre(n + 1);
    pre[0] = 0;
    rep(i, 1, n) cin >> pre[i], pre[i] += pre[i - 1];

    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << pre[b] - pre[a - 1] << '\n';
    }
    return 0;
}
```

## Static Range Minimum Queries

```c++ Static Range Minimum Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

#define lc id * 2 + 1
#define rc id * 2 + 2
#define M ((L + R) / 2)

int seg[200005 * 4];
int arr[200005];

void pull(int id) { seg[id] = min(seg[lc], seg[rc]); }

void build(int L, int R, int id) {
    if (L == R - 1) {
        seg[id] = arr[L];
        return;
    }
    build(L, M, lc), build(M, R, rc);
    pull(id);
}

int query(int l, int r, int L, int R, int id){
    if(l==L && r==R) return seg[id];
    if(l>=M) return query(l, r, M, R, rc);
    if(r<=M) return query(l, r, L, M, lc);
    return min(query(l, M, L, M, lc), query(M, r, M, R, rc));
}

signed main() {
    ios;
    int n, q;
    cin >> n >> q;
    rep(i, 0, n-1) cin >> arr[i];
    build(0, n, 0);
    while(q--){
        int a, b;
        cin >> a >> b;
        cout << query(a-1, b, 0, n, 0) << '\n'; 
    }
    return 0;
}
```

## Dynamic Range Sum Queries

```c++ Dynamic Range Sum Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)
 
#define lc id * 2 + 1
#define rc id * 2 + 2
#define M ((L + R) / 2)
 
int seg[200005 * 4];
int arr[200005];
 
void pull(int id) { seg[id] = seg[lc] + seg[rc]; }
 
void modify(int pos, int val, int L, int R, int id) {
    if (L == R - 1) {
        seg[id] = val;
        return;
    }
    if (pos >= M)
        modify(pos, val, M, R, rc);
    else
        modify(pos, val, L, M, lc);
    pull(id);
}
 
int query(int l, int r, int L, int R, int id) {
    if (l == L && r == R) return seg[id];
    if (l >= M) return query(l, r, M, R, rc);
    if (r <= M) return query(l, r, L, M, lc);
    return query(l, M, L, M, lc) + query(M, r, M, R, rc);
}
 
signed main() {
    ios;
    int n, q;
    cin >> n >> q;
    rep(i, 0, n - 1) cin >> arr[i], modify(i, arr[i], 0, n, 0);
    while (q--) {
        int cmd, a, b;
        cin >> cmd >> a >> b;
        a--;
        if (cmd == 1)
            modify(a, b, 0, n, 0);
        else
            cout << query(a, b, 0, n, 0) << '\n';
    }
    return 0;
}

```

## Dynamic Range Minimum Queries

```c++ Dynamic Range Minimum Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

#define lc id * 2 + 1
#define rc id * 2 + 2
#define M ((L + R) / 2)

int seg[200005 * 4];

void pull(int id) { seg[id] = min(seg[lc], seg[rc]); }

void modify(int pos, int val, int L, int R, int id) {
    if (L == R - 1) {
        seg[id] = val;
        return;
    }
    if (pos >= M)
        modify(pos, val, M, R, rc);
    else
        modify(pos, val, L, M, lc);
    pull(id);
}

int query(int l, int r, int L, int R, int id) {
    if (l == L && r == R) return seg[id];
    if (l >= M) return query(l, r, M, R, rc);
    if (r <= M) return query(l, r, L, M, lc);
    return min(query(l, M, L, M, lc), query(M, r, M, R, rc));
}

signed main() {
    ios;
    int n, q, tmp;
    cin >> n >> q;
    rep(i, 0, n - 1) cin >> tmp, modify(i, tmp, 0, n, 0);
    while (q--) {
        int cmd, a, b;
        cin >> cmd >> a >> b;
        a--;
        if (cmd == 1)
            modify(a, b, 0, n, 0);
        else
            cout << query(a, b, 0, n, 0) << '\n';
    }
    return 0;
}
```

## Range Xor Queries

```c++ Range Xor Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    ios;
    int n, q, tmp;
    cin >> n >> q;
    vi arr(n + 1);
    arr[0] = 0;
    rep(i, 1, n) cin >> tmp, arr[i] = (tmp ^ arr[i - 1]);
    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << (arr[b] ^ arr[a - 1]) << '\n';
    }
    return 0;
}
```

## Range Update Queries

```c++ Range Update Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

#define lc id * 2 + 1
#define rc id * 2 + 2
#define M ((L + R) / 2)

struct Nodes {
    int sum, lz;
} seg[200005 * 4];

void modify(int l, int r, int val, int L, int R, int id) {
    if (l == L && r == R) {
        seg[id].lz += val;
    } else {
        if (l >= M)
            modify(l, r, val, M, R, rc);
        else if (r <= M)
            modify(l, r, val, L, M, lc);
        else modify(l, M, val, L, M, lc), modify(M, r, val, M, R, rc);
    }
}

int query(int pos, int L, int R, int id) {
    if (L == R - 1) return seg[id].lz + seg[id].sum;
    if (pos >= M)
        return seg[id].lz + query(pos, M, R, rc);
    else
        return seg[id].lz + query(pos, L, M, lc);
}

signed main() {
    ios;
    int n, q, tmp;
    cin >> n >> q;
    rep(i, 0, n - 1) cin >> tmp, modify(i, i + 1, tmp, 0, n, 0);
    while (q--) {
        int cmd, a, b, c;
        cin >> cmd >> a;
        a--;
        if(cmd == 1) cin >> b >> c, modify(a, b, c, 0, n, 0);
        else cout << query(a, 0, n ,0) << '\n';
    }
    return 0;
}
```

## Forest Queries

```c++ Forest Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

int pre[1003][1003];

signed main() {
    ios;
    int n, q;
    char tmp;
    cin >> n >> q;
    rep(i, 1, n) rep(j, 1, n) cin >> tmp,
        pre[i][j] =
            (tmp == '*') + pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1];
    while(q--){
        int x1, x2, y1, y2;
        cin >> y1 >> x1 >> y2 >> x2;
        if(x2<x1) swap(x1, x2);
        if(y2<y1) swap(y1, y2);
        cout << pre[y2][x2] + pre[y1-1][x1-1] - pre[y2][x1-1] - pre[y1-1][x2] << '\n';
    }
    return 0;
}
```

## Hotel Queries

```c++ Hotel Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

#define lc id * 2 + 1
#define rc id * 2 + 2
#define M ((L + R) / 2)

int seg[200005 * 4];

void modify(int pos, int val, int L, int R, int id) {
    if (L == R - 1)
        seg[id] += val;
    else {
        if (pos >= M)
            modify(pos, val, M, R, rc);
        else
            modify(pos, val, L, M, lc);
        seg[id] = max(seg[lc], seg[rc]);
    }
}

int query(int l, int r, int L, int R, int id) {
    if (l == L && r == R) return seg[id];
    if (l >= M) return query(l, r, M, R, rc);
    if (r <= M) return query(l, r, L, M, lc);
    return max(query(l, M, L, M, lc), query(M, r, M, R, rc));
}

signed main() {
    // ios;
    int n, m, tmp;
    cin >> n >> m;
    set<pii> h;
    rep(i, 0, n - 1) cin >> tmp, modify(i, tmp, 0, n, 0);
    rep(i, 1, m) {
        cin >> tmp;
        if (query(0, n, 0, n, 0) < tmp) {
            cout << 0 << ' ';
            continue;
        }
        int l = 1, r = n;
        while (r > l) {
            int mid = (r + l) / 2;
            if (query(0, mid, 0, n, 0) >= tmp)
                r = mid;
            else
                l = mid+1;
        }cout << r << ' ';
        modify(r-1, -tmp, 0, n, 0);
    }
    return 0;
}
```

## List Removals

```c++ List Removals
#include <bits/extc++.h>
using namespace std;
using namespace __gnu_pbds;

/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    ios;
    int n, tmp;
    tree<pii, null_type, less<pii>, rb_tree_tag,
         tree_order_statistics_node_update>
        r;
    cin >> n;
    rep(i, 1, n) cin >> tmp, r.insert({i, tmp});
    rep(i, 1, n) {
        cin >> tmp;
        auto it = r.find_by_order(tmp - 1);
        cout << it->S << ' ';
        r.erase(it);
    }
    return 0;
}
```

## Salary Queries

```c++ Salary Queries
#include <bits/extc++.h>
using namespace std;
using namespace __gnu_pbds;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

template <class T>
using Tree = tree<T, null_type, less_equal<T>, rb_tree_tag,
                  tree_order_statistics_node_update>;

signed main() {
    ios;
    int n, q;
    Tree<int> tr;
    int arr[200005];
    cin >> n >> q;
    rep(i, 1, n) cin >> arr[i], tr.insert(arr[i]);
    while (q--) {
        char cmd;
        int a, b;
        cin >> cmd >> a >> b;
        if (cmd == '!')
            tr.erase(tr.find_by_order(tr.order_of_key(arr[a]))), tr.insert(b), arr[a]=b;
        else
            cout << tr.order_of_key(b + 1) - tr.order_of_key(a) << '\n';
    }
    return 0;
}
```

## Prefix Sum Queries

```c++ Prefix Sum Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

#define lc id * 2 + 1
#define rc id * 2 + 2
#define M ((L + R) / 2)

struct Nodes {
    int mx, lz;
} seg[200005 * 4];

int arr[200005];
int n, q;

void push(int L, int R, int id) {
    if (L != R - 1) {
        seg[lc].lz += seg[id].lz;
        seg[rc].lz += seg[id].lz;
    }
    seg[id].mx += seg[id].lz;
    seg[id].lz = 0;
}

void pull(int L, int R, int id) {
    if (L == R - 1) return;
    push(L, M, lc), push(M, R, rc);
    seg[id].mx = max(seg[lc].mx, seg[rc].mx);
}

void modify(int l, int r, int val, int L = 0, int R = n, int id = 0) {
    push(L, R, id);
    if (L == l && R == r) {
        seg[id].lz += val;
    } else {
        if (l >= M)
            modify(l, r, val, M, R, rc);
        else if (r <= M)
            modify(l, r, val, L, M, lc);
        else
            modify(l, M, val, L, M, lc), modify(M, r, val, M, R, rc);
        pull(L, R, id);
    }
}

int query(int l, int r, int L = 0, int R = n, int id = 0) {
    push(L, R, id);
    if (l == L && r == R) return seg[id].mx;
    if (l >= M) return query(l, r, M, R, rc);
    if (r <= M) return query(l, r, L, M, lc);
    return max(query(l, M, L, M, lc), query(M, r, M, R, rc));
}

signed main() {
    ios;
    cin >> n >> q;
    rep(i, 0, n - 1) cin >> arr[i], modify(i, n, arr[i]);
    while (q--) {
        int cmd, a, b;
        cin >> cmd >> a >> b;
        a--;
        if (cmd == 1)
            modify(a, n, b - arr[a]), arr[a] = b;
        else if (a == 0)
            cout << max((int)0, arr[0]);
        else
            cout << max((int)0, query(a, b) - query(a - 1, a)) << '\n';
    }
    return 0;
}
```

## Pizzeria Queries

```c++ Pizzeria Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

int n, q;

#define lc id * 2 + 1
#define rc id * 2 + 2
#define M ((L + R) / 2)

int seg[200005 * 4][3];  // left->0, right->1

void pull(int side, int L, int R, int id) {
    seg[id][side] = min(seg[lc][side], seg[rc][side]);
}

void modify(int pos, int val, bool side, int L = 0, int R = n, int id = 0) {
    if (L == R - 1) {
        seg[id][side] = val + (side ? L : -L);
    } else {
        if (pos >= M)
            modify(pos, val, side, M, R, rc);
        else
            modify(pos, val, side, L, M, lc);
        pull(side, L, R, id);
    }
}

int query(int l, int r, bool side, int L = 0, int R = n, int id = 0) {
    if(l==r) return 0;
    if (l == L && r == R) return seg[id][side];
    if (l >= M) return query(l, r, side, M, R, rc);
    if (r <= M) return query(l, r, side, L, M, lc);
    return min(query(l, M, side, L, M, lc), query(M, r, side, M, R, rc));
}

signed main() {
    ios;
    cin >> n >> q;
    rep(i, 0, 200000 * 4) seg[i][0] = seg[i][1] = 1e9;
    int tmp;
    rep(i, 0, n - 1) cin >> tmp, modify(i, tmp, 0), modify(i, tmp, 1);
    while (q--) {
        int cmd, a, b;
        cin >> cmd >> a;
        a--;
        if (cmd == 1)
            cin >> b, modify(a, b, 0), modify(a, b, 1);
        else
            cout << min(a + query(0, a+1, 0), query(a, n, 1) - a) << '\n';
    }
    return 0;
}
```

## Subarray Sum Queries

```c++ Subarray Sum Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

#define lc id * 2 + 1
#define rc id * 2 + 2
#define M ((L + R) / 2)

int n, q;

struct Nodes {
    int pre, suf, sum, mx;
} seg[200005 * 4];

void pull(int L, int R, int id) {
    if (L == R - 1) return;
    seg[id].pre = max(seg[lc].pre, seg[lc].sum + seg[rc].pre);
    seg[id].suf = max(seg[rc].suf, seg[lc].suf + seg[rc].sum);
    seg[id].sum = seg[lc].sum + seg[rc].sum;
    seg[id].mx = max(max(seg[lc].mx, seg[rc].mx), seg[lc].suf + seg[rc].pre);
}

void modify(int pos, int val, int L = 0, int R = n, int id = 0) {
    if (L == R - 1) {
        seg[id].pre = seg[id].suf = seg[id].sum = seg[id].mx = val;
    } else {
        if (pos >= M)
            modify(pos, val, M, R, rc);
        else
            modify(pos, val, L, M, lc);
        pull(L, R, id);
    }
}

signed main() {
    ios;
    int tmp;
    cin >> n >> q;
    rep(i, 0, n - 1) cin >> tmp, modify(i, tmp);
    while (q--) {
        int a, b;
        cin >> a >> b;
        modify(a - 1, b);
        cout << max((int)0, seg[0].mx) << '\n';
    }
    return 0;
}
```

## Distinct Values Queries

```c++ Distinct Values Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

int n, q, s;

struct Q {
    int l, r, id, ans;
    bool operator<(const Q &b) const {
        if (l / s != b.l / s) return l < b.l;
        return ((l / s) & 1) ? (r < b.r) : (r > b.r);
    }
};

signed main() {
    ios;
    cin >> n >> q;
    vi arr(n + 1);
    vi ord;
    rep(i, 1, n) cin >> arr[i], ord.eb(arr[i]);
    sort(all(ord));
    rep(i, 1, n) arr[i] = (lower_bound(all(ord), arr[i])-ord.begin());
    s = sqrt(n);
    
    vii in(q);
    vector<Q> queries(q);
    
    for(pii &i : in) cin >>i.F >> i.S;
    
    rep(i, 0, q - 1) queries[i] = {in[i].F, in[i].S, i, 0};
    sort(all(queries));

    int cur_l = 1, cur_r = 1;
    vi cnt(n+1, 0);
    cnt[arr[1]] = 1;
    int distinct = 1;

    for (auto &query : queries) {
        while (cur_l > query.l) {
            cur_l--;
            if (++cnt[arr[cur_l]] == 1) distinct++;
        }
        while (cur_r < query.r) {
            cur_r++;
            if (++cnt[arr[cur_r]] == 1) distinct++;
        }
        while (cur_l < query.l) {
            if (--cnt[arr[cur_l]] == 0) distinct--;
            cur_l++;
        }
        while (cur_r > query.r) {
            if (--cnt[arr[cur_r]] == 0) distinct--;
            cur_r--;
        }
        query.ans = distinct;
    }

    vi ans(q);
    for (auto &query : queries) ans[query.id] = query.ans;
    for (auto &x : ans) cout << x << '\n';
    return 0;
}
```

## Increasing Array Queries

```c++ Increasing Array Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

int n, q;
vi pre;
vi arr;

#define lc id * 2
#define rc id * 2 + 1
#define M ((L + R) / 2)

struct nodes {
    int sum, lz;
} seg[200005 * 4];

void push(int L, int R, int id) {
    if (seg[id].lz == 0) return;
    if (L != R - 1) seg[lc].lz = seg[rc].lz = seg[id].lz;
    seg[id].sum = seg[id].lz * (R - L);
    seg[id].lz = 0;
}

void pull(int L, int R, int id) {
    if (L == R - 1) return;
    push(L, M, lc), push(M, R, rc);
    seg[id].sum = seg[lc].sum + seg[rc].sum;
}

void modify(int l, int r, int val, int L = 1, int R = n + 1, int id = 1) {
    push(L, R, id);
    if (l == L && r == R) {
        seg[id].lz = val;
    } else {
        if (l >= M)
            modify(l, r, val, M, R, rc);
        else if (r <= M)
            modify(l, r, val, L, M, lc);
        else
            modify(l, M, val, L, M, lc), modify(M, r, val, M, R, rc);
        pull(L, R, id);
    }
}

int query(int l, int r, int L = 1, int R = n + 1, int id = 1) {
    push(L, R, id);
    if (l == L && r == R)
        return seg[id].sum;
    else if (l >= M)
        return query(l, r, M, R, rc);
    else if (r <= M)
        return query(l, r, L, M, lc);
    return query(l, M, L, M, lc) + query(M, r, M, R, rc);
}

int sum(int l, int r) { return pre[r - 1] - pre[l - 1]; }

signed main() {
    ios;
    cin >> n >> q;
    pre.resize(n + 1), arr.resize(n + 1);
    pre[0] = 0;
    rep(i, 1, n) cin >> arr[i], modify(i, i + 1, arr[i]),
        pre[i] = pre[i - 1] + arr[i];
    vector<pair<pii, int>> qs(q);
    rep(i, 0, q - 1) cin >> qs[i].F.F >> qs[i].F.S, qs[i].S = i;
    sort(all(qs), [](auto a, auto b) { return a.F.F > b.F.F; });
    vi ans(q);
    vii mx;
    int cur = n;
    mx.eb(1e10, n+1);
    for (auto i : qs) {
        int l = i.F.F;int r = i.F.S;int id = i.S;
        while (cur >= l) {
            if (arr[cur] > mx.back().F) {
                while (!mx.empty() && arr[cur] > mx.back().F)
                    mx.pob();
                modify(cur, mx.back().S, arr[cur]);
            }
            mx.eb(arr[cur], cur);
            cur--;
        }
        modify(l, mx.back().S+1, mx.back().F);
        ans[id] = query(l, r+1) - sum(l, r + 1);
    }
    for (int i : ans) cout << i << '\n';
    return 0;
}
```

## Forest Queries II

```c++ Forest Queries II
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
// #define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

int n, q;
bool arr[1003][1003];

struct BIT {
    int bit[1003];

    void modify(int pos, int val) {
        for (; pos <= n; pos += pos & (-pos)) bit[pos] += val;
    }
    int query(int pos) {
        int ans = 0;
        for (; pos > 0; pos -= pos & (-pos)) ans += bit[pos];
        return ans;
    }
};

struct BIT2 {
    BIT bit[1003];

    void modify(int pos_y, int pos_x, int val) {
        for (; pos_y <= n; pos_y += pos_y & (-pos_y))
            bit[pos_y].modify(pos_x, val);
    }
    int query(int pos_y, int pos_x) {
        int ans = 0;
        for (; pos_y > 0; pos_y -= pos_y & (-pos_y))
            ans += bit[pos_y].query(pos_x);
        return ans;
    }
};

signed main() {
    ios;
    cin >> n >> q;
    BIT2 bit;
    char tmp;

    rep(i, 1, n) rep(j, 1, n) cin >> tmp,
        arr[i][j] = (tmp == '*'),
        bit.modify(i, j, arr[i][j]);

    while (q--) {
        int cmd, y1, x1, y2, x2;
        cin >> cmd >> y1 >> x1;
        if (cmd == 1)
            bit.modify(y1, x1, arr[y1][x1] == 1 ? -1 : 1), arr[y1][x1] = (arr[y1][x1])^(1);
        else {
            cin >> y2 >> x2;
            if (x1 < x2) swap(x1, x2);
            if (y1 < y2) swap(y1, y2);
            cout << bit.query(y1, x1) - bit.query(y1, x2 - 1) -
                        bit.query(y2 - 1, x1) + bit.query(y2 - 1, x2 - 1)
                 << '\n';
        }
    }
    return 0;
}
```

## Range Updates and Sums

```c++ Range Updates and Sums
#include <bits/stdc++.h>

using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si _set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

#define lc id * 2 + 1
#define rc id * 2 + 2
#define M ((L + R) / 2)

struct Nodes {
    int info, add, _set;
} seg[4 * 200005];

void push(int L, int R, int id) {
    if (seg[id]._set) {
        if (R != L + 1) seg[lc]._set = seg[rc]._set = seg[id]._set;
        if (R != L + 1) seg[lc].add = seg[rc].add = 0;
        seg[id].info = seg[id]._set * (R - L);
        seg[id]._set = 0;
    }
    if (seg[id].add) {
        if (R != L + 1) seg[lc].add += seg[id].add;
        if (R != L + 1) seg[rc].add += seg[id].add;
        seg[id].info += seg[id].add * (R - L);
        seg[id].add = 0;
    }
}

void pull(int L, int R, int id) {
    push(L, M, lc), push(M, R, rc);
    seg[id].info = seg[lc].info + seg[rc].info;
}

void add(int l, int r, int val, int L, int R, int id) {
    push(L, R, id);
    if (l == L && R == r) {
        seg[id].add += val;
    } else {
        if (l >= M)
            add(l, r, val, M, R, rc);
        else if (r <= M)
            add(l, r, val, L, M, lc);
        else
            add(l, M, val, L, M, lc), add(M, r, val, M, R, rc);
        pull(L, R, id);
    }
}

void _set(int l, int r, int val, int L, int R, int id) {
    push(L, R, id);
    if (l == L && R == r) {
        seg[id]._set = val;
    } else {
        if (l >= M)
            _set(l, r, val, M, R, rc);
        else if (r <= M)
            _set(l, r, val, L, M, lc);
        else
            _set(l, M, val, L, M, lc), _set(M, r, val, M, R, rc);
        pull(L, R, id);
    }
}

int query(int l, int r, int L, int R, int id) {
    push(L, R, id);
    if (l == L && r == R) return seg[id].info;
    if (l >= M) return query(l, r, M, R, rc);
    if (r <= M) return query(l, r, L, M, lc);
    return query(l, M, L, M, lc) + query(M, r, M, R, rc);
}

signed main() {
    ios;
    int n, q, tmp;
    cin >> n >> q;
    rep(i, 0, n - 1) cin >> tmp, _set(i, i + 1, tmp, 0, n, 0);
    while (q--) {
        int cmd, a, b, x;
        cin >> cmd >> a >> b;
        a--;
        if (cmd == 1) cin >> x, add(a, b, x, 0, n, 0);
        if (cmd == 2) cin >> x, _set(a, b, x, 0, n, 0);
        if (cmd == 3) cout << query(a, b, 0, n, 0) << '\n';
    }
    return 0;
}

```

## Polynomial Queries

```c++ Polynomial Queries
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

#define lc id * 2 + 1
#define rc id * 2 + 2
#define M ((L + R) / 2)

int n, q;
vi arr;

struct nodes {
    int sum, lz_s, lz_d;
} seg[200005 * 4];

void push(int L, int R, int id) {
    if (seg[id].lz_s == 0 && seg[id].lz_d == 0) return;
    if (L != R - 1) {
        seg[lc].lz_s += seg[id].lz_s;
        seg[lc].lz_d += seg[id].lz_d;
        seg[rc].lz_s += seg[id].lz_s + (M - L) * seg[id].lz_d;
        seg[rc].lz_d += seg[id].lz_d;
    }
    seg[id].sum += (R - L) * (seg[id].lz_s*2 + seg[id].lz_d * (R - L - 1)) / 2;
    seg[id].lz_s = seg[id].lz_d = 0;
}

void pull(int L, int R, int id) {
    if (L == R - 1) return;
    push(L, M, lc), push(M, R, rc);
    seg[id].sum = seg[lc].sum + seg[rc].sum;
}

void build(int L = 0, int R = n, int id = 0) {
    if (L == R - 1) {
        seg[id].sum = arr[L];
    } else {
        build(L, M, lc), build(M, R, rc);
        pull(L, R, id);
    }
}

void modify(int l, int r, int val = 1, int L = 0, int R = n, int id = 0) {
    push(L, R, id);
    if (l == L && r == R) {
        seg[id].lz_s += val;
        seg[id].lz_d++;
    } else {
        if (l >= M)
            modify(l, r, val, M, R, rc);
        else if (r <= M)
            modify(l, r, val, L, M, lc);
        else
            modify(l, M, val, L, M, lc), modify(M, r, val + M - l, M, R, rc);
        pull(L, R, id);
    }
}

int query(int l, int r, int L = 0, int R = n, int id = 0) {
    push(L, R, id);
    if (l == L && r == R) return seg[id].sum;
    if (l >= M) return query(l, r, M, R, rc);
    if (r <= M) return query(l, r, L, M, lc);
    return query(l, M, L, M, lc) + query(M, r, M, R, rc);
}

signed main() {
    ios;
    cin >> n >> q;
    arr.resize(n);
    for (int &i : arr) cin >> i;
    build();
    while (q--) {
        int cmd, a, b;
        cin >> cmd >> a >> b;
        a--;
        if (cmd == 1)
            modify(a, b);
        else
            cout << query(a, b) << '\n';
    }

    return 0;
}

```

## Range Queries and Copies

```c++ Range Queries and Copies
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vc vector
#define vi vector<int>
#define vii vector<pii>
#define mii map<int, int>
#define si set<int>
/* UTILS */
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define rall(a) (a).rbegin(), (a).rend()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ins insert
#define err(a) cerr << #a << ": " << a << "\n"
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

#define _lc seg[id].lc
#define _rc seg[id].rc
#define M ((L + R) / 2)

int n, q, cur = 0;
vi arr;
vi ls;
struct node {
    int lc, rc, sum = 0;
} seg[200005 * 2 + 200005 * 19];
// build -> 200005*2, modify -> 200005*(log_2(200005)+1)

void build(int L = 0, int R = n, int id = 0) {
    if (L == R - 1) {
        seg[id].sum = arr[L];
    } else {
        seg[id].lc = ++cur, seg[id].rc = ++cur;
        build(L, M, _lc), build(M, R, _rc);
        seg[id].sum = seg[_lc].sum + seg[_rc].sum;
    }
}

void modify(int &id, int pos, int val, int L = 0, int R = n) {
    seg[++cur] = seg[id];
    id = cur;
    if (L == R - 1) {
        seg[id].sum = val;
    } else {
        if (pos >= M)
            modify(_rc, pos, val, M, R);
        else
            modify(_lc, pos, val, L, M);
        seg[id].sum = seg[_lc].sum + seg[_rc].sum;
    }
}

int query(int id, int l, int r, int L = 0, int R = n) {
    if (l == L && r == R) return seg[id].sum;
    if (l >= M) return query(_rc, l, r, M, R);
    if (r <= M) return query(_lc, l, r, L, M);
    return query(_lc, l, M, L, M) + query(_rc, M, r, M, R);
}

signed main() {
    ios;
    cin >> n >> q;
    arr.resize(n);
    ls.eb(0);
    rep(i, 0, n - 1) cin >> arr[i];
    build();
    while (q--) {
        int cmd, a, b, k, x;
        cin >> cmd;
        if (cmd == 1) {
            cin >> k >> a >> x;
            k--, a--;
            modify(ls[k], a, x);
        } else if (cmd == 2) {
            cin >> k >> a >> b;
            k--, a--;
            cout << query(ls[k], a, b) << '\n';
        } else {
            cin >> k;
            ls.eb(ls[--k]);
        }
    }
    return 0;
}
```
