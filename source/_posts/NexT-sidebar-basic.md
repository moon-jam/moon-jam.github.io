---
title: "Hexo-NexT 側邊欄基礎配置"
lang: zh-TW
abbrlink: 43215
date: 2023-07-15
tags: 
  - Hexo
  - NexT
categories:
  - 教學文
---

## 前言

這篇要介紹的是側邊欄的基礎配置會包含關於、標籤、分類、歸檔、搜尋、頭像、個人相關連結（IG、Gmail...）這些功能，另外本網誌的側邊欄有新增切換語言的功能，有興趣可以看看。

<!--more-->

1. [關於、標籤、分類、歸檔](/NexT-sidebar-basic/#關於、標籤、分類、歸檔)
2. [搜尋](/NexT-sidebar-basic/#搜尋)
3. [頭像](/NexT-sidebar-basic/#頭像)
4. [個人相關連結](/NexT-sidebar-basic/#個人相關連結)

## 關於、標籤、分類、歸檔

首先要生成關於、標籤、分類這三個分頁（但歸檔不用，他預設就有了，我也覺得很奇怪為什麼其他不要預設就生成）

``` bash
hexo new page about
hexo new page tags
hexo new page categories
```

接著應該會發現在source裡面多出了三個資料夾
![生成的三個資料夾](https://i.imgur.com/Y27wMgQ.png)
點進去後會發現一個叫做```index.html```的東西，點進去後輸入以下內容（xxx依照about、tags、categories哪個資料夾填入）

``` yml
---
type: "xxx"
layout: "xxx"
---
```

以about為例

``` yml
---
type: "about"
layout: "about"
---
```

另外，about裡面要放一些關於自己的一些事的話，就直接接續`---`，底下繼續撰寫即可，以我的about為例

``` yml
---
type: "about"
layout: "about"
---

## 我是貓熊🐼

這裡會紀錄貓熊的生活大小事
```

接著要讓側邊欄顯示關於、標籤、分類、歸檔這些字樣給使用者選用，移駕到你的theme主題的_config.yml

找到menu，並將about、tags、categories，取消註解，如下（如果想改圖示的話就就跟[頁底配置中更換icon](/NexT-sidebar-basic/#版權說明、icon、Powered-by…)一樣，將後面的圖示替換即可）

``` yml
menu:
  home: / || fa fa-home
  about: /about/ || fa fa-user
  tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
```

恭喜你這樣就完成第一步啦～應該可以在網站上看到這些東西了

## 搜尋

首先安裝搜尋需要的插件

``` txt
npm install hexo-generator-searchdb
```

然後到你的theme主題的_config.yml，搜尋```local_search```，將`enable`，設為true，就完成嘍，超簡單的吧～

```yml
# Local Search
# Dependencies: https://github.com/next-theme/hexo-generator-searchdb
local_search:
  enable: true
  # If auto, trigger search by changing input.
  # If manual, trigger search by pressing enter key or search button.
  trigger: auto
  # Show top n results per article, show all results by setting to -1
  top_n_per_article: 1
  # Unescape html strings to the readable one.
  unescape: false
  # Preload the search data when the page loads.
  preload: false
```

## 頭像

這個更簡單，在theme主題的_config.yml，搜尋```avatar```，然後將你想要的頭像放到theme主題中`/source/images`

![頭像檔案要存放的地方](https://i.imgur.com/AudEpQN.png)

然後將`url`後設定為`/images/image_name`，以我的頭像為例，其檔名叫做`Panda_Me.png`，而`rounded`代表是否要顯示在圓框內，`rotated`表示滑鼠移到頭像上時是否要旋轉

```yml
# Sidebar Avatar
avatar:
  # Replace the default image and set the url here.
  url: /images/Panda_Me.png
  # If true, the avatar will be displayed in circle.
  rounded: true
  # If true, the avatar will be rotated with the cursor.
  rotated: false
```

## 個人相關連結

接下來這是最輕鬆的，一樣在theme主題的_config.yml，然後搜尋```social```，在底下找你想要顯示的網站，取消註解，然後將你的網址打上去即可，以我的為例，我放了Github、Gmail、IG

```yml
# Social Links
# Usage: `Key: permalink || icon`
# Key is the link label showing to end users.
# Value before `||` delimiter is the target permalink, value after `||` delimiter is the name of Font Awesome icon.
social:
  GitHub: https://github.com/moon-jam || fab fa-github
  Gmail: mailto:wu.messi.wu@gmail.com || fa fa-envelope
  #Weibo: https://weibo.com/yourname || fab fa-weibo
  #Twitter: https://twitter.com/yourname || fab fa-twitter
  #FB Page: https://www.facebook.com/yourname || fab fa-facebook
  #StackOverflow: https://stackoverflow.com/yourname || fab fa-stack-overflow
  #YouTube: https://youtube.com/yourname || fab fa-youtube
  IG: https://www.instagram.com/mooooonjam || fab fa-instagram
  #Skype: skype:yourname?call|chat || fab fa-skype
```

## 結語

側邊欄的基礎功能都已經配置完畢，看起來已經跟一般的部落格看起來差不多了呢，是不是很簡單啊，如果有發現哪裡講錯或是有任何疑問，都歡迎在底下留言告訴我喔～

## 其他功能

1. 側邊欄

    － 關於、標籤、分類、歸檔、搜尋 ✅
    － [切換語言](/NexT-sidebar-switch-lang)  

2. [頁底](/NexT-footer)
3. [utteranc留言板](/NexT-footer)  
4. [Google Analytics統計網站資訊](/NexT-google-analytics)  
5. [日/夜模式](/NexT-day-night-mode)  
6. [live2d角色（就是網頁右下角那隻可愛的狗狗）](/NexT-live2d)  
7. [SEO：搜尋引擎最佳化(Search Engine Optimization)](/SEO-Search-Engine-Optimization)  
8. [剩下的一些小工具](/NexT-some-cool-tools)  
