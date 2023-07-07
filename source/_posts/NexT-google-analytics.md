---
title: "還沒做好\U0001F625，稍等一下\U0001F64F"
lang: zh-TW
hidden: true
abbrlink: 43213
date:
tags:
categories:
description:
---

火速趕稿中...

預計將在約 <span id="timeout">5</span> 秒後返回首頁。

如果你想看其他文章，你可以 **[點這裡](/)** 返回首頁。

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
