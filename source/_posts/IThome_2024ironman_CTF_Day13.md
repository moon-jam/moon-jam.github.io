---
title: IThome 2024 鐵人賽 一直刷 CTF - Day13
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

### 第一題：picobrowser

這題他提示我們說要用 `picobrowser` ，感覺就是要拿這個 User-Agent 來訪問，所以我就用 Burp Suite 來修改 User-Agent 變成 `picobrowser` 然後重新導向之後再修改一次 User-Agent 就可以看到 Flag 了

![Image](https://i.imgur.com/Ph7s6h3.png)

![Image](https://i.imgur.com/TaDeNKd.png)

![Image](https://i.imgur.com/U7BbJV8.png)

![Image](https://i.imgur.com/sLnXX1V.png)

### 第二題：Power Cookie

就把 Cookie 的 `isAdmin` 改成 `true` 就可以了

![Image](https://i.imgur.com/sr9ZQAI.png)

![Image](https://i.imgur.com/qHFDuj0.png)

![Image](https://i.imgur.com/ofdZtdn.png)

### 第三題：Forbidden Paths

題目這麼說的

> We know that the website files live in /usr/share/nginx/html/ and the flag is at /flag.txt but the website is filtering absolute file paths. Can you get past the filter to read the flag?

所以就用 `../../../../flag.txt` 來繞過過濾器就成功得到 Flag 了

![Image](https://i.imgur.com/45hjM9z.png)

![Image](https://i.imgur.com/4cS6bZK.png)

### 第四題：login

看一下他的 JS 

```javascript
(async () => {
    await new Promise((e => window.addEventListener("load", e))),
    document.querySelector("form").addEventListener("submit", (e => {
        e.preventDefault();
        const r = {
            u: "input[name=username]",
            p: "input[name=password]"
        }
          , t = {};
        for (const e in r)
            t[e] = btoa(document.querySelector(r[e]).value).replace(/=/g, "");
        return "YWRtaW4" !== t.u ? alert("Incorrect Username") : "cGljb0NURns1M3J2M3JfNTNydjNyXzUzcnYzcl81M3J2M3JfNTNydjNyfQ" !== t.p ? alert("Incorrect Password") : void alert(`Correct Password! Your flag is ${atob(t.p)}.`)
    }
    ))
}
)();
```

他會把帳號密碼都用 Base64 編碼過之後再比對，那基本上也跟明文差不多，直接把它比對的 Base64 解碼就可以了

![Image](https://i.imgur.com/MCAgkJP.png)

剛好密碼就是 Flag 可以直接交上去摟～

### 第五題：caas

他有提供 `index.js`

```javascript
const express = require('express');
const app = express();
const { exec } = require('child_process');

app.use(express.static('public'));

app.get('/cowsay/:message', (req, res) => {
  exec(`/usr/games/cowsay ${req.params.message}`, {timeout: 5000}, (error, stdout) => {
    if (error) return res.status(500).end();
    res.type('txt').send(stdout).end();
  });
});

app.listen(3000, () => {
  console.log('listening');
});
```

目標看起來應該是透過 `exec()` 來達到 RCE，因為要先截斷前一個指令，所以我先讓他輸出 panda ，然後在後面加上 `;ls` 就可以看到目錄了

![Image](https://i.imgur.com/DI9ojUp.png)

再把那個看起來很像 Flag 檔案印出來就是答案了

![Image](https://i.imgur.com/DWd0S1E.png)

### 第六題：MatchTheRegex

想說輸輸看他原始碼裡面寫的註解，結果就對了？？？

![Image](https://i.imgur.com/0Bw94jP.png)

![Image](https://i.imgur.com/ya3HMRq.png)

後來試了一下，發現他題目要的應該是輸入符合 `^p.....F` 的字串，所以不論是 `p.....F` 、 `paaaaaF` 或是 `picoCTF` 都可以通過

![Image](https://i.imgur.com/tYqA5oY.png)

## 上課紀錄
