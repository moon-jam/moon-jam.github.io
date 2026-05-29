---
title: IThome 2024 鐵人賽 一直刷 CTF - Day5
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 58888
date: 2024-09-08 00:00:00
lang:
---

## 前言

本日進度：

- [x] 6 題 general skills
- [x] [【成大資安社社課】WEB 1 - 到 Lab - Robots、gitleak](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z&t=4574)

<!--more-->

## Writeup

### 第一題：convertme.py

就單純把數字轉成二進位就結束了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_qzYltbB.webp)

### 第二題：Codebook

就把檔案下載執行，就結束了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_0ZM15DK.webp)

### 第三題：Magikarp Ground Mission

按照指示連進 ssh 然後就一一把檔案 cat 出來最後組在一起就是 flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_56liA03.webp)

### 第四題：Tab, Tab, Attack

用 tab 移動到 flag 的位置，然後執行就有 flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_kWDoPzl.webp)

### 第五題：Wave a flag

把檔案下載之後，先用 chmod 讓他可以執行，在按照指示在後面加上 `-h` 的參數就可以得到 flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_E0ww14d.webp)

### 第六題：Python Wrangling

就看一下他程式碼，按照他加解密的方式把他給的密文和密鑰丟進去解就是答案了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_twW8yiD.webp)

## 上課紀錄

### What is web?

[google 搜尋背後做了甚麼](https://github.com/alex/what-happens-when)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_NjxW5sR.webp)

OSI 模型的七層都是可以打的，但今天只會著重在第七層，也就是 Application layer 的打法

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_DIKObNl.webp)

#### 分類

1. 前端 (Frontend)
   - 瀏覽器 (Browser)
   - Language：HTML、CSS、JavaScript
   - Framework：Vue.js、React.js、jQuery...
   - Client：Chrome、Firefox、Safari、Edge...
   - 攻擊方法：XSS、CSS Injrection、prototype pollution、DOM Clobbering...
2. 後端 (Backend)
   - 伺服器 (Server)
   - Language：Python、PHP、C ...
   - Framework：Flask、Larabel、gin...
   - Server：Apache、Nginx、Gunicore...
   - 攻擊方法：LFI、Command Injection、SQL Injection、Serialization、SSTI、SSRF...

前端會向後端發 request，後端會回傳 response

#### HTTP Request

```HTTP
POST /cgi-bin/process.cgi HTTP/1.1
User-Agent: Mozilla/4.0 (compatible; MSIE5.01; Windows NT)
Host: example.vincent55.tw
Content-Type: application/x-www-form-urlencoded
Content-Length: length
Accept-Language: en-us
Accept-Encoding: gzip, deflate
Connection: Keep-Alive

licenseID=string&content=string
```

#### HTTP Response

```HTTP
HTTP/1.1 200 OK
Date: Day, 00 OOO 6666 11:11:11 TTT
Content-Type: text/html

<!doctype html>..
```

[HTTP status](https://http.cat/
) : 2開頭是成功，3開頭是重新導向，4開頭是客戶端錯誤，5開頭是伺服器錯誤

#### Fronted roadmap

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_mTD4tx8.webp)

#### Backend roadmap

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_e0H8Hh7.webp)

#### 學習曲線

Web security 是資安裡面最容易入門的領域?

因為我們對 Web 最熟悉，所以上手最快，但學到一定階段之後就會逐間趨緩，需要靠經驗累積和漏洞靈敏度去找漏洞

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_eYvlgzT.webp)

### Why Web Security? (為甚麼要學 Web Security?)

- 今年的金盾獎得獎名單可以透過改後面的數字在公告時間前就拿到 owo

  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_gYr2OWb.webp)

- 出去玩~

  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_BdT6lfj.webp)

- 賺錢錢 - Bug Bounty
  而且其實 Bug Bounty 是在比耐心和漏洞的靈敏度，難度不會比 CTF 高

  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_s6qRDDd.webp)

- Pwn2Own

  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_zk7lIUz.webp)

- Hacking Moodle 點名

  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_nnLHoQR.webp)

  點名密碼有八碼很難爆破

  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_fXYGplo.webp)

  但 qrpass 是一個 1000~9999 的數字，所以是可爆破的

  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_9TEvnj6.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_wwWothF.webp)

### Web Base

- HTML -> 骨架
- CSS -> 皮膚
- JavaScript -> 會動了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_XcdEu9W.webp)

- Cookie
  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_PCPleP8.webp)
  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_LdIdZOY.webp)

  這樣就取得管理員權限了 owo
  [好用的 Cookie extension](https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=zh-TW)

- Session vs. Cookie
  剛剛改 Cookie 會直接變 admin 這樣太不安全了，其中一個解決的方法就是用 Session ID 來辨識身分，把 Data 存在 Server 上 (Session Data)， Cookie 只有包含 Session ID，用 Session ID 去查找，就不會有問題了
  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_5F6oqhw.webp)

  > SessionID 的產生方式跟前面說的一樣，通常會是一個無法猜測的亂數。你可能會想說：「很難猜是一回事，但機率不是 0 阿！」，對，的確是有機率能夠猜到，但是那個機率太低太低了（例如說幾千億分之一之類的）。而且 Server 在你亂猜猜錯幾次之後就有可能把你 ban 掉不讓你繼續猜，所以沒什麼問題。  
  > 不過這邊要特別注意的一點是 SessionID 基本上是種認證不認人的方式，也就是說一旦你的 SessionID 被偷走，別人就可以偽造你的身份來登入了。而這個 SessionID 通常都是保存在 Cookie 之中。  
  > 這就是為什麼有些網站發生駭客入侵的情形之後你會突然被登出，因為駭客可能偷到一批 SessionID，這時候伺服器就會把所有 Session 資料全部清空，以故事來比喻就是把筆記本丟掉，買一本新的，這樣被偷走的那些 SessionID 就沒用了，而 Server 找不到你的 SessionID，自然就無法登入，因此把你給登出了。  
  > 網站發生問題時客服會要你先把 Cookie 清掉也是類似的道理，因為 Cookie 跟狀態有關，有時候可能程式有一些 bug，把你導到了錯誤的狀態，把 Cookie 清空等於把狀態清空，重新再開始，就有可能變得正常。
  > by [白話 Session 與 Cookie：從經營雜貨店開始](https://hulitw.medium.com/session-and-cookie-15e47ed838bc)

  (或是把 cookie 的資訊加密 (Cookie-based session) ，只有 server 知道怎麼解密，這樣也能夠保護，但缺點就是 cookie 的長度是有限制的，太大瀏覽器就不幫你存了，或是哪天加密方式被破解，那就一樣會被偽造了)

- Lab - Cookie

  跟昨天改 cookie 的那題很像，而且甚至不需要一個個猜，就把 cookie 改成 cookie_monster 就好了，阿但 Lab 關了我沒辦法是 qaq

  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_WPV24Je.webp)

- hash
  - 不一樣的東西 hash 之後會不一樣，一樣的 hash 之後會一樣
  - 不可逆，不能從 hash 值反推原本的東西
  - 常見的 hash function: md5(不安全), sha1(不安全), sha256(目前常用的)...
  - hash collision: 兩個不一樣的東西 hash 之後一樣，這就是不安全的 hash
- Encoding
  
  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_454UA0E.webp)

- 常見的 encode function: base64, urlencode...
- Tools:
  - F12: Developer Tools
  - curl: 可以用來發送 http request 的工具
  
    ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_jXUPICn.webp)
  
  - [Cheatsheet](https://github.com/w181496/Web-CTF-Cheatsheet)
- Lab - Redirect (題目關了🥲)
  - 這題式按下 Get flag 之後會跳到一個某個網址，但又會馬上轉回來，所以就只要開發者工具打開 Network 看按下去之後轉址去了哪，然後用 curl 把內容抓下來就可以了

  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_7Lvk4Hx.webp)
  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_lK7aIWN.webp)

- Lab - ShibaShop (題目關了🥲)
  - 先隨便買一個東西，然後把 buy 的金額改成負的，這樣錢就就會變多，再找到 flag 購買的地址，就可以買 flag 了，然後 flag 就出來了 \owo/
- 怎麼打
  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_xgUDUKy.webp)
  
  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_PIkck6o.webp)
  Error message 可以看 404 頁面
  [好用插件](https://chromewebstore.google.com/detail/wappalyzer-technology-pro/gppongmhjkpfnbhagpmjfkannfbllamg)
  - 什麼是黑箱，甚麼是白箱
    - 黑箱只能靠自己慢慢戳，白箱就是有 code 可以看背後邏輯
  - Info Leak: Turn black box to white box
    ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_TKznpPx.webp)
    ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_2o7h9n8.webp)
    ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_8o2KckN.webp)
    [酷酷插件，自動幫你有沒有 git leak 爽爽拿 0day](https://chromewebstore.google.com/detail/dotgit/pampamgoihgcedonnphgehgondkhikel?hl=en)
    [藉由 gitleak 將整份程式還原出來，從黑箱變白箱](https://github.com/lijiejie/GitHack)
    ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_jTalgbF.webp)
    ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_9rinjXU.webp)
    ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_x2ndju7.webp)
    ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day5_g1OoZyA.webp)
  - Lab - Robots (題目關了🥲)
    - 點到 Robots.txt 中設定成 disable 的網址，打開就有了
  - Lab - gitleak (題目關了🥲)
    - 用上面的那個工具把整份檔案用出來，然後到 `.env` 中找到 flag

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
