---
title: CSES Introductory Problem
lang: zh-TW
tags:
  - CSES
categories:
  - 程式題解
  - CSES
abbrlink: 23956
date: 2023-11-04
---

## 前言

想練一下程式所以就決定來刷CSES，另外還有個目標，我每個程式的模板都會承襲前一個的，CSES的題目基本上涵蓋全部的演算法，我之後就把每一個演算法都做包成一個template，這樣感覺寫起來就會超級快(雖然說程式前面的模板變超長就是了XD)，到時候就可以在Atcoder或是CF的比賽上超快寫出來🫠

<!--more-->

[CSES Problem Set](https://cses.fi/problemset/)  

[我的Profile](https://cses.fi/user/203349)

[我的程式們](https://github.com/moon-jam/CSES)

## Weird Algorithm

```c++ Weird Algorithm
#include<bits/stdc++.h>
#define int long long
using namespace std;
 
signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    int x;
    cin >> x;
    cout << x << ' ';
    while(x!=1){
        if(x%2) x=x*3+1;
        else x=x/2;
        cout << x << ' ';
    }
    return 0;
}
```

## Missing Number

```c++ Missing Number
#include<bits/stdc++.h>
#define int long long
using namespace std;
 
signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    int n;
    cin >> n;
    bool arr[200005];
    memset(arr, 0, sizeof(arr));
    for(int i = 0, tmp; i<n-1; i++)
        cin >> tmp, arr[tmp]=1;
    int ans;
    for(int i = 1; i<=n; i++)
        if(!arr[i])
            ans = i;
    cout << ans << '\n';
    return 0;
}
```

## Repetitions

```c++ Repetitions
#include<bits/stdc++.h>
#define int long long
#define eb emplace_back
#define pb push_back
#define tomax(a, b) ((a)=max(a,b))
#define tomin(a, b) ((a)=min(a,b))
using namespace std;
 
signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    string in;
    cin >> in;
    int ans = 1;
    vector<char> rep;
    rep.eb(in[0]);
    for(int i=1; in[i]; i++){
        if(in[i] != rep.back()) tomax(ans, (int)rep.size()), rep.clear();
        rep.eb(in[i]);
    }cout << tomax(ans, (int)rep.size()) << '\n';
    return 0;
}
```

## Increasing Array

```c++ Increasing Array
#include<bits/stdc++.h>
#define int long long
#define eb emplace_back
#define pb push_back
#define tomax(a, b) ((a)=max(a,b))
#define tomin(a, b) ((a)=min(a,b))
using namespace std;
 
signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    int n;
    cin >> n;
    int ans = 0, last;
    cin >> last;
    for(int i = 1, tmp; i<n; i++)
        cin >> tmp, ans+=(last-tmp)*(tmp<last), tomax(last, tmp);
    cout << ans << '\n';
    return 0;
}
```

## Permutations

```c++ Permutations
#include<bits/stdc++.h>
#define int long long
#define eb emplace_back
#define pb push_back
#define tomax(a, b) ((a)=max(a,b))
#define tomin(a, b) ((a)=min(a,b))
using namespace std;
 
signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    int n;
    cin >> n;
    if(n==1) cout << "1\n";
    else if(n<=3) cout << "NO SOLUTION\n";
    else if(n==4) cout << "3 1 4 2\n";
    else{
        for(int i = 1; i<=n; i+=2)
            cout << i << ' ';
        for(int i = 2; i<=n; i+=2)
            cout << i << ' ';
    }
    return 0;
}
```

## Number Spiral

```c++ Number Spiral
#include<bits/stdc++.h>
#define int long long
#define eb emplace_back
#define pb push_back
#define tomax(a, b) ((a)=max(a,b))
#define tomin(a, b) ((a)=min(a,b))
using namespace std;
 
signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    int t;
    cin >> t;
    while(t--){
        int y, x;
        cin >> y >> x;
        if(x >= y) 
            if(x%2) cout << x*x-(y-1) << '\n';
            else cout << (x-1)*(x-1)+(y) << '\n';
        else
            if(y%2==0) cout << y*y-(x-1) << '\n';
            else cout << (y-1)*(y-1)+(x) << '\n';
    }
    return 0;
}
```

## Two Knights

```c++ Two Knights
#include<bits/stdc++.h>
#define int long long
#define eb emplace_back
#define pb push_back
#define tomax(a, b) ((a)=max(a,b))
#define tomin(a, b) ((a)=min(a,b))
using namespace std;
 
signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    int n;
    cin >> n;
    cout << "0\n";
    for(int i = 2; i<=n; i++){
        cout << ((i*i)*(i*i-1))/2 - 2*(2*(i-1)*(i-2)) << '\n';
    }
    return 0;
}
```

## Two Sets

```c++ Two Sets
#include<bits/stdc++.h>
#define int long long
#define eb emplace_back
#define pb push_back
#define tomax(a, b) ((a)=max(a,b))
#define tomin(a, b) ((a)=min(a,b))
#define rep(i, a, b) for(int i = (a); i<=(b); ++i)
#define rev(i, a, b) for(int i = (a); i>=(b); --i)
using namespace std;
 
signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    int n;
    cin >> n;
    if((n*(n+1)/2) % 2) cout << "NO\n";
    else{
        cout << "YES\n";
        if(n%4 == 0){
            cout << n/2 << '\n';
            rep(i, 1, (n/4)) cout << i << ' ' << n+1-i << ' ';
            cout << '\n' << n/2 << '\n';
            rep(i, (n/4)+1, n/2) cout << i << ' ' << n+1-i << ' ';
        }else{
            cout << n/2 + 1 << '\n';
            rep(i, 1, n/2) cout << i++ << ' ';
            rep(i, n/2+1, n-1) cout << i++ << ' ';
            cout << '\n' << n/2 << '\n';
            rep(i, 2, n/2-1) cout << i++ << ' ';
            rep(i, n/2+2, n) cout << i++ << ' ';
        }
    }
    return 0;
}
```

## Bit Strings

```c++ Bit Strings
#include<bits/stdc++.h>
#define int long long
#define eb emplace_back
#define pb push_back
#define tomax(a, b) ((a)=max(a,b))
#define tomin(a, b) ((a)=min(a,b))
#define rep(i, a, b) for(int i = (a); i<=(b); ++i)
#define rev(i, a, b) for(int i = (a); i>=(b); --i)
using namespace std;
 
const int mod = 1E9 + 7;
 
signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    int n, ans = 1;
    cin >> n;
    rep(i, 1, n) ans = (ans<<1) % mod;
    cout << ans % mod << '\n';
    return 0;
}
```

## Trailing Zeros

```c++ Trailing Zeros
#include<bits/stdc++.h>
#define int long long
#define eb emplace_back
#define pb push_back
#define tomax(a, b) ((a)=max(a,b))
#define tomin(a, b) ((a)=min(a,b))
#define rep(i, a, b) for(int i = (a); i<=(b); ++i)
#define rev(i, a, b) for(int i = (a); i>=(b); --i)
using namespace std;
 
const int mod = 1E9 + 7;
 
signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    int n, ans=0;
    cin >> n;
    for(int i = 5; i<=n; i*=5){
        ans += n/i;
    }
    cout << ans << '\n';
    return 0;
}
```

## Coin Piles

```c++ Coin Piles
#include <bits/stdc++.h>
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
#define pii pair<int, int>
#define int long long
#define rep(i, a, b) for(int i = a; i<=b; i++ )
#define rev(i, a, b) for(int i = a; i>=b; i-- )
#define tomax(a, b) (a)=max((a), (b))
#define tomin(a, b) (a)=min((a), (b))
#define pb push_back
#define eb emplace_back
using namespace std;
 
signed main(){
    ios
    int t;
    cin >> t;
    while(t--){
        int a, b;
        cin >> a >>b;
        if(2*a-b>=0 && 2*b-a>=0 && (2*a-b)%3==0 && (2*b-a)%3==0)
            cout << "YES\n";
        else
            cout << "NO\n";
    }
    return 0;
}
```

## Palindrome Reorder

```c++ Palindrome Reorder
#include <bits/stdc++.h>
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
#define pii pair<int, int>
#define int long long
#define rep(i, a, b) for(int i = a; i<=b; i++ )
#define rev(i, a, b) for(int i = a; i>=b; i-- )
#define tomax(a, b) (a)=max((a), (b))
#define tomin(a, b) (a)=min((a), (b))
#define pb push_back
#define eb emplace_back
using namespace std;
 
signed main(){
    ios
    string s;
    char res[1000006];
    int ch[30], odd=0;
    fill(ch, ch+27, 0);
    cin >> s;
    for(int i = 0; s[i]; i++)
        ch[s[i]-'A']++;
    for(int i = 0; i<26; i++)
        odd+=ch[i]%2;
    if(odd>0 && s.size()%2==0){cout << "NO SOLUTION\n"; return 0;}
    if(odd!=1 && s.size()%2){cout << "NO SOLUTION\n"; return 0;}
    int idx = 0, n=s.size()-1;
    rep(i, 0, 25){
        if(ch[i]%2) ch[i]--, res[n/2]='A'+i;
        rev(j, ch[i], 1)
            res[idx]=res[n-idx]='A'+i, idx++, j--;
    }rep(i, 0, n) cout << res[i];
    cout << '\n';
    return 0;
}
```

## Gray Code

這題我有寫題解，[這邊](/CSES_2205)

```c++ Gray Code
#include <bits/stdc++.h>
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
#define pii pair<int, int>
#define int long long
#define rep(i, a, b) for(int i = a; i<=b; i++ )
#define rev(i, a, b) for(int i = a; i>=b; i-- )
#define tomax(a, b) (a)=max((a), (b))
#define tomin(a, b) (a)=min((a), (b))
#define pb push_back
#define eb emplace_back
using namespace std;
 
signed main(){
    ios
    int n;
    cin >> n;
    rep(i, 0, (1<<n)-1){
        cout << (i>>(n-1));
        rev(j, n-2, 0)
            cout << (((i>>j)&1) ^ ((i>>(j+1))&1));
        cout << '\n';
    }
    return 0;
}
```

## Tower of Hanoi

```c++ Tower of Hanoi
#include <bits/stdc++.h>
#define int long long 
#define pii pair<int, int>
#define F first 
#define S second
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a; i>=b; i--)
#define tomax(a,b) (a)=max((a), (b))
#define tomin(a,b) (a)=min((a), (b))
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
vector<pii> ans;
 
void move(int num, int from, int to){
    int use = 6-from-to;
    if(num == 1) ans.eb(from,to);
    else move(num-1,from,use), move(1,from,to), move(num-1,use,to);
}
 
signed main(){
    ios;
    int n;
    cin >> n;
    move(n, 1, 3);
    cout << ans.size() << '\n';
    for(pii i : ans)
        cout << i.F << ' ' << i.S << '\n';
    return 0;
}
```

## Creating Strings

```c++ Creating Strings
#include <bits/stdc++.h>
#define int long long 
#define pii pair<int, int>
#define F first 
#define S second
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a; i>=b; i--)
#define tomax(a,b) (a)=max((a), (b))
#define tomin(a,b) (a)=min((a), (b))
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
set<string> ans;
string s;
int len;
 
void select(int pos, string cur, bool used[10]){
    if(pos == len) {ans.insert(cur); return;}
    rep(i, 0, len-1){
        if(!used[i])
            used[i]=1, select(pos+1, cur+s[i], used),used[i] = 0;;
    }
}
 
signed main(){
    ios;
    cin >> s;
    len = s.size();
    string tmp; bool tmp2[10];
    memset(tmp2, 0, sizeof(tmp2));
    select(0,tmp,tmp2);
    cout << ans.size() << '\n';
    for(string i : ans)
        cout << i << '\n';
    return 0;
}
```

## Apple Division

```c++ Apple Division
#include <bits/stdc++.h>
#define int long long 
#define pii pair<int, int>
#define F first 
#define S second
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a; i>=b; i--)
#define tomax(a,b) (a)=max((a), (b))
#define tomin(a,b) (a)=min((a), (b))
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
signed main(){
    ios;
    int n, app[21];
    cin >> n;
    rep(i, 0, n-1) cin >> app[i];
    int ans = 1e11;
    rep(i, 0, (1<<n)-1){
        int a=0, b=0;
        rep(j, 0, n-1)
            a+=app[j]*((i>>j)&1), b+=app[j]*(((i>>j)&1)^1);
        tomin(ans, abs(a-b));
    }cout << ans << '\n';
    return 0;
}
```

## Chessboard and Queens

```c++ Chessboard and Queens
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a, i>=b; i--)
#define tomax(a, b) (a)=max((a),(b))
#define tomin(a,b) (a)-min((a),(b))
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
bool go[10][10];
int ans = 0;
 
bool check(int board[10]){
    bool ok = true;
    rep(i, 1, 8){
        if(!go[i][board[i]]) ok = false;
        rep(j, 1, 8)
            if(i!=j)
                ok = (ok && (board[j]!=board[i]+(j-i)) && (board[j]!=board[i]-(j-i)));
    }
    return ok;
}
 
void test(int pos, int board[10], bool dont[10]){
    if(pos == 9){ans+=check(board); return;}
    rep(i, 1, 8)
        if(!dont[i])
            board[pos]=i, dont[i]=1, test(pos+1, board, dont), dont[i]=0;
}
 
signed main(){
    ios;
    char cmd;
    rep(i,1,8)
        rep(j, 1, 8)
            cin >> cmd, go[j][i]=(cmd=='.');
    int blank[10]; bool blank2[10];
    memset(blank2, 0, sizeof(blank2));
    test(1, blank, blank2);
    cout << ans << '\n';
    return 0;
}
```

## Digit Queries

```c++ Digit Queries
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a, i>=b; i--)
#define tomax(a, b) (a)=max((a),(b))
#define tomin(a,b) (a)-min((a),(b))
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)
#define take(num, pos) ((pos==1) ? (num%10) : (num%pow[pos+1])/pow[pos])
using namespace std;
 
signed main(){
    ios;
    int q, u[20], pow[20];
    u[0]=0;
    for(int i = 1, add=1; i<=1e18; add++, i*=10)
        u[add] = u[add-1]+(i*10-i)*add, pow[add]=i;
    cin >> q;
    while(q--){
        int cmd;
        cin >> cmd;
        int pos = 0;
        while(cmd>u[pos]) pos++;
        int num = cmd<10 ? cmd : ((cmd-u[pos-1]-1)/(pos) + pow[pos]);
        // cout << num << ' ' << pos << ' ' << u[pos-1] << ' ' << (pos-((cmd-u[pos-1]-1)%pos)) << '\n';
        cout << (cmd<10? cmd : (take(num, pos-((cmd-u[pos-1]-1)%pos))) ) << '\n';
    }
    return 0;
}
```

## Grid Paths

唯一一題卡住跑去看別人題解的，因為直接暴力一定爆，發現有神奇判別不可能的方法，幫上下都走過左右沒走過，左右都走過上下沒走過就一定不可能，否則就有可能繞完整張圖，這樣就只會有88418次，超酷的。

```c++ Grid Paths
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for(int i = a; i<=b; i++)
#define rev(i, a, b) for(int i = a, i>=b; i--)
#define tomax(a, b) (a)=max((a),(b))
#define tomin(a,b) (a)-min((a),(b))
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;
 
int ans = 0, board[10][10];
string s;
bool vis[10][10];
 
void dfs(int go, int x, int y){
    if(vis[x][y]) return;
    if(x==1 && y==7){ ans+=(go==48); return; }
    if(vis[x][y+1] && vis[x][y-1] && !vis[x-1][y] && !vis[x+1][y]) return;
    if(!vis[x][y+1] && !vis[x][y-1] && vis[x-1][y] && vis[x+1][y]) return;
    vis[x][y]=1;
    if(s[go]=='D' || s[go]=='?') dfs(go+1, x, y+1);
    if(s[go]=='U' || s[go]=='?') dfs(go+1, x, y-1);
    if(s[go]=='L' || s[go]=='?') dfs(go+1, x-1, y);
    if(s[go]=='R' || s[go]=='?') dfs(go+1, x+1, y);
    vis[x][y]=0;
}
 
signed main(){
    ios;
    cin >> s;
    memset(vis, 0, sizeof(vis));
    rep(i, 0, 8)
        vis[i][0]=vis[i][8]=vis[0][i]=vis[8][i]=1;
    dfs(0, 1, 1);
    cout << ans << '\n';
    return 0;
}
```

## 結語

其實寫Introductory Problem蠻爽的，幾乎一次就AC，用來刷成就感的😏
