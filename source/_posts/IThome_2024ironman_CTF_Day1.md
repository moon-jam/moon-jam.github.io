---
title: IThome 2024 鐵人賽 一直刷 CTF - Day1
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 9481
date: 2024-09-04
lang:
---

## 前言

自從暑假參加了 AIS3 遇到了各路大神，覺得自己實在太廢了，也聽到其實蠻多人推薦可以從打 CTF 開始學習資安，所以就決定來參加 IThome 2024 鐵人賽，想藉由一直刷 CTF 題目，希望結束之後可以稍稍變強一點。

<!--more-->

本來想說這次就以 5000 分為目標，結果我打開 Pico CTF，結果發現上面怎麼都沒有分數，然後花了大概一個小時在找到底我哪邊沒設定好，結果一問之下才知道是因為 Pico CTF 過去各年的題目難易度對應分數並不一致，以至於相同難度的題目在不同的年份可能會有不同的分數，所以就把分數這個標準拿掉了。

不過我還是覺得有個分數感覺會比較爽，然後正巧也有人在 Pico CTF 的 DC 社群上講了差不多的想法，那麼，我就來做個插件吧~  
所以 Day1 的目標就從規劃進度 + 寫題目，鬼轉成了規劃進度 + 寫個生成 Pico CTF 分數的酷酷插件 XD

![在 Pico CTF 的 DC 社群上剛好遇到有人有一樣的想法](https://i.imgur.com/rQ3SSIF.png)

## 規劃

### 上課

Day2 ~ Day30 每三天看一部 Beef Soup 的影片，雖然這樣 30 天過去也不會全部看完，但也就算了，事情太多了 owo

### Pico CTF 刷題

- Day2 ~ Day9  
  每天 6 題 general skills
- Day10  
  3 題 general skills + 3 題 web (如果真的不會也找不到 writeup 可以用隨便一題 medium 代替)
- Day 11 ~ Day 19  
  每天 6 題 web (如果真的不會也找不到 writeup 可以用隨便一題 medium 代替)
- Day 20 ~ Day 30  
  每天 6 題 crypto (如果真的不會也找不到 writeup 可以用隨便一題 medium 代替)

## 寫酷酷插件

主要是寫個程式在 Practice 介面和 User Profile 介面顯示 picoGym 的分數，分數的算法就跟上面那個人講的一樣：

- Easy: 100 points
- Medium: 200 points
- Hard: 300 points

然後就是按照目前在哪一個頁面，去抓取對應的資料，並且算成分數，最後顯示在該頁面上。

成果如下：

![Practice 介面](https://github.com/moon-jam/picoCTF-Gen-Score-Extension/blob/main/assets/Practice.png?raw=true)

![User Profile 介面](https://github.com/moon-jam/picoCTF-Gen-Score-Extension/blob/main/assets/User.png?raw=true)

[這裡](https://github.com/moon-jam/picoCTF-Gen-Score-Extension) 是插件的 Github 連結，有興趣的話可以去看看～

然後很意外的是提交申請要上架，居然差不多一小時就好了，還以為要好幾天呢，可以在 [這裡](https://chromewebstore.google.com/detail/picoctf-gen-score-extensi/bejhdgeaaddmaipmfcmfdijgfjgjomjj) 安裝這個插件～
