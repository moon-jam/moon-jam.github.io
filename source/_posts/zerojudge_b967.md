---
title: APCS 血緣關係 (zerojudge b967)
lang: zh-TW
tags:
  - APCS
  - 樹直徑
categories:
  - 程式題解
  - APCS
abbrlink: 63099
date: 2023-09-16
mathjax: true
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=b967)

下圖為家族的關係圖：0 是 7 的孩子， 1、2 和 3 是 0 的孩子， 4 和 5 是 1 的孩子， 6 是 3 的孩子。
可以發現最遠的親戚關係為4(或 5)和6，他們的"血緣距離"是 4 (4→1→0→3→6)。
<img src="https://i.imgur.com/fa0kw3h.png" width = "250" alt="血緣關係" align=center />
給予任一家族的關係圖，請找出最遠的"血緣距離"。
{% endnote %}
<!--more-->

{% note info %}
解題思路：  
這題是要求所謂的 {% label warning@樹直徑%}（整個祖譜就可以看成是一顆樹，要求相距最遠就是樹直徑了）
我做這題的方法是在dfs遍歷整棵樹的同時，紀錄從葉子到各子樹的最大節點數（也就是那個節點到子葉的層數，後面稱為rank）以及各子樹的中最大直徑，同時取出各子樹中第一深跟第二深的為max_rank、second_rank，如此目前節點的直徑就會是：

$$max(children\_max\_distance, max\_rank+second\_rank+1)$$

（直觀想的話會以為該節點為根節點的樹直徑是第一深+第二深的層數+自己這個節點，但還要考慮到可能子樹中已經有更大直徑的狀況，還有只有一個節點、或本身就是葉子的狀況，但因為此時的second_rank或是max_rank、second_rank會是0，因此同樣會是max_rank+second_rank+1）

該節點的最大層數就會是子樹的最大層數+1(而當本身是葉子時就是1，但因為此時max_rank是0，因此這個special case寫的時候不用也不用特別限制)

另外我為了實作方便，我把max_distance獨立成一個變數，不跟dfs的遞迴寫在一起，這樣寫起來也比較簡單
其他更詳細的實作細節可以看底下程式碼的註解

🌟 如果確定時間複雜度是 $O(n)$ 但還是TLE的話，有可能是你沒加上輸入輸出優化`ios::sync_with_stdio(0);cin.tie(0); cout.tie(0);`，但這題好像有點刁鑽，所以可能還需要再快一些才會過，像是我後來就發現不能夠memset，因為不用每次都把整個陣列初始化，有要用到的再設回0就好了，另外也有人講到可以把cin/cout全部改成printf/scanf會更快，不過我是把memset改掉之後就成功AC了，或者你可以試試看多丟幾次，我丟上去AC的程式執行時間有差到快一秒的，可以多試幾次。
{% endnote %}

```c++ APCS 血緣關係
#include <bits/stdc++.h>
#define Max 100001
using namespace std;

vector<int> edge[Max];
bool vis[Max];
int max_dis=0;

int dfs(int node){
    //我定義的dis是節點個數，因此在最後輸出時需要-1
    //小孩要回傳他到自己最深的層數，母親記錄子代最大血緣距離（小孩最大的前兩個相加）、自己到最深的距離(最深距離+1)
    //並拿去跟max_dis取max，終端條件是沒有小孩的節點，回傳1
    if(vis[node]) return 0;
    vis[node]=1;
    int child_max_rank=0, child_second_max_rank=0;
    for(int child : edge[node]){
        int rank=dfs(child);
        if(rank>child_max_rank) child_second_max_rank=child_max_rank,child_max_rank=rank;
        else if(rank>child_second_max_rank) child_second_max_rank=rank;
    }
    max_dis = max(max_dis,child_max_rank+child_second_max_rank+1);
    // cout << node << ' '<< child_max_rank << ' ' << child_second_max_rank << ' ' << max_dis << '\n';
    return child_max_rank+1; //加上自己到子代的那層
}

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int n;
    while(cin >> n){
        max_dis=0;
        for(int i=0; i<n; i++) edge[i].clear(), vis[i]=0; //因為節點事是0~n所以是<n而不是<n-1
        // memset(vis, 0, sizeof(vis)); 這裡用memset會TLE，應該就是說不用每次都把100001個都改掉
        for(int i=0, tmp1, tmp2; i<n-1; i++)
            cin>>tmp1>>tmp2, edge[tmp1].push_back(tmp2), edge[tmp2].push_back(tmp1);
            //雖然題目聽起來是有向圖，但為了後續dfs遍歷整棵樹，這邊就用無向圖紀錄，之後再定向即可
        dfs(0);
        cout << max_dis-1 << '\n';
    }
    return 0;
}
```

![AC的Submission～](https://i.imgur.com/mj7e6IY.png)
