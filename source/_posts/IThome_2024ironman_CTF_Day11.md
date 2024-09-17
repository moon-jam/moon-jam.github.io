---
title: IThome 2024 鐵人賽 一直刷 CTF - Day11
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

- [x] 6 題 web
- [ ] 

<!--more-->

## Writeup

### 第一題：Local Authority

先隨便登登看

![Image](https://i.imgur.com/ekmTXPy.png)

然後看一下原始碼，發現他的檢查方式是直接明文比對，所以我就可以獲得他真實的帳號密碼

![Image](https://i.imgur.com/1Whe0L9.png)

用帳號密碼登入後就可以拿到 Flag 了

![Image](https://i.imgur.com/2vMGHcS.png)

### 第二題：Inspect HTML

就真的只要檢查一下原始碼就可以看到 Flag 了

![Image](https://i.imgur.com/07JZ58R.png)

### 第三題：Includes

一樣用檢查，然後看 `style.css` 和 `script.js` 把兩個的註解和再一起就是 Flag 了

![Image](https://i.imgur.com/1YNT1ac.png)

![Image](https://i.imgur.com/8WGuwKo.png)

### 第四題：Scavenger Hunt

先從 HTML 裡面找到第一個部分

![Image](https://i.imgur.com/T8Sx8y0.png)

接下來在 CSS 看到第二部分

![Image](https://i.imgur.com/wuyUgfQ.png)

JS 中提示說如何避免 Google index，所以就去看 `robots.txt`

![Image](https://i.imgur.com/E2NoVpf.png)

到了 `/robots.txt` 得到第三部分，並提示說他是用 Apache 的 server，應該要如何 `Access` 經過一番查找了解到了好像有個 `/.htaccess` 是用來設定權限的，所以就去看看

![Image](https://i.imgur.com/1XMKIF2.png)

在 `/.htaccess` 果真找到了第四部分，並提到他使用 Mac 做網站，而且還 Store 很多資料，看到這邊身為 Mac 使用者的我馬上就知道他指的應該就是 `.DS_Store` 了，所以就去看看

![Image](https://i.imgur.com/mRDF04J.png)

Bingo~ 到 `/.DS_Store` 就看到最終的 Flag 了

![Image](https://i.imgur.com/X41dhl8.png)

### 第五題：dont-use-client-side

用檢查之後發現裡面有一個內嵌的 JS 一樣是用明文比對密碼，只是拆成好幾段，按順序拼回去之後就是答案了～

![Image](https://i.imgur.com/QSX0KEs.png)

### 第六題：logon

隨便登入試試看，看看 Cookie 發現有個 `admin` 的欄位，所以就把他改成 `True` 然後重新整理就可以看到 Flag 了

![Image](https://i.imgur.com/PmH2dhp.png)

![Image](https://i.imgur.com/BrJ1KTU.png)

## 上課紀錄

