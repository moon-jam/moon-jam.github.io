---
title: IThome 2024 鐵人賽 一直刷 CTF - Day15
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 9481
date: 
lang:
---

## 前言

本日進度：

- [x] 3 題 web + 3 題 crypto
- [ ]

<!--more-->

## Writeup

### 第一題：Search source

查了一下發現，可以用 `wget -mkEpnp http://example.org` 的指令把一整個網頁 mirror 下來，之後再用 `grep` 看有沒有 `picoctf` 字樣就得到 Flag 了

![Image](https://i.imgur.com/4WHKu5s.png)

### 第二題：Some Assembly Required 1

這題本來在看懂他程式碼理解了好久，結果後來隨便點點居然不小心就打開它 Assembly 的檔案就得到 Flag 了 owo

![Image](https://i.imgur.com/0kPmVTB.png)

後來看別人的 writeup 是要把 `./JIFxzHyW8W` 載下來，然後逆向，但這樣得到的好像就是跟我一樣的東西而已 xdddd

### 第三題：Some Assembly Required 2

學上一題一樣，點開來之後滑到最下面就好像看到 Flag 了 ... 嗎？

![Image](https://i.imgur.com/Baig43l.png)

喔不他好像被加密過了，但我又看不懂他的 WebAssembly ，試了一段時間之後沒忍住直接跑去看別人 writeup 了😢 ，這題應該是要把它的 wasm 反編譯之後去看裡面的邏輯，就會發現他是把內容跟 8 做 XOR 的結果

![Image](https://i.imgur.com/5DSOR3Y.png)

(我是學 [這篇](https://ithelp.ithome.com.tw/articles/10285195))

### 第四題：interencdec

因為前一個禮拜有點忙都沒有上課，都只有寫題目，Web 能寫的都快寫完了，先寫一些簡單的 crypto 題目，剩的時間趕快趕課，不然都只是在熟練舊有的東西而已

把它提供的檔案載下來，然後做兩次 base64 解碼，再用凱薩解密就可以得到 Flag 了

![Image](https://i.imgur.com/Gu1YxhG.png)

![Image](https://i.imgur.com/FVv0vbz.png)

### 第五題：Mod 26

這題更簡單，他說適用 rot13 ，所以就能剛剛的凱薩解密改成偏移量 13 就能得到結果了

![Image](https://i.imgur.com/Gzfhzmz.png)

### 第六題：

我們得到一張圖片

![Image](https://i.imgur.com/HsvYbv5.png)

用 mac 內建的 OCR 可以得到以下字串

`16 9 3 15 3 20 6 { 20 8 5 14 21 13 2 5 18 19 13 1 19 15 14 }`

感覺數字就是代表第幾個字母，簡單整理一下就能得到 Flag 了

![Image](https://i.imgur.com/T3LbWAj.png)

## 上課紀錄

## 小小心得
