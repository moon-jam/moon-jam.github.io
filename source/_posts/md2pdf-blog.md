---
title: md2pdf
tags:
  - md2pdf
categories:
  - [貼文]
  - [熊貓文]
abbrlink: 64736
date: 2026-04-10 00:00:00
lang: null
---

前陣子因為學校的電腦網路概論作業要寫報告，覺得用 Markdown 寫大概會很方便，但是最後在輸出 PDF 時候就麻煩了，雖然有不少現成工具（如 [HackMD](https://hackmd.io)、[realdennis/md2pdf](https://realdennis.github.io/md2pdf/)、[pip 的 md2pdf 套件](https://pypi.org/project/md2pdf/))，但 Markdown 這種原先設計就是為了讓你不煩惱排版的語言，輸出的 PDF 多半會出現各種換頁位置不如預期的狀況，雖然可以用 `<div style="break-after: page;"></div>` 手動換頁，但是這樣需要反復調整，非常耗時廢力的，於是，我決定做一個可以即時預覽 Markdown 輸出的 PDF 工具；在這個時代這件事情並不怎麽難，一邊上課一邊下 prompt，不多時就做出了個還不錯的成品：<https://moon-jam.me/md2pdf/>

![md2pdf](https://raw.githubusercontent.com/moon-jam/BlogPictures/main/md2pdf-demo.mp4)

看著他運作的非常順暢我也就心滿意把作業交出去了，並順利獲得 100 分

![好誒 100 分 owo/](https://raw.githubusercontent.com/moon-jam/BlogPictures/main/intro_comp_net_hw1_100.png)

不久後要寫第二次作業了，我想說我做的工具如此的好用肯定是要繼續用的，於是我又再次寫完了作業用它完成報告，結果過了幾天：

![噢不 75 分](https://raw.githubusercontent.com/moon-jam/BlogPictures/main/intro_comp_net_hw2_75qq.png)

因為我們報告需要把執行的截圖放上去，[我的 md2pdf](https://github.com/moon-jam/md2pdf) 為了方便做到這件事情，可以直接選擇電腦中的資料夾一次上傳所有內容，但我的圖片如果同名稱並不會重新 fetch，也就導致了我所有相同名稱的圖片都是舊的 qwq 被爆砍 25 分。

```shell 我兩個資料夾的結構長這樣，q1-1~q2-1 的圖片都是 HW1 的沒有更新
.
├── HW1
│   ├── F14136037_HW1.md
│   ├── F14136037_HW1.pdf
│   ├── HW1.pdf
│   ├── q1-1.png
│   ├── q1-2.png
│   ├── q1-3.png
│   ├── q2-1.png
│   └── q2-2.png
└── HW2
    ├── F14136037_HW2.md
    ├── F14136037_HW2.pdf
    ├── HW2.pdf
    ├── q1-1.png
    ├── q1-2.png
    ├── q1-3.png
    ├── q2-1.png
    ├── q2-2-1.png
    ├── q2-2-2.png
    ├── q2-3.png
    ├── q2-4-1.png
    ├── q2-4-2.png
    └── q2-5.png
```

雖然現在已經[修復了](https://github.com/moon-jam/md2pdf/commit/a41e4b7b4103662d6c75f22ad7692ca59767a4e7)，但我的 25 分是永遠回不來了🫠

不過也是因為這樣才讓我發現這個軟體的缺失，這樣想想好像也是挺不錯的，而且除此之外我真的覺得這工具還不錯用，以後有作業還會繼續用它來幫助我快速做出報告，相信<ruby>之後只要繳交前反復確認並持續改進軟體<rt>再多獻祭幾份作業</rt></ruby>，總有一天它就不會再有 bug 了！
