---
title: "Hexo-NexT 網頁頁底設計"
lang: zh-TW
abbrlink: 43212
date: 2023-07-07
tags:
  - Hexo
  - NexT
categories:
  - 中文
  - 教學文
description: 
---

## 前言

網站現在基本的都有了，接下來就是來新增一些酷酷的東西了，這篇要講的是頁底的部分，那總共會分成底下這幾個部分  

1. [底下的版權說明、說明、頁底的icon、Powered by...](/NexT-footer/#底下的版權說明、說明、頁底的icon、Powered-by…)
2. [字數統計、估計閱讀時間]((/NexT-footer/字數統計、估計閱讀時間)
3. [閱覽人數](/NexT-footer/閱覽人數)

## 底下的版權說明、說明、頁底的icon、Powered by...

首先先移駕到你的theme裡面主題的_config.yml
![我的主題名稱是叫做NexT所以就是這裡，如果你的主題名稱你叫做其他名字就一樣點到那裡面的_config.yml，](https://i.imgur.com/DTKXyro.png)

然後搜尋```footer```，找到他的位置
![Image](https://i.imgur.com/QKMq7vc.png)

1. since：你這個網站開始的時間，在你的頁底就會是XXXX~XXXX，但如果你寫的就是今年他就只會顯示今年的年份，你也可以不打，如果不打他就是會顯示今年
2. icon：這個就是在底下會看到的可愛圖示，預設是愛心，也可以在幾改成想要的圖案，如果想要改成自己想要的可以到[這個網站](https://fontawesome.com/icons)找找看，然後把另外animated就是他會不會在那裡"跳"!?（自己試試看就知道了），最後一個就顏色，可以自己去查色碼填到裡面去
![像是我是用這個爪子，就把我框起來那個地方複製到name後面(但有些圖案顯示不出來，可以試試看其他樣式的，但如果都不行就只能換一個了，如果有大佬知道怎麼用的話歡迎在底下留言～)](https://i.imgur.com/VteB7bj.png)
3. copyright：這個就是他為在圖示後面看要不要出現你的名字（名字的設定可以到最外層資料夾的_config去改喔）

## 字數統計、估計閱讀時間

我們要使用的是[這個](https://github.com/next-theme/hexo-word-counter)插件，首先下載

```no
npm install hexo-word-counter
```

接著在NexT內的_config貼上這些

```yml
symbols_count_time:
  symbols: true # 在頁底顯示總共有多少字
  time: true  # 在文章顯示總共需多少時間
  total_symbols: true # 在頁底顯示總共有多少字
  total_time: true  # 在頁底顯示總共需多少時間
  exclude_codeblock: true  # 是否排除程式碼字數
  awl: 2 #平均文字長度，中文為 2, 英文為 5, 預設為 4
  wpm: 275  # 可以閱讀多少字每分鐘
  suffix: "mins."
```

## 閱覽人數

## 其他功能

1. 側邊欄

    － [關於、標籤、分類、歸檔](/NexT-sidebar-about-tag-category-archives)  
    － [搜尋](/NexT-sidebar-search)  
    － [切換語言](/NexT-sidebar-switch-lang)  

2. [頁底](/NexT-footer) ✅
3. [utteranc留言板](/NexT-footer)  
4. [Google Analytics統計網站資訊](/NexT-google-analytics)  
5. [日/夜模式](/NexT-day-night-mode)  
6. [live2d角色（就是那隻可愛的狗狗）](/NexT-live2d)  
7. [SEO：搜尋引擎最佳化(Search Engine Optimization)](/SEO-Search-Engine-Optimization)  
8. [剩下的一些小工具](/NexT-some-cool-tools)  
