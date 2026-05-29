---
title: IThome 2024 鐵人賽 一直刷 CTF - Day11
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 53796
date: 2024-09-14 00:00:00
lang:
---

## 前言

本日進度：

- [x] 6 題 web

<!--more-->

## 前言

## Writeup

### 第一題：Local Authority

先隨便登登看

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_ekmTXPy.webp)

然後看一下原始碼，發現他的檢查方式是直接明文比對，所以我就可以獲得他真實的帳號密碼

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_1Whe0L9.webp)

用帳號密碼登入後就可以拿到 Flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_2vMGHcS.webp)

### 第二題：Inspect HTML

就真的只要檢查一下原始碼就可以看到 Flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_07JZ58R.webp)

### 第三題：Includes

一樣用檢查，然後看 `style.css` 和 `script.js` 把兩個的註解和再一起就是 Flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_1YNT1ac.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_8WGuwKo.webp)

### 第四題：Scavenger Hunt

先從 HTML 裡面找到第一個部分

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_T8Sx8y0.webp)

接下來在 CSS 看到第二部分

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_wuyUgfQ.webp)

JS 中提示說如何避免 Google index，所以就去看 `robots.txt`

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_E2NoVpf.webp)

到了 `/robots.txt` 得到第三部分，並提示說他是用 Apache 的 server，應該要如何 `Access` 經過一番查找了解到了好像有個 `/.htaccess` 是用來設定權限的，所以就去看看

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_1XMKIF2.webp)

在 `/.htaccess` 果真找到了第四部分，並提到他使用 Mac 做網站，而且還 Store 很多資料，看到這邊身為 Mac 使用者的我馬上就知道他指的應該就是 `.DS_Store` 了，所以就去看看

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_mRDF04J.webp)

Bingo~ 到 `/.DS_Store` 就看到最終的 Flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_X41dhl8.webp)

### 第五題：dont-use-client-side

用檢查之後發現裡面有一個內嵌的 JS 一樣是用明文比對密碼，只是拆成好幾段，按順序拼回去之後就是答案了～

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_QSX0KEs.webp)

### 第六題：logon

隨便登入試試看，看看 Cookie 發現有個 `admin` 的欄位，所以就把他改成 `True` 然後重新整理就可以看到 Flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_PmH2dhp.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day11_BrJ1KTU.webp)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
