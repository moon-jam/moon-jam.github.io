---
title: CSES Graph Algorithms
lang: zh-TW
tags:
  - CSES
categories:
  - 程式題解
  - CSES
abbrlink: 23956
date: 2024-05-06
---

## CSES Graph Algorithms

CSES Graph Algorithms 的 AC 程式碼

<!--more-->

[CSES Problem Set](https://cses.fi/problemset/)  

[我的Profile](https://cses.fi/user/203349)

[我的程式們](https://github.com/moon-jam/CSES)

## Counting Rooms

```c++ Counting Rooms
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i,a,b) for(int i = a; i<=b; i++)
#define rev(i,a,b) for(int i = a; i>=b; i--)
#define tomax(a,b) (a)=max(a,b)
#define tomin(a,b) (a)=min(a,b)
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
using namespace std;

int n, m, room=0;
bool is_floor[1003][1003];

void dfs(int i, int j){
    if(!is_floor[i][j]) return;
    is_floor[i][j]=0;
    dfs(i+1,j), dfs(i-1,j), dfs(i,j+1), dfs(i,j-1);
}

signed main(){
    ios;
    cin >> n >> m;
    char tmp;
    memset(is_floor, 0, sizeof(is_floor));
    rep(i, 1, n)
        rep(j, 1, m)
            cin>>tmp, is_floor[i][j]=(tmp=='.');
    rep(i, 1, n)
        rep(j, 1, m)
            if(is_floor[i][j])
                room++, dfs(i, j);
    cout << room << '\n';
    return 0;
}
```

## Labyrinth

```c++ Labyrinth
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for(int i = a; i<=b; ++i)
#define rev(i, a, b) for(int i = a; i>=b; --i)
#define tomax(a, b) (a)=max((a),(b))
#define tomin(a, b) (a)=min((a),(b))
#define all(a) a.begin(), a.end()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)
using namespace std;

int n, m;
pii a, b;
bool find_path = false;
bool graph[1003][1003];
queue<pii> q;
vector<char> path;
int dir[1003][1003];

signed main(){
    ios;
    memset(graph, 0, sizeof(graph));
    cin >> n >> m;
    char tmp;
    rep(i, 1, n)
        rep(j, 1, m)
            cin >> tmp, graph[j][i]=(tmp!='#'&&tmp!='A'),
            a = (tmp=='A' ? make_pair(j,i) : a),
            b = (tmp=='B' ? make_pair(j,i) : b);
    q.push(a);
    while(q.size()){
        int x = q.front().F, y = q.front().S; q.pop();
        if(x==b.F && y==b.S){ find_path=true; break;}
        if(graph[x-1][y]) dir[x-1][y]='L', graph[x-1][y]=0, q.push({x-1, y});
        if(graph[x+1][y]) dir[x+1][y]='R', graph[x+1][y]=0, q.push({x+1, y});
        if(graph[x][y-1]) dir[x][y-1]='U', graph[x][y-1]=0, q.push({x, y-1});
        if(graph[x][y+1]) dir[x][y+1]='D', graph[x][y+1]=0, q.push({x, y+1});
    }
    if(!find_path){cout << "NO\n"; return 0;}
    while(a!=b){
        path.pb(dir[b.F][b.S]);
        if(dir[b.F][b.S]=='L') b={b.F+1, b.S};
        else if(dir[b.F][b.S]=='R') b={b.F-1, b.S};
        else if(dir[b.F][b.S]=='U') b={b.F, b.S+1};
        else if(dir[b.F][b.S]=='D') b={b.F, b.S-1};
    }reverse(all(path));
    cout << "YES\n" << path.size() << '\n';
    for(char i : path) cout << i;
    cout << '\n';
    return 0;
}
```

## Building Roads

```c++ Building Roads
#include <bits/stdc++.h>
#define int long long
#define pii pair<int, int>
#define F first
#define S second
#define rep(i, a, b) for(int i = a; i<=b; ++i)
#define rev(i, a, b) for(int i = a; i>=b; --i)
#define tomax(a, b) (a)=max((a),(b))
#define tomin(a, b) (a)=min((a),(b))
#define all(a) a.begin(), a.end()
#define pob pop_back
#define pb push_back
#define eb emplace_back
#define ios ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0)

using namespace std;

int bose[100005];

int fb(int ch){
    if(ch==bose[ch]) return ch;
    return bose[ch]=fb(bose[ch]);
}

signed main(){
    ios;
    // minimum spanning tree
    int n, m, connect=0;
    cin >> n >> m;
    vector<pii> E(m);
    for(pii &x : E) cin >> x.F >> x.S;
    rep(i, 1, n) bose[i]=i;
    for(pii path : E){
        if(connect==0 || fb(path.F) != fb(path.S))
            bose[fb(path.F)]=bose[fb(path.S)], connect++;
    }cout << n-1-connect << '\n';
    rep(i, 2, n){
        if(fb(i-1)!=fb(i))
            bose[fb(i-1)]=bose[fb(i)], cout << i-1 << ' ' << i << '\n';
    }
    return 0;
}

```

## Message Route

```c++ Message Route
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

int n, m, tmp1, tmp2;
int last_cpu[100005];
vector<int> E[100005];
vector<int> ans;

signed main() {
    ios;
    // BFS
    fill(last_cpu, last_cpu+100005, INT_MAX);
    cin >> n >> m;
    rep(i, 1, m) cin >> tmp1 >> tmp2, E[tmp1].eb(tmp2), E[tmp2].eb(tmp1);
    queue<int> q;
    q.push(1); last_cpu[1]=1;
    while(!q.empty()){
        int cur = q.front();
        q.pop();
        for(int x : E[cur])
            if(last_cpu[x]==INT_MAX) q.push(x), last_cpu[x]=cur;
    }
    if(last_cpu[n]!=INT_MAX){
        while(n!=1){
            ans.pb(n);
            n=last_cpu[n];
        }cout << ans.size()+1 << '\n';
        reverse(all(ans));
        cout << 1 << ' ';
        for(int x : ans) cout << x << ' ';
    }else{
        cout << "IMPOSSIBLE\n";
    }
    return 0;
}
```

## Building Teams

```c++ Building Teams
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

vi E[100005];
vi team;
int n, m, tmp1, tmp2;
bool build_team = true;

void dfs(int r) {
    int draw = team[r] % 2 + 1;
    for (int i : E[r]) {
        if (team[i] == 0)
            team[i] = draw, dfs(i);
        else if (team[i] == draw)
            continue;
        else {
            build_team = false;
            return;
        }
    }
}

signed main() {
    ios;
    // bipartite graph
    cin >> n >> m;
    team.resize(n + 1), team.assign(n + 1, 0);
    rep(i, 1, m) {
        cin >> tmp1 >> tmp2;
        E[tmp1].eb(tmp2), E[tmp2].eb(tmp1);
    }
    rep(i, 1, n) {
        if (team[i] == 0) team[i] = 1, dfs(i);
    }
    if (build_team) {
        team.erase(team.begin());
        for (int i : team) cout << i << ' ';
    } else
        cout << "IMPOSSIBLE";
    return 0;
}
```

## Round Trip

```c++ Round Trip
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

int n, m, min_l = INT_MAX, min_ls, min_le;
vi E[100005];
int lev[100005], parent[100005];
bool vis[100005];

void dfs(int u) {
    if (vis[u]) return;
    vis[u] = 1;
    for (int i : E[u]) {
        if (!vis[i])
            lev[i] = lev[u] + 1, parent[i] = u, dfs(i);
        else if(lev[u] > lev[i] && i != parent[u]){
            int path = lev[u] - lev[i] + 2;
            if (path < min_l) min_l=path, min_ls = u, min_le = i;
        }
    }
}

signed main() {
    ios;
    int tmp1, tmp2;
    memset(vis, 0, sizeof(vis));
    memset(lev, 0, sizeof(lev));
    cin >> n >> m;
    rep(i, 1, m) cin >> tmp1 >> tmp2, E[tmp1].eb(tmp2), E[tmp2].eb(tmp1);
    rep(i, 1, n) dfs(i);
    if(min_l == INT_MAX) cout << "IMPOSSIBLE\n";
    else{
        cout << min_l << '\n';
        tmp1 = min_ls;
        rep(i, 2, min_l){
            cout << min_ls << ' ';
            min_ls = parent[min_ls];
        }cout << tmp1 << '\n';
    }
    return 0;
}
```

## Monsters

```c++ Monsters
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

bool vis[1003][1003];
bool vis_h[1003][1003];

signed main() {
    ios;
    int n, m;
    char g[1003][1003];
    cin >> n >> m;
    queue<pair<pii, bool> > pt;
    int from[1003][1003];
    bool ok = 0;
    pair<pii, bool> a;
    pii de;
    int dir_x[5] = {1, 0, -1, 0}, dir_y[5] = {0, 1, 0, -1};
    char dir[5] = {'D', 'R', 'U', 'L'};

    rep(i, 0, n - 1) rep(j, 0, m - 1) {
        cin >> g[i][j];
        if (g[i][j] == '#') vis[i][j] = 1;
        if (g[i][j] == 'M') pt.push({{i, j}, 0}), vis[i][j] = 1;
        if (g[i][j] == 'A') a = {{i, j}, 1}, vis_h[i][j] = 1;
    }
    pt.push(a);
    while (!pt.empty()) {
        // 0 U, 1 R, 2 D, 3 L
        auto x = pt.front();
        pt.pop();
        // cout << x.F.F sp x.F.S << '\n';
        if (!x.S) {
            rep(i, 0, 3) {
                int xx = x.F.F + dir_x[i], yy = x.F.S + dir_y[i];
                if (!vis[xx][yy] && xx >= 0 && xx <= n - 1 && yy >= 0 &&
                    yy <= m - 1) {
                    pt.push({{xx, yy}, 0});
                    vis[xx][yy] = 1;
                }
            }
        } else if (x.S && (x.F.F == 0 || x.F.S == 0 || x.F.F == n - 1 ||
                           x.F.S == m - 1)) {
            // cout << x.F.F sp x.F.S << '\n';
            ok = 1;
            de = {x.F.F, x.F.S};
            break;
        } else if (x.S) {
            // cout << x.F.F sp x.F.S << '\n';
            // cout << '\n';
            rep(i, 0, 3) {
                if (!vis[x.F.F + dir_x[i]][x.F.S + dir_y[i]] &&
                    !vis_h[x.F.F + dir_x[i]][x.F.S + dir_y[i]]) {
                    pt.push({{x.F.F + dir_x[i], x.F.S + dir_y[i]}, 1});
                    vis_h[x.F.F + dir_x[i]][x.F.S + dir_y[i]] = 1;
                    from[x.F.F + dir_x[i]][x.F.S + dir_y[i]] = i;
                }
            }
        }
    }
    if (!ok)
        cout << "NO\n";
    else {
        cout << "YES\n";
        vector<char> ans;
        while (de.F != a.F.F || de.S != a.F.S) {
            // cout << de.F sp de.S << '\n';
            int tmpF = de.F;
            ans.eb(dir[from[de.F][de.S]]);
            de.F -= dir_x[from[de.F][de.S]];
            de.S -= dir_y[from[tmpF][de.S]];
            // cout << de.F sp de.S << "\n\n";
        }
        cout << ans.size() << '\n';
        reverse(all(ans));
        for (char i : ans) cout << i;
    }
    return 0;
}
```

## Shortest Routes I

```c++ Shortest Routes I
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

int dis[100005];
vii g[100005];
int n, m, a, b, c;
bool vis[100005];

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m) cin >> a >> b >> c, g[a].eb(b, c);
    priority_queue<pii, vii, greater<pii>> pq;
    rep(i, 1, n) dis[i] = 1e18;
    dis[1] = 0, pq.push({0, 1});
    while (!pq.empty()) {
        pii cur = pq.top();
        pq.pop();
        if (vis[cur.S]) continue;
        vis[cur.S] = 1;
        for (pii i : g[cur.S]) {
            if (cur.F + i.S < dis[i.F]) {
                dis[i.F] = cur.F + i.S;
                pq.push({dis[i.F], i.F});
            }
        }
    }
    rep(i, 1, n) cout << dis[i] << ' ';
    return 0;
}
```

## Shortest Routes II

```c++ Shortest Routes II
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

int n, m, q, a, b, c;
int dp[502][502];

signed main() {
    ios;
    rep(i, 0, 500) rep(j, 0, 500) dp[i][j] = 1e18 * (i!=j);
    cin >> n >> m >> q;
    rep(i, 1, m) {
        cin >> a >> b >> c;
        dp[a][b] = dp[b][a] = min(dp[a][b], c);
    }
    rep(k, 1, n) rep(i, 1, n) rep(j, 1, n) tomin(dp[i][j], dp[i][k] + dp[k][j]);
    while (q--) {
        cin >> a >> b;
        if (dp[a][b] == 1e18)
            cout << "-1\n";
        else
            cout << dp[a][b] << '\n';
    }
    return 0;
}
```

## High Score

```c++ High Score
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

int n, m, a, b, x;
vector<pair<pii, int>> g;
vi hg[3005], rg[3005];
int dis[3005];
bool bad = false;
bool vis[3005], rvis[3005];

void dfs(int rt){
    if(vis[rt]) return;
    vis[rt] = 1;
    for(int i : hg[rt]) dfs(i);
}

void rdfs(int rt){
    if(rvis[rt]) return;
    rvis[rt] = 1;
    for(int i : rg[rt]) rdfs(i);
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m) {
        cin >> a >> b >> x;
        g.pb({{a, b}, x});
        hg[a].eb(b), rg[b].eb(a);
    }
    dfs(1), rdfs(n);
    dis[1] = 0;
    rep(i, 2, n) dis[i] = -1e18;
    rep(j, 1, n) {
        for (auto i : g) {
            if (dis[i.F.S] < dis[i.F.F] + i.S) {
                dis[i.F.S] = dis[i.F.F] + i.S;
                if (j == n && vis[i.F.S] && rvis[i.F.S]) bad = 1;
            }
        }
    }
    if (bad)
        cout << "-1\n";
    else
        cout << dis[n] << '\n';
    return 0;
}
```

### SPFA

```c++ High Score - SPFA
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

int n, m, a, b, x;
vii g[3005];
vi hg[3005], rg[3005];
int dis[3005], cnt[3005];
bool bad = false;
bool vis[3005], rvis[3005];
bool inq[3005];

void dfs(int rt) {
    if (vis[rt]) return;
    vis[rt] = 1;
    for (int i : hg[rt]) dfs(i);
}

void rdfs(int rt) {
    if (rvis[rt]) return;
    rvis[rt] = 1;
    for (int i : rg[rt]) rdfs(i);
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m) {
        cin >> a >> b >> x;
        g[a].eb(b, x);
        hg[a].eb(b), rg[b].eb(a);
    }
    dfs(1), rdfs(n);
    queue<int> q;
    rep(i, 1, n) dis[i] = -1e18;
    dis[1] = 0, q.push(1);
    bool bye = false;
    while (!q.empty() && !bye) {
        int cur = q.front();
        q.pop();
        inq[cur] = 0;
        for (auto i : g[cur]) {
            if (dis[i.F] < dis[cur] + i.S) {
                dis[i.F] = dis[cur] + i.S;
                if (!inq[i.F]) inq[i.F] = 1, q.push(i.F);
                cnt[i.F]++;
                if (cnt[i.F] >= n && vis[i.F] && rvis[i.F]) {
                    bad = 1;
                    bye = true;
                    break;
                }
                if (cnt[i.F] >= 2 * n) {
                    bye = 1;
                    break;
                }
            }
        }
    }
    if (bad)
        cout << "-1\n";
    else
        cout << dis[n] << '\n';
    return 0;
}
```

## Flight Discount

```c++ Flight Discount
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

int n, m, a, b, x;
vii g[100005], rg[100005];
int dis[100005], rdis[100005];
bool vis[100005], rvis[100005];

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m) cin >> a >> b >> x, g[a].eb(b, x), rg[b].eb(a, x);
    priority_queue<pii, vii, greater<pii>> pq;
    pq.push({0, 1}), dis[1] = 0;
    rep(i, 2, n) dis[i] = 1e18;
    while (!pq.empty()) {
        pii cur = pq.top();
        pq.pop();
        if (vis[cur.S]) continue;
        vis[cur.S] = 1;
        for (pii i : g[cur.S]) {
            if (cur.F + i.S < dis[i.F]) {
                dis[i.F] = cur.F + i.S;
                pq.push({dis[i.F], i.F});
            }
        }
    }
    pq.push({0, n}), rdis[n] = 0;
    rep(i, 1, n-1) rdis[i] = 1e18;
    while (!pq.empty()) {
        pii cur = pq.top();
        pq.pop();
        if (rvis[cur.S]) continue;
        rvis[cur.S] = 1;
        for (pii i : rg[cur.S]) {
            if (cur.F + i.S < rdis[i.F]) {
                rdis[i.F] = cur.F + i.S;
                pq.push({rdis[i.F], i.F});
            }
        }
    }
    int ans = 1e18;
    rep(i, 1, n) {
        for (pii j : g[i]) tomin(ans, dis[i] + j.S / 2 + rdis[j.F]);
    }
    cout << ans << '\n';
    return 0;
}
```

## Cycle Finding

```c++ Cycle Finding
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
    int n, m, nc = 0;
    cin >> n >> m;
    vii dis(n+1);
    vector<tuple<int, int, int> > g(m);
    for(auto &[a, b, c] : g) cin >> a >> b >> c;
    rep(i, 1, n){
        nc = 0;
        for(auto [a, b, c] : g){
            if(dis[b].F > dis[a].F+c){
                dis[b].F = dis[a].F + c;
                dis[b].S = a;
                nc = a;
            }
        }
    }

    if (nc) {
        cout << "YES\n";
        rep(i, 1, n) nc = dis[nc].S;
        cout << nc;
        vi ans;
        ans.eb(nc);
        for(int cur = dis[nc].S; cur != nc; cur = dis[cur].S) ans.eb(cur);
        reverse(all(ans));
        for(int i : ans) cout sp i;
    } else {
        cout << "NO\n";
    }
    return 0;
}
```

### SPFA

```c++ Cycle Finding - SPFA
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
 
vii g[3003];
pii dis[3003];
int n, m, a, b, c;
int nc = 0;
vi ans;
int vis[3003];
bool inq[3003];
 
signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m) cin >> a >> b >> c, g[a].eb(b, c);
    
    queue<int> q;
    rep(i, 1, n) q.push(i), inq[i] = 1;
    while(!q.empty() && !nc){
        int cur = q.front();
        q.pop();
        inq[cur] = 0;
        for(pii i : g[cur]){
            if(dis[i.F].F > dis[cur].F + i.S){
                dis[i.F].F = dis[cur].F + i.S;
                dis[i.F].S = cur;
                vis[i.F]++;
                if(vis[i.F]>=n) {nc=i.F; break;}
                if(!inq[i.F]) q.push(i.F), inq[i.F] = 1;
            }
        }
    }
    
    if (nc) {
        cout << "YES\n";
        rep(i, 1, n) nc = dis[nc].S;
        cout << nc;
        vi ans;
        ans.eb(nc);
        for(int cur = dis[nc].S; cur != nc; cur = dis[cur].S) ans.eb(cur);
        reverse(all(ans));
        for(int i : ans) cout sp i;
    } else {
        cout << "NO\n";
    }
    return 0;
}
```

## Flight Routes

```c++ Flight Routes
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

int n, m, k, a, b, w;
vi dis[100005];
vii g[100005];

signed main() {
    ios;
    cin >> n >> m >> k;
    rep(i, 1, m) cin >> a >> b >> w, g[a].eb(b, w);
    priority_queue<pii, vii, greater<pii> > pq;
    pq.push({0, 1});
    while (!pq.empty()) {
        pii cur = pq.top();
        pq.pop();
        if (dis[cur.S].size() >= k) continue;
        dis[cur.S].eb(cur.F);
        for (pii i : g[cur.S]) pq.push({cur.F + i.S, i.F});
    }
    for (int i : dis[n]) cout << i << ' ';
    return 0;
}
```

## Round Trip II

```c++ Round Trip II
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

int n, m, a, b;
vi g[100005];
vi ans;
bool vis[100005];
bool cur_vis[100005];

int dfs(int rt) {
    if (cur_vis[rt] || !ans.empty()) return 0;
    vis[rt] = cur_vis[rt] = 1;
    for (int i : g[rt]) {
        if (cur_vis[i]) {
            ans.eb(i), ans.eb(rt);
            return i;
        } else if(!vis[i]) { // 若是vis[i]，則代表以i作為其中一點，一定不會形成環
            int flag = dfs(i);
            if (!flag && !ans.empty()) return 0;
            if (!flag) continue;
            ans.eb(rt);
            if (flag == rt) return 0;
            return flag;
        }
    }
    cur_vis[rt] = 0;
    return 0;
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m) cin >> a >> b, g[a].eb(b);
    rep(i, 1, n) if (!vis[i] && ans.empty()) dfs(i);
    if (ans.empty())
        cout << "IMPOSSIBLE";
    else {
        cout << ans.size() << '\n';
        reverse(all(ans));
        for (int i : ans) cout << i << ' ';
    }
    return 0;
}
```

## Course Schedule

```c++ Course Schedule
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

int n, m;
vi g[100005];
int deg[100005];

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m){
        int a, b;
        cin >> a >> b;
        deg[b]++;
        g[a].eb(b);
    }
    queue<int> q;
    vi ord;
    int cnt = 0;
    rep(i, 1, n) {
        if(deg[i]==0) q.push(i);
    }
    while(!q.empty()){
        ord.eb(q.front()), q.pop();
        cnt++;
        for(int i : g[ord.back()]){
            deg[i]--;
            if(deg[i]==0)q.push(i);
        }
    }
    if(cnt != n) {
        cout << "IMPOSSIBLE\n";
    } else {
        for(int i : ord) cout << i << ' ';
    }
    return 0;
}
```

## Longest Flight Route

```c++ Longest Flight Route
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

int n, m;
vi g[100005];
int deg[100005];
int dis[100005];
int last[100005];
bool vis[100005];

void dfs(int rt){
    if(vis[rt]) return;
    vis[rt] = 1;
    for(int i : g[rt]){
        deg[i]++;
        dfs(i);
    }
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m){
        int a, b;
        cin >> a >> b;
        g[a].eb(b);
    }
    dfs(1);
    if(!vis[n]){
        cout << "IMPOSSIBLE\n";
        return 0;
    }
    vi st;
    st.eb(1);
    while(!st.empty()){
        int cur = st.back();
        st.pob();
        for(int i : g[cur]){
            deg[i]--;
            if(dis[i] < dis[cur]+1){
                dis[i] = dis[cur]+1;
                last[i] = cur;
            }
            if(deg[i]==0) st.eb(i);
        }
    }
    cout << dis[n]+1 << '\n';
    vi ans;
    for(int i = n; i!=0; i=last[i]){
        ans.eb(i);
    }
    reverse(all(ans));
    for(int i : ans) cout << i << ' ';
    return 0;
}
```

## Game Routes

```c++ Game Routes
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

int mod = 1e9+7;

vi g[100005];
int deg[100005];
int n, m;
int way[100005];
bool vis[100005];

void dfs(int rt){
    if(vis[rt]) return;
    vis[rt] = 1;
    for(int i : g[rt]){
        deg[i]++;
        dfs(i);
    }
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m){
        int a, b;
        cin >> a >> b;
        g[a].eb(b);
    }
    dfs(1);
    way[1] = 1;
    vi v;
    v.eb(1);
    while(!v.empty()){
        int cur = v.back();
        v.pob();
        for(int i : g[cur]){
            way[i] += way[cur] %= mod;
            deg[i]--;
            if(deg[i] == 0) v.eb(i);
        }
    }
    cout << way[n] % mod << '\n';
    return 0;
}
```

## Investigation

```c++ Investigation
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

int mod = 1e9+7;

int n, m;
vii g[100005];
int dis[100005];
int way[100005];
int max_route[100005];
int min_route[100005];
bool vis[100005];

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m){
        int a, b, c;
        cin >> a >> b >> c;
        g[a].eb(b,c);
    }
    fill(dis, dis+n+1, 1e18);
    fill(min_route, min_route+n+1, 1e18);
    priority_queue<pii, vii, greater<pii>> pq;
    pq.push({0, 1}), dis[1]=0, way[1]=1, max_route[1]=min_route[1]=0;
    while(!pq.empty()){
        pii cur = pq.top();
        pq.pop();
        if(vis[cur.S]) continue;
        vis[cur.S]=1;
        for(pii i: g[cur.S]){
            if(dis[i.F] == cur.F+i.S){
                (way[i.F] += way[cur.S]) %= mod;
                tomax(max_route[i.F], max_route[cur.S]+1);
                tomin(min_route[i.F], min_route[cur.S]+1);
            }
            if(dis[i.F] > cur.F+i.S){
                dis[i.F] = cur.F+i.S;
                way[i.F] = way[cur.S];
                max_route[i.F] = max_route[cur.S]+1;
                min_route[i.F] = min_route[cur.S]+1;
                pq.push({dis[i.F], i.F});
            }
        }
    }
    cout << dis[n] sp way[n] sp min_route[n] sp max_route[n] << '\n';
    return 0;
}
```

## Planets Queries I

```c++ Planets Queries I
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
int ch[200005][31]; //[i][j] -> 2^j th child of i

void build(){
    rep(i, 1, 30)
        rep(j, 1, n)
            ch[j][i] = ch[ch[j][i-1]][i-1];
}

int query(int x, int k){
    for(int i = 0;k!=0; k>>=1, i++)
        if(k & 1)
            x = ch[x][i];
    return x;
}

signed main() {
    ios;
    cin >> n >> q;
    rep(i, 1, n) cin >> ch[i][0];
    build();
    while(q--){
        int x, k;
        cin >> x >> k;
        cout << query(x, k) << '\n';
    }
    return 0;
}
```

## Planets Queries II

```c++ Planets Queries II
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
int go[200005];
vi rgo[200005];
int boss[200005];
int sizeC[200005];
int idxC[200005];  // from is big
int idxA[200005];  // from is big
bool inC[200005];
bool tmpC[200005];
bool vis[200005];

int find_boss(int ch) {
    if (ch == boss[ch]) return ch;
    return boss[ch] = find_boss(boss[ch]);
}

int dfs(int rt) {
    if (vis[rt]) return rt;
    vis[rt] = 1;
    int flag = dfs(go[rt]);
    if (!sizeC[find_boss(rt)]) {
        inC[rt] = 1;
        idxC[rt] = idxC[go[rt]] + 1;
        if (flag == rt) sizeC[find_boss(rt)] = idxC[rt];
    }
    return flag;
}

void dfs2(int rt, int id) {
    idxA[rt] = id;
    for (int i : rgo[rt])
        if (!inC[i]) dfs2(i, id + 1);
}

int ch[200005][31];  //[i][j] -> 2^j th child of i

void build() { rep(i, 1, 30) rep(j, 1, n) ch[j][i] = ch[ch[j][i - 1]][i - 1]; }

int query(int x, int k) {
    for (int i = 0; k != 0; k >>= 1, i++)
        if (k & 1) x = ch[x][i];
    return x;
}

signed main() {
    ios;
    cin >> n >> q;
    rep(i, 1, n) boss[i] = i;
    rep(i, 1, n) cin >> go[i], rgo[go[i]].eb(i), boss[find_boss(i)] = boss[find_boss(go[i])], ch[i][0] = go[i];
    rep(i, 1, n) dfs(i);
    rep(i, 1, n) if (inC[i]) dfs2(i, 0);
    build();
    while (q--) {
        int a, b;
        cin >> a >> b;
        if (find_boss(a) != find_boss(b))
            cout << "-1\n";
        else {
            if (inC[a] && inC[b])
                cout << (idxC[a] - idxC[b] + sizeC[find_boss(a)]) % sizeC[find_boss(a)] << '\n';
            else if (!inC[a] && inC[b])
                cout << idxA[a] + (idxC[query(a, idxA[a])] - idxC[b] + sizeC[find_boss(a)]) % sizeC[find_boss(a)] << '\n';
            else if (idxA[a] >= idxA[b] && query(a, idxA[a] - idxA[b]) == b)
                cout << idxA[a] - idxA[b] << '\n';
            else
                cout << "-1\n";
        }
    }
    return 0;
}
```

## Planets Cycles

```c++ Planets Cycles
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

int n;
int boss[200005];
int go[200005];
vi rgo[200005];
int idxA[200005];
int sizeC[200005];
bool inC[200005];
bool vis[200005];

int find_boss(int ch) {
    if (ch == boss[ch]) return ch;
    return boss[ch] = find_boss(boss[ch]);
}

int dfs(int rt, int &cSize) {
    if (vis[rt]) return rt;
    vis[rt] = 1;
    int flag = dfs(go[rt], cSize);
    if (!sizeC[find_boss(rt)]) {
        inC[rt] = 1;
        cSize++;
        if (rt == flag) sizeC[find_boss(rt)] = cSize;
    }
    return flag;
}

void dfs2(int rt, int id) {
    idxA[rt] = id;
    for (int i : rgo[rt])
        if (!inC[i]) dfs2(i, id + 1);
}

signed main() {
    ios;
    cin >> n;
    rep(i, 1, n) boss[i] = i;
    rep(i, 1, n) cin >> go[i], rgo[go[i]].eb(i), boss[find_boss(i)] = boss[find_boss(go[i])];
    for (int i = 1, cSize = 0; i <= n; i++, cSize = 0) dfs(i, cSize);
    rep(i, 1, n) if (inC[i]) dfs2(i, 0);
    rep(i, 1, n) { cout << idxA[i] + sizeC[find_boss(i)] << ' '; }
    return 0;
}
```

## Road Reparation

```c++ Road Reparation
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

int n, m, edge = 0, cost = 0;
int boss[200005];
vector<tuple<int, int, int>> g, tg;

int find_boss(int ch){
    if(ch == boss[ch]) return ch;
    return boss[ch] = find_boss(boss[ch]);
}

signed main() {
    ios;
    cin >> n >> m;
    g.resize(m);
    rep(i, 1, n) boss[i] = i;
    for(auto &[w, u, v] : g) cin >> u >> v >> w;
    sort(all(g));
    for(auto [w, u, v] : g){
        if(find_boss(u) == find_boss(v)) continue;
        boss[find_boss(u)] = boss[find_boss(v)];
        cost += w;
        edge++;
    }
    if(edge != n-1) cout << "IMPOSSIBLE\n";
    else cout << cost << '\n';
    return 0;
}
```

## Road Construction

```c++ Road Construction
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

int n, m, maxB;
int boss[100005];
int sizeB[100005];

int find_boss(int ch) {
    if (ch == boss[ch]) return ch;
    return boss[ch] = find_boss(boss[ch]);
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, n) boss[i] = i, sizeB[i] = 1;
    while (m--) {
        int a, b;
        cin >> a >> b;
        if (find_boss(a) != find_boss(b))
            n--, tomax(maxB, sizeB[find_boss(b)] += sizeB[find_boss(a)]), boss[find_boss(a)] = boss[find_boss(b)];
        cout << n sp maxB << '\n';
    }
    return 0;
}
```

## Flight Routes Check

```c++ Flight Routes Check
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

int n, m;
int no = -1;
vi g[100005], rg[100005];
bool vis[100005], rvis[100005];

void dfs(int rt){
    if(vis[rt]) return;
    vis[rt] = 1;
    for(int i : g[rt]) dfs(i);
}

void rdfs(int rt){
    if(rvis[rt]) return;
    rvis[rt] = 1;
    for(int i : rg[rt]) rdfs(i);
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m){
        int a, b;
        cin >> a >> b;
        g[a].eb(b);
        rg[b].eb(a);
    }
    dfs(1), rdfs(1);
    rep(i, 1, n){
        if(!vis[i]) {
            cout << "NO\n" << 1 sp i << '\n';
            return 0;
        }
        if(!rvis[i]){
            cout << "NO\n" << i sp 1 << '\n';
            return 0;
        }
    }
    cout << "YES\n";
    return 0;
}
```

## Planets and Kingdoms

```c++ Planets and Kingdoms
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

int id = 0;
int n, m;
vi g[100005], rg[100005], ord;
int idx[100005];
bool vis[100005], rvis[100005];

void dfs(int rt){
    if(vis[rt]) return;
    vis[rt] = 1;
    for(int i : g[rt]) dfs(i);
    ord.eb(rt);
}

void rdfs(int rt){
    if(rvis[rt]) return;
    rvis[rt] = 1;
    for(int i : rg[rt]) rdfs(i);
    idx[rt] = id;
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m) {
        int a, b;
        cin >> a >> b;
        g[a].eb(b);
        rg[b].eb(a);
    }
    rep(i, 1, n) dfs(i);
    reverse(all(ord));
    for(int i : ord) if(!rvis[i]) id++,rdfs(i);
    cout << id << '\n';
    rep(i, 1, n) cout << idx[i] << ' ';
    return 0;
}

```

## Giant Pizza

```c++ Giant Pizza
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

#define n(a) ((a + m) % (2 * m) == 0 ? 2 * m : (a + m) % (2 * m))

int n, m, id = 0;
vi g[200005], rg[200005], ord;
int idx[200005];
bool vis[200005], rvis[200005];

void dfs(int rt) {
    if (vis[rt]) return;
    vis[rt] = 1;
    for (int i : g[rt]) dfs(i);
    ord.eb(rt);
}

void rdfs(int rt) {
    if (rvis[rt]) return;
    rvis[rt] = 1;
    idx[rt] = id;
    for (int i : rg[rt]) rdfs(i);
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, n) {
        int a, b;
        char aa, bb;
        cin >> aa >> a >> bb >> b;
        if (aa == '-') a = n(a);
        if (bb == '-') b = n(b);
        g[n(a)].eb(b);
        g[n(b)].eb(a);
        rg[b].eb(n(a));
        rg[a].eb(n(b));
    }
    rep(i, 1, m * 2) dfs(i);
    reverse(all(ord));
    for (int i : ord)
        if (!rvis[i]) id++, rdfs(i);
    rep(i, 1, m * 2) 
        if (idx[i] == idx[n(i)]) {
            cout << "IMPOSSIBLE\n";
            return 0;
        }
    rep(i, 1, m) 
        if(idx[i]>idx[n(i)]) cout << "+ ";
        else cout << "- ";
    return 0;
}

```

## Coin Collector

```c++ Coin Collector
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

int n, m, id = 0, ans = 0;
vi g[100005], rg[100005], scc_g[100005], ord;
int idx[100005], scc_room[100005], room[100005], dp[100005];
bool vis[100005], rvis[100005], scc_vis[100005];

void dfs(int rt){
    if(vis[rt]) return;
    vis[rt] = 1;
    for(int i : g[rt]) dfs(i);
    ord.eb(rt);
}

void rdfs(int rt){
    if(rvis[rt]) return;
    rvis[rt] = 1;
    for(int i : rg[rt]) rdfs(i);
    idx[rt] = id;
    scc_room[id] += room[rt];
}

int scc_dfs(int rt){
    if(scc_vis[rt]) return dp[rt];
    scc_vis[rt] = 1;
    int max_room = 0;
    for(int i : scc_g[rt]) tomax(max_room, scc_dfs(i));
    return dp[rt] = scc_room[rt] + max_room;
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, n) cin >> room[i];
    rep(i, 1, m){
        int a, b;
        cin >> a >> b;
        g[a].eb(b), rg[b].eb(a);
    }
    rep(i, 1, n) dfs(i);
    reverse(all(ord));
    for(int i : ord) if(!rvis[i]) id++, rdfs(i);
    rep(i, 1, n) for(int j : g[i]) if(idx[i]!=idx[j])
        scc_g[idx[i]].eb(idx[j]);
    // rep(i, 1, n) err(i sp idx[i] sp room[i] sp scc_room[idx[i]]);
    // rep(i, 1, id) for(int j : scc_g[i]) err(i sp j);
    rep(i, 1, id) tomax(ans, scc_dfs(i));
    cout << ans << '\n';
    return 0;
}
```

## Mail Delivery

```c++ Mail Delivery
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

int n, m, odd=1, ed=1, cnt_odd = 0;
int deg[100005];
vi g[100005], ans;
bool vis[100005];
map<pii, bool> evis;

void dfs(int rt){
    vis[rt] = 1;
    while(!g[rt].empty()){
        int cur = g[rt].back();
        g[rt].pob();
        if(evis[{rt, cur}]) continue;
        evis[{rt, cur}] = 1, evis[{cur, rt}] = 1, dfs(cur);
        ans.eb(rt);
    }
}

signed main() {
    ios;
    cin >> n >> m;
    si cg;
    rep(i, 1, m){
        int a, b;
        cin >> a >> b;
        g[a].eb(b), g[b].eb(a);
        deg[a]++, deg[b]++;
        cg.insert(a), cg.insert(b);
    }
    rep(i, 1, n) if(deg[i]&1) ed = odd, odd = i, cnt_odd++;
    if(cnt_odd!=0) {
        cout << "IMPOSSIBLE\n";
        return 0;
    }
    dfs(odd);
    for(int i : cg) if(!vis[i]) {
        cout << "IMPOSSIBLE\n";
        return 0;
    }
    reverse(all(ans));
    for(int i : ans) cout << i << ' ';
    cout << ed << '\n';
    return 0;
}
```

### set

```c++ Mail Delivery - set
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

int n, m, st=1, ed=1, cnt_odd = 0;
si g[100005];
vi ans;

void dfs(int rt){
    while(!g[rt].empty()){
        int cur = *g[rt].begin();
        g[rt].erase(g[rt].begin());
        g[cur].erase(rt);
        dfs(cur);
    }
    ans.eb(rt);
}

signed main() {
    ios;
    cin >> n >> m;
    si cg;
    rep(i, 1, m){
        int a, b;
        cin >> a >> b;
        g[a].insert(b), g[b].insert(a);
    }
    rep(i, 1, n) if(g[i].size()&1) ed = st, st = i, cnt_odd++;
    if(cnt_odd!=0) {
        cout << "IMPOSSIBLE\n";
        return 0;
    }
    dfs(st);
    rep(i, 1, n) if(!g[i].empty()) {
        cout << "IMPOSSIBLE\n";
        return 0;
    }
    reverse(all(ans));
    for(int i : ans) cout << i << ' ';
    return 0;
}
```

## De Bruijn Sequence

```c++ De Bruijn Sequence
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

int n;
vi g[100005], ans;

void dfs(int rt){
    while(!g[rt].empty()){
        int cur = g[rt].back();
        g[rt].pob();
        dfs(cur);
        ans.eb(rt&1);
    }
}

signed main() {
    ios;
    cin >> n;
    rev(i, (1<<(n-1))-1, 0){
        int nxt = (i<<1) & ((1<<(n-1))-1);
        g[i].eb(nxt);
        g[i].eb(nxt+1);
    }
    dfs(0);
    reverse(all(ans));
    rep(i,1,n-1) cout << 0;
    if(n==1) cout << "01";
    else for(int i : ans) cout << i;
    return 0;
}
```

## Teleporters Path

```c++ Teleporters Path
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

int n, m, deg[100005];
vi g[100005], ans;

void dfs(int rt){
    while(!g[rt].empty()){
        int cur = g[rt].back();
        g[rt].pob();
        dfs(cur);
    }
    ans.eb(rt);
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m){
        int a, b;
        cin >> a >> b;
        g[a].eb(b);
        deg[a]++, deg[b]++;
    }
    rep(i, 1+1, n-1) if(deg[i]&1){
        cout << "IMPOSSIBLE\n";
        return 0;
    } 
    if(!((deg[1]&1) && (deg[n]&1))){
        cout << "IMPOSSIBLE\n";
        return 0;
    }
    dfs(1);
    rep(i, 1, n) if(!g[i].empty()){
        cout << "IMPOSSIBLE\n";
        return 0;
    }
    reverse(all(ans));
    for(int i : ans) cout << i << ' ';
    return 0;
}
```

## Hamiltonian Flights

```c++ Hamiltonian Flights
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

int mod = 1e9 + 7;
int n, m;
int dp[21][2000006];
int g[21][21];

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m) {
        int a, b;
        cin >> a >> b;
        g[a][b]++;
    }
    dp[1][1] = 1;
    // int op = 0;
    rep(i, 1, (1 << n) - 1) {
        rep(j, 1, n) {
            int pos = (1 << (j - 1));
            if (!(i & pos)) continue;
            rep(k, 1, n) {
                if (!g[k][j]) continue;
                (dp[j][i] += dp[k][i^pos] * g[k][j]);
                // op++;
            }
            dp[j][i] %= mod;
        }
        i++;  // first digit must be 1 because path start at one.
    }
    cout << dp[n][(1 << n) - 1] % mod << '\n';
    return 0;
}

```

## Knight's Tour

```c++ Knight's Tour
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

int x, y;
int dir[8][2] = {{1, 2}, {2, 1}, {1, -2}, {-2, 1}, {-1, 2}, {2, -1}, {-1, -2}, {-2, -1}};
bool vis[10][10];
vii ans;
int out[10][10];

bool dfs(int x, int y, int cnt) {
    if (vis[x][y]) return 0;
    if (cnt == 63) {
        ans.eb(x, y);
        return 1;
    }
    vis[x][y] = 1;
    cnt++;
    vector<pair<int, pii>> go;
    rep(i, 0, 7) {
        if (x + dir[i][0] > 8 || x + dir[i][0] < 1 || y + dir[i][1] > 8 || y + dir[i][1] < 1) continue;
        int nx = x + dir[i][0], ny = y + dir[i][1], deg = 0;
        rep(i, 0, 7) if (!(nx + dir[i][0] > 8 || nx + dir[i][0] < 1 || ny + dir[i][1] > 8 || ny + dir[i][1] < 1)) deg++;
        go.pb({deg, {nx, ny}});
    }
    sort(all(go));
    for (auto i : go)
        if (dfs(i.S.F, i.S.S, cnt)) {
            ans.eb(x,y);
            return 1;
        }
    vis[x][y] = 0;
    return 0;
}

signed main() {
    ios;
    cin >> x >> y;
    dfs(x, y, 0);
    reverse(all(ans));
    rep(i, 1, 64) { out[ans[i - 1].F][ans[i - 1].S] = i;}
    rep(i, 1, 8) {
        rep(j, 1, 8) cout << out[j][i] << ' ';
        cout << '\n';
    }
    return 0;
}
```

## Download Speed

```c++ Download Speed
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

int n, m;
int adj[502][502];
bool vis[502];

bool dfs(int rt, vector<int> &path, int threshold) {
    if (vis[rt]) return false;
    vis[rt] = 1;
    if (rt == n) {
        path.push_back(rt);
        return true;
    }
    rep(i, 1, n) {
        if (adj[rt][i] < threshold) continue;
        if (dfs(i, path, threshold)) {
            path.push_back(rt);
            return true;
        }
    }
    return false;
}

signed main() {
    ios;
    cin >> n >> m;
    int threshold = 0;
    rep(i, 1, m) {
        int a, b, c;
        cin >> a >> b >> c;
        adj[a][b] += c;
        tomax(threshold, c);
    }
    int ans = 0;
    while (threshold > 0) {
        vector<int> path;
        memset(vis, 0, sizeof(vis));
        if (dfs(1, path, threshold)) {
            reverse(path.begin(), path.end());
            int k = path.size();
            int flow = 1e9;
            rep (i, 0, k-2) tomin(flow, adj[path[i]][path[i + 1]]);
            ans += flow;
            rep (i, 0, k-2) {
                adj[path[i]][path[i + 1]] -= flow;
                adj[path[i + 1]][path[i]] += flow;
            }
        } else threshold >>= 1;
    }
    cout << ans << "\n";
    return 0;
}
```

## Police Chase

```c++ Police Chase
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

int n, m, ans;
int g[502][502];
bool vis[502];

bool dfs(int rt){
    if(vis[rt]) return 0;
    if(rt == n) return 1;
    vis[rt] = 1;
    rep(i, 1, n){
        if(g[rt][i] && dfs(i)){
            g[rt][i]--, g[i][rt]++;
            return 1;
        }
    }
    return 0;
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m){
        int a, b;
        cin >> a >> b;
        g[a][b] = g[b][a] = 1;
    }
    while(dfs(1)) memset(vis, 0, sizeof(vis)), ans++;
    cout << ans << '\n';
    rep(i, 1, n){
        rep(j, 1, n){
            if((vis[i] ^ vis[j]) && !g[i][j] && g[j][i]) cout << i sp j << '\n';
        }
    }
    return 0;
}
```

## School Dance

```c++ School Dance
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

int n, m, k, ans;
int g[1003][1003];
bool vis[1003];
vi go[1003];

bool dfs(int rt){
    if(vis[rt]) return 0;
    if(rt == 1001) return 1;
    vis[rt] = 1;
    rep(i, 1, 1001){
        if(g[rt][i] && dfs(i)){
            g[rt][i]--, g[i][rt]++;
            return 1;
        }
    }
    return 0;
}

signed main() {
    ios;
    cin >> n >> m >> k;
    rep(i, 1, k){
        int a, b;
        cin >> a >> b;
        g[0][a] = g[a][b+500] = g[b+500][1001] = 1;
        go[0].eb(a), go[a].eb(b+500), go[b+500].eb(1001);
    }
    while(dfs(0)) memset(vis, 0, sizeof(vis)), ans++;
    cout << ans << '\n';
    while(ans--){
        int a, b, s = 0;
        while(s != 1001){
            a=b, b=s;
            for(int i : go[s]) 
                if(!g[s][i] && g[i][s]){
                    g[s][i]=1;
                    s=i;
                    break;
                }
        }
        cout << a sp b-500 << '\n';
    }
    return 0;
}
```

## Distinct Routes

```c++ Distinct Routes
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

int n, m, ans = 0;
int g[502][502];
bool vis[502];
vi go[502];

bool dfs(int rt){
    if(vis[rt]) return 0;
    if(rt == n) return 1;
    vis[rt] = 1;
    rep(i, 1, n){
        if(g[rt][i] && dfs(i)) {
            g[rt][i]--, g[i][rt]++;
            return 1;
        }
    }
    return 0;
}

signed main() {
    ios;
    cin >> n >> m;
    rep(i, 1, m){
        int a, b;
        cin >> a >> b;
        g[a][b]++;
        go[a].eb(b);
    }
    while(dfs(1)) memset(vis, 0, sizeof(vis)), ans++;
    cout << ans << '\n';
    while(ans--){
        vi path(1,1);
        int s = 1;
        while(s!=n){
            for(int i : go[s])
                if(!g[s][i] && g[i][s]){
                    g[i][s]=0;
                    s=i;
                    path.eb(i);
                    break;
                }
        }
        cout << path.size() << '\n';
        for(int i : path) cout << i << ' ';
        cout << '\n';
    }
    return 0;
}
```
