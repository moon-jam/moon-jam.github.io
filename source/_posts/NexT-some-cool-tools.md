---
title: Hexo-NexT 一些好用的酷東東
lang: zh-TW
tags:
  - Hexo
  - NexT
categories:
  - 教學文
abbrlink: 6153
date: 2023-09-10
---

## 前言

在這篇中所講述的是一些可以沒有，但是有的話**可能**會很方便的酷東東

<!--more-->

1. [vscode-imgur](/NexT-some-cool-tools/#vscode-imgur)
2. [閱讀更多按鈕](/NexT-some-cool-tools/#閱讀更多按鈕)
3. [標題前的圖示](/NexT-some-cool-tools/#標題前的圖示)

## vscode-imgur

![vscode-imgur](https://i.imgur.com/m8LaSvK.png)
![實際執行](https://i.imgur.com/jPm7V6t.gif)
就是要申請API讓vscode使用，詳細教學可以[看這邊](https://israynotarray.com/hexo/20201012/473855281/)

## 閱讀更多按鈕

如果沒有這個的話在一開始首頁的地方全部文章都會是展開的，這樣對於要翻看有哪些內容就很不方便，網站整體觀感也會不好，因此可以新增一個閱讀更多的按鈕，設定每篇文章要顯示多少內容給使用者看，這個部分我有在[SEO優化的description中說明](/SEO-Search-Engine-Optimization/#新增description)

## 標題前的圖示

這個有一個比較簡單的方法，在`theme/NexT(改成你的主題名稱)/source/css/main.styl`，貼上以下程式碼，裡面的符號可以改成自己的

```css
/*修改h2前面圖標*/
.posts-expand .post-body h2:before{
    content: "🔍";
    margin-right: 16px;
}

/*修改h3前面圖標*/
.posts-expand .post-body h3:before{
    content: "📌";
    margin-right: 16px;
}
```

另外一個方法就是到最外層資料夾中的`source`新建一個`_data`的資料夾，然後在裡面新增`styles.styl`這個檔案（也就是`source/data/styles.styl`，然後將剛剛上面的程式碼貼在裡面，最後到`theme/NexT(改成你的主題名稱)/_config.yml`將custom_file_path的最後一項`style: source/_data/styles.styl`的註解取消，就完成了

![開啟custom_file_path設定](https://i.imgur.com/ndD3yh1.png)

## 結語

這些酷酷的工具是不是也挺方便的呢？如果有問題或者發現我還有什麼酷酷的功能沒有講到，歡迎大家到底下留言區跟我討論喔～

## 其他功能

1. 側邊欄

    － [基礎配置(關於、標籤、分類、歸檔、搜尋、頭像、個人相關連結)](/NexT-sidebar-basic)
    － [切換語言](/NexT-sidebar-switch-lang)

2. [頁底](/NexT-footer)
3. [utterances留言板](/NexT-utterances-comment-box)
4. [Google Analytics統計網站資訊](/NexT-google-analytics)
5. [日/夜模式](/NexT-dark-light-mode)
6. [live2d角色（就是網頁右下角那隻可愛的狗狗）](/NexT-live2d)
7. [SEO：搜尋引擎最佳化(Search Engine Optimization)](/SEO-Search-Engine-Optimization)
8. 剩下的一些小工具 ✅
9. [自訂網域](/Hexo-NexT_custom_domain)
