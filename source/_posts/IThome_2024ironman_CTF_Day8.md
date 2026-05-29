---
title: IThome 2024 鐵人賽 一直刷 CTF - Day8
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 9161
date: 2024-09-11 00:00:00
lang:
---

## 前言

本日進度：

- [x] 6 題 general skills

<!--more-->

## Writeup

### 第一題：ASCII Numbers

這題就是要把 ASCII 碼轉換成文字，我寫了個簡單的程式

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_PTb4aes.webp)

### 第二題：useless

利用 ssh 連線進去，然後執行裡面的 `useless` 檔案，他說要先看 code ，然後看到底下說要 `Read the manual` ，所以就執行 `man useless` ，然後就看到 flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_0sfszmB.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_W1Xl4d4.webp)

### 第三題：Specialer

試了一些指令，按兩次 tab 就可以有哪些指令可以用，然後接著用 `cd` 和 `tab` 測試各個資料夾，然後用 `echo` 的方式把內容輸出，最後就找到 `~/ala/kazam.txt` 印出來是 flag

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_Q1TK2yD.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_CJSa1RC.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_MLyEoA6.webp)

### 第四題：Special

發現他好像只會把把前面幾個字變很奇怪而已，像是這樣 `aaaaaaaa;ls` 後面的 `ls` 就能正常執行，所以用類似 `aaaaaaaaa;ls` 的方式就可以執行了，然後看到底下有個資料夾叫做 `blargh` ，所以我試著 `cd` 過去，但似乎他程式還會自動把 `blargh` 變成 `large`，不過在後面接上 `/` 或是 `;` 就又可以了 ，結果他好像每次執行完程式就會自己回到 `~` ，所以要用 `cd blargh/;ls` 的方式，就看到 flag.txt，最後就用 `cd blargh/;cat flag.txt` 就看到 flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_7ECP8A3.webp)

### 第五題：Permissions

因為進不去 `\root\` ，試著用 `sudo` 看看，還是不行，用 `sudo -l` 看有哪些指令可以用，發現可以用 `vi` 是可以用的，所以我就直接 `sudo vi /root` ，可以瀏覽裡面檔案，就找到 flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_x26pqe0.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_CcFZAcf.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_ktiKt5W.webp)

### 第六題：chrono

我拿題目問了一下 ChatGPT

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_9QxhQD3.webp)

但我發現他上面沒有任何編輯器，所以我就手動把他 cat 出來，就是 flag 摟~

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day8_kPORmwP.webp)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
