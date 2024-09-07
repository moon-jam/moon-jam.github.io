---
title: IThome 2024 鐵人賽 一直刷 CTF - Day3
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 9481
date: 2024-09-06
lang:
---

## 前言

本日進度：

- [x] 6 題 general skills
- [x] [【成大資安社社課】手把手Python教學 --- 從入門到入侵 - 看完](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

<!--more-->

## Writeup

### 第一題：Blame Game

去翻 `git log` ，發現最下面有個 Author 長的一副 flag 的格式，然後試一下就對了 噎

![Image](https://i.imgur.com/bLf5Uxx.png)

### 第二題：binhexa

就用 `nc` 連上之後依序回答問題就可以得到 flag 了

![Image](https://i.imgur.com/Rys3dlp.png)

### 第三題：repetitions

把載下來的東西印出來看起來就是 base64 過的東西，但解過一次之後還是亂的，看起來又是個 base64，所以就再解，因為覺得這樣太累了，所以就寫了個 python 去解，然後就得到 flag 了~

```python
import base64

text = '''VmpGU1EyRXlUWGxTYmxKVVYwZFNWbGxyV21GV1JteDBUbFpPYWxKdFVsaFpWVlUxWVZaS1ZWWnVh
RmRXZWtab1dWWmtSMk5yTlZWWApiVVpUVm10d1VWZFdVa2RpYlZaWFZtNVdVZ3BpU0VKeldWUkNk
MlZXVlhoWGJYQk9VbFJXU0ZkcVRuTldaM0JZVWpGS2VWWkdaSGRXCk1sWnpWV3hhVm1KRk5XOVVW
VkpEVGxaYVdFMVhSbFZrTTBKVVZXcE9VazFXV2toT1dHUllDbUY2UWpSWk1GWlhWa2RHZEdWRlZs
aGkKYlRrelZERldUMkpzUWxWTlJYTkxDZz09Cg=='''

while True:
    print(text)
    text = base64.b64decode(text).decode('utf-8').replace('\n', '')
```

![Image](https://i.imgur.com/iwmPJio.png)

### 第四題：Big Zip

解壓縮他給的檔案後，資料夾中裡面有超多的檔案，所以就用 `grep` 來配對 `picoCTF{.*}` ，然後就找到 flag 了~

![Image](https://i.imgur.com/LpwfNPh.png)

### 第五題：First Find

使用 `find` 指令，找到名為 `uber-secret.txt` 的檔案，印出來就是 flag 了

![Image](https://i.imgur.com/FRPy5SW.png)

### 第六題：runme.py

有點太簡單，就是直接 Run 就印出來了 \owo/

![Image](https://i.imgur.com/d9SZoSi.png)

## 上課紀錄

### Lab 3 - cookies

發現輸入 `snickerdoodle` 會出現 `That is cookie! Not very special though...`，並且這時去查看 cookie 會發現有一個 `name` 的索引為 `0` ，但是在一般的時候 `name` 是 `-1` ，然後如果改成 `1, 2, 3...` 會有不同回應，所以就寫一個程式去窮舉看看，就像下面那樣，最後就發現在 `name` 為 `18` 的時候會出現 flag

![Image](https://i.imgur.com/zzWrw9u.png)

```python
import requests
import threading

url = 'http://mercury.picoctf.net:54219/check'

cookie = {"name": "1"}

def try_cookie(i):
    cookie["name"] = str(i)
    r = requests.get(url, cookies=cookie, allow_redirects=False)
    # print("trying:" + str(i), r.status_code)
    if r.status_code == 200 and "picoCTF" in r.text:
        print("trying:" + str(i), r.text)
        print(r.text)

for i in range(1000):
    threading.Thread(target=try_cookie, args=(i,)).start()
```

![Image](https://i.imgur.com/bS09EXR.png)

### pwntools

pwn : 就是去找 Binary 檔的漏洞

基本語法

- Interaction
  - `io = pwn.process("cmd.exe")` : 跟一個程序互動 (這裡是 cmd.exe)
  - `io = pwn.remote("host", port)` : 跟遠端主機互動
  - `io.interactive()` : 進入互動模式
  - `io` 這個物件創出來之後，後面就都是用 `io` 來與 `程序` 或是 `遠端主機` 互動
- Send
  - `io.send("whoami\n")` : 送出指令
  - `io.sendline("whoami")` : 送出指令並且加上換行
- Recv
  - `io.recv(1024, timeout=1)` : 接收回傳，第一個參數是接收的大小 (byte)，第二個參數是 timeout (最多等待多久)
  - `io.recvline()` : 接收回傳並且換行
  - `io.recvuntil("end")` : 接收回傳直到遇到 `end`
  - `io.recvlines(2)` : 接收回傳兩行

### Lab 4 - echo

就是根據遠端主機的提示，將一模一樣的文字傳回去，然後就會出現 flag，但因為主機已經關了，所以我就只有寫好程式，但應該是會對的啦 owo

```python
import pwn

io = pwn.remote('140.116.246.190', 8787)

while True:
    try:
        io.recvuntil('Repeat after me:\n')
        echo = io.recv()
        print(echo)
        io.send(echo)
    except:
        break

io.interactive()
```

### Lab 5 - eval

跟 echo 很像，但變成算 1000 道數學題，都算對之後就會給 Flag 了，然後跟上一題一樣，主機已經關了，所以我就只有寫程式，沒有實際測過

```python
import pwn

io = pwn.remote("140.116.246.190", 8788)

while True:
    try:
        io.recvuntil("Solve the problem: ")
        question = io.recv()
        ans = eval(question)
        print(question.decode(), ans)
        io.sendline(str(ans))
    except:
        break

io.interactive()
```

### LAB 6 – b33fer overflow

這邊聽不是很懂，有大概理解它的原理就是要把 stack 塞爆，一路塞到 return addr 的位置，這邊的題目是要跳到 `win` 的地方，然後就會出現 flag，但我其實不太知道實作細節，所以目前就先不寫他了，之後便更強了再說 (主要是今天死線快到了，來不及研究 lol)
