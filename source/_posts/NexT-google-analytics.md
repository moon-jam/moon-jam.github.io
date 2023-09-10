---
title: 如何在Hexo-NexT主題中配置Google Analytics
lang: zh-TW
tags:
  - Hexo
  - NexT
categories:
  - 教學文
abbrlink: 48887
date: 2023-09-03
---

## 前言

Google Analytics（後文簡稱為GA）是一個由Google所提供的網站流量統計服務，透過在網站中埋入GA追蹤碼，網站主們可以獲取進站流量的資料，包括來源、使用者、裝置、造訪路徑等，透過GA，可以更全面的了解品牌的受眾，進而為潛在客戶優化購買、造訪流程，提高轉單意願，對於網頁入門來說是非常推薦使用的工具。(摘自[維基百科](https://zh.wikipedia.org/zh-tw/Google%E5%88%86%E6%9E%90))
<!--more-->
不過這篇只會教你怎麼讓你的網頁與GA連結，詳細的操作可以看[google推出的免費課程](https://analytics.google.com/analytics/academy/course/6?hl=zh-tw)

## 教學開始！

首先到[GA的官網](https://analytics.google.com/)註冊一個帳號，接著到管理建立帳戶、資源、最後切換到資料串流
![建立帳戶、資源、切換到資料串流](https://i.imgur.com/wdINP2I.png)

新增串流，選擇網頁
![新增串流](https://i.imgur.com/7ZZQnoB.png)

設定串流名稱、串流網址，他會自動生成GA id（就是最後的評估id），把他複製下來等等會用到
![設定資料並複製id](https://i.imgur.com/XI7htXE.png)

這次不去改_congif.yml的內容，雖然說他裡面也有可以設定GA的地方，但不知道為什麼我試過之後沒辦法使用，這裡我們直接改他的layout，首先到theme->{your-theme-name}->layout->_layout.njk
![切換到_layout.njk](https://i.imgur.com/CVdViKM.png)

在body的上方插入以下程式碼，請務必將 'your-id' 替換為剛剛複製的id

```javascript
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=your-id"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'your-id');
</script>
```

![將程式碼插入到body的上方](https://i.imgur.com/4mtAFID.png)

重啟網站（使用`hexo s`）並重新載入網頁，然後前往GA -> 報表 -> 即時，檢查是否有變化，有時可能需要等待一段時間才能看到數據更新。
![查看即時報表有沒有變化](https://i.imgur.com/dZ0ZkQ6.png)

## 結語

現在，你可以使用Google Analytics來監控每日訪問你的網站的人數。如果流量足夠，你甚至可以考慮進行廣告投放。如果有問題或者發現我有哪裡講錯，歡迎大家到底下留言區跟我討論喔～

## 其他功能

1. 側邊欄

    － [基礎配置(關於、標籤、分類、歸檔、搜尋、頭像、個人相關連結)](/NexT-sidebar-basic)  
    － [切換語言](/NexT-sidebar-switch-lang)  

2. [頁底](/NexT-footer)
3. [utterances留言板](/NexT-utterances-comment-box)
4. Google Analytics統計網站資訊 ✅
5. [日/夜模式](/NexT-dark-light-mode)
6. [live2d角色（就是網頁右下角那隻可愛的狗狗）](/NexT-live2d)
7. [SEO：搜尋引擎最佳化(Search Engine Optimization)](/SEO-Search-Engine-Optimization)
8. [剩下的一些小工具](/NexT-some-cool-tools)
9. [自訂網域](/Hexo-NexT_custom_domain)
