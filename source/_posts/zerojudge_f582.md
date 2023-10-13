---
title: APCS病毒演化 (zerojudge f582)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 60945
date: 2023-10-13 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=f582)

科學家發現了$n$種病毒，編號分別是$1$到$n$，已知每一種病毒可以用一個RNA序列來表達，RNA序列是一個長度為$m$的字串，其中包含A、U、C、G、@等字元，其中 @ 為科學家沒觀察清楚的位置，可能為 A、U、C、G 其中任何一種。
科學家也研究出了這些病毒的演化關係，除了一個最原始的病毒以外，每一種病毒都是從另一個病毒演化而來的，這些病毒會構成一個樹狀結構的病毒族譜(如圖)。
![病毒族譜](https://i.imgur.com/KtX6lgN.png)
{% endnote %}
<!--more-->

{% note info %}
解題思路：
這題我是用DP寫，並使用DFS從根遍歷整棵樹，在過程完成狀態轉移。
在寫這題的時候，最困難的應該就是要想怎麼定義狀態還有狀態轉移如何在$O(1)$內做出來，而首先按照題目可知，不同位置的字元，無論在哪個點都不受影響，而當該點的某個位置為@時，其有機會是A、U、C、G任意一個，因此不妨定義$dp[i][j][k]$代表第$i$個陣列的第$j$個字元為$k$時的單點至葉子最小距離(A, U, C, G分別對應到$k = 1, 2, 3, 4$)，而當第$i$個陣列的第$j$個字元已經被定義時(也就是不為@時)就將其餘的點設為極大值，而在狀態轉移時，就會是他各個小孩在四種狀態的值加上與他的距離(就是看小孩當前狀態是否跟父母一樣，一樣距離就是0不一樣就是1)的最小值，以數學式表達如下：(其中$child$代表第$i$個陣列的小孩個數，$child_p$代表第$i$個陣列第$p$的小孩)
$$dp[i][j][k] = \sum_{p=1}^{child} min(dp[child_p][j][1] + (k != 1), dp[child_p][j][2] + (k != 2), dp[child_p][j][3] + (k != 3), dp[child_p][j][4] + (k != 4))$$
而最後答案就是：
$$\sum_{j=0}^{m-1} min(dp[root][j][1], dp[root][j][2], dp[root][j][3], dp[root][j][4])$$
總複雜度為$O(nm)$

🌟 在當沒有小孩時(葉子)，其各點的dp除設為極大值的位置外，均為0。
{% endnote %}

```c++ 病毒演化
#include <bits/stdc++.h>
#define Max 1000000

using namespace std;

int n, m;
int dp[1003][81][6];
// dp[i][j][k] 代表第i個陣列的第j個字元為k時的單點至葉子最小距離
// k=1,2,3,4代表A,U,C,G
// 當該點已經被是確認的點時（不為@）設其dp值為 Max
// dp[i][j][k] = Σmin(dp[i_child][j][1~4]+k!=1~4)
// if i no child: dp[i][j][k] = 0
map<char, int> get_index = {{'A',1},{'U',2},{'C',3},{'G',4}};
vector<int> child[1003];

int calculate(int idx, int num, int ch){
    if(dp[idx][num][ch] != -1) return dp[idx][num][ch];
    if(child[idx].empty()) return dp[idx][num][ch] = 0;
    dp[idx][num][ch] = 0;
    for(int i: child[idx]){
        int add = Max;
        for(int k = 1; k<=4; k++)
            add = min(add, (calculate(i, num, k) + (k!=ch)));
        dp[idx][num][ch] += add;
    }
    //cout << idx << ' ' << num << ' ' << ch << ": " << dp[idx][num][ch] << '\n';
    return dp[idx][num][ch];
}

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0); 
    cin >> n >> m;
    int root_idx;
    string tmp;
    for(int i = 0, tmpI, tmpJ; i < n; i++){
        cin >> tmpI >> tmpJ;
        if(tmpI == tmpJ) root_idx = tmpI;
        else child[tmpJ].push_back(tmpI);
        cin >> tmp;
        for(int j = 0; j < m; j++){
            for(int k = 1; k <= 4; k++){
                dp[tmpI][j][k] = -1;
                if(tmp[j] != '@' && k != get_index[tmp[j]]) 
                    dp[tmpI][j][k] = Max;
            }
        }
    }
    int ans = 0;
    for(int j = 0; j< m; j++){
        int little_ans = Max;
        for(int k = 1; k <= 4; k++)
            little_ans=min(little_ans, calculate(root_idx, j, k));
        ans+=little_ans;
    }
    cout<<ans<<'\n';
    return 0;
}
```

![AC的Submission～](https://i.imgur.com/oPVFbeE.png)
