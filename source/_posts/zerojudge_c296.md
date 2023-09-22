---
title: APCS-2016-1029-3 (zerojudge c296)
lang: zh-TW
tags:
  - APCS
  - 線段樹
  - 約瑟夫問題
categories:
  - 程式題解
  - APCS
date: 2023-09-22
mathjax: true
---

{% note default %}
[題目網址](https://zerojudge.tw/ShowProblem?problemid=c296)

「定時 K彈」 是一個團康遊戲，N個人圍成一圈，由1號依序到N號，從1號開 始依序傳遞一枚玩具炸彈，每次到第M個人就會爆炸，此人即淘汰，被淘汰的人要離開圓圈，然後炸彈再從該淘汰者的下一個開始傳遞。遊戲之所以稱 K彈是因為這枚炸彈只會爆K次，在第 K次爆炸後，遊戲即停止，而此時在第K個淘汰者的下一位遊戲者被稱為幸運者，通常就會要求表演節目。  
輸入只有一行包含三個正整數，依序為N、M與 K，請輸出幸運者的號碼。
{% endnote %}
<!--more-->

{% note info %}
解題思路：

1. 直接模擬$O(N^2)$（有機會AC）  
   雖然依照這題的限制應該是絕對TLE，但實際試過之後還是有機會過的，可能是測資還不夠極限吧，就是假解
2. 線段樹做$O(N log N)$（一定AC）  
3. 使用約瑟夫問題演算法$O(N)$（一定AC）  

🌟
{% endnote %}

```c++ 

```

AC的Submission們～
![AC假解O(N^2)](https://i.imgur.com/AYYXaEc.png)
![線段樹O(N log N)](https://i.imgur.com/gOl4OLM.png)
![約瑟夫演算法O(N)](https://i.imgur.com/NqPLLat.png)
