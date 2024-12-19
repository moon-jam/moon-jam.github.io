---
title: IThome 2024 鐵人賽 一直刷 CTF - Day17
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 53412
date: 2024-09-20 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】WEB 2 - 完](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

<!--more-->

## 上課紀錄

### Injection (駭客的填字遊戲)

![Image](https://i.imgur.com/y5iWGg3.png)

把所有車牌都刪掉了 xddd

![Image](https://i.imgur.com/WIwk4gl.png)

[讚讚的影片說明](https://youtu.be/WWJTsKaJT_g?si=Q3cZWVAqUkfB6Cvg)

這次會提到的

![Image](https://i.imgur.com/3WVKgr6.png)

#### Code Injection

以 python eval 舉例

![Image](https://i.imgur.com/logfdq8.png)

其他常見的危險函式

![Image](https://i.imgur.com/sJZbGSw.png)

如何預防?

可以看看 [這個](https://github.com/odoo/odoo/blob/17.0/odoo/tools/safe_eval.py)

Code Injection 常常會出現在 IOT 設備 (像是監視器、TX link 之類的)

#### Command Injection

![Image](https://i.imgur.com/fizUAJk.png)

指令就會變成 `dig vincent55.tw; id`

基本技巧 `;` `|` `&&` `||`

![Image](https://i.imgur.com/ggJZvGk.png)

command substitution

![Image](https://i.imgur.com/mCveGNN.png)

如果空白被過濾了 - 用 `${IFS}` / `<`

![Image](https://i.imgur.com/MCQKUP0.png)

如果有一些 keyword 被過濾了

![Image](https://i.imgur.com/69MmYeJ.png)

### Lab - dig

這題她有提供原始碼，可以知道背後的執行邏輯是 `<pre><?= system("dig '" . $_POST['name'] . "';") ?></pre>` ，所以可以用 `';` 來截斷 `dig` 然後就能在後面輸入想要的指令了，先用 `ls` 找到 Flag 的位置，然後再印出來就是答案摟

![Image](https://i.imgur.com/t4QVkPM.png)

![Image](https://i.imgur.com/9p1z9dA.png)

### Lab - dig waf1

這題多檔了一些字 `blacklist = ['|', '&', ';', '>', '<', "\n", 'flag'];` ，可以用之前的 code substitution 來繞過

![Image](https://i.imgur.com/aWF3spJ.png)

### Lab - dig waf2

這題多檔了空白，用 `${IFS}` 就能通過了

![Image](https://i.imgur.com/Boo8ori.png)

### Reverse shell

Normal shell: ssh

![Image](https://i.imgur.com/c5gRgjw.png)

Reverse shell 就是改成從 server 主動連線到 client

![Image](https://i.imgur.com/2MRqmS8.png)

![Image](https://i.imgur.com/rzza9V9.png)

[這邊](https://www.revshells.com/) 有各種不同的 reverse shell

[ngrok](https://ngrok.com/download) 可以用來反向代理，這樣如果連成大網路就不會被擋一些東西了

### SQL Injection

簡介

![Image](https://i.imgur.com/jCbLoYT.png)

![Image](https://i.imgur.com/diIYRxW.png)

![Image](https://i.imgur.com/W0VqYqh.png)

`SELECT title, subtitle, context FROM articles;`
這邊是要找出 title, subtitle, context 這三個欄位的資料

![Image](https://i.imgur.com/Eo7UdZC.png)

`SELECT * FROM articles;`
找出所有欄位的資料

![Image](https://i.imgur.com/haP21Dv.png)

`SELECT * FROM articles WHERE id = 2;`
找出 id 為 2 的資料

![Image](https://i.imgur.com/PZOX4J1.png)

這邊就有點像是前面 command injection 一樣，可以讓他做一些壞壞的事情

`SELECT * FROM articles WHERE id = 3; DROP TABLE articles;`

![Image](https://i.imgur.com/PSaEbhN.png)

另外如果是在處理登入的資料庫是用 `SELECT * FROM user='' AND pass=` 來做判斷帳密是否正確，那就有可能發生下面一張的問題

![Image](https://i.imgur.com/ddMisBO.png)

藉由 `'` 截斷 和 `--` 註解的方式，可以讓他不管密碼是什麼的狀況下登入

![Image](https://i.imgur.com/3MtXInv.png)

分類

- Stacked: 用分號隔開各種語句
- Union Based: 用 UNION 來將兩個語句合在一起
- Blind Based: 當目標不會告訴你 result 的時候
  - Time Based: 透過 sleep 來判斷條件
  - Boolean Based: 透過布林結果來判斷條件
- Error Based: 透過錯誤訊息來取得資料
- Out of Band: 讀檔、寫檔...

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
