---
title: Hexo-NexT 留言板 utterances 配置
lang: zh-TW
tags:
  - Hexo
  - NexT
categories:
  - 教學文
abbrlink: 16866
date: 2023-08-17 00:00:00
---

## 前言

許多 Blog 都有自己的留言區，可以方便地與讀者交流（~~只是可能做了之後文章也沒有人看，所以也不會有交流的機會🥲~~），這次要分享的是用 utterances，另外還有其他像是 Disqus 或是 GitHub Gitalk，但前者會一直有廣告很討厭，後者好像有些資安疑慮（要不然他功能比較多在留言區還可以互相 tag），最後只好就選 utterances，不過他也還是不錯用的，支援 Markdown 語法，有亮暗主題，也算很好了啦。

<!--more-->

1. [安裝](/NexT-utterances-comment-box/#安裝)
2. [文章中停用留言區](/NexT-utterances-comment-box/#文章中停用留言區)

## 安裝

先簡單說一下原理，他的留言板就是用 GitHub 的 issue 功能，用你文章的路徑、網址或是標題當作 issue 的 Title，然後把留言的內容當作是 issue 的回覆，所以留言的人就必須要有 GitHub 帳號才能使用

解說完畢，實作上很簡單，就是來到主題底下的 `_config.yml` 裡將這些改一改，主題你可以自己全部都試試看，他很好心全部都列出來了，repo 要改成你自己的喔，要不然就會跑來我的 issue 了（x
![Image](https://i.imgur.com/J98nMDR.png)

接著到你的隨便一篇文章底下去看，就會發現留言區還是沒出現，因為還要再裝一個 [utterances](https://GitHub.com/apps/utterances)，點擊安裝選擇 GitHub page 的 repo 然後在點擊安裝就完成了

![Image](https://i.imgur.com/dancpB7.png)

## 文章中停用留言區

只要在你的文章最上面的 [Front Matter](https://hexo.io/docs/front-matter) （就是打 `title` `tag` `categories` 那些的地方），加上 `comments: false` 留言區就會消失了

```yaml blablabla.md
---
title: ...
...
comments: false
---
```

## 結語

可以自己先試試看發個留言（~~要不然可能他從此都不會被用到~~），確認都可以用之後，恭喜你就完成留言板嘍！如果有問題或者發現我有哪裡講錯，歡迎大家到底下留言區跟我討論喔～

![TEST😵‍💫](https://i.imgur.com/nGHOBS4.png)

## 其他功能

1. 側邊欄

    － [基礎配置(關於、標籤、分類、歸檔、搜尋、頭像、個人相關連結)](/NexT-sidebar-basic)  
    － [切換語言](/NexT-sidebar-switch-lang)  

2. [頁底](/NexT-footer)
3. utterances 留言板 ✅
4. [Google Analytics統計網站資訊](/NexT-google-analytics)
5. [日/夜模式](/NexT-dark-light-mode)  
6. [live2d角色（就是網頁右下角那隻可愛的狗狗）](/NexT-live2d)
7. [SEO：搜尋引擎最佳化(Search Engine Optimization)](/SEO-Search-Engine-Optimization)
8. [剩下的一些小工具](/NexT-some-cool-tools)
9. [自訂網域](/Hexo-NexT_custom_domain)
