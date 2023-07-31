---
title: Hexo-NexT 側邊欄-切換語言
lang: zh-TW
tags:
  - Hexo
  - NexT
categories:
  - 教學文
abbrlink: 51796
date: 2023-07-25 00:00:00
---

## 前言

為了讓自己網站能夠接軌國際，加個切換語言的功能是必須的吧～

<!--more-->

其實切換語言NexT有內建的功能，他的效果也還不錯，但是achieve不管怎樣都只能出現一個語言，因此最後就只能退而求其次，新做一個英文的網站並在側邊欄新增一個按鈕讓兩個網站可以互相切換，但這要注意一點，就是如果你兩個網站是放在同一個github帳號底下的話，pajx不能打開，因為都是在同一網域底下的，切換過去的時候因為pajx的特性，語言還是會停留在原本的，或是如果有大佬知道怎麼避免掉這種狀況的話，拜託在底下留言告訴我🙏

1. [架設一個新的英文網站](/NexT-sidebar-switch-lang/#架設一個新的英文網站)
2. [側邊欄新增切換按鈕](/NexT-sidebar-switch-lang/#側邊欄新增切換按鈕)

## 架設一個新的英文網站

這個部分跟先前[利用 Hexo + NexT + Github Page 建立自己的 Blog](/Hexo-NexT_Github-Page_build-blog/)完全一樣，要注意一下在最外層資料夾的_config.yml其中site內的language要改成en，網站才會變成英文的，還有記得branch要使用gh-pages，才能正常運作喔

![language要改成en](https://i.imgur.com/DzQuENU.png)

## 側邊欄新增切換按鈕

換成到themes內的_config.yml，這裡先講中文網站要如何配置
到menu，新增一個叫做Switch Language的選項（或是其他名字也可以），後面就打你另一個語言網站的名稱，最後一個圖示就看個人喜好要放什麼啦

``` yml
menu:
  home: / || fa fa-home
  about: /about/ || fa fa-user
  tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  Switch Language: https://moon-jam.github.io/en/ || fa fa-language
```

英文網站的部分也一樣，只是網址記得要改成中文的就好了

``` yml
menu:
  home: / || fa fa-home
  about: /about/ || fa fa-user
  tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  Switch Language: https://moon-jam.github.io/ || fa fa-language
```

然後當你要新增英文文章時就在英文的那份檔案寫，中文的就在原先的檔案內寫，如此一來就完成中英切換的網站了

## 結語

切換語言就是這麼簡單，就是在發布不同語言時還要切資料夾有點麻煩，還有不能用pjax如果有問題或者發現我有哪裡講錯，歡迎大家到底下留言區跟我討論喔～

## 其他功能

1. 側邊欄

    － [基礎配置(關於、標籤、分類、歸檔、搜尋、頭像、個人相關連結)](/NexT-sidebar-basic)  
    － 切換語言 ✅

2. [頁底](/NexT-footer)
3. [utteranc留言板](/NexT-footer)
4. [Google Analytics統計網站資訊](/NexT-google-analytics)
5. [日/夜模式](/NexT-day-night-mode)
6. [live2d角色（就是網頁右下角那隻可愛的狗狗）](/NexT-live2d)
7. [SEO：搜尋引擎最佳化(Search Engine Optimization)](/SEO-Search-Engine-Optimization)
8. [剩下的一些小工具](/NexT-some-cool-tools)
