---
title: Hexo-NexT live 2d配置
lang: zh-TW
tags:
  - Hexo
  - NexT
categories:
  - 教學文
abbrlink: 1812
date: 2023-09-09
---

## 前言

這次要做的就是網頁右下角那隻可愛的狗狗，可以幫你看家招攬客人，還可以跟他一起玩，可說是一舉數得
![可愛的狗狗](https://i.imgur.com/cxJLFJn.png)
<!--more-->

1. [安裝live 2d](/NexT-live2d/#安裝live-2d)
2. [安裝live 2d模型](/安裝live-2d模型)

## 安裝live 2d

這次用的是這個[模組](https://github.com/xiazeyu/live2d-widget-models)，執行下方指令就可以安裝了

``` no
npm install --save hexo-helper-live2d
```

接著在最外層的_config.yml中加入以下程式碼（這個模組的作者是說放在theme裡面的_config.yml也可以，不過我試過之後是沒辦法）

```yml
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  log: false
  model:
    use: live2d-widget-model-wanko
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true
  react:
    opacity: 0.7
```

## 安裝live 2d模型

到了這裡應該已經有狗狗出現在你的網頁上面了，不過還有很多模型可以選擇，像是貓咪或是可愛的小女孩，可以從[這裡](https://blog.csdn.net/wang_123_zy/article/details/87181892#live2dwidgetmodelchitose_12)看到所有模型的預覽，不過我試過好以個之後還是覺得狗狗好可愛，或是也可以像我一樣中文的版面放狗，英文的版面放貓。

![喵～](https://i.imgur.com/Bp0nf0U.png)
![真香](https://i.imgur.com/EpN4LqQ.png)

那選好了想要的模型就可以來下載了，下面是所有模型的名稱，只要輸入`npm install 模型名稱`就可以下載了，例如我上面的貓咪就是`npm install live2d-widget-model-tororo`，如果是live2d-widget-model-haru/01或live2d-widget-model-haru/02的話就統一用`npm install live2d-widget-model-haru`

```# 模型名稱
live2d-widget-model-chitose
live2d-widget-model-epsilon2_1
live2d-widget-model-gf
live2d-widget-model-haru/01
live2d-widget-model-haru/02
live2d-widget-model-haruto
live2d-widget-model-hibiki
live2d-widget-model-hijiki
live2d-widget-model-izumi
live2d-widget-model-koharu
live2d-widget-model-miku
live2d-widget-model-ni-j
live2d-widget-model-nico
live2d-widget-model-nietzsche
live2d-widget-model-nipsilon
live2d-widget-model-nito
live2d-widget-model-shizuku
live2d-widget-model-tororo
live2d-widget-model-tsumiki
live2d-widget-model-unitychan
live2d-widget-model-wanko
live2d-widget-model-z16
```

安裝好後，到最外層的_config.yml修改剛剛加入的程式碼，將下載好的模型名稱打在model的use後

{% codeblock 修改model中的use lang:yml mark:10 %}
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  log: false
  model:
    use: 下載的模型名稱
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true
  react:
    opacity: 0.7
{% endcodeblock %}

修改後應該就可以看到選的live 2d角色出現在你的網頁上面了

## 結語

多了個守護神在你的網站上了，真的超酷的，如果有發現問題或者我有哪裡講錯，歡迎大家到底下留言區跟我討論喔～

## 其他功能

1. 側邊欄

    － [基礎配置(關於、標籤、分類、歸檔、搜尋、頭像、個人相關連結)](/NexT-sidebar-basic)  
    － [切換語言](/NexT-sidebar-switch-lang)  

2. [頁底](/NexT-footer)
3. [utterances留言板](/NexT-utterances-comment-box)
4. [Google Analytics統計網站資訊](/NexT-google-analytics)
5. [日/夜模式](/NexT-dark-light-mode)
6. live2d角色（就是網頁右下角那隻可愛的狗狗）✅
7. [SEO：搜尋引擎最佳化(Search Engine Optimization)](/SEO-Search-Engine-Optimization)
8. [剩下的一些小工具](/NexT-some-cool-tools)
9. [自訂網域](/Hexo-NexT_custom_domain)
