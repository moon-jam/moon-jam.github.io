---
title: 關於我部落格上的圖片們
lang: zh-TW
tags:
  - 貼文
  - 部落格
categories:
  - 貼文
scope: both
abbrlink: 65478
date: 2026-05-29 00:00:00
---

過去我部落格上的圖片大都是儲存在 Imgur 上的，但有時候額載入速度會很慢或是根本載不出來，而且其實他們的[使用條款](https://imgur.com/tos) 也是明確禁止我們將 Imgur 作為個人網站的圖床使用

> "Also, don't use Imgur to host image libraries you link to from elsewhere, content for your website, advertising, avatars, or anything else that turns us into your content delivery network."

因此，後來我就改用 [PicGo](https://github.com/Molunerfinn/picgo) 搭配 GitHub 作為圖床，但原先在 Imgur 的圖片還是沒處理，要是哪天 Imgur 不開心了，我就會有五百多張圖片消失，因此就開始了搬遷圖片之路。

<!--more-->

其實要搬圖片也不是這麼困難，本來是想說把 Imgur 的相簿圖片下載下來，然後再傳到我 GitHub 上就好了，不過呢，我的 Imgur 登入不進去！？

![imgur_service_500](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/imgur_service_500.webp)

查了一下發現[似乎是因為 Imgur Ban 了臺灣的 IP](https://igouist.github.io/post/2025/06/imgur-temporarily-over-capacity-maybe-your-ip-banned/)，要的話就得使用 VPN 用國外 IP 繞過限制，但好麻煩而且我也沒有鯊魚 VPN XD，所以我們只好寫個程式掃我的文章用了哪些 Imgur 的圖片然後下載下來再傳到 GitHub 上，這也很簡單畢竟現在有 AI 也就是幾分鐘的事情，另外還順手把所有圖片都轉成 webp 壓縮檔案大小讓網站載入速度更快。

除此之外，為了讓我之後上傳圖片時也會自動轉檔成 webp，還做了個 [Raycast Plugin](https://github.com/moon-jam/BlogPictures/blob/main/bin/webpclip)（雖然後來發現有點重造輪子了 XD[^Wheel]），會將目前剪貼簿的圖片轉檔成 webp 然後再上傳到 GitHub 並且還支援 gif，相當好用。

[^Wheel]: 其實在 PicGO 上有現有的 Plugin 可以做到這件事情: [juzisang/picgo-plugin-compress](https://github.com/juzisang/picgo-plugin-compress)，不過他好像不支援 gif 就是了

最後還有把原先使用 `https://raw.githubusercontent.com/...` 的存取圖片方式，改成 `https://cdn.jsdelivr.net/gh/...`，利用 jsDelivr 的 CDN 加速讀取圖片的時間，到此也就完成了這次的 Blog 圖片搬遷任務！

## 後記

前陣子有朋友建議我改用 Cloudflare R2 來儲存圖片，我覺得其實是還蠻誘人的，10 GB 的免費儲存空間基本上存圖片應該用不完，而且把 GitHub 當圖床應該也是有點灰色地帶的感覺[^gray]，但目前還沒研究，搞不好過一陣子我又會把圖床搬走了🫠

[^gray]: 但我想我暫時不會有這樣的問題，畢竟[~~我做的其實是讓大家瀏覽圖片的網站，才不是圖床勒！！~~](https://github.com/moon-jam/BlogPictures/)

