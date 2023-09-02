---
title: Hexo-NexT 深淺主題切換配置
lang: zh-TW
tags:
  - Hexo
  - NexT
categories:
  - 教學文
abbrlink: 48887
date: 2023/09/01
---

## 前言

現在不論是手機應用程式、網頁幾乎都有所謂深淺模式，先不論省不省電或是好不好看，有了切換的功能就是很酷，使用者可以依自己喜好挑選自己習慣的模式，這篇內容因為有點太簡單，所以我就只有一個章節了～

<!--more-->

## 教學開始～

這次用的套件是[這個](https://github.com/rqh656418510/hexo-next-darkmode)，安裝的方式非常簡單，輸入下列指令就完成了

```no
npm install hexo-next-darkmode
```

設置的方式則是到theme內的`_config.yml`，貼上以下指令就完成了

```yml
# Darkmode JS
# For more information: https://github.com/rqh656418510/hexo-next-darkmode, https://github.com/sandoche/Darkmode.js
darkmode_js:
  enable: true
  bottom: '64px' # 距離底端的距離
  right: 'unset' # 距離右邊的距離(unset就是只需要設定左邊，右邊會自己調整)
  left: '32px' # 距離左邊的距離(unset就是只需要設定右邊，左邊會自己調整)
  time: '0.5s' # 切換深淺模式的時間
  mixColor: 'transparent' # 這個建議不要用，雖然會出現酷酷的一個往外擴散的效果，可是他的顏色會跟原本的背景混再一起，有時候還會讓字不清楚，想玩的可以自己改改看
  backgroundColor: 'transparent' #背景顏色
  buttonColorDark: '#100f2c' # 在淺色模式的時候按鈕的顏色
  buttonColorLight: '#fff' # 在深色模式的時候按鈕的顏色
  isActivated: false # 這裡如果用true的話是可以自己改寫他的CSS，但我覺得應該沒有必要，詳細可以看github的內的介紹
  saveInCookies: true # 會儲存到Cookies內，下次來會依照上次你的設定切換到深淺模式
  label: '🌓' # 可以改成自己像要的表情圖示
  autoMatchOsTheme: true # 自動切換到跟使用者裝置相同的深淺模式
  libUrl: # Set custom library cdn url for Darkmode.js
```

如果想要設定固定的背景或按鈕顏色的話可以修改backgroundColor、buttonColorDark、buttonColorLight後的色碼，例如說`backgroundColor: "#FFD9E6"`，推薦給有少女心的各位

![猛男粉紅💪](https://i.imgur.com/Yr5MMiF.png)

## 結語

完成啦！深淺切換的功能很簡單吧～如果有問題或者發現我有哪裡講錯，歡迎大家到底下留言區跟我討論喔～

## 其他功能

1. 側邊欄

    － [基礎配置(關於、標籤、分類、歸檔、搜尋、頭像、個人相關連結)](/NexT-sidebar-basic)  
    － [切換語言](/NexT-sidebar-switch-lang)  

2. [頁底](/NexT-footer)
3. [utterances留言板](/NexT-utterances-comment-box)
4. [Google Analytics統計網站資訊](/NexT-google-analytics)
5. 日/夜模式 ✅
6. [live2d角色（就是網頁右下角那隻可愛的狗狗）](/NexT-live2d)
7. [SEO：搜尋引擎最佳化(Search Engine Optimization)](/SEO-Search-Engine-Optimization)
8. [剩下的一些小工具](/NexT-some-cool-tools)
9. [自訂網域](/Hexo-NexT_custom_domain)
