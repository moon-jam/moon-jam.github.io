---
title: IThome 2024 鐵人賽 一直刷 CTF - Day27
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 8356
date: 2024-09-30 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】Crypto 1 - 古典密碼學](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

<!--more-->

## Crypto 1

[棒棒的練習資源](https://cryptohack.org/)

- 編碼
- 古典密碼
- 穿插「ㄧ」點數學
- 流加密
- 對稱式加密

### 先裝套件

```shell
pip install pycryptodome
```

### 什麼是編碼

> 「編碼器（英語：Encoder）是一種將資訊由一種特定格式轉換為其他特定格式的感測器、軟體或是演算法，轉換的目的可能是由於標準化、速度、保密性、保安或是為了壓縮資料。」——維基百科

![Image](https://i.imgur.com/H9jeJa0.png)

![Image](https://i.imgur.com/ZDIXlGI.png)

![Image](https://i.imgur.com/OFKzyLQ.png)

#### 常見文字編碼

- ASCI
  - 用一個 byte 來表示字母、數字、符號，是針對英文設計的，Unicode的最初128個字符與ASCII完全相同 (因為只有了 128 種可能，所以最左邊的 bit 永遠是 0)
- UTF-8
  - 用 1~4 bytes 來表示一個字符，也包含了 ASCII 的字符，因為 ASCII 的字符只用 1 byte 表示，所以 UTF-8 能完全兼容原先是 ASCII 編碼的文件
  - 容納了各國語言，算是 Unicode 的一種實現方式
- HEX (16 進位)
- Base64
  - 用 64 個字符來表示二進位數據，常用於在 URL、Cookie、網頁中傳輸少量二進位數據，常見編碼結果會有 =, ==

#### Lab - Complex Encoder

要先用 Base64 解碼，再用 HEX 解碼

![Image](https://i.imgur.com/DDWsPyn.png)

#### Lab - F**k Encoder

用 BrainFuck 和 JSFuck 都試試看，然後發現用 [JSFuck](https://enkhee-osiris.github.io/Decoder-JSFuck/) 解密 Flag 就出來了

### 古典密碼學

#### 加解密的用途

![Image](https://i.imgur.com/0spEvIQ.png)

即便被攔截如果加解密夠好，也能確保密文不被破譯

#### 常見的加解密

- 凱薩密碼
  - ROT13
  - 曹操密碼
- 簡易替換密碼
  - ![Image](https://i.imgur.com/WHjuU9j.png)
  - 解密方式：頻率分析
  - ![Image](https://i.imgur.com/MjPl9kx.png)
- 維吉尼亞密碼（Vigenere）
  - ![Image](https://i.imgur.com/cxikvpz.png)
  - ![Image](https://i.imgur.com/sbkAIfj.png)
  - 用密鑰長度切分，每一段相同位置的偏移量會相同 (例如上圖的CSASTPK的 K 和 CSASTPI 的 I 同樣都是向右偏移兩格) ，這樣就能分別對相同位置的字幕做頻率分析
- 波雷費密碼 (Playfair)
  - ![Image](https://i.imgur.com/I15FDJ3.png)
- 柵欄密碼 (Rail fence)
  - ![Image](https://i.imgur.com/NwrUS0z.png)
  - 密鑰是有幾個 `_`

#### Lab - vigenere cipher

[線上解密工具](https://www.mygeocachingprofile.com/codebreaker.vigenerecipher.aspx)

然後找了一下就發現了一個看起來像正確 flag 的字串

![Image](https://i.imgur.com/BK3rebA.png)

#### Lab - secure substitution

[線上解密工具](secure substitution)

丟上去跑出來的第一個就是 Flag 了

![Image](https://i.imgur.com/beCSHYP.png)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)