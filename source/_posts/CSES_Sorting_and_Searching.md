---
title: CSES Sorting and Searching
lang: zh-TW
tags:
  - CSES
categories:
  - 程式題解
  - CSES
abbrlink: 23956
date: 2024-03-16
---

## CSES Sorting and Searching

CSES Sorting and Searching 的 AC 程式碼

<!--more-->

[CSES Problem Set](https://cses.fi/problemset/)  

[我的Profile](https://cses.fi/user/203349)

[我的程式們](https://github.com/moon-jam/CSES)

## Distinct Numbers

```c++ Distinct Numbers
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for (int i = a; i <= b; i++)
#define rev(i, a, b) for (int i = a; i >= b; i--)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
using namespace std;

signed main() {
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

signed main() {
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

signed main() {
    ios;
    int n, x, ans = 0;
    cin >> n >> x;
    vector<int> p(n);
    for (int& i : p) cin >> i;
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

## Concert Tickets

```c++ Concert Tickets
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define rev(i, a, b) for (int i = a; i >= b; --i)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define all(a) a.begin(), a.end()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

using namespace std;

signed main() {
    // ios;
    int n, m, tmp;
    map<int, int> ticket;
    cin >> n >> m;
    rep(i, 1, n) cin >> tmp, ticket[tmp]++;
    rep(i, 1, m){
        cin >> tmp;
        auto it_bigger_price = ticket.upper_bound(tmp);
        if(it_bigger_price == ticket.begin()) cout << -1 << '\n';
        else{
            auto it_price = prev(it_bigger_price);
            ticket[(*it_price).F]--, cout << (*it_price).F << '\n';
            if(ticket[(*it_price).F]==0) ticket.erase(it_price);
        }
    }
    return 0;
}
```

## Restaurant Customers

```c++ Restaurant Customers
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vi vector<int>
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
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    ios;
    int n;
    set<pii> arr;
    cin >> n;
    rep(i, 1, n) {
        int a, b;
        cin >> a >> b;
        arr.insert({a, 1}), arr.insert({b, -1});
    }
    int ans = 0, cur = 0;
    for (pii i : arr) {
        cur += i.S;
        tomax(ans, cur);
    }
    cout << ans << '\n';
    return 0;
}
```

## Movie Festival

```c++ Movie Festival
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vi vector<int>
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
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    ios;
    int n;
    cin >> n;
    vector<pii> m(n);
    for (pii &i : m) cin >> i.F >> i.S;
    sort(all(m), [](pii a, pii b) { return a.S < b.S; });
    int now_e = 0, ans = 0;
    
    for (pii i : m) {
        if (i.F >= now_e) ans++, now_e = i.S;
    }
    cout << ans << '\n';
    return 0;
}
```

## Sum of Two Values

```c++ Sum of Two Values
#include <bits/stdc++.h>
using namespace std;
/* TYPES  */
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vi vector<int>
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
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    ios;
    int n, x, divide = -1;
    map<int, int> arr;
    cin >> n >> x;
    if (x % 2 == 0) divide = x / 2;
    rep(i, 1, n) {
        int a;
        cin >> a, arr.insert({a, i});
        if (a == x / 2 && divide != -1) {
            if (divide != x / 2) {
                cout << divide - x / 2 sp i << '\n';
                return 0;
            }
            divide += i;
        }
    }
    bool ok = false;
    for (pii i : arr) {
        if (i.F==x-i.F) continue;
        if (arr.count(x - i.F)) {
            cout << i.S sp arr[x - i.F] << '\n';
            ok = true;
            break;
        }
    }
    if (!ok) cout << "IMPOSSIBLE\n";
    return 0;
}
```

## Maximum Subarray Sum

```c++ Maximum Subarray Sum
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
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

int dp[200005], arr[200005];

signed main() {
    ios;
    int n, ans;
    cin >> n;
    rep(i, 1, n) cin >> arr[i];
    ans = dp[1] = arr[1];
    rep(i, 2, n) tomax(ans, dp[i] = max((int)0, dp[i - 1]) + arr[i]);
    cout << ans << '\n';
    return 0;
}
```

## Stick Lengths

```c++ Stick Lengths
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
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    ios;
    int n;
    cin >> n;
    vi arr(n);
    for (int &i : arr) cin >> i;
    sort(all(arr));
    int mid = arr[n / 2], ans = 0;
    for (int i : arr) ans += abs(i - mid);
    cout << ans << '\n';
    return 0;
}
```

## Missing Coin Sum

```c++ Missing Coin Sum
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
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    ios;
    int n, add = 0;
    cin >> n;
    vi arr(n);
    for (int &i : arr) cin >> i;
    sort(all(arr));
    for (int i : arr) {
        if (i - 1 > add) {
            cout << add+1 << '\n';
            return 0;
        }add += i;
    }
    cout << add + 1;
    return 0;
}
```

## Collecting Numbers

```c++ Collecting Numbers
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
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    ios;
    int n, idx=0, ans=0;
    cin >> n;
    vi arr(n), r(n+1);
    for(int &i : arr) cin >> i, r[i]=idx++;
    rep(i, 1, n){
        while(i<n && r[i+1] > r[i]) i++;
        ans++;
    }cout << ans << '\n';
    return 0;
}
```

## Collecting Numbers II

```c++ Collecting Numbers II
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
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    // ios;
    int n, idx = 0, ans = 0, m;
    cin >> n >> m;
    vi arr(n), r(n + 1);
    for (int &i : arr) cin >> i, r[i] = idx++;
    rep(i, 1, n) {
        while (i < n && r[i + 1] > r[i]) i++;
        ans++;
    }
    // cout << ans << '\n';
    while (m--) {
        int a, b;
        cin >> a >> b, a--, b--;
        int x = arr[a], y = arr[b];
        swap(arr[a], arr[b]);
        if (x-1>=0 && r[x-1] <= r[x] && r[x-1] > b) ans++;
        if (x-1>=0 && r[x-1] > r[x] && r[x-1] <= b) ans--;
        if (x+1<=n && r[x] <= r[x+1] && b > r[x+1]) ans++;
        if (x+1<=n && r[x] > r[x+1] && b <= r[x+1]) ans--;
        r[x] = b;
        if (y-1>=0 && r[y-1] <= r[y] && r[y-1] > a) ans++;
        if (y-1>=0 && r[y-1] > r[y] && r[y-1] <= a) ans--;
        if (y+1<=n && r[y] <= r[y+1] && a > r[y+1]) ans++;
        if (y+1<=n && r[y] > r[y+1] && a <= r[y+1]) ans--;
        r[y] = a;
        cout << ans << '\n';
    }
    return 0;
}
```

## Playlist

```c++ Playlist
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
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    ios;
    int n;
    cin >> n;
    vector<int> arr(n);
    for(int & i: arr) cin >> i;
    int l=0, r=1, len = 1;
    map<int, int> nums;
    nums[arr[0]]=1;
    while(r<n){
        while(r<n && nums[arr[r]]==0) nums[arr[r]]=1, r++;
        // cout << l sp r << '\n';
        tomax(len, r-l);
        nums[arr[l]]=0, l++;
    }cout << len << '\n';
    return 0;
}
```

## Towers

```c++ Towers
#include <bits/stdc++.h>
using namespace std;
#define int long long
#define pii pair<int, int>
#define F first 
#define S second
#define vi vector<int>
#define vii vector<pii>
#define si set<int>
#define mi map<int, int>

#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int j = a; j >=b; j++)
#define tomax(a, b) (a)=max((a),(b))
#define tomin(a,b) (a)=max((a,),(b))
#define pob pop_back
#define eb emplace_back
#define pb push_back
#define all(a) a.begin(),a.end()
#define rall(a) a.rbegin(),a.rend()
#define sp << " " <<
#define ios ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);

signed main(){
    ios;
    int n;
    cin >> n;
    multiset<int> t;
    rep(i, 1, n){
        int k;
        cin >> k, t.insert(k);
        if(*t.rbegin()>k && t.upper_bound(k)!=t.end()) t.erase(t.upper_bound(k));
        // for(int i : t) cout << i << ' ';
        // cout << '\n';
    }cout << t.size() << '\n';
    return 0;
}
```

## Traffic Lights

```c++ Traffic Lights
#include <bits/stdc++.h>
using namespace std;

#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vi vector<int>
#define vii vector<int, int>
#define si set<int>
#define mii map<int, int>
#define rep(i, a, b) for (int i = a; i <= b; i++)
#define rev(i, a, b) for (int i = a; i >= b; i--)
#define tomax(a, b) (a) = max((a), (b))
#define tomin(a, b) (a) = min((a), (b))
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define all(a) a.begin(), a.end()
#define rall(a) a.rbegin(), a.rend()
#define sp << " " <<
#define ios ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);

signed main() {
    ios;
    int x, n;
    cin >> x >> n;
    vi l(n);
    for(int &i : l) cin >> i;
    si st;
    mii len;
    len[l[0]]++, len[x-l[0]]++, st.insert(l[0]);
    cout << (*len.rbegin()).F << ' ';
    l.erase(l.begin());
    for(int i : l){
        auto up = st.lower_bound(i);
        if(up == st.begin()) {
            len[*up]--, len[*up-i]++, len[i]++, st.insert(i);
        }
        else{
            auto down = prev(up);
            if(up == st.end()) {
                len[x-*down]--, len[i-*down]++, len[x-i]++, st.insert(i);
            }else len[*up-*down]--, len[i-*down]++, len[*up-i]++, st.insert(i);
        }
        // for(auto i : len) cout << i.F << ' ' << i.S << '\n';
        while(((*len.rbegin()).S)==0)  len.erase(prev(len.end()));
        cout << (*len.rbegin()).F << ' ';
    }
    return 0;
}
```

## Josephus Problem I

```c++ Josephus Problem I
#include <bits/stdc++.h>

using namespace std;

#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define vi vector<int>
#define vii vector<pii>
#define si set<int>
#define mii map<int, int>

#define tomax(a,b) (a)=max((a),(b))
#define tomin(a,b) (A)=min((a),(b))
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a; i>=b; i++)
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define all(a) a.begin(), a.end()
#define rall(a) a.rbegin(), a.rend()
#define ios ios::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main(){
    // ios;
    int n; 
    cin >> n;
    list<int> arr;
    rep(i, 1, n) arr.push_back(i);
    auto idx = next(arr.begin());
    while(!arr.empty()){
        cout << *idx << ' ';
        if(arr.size()==1) break;
        else if(arr.size()==2) arr.erase(idx), idx=arr.begin(); 
        else if(idx==prev(arr.end())) arr.erase(idx), idx=next(arr.begin());
        else if(idx==prev(arr.end(),2)) arr.erase(idx), idx=arr.begin();
        else idx = next(idx, 2), arr.erase(prev(idx, 2));
    }
    return 0;
}
```

## Josephus Problem II

```c++ Josephus Problem II
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
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define lc idx * 2 + 1
#define rc idx * 2 + 2

int seg[1000006];
int n, k;

//[l,r)
void build(int idx, int l, int r) {
    if (r == l + 1)
        seg[idx] = 1;
    else {
        int mid = (r + l) / 2;
        build(lc, l, mid), build(rc, mid, r);
        seg[idx] = seg[lc] + seg[rc];
    }
}

void del(int idx, int l, int r, int pos) {
    seg[idx]--;
    int mid = (r + l) / 2;
    if (r == l + 1)  return;
    else if (pos >= mid) del(rc, mid, r, pos);
    else del(lc, l, mid, pos);
}

int query(int idx, int l, int r, int sum){
    // cerr << idx sp seg[idx] sp l sp r sp sum <<'\n';
    int mid = (l+r)/2;
    if(r==l+1) return l+sum;
    else if(sum>seg[lc]) return query(rc, mid, r, sum-seg[lc]);
    else return query(lc, l, mid, sum);
}

signed main() {
    ios;
    cin >> n >> k;
    k++;
    build(0, 0, n);
    int idx = 0;
    rev(i, n, 1){
        idx = (idx+(k%i))%i;
        if(idx == 0) idx = i;
        int pos = query(0, 0, n, idx);
        cout <<  pos << " ";
        del(0, 0, n, pos-1);
        idx--;
    }
    return 0;
}
```

## Nested Ranges Check

```c++ Nested Ranges Check
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
    int n, a, b;
    cin >> n;
    vector<bool> con(n), coned(n);
    vector<pair<pii, int>> ran;

    rep(i, 0, n - 1) cin >> a >> b, ran.pb({{a, b}, i});

    sort(all(ran), [](pair<pii, int> a, pair<pii, int> b) {
        if (a.F.F == b.F.F) return a.F.S > b.F.S;
        return a.F.F < b.F.F;
    });
    int max_r = 0;
    for (auto i : ran) {
        if (i.F.S > max_r)
            max_r = i.F.S, coned[i.S] = 0;
        else
            coned[i.S] = 1;
    }

    reverse(all(ran));
    int min_r = 2e9;
    for (auto i : ran) {
        if (i.F.S < min_r)
            min_r = i.F.S, con[i.S] = 0;
        else
            con[i.S] = 1;
    }

    for (bool i : con) cout << i << ' ';
    cout << '\n';
    for (bool i : coned) cout << i << ' ';
    return 0;
}

```

## Nested Ranges Count

```c++ Nested Ranges Count
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

int bit[200005];

void update(int n, int x, int chg){
    for(;x<=n; x+=(x&-x)) bit[x]+=chg;
}

int query(int x){
    int ans = 0;
    for(;x>=1; x-=(x&-x)) ans+=bit[x];
    return ans;
}

signed main() {
    // ios;
    int n, a, b;
    cin >> n;
    vi con(n), coned(n);
    mii bRank;
    vector<pair<pii, int>> range;

    rep(i, 0, n - 1) cin >> a >> b, range.pb({{a, b}, i}), bRank[b]=1;

    int nn=1;
    for(auto &i : bRank) i.S=nn++;
    nn--;

    sort(all(range), [](pair<pii, int> a, pair<pii, int> b) {
        if (a.F.F == b.F.F) return a.F.S > b.F.S;
        return a.F.F < b.F.F;
    });

    int cnt = 0;
    for (auto i : range) {
        coned[i.S] = cnt-query(bRank[i.F.S]-1);
        update(nn, bRank[i.F.S], 1);
        cnt++;
    }

    reverse(all(range));
    memset(bit, 0, sizeof(bit));
    for (auto i : range) {
        con[i.S] = query(bRank[i.F.S]);
        update(nn, bRank[i.F.S], 1);
        cnt++;
    }

    for (int i : con) cout << i << ' ';
    cout << '\n';
    for (int i : coned) cout << i << ' ';
    return 0;
}

```

## Room Allocation

```c++ Room Allocation
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
    int n, room = 0;
    cin >> n;
    vi ans(n);
    vector<pair<pii, int>> d(n);
    rep(i, 0, n - 1) cin >> d[i].F.F >> d[i].F.S, d[i].S = i;
    sort(all(d));
    priority_queue<pii, vii, greater<pii>> pq;
    for (auto i : d) {
        if (!pq.empty() && pq.top().F < i.F.F) {
            ans[i.S] = pq.top().S;
            pq.pop();
            pq.push({i.F.S, ans[i.S]});
        } else {
            ++room;
            pq.push({i.F.S, room});
            ans[i.S] = room;
        }
    }
    cout << room << '\n';
    for(int i : ans) cout << i << ' ';
    return 0;
}
```

## Factory Machines

```c++ Factory Machines
#include <bits/stdc++.h>

using namespace std;
#define int long long
#define pii pair<int, int>
#define vi vector<int>
#define vii vector<pii>
#define si set<int>
#define mii map<int, int>
#define F first
#define S second
#define tomin(a,b) (a)=min(a,b)
#define tomax(a,b) (a)=max(a,b)
#define rep(i, a,b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a; i>=b; i--)
#define pb push_back
#define eb emplace_back
#define pob pop_back
#define sp << ' ' <<
#define ios ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);

signed main(){
    ios;
    int n, t;
    cin >> n >> t;
    vi k(n);
    for(int &i : k) cin >> i;
    int l=0, r = 1e18+1;
    while(r>l){
        int mid = (r+l)/2;
        int p = 0;
        bool overflow = false;
        for(int i : k) p+=mid/i, overflow = overflow || p<0;
        if(p>=t || overflow) r=mid;
        else l=mid+1;
    }cout << r << '\n';
    return 0;
}
```

## Tasks and Deadlines

```c++ Tasks and Deadlines
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
    int n;
    cin >> n;
    vii t(n);
    for(auto &i : t) cin >> i.F >> i.S;
    sort(all(t));
    int ans = 0, time = 0;
    for(auto i : t){
        time+=i.F;
        ans += i.S-time;
    }
    cout << ans << '\n';
    return 0;
}
```

## Reading Books

```c++ Reading Books
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
    int n, sum = 0, max_time = 0;
    cin >> n;
    rep(i, 1, n) {
        int t;
        cin >> t;
        tomax(max_time, t);
        sum += t;
    }
    cout << max(max_time * 2, sum);
    return 0;
}
```

## Sum of Three Values

```c++ Sum of Three Values
#include <bits/stdc++.h>
using namespace std;
#define F first
#define S second
#define rep(i, a, b) for (int i = a; i <= b; ++i)
#define sp << " " <<
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

signed main() {
    ios;
    int n, x;
    cin >> n >> x;
    vector<pair<int, int>> num(n);
    rep(i, 1, n) cin >> num[i - 1].F, num[i - 1].S = i;
    sort(num.begin(), num.end());
    rep(i, 0, n-1) {
        int tar = x - num[i].F;
        int l = 0, r = n - 1;
        while (r > l) {
            if (l != i && r != i && num[l].F + num[r].F == tar) {
                cout << num[l].S sp num[r].S sp num[i].S << '\n';
                return 0;
            }
            if (num[l].F + num[r].F > tar)
                r--;
            else
                l++;
        }
    }
    cout << "IMPOSSIBLE\n";

    return 0;
}
```

## Sum of Four Values

```c++ Sum of Four Values
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
    int n, x;
    cin >> n >> x;
    vii num(n);
    rep(i, 1, n) cin >> num[i - 1].F, num[i - 1].S = i;
    sort(all(num));
    unordered_map<int, pii> pos;
    rep(i, 0, n - 1) {
        rep(j, i + 1, n - 1) {
            auto pt = pos.find(x - num[i].F - num[j].F);
            if (pt != pos.end()) {
                cout << num[i].S sp num[j].S sp pt->S.F sp pt->S.S << '\n';
                return 0;
            }
        }
        rep(j, 0, i - 1)
            pos.insert({num[i].F + num[j].F, {num[i].S, num[j].S}});
    }
    cout << "IMPOSSIBLE\n";
    return 0;
}
```

## Nearest Smaller Values

```c++ Nearest Smaller Values
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
    int n;
    cin >> n;
    vii arr;
    rep(i, 1, n) {
        int x;
        cin >> x;
        while(!arr.empty() && arr.back().F>=x) arr.pob();
        if(!arr.empty()) cout << arr.back().S << ' ';
        else cout << "0 ";
        arr.eb(x,i);
    }
    return 0;
}

```

## Subarray Sums I

```c++ Subarray Sums I
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
    int n, x, ans = 0;
    cin >> n >> x;
    vi arr(n);
    for(int &i : arr) cin >> i;
    int r = 1, l=0, sum=arr[0];
    while(r<=n){
        if(sum==x) ans++, sum+=arr[r++];
        else if(sum<x) sum+=arr[r++];
        else sum-=arr[l++];
    }cout << ans << '\n';
    return 0;
}
```

## Subarray Sums II

```c++ Subarray Sums II
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
    int n, x, ans = 0;
    cin >> n >> x;
    vi sum(n+1);
    map<int, vi> ms;
    sum[0]=0;
    ms[0].eb(0);
    rep(i, 1, n) cin >> sum[i], sum[i]+=sum[i-1], ms[sum[i]].eb(i);
    rep(i, 1, n){
        if(!ms[sum[i]-x].empty() && *ms[sum[i]-x].begin()<i) ans+=(lower_bound(all(ms[sum[i]-x]),i)-ms[sum[i]-x].begin());
    }cout << ans << '\n';
    return 0;
}
```

## Subarray Divisibility

```c++ Subarray Divisibility
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
    int n, sum = 0, tmp, ans=0;
    cin >> n;
    mii m;
    m[0]=1;
    rep(i, 1, n){
        cin >> tmp;
        sum += tmp;
        ans += m[(sum%n+n)%n];
        m[(sum%n+n)%n]++;
    }cout << ans << '\n';
    return 0;
}
```

## Subarray Distinct Values

```c++ Subarray Distinct Values
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
    int n, k, ans = 0;
    cin >> n >> k;
    vi arr(n);
    for(int &i : arr) cin >> i;

    int l = 0, r=1;
    mii m;
    m[arr[0]]++;
    while(l<=n){
        while(r<=n && m.size()<=k) m[arr[r++]]++;
        ans+=r-1-l;
        m[arr[l]]--;
        if(m[arr[l]]==0) m.erase(arr[l]);
        l++;
    }cout << ans << '\n';
    return 0;
}
```

## Array Division

```c++ Array Division
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
    int n, k, r = 0, l = 0;
    cin >> n >> k;
    vi arr(n);
    for(int &i : arr) cin >> i, r+=i, tomax(l, i);
    while(r>l){
        int mid = (r+l)/2;
        int d = 1, sub_sum = 0;
        for(int i : arr)
            if(sub_sum+i > mid) d++, sub_sum=i;
            else sub_sum+=i;

        if(d<=k) r=mid;
        else l=mid+1;
    }cout << r << '\n';
    return 0;
}
```

## Sliding Window Median

```c++ Sliding Window Median
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
    int n, k, tmp;
    cin >> n >> k;
    vi arr;
    vector<set<pii>::iterator > parr;
    set<pii> sarr;
    rep(i, 0, k - 1) cin >> tmp, parr.eb(sarr.insert({tmp, i}).F), arr.eb(tmp);
    auto p = next(sarr.begin(), (k - 1) / 2);
    cout << p->F << ' ';
    rep(i, k, n-1) {
        cin >> tmp;
        parr.eb((sarr.insert({tmp,i})).F);
        arr.eb(tmp);
        if (arr[i - k] == p->F && tmp < p->F)
            p = prev(p);
        else if (arr[i - k] == p->F && tmp >= p->F)
            p = next(p);
        else if (arr[i - k] > p->F && tmp < p->F)
            p = prev(p);
        else if (arr[i - k] < p->F && tmp >= p->F)
            p = next(p);
        if(p==parr[i-k]) p=next(p);
        sarr.erase(parr[i-k]);
        cout << p->F << ' ';
    }
    return 0;
}
```

## Sliding Window Cost

```c++ Sliding Window Cost
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

int n, k;
vi arr;
multiset<int> ms[3];
int sum[3];

void ins(int val) {
    if (ms[0].empty()) {
        ms[0].insert(val);
        sum[1] += val;
        return;
    }
    int a = *ms[0].rbegin();
    if (a < val) {
        ms[1].insert(val);
        sum[0] += val;
        if (ms[1].size() > k / 2) {
            sum[1] += *ms[1].begin();
            sum[0] -= *ms[1].begin();
            ms[0].insert(*ms[1].begin());
            ms[1].erase(ms[1].begin());
        }
    } else {
        ms[0].insert(val);
        sum[1] += val;
        if (ms[0].size() > (k + 1) / 2) {
            sum[0] += *ms[0].rbegin();
            sum[1] -= *ms[0].rbegin();
            ms[1].insert(*ms[0].rbegin());
            ms[0].erase(prev(ms[0].end()));
        }
    }
}

void del(int val) {
    if (ms[1].empty()) {
        ms[0].erase(ms[0].find(val)), sum[1] -= val;
        return;
    }
    if (ms[1].find(val) != ms[1].end())
        ms[1].erase(ms[1].find(val)), sum[0] -= val;
    else
        ms[0].erase(ms[0].find(val)), sum[1] -= val;
    if (ms[0].empty()) {
        sum[1] += *ms[1].begin();
        sum[0] -= *ms[1].begin();
        ms[0].insert(*ms[1].begin());
        ms[1].erase(ms[1].begin());
    }
}

signed main() {
    // ios;
    cin >> n >> k;
    arr.resize(n);
    for (int &i : arr) cin >> i;
    for (int i = 0; i < k; i++) ins(arr[i]);
    cout << sum[0] - sum[1] + (k % 2 != 0) * (*ms[0].rbegin()) << ' ';
    for (int i = k; i < n; i++) {
        del(arr[i - k]);
        ins(arr[i]);
        cout << sum[0] - sum[1] + (k % 2 != 0) * (*ms[0].rbegin()) << ' ';
    }
    return 0;
}
```

## Movie Festival II

```c++ Movie Festival II
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
    int n, k, ans = 0;
    cin >> n >> k;
    vii arr(n);
    multiset<int> ms;
    for (pii &i : arr) cin >> i.F >> i.S;
    sort(all(arr), [](pii a, pii b) { return a.S < b.S; });
    rep(i, 1, k) ms.insert(-1);
    rep(i, 0, n - 1) {
        while (i < n && arr[i].F < *ms.begin()) i++;
        if (i == n) break;
        ms.erase(prev(ms.upper_bound(arr[i].F)));
        ms.insert(arr[i].S);
        ans++;
    }
    cout << ans << '\n';
    return 0;
}
```

## Maximum Subarray Sum II

```c++ Maximum Subarray Sum II
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
    int n, a, b, tmp, ans = -1e18;
    cin >> n >> a >> b;
    vi pre(n + 1);
    pre[0] = 0;
    rep(i, 1, n) cin >> tmp, pre[i] = pre[i - 1] + tmp;
    multiset<int> ms;
    rep(i, a, n) {
        if (i > b) ms.erase(ms.find(pre[i - b - 1]));
        ms.insert(pre[i-a]);
        tomax(ans, pre[i] - *ms.begin());
    }
    cout << ans << '\n';
    return 0;
}
```
