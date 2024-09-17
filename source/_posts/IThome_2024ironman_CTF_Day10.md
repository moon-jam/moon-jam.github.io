---
title: IThome 2024 鐵人賽 一直刷 CTF - Day10
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

- [x] 3 題 general skills + 3 題 web
- []

<!--more-->

## Writeup

### 第一題：plumbing

這題就用之前上課學到的技巧，使用 python 的 pwn 模組去跟遠端伺服器溝通，看看內容有沒有 Flag 格式的東西，如果有就傳回來。

```python
import pwn

io = pwn.remote("jupiter.challenges.picoctf.org", 14291)

while True:
    try:
        line = io.readline().decode()
        if "pico" in line:
            print(line)
    except:
        break
```

![Image](https://i.imgur.com/8pWbKZy.png)

### 第二題：Based

這題他給我們 45 秒的時間去解出他的問題，看起來應該是可以人工處理的，經過一次次的嘗試我知道了他有三個問題，第一題是要把二進制的數字用 ASCII 轉換成文字，第二題是要把八進制轉成文字，最後一題是要把用 hex 表示的 ASCII decode 出來，為此我個別準備了一行程式，方便快速運算，如下：

```python
print("".join(chr(int(i, 2)) for i in "".split(" ")))
print("".join(chr(int(i, 8)) for i in "".split(" ")))
bytes.fromhex("").decode()
```

最後就拼手速就可以解出這題了

![Image](https://i.imgur.com/A9bAlsA.png)

### 第三題：mus1c

拿之前用過的線上 rockstar 編譯器去編譯這段程式碼，就可以得到一串編碼 `114 114 114 111 99 107 110 114 110 48 49 49 51 114` ，然後用 ASCII 編碼轉成文字就是答案了

![Image](https://i.imgur.com/oqH3IXi.png)

```python
print("".join(chr(int(i)) for i in "114 114 114 111 99 107 110 114 110 48 49 49 51 114".split(" ")))
```

耶～ General Skill 都解完了

### 第四題：WebDecode

到他給的頁面裡面亂點然後開檢查，發現裡面有一個神奇的亂碼，拿去用 base64 decode 看看，就是 Flag 了

![Image](https://i.imgur.com/JLyvUz7.png)

### 第五題：Unminify

點進網站裡，然後把裡面的 HTML 點開來看就能找到了 Flag 了

![Image](https://i.imgur.com/EjgX1yg.png)

### 第六題：Bookmarklet

把它提供的 JS 放到 Console 裡面執行就會跳 Flag 的 alert 了

![Image](https://i.imgur.com/UzQ6HhE.png)

## 上課紀錄
