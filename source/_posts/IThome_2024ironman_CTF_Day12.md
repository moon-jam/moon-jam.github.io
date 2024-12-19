---
title: IThome 2024 鐵人賽 一直刷 CTF - Day12
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 54116
date: 2024-09-15 00:00:00
lang:
---

## 前言

本日進度：

- [x] 6 題 web

<!--more-->

## Writeup

### 第一題：Insp3ct0r

就檢查了之後去看 HTML / CSS / JS 就可以看到 Flag 了

![Image](https://i.imgur.com/k9RJlGr.png)

![Image](https://i.imgur.com/wJffCI5.png)

![Image](https://i.imgur.com/xkbMeoV.png)

### 第二題：where are the robots

![Image](https://i.imgur.com/nkhmhQ3.png)

![Image](https://i.imgur.com/TBNwSwt.png)

### 第三題：IntroToBurp

不知道怎麼做於是偷看了一下 Hint ，他說要去 "mangling the request" ，所以我就一個個試試看把什麼用掉會成功，最後發現是修改發送 OTP Request，將 `otp=` 改成其他的名稱就可以了 (例如說 `blabla=`)

![Image](https://i.imgur.com/1UoXskU.png)

![Image](https://i.imgur.com/4SKGuFY.png)

![Image](https://i.imgur.com/xXrBmGT.png)

### 第四題：GET aHEAD

測試了一下 `choose red` 和 `choose blue` ，發現兩個分別是做 `GET` 和 `POST` 請求，看到題目說 GET aHEAD ，所以我就猜測是要用 `HEAD` 請求，然後就成功了

![Image](https://i.imgur.com/YL5YuTt.png)

### 第五題：Trickster

Web 也進入 Medium 了，這題看起來就很像之前上 [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z) 的練習題，先試著用同樣的方法把 `<?php system($_GET['cmd']);?>` 放到上傳的檔案裡面去 (因為是上傳一張 png 的圖片然後再去改 request 所以我只要保留第一行的 PNG 不變，Magic Number 就會對應到)

![Image](https://i.imgur.com/8Yri1Io.png)

但傳完了之後不知道要去哪裡使用檔案，於是我到 `/robots.txt` 看看哪些是被隱藏的，發現有兩個路徑 `/instructions.txt` 和 `/upload` 我就一一連進去看了

![Image](https://i.imgur.com/6ZlDJOK.png)

在 `\instructions.txt` 講了一些上傳檔案的規定，不過很剛好的我都有做到了

![Image](https://i.imgur.com/HGjRYBM.png)

`/upload` 進去之後發現他說 Forbidden ，沒有權限瀏覽資源，所以感覺很可能我們上傳的檔案就是存在這個路徑底下，所以我馬上試試看 `/test.png.php?cmd=id`

![Image](https://i.imgur.com/aCX3Tno.png)

成功得到 shell 了～ 但是找不到 Flag 所以我用了 `find / -name ".txt"` 找找線索，試了幾個之後就找到 Flag 了

![Image](https://i.imgur.com/GNyxRWU.png)

![Image](https://i.imgur.com/A0fafL4.png)

![Image](https://i.imgur.com/tcInORo.png)

### 第六題：SQLiLite

直接試 `'OR 1=1 --` 就進去了，然後在 HTML 內就有 Flag 了

![Image](https://i.imgur.com/5sMkH90.png)

![Image](https://i.imgur.com/m6Ttwyb.png)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
