---
title: IThome 2024 鐵人賽 一直刷 CTF - Day14
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

- [x] 6 題 web
- [ ]

<!--more-->

## Writeup

### 第一題：findme

用他的密碼 `test` / `test!` 登入，但這樣好像拿不到什麼，打開 Burp Suite 攔截 request，發現有下面這兩個請求，有一個 `/next-page/id=cGljb0NURntwcm94aWVzX2Fs` 試著把它用 Base64 解碼，然後他會再跳轉一次，有另一個 id ，一樣用 Base64 解碼之後合併再一起就得到 Flag 了

![Image](https://i.imgur.com/JurqiNi.png)

![Image](https://i.imgur.com/8N2c80l.png)

### 第二題：Secrets

點檢查發現 source 裡面有一個資料夾 secret ，所有就連過去看看 (記得最後面要加 `/` 不然會被 redirect 到 `http://saturn.picoctf.net/secret/`) ，然後到下一個頁面後又發現有個資料夾 hidden ，連過去又有個資料夾 `superhidden` ，再連過去之後就看到 Flag 了

![Image](https://i.imgur.com/NnVrlp7.png)

![Image](https://i.imgur.com/UCD9hZ5.png)

![Image](https://i.imgur.com/3ZdYj17.png)

![Image](https://i.imgur.com/YVO0WGz.png)

### 第三題：Roboto Sans

這題看了好久才想到要去看 `robots.txt` ，裡面有一些看起來像 base64 編碼後過的東西，上下兩行不太知道是什麼，中間那行解出來是 `js/myfile.txt` ，所以就去看 `js/myfile.txt` 就得到 Flag 了

![Image](https://i.imgur.com/zdJtIB2.png)

![Image](https://i.imgur.com/acGFowS.png)

![Image](https://i.imgur.com/HdWPVny.png)

### 第四題：Who are you?

這題很好玩，他是昨天把 `User-Agent` 改成 `picobrowser` 的進階版，這次要改的東西更多，但他都有給提示，慢慢查一個個加到 Header 裡面就完成了，分別是 `User-Agent` `Referer` `Date`  `DNT` `X-Forwarded-For` `Accept-Language` ，這些都改成他想要的之後就能得到 Flag 了

![Image](https://i.imgur.com/D0TWN28.png)

![Image](https://i.imgur.com/aGCEPCf.png)

![Image](https://i.imgur.com/jxwsbkn.png)

![Image](https://i.imgur.com/0KYHVMt.png)

![Image](https://i.imgur.com/gUxGPKj.png)

![Image](https://i.imgur.com/6xnFkJB.png)

![Image](https://i.imgur.com/P6e6nSb.png)

![Image](https://i.imgur.com/rVhV8iN.png)

### 第五題：It is my Birthday

這題是要上傳兩個 PDF，要滿足內容不相同，但是 MD5 Hash 相同，所以我先用 Burp Suite 把請求抓下來，然後上網找到兩個會碰撞的 MD5 Hash : `TEXTCOLLBYfGiJUETHQ4hAcKSMd5zYpgqf1YRDhkmxHkhPWptrkoyz28wnI9V0aHeAuaKnak` 和 `TEXTCOLLBYfGiJUETHQ4hEcKSMd5zYpgqf1YRDhkmxHkhPWptrkoyz28wnI9V0aHeAuaKnak`，並分別把他們當成 PDF 的內容，上傳上去之後就能得到 Flag 了

```http
POST /index.php HTTP/1.1
Host: mercury.picoctf.net:57247
Content-Length: 575
Cache-Control: max-age=0
Accept-Language: en-US,en;q=0.9
Upgrade-Insecure-Requests: 1
Origin: http://mercury.picoctf.net:57247
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryvOuQVRQUS71gBftB
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.120 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://mercury.picoctf.net:57247/
Accept-Encoding: gzip, deflate, br
Connection: keep-alive

------WebKitFormBoundaryvOuQVRQUS71gBftB
Content-Disposition: form-data; name="file1"; filename="test.pdf"
Content-Type: application/pdf

TEXTCOLLBYfGiJUETHQ4hAcKSMd5zYpgqf1YRDhkmxHkhPWptrkoyz28wnI9V0aHeAuaKnak
------WebKitFormBoundaryvOuQVRQUS71gBftB
Content-Disposition: form-data; name="file2"; filename="test.pdf"
Content-Type: application/pdf

TEXTCOLLBYfGiJUETHQ4hEcKSMd5zYpgqf1YRDhkmxHkhPWptrkoyz28wnI9V0aHeAuaKnak
------WebKitFormBoundaryvOuQVRQUS71gBftB
Content-Disposition: form-data; name="submit"

Upload
------WebKitFormBoundaryvOuQVRQUS71gBftB--
```

![Image](https://i.imgur.com/Rf6b5uB.png)

![Image](https://i.imgur.com/TiVm1g4.png)

### 第六題：

網頁中的 js 被 `obfuscation` 了，有夠醜，先拿 prettier 格式化，再仔細看看，感覺跟之前有一題 `dont-use-client-side` 很像，但很多東西被打亂了，不過可以從 `checkpass[_0x4b5b("0x2")](, )` 判斷出密碼的順序是 `_0x4b5b("0x3")` -> `_0x4b5b("0x4")` -> `_0x4b5b("0x6")` -> `_0x4b5b("0x5")`，把它印出來之後就是 Flag 了～

```javascript
var _0x5a46 = [
  "0a029}",
  "_again_5",
  "this",
  "Password\x20Verified",
  "Incorrect\x20password",
  "getElementById",
  "value",
  "substring",
  "picoCTF{",
  "not_this",
];
(function (_0x4bd822, _0x2bd6f7) {
  var _0xb4bdb3 = function (_0x1d68f6) {
    while (--_0x1d68f6) {
      _0x4bd822["push"](_0x4bd822["shift"]());
    }
  };
  _0xb4bdb3(++_0x2bd6f7);
})(_0x5a46, 0x1b3);
var _0x4b5b = function (_0x2d8f05, _0x4b81bb) {
  _0x2d8f05 = _0x2d8f05 - 0x0;
  var _0x4d74cb = _0x5a46[_0x2d8f05];
  return _0x4d74cb;
};
function verify() {
  checkpass = document[_0x4b5b("0x0")]("pass")[_0x4b5b("0x1")];
  split = 0x4;
  if (checkpass[_0x4b5b("0x2")](0x0, split * 0x2) == _0x4b5b("0x3")) {
    if (checkpass[_0x4b5b("0x2")](0x7, 0x9) == "{n") {
      if (
        checkpass[_0x4b5b("0x2")](split * 0x2, split * 0x2 * 0x2) ==
        _0x4b5b("0x4")
      ) {
        if (checkpass[_0x4b5b("0x2")](0x3, 0x6) == "oCT") {
          if (
            checkpass[_0x4b5b("0x2")](split * 0x3 * 0x2, split * 0x4 * 0x2) ==
            _0x4b5b("0x5")
          ) {
            if (checkpass["substring"](0x6, 0xb) == "F{not") {
              if (
                checkpass[_0x4b5b("0x2")](
                  split * 0x2 * 0x2,
                  split * 0x3 * 0x2,
                ) == _0x4b5b("0x6")
              ) {
                if (checkpass[_0x4b5b("0x2")](0xc, 0x10) == _0x4b5b("0x7")) {
                  alert(_0x4b5b("0x8"));
                }
              }
            }
          }
        }
      }
    }
  } else {
    alert(_0x4b5b("0x9"));
  }
}
```

![Image](https://i.imgur.com/Er686nJ.png)

## 上課紀錄
