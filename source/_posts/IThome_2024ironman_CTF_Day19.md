---
title: IThome 2024 鐵人賽 一直刷 CTF - Day19
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 5157
date: 2024-09-22 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】WEB 2 - Lab](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

<!--more-->

### Lab-login

題目很好心把他會查詢的指令列出來了，可以發現他都有用 `()` 包起來，所以截斷的時候要注意要把 `)` 也帶上，就能順利 Injection 了。

![Image](https://i.imgur.com/IDavAlE.png)

![Image](https://i.imgur.com/LO1unj3.png)

### Dig Arguments

他有提供網站的原始碼，是用 flask 建的，下面這個是主要邏輯

```python
@app.route("/", methods=["GET", "POST"])
def dig():
    dig_result = None
    if request.args.get("debug"):
        return send_file(__name__ + ".py")
    if request.method == "POST":
        hostname1 = request.form["hostname1"]
        hostname2 = request.form["hostname2"]
        process = subprocess.Popen(
            ["dig", hostname1, hostname2],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        output, _ = process.communicate()
        dig_result = output.decode()

    return render_template("index.html", request=request, dig_result=dig_result)
```

`["dig", hostname1, hostname2]` 這樣的寫法會讓我們打算 injection

講師給了一個 [酷酷網站](https://gtfobins.github.io/) ，可以查到很多利用一些`本來應該不是用來讀檔或執行指令的` 的指令來 bypass 的方法，就找到了這個東東，按照這個方法就可以讀到 flag 了。

![Image](https://i.imgur.com/rxkhZup.png)

![Image](https://i.imgur.com/uKjFGSo.png)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
