---
title: IThome 2024 鐵人賽 一直刷 CTF - Day16
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 4197
date: 2024-09-19 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】WEB 2 - LFI](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

<!--more-->

## 上課紀錄

### Path Traversal

#### Intro

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_GRT0MaA.webp)

像是類似這樣的網址，如果把 `?file=report.pdf` 改成 `?file=../../../../etc/passwd` 就有可能得到一些機密資料

#### How to Happen

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_mtm74QU.webp)

#### 常用來被攻擊的路徑

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_VgXG75C.webp)

其他可以參考 [這邊](https://github.com/w181496/Web-CTF-Cheatsheet?tab=readme-ov-file#lfi)

#### 防禦方式

- 強制加上副檔名
  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_iXpCBr4.webp)
  (可以在後面加上 Null Byte `%00` 來繞過，但在 php5.4 已經被修掉了)
- 確認路徑前綴
  ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_z5OgxhK.webp)

### Lab - Pathwalker

到網頁之後她會很好心的告訴你 Flag 的位置，然後你可以用 Path Traversal 的方式去找到 Flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_lM6yIJV.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_d2ASAL1.webp)

### Lab - Pathwalker - waf

這題有塞了一個正則表達式的 WAF `/^apple|banana|cappo$/` 但其實是有漏洞的，他只要符合

1. apple 開頭
2. 包含 banana
3. 結尾是 cappo

其中一個就算符合 (正確應該是 `^(apple|banana|cappo)$`) ，所以就能很輕鬆地繞過了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_rI3ylCf.webp)

### LFI (Local File Inclusion)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_qaQZYmG.webp)

用 include 表示他會自動把檔案 parse ，假設 include 的是 php 就會自動 parse 成 php 的東西 (如果本來某個路徑的東西是不能拿的，就可能可以用 LFI 拿到，就像下面這樣)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_7V5vLN7.webp)

parse 之後有可能會讓一些東西不見，就像是註解的內容，這時候可以用 php 偽協議把內容轉成 base64 ，然後再解碼就可以看到原本的內容了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_ZWrMmcI.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_os8xiem.webp)

格式: `php://filter/{read= / write= / <empty>(自己決定要讀檔還寫檔)}convertor}/resource=<file_path>`

convertor: string.rot13, convert.base64-encode, convert.base64-decode, zlib.delate... 參見 [這邊](https://www.php.net/manual/en/filters.php)

如果有多個 convertor ，就用 `|` 來串起來

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_nYetXGd.webp)

### Lab - lfi

將 flag.php 用 base64 列印 (`?page=php://filter/convert.base64-encode/resource=flag`) 出來之後再解密就能得到 Flag 了

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_RzdCCsO.webp)

### Lab - lfi2rce

這題要取得在根目錄的 Flag ，直接偷 [別人寫好的 webshell](https://github.com/wupco/PHP_INCLUDE_TO_SHELL_CHAR_DICT/blob/main/test.php) 來串起來用就可以了，因為他用的是 `eval` 所以要用 `system` 來執行 linux 指令，所以只要在後面加上 `&1=system('ls /')` 然後 `&1=system('cat {flag名稱}') ，就解出來了~

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day16_wD5XHyP.webp)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
