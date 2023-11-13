---
title: APCS 先加後乘與函數 (zerojudge j607)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
date: 2023-11-07
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=j607)

給一個運算式，運算式的內容由數字、+、*和$f()$某個函式$f()$所組成，除了函式$f()$以外不會有額外的括號。請將此運算式依照先加後乘的方式運算。

函式$f()$定義為從這個不定長度的參數$x_1, x_2, x_3, x_4, ...$中的最大值扣掉最小值。例如 $f(3,6,2)=6-2=4$，$f(3)=0$。
{% endnote %}

<!--more-->

{% note info %}
解題思路：  
遇到+ 就直接加上去
遇到* 先把後面做好
遇到f 把到)之前的每個數字記錄下來最後再比較

🌟可以一開始把`)`的位置存起來，複雜度就可以是很漂亮的$O(N)$，不過不用也沒關係，這題長度不超過500，所以可以邊做邊找，複雜度到$O(N^2)$也沒什麼差，向我寫的程式就是邊做邊找的。
{% endnote %}

```c++ APCS 先加後乘與函數
#include <bits/stdc++.h>
#define int long long
using namespace std;

string in;
int len;

// 遇到+ 就直接加上去
// 遇到* 先把後面做好
// 遇到f 把到)之前的每個數字記錄下來最後再比較

int calculate(int idx, int sum){
    if(idx>=len || in[idx]==',' || in[idx]==')') return sum;
    if(in[idx] == '+') return calculate(idx+1, sum);
    if(in[idx] == '*') return sum*calculate(idx+1, 0);
    if(in[idx] == 'f'){
        int end_idx = idx, left_num=0;
        while(in[end_idx]!=')' || left_num>0) //可在一開始建好每個函數結尾位置，複雜度可縮短至O(N)
            end_idx++, left_num+=(in[end_idx]=='(')-(in[end_idx]==')'); 
        int Min = 100004, Max = -1;
        idx++; // '(' 的位置
        while(in[idx] != ')'){
            idx++;
            int cur = calculate(idx, 0);
            Min = min(Min, cur);
            Max = max(Max, cur);
            while(in[idx]!=',' && idx<end_idx) 
                idx++, left_num+=(in[idx]=='(')-(in[idx]==')');
        }
        return calculate(idx+1,sum+(Max-Min));
    }
    if(in[idx]>='0' && in[idx]<='9'){
        vector<int> add;
        int res = 0, pos=1;
        while(in[idx]>='0' && in[idx]<='9') add.push_back(in[idx++]-'0'), pos*=10;
        for(int i : add) pos/=10, res+=i*pos;
        return calculate(idx,sum+res);
    } return -1;
}

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cin >> in;
    in = "+" + in;
    len = in.size();
    cout << calculate(0, 0) << '\n';
    return 0;
}
```

附註：這題我上個月就寫完了，但好像忘記丟上來XD

![AC的Submission～](https://i.imgur.com/gr5St9d.png)