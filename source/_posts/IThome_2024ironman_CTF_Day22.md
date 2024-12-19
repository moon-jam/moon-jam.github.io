---
title: IThome 2024 鐵人賽 一直刷 CTF - Day22
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 9060
date: 2024-09-25 00:00:00
lang:
---

## 前言

本日進度：

- [x] 7 題 web

<!--more-->

## Writeup

### 第一題：SQL Direct

![Image](https://i.imgur.com/gdwtG9F.png)

查了一下知道可以用 \d 先看看 table 的 schema，最後再用 `select * from flags;` 看看 table 的內容

![Image](https://i.imgur.com/hG7qOvE.png)

### 第二題：Irish-Name-Repo 1

簡單的 SQL Injection，用 `' OR 1=1; # --` 輸入就可以了

![Image](https://i.imgur.com/lXfbGfJ.png)

### 第三題：Irish-Name-Repo 2

這題好像是會把 `OR` 過濾掉，所以試了一下之後只要用 `admin'; -- #` 就可以了

![Image](https://i.imgur.com/uCvR9VP.png)

### 第四題：Irish-Name-Repo 3

這題只有 password 可以輸入，試試看 `' OR 1=1; -- #` 發現不行，想不到其他方法就開個 Burp Suite 看一下，發現他後面會自帶一個 `&debug=0` ，試試看改成 1 ，會發現他把 SQL query 顯示出來了

![Image](https://i.imgur.com/snbplhQ.png)

我發現他把 `OR` 變成 `BE` 了，似乎是 `rot13` ，所以我把 `OR` 改成 `BE` ，就成功得到 flag 了

![Image](https://i.imgur.com/FTfHNas.png)

### 第五題：Web Gauntlet

#### round 1

filter: `or`
payload: `admin'; -- #`

#### round 2

filter: `or`, `and`, `like`, `=`, `--`
payload: `admin'; #`

#### round 3

filter: `or`, `and`, `=`, `like`, `>`, `<`, `--`

但試了好久才她好像還擋了空白 OwO

payload: `admin';#`

#### round 4

filter: `or`, `and`, `=`, `like`, `>`, `<`, `--`, `admin`

查了一下發現 `||` 可以把兩個字串連接起來，所以把 `admin'` 改成 `ad'||'min'` 就可以了

payload: `ad'||'min';#`

#### round 5

filter: `or`, `and`, `=`, `like`, `>`, `<`, `--`, `union`, `admin`

payload: `ad'||'min';#`

然後到 filter.php 就可以看到 flag 了

![Image](https://i.imgur.com/Z5RkA1w.png)

### 第六題：Web Gauntlet 2

filter: `or and true false union like = > < ; -- /* */ admin`

試了才發現好像 `#` 根本沒有起到註解的用途，前面好像是放辛酸的，只好修改 password 使得 query 成立，所以就把 password 設為 `a' is not 'b` 就可以了

payload: username `ad'||'min`, password `a' is not 'b`

![Image](https://i.imgur.com/dZC96h4.png)

### 第七題：Web Gauntlet 3

這題好像跟上一題一模一樣? 就把上提的 payload 照抄就過了

![Image](https://i.imgur.com/OvTrgIg.png)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
