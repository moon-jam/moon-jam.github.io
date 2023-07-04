---
title: '404 - 真巧，竟然在這裡遇到你！'
comments: false
permalink: /404.html
---

## 這是一個不存在的頁面

很抱歉，目前這個連結已經失效

預計將在約 <span id="timeout">5</span> 秒後返回首頁。

如果你很急著想看文章，你可以 **[點這裡](/)** 返回首頁。

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