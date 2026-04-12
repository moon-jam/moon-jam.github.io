---
title: AI 時代，做筆記還在手打 LaTeX ！？
lang: zh-TW
tags:
  - 數學
  - Blog
categories:
  - 貼文
abbrlink: 40999
date: 2026-04-13T00:22:03+08:00
---

最近在準備機率與統計的期中考，無論是在寫筆記或者跟 AI 溝通要寫數學式打 $\LaTeX$ 實在是很慢，雖然說筆記也可以用寫的就好，~~但一方面是打成 LaTeX 比較帥氣~~，而且還能發到部落格上，搞不好哪天就成為[熱搜冠軍](/organic-chemistry-top-seo/)。另外如果直接把手寫算式的圖片貼給 AI 的話會大幅增加對話的 Context，還會有辨識錯誤的狀況發生，一定是不如直接給 $\LaTeX$ 的。

我的做法是用 Gemini 3 Fast 單獨開一個 Conversation 用來將手寫算式 [OCR](https://zh.wikipedia.org/zh-tw/%E5%85%89%E5%AD%A6%E5%AD%97%E7%AC%A6%E8%AF%86%E5%88%AB) 成 $\LaTeX$（而且當你算式寫錯它還會提醒你），然後再把數學式複製到筆記或是給原本跟你對話的 AI，這樣的使用流程搭配 Mac + iPad 可以共用剪貼簿的優勢，體驗是蠻優雅的。

![Demo!](https://raw.githubusercontent.com/moon-jam/BlogPictures/main/latex-AI-OCR-very-good.mp4)

<!--more-->

另外我在做 OCR 時的 Prompt 是利用 Raycast 的 Snippet，讓我輸入 `\2latex` 會自動變成以下這段文字，就不用每次都自己想 Prompt 怎麽下了，或也可以[使用蘋果預設的替代文字](https://www.jaron.tw/docs/tutorial/text-replacement/)。

> 請依照照片中的數學算式，將算式以 LaTeX 的方式輸出出來，同時也將一樣的內容打到一個 codeblock 中，並用兩個錢字號包起來 `$$` `$$`，注意，如果等式過長的話請記得在 codeblock 中要換行方便後續編輯，如果圖片中的等式本來有多行可以使用 \begin{align\*} 、\begin{gather}、\begin{multiline\*} 或多個等式來達成美觀

![用 Raycast 建立 Snippet](https://raw.githubusercontent.com/moon-jam/BlogPictures/main/raycast-snippet-2latex.png)

{% cq %}
TL;DR 讓 AI 幫你把手寫算式 OCR 成 $\LaTeX$ 超好用
{% endcq %}
