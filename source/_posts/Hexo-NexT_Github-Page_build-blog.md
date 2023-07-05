---
title: 利用 Hexo + NexT + Github Page 建立自己的 Blog
lang: zh-TW
tags:
  - Hexo
  - NexT
categories:
  - 中文
  - 教學文
abbrlink: 19590
date: 2023-07-05 00:00:00
# hidden: true
description: "利用 Hexo + NexT + Github Page 建立自己的 Blog"
---

## 前言

我的Blog就是用Hexo、NexT、Github Page做出來的，而且不同其他架Blog的那種網站，做出來之後你的Blog後面會有一個github.io的後綴（就像[moon-jam.github.io](https://moon-jam.github.io)），看起來就很厲害，趁昨天剛做完打第一篇教學文，這東東其實蠻簡單的，很快就有成品了
~~不過要是你想裝一些酷酷的東西，就有可能搞很久(最後還是有些沒用出來QAQ~~

如果想要看詳細一點的教學我覺得六角學院的教學影片很棒，跟著做很快就好了，如果覺得我現在的Blog哪裡還可以修正，或是覺得我教學哪裡有問題歡迎在底下留言指教喔～
教學開始嘍！
注意事項：這個教學會需要用到vscode，如果不知道他是什麼或是跟他不熟的，建議先去爬爬文看怎麼用再來看這篇喔～

## 建構Hexo

需要先裝[Node.js](https://nodejs.org/en)還有[Git](https://git-scm.com/downloads)
然後從vscode開一個資料夾，並在terminal打下面這些

``` no
npm install hexo-cli -g
hexo init blog_folder_name  //要換成你自己的資料夾名稱
cd blog_folder_path         //要換成你自己的資料夾路徑
npm install
hexo s
```

然後就會看到你的網頁跑出來了

## 連接Github

首先先到github新開一個 Repository
![Image](https://i.imgur.com/yadvxfF.png)
然後取名叫做**username**.github.io （username要改成你自己的，如果要開更多網站的話可以取其他名字，但後面有地方要小改一點  
選public，然後其他都不要打勾，完成之後複製這一段
![Image](https://i.imgur.com/XwrVZEQ.png)
然後接下來就要把資料夾跟Github連上，輸入以下這些東西

``` no
git init
git add.
git commit -m "git init"

git remote add origin Repository_url //Repository_url換成剛剛複製的那個
git push -u origin master
```

接著到最外層的資料夾應該會看到一個_config.yml，點進去，然後找到deploy，並修改成下面這樣

``` yml
deploy:
  type: git
  repo: Repository_url //剛剛複製的那個
  branch: master
```

這裡要注意一下如果剛剛你Repository名字不是叫username.github.io，要改成這樣子

``` yml
deploy:
  type: git
  repo: Repository_url //剛剛複製的那個
  branch: gh-pages
```

此外如果你Repository名稱自己取的話還要找到relative_link，並設定為true

```yml
relative_link: true
```

最後就可以部署到github上去了

``` no
npm install hexo-deployer-git --save
hexo d
```

完成之後你打開username.github.io，應該就會看到你的網頁了🎉（Repository名稱自己取的則是開啟username.github.io/**Repository_name**）

接下來就可以開始寫部落格了，接下來就來講應該如何新建一片文章，是用markdown語法編輯，如果不熟的可以自己去找找文章，網路上蠻多教學的  

``` no
hexo new title //會在source資料夾裡面產生一篇檔名叫做title的檔案，使用markdown語法編輯
```

完成之後就連打下面三行，就會發現你新的文章已經出現在網站上了(如果還沒的話就在等一下，他可能還要一些時間，或者你可以在terminal打```hexo s```，就可以在本地看到網站摟)

``` no
hexo cl //clean 刪掉之前的內容，不刪有時候也可以，但有可能會報錯
hexo g  //generate 建立網站
hexo d  //deploy 部署到github page
```

然後如果要傳到github上，每次都要```git commit -m ""```、```git push```實在太累了，這邊我蠻推薦裝[vscode的插件](https://marketplace.visualstudio.com/items?itemName=KnisterPeter.vscode-github)連到Github，可以直接一鍵上傳

## 套上主題

我是選擇[NexT](https://theme-next.js.org)，版型相當的好看，而且很多人用，要找資源也還算好找
![image](https://user-images.githubusercontent.com/16272760/63487983-da41b080-c4df-11e9-951c-64883a8a5e9b.png)

### 下載 NexT

``` no
git clone https://github.com/theme-next/hexo-theme-next themes/next
```

接著到到_config.yml找theme，並設成next

``` yml
theme: next
```

再輸入```hexo s```，就看得到摟，部署到網站上就是在輸入上面那三條

### 修改NexT主題

如果要改NexT的主題(就是上面看到的那四種)，可以到```theme/next/_config.yml```，修改裡面的```Scheme Settings```，把想要的取消註解，其他全部註解掉（像我就是使用Gemini）
![Image](https://i.imgur.com/iXejwcC.png)

## NexT調整

這邊我就列出我改的東西跟教學，有興趣的再移過去看摟  

1. 側邊欄

    － [關於、標籤、分類、歸檔](/NexT-sidebar-about-tag-category-archives)  
    － [搜尋](/NexT-sidebar-search)  
    － [切換語言](/NexT-sidebar-switch-lang)  

2. [頁底](/NexT-footer)
3. [utteranc留言板](/NexT-footer)
4. [Google Analytics統計網站資訊](/NexT-google-analytics)
5. [日/夜模式](/NexT-day-night-mode)
6. [live2d角色（就是那隻可愛的狗狗）](/NexT-live2d)

還有一些小小的東西就不列了，有興趣再到底下留言區問

## 心得

這個Blog前前後後大概花了10個小時，大概有七成時間都是在找bug🥲，不過成果還算滿意😀。

期間為了要有一些更酷的功能，所以又找了很多的擴充，然後遇到好多奇怪的狀況，debug了好久，然後還是有些做不出來，像是那個同一站內切換語言，我看有人做出來，想說應該有插件不會太難，結果我就用了三四個小時有時候切語言只有一半的東西切到，有時候切過去了切不回來，不然就是切過去之後沒有出先該出現的東西，後來實在用不好，所以才變成現在我分成中英兩個站點，然後分兩個地方更新，實在有點麻煩，而且如果要改設定還要改兩次，如果有人知道怎麼用的希望可以在底下跟我說🙏。其實本來還有動態背景跟酷酷的滑鼠爆炸特效，但感覺這樣網站看起來有點小亂，還是簡單一點比較好（枉費我浪費這麼多時間😠

對了我有用一點點SEO優化，不知道哪天我的網站可以在google上被搜尋到。之後不知道會不會想要買一個自己的網域，感覺也很酷。

## 參考資料

這裡面蠻多是別人的部落格，然後就會被發現我跟他們長差不多，就東抄西抄XD  
[Hexo官方網站](https://hexo.io/zh-tw/)  
[【學習筆記】如何使用 Hexo + GitHub Pages 架設個人網誌](https://hackmd.io/@Heidi-Liu/note-hexo-github#【學習筆記】如何使用-Hexo--GitHub-Pages-架設個人網誌)  
[使用 Hexo 建構個人化部落格 (六角學院的教學，基本上就跟著做就完成了)](https://youtu.be/jOJI9ekTzK8)  
[使用 Hexo 建置網站（上面影片的上課講義）](https://paper.dropbox.com/doc/Hexo--7zSMDUvNPffmjdilVv3AA)  
[中國的教學，還蠻詳細的但有點舊有些可能要再查一下](https://blog.csdn.net/as480133937/article/details/100138838)  
[試著學 Hexo - NexT 主題篇 - 可以安裝的套件(他部落格裡面還有很多Hexo的教學)](https://israynotarray.com/hexo/20201003/38607376/)  
[在 Hexo 的 Next 樣板中引入 utterances 的留言區 | GitHub Issue](https://nijialin.com/2021/05/15/hexo-utterances-comment/)  
[這個是用Butterfly做的，做的超猛](https://zsyyblog.com)  
[Hexo Next 8 Language Switch](https://siriusq.top/en/hexo-hext-8-language-switch.html)
