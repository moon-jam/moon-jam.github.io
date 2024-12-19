---
title: IThome 2024 鐵人賽 一直刷 CTF - Day25
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 57637
date: 2024-09-28 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】淺談網路與 H T T P - 完](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [x]  2 題 Forensics

<!--more-->

## Writeup

### 第一題：Verify

把每一個檔案都拿去 decrypt 一次，然後看有沒有正確的 hash 可以得到 flag。

```shell
find ./files -type f -exec ./decrypt.sh {} \; 2>/dev/null | grep "picoCTF"
```

### 第二題：Scan Surprise

ssh 連進去之後會有個跳出一個 QR code，掃出來就是 flag 了

## 上課記錄

[【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

### 什麼是協定

![Image](https://i.imgur.com/RSNrYo5.png)

#### HTTP

> HTTP/2 之前的版本是一種建立在 TCP 上的傳輸協定。(HTTP/3 例外，今天不提)
> 為何需要使用 TCP 是因為網頁他會需要可靠性的傳輸。

![Image](https://i.imgur.com/ofobafe.png)

##### Request

![Image](https://i.imgur.com/sPrrISD.png)

路徑就是想要檔案的位置

##### Response

![Image](https://i.imgur.com/VRbe3Ws.png)

status code: 2開頭成功，3開頭重新導向，4開頭客戶端錯誤，5開頭伺服器錯誤

##### HTTP Lab

![Image](https://i.imgur.com/i7lPkRs.png)

![Image](https://i.imgur.com/P1HGD39.png)

[HTTP Method](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Methods)

#### DNS

> 全名叫做 Domain Name System，是一種建立在 UDP 的協定。
> 主要用來查詢 Domain Name 的 IP Address 或是查詢 IP Address 對應的 Domain Name。
> 那什麼是 Domain Name 呢？

![Image](https://i.imgur.com/P1axnwy.png)

![Image](https://i.imgur.com/63XpbUD.png)

##### DNS Lab

![Image](https://i.imgur.com/ezlp25H.png)

![Image](https://i.imgur.com/25rSqEN.png)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)