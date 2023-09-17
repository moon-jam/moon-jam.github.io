---
title: APCS2017-0304-3數字龍捲風 (zerojudge c292)
lang: zh-TW
tags:
  - APCS
categories:
  - 程式題解
  - APCS
abbrlink: 50085
date: 2023-09-17
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=c292)

給定一個 N*N 的二維陣列，其中N是奇數，我們可以從正中間的位置開始順時 針旋轉的方式走訪每個陣列元素恰好一次。對於給定的陣列內容與起始方向，請輸出走訪順序之內容。

提示：本題有多種處理方式，其中之一是觀察每次轉向與走的步數。例如起始方向是向左時，前幾步的走法是：左1、上 1、右 2、下 2、左 3、上 3、…… 一直到出界為止。
{% endnote %}
<!--more-->

{% note info %}
解題思路：
這題的提示真的太明顯，實在有點讓人來不及思考就把答案講出來了，正式考試應該沒有提示吧🤔  
總之就是按照提示說的，每經過兩次不同方向移動就會多走一步，這邊要注意一點，最後走的那一次不會多走一步（以3*3來說，走的步數會是1、1、2、2、2，而不是1、1、2、2、3），要記得注意這個狀況。
因為這個過程每個點都會被拜訪一次，所以時間複雜度就會是$O(N^2)$，N<50，所以絕對不可能超時的👍

🌟因為是每經過兩次不同方向移動，這邊有一個小技巧，一開始把要走的步數設定成10，每次+5，要用的時候再除以10，寫起來會比較方便（或者是你可以用double一次增加0.5，使用時再轉換成int，但我比較不建議，雖然這題不會怎樣，但double能少用還是不要用，要不然如果太習慣，數字大了之後出現精度問題還要想辦法修正），另一點在移動的部分，可以開兩個陣列代表x移動方向跟y移動方向，然後依據目前方向代碼在陣列中索引移動方向（也可以開一個陣列同時兼顧x跟y，雖然很酷但其實省這一點點空間根本沒差，所以還是推薦開兩個陣列會比較方便），當然如果你要開四個if跟迴圈也是可以的。

小插曲：我意外發現這題最後不換行也可以過
{% endnote %}

```c++ APCS2017-0304-3數字龍捲風
#include <bits/stdc++.h>

using namespace std;

// 0代表左 、1代表上 、2代表右 、3代表下
signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    int n, dir;
    int arr[55][55];
    vector<int> records;
    cin >> n >> dir;
    for(int i = 0; i<n; i++)
        for(int j = 0; j<n; j++)
            cin >> arr[j][i];
    int dirs_x[5] = {-1, 0, 1, 0}, dirs_y[5] = {0, -1, 0, 1};
    int cur_x=n/2, cur_y=n/2, pace=10;
    records.push_back(arr[cur_x][cur_y]);
    while(cur_x>=0&&cur_x<n&&cur_y>=0&&cur_y<n){
        for(int i = 0, cur_p=pace/10; i<cur_p; i++){
                cur_x+=dirs_x[dir], cur_y+=dirs_y[dir];
                if(cur_x>=0&&cur_x<n&&cur_y>=0&&cur_y<n)
                    records.push_back(arr[cur_x][cur_y]);
        }
        dir = (dir+1)%4, pace+=5;
    }
    for(int i : records) cout << i;
    cout << '\n';
    return 0;
}
```

![AC的Submission～](https://i.imgur.com/1LqU1gf.png)
