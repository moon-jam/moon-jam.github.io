---
title: 還沒做好😥，稍等一下🙏
lang: zh-TW
date: 
tags:
categories:
hidden: true
sticky: false
top: false
---
<!--more-->
火速趕稿中...

預計將在約 <span id="timeout">5</span> 秒後返回上一頁。

如果你想看其他文章，你可以 **[點這裡](/)** 返回首頁。

<script>
let countTime = 5;

function count() {
  document.getElementById('timeout').textContent = countTime;
  countTime -= 1;
  if(countTime === 0){
    history.back(); // 記得改成自己網址 Url
  }
  setTimeout(() => {
    count();
  }, 1000);
}

count();
</script>
