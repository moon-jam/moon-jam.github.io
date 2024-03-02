---
title: Hexo-NexT MathJax配置
lang: zh-TW
tags:
  - Hexo
  - NexT
categories:
  - 教學文
abbrlink: 12637
date: 2023-09-16 00:00:00
mathjax: true
---

## 前言

因為Hexo本身的markdown語法不能使用LaTeX進行數學式的編寫，需要額外安裝插件，也就是MathJax，基本上跟LaTeX語法是一模一樣的。
另外，本篇幾乎皆取自[官方說明](https://theme-next.js.org/docs/third-party-services/math-equations#mjx-eqn%3Aeq_tag)，有興趣可以自行參閱，接下來我會根據以下三點，一一進行介紹。

<!--more-->

1. [安裝](/Hexo-Next_MathJax/#安裝)
2. [修改設定](/Hexo-Next_MathJax/#修改設定)
3. [範例](/Hexo-Next_MathJax/#範例)

## 安裝

### 安裝/卸載套件

這邊載的是渲染網頁的套件，因為hexo本來就有自己的渲染工具了，所以要將其解除安裝並下載新的渲染工具，另外這裡也要注意一下如果你之前有安裝過`hexo-math`或`hexo-katex`要把他們解除安裝，不然也有可能會發生衝突

```bash
npm un hexo-renderer-marked
npm i hexo-renderer-pandoc
```

### 本機安裝pandoc

這一點非常重要，我因為這個坑花了一個多小時，最後才在[github上的討論找到解決方法](https://github.com/theme-next/hexo-theme-next/issues/1454)，需要額外安裝pandoc在本機，其實官方的文檔裡面有寫，但我沒看到🥲
各個作業系統安裝方式不一，我就一一整理打在底下，記得挑選符合自己作業系統的複製執行喔

```bash
#Windows（這裡需要有chocolatey，如果沒有安裝的話可以去搜尋一下安裝方式，整體過程並不複雜，而且未來用到機會很高）
choco install pandoc

#macOS（這裡需要有homebrew，如果沒有安裝的話可以去搜尋一下安裝方式，整體過程並不複雜，而且未來用到機會很高）
brew install pandoc

#Linux（基本上原本電腦裡應該都有Pandoc，不過也還是可以下載更新到最新版本）
#先到 https://github.com/jgm/pandoc/releases/latest 下載安裝檔，然後再執行指令安裝，$DEB是安裝檔路徑
sudo dpkg -i $DEB

#Chrome（這個需要chromebrew，我沒有用過，但看起來應該不是很麻煩）
crew install pandoc

```

[這邊是pandoc官方安裝教學](https://github.com/jgm/pandoc/blob/main/INSTALL.md)

## 修改設定

到主題中的`config.yml`找到math的位置，並修改成以下內容

```yml theme/NexT/_config.yml
math:
  # 如果是true就代表不用特別設定要不要使用MathJax，所有頁面都會套用，除非設定false
  # 如果是false就代表不用特別設定要不要使用MathJax，所有頁面都不會套用，除非設定true
  every_page: true

  mathjax:
    # 就是說要取用mathjax
    enable: true
    # tag後面會講到，就先選ams
    # Available values: none | ams | all
    tags: ams
```

{% note warning %}
後來發現mathjax好像有可能會造成一些跑版的問題，反而enable關掉就好了，就看個人想不想試試看了
{% endnote %}

這裡需要注意一件事，就是如果之前的文章換行沒有做好，可能會出現跑版的狀況，需要重新手動調整，我試了很久，但真的找不到方法，另外還有一個就是不知道為什麼用了hexo-renderer-pandoc之後，文章標題的網址會跑掉，然後標題最後面的迴紋針符號也會不見，如果有人可以解答希望可以在留言區告訴我～不勝感激🙏

## 範例

這邊有一些範例可以試試看

```latex
$$
A = \begin{bmatrix}
        a_{11}    & a_{12}    & ...    & a_{1n}\\
        a_{21}    & a_{22}    & ...    & a_{2n}\\
        a_{31}    & a_{22}    & ...    & a_{3n}\\
        \vdots    & \vdots    & \ddots & \vdots\\
        a_{n1}    & a_{n2}    & ... & a_{nn}\\
    \end{bmatrix} , b = \begin{bmatrix}
        b_{1}  \\
        b_{2}  \\
        b_{3}  \\
        \vdots \\
        b_{n}  \\
    \end{bmatrix}
$$

$$
\begin{aligned}
a &= b + c \\
  &= d + e + f + g \\
  &= h + i
\end{aligned}
$$

$$
e=mc^2
$$

$$
C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}
$$
```

實際的效果大概就是長這樣
$$
A = \begin{bmatrix}
        a_{11}    & a_{12}    & ...    & a_{1n}\\
        a_{21}    & a_{22}    & ...    & a_{2n}\\
        a_{31}    & a_{22}    & ...    & a_{3n}\\
        \vdots    & \vdots    & \ddots & \vdots\\
        a_{n1}    & a_{n2}    & ... & a_{nn}\\
    \end{bmatrix} , b = \begin{bmatrix}
        b_{1}  \\
        b_{2}  \\
        b_{3}  \\
        \vdots \\
        b_{n}  \\
    \end{bmatrix}
$$

$$
\begin{aligned}
a &= b + c \\
  &= d + e + f + g \\
  &= h + i
\end{aligned}
$$

$$
e=mc^2
$$

$$
C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}
$$

可以發現最後這個還是化學式，沒錯，MathJax也可以撰寫化學式，詳細語法可以看[這邊](https://mhchem.github.io/MathJax-mhchem/)

最後就是標籤的功能，前面在設定`tag`我們選了`ams`，那他的功能就是可以讓我們給每一個式子一個編號，例如像這樣

```latex
$$\begin{equation} \label{eq1}
e=mc^2
\end{equation}$$
```

$$\begin{equation} \label{eq1}
e=mc^2
\end{equation}$$

在後文中就可以使用`$\eqref{eq1}$`來引用式子，像這樣$\eqref{eq1}

另外如果想用其他文字來編號的話可以用`\tag{}`來標記方程式，使用`\label{}`當作引用時的標前，例如說以下這個式子

```latex
$$x+1\over\sqrt{1-x^2} \tag{i}\label{eq_tag}$$
```

$$x+1\over\sqrt{1-x^2} \tag{i}\label{eq_tag}$$

而要引用時要使用`\label{}`括號中的內容，以上面的為例就是`$\eqref{eq_tag}$`，實際的樣子應該就是像這樣$\eqref{eq_tag}$

## 結語

現在可以自由輸入各種漂亮的式子了～如果有問題或者發現我有哪裡講錯，歡迎大家到底下留言區跟我討論喔～

## 其他功能

1. 側邊欄

    － [基礎配置(關於、標籤、分類、歸檔、搜尋、頭像、個人相關連結)](/NexT-sidebar-basic)
    － [切換語言](/NexT-sidebar-switch-lang)

2. [頁底](/NexT-footer)
3. [utterances留言板](/NexT-utterances-comment-box)
4. [Google Analytics統計網站資訊](/NexT-google-analytics)
5. [日/夜模式](/NexT-dark-light-mode)
6. [live2d角色（就是網頁右下角那隻可愛的狗狗）](/NexT-live2d)
7. [SEO：搜尋引擎最佳化(Search Engine Optimization)](/SEO-Search-Engine-Optimization)
8. [剩下的一些小工具](/NexT-some-cool-tools)
9. [自訂網域](/Hexo-NexT_custom_domain)
