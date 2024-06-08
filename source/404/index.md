---
title: '404 Not Found！'
comments: false
permalink: /404.html
---

<div style="text-align: center">
  <h1 itemprop="name headline" class="post-title" style="font-size: 27pt; margin-bottom: 6pt;">404 Not Found！</h1>
  本連結已失效，預計將在 <span id="timeout">5</span> 秒後返回 [首頁](/)
  <img src="./images/404.png" style="width: 70%; text-align: center">
</div>

<script>
let countTime = 5;

function count() {
  document.getElementById('timeout').textContent = countTime;
  countTime -= 1;
  if(countTime === 0){
    location.href = '/'; 
  }
  setTimeout(() => {
    count();
  }, 1000);
}

window.onload = function() {
  document.querySelectorAll('.post-header').forEach((element) => {
    element.remove();
  });
  document.querySelectorAll('.post-block').forEach((element) => {
    element.classList.remove('post-block');
  });

  count();
}
</script>
