---
title: Hexo-NexT 自訂網域
lang: zh-TW
tags:
  - Hexo
  - NexT
categories:
  - 教學文
abbrlink: 48887
date:
---

## 前言

本來想說預算不足，所以就沒有自己買網域，不過後來發現[Github學生方案](https://education.github.com/pack/offers)中可以在namecheap上挑一個免費的網域（另外還有name.com也可以，也就是說你可以免費取得兩個網域，超棒的吧～）

<!--more-->

1. [申請網域](/Hexo-NexT_custom_domain/#申請網域)
1. [連結Github](/Hexo-NexT_custom_domain/#連結Github)

## 申請網域

申請就是要傳一些證明你是學生的資料，如果沒過的話就多試幾次，過了之後就等一下（我看有人是幾分鐘，有人幾小時，我的話比較久好像快一個禮拜），然後就到GitHub Student Developer Pack裡面找到namecheap（我覺得這個比name.com好用一點，尤其是ssl的認證，雖然在這裡是用不到就是了），最後連結github帳號，取得折扣碼，然後找想要的網域之後結帳就完成了。

![連結github帳號，取得折扣碼，然後找想要的網域之後結帳就完成了](https://i.imgur.com/rCrDTw2.png)

## 連結Github

到namecheap的domain list中選取你剛剛申請好的網域

![到namecheap的domain list中選取你剛剛申請好的網域](https://i.imgur.com/hyEUpiM.png)

點到裡面的Advanced DNS，會發現他已經幾乎幫你設定完了，把最底下CNAME Record的Value設成你的github page的網址即可

![將CNAME Record的Value設成你的github page的網址](https://i.imgur.com/q0IAGja.png)

好的那在namecheap這邊已經設置完成，接下來就要到Github上了，到你的repository（然後因為前面的學生方案還會發現你變成github pro了，酷吧），點設定，到Pages，到Custom domain打上申請的網域，接下來他會跑認證，認證之後才可以把Enforce HTTPS打勾，大概等個半小時，先吃一個下午茶，就會發現你可以打勾了，恭喜，你完成摟～

![一張圖道盡千言萬語](https://i.imgur.com/3ozFoIX.png)

## 結語

恭喜你有了自己的Domain，~~之後遇到人又多了個可以炫耀的東西了呢~~，另外通過這個機會你也申請到了Github Education，裡面有很多好用的工具還有教學，真的是撿到寶了，如果你還是高中生，趁這段時間妥善利用這些教學，你應該會變得很強的🛐🛐🛐

## 其他功能

1. 側邊欄

    － [基礎配置(關於、標籤、分類、歸檔、搜尋、頭像、個人相關連結)](/NexT-sidebar-basic)  
    － [切換語言](/NexT-sidebar-switch-lang)  

2. [頁底](/NexT-footer)
3. [utterances留言板](/NexT-utterances-comment-box)
4. [Google Analytics統計網站資訊](/NexT-google-analytics)
5. [日/夜模式](/NexT-day-night-mode)
6. [live2d角色（就是網頁右下角那隻可愛的狗狗）](/NexT-live2d)
7. [SEO：搜尋引擎最佳化(Search Engine Optimization)](/SEO-Search-Engine-Optimization)
8. [剩下的一些小工具](/NexT-some-cool-tools)
9. 自訂網域 ✅
