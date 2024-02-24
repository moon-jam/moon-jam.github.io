---
title: 圖論（c++）
tags:
  - 圖論
  - 演算法
categories:
  - 演算法
  - 圖論
# hidden: true
abbrlink: 56060
date: 2023-10-27 00:00:00
lang:
---

## 前言

一些圖論演算法。

<!--more-->

## 拓樸排序

``` c++ 拓樸排序
const int N = 1E5 + 5;
vector<int> edge[N];

void Topological_sort(int V){
    vector<int> res;
    int enter_deg[N];
    memset(enter_deg, 0, sizeof(enter_deg));
    for(int i = 0; i < V; i++)
        for(int cur : edge[i])
            enter_deg[cur]++;
    priority_queue<int, vector<int>, greater<int>> q;
    for(int i = 0; i<V; i++)
        if(enter_deg[i]==0)
            q.push(i);
    while(!q.empty()){
        int cur = q.top(); q.pop();
        res.eb(cur);
        for(int ch : edge[cur]){
            if(--enter_deg[ch] == 0)
                q.push(ch);
        }
    }

    bool is_dag=true;
    for(int i = 0; i<V; i++)
        if(enter_deg[i]!=0)
            is_dag=false;
}
```

## 最小生成🌲

[zerojudge a129](https://zerojudge.tw/ShowProblem?problemid=a129)

### Kruskal's Algorithm

精神：Disjoint Set 找不形成環的最小邊

```c++ Kruskal's Algorithm O(N log N)
#include <bits/stdc++.h>
#define N 200005
#define edge pair<int, pair<int, int> >
#define u first
#define v second.first
#define w second.second
#define int long long
using namespace std;

int boss[N], n, m;
edge E[N];

bool cmp(edge a, edge b){
    return a.w < b.w;
}

int find_boss(int x){
    if(x == boss[x])    return x;
    return boss[x] = find_boss(boss[x]);  //路徑壓縮
}

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    while(cin >> n >> m){
        int num_edge = 0;
        for(int i = 0; i<n; i++) boss[i] = i;
        for(int i = 0; i<m; i++) cin >> E[i].u >> E[i].v >> E[i].w;
        sort(E, E+m, cmp);
        int ans = 0;           
        for(int i = 0; i<m; i++){
            int a = find_boss(E[i].u), b = find_boss(E[i].v);
            if(a!=b){
                boss[b] = a;
                ans += E[i].w;
                num_edge++;
            }
        }
        if(num_edge == n-1)
            cout << ans << '\n';
        else cout << "-1\n";
    }
    
    return 0;
}
```

### Prim's Algorithm

精神：找不在樹上，距離樹各點最近的點

```c++ Prim's Algorithm(跟最短路徑的Dijkstra很像) O(N log N)
#include <bits/stdc++.h>
#define N 200005
#define pii pair<int, int>
#define w first
#define to second
#define int long long
using namespace std;

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n, m;
    while(cin >> n >> m){
        vector<pii> E[N];
        int num_edge = 0, ans = 0;
        for(int i = 0, u, v, w; i<m; i++)
            cin >> u >> v >> w, E[u].push_back({w,v}), E[v].push_back({w, u});
        priority_queue<pii, vector<pii>, greater<pii>> q;
        bool vis[N]; memset(vis, 0, sizeof(vis)); vis[0] = 1;
        for(pii x : E[0]) q.push(x);
        while(!q.empty()){
            pii cur = q.top(); q.pop(); 
            if(vis[cur.to]) continue;
            vis[cur.to] = 1, num_edge++;
            ans += cur.w;
            for(pii x : E[cur.to]) q.push(x);
        }

        if(num_edge == n-1)
            cout << ans << '\n';
        else cout << "-1\n";
    }
    
    return 0;
}
```

## 最短路徑

[zerojudge a874](https://zerojudge.tw/ShowProblem?problemid=a874)

### Floyd-Warshall

精神： Dynamic Programming

```c++ Floyd-Warshall O(N^3) 全對全
// dis[i][j]: 初始化為i->j這條邊的權重
// 若沒被定義的就設定為INF
for(int k=1; k<=n; k++)
    for(int i=1; i<=n; i++)
        for(int j=1; j<=n; j++)
            dis[i][j]=min(dis[i][j], dis[i][k]+dis[k][j]);
```

### Dijkstra

精神： Greedy 找不在樹上，距離樹根最短的點

```c++ Dijkstra O(N log N) 單對全
#include <bits/stdc++.h>
#define pii pair<int, int>
#define w first
#define to second
using namespace std;

const int INF = 1E9;

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n;
    while(cin >> n){
        vector<pii> E[30];
        char s, e;
        int dis[30];
        fill(dis, dis+30, INF);
        bool vis[30] = {0};
        char  x, y;
        for(int i =0, w; i< n; i++)
            cin>>x>>y>>w, x-=(int)'A', y-=(int)'A', E[x].push_back({w,y}), E[y].push_back({w,x});
        cin >> s >> e, s-='A', e-='A', dis[s] = 0;
        priority_queue<pii, vector<pii>, greater<pii>> pq;
        dis[s] = 0, pq.push({0,s});
        while(!pq.empty()){
            pii cur = pq.top(); pq.pop();
            if(vis[cur.to]) continue;
            vis[cur.to] = 1;
            for(pii go : E[cur.to]){
                if(dis[go.to] > dis[cur.to]+go.w){
                    dis[go.to] = dis[cur.to]+go.w;
                    pq.push({dis[go.to], go.to});
                }
            }
        }
        if(dis[e]==INF) cout << "NoRoute\n";
        else cout << dis[e] << '\n';
    }
}
```

## 雙連通分量、橋、割點

## 寫點題目

### [neoj165](https://neoj.sprout.tw/problem/165/)

```c++
#include<bits/stdc++.h>
using namespace std;

//確認是一個有相無環圖 拓樸排序
int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    int t;
    cin >> t;
    while(t--){
        int deg[100006];
        vector<int> arr[100006];
        priority_queue<int, vector<int>, greater<int> > Q;
        queue<int> ans;
        memset(deg, 0, sizeof(deg));
        int n, m;
        cin >> n >> m;
        //由兩個整數  a  和  b  ( 0 ≤ a , b ≤ n − 1 )組成，
        //代表要攻破陣地  b  之前必須先攻破陣地  a ，其中陣地從 0 ~ n − 1 依序編號。
        for(int i = 0, a, b; i<m; i++)
            cin>>a>>b, arr[a].push_back(b), deg[b]++;
        for(int i = 0; i<n; i++)
            if(deg[i]==0)
                Q.push(i);

        while(!Q.empty()){
            int tmp = Q.top();
            Q.pop(); ans.push(tmp);
            for(int i : arr[tmp]){
                if(--deg[i]==0)
                    Q.push(i);
            }
        }
        bool QAQ = false;
        for(int i = 0; i<n; i++)
            if(deg[i]) {QAQ=true; break;}
        if(QAQ) cout << "QAQ";
        else    while(!ans.empty()){
            cout << ans.front(), ans.pop();
            if(ans.size()>=1)
                cout << ' ';
        }
        cout << '\n';
    }
}
```

### [neoj391](https://neoj.sprout.tw/problem/391/)

```c++
#include<bits/stdc++.h>
#define N 101
#define pii pair<int, int>
#define w first
#define p second
#define int long long
using namespace std;

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    int t;
    cin >> t;
    while(t--){
        // N代表可魚國內有幾個城市， M代表墨魚運輸公司提供幾種運輸方案
        // S , E 分別代表你的工廠所在的城市以及你所要送去的城市。 
        // F 代表那隻富有的大可魚訂購了多少箱的可魚果。
        int n,m,s,e,f;
        vector<pii> P[N];
        cin>>n>>m>>s>>e>>f;
        //一定是全部一起送去最便宜
        //邊權即送f過去的價錢
        for(int i = 0; i<m; i++){
            int a, b, c, d , cc, w;
            //每個方案  P i  會從一個固定的起始城市  A i  運送東西到另一個固定的終點城市  B i 
            //，每運輸一箱的可魚果，你就必須付給墨魚運輸公司  C i  可魚幣。另外，
            //若兩個方案的終點與起點相接，則可以不花任何額外費用的將貨物轉過去。不過由於你的運輸量太大了，
            //墨魚運輸公司決定祭出優惠，若用方案  P i  運輸了超過  D i  箱的可魚果，
            //多出來的部份每箱改收優惠價  C i ′  可魚幣。
            cin >> a >>b >>c >> d >>cc;
            if(f<=d)    w = c*f;
            else        w = c*d+(f-d)*cc;
            P[a].push_back(make_pair(w, b));
        }
        priority_queue<pii,vector<pii>,greater<pii> > Q;//排序要看全中 所以w要在前面
        Q.push(make_pair(0, s));
        bool vis[N];
        int d[N];
        for(int i = 0; i<N; i++)  d[i] = 1e18;
        d[s] = 0;
        memset(vis, 0, sizeof(vis));
        while(!Q.empty()){
            int pt = Q.top().p;
            Q.pop();
            if(!vis[pt]){
                for(pii i: P[pt]){
                    int nP = i.p, nW = i.w;
                    if(d[pt]+nW < d[nP]){
                        d[nP] = d[pt]+nW;
                        Q.push(make_pair(d[nP],nP));
                    }
                }
                vis[pt] = true;
            }
        }
        cout<<d[e]<<endl;
    }
    return 0;
}
```

### [neoj431](https://neoj.sprout.tw/problem/431/)

```c++
#include <bits/stdc++.h>
#define MAX 500005
#define INF 1e18
#define int long long
#define pii pair<int, int>
#define weight first
#define val second
typedef long long LL;
using namespace std;
//城市、軌道、改的數量
int n,m,q;
vector< pii > ahead[MAX];
vector< pii > back[MAX];
int ahead_dis[MAX], back_dis[MAX];

/*
先建一條1->n的最短路
在把箭頭反過來建一條n->1的
新建的路是a->b
最後球1->n 跟 1->a + a->b + b->n 誰比較小誰就是答案
*/
signed main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    memset(ahead_dis, 0, sizeof(ahead_dis));
    memset(back_dis, 0, sizeof(back_dis));
    cin >> n >> m >>q;
    for(int i = 0; i<m; i++){
        int a,b,w;
        cin >> a >> b >> w;
        ahead[a].push_back(make_pair(w,b));
        back[b].push_back(make_pair(w,a));
    }
    for(int i = 0 ;i<MAX;i++){
        ahead_dis[i] = INF, back_dis[i] = INF;
    }
    ahead_dis[1] = 0, back_dis[n] = 0;
    bool visA[MAX], visB[MAX];
    memset(visA, 0, sizeof(visA));
    memset(visB, 0, sizeof(visB));
    priority_queue<pii, vector<pii>, greater<pii> > QA;
    priority_queue<pii, vector<pii>, greater<pii> > QB;
    QA.push( make_pair(0,1));
    QB.push( make_pair(0,n));
    while(!QA.empty()){
        int cur  = QA.top().val;
        QA.pop();
        if(!visA[cur]){
            for(pii i : ahead[cur]){
                int v = i.val, w= i.weight;
                if(ahead_dis[cur]+w < ahead_dis[v]){
                    ahead_dis[v] = ahead_dis[cur]+w;
                    QA.push(make_pair(ahead_dis[v],v));
                }
            }
            visA[cur] = true;
        }
    }
    while(!QB.empty()){
        int cur  = QB.top().val;
        QB.pop();
        if(!visB[cur]){
            for(pii i : back[cur]){
                int v = i.val, w= i.weight;
                if(back_dis[cur]+w < back_dis[v]){
                    back_dis[v] = back_dis[cur]+w;
                    QB.push(make_pair(back_dis[v],v));
                }
            }
            visB[cur] = true;
        }
    }
    while(q--){
        int a, b;
        cin >> a >> b;
        int ori = ahead_dis[n];
        int aft = ahead_dis[a]+1+back_dis[b];
        cout << min(ori, aft) << '\n';
    }
    return 0;
}
```

### [neoj394](https://neoj.sprout.tw/problem/394/)

### [neoj375](https://neoj.sprout.tw/problem/735/)

### [neoj736](https://neoj.sprout.tw/problem/736/)

### [neoj179](https://neoj.sprout.tw/problem/179/)

```c++
#include <bits/stdc++.h>
#define Max 30005
#define pt first
#define cnt second
#define init(x) memset(x, 0, sizeof(x))
typedef long long LL;
using namespace std;

int n,m;
vector<int> edges[Max];
bool vis[Max], isAP[Max];
vector<pair<int, int> > AP;

int maxAP_child = 0, maxAP = Max;
int low[Max], lv[Max], CHcnt[Max];
int chcnt = 0;
void dfs(int root, int lev, int father){
    lv[root] = lev;
    vis[root] = true;
    low[root] = lev;
    int inChCnt = chcnt, wwwwwCnt = 0, son_cnt = 0;
    bool isAP = false;
    for(int ch : edges[root]){
        if(ch==father || ch==root) continue;
        if(vis[ch]) low[root] = min(low[root], lv[ch]);
        else{
            son_cnt++;
            dfs(ch, lev+1, root);
            low[root] = min(low[root], low[ch]);
            chcnt++;
            if(low[ch]>=lv[root] && lv[root]!=0) isAP=true, wwwwwCnt+=CHcnt[ch];
        }
    }
    CHcnt[root] = chcnt-inChCnt+1;
    // if(lv[root]==0 && son_cnt>1) isAP=true;
    if(isAP) AP.push_back(make_pair(root, wwwwwCnt));
    // cout << root << ' ' << CHcnt[root] << ' ' << low[root] << ' ' << lv[root]<<' '<<wwwwwCnt<< '\n';
}

//因為有🈹️點傳的人就會減少，所以如果沒有割點那就是傳0
//會變少的點就只有割點，透過記錄每個包含自己的樹的節點數，在遇到low[ch]>=lv[root]時把ch整棵樹加進去，
//最後就能得到可減少結點數，維護最大可減少節點數跟最小的最大可減少節點數的節點，最後就輸出這兩個
int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    init(vis), init(low), init(isAP), init(lv), init(CHcnt);
    cin >> n >> m;
    for(int i = 0, x, y; i<m; i++)
        cin >> x >> y, edges[x].push_back(y), edges[y].push_back(x);
    int p;
    cin >> p;
    dfs(p, 0, -1);

    for(auto ap : AP){
        if(ap.cnt == maxAP_child) maxAP = min(maxAP,ap.pt);
        if(ap.cnt > maxAP_child) maxAP = ap.pt;
        maxAP_child = max(maxAP_child,ap.cnt);
    }

    if(maxAP_child == 0) cout <<"0\n";
    else cout <<maxAP<<' '<< CHcnt[p]-maxAP_child << '\n';
    return 0;
}
```

### [neoj183](https://neoj.sprout.tw/problem/183/)

```c++
#include <bits/stdc++.h>
#define Max 1000006
#define init(x) memset(x, 0, sizeof(0))
typedef long long LL;
using namespace std;

int n,m;
vector<int> E[Max];
int lv[Max], low[Max];
bool vis[Max], AP[Max];

void dfs(int root, int lev, int father){
    if(vis[root]) return;
    vis[root]=true;
    low[root] = lv[root] = lev;
    int son_cnt = 0;
    for(int ch : E[root]){
        if(ch==father) continue;
        if(vis[ch]) low[root] = min(low[root], lv[ch]);
        else{
            // cout << root << ' ' << ch << '\n';
            son_cnt++;
            dfs(ch, lev+1, root);
            low[root] = min(low[root], low[ch]);
            if(low[ch]>=lv[root] && lv[root]!=0)   AP[root]=1;
        }
    }
    if(lv[root] == 0 && son_cnt>1)
        AP[root] = 1;
    // cout << root << ' ' << low[root] << ' ' << lv[root] << ' ' << AP[root] << ' ' << son_cnt<< '\n';
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    init(vis), init(low), init(lv), init(AP);
    cin >> n >> m;
    for(int i = 0, x, y;i<m; i++)
        cin>>x>>y, E[x].push_back(y), E[y].push_back(x);
    dfs(1,0,-1);
    for(int i = 1; i<=n; i++)
        if(AP[i])
            cout << i << '\n';
    return 0;
}
```

### [neoj184](https://neoj.sprout.tw/problem/184/)

```c++
#include <bits/stdc++.h>
#define Max 1000006
#define init(x) memset(x, 0, sizeof(x))
#define edge(x,y) make_pair(min(x,y), max(x,y))
#define pii pair<int, int> 
typedef long long LL;
using namespace std;

vector<int> E[Max];
int low[Max], lv[Max];
bool vis[Max];
//x<y
set<pii> bridge;
vector<pii> input;

void dfs(int root, int father){
    if(vis[root])   return;
    vis[root] = true;
    low[root] = lv[root] = lv[father]+1;
    for(int ch : E[root]){
        if(ch!=father){
            dfs(ch, root);
            low[root] = min(low[ch],low[root]);
            if(low[ch]>lv[root]) //從子孫回來的
                bridge.insert(edge(ch,root));
        }
    }
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n, m;
    init(low), init(lv), init(vis);
    cin >> n >> m;
    for(int i = 0,x,y; i<m; i++)
        cin>>x>>y, E[x].push_back(y),E[y].push_back(x),input.push_back(edge(x,y));
    dfs(1,0);
    for(auto ed : input)
        if(bridge.count(ed))
            cout << ed.first << ' ' << ed.second << '\n';

    return 0;
}
```

### [neoj739](https://neoj.sprout.tw/problem/739/)

```c++

```

### [neoj737](https://neoj.sprout.tw/problem/737/)

### [neoj738](https://neoj.sprout.tw/problem/738/)

### [2022附中校內賽PD](https://codeforces.com/gym/401059/problem/D)

利用DSU倒著加邊回去

```c++
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
#define pii pair<int,int>
#define x first
#define y second
#define ios ios::sync_with_stdio(0);cin.tie(0);cout.tie(0)
#define eb emplace_back
#define pb push_back
#define popb pop_back
#define int ll

const int N = 200005;

int bose[N];
int n, m, q;
pii e[N];
vector<pii> op;
vector<bool> ans;
vector<int> G[N];
bool no_pt[N];

int find_bose(int ch){
    if(bose[ch] == ch) return ch;
    return bose[ch] = find_bose(bose[ch]);
}

signed main()
{
    // ios;
    //刪邊 -> 加邊 答案倒著輸出
    cin >> n >> m;
    for(int i = 0; i<N; i++) bose[i] = i;
    for(int i = 0; i<m; i++) cin >> e[i].x >> e[i].y, G[e[i].x].eb(e[i].y), G[e[i].y].eb(e[i].x);
    cin >> q;
    memset(no_pt, 0, sizeof(no_pt));
    for(int i = 0; i<q; i++){
        int cmd, a, b;
        cin >> cmd >> a;
        if(cmd == 1){
            no_pt[a] = 1;
            for(int i : G[a])
                if(no_pt[i]==1) op.eb(a+N, i+N);// cout << "bye " << a << ' ' << i << '\n';
        }
        else cin >> b, op.eb(a, b);
    }
    for(int i = 0; i<m; i++){
        if(no_pt[e[i].x]==1 && no_pt[e[i].y]==1) continue;
        // cout << e[i].x << " connect " <<e[i].y<<'\n';
        bose[find_bose(e[i].x)] = find_bose(e[i].y);
    }
    while(!op.empty()){
        pii cur = op.back(); op.popb();
        if(cur.x < N) ans.eb(find_bose(cur.x)==find_bose(cur.y));
        else bose[find_bose(cur.x-N)] = find_bose(cur.y-N);
    }while(!ans.empty()){
        bool a = ans.back(); ans.popb();
        cout << (a ? "YES\n" : "NO\n");
    }
    return 0;
}
```

### [2022 師大附中暑期資訊培訓模擬競賽I PB](https://codeforces.com/gym/401057/problem/B)

### [2022 師大附中暑期資訊培訓模擬競賽II PC](https://codeforces.com/gym/401058/problem/C)

### [2020花中一模PE](https://codeforces.com/group/GG44hyrVLY/contest/297533/problem/E)
