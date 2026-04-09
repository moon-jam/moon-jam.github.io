---
title: 嗨，這是我的第一篇貼文
tags:
  - 貓熊文
categories:
  - [貼文]
  - [貓熊文]
abbrlink: 60607
date: 2026-04-09T22:29:49+08:00
lang: zh-TW
sticky: true
---

貼文是我新創的一個類別，這邊的文章主要會是聊點輕鬆的生活，之後應該就不會出現在首頁上，要點到[貼文](/posts)才能看到，不過搞不好之後我會改變心意讓他也出現在首頁上xd

> 為什麼要多出這個類別呢？

我想要有個輕鬆分享生活的地方，不過又想讓首頁上是一些有主題、實用的內容，因為之前讀到 [Wiwi 官大為](https://wiwi.blog/) 寫說 [為什麼他不用社群媒體了](https://wiwi.blog/blog/why-i-dont-use-social-media) 和 [為什麼要寫部落格](https://blogblog.club/about#為什麼要寫部落格)，覺得相當的有道理，比起分享在社群媒體，我更希望分享的平臺是個能自由決定上面[文字 / 排版](https://wiwi.blog/blog/format-as-rhetoric/) / [圖片](https://wiwi.blog/blog/aspect-ratio)的地方，於是這裡就誕生了。

<div class="panda-marquee" aria-label="panda marquee">
  <span class="nyan-wrap">
    <span class="nyan-char">●________●<br>(。Θ(ェ)Θ。)\/   熊貓出沒中</span><span class="nyan-rainbow"></span>
  </span>
</div>

<style>
.panda-marquee {
  overflow: hidden;
  margin: 1rem 0;
}

.nyan-wrap {
  display: inline-flex;
  align-items: center;
  padding-left: 100%;
  animation: panda-slide 6s linear infinite;
}

.nyan-char {
  display: inline-block;
  line-height: 1.45;
  white-space: nowrap;
  position: relative;
  z-index: 1;
}

.nyan-rainbow {
  display: inline-block;
  flex-shrink: 0;
  width: 160px;
  height: 2.5em;
  margin-left: 3px;
  border-radius: 0 3px 3px 0;
  background: repeating-linear-gradient(
    to bottom,
    #ff4444   0%      16.67%,
    #ff9900   16.67%  33.33%,
    #ffee00   33.33%  50%,
    #44cc00   50%     66.67%,
    #2288ff   66.67%  83.33%,
    #cc44ff   83.33%  100%
  );
  animation: rainbow-glow 1.2s ease-in-out infinite;
  image-rendering: pixelated;
}

@keyframes panda-slide {
  from { transform: translateX(0); }
  to   { transform: translateX(-100%); }
}

@keyframes rainbow-glow {
  0%   { filter: brightness(1)    hue-rotate(0deg); }
  50%  { filter: brightness(1.25) hue-rotate(15deg); }
  100% { filter: brightness(1)    hue-rotate(0deg); }
}

.old-link-demo {
  color: var(--link-color) !important;
  cursor: pointer !important;
  overflow-wrap: break-word !important;
  border-bottom: 1px solid #999 !important;
  outline: 0 !important;
  text-decoration: none !important;
}

.old-link-demo:hover,
.old-link-demo:focus-visible {
  color: var(--link-hover-color) !important;
  border-bottom-color: var(--link-hover-color) !important;
}
</style>

<!--more-->

## 關於我的[貼文頁面](/posts)

當初是因為覺得 Fresh RSS 的介面不錯看 ([RSS 是什麼](https://wiwi.blog/blog/you-should-use-rss))，還有 [Jaron 的貼文頁面](https://www.jaron.tw/blog/)，感覺在後面接個 XX 歲蠻酷的，於是就跟我的助手[^1] 一同完成了這個頁面，我是真的還蠻喜歡的，沒有什麼動畫，簡單，但該有的都有。

[^1]: 我的助手是 Claude Code，但我其實應該要我自己寫的，常常做些小工具都會覺得明明自己應該也能做出來，但卻被 AI 搶走了寫程式的樂趣，還浪費時間在跟 AI 抽卡，錯失了幫自己[點更多技能](https://www.jaron.tw/blog/skill-points/)的機會

![我的 Fresh RSS 介面](https://raw.githubusercontent.com/moon-jam/BlogPictures/main/demo-fresh-rss.mp4)

![我的貼文介面](https://raw.githubusercontent.com/moon-jam/BlogPictures/main/demo-blog-post.mp4)

除此之外，還有蠻多的小改動，調整了[字距、行距](https://wiwi.blog/blog/letter-spacing)和超連結顏色；還有原先我的 RSS 圖片會因為 [Lazy Load](https://github.com/tuupola/lazyload) 顯示不出來，於是[做了些修正](https://github.com/hexojs/hexo-generator-feed/pull/273)；修正因為 PJAX 讓我的 $LaTeX$ 無法成功 render，這些修改都可以直接看我的[部落格 Commit 記錄](https://github.com/moon-jam/moon-jam.github.io/commits/main/?since=2026-04-03&until=2026-04-09)。

## 寫部落格

這個部落格在我 2024 年寫完鐵人賽後就很少更新了，[本來去年也有報名鐵人賽](/IThome_2025ironman_ECC_Day01/)，不過在堅持了一天後就失敗了，我還是很想要分享，但有好多的事情需要忙碌，也很常開了一份文件就一直擱置在那，或者寫一寫就被其他事情打斷或吸引了，像是今天我就寫寫發現我部落格的 `{% raw %}{% details %}{% endraw %}` tag 壞了[^2]，於是又花了不少時間修了這個 bug，就連我這個貼文功能，也被我拖了快一個禮拜才上線。

今天正好看到小胖寫的這篇〈[一場「點技能」的遊戲](https://www.jaron.tw/blog/skill-points/)〉

> 我覺得我需要更好地運用 80/20 法則來進一步優化時間資源的使用——更專注在那些只佔用 20% 的時間，卻創造了 80% 的價值的事上。
> -- Jaron

以我的這個貼文的頁面來講好了，我應該花了很多時間在看我的貼文頁面有什麼地方還可以調整、怎麼樣的行距比較好看、超連結要不要調成另一個顏色等等等，更專注在那 20% （這篇文章的寫作內容），將剩餘的時間拿去寫作業、準備專題等等更值得投入時間的事情上。

## 20 歲了

{% cq %}
好快
{% endcq %}

高中畢業，一轉眼就大二了，這段時間也發生了好多事情，去電機系的實驗室當專題生、轉系、當了一次的 SITCON 行銷組副組長 / 一次組長、遇到了個可愛的人，一切好像轉眼就發生了，來不及仔細回想，就有了下一個要完成的挑戰，我也希望能藉著寫部落格，讓自己能常常停下來想想，在這匆匆忙忙的一天又一天中，我有沒有持續朝著我理想中的目標慢慢前行。

[^2]: 這是利用 [hexo-tag-details](https://github.com/hinastory/hexo-tag-details) 達成以 [Hexo Tag](https://hexo.io/docs/tag-plugins) 的方式完成折疊的格式，但是因為 [hexo-util 的 htmlTag](https://github.com/hexojs/hexo-util?tab=readme-ov-file#htmltagtag-attrs-text-escape) 會將 html escape 導致我的折疊區域變成

    ```html
    <details open="">&lt;summary&gt;程式碼&lt;/summary&gt;</details>
    ```

    如下圖
    ![壞掉的折疊區塊](https://raw.githubusercontent.com/moon-jam/BlogPictures/main/broken_detail.png)
