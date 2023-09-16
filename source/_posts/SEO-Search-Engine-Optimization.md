---
title: SEO配置(搜尋引擎最佳化)
lang: zh-TW
tags:
  - Hexo
  - NexT
categories:
  - 教學文
abbrlink: 9997
date: 2023-09-10
---

## 前言

什麼是SEO呢？
> 搜尋引擎最佳化（英語：search engine optimization，縮寫為SEO）是透過了解搜尋引擎的運作規則來調整網站，以及提高目的網站在有關搜尋引擎內排名的方式。(摘自維基百科)

SEO優化就是讓搜尋引擎更喜歡你的網站，讓你的網站可以讓更多人看到的過程，接下來我會先從怎麼知道目前網頁的SEO狀況，再一一列舉優化的方法，如果只是想要知道如何能在google上搜尋到自己網頁的人可以直接看最後一項[google search console](/SEO-Search-Engine-Optimization/#google-search-console)的使用方式。

<!--more-->

1. [網頁目前SEO狀況](/SEO-Search-Engine-Optimization/#網頁目前seo狀況)
2. [網頁優化方法](/SEO-Search-Engine-Optimization/#網頁優化方法)  
  2.1. [網址](/SEO-Search-Engine-Optimization/#網址)  
  2.2. [新增description](/SEO-Search-Engine-Optimization/#新增description)  
  2.3. [Nofollow](/SEO-Search-Engine-Optimization/#nofollow)  
  2.4. [sitemap](/SEO-Search-Engine-Optimization/#sitemap)  
  2.5. [robots.txt](/SEO-Search-Engine-Optimization/#robots.txt)  
  2.6. [Google Search Console](/SEO-Search-Engine-Optimization/#google-search-console)  

## 網頁目前SEO狀況

要優化前當然要先看看自己的目前的狀況，可以到[PageSpeed Insights](https://pagespeed.web.dev)，輸入自己的網頁的網址，就可以知道目前自己網頁的狀況
![以我的網頁為例](https://i.imgur.com/vyUXRfU.png)
另外可以搜尋`site:網域`，看看自己的網站是否有被收錄到google內，如果還沒做過優化之前應該是什麼都沒有的，那在經過以下的操作後，可以確認你的網頁最少最少可以被搜尋到，如果你的網頁名稱不要太普遍，基本上要出現在第一頁應該不是問題
![搜尋site:網域](https://i.imgur.com/kftLZgg.png)

## 網頁優化方法

### 網址

搜尋引擎不喜歡過長或是索引過多的網址(例如說`https://example.com/abc/def/ghi/jkl/mn`)，因此建議把網址設定成你的檔案名稱（但就是要注意檔案名稱不能是中文，不然會變成亂碼），而且盡量跟文章要有關係，像是我這篇文章的檔案名稱就是`success@SEO-Search-Engine-Optimization.md`，如果覺得這樣太麻煩的話可以使用[abbrlink插件](https://github.com/rozbo/hexo-abbrlink)
![把網址設定成檔案名稱](https://i.imgur.com/vd9WIxo.png)

### 新增description

添加description可以讓使用者更快速了解你的文章在講什麼，所以對SEO也是很重要的部分，而我們需要分別在首頁和文章都個別設定相關的描述

<span id="inline-blue">首頁</span>
到最外層的`_config.yml`去修改description
![修改最外層_config.yml的description](https://i.imgur.com/ory8GYA.png)

<span id="inline-blue">文章</span>
要新增文章的description有兩中方法，一個是在文章最上端的細節設定新增`description: 你的description`，但我覺得略顯麻煩，因為我的文章幾乎都有一個前言，因此我就想說直接將前言當作description，作法很簡單，在前言的底下新增一行`<!--more-->`，就完成了
![新增<!--more-->作為description](https://i.imgur.com/JKfxDSQ.png)

另外補充，可以在主題內的`_config.yml`，將`read_more_btn`設定為`true`，如此一來在瀏覽你的網站時，就只會將文章中description的部分呈現出來，讓可讀性更高
![將read_more_btn設定為true](https://i.imgur.com/meLFbHF.png)
![在網頁就會出現閱讀全文的按鈕](https://i.imgur.com/FoJcPqo.png)

### Nofollow

關於nofollow是什麼詳細可以看[這篇文章](https://welly.tw/serp-rank-optimization/what-is-nofollow)，總之就是避免你的搜尋引擎權重值被別人分走，使用的是這個[插件](https://github.com/hexojs/hexo-filter-nofollow)，如果沒有要設定什麼特別的東西的話，直接執行`npm install hexo-filter-nofollow`，就完成了

### sitemap

sitemap就是用來告訴搜尋引擎我這個網站有哪些網頁，方便搜尋引擎索引，要使用的插件是[這個](https://github.com/hexojs/hexo-generator-sitemap)，執行`npm install hexo-generator-sitemap`下載插件
接著到最外層的`_config.yml`，添加以下程式碼就完成了

```yml
sitemap:
  path: sitemap.xml
```

可以試試看`你的網址/sitemap.xml`（如果是在本機跑的話應該就是`localhost:4000/sitemap.xml`，有沒有出現東西，有的話就是成功了

### robots.txt

到最外層資料夾中的`source`新增一個檔案`robots.txt`
![新增robots.txt](https://i.imgur.com/Lepvzrl.png)
接下來再`robots.txt`內貼上以下內容，記得Sitemap後面要改成你自己的網址

``` title: robots.txt
User-agent: *
Allow: /
Allow: /archives/
Allow: /categories/
Allow: /tags/ 
Disallow: /vendors/
Disallow: /fonts/
Disallow: /fancybox/
Sitemap: https://你的網址/sitemap.xml

```

<span id="inline-blue">User-agent</span> 是代表要讓哪些搜尋引擎抓取你的網頁，`*`就是全部都可以  
<span id="inline-blue">Allow</span> 這裡是代表允許搜尋引擎抓取網頁的哪些部分，照理來說如果有`Allow: /`就代表全部都可以，後面那些都是保平安用的（xd  
<span id="inline-blue">Disallow</span> 這裡就是避免搜尋引擎抓到你的字體、程式之類的  
<span id="inline-blue">Sitemap</span> 就是上面講到的sitemap.xml  

### Google Search Console

這個是最重要的一步，前面那些事讓你的SEO更好，但如果沒有這個你的網頁大概根本搜尋不到，進入[Google Search Console](https://search.google.com/search-console/about)，新增資源
![新增資源](https://i.imgur.com/tw67jVX.png)

如果是使用github page的就只能用右邊的那個，他會叫你把一個html檔放到你的網頁中，你就將它下載，然後儲存到`themes/NexT(或你用其他主題)/source`，重新部署之後稍等一下應該就完成了

如果是有自己網域的話，建議使用左邊的，這樣它涵蓋的範圍會比較廣，將它提供的TXT紀錄複製下來，然後添加網域的DNS設定，我這裡是用namecheap，各家的使用方式也都大同小異，新增`TXT Record`，`Host`設定`@`，`Value`設定剛剛複製的TXT紀錄，幾分鐘後就會通過驗證了
{% grouppicture 2-2 %}
  ![複製TXT紀錄](https://i.imgur.com/4XAblPy.png)
  ![DNS設定](https://i.imgur.com/y9sKq0R.png)
{% endgrouppicture %}

進入你的資源後裡面有很多資訊可以查詢，以下列出三點我認為較重要的說明

<span id="inline-blue">搜尋網頁索引狀態</span>
可以透過上面的搜尋看自己網頁的索引狀態，如果發現沒有建立索引可以點擊`要求建立索引`，加速建立索引的時間，讓搜尋可以在更短的時間內將它放在搜尋的頁面上
![搜尋網頁索引狀態](https://i.imgur.com/sifijQS.png)

<span id="inline-blue">檢查網頁索引狀態</span>
這個頁面可以很快看到哪些頁面已經被搜尋引擎找到，哪些已經建立索引，搭配剛剛上面的搜尋就可以迅速知道目前各個網頁的狀態
![檢查網頁索引狀態](https://i.imgur.com/saKZCae.png)

<span id="inline-blue">新增Sitemap</span>
在這個頁面就是用來把之前生成的Sitemap交給google看，讓他更清楚你的網頁們
![新增Sitemap](https://i.imgur.com/CrguGDg.png)

## 結語

恭喜你的網頁現在已經可以在google上被查詢上了，可以在使用[PageSpeed Insights](https://pagespeed.web.dev)看看SEO的分數有沒有上升，也可以看他說你哪個地方不足去修正，分數應該就可以拿到幾乎100的分數了，如果有問題或者發現我有哪裡講錯，歡迎大家到底下留言區跟我討論喔～

## 其他功能

1. 側邊欄

    － [基礎配置(關於、標籤、分類、歸檔、搜尋、頭像、個人相關連結)](/NexT-sidebar-basic)
    － [切換語言](/NexT-sidebar-switch-lang)

2. [頁底](/NexT-footer)
3. [utterances留言板](/NexT-utterances-comment-box)
4. [Google Analytics統計網站資訊](/NexT-google-analytics)
5. [日/夜模式](/NexT-dark-light-mode)
6. [live2d角色（就是網頁右下角那隻可愛的狗狗）](/NexT-live2d)
7. SEO：搜尋引擎最佳化(Search Engine Optimization) ✅
8. [剩下的一些小工具](/NexT-some-cool-tools)
9. [自訂網域](/Hexo-NexT_custom_domain)
