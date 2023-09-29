---
title: APCS-2016-1029-4棒球遊戲 (zerojudge c297)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 60512
date: 2023-09-29 00:00:00
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=c297)
謙謙最近迷上棒球，他想自己寫一個簡化的遊戲計分程式。這會讀入隊中每位球員的打擊結果，然後計算出球隊得分。
這是個簡化版的模擬，假設擊球員打擊結果只有以下情況：  
(1) 安打：以1B,2B,3B和HR 分別代表一壘打、二壘打、三壘打和全（四）壘打。  
(2) 出局：以 FO,GO和 SO表示。  

請寫出具備這樣功能的程式，計算球隊總得分。
{% endnote %}
<!--more-->

{% note info %}
解題思路：
這題應該算是基礎的資料結構，可以想一下球員的跑壘方式，先上壘的會先出來，那麼就可以使用queue實作，每個一個安打pop幾次，如果pop到的地方是有人的話就把分數加一。

🌟可以把題目指令轉換成數字，在實作上會比較方便，轉成數字的方法可以用map完成，整體程式就會更簡單。
{% endnote %}

```c++ APCS-2016-1029-4棒球遊戲
#include <bits/stdc++.h>

using namespace std;
//以1B,2B,3B和HR 分別代表一壘打、二壘打、三壘打和全（四）壘打
//以 FO,GO和 SO表示 出局
map<string,int> action = {{"1B",1},{"2B",2},{"3B",3},{"HR",4},{"FO",5},{"GO",5},{"SO",5}};

signed main(){
    queue<string> player[11];
    queue<bool> base;
    base.push(0),base.push(0),base.push(0);
    int out, cur_out = 0, score=0;
    for(int i = 0,n; i<9; i++){
        cin >> n;
        string tmp;
        for(int j=0; j < n; j++) cin>>tmp, player[i].push(tmp);
    }
    cin >> out;
    bool clear=0;
    for(int cur_pl = 0; out!=cur_out; cur_pl=(cur_pl+1)%9){
        if(clear){
            for(int i = 0; i<3; i++) base.pop(),base.push(0);
            clear=0;
        }
        int cmd = action[player[cur_pl].front()];
        player[cur_pl].pop();
        if(cmd==5) cur_out++, clear=!(cur_out%3);
        else{ 
            base.push(1),score+=base.front(),base.pop();
            for(int i = 0; i<cmd-1; i++)
                score+=base.front(),base.pop(),base.push(0);
        }
    }
    cout << score << '\n';
    return 0;
}
```

![AC的Submission～](https://i.imgur.com/oOaDZbf.png)
