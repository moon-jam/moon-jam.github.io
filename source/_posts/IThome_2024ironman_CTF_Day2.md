---
title: IThome 2024 鐵人賽 一直刷 CTF - Day2
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 9481
date: 2024-09-05
lang:
---

## 前言

本日進度：

- [x] 6 題 general skills
- [x] 第一堂課比較簡單就拆兩次看就好，[【成大資安社社課】手把手Python教學 --- 從入門到入侵 - 看完 Requests](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z&t=3734)

<!--more-->

## Writeup

### 第一題：Binary Search

用 ssh 連線，然後開始手動二分搜，找到 flag

![Image](https://i.imgur.com/bC5iLEw.png)

### 第二題：Time Machine

先把檔案載下來，然後解壓縮之後發現裡面有個 txt 檔和 .git 資料夾，txt 檔的訊息講說要去看他的 commit history，所以就用 git log 看了一下，就直接看到 flag 了

![Image](https://i.imgur.com/2HLHWWP.png)

![Image](https://i.imgur.com/d8vSTzl.png)

### 第三題：Super SSH

按照指示登入，然後就看到 flag 了

![Image](https://i.imgur.com/MKDketq.png)

### 第四題：endianness

用 Netcat 連線，然後按照指示將字串轉換成 big endian 和 little endian，就得到 flag 了

得到的 word: ofbay

| char | hex |
| ---- | --- |
| o    | 6f  |
| f    | 66  |
| b    | 62  |
| a    | 61  |
| y    | 79  |

big endian: 6f66626179
little endian: 796162666f

![Image](https://i.imgur.com/1ekTaMf.png)

### 第五題：Commitment Issues

先看看 message.txt ，他說 TOP SECRET，然後裡面也有 .git 資料夾，所以用 git log 看了一下，發現之前有一筆 commit message 寫 `remove sensitive info` 所以就 checkout 到那個 commit，然後再印出一次 message.txt 看到 flag 了

![Image](https://i.imgur.com/NONd3sY.png)

![Image](https://i.imgur.com/UEfthQB.png)

![Image](https://i.imgur.com/R3j5L4w.png)

### 第六題：Collaborative Development

一樣有 .git 資料夾，所以就用 git log 看了一下，發現只有一筆，再回去看了一下題目說他是多人寫作的，所以看了以下有沒有其他 branch，果然，有其他另外三個，接著就把裡面的 flag.py 都拿出來看看就有答案了，然後拚在一起就是 flag 了
![Image](https://i.imgur.com/LQluxR3.png)

![Image](https://i.imgur.com/94GfmiG.png)

![Image](https://i.imgur.com/3glt7JH.png)

![Image](https://i.imgur.com/dwTsHm3.png)

## 上課紀錄

### 基本語法

- `hex`
- `bin`
- `ord`
- `chr`
- `base64.b64encode`
- `+`, `-`, `*`, `/`, `%`, `**`, `pow`
- `print`
- `NUM`, `STR`, `FLOAT`, `LIST`, `TUPLE`, `SET`, `DICT`, `BOOL`
- `if`, `elif`, `else`
- `while`, `for`
- `try...except...else...finally`
- `eval`:　會將輸入的 String 自動轉換成適當的型態，所以如果是 python 指令，就會發生可怕的事情 owo (MyFirstCTF 的 Evil Calculator)

### Lab 1 - 星星樹

我也要寫一行解~ 基本上跟 Vincent 寫的一樣，但我把海象用在三元運算子上就能成功了，就沒用 lambda 了

```python
print("\n".join(" " * (a - i) + "*" * (i * 2 - 1) for i in range(1, a + 1)) + "\n" + " " * (a - 1) + "|") if (a := int(input())) else None
```

### Lab 2 - caesar

繼續一行解 lol

```python
print("".join(chr((ord(i)-ord("o")+ord("b")-97+26)%26+97) if i.isalpha() else i for i in "o33s{cl7u0a_10ir_7nxvat_on7u5}"))
```

### Requests

包含的方法
![Image](https://i.imgur.com/Jg4eiEN.png)

講了 `get` 和 `post` 的方法，然後就結束了~

## 又修了一點插件

在寫的時候發現有一點小 bug:

1. 在 Practice 頁面的時候如果是有翻頁或是有點選指定哪個類別時分數不會顯示，因為在 `https://play.picoctf.org/practice` 後面還會加上 `?category=5&page=1` 之類的文字，但我程式在寫的時候就只有判斷到 `https://play.picoctf.org/practice`，所以就改成有包含到 `https://play.picoctf.org/practice` 這個字串就去抓分數，就解決了~
2. 顯示的分數不會即時更新，也就是在我解完一個新的題目的時候分數還會是舊的，需要重新整理才會刷新，因為我程式在寫的時候是判斷如果分數已經生成就不再生成一次，所以就改成每次都去檢查有沒有生成過了，如果每有就生一個一個新的，如果沒有就去更新舊的分數，這樣就沒問題了~

## 小小心得

今天的題目好像有點太簡單，六題半小時不到就寫完了，寫 Writeup 的時間比解的時間還多xdd，希望之後也都能這麼順利 owo

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
