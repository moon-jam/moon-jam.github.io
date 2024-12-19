---
title: IThome 2024 鐵人賽 一直刷 CTF - Day21
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 8740
date: 2024-09-24 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】不是web3.0的 web3 - 到 SSRF](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)

<!--more-->

## 上課紀錄

### NoSQL Injection

NoSQL = Not Only SQL

比較一下

![Image](https://i.imgur.com/ZYsqw9q.png)

NoSQL 的特點: 不用提前定義 schema ，結構較靈活 ，更多的優點可以看 [這裡](https://www.mongodb.com/nosql-explained/nosql-vs-sql)

名詞上的定義比較

![Image](https://i.imgur.com/Dsv7wI0.png)

範例

![Image](https://i.imgur.com/E6kil0x.png)

![Image](https://i.imgur.com/gTaY5Yx.png)

No SQL Injection 的精隨

![Image](https://i.imgur.com/1ajBcvD.png)

像是利用 `$ne` 表示不相等，因為 `xxx` 跟真正的密碼不一樣，所以就會通關

![Image](https://i.imgur.com/xpYY8Bx.png)

如果只回傳結果，不把細節跟你講，這樣就算成功登入，也不能知道真正的密碼

![Image](https://i.imgur.com/jhFMvgw.png)

可以用 regular expression 來迭代嘗試出結果，就跟我上次寫的 `dig blind` 道理一樣

![Image](https://i.imgur.com/Lsb4yzt.png)

### Lab - no-sql-injection

Lab 伺服器好像掛了 qaq ，之後再試

### Lab - no-sql-injection-blind

好像也掛了 qaq ，之後再試

### SSRF (Server-Side Request Forgery)

- 伺服器端請求偽造 (Server-Side Request Forgery)
- 繞過防火牆，存取內網設備
- 多數資料庫、 mail server 等機敏設備會選擇架在內網

#### 先回看 url 的定義 rfc3986

![Image](https://i.imgur.com/ljodqkf.png)

![Image](https://i.imgur.com/0KUwmy1.png)

對於 scheme 的利用

1. 本地
  ![Image](https://i.imgur.com/rEcHVqA.png)
2. php 偽協議
  ![Image](https://i.imgur.com/9K9Ymzg.png)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
