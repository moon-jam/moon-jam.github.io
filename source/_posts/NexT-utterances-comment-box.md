---
title: Hexo-NexT 留言板utterances配置
lang: zh-TW
tags:
  - Hexo
  - NexT
categories:
  - 教學文
# hidden: true
abbrlink: 16866
date: 2023-08-17 00:00:00
---

## 前言

許多Blog都有自己的留言區，可以方便地與讀者交流（~~只是我做了之後文章也沒有人看，所以也不會有交流的機會🥲~~）我要教的是用utterances，另外還有其他像是Disqus或是GitHub Gitalk，但前者會一直有廣告很討厭，後者好像有些資安疑慮（要不然他功能比較多在留言區還可以互相tag），最後只好就選utterances，不過他也還是不錯用的，支援markdown語法，有亮暗主題，也算很好了啦。

<!--more-->

1. [安裝](/NexT-utterances-comment-box/#安裝)
2. [文章中禁用留言區](/NexT-utterances-comment-box/#文章中禁用留言區)

## 安裝

先簡單說一下原理，他的留言板就是用github的issue功能，用你文章的路徑、網址或是標題當作issue的Title，然後把留言的內容當作是issue的回覆，所以留言的人就必須要有github帳號才能使用

解說完畢，實作上很簡單，就是來到主題底下的_config.yml裡將這些改一改，主題你可以自己全部都試試看，他很好心全部都列出來了，repo要改成你自己的喔，要不然就會跑來我的issue了（x
![Image](https://i.imgur.com/J98nMDR.png)

接著到你的隨便一篇文章底下去看，就會發現留言區還是沒出現，因為還要再裝一個[utterances](https://github.com/apps/utterances)，點擊安裝選擇github page的repo然後在點擊安裝就完成了

![Image](https://i.imgur.com/dancpB7.png)

## 結語

可以自己先試試看發個留言（~~要不然可能他從此都不會被用到~~），確認都可以用之後，恭喜你就完成留言板嘍！如果有問題或者發現我有哪裡講錯，歡迎大家到底下留言區跟我討論喔～

![TEST😵‍💫](https://i.imgur.com/nGHOBS4.png)

## 其他功能

1. 側邊欄

    － [基礎配置(關於、標籤、分類、歸檔、搜尋、頭像、個人相關連結)](/NexT-sidebar-basic)  
    － [切換語言](/NexT-sidebar-switch-lang)  

2. [頁底](/NexT-footer)
3. utterances留言板 ✅
4. [Google Analytics統計網站資訊](/NexT-google-analytics)
5. [日/夜模式](/NexT-dark-light-mode)  
6. [live2d角色（就是網頁右下角那隻可愛的狗狗）](/NexT-live2d)
7. [SEO：搜尋引擎最佳化(Search Engine Optimization)](/SEO-Search-Engine-Optimization)
8. [剩下的一些小工具](/NexT-some-cool-tools)
9. [自訂網域](/Hexo-NexT_custom_domain)
