---
title: '404 Not Found！'
comments: false
permalink: /404.html
---

## 這是一個不存在的頁面

很抱歉，目前這個連結已經失效。

若是由本網站其他文章中點擊連結過來，有可能是因本人疏失導致，可以先透過搜尋相關關鍵字找到您想要的文章，如果方便的話也麻煩請您在該網站底下留言，告訴我哪裡有問題，讓我的網站變得更好，非常抱歉造成您的不便。

預計將在約 <span id="timeout">5</span> 秒後返回首頁。

如果你想看文章，你可以 **[點這裡](/)** 返回首頁。

<script>
let countTime = 5;

function count() {
  document.getElementById('timeout').textContent = countTime;
  countTime -= 1;
  if(countTime === 0){
    location.href = '/'; // 記得改成自己網址 Url
  }
  setTimeout(() => {
    count();
  }, 1000);
}

count();
</script>
