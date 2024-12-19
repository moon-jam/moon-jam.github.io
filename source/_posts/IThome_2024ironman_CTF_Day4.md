---
title: IThome 2024 鐵人賽 一直刷 CTF - Day4
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 9929
date: 2024-09-07 00:00:00
lang:
---

## 前言

本日進度：

- [x] 6 題 general skills

<!--more-->

## Writeup

### 第一題：PW Crack 2

題目有把檢查密碼的程式給出來，那就直接叫輸入是他檢查的密碼，然後就可以得到 flag 了

把原本程式中的 `def level_2_pw_check()` 改成這樣：

```python
def level_2_pw_check():
    # user_pw = input("Please enter correct password for flag: ")
    if( user_pw := chr(0x64) + chr(0x65) + chr(0x37) + chr(0x36) ):
        print("Welcome back... your flag, user:")
        decryption = str_xor(flag_enc.decode(), user_pw)
        print(decryption)
        return
    print("That password is incorrect")
```

然後執行就會有答案摟~

![Image](https://i.imgur.com/CDSstUr.png)

### 第二題：PW Crack 1

好像不小心先做到第二題了 xd ，這題跟上一題一樣，就是把答案改成他想要的文字就好了，差異是上一題是用 ASCII 編碼，這邊是直接給字串，但對我來說都沒差，反正我都用海象 \owo/

```python
def level_1_pw_check():
    # user_pw = input("Please enter correct password for flag: ")
    if( user_pw := "1e1a"):
        print("Welcome back... your flag, user:")
        decryption = str_xor(flag_enc.decode(), user_pw)
        print(decryption)
        return
    print("That password is incorrect")
```

![Image](https://i.imgur.com/1JZ6vHI.png)

### 第三題：HashingJobApp

這題要使用 MD5 Hash，因為不知道他是甚麼所以我查了一下，大概是這樣子：

MD5 這個演算法他會將任意長度的數據映射為一個固定 128 位元的輸出，那他做的步驟如下：

1. Padding：將原始訊息的位元長度填充，直到滿足同餘 448 (mod 512)，填充的數字會是一個 1 後面接著 n 個 0，然後接著再用 64 位元的原始訊息長度
2. Initialize：定義四個 32 位元的變數：
   - `A = floor(2^32 * abs(sin(1))) = 0x67452301`
   - `B = floor(2^32 * abs(sin(2))) = 0xefcdab89`
   - `C = floor(2^32 * abs(sin(3))) = 0x98badcfe`
   - `D = floor(2^32 * abs(sin(4))) = 0x10325476`
  聽說這樣可以讓 MD5 的計算過程更加隨機，但好像有一些渾沌數學的東西，我不太懂之後會再回還看看
3. Process：接著將填充後的訊息每 512 位元分成一組，然後分別做四輪64次的操作，最後的結果就是 MD5 的 Hash 值，至於詳細內容可以看 [這裡](https://www.comparitech.com/blog/information-security/md5-algorithm-with-examples/)

因為想說可以用昨天剛學的 `pwn.remote` 來玩玩看，所以就寫了個程式：

```python
import hashlib
import pwn

io = pwn.remote("saturn.picoctf.net", 51742)

while True:
    try:
        io.recvuntil(b"quotes: '")
        input_string = io.recvline().decode()[:-3]
        md5_hex = hashlib.md5(input_string.encode()).hexdigest()
        print(f"{input_string} : {md5_hex}")

        io.sendline(md5_hex.encode())
    except:
        io.recvuntil(b"Correct.\r\n")
        flag = io.recv()
        print(flag.decode().strip())
        break

io.interactive()
```

![Image](https://i.imgur.com/vyS4NAL.png)

### 第四題：Glitch Cat

就簡單把它傳出來的字串和字元丟到 python 裡就是答案了

![Image](https://i.imgur.com/TW0yIzN.png)

### 第五題：fixme2.py

直接把判別是砍掉，就會直接輸出 flag 了

```python
if flag = "":
  print('String XOR encountered a problem, quitting.')
else:
  print('That is correct! Here\'s your flag: ' + flag)
```

變成

```python
print('That is correct! Here\'s your flag: ' + flag)
```

![Image](https://i.imgur.com/eRSagUP.png)

### 第六題：fixme1.py

又不小心先寫了第二題，這題更簡單，就把錯誤的縮排改正就好了

```python
  print('That is correct! Here\'s your flag: ' + flag)
```

變成

```python
print('That is correct! Here\'s your flag: ' + flag)
```

![Image](https://i.imgur.com/kLshQi5.png)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
