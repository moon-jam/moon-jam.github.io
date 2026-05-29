---
title: IThome 2024 鐵人賽 一直刷 CTF - Day20
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 58085
date: 2024-09-23 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】WEB 2 - Lab](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

<!--more-->

## 上課紀錄

### Lab - swirl

#### stage 1 & 2

這兩題跟之前 Lab - phpisbest 差不多，只要在後面加上 `/?A[]=[0]&B[]=[3]` 就能達成各種 `null==null` 就能過關了

#### stage 3

這題我有觀察到可以 path traversal，但是我亂戳戳不到東西，過了大概十分鐘，又沒忍住點了一下 hint ，才發現要戳的東西就是寫在原始碼裡面的 `config.php` ，就能前往下一關了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day20_xZD3Ha4.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day20_nLS1RQl.webp)

#### stage 4

這題她沒有一個地方讀取 `👀` ，但有個 `extract($_POST)` 可以利用 `POST` 的方式輸入 `👀` ，之後就跟 `lfi2rce` 一樣，利用 [php filter chain 構造出 webshell](https://github.com/wupco/PHP_INCLUDE_TO_SHELL_CHAR_DICT/blob/main/test.php) ，就能得到 Flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day20_J7iMxyo.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day20_MBxcvve.webp)

Note: 這邊要注意的是這個 webshell 指令最後需要的參數 `1`，他是透過 `$_GET[1]` 來取得的，所以要寫在網址後面解析，不是寫在 POST 裡面

### Lab - fakelog

他很好心的給我們看了他生成的原始碼

```python
#!/usr/local/bin/python3
import sys

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("no argument")
        sys.exit()

    magic_num = int(sys.argv[1]) if sys.argv[1].isdigit() else sys.argv[1]
    if magic_num == 0:
        print("0 is not allowed")
        sys.exit()
    while magic_num != 1:
        with open(f"fakelog/{magic_num % 6 if isinstance(magic_num, int) else magic_num}", "r", encoding="utf-8") as fd:
            print(fd.read())
        magic_num = 3 * magic_num + 1 if magic_num % 2 else magic_num // 2
```

重點有兩個

1. `magic_num = int(sys.argv[1]) if sys.argv[1].isdigit() else sys.argv[1]`
2. `with open(f"fakelog/{magic_num % 6 if isinstance(magic_num, int) else magic_num}", "r", encoding="utf-8") as fd:`

他不會檢查 magic number 是文字，而且在他是文字的時候他還會直接讓我們讀取檔案，所以我們可以利用這個漏洞來做 path traversal

又可以從 Hint 的 dockerfile 中知道有個叫 `main.py` 是主程式，拿出來看看

```dockerfile
FROM python:3.10
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/etc/poetry python3 - 
WORKDIR /app

COPY pyproject.toml poetry.lock .
RUN /etc/poetry/bin/poetry config virtualenvs.create false && \
    /etc/poetry/bin/poetry install
COPY . .
ARG FLAG
RUN echo $FLAG > /app/flag_`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 8 | head -n 1`
USER daemon 
ENTRYPOINT ["python", "/app/main.py"]
```

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day20_D41SaaE.webp)

```python
result:
from flask import Flask, render_template, request, send_file
import subprocess

app = Flask(__name__)


@app.route('/')
def home():
return render_template('home.html')


@app.route('/howtogen')
def howtogen():
return send_file('gen.py', mimetype='text/plain', as_attachment=False)


@app.route('/hint')
def hint():
return send_file('Dockerfile', mimetype='text/plain', as_attachment=False)


@app.route('/gen', methods=['GET', 'POST'])
def get_input():
message = None
if request.method == 'POST':
user_input = request.form['user_input']
if " " in user_input:
result = "evil input"
else:
result = subprocess.run(
f"python gen.py {user_input}", shell=True, capture_output=True, text=True).stdout.replace('\', '')
message = f"result: {result}"
return render_template('generate.html', message=message)


if __name__ == "__main__":
app.run(host='0.0.0.0', port=5050)
```

可以知道不能輸入空白，另外還有他執行程式的方法是

```python
subprocess.run(
f"python gen.py {user_input}", shell=True, capture_output=True, text=True).stdout.replace('\', '')
```

可以讓我們利用類似 `;id` 這樣的方式來達到 RCE，空白就用 `${IFS}` 來代替，隨便戳戳看之後就能拿到 Flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day20_bsNKWDc.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day20_ea7xOKB.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day20_NXWwza5.webp)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
