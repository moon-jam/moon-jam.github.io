---
title: IThome 2024 鐵人賽 一直刷 CTF - Day7
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 10121
date: 2024-09-10 00:00:00
lang:
---

## 前言

本日進度：

- [x] 6 題 general skills
- [x] [【成大資安社社課】WEB 2 - 到 LFI](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z&t=2992)

<!--more-->

## Writeup

### 第一題：Warmed Up

`0x3D` 轉成 10 進位，這樣就是答案了

### 第二題：strings it

就是要會用 strings 指令，把 binary 檔可讀的東西提出來，然後把 `picoCTF` 樣式找出來就有了

```shell
strings strings | grep pico  
```

![Image](https://i.imgur.com/lGZyBiT.png)

### 第三題：what's a net cat?

按照指示把 nc 到他給的網址，然後就會得到 Flag 了

```shell
nc jupiter.challenges.picoctf.org 25103 
```

![Image](https://i.imgur.com/UuV6CAI.png)

### 第四題：Lets Warm Up

`0x70` 轉成文字，這樣就是答案了

### 第五題：dont-you-love-banners

進入 medium 了!

這題真的比較難，使用第一個 server 取得密碼

![Image](https://i.imgur.com/dBmtTBl.png)

接下來連到第二個 server，然後用剛剛的密碼登入後，他會問一些問題，就網路查一下就有了

![Image](https://i.imgur.com/OWFm2Wh.png)

接下來看一下他題目說的，flag 在 root 下面，但我們 cd 過去之後卻發現沒有 read 的權限

![Image](https://i.imgur.com/a7GgX1H.png)

但有個就坐 `/script.py` 的東西，是可以讀的，看了一下內容

```python
import os
import pty

incorrect_ans_reply = "Lol, good try, try again and good luck\n"

if __name__ == "__main__":
    try:
      with open("/home/player/banner", "r") as f:
        print(f.read())
    except:
      print("*********************************************")
      print("***************DEFAULT BANNER****************")
      print("*Please supply banner in /home/player/banner*")
      print("*********************************************")

try:
    request = input("what is the password? \n").upper()
    while request:
        if request == 'MY_PASSW@RD_@1234':
            text = input("What is the top cyber security conference in the world?\n").upper()
            if text == 'DEFCON' or text == 'DEF CON':
                output = input(
                    "the first hacker ever was known for phreaking(making free phone calls), who was it?\n").upper()
                if output == 'JOHN DRAPER' or output == 'JOHN THOMAS DRAPER' or output == 'JOHN' or output== 'DRAPER':
                    scmd = 'su - player'
                    pty.spawn(scmd.split(' '))

                else:
                    print(incorrect_ans_reply)
            else:
                print(incorrect_ans_reply)
        else:
            print(incorrect_ans_reply)
            break

except:
    KeyboardInterrupt
```

本來想說可以直接修改 `/script.py` 讓他列印 `flag` 但發現他有鎖 `write` 的權限，就遇到一點困難了，於是我點下了邪惡 Hint

> Do you know about symlinks?

去查了一下才知道這題應該是要我們去建造"軟連結"，它跟硬連結的差異在於因為他只是單純的指向原本的檔案，不需要讀取的權限，所以就把 `/root/flag.txt` 連結到 `/home/player/banner`，這樣就應該就能讀到 Flag 了

```shell
ln -s /root/flag.txt /home/player/banner
```

然後按下 `Ctrl + C` 之後再連一次就能看到 Flag 了

![Image](https://i.imgur.com/tir6IJI.png)

### 第六題：SansAlpha

規定終端不能使用任何字母，這我隨便猜 `*/*` 找到 `flag` 位置之後就不知道要怎麼做了 qaq，於是我去找了別人的 Writeup

![Image](https://i.imgur.com/x44sSY4.png)

看到有人是找到了 base64 的位置 `/bin/base64`，然後讓他把 Flag 的內容 base64 一次，之後再自己 decode 回來

但這邊要注意的是如果直接用 `/???/????64` 會跟 `/bin/x86_64` 混淆，所以要用 `/*/???[!_]64` 這樣才能找到正確的位置

![Image](https://i.imgur.com/gdENjp9.png)

![Image](https://i.imgur.com/zz1wcWz.png)

![Image](https://i.imgur.com/ZBsAR5J.png)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
