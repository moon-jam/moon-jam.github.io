---
title: '404 Not Found！'
comments: false
permalink: /404.html
---

<div style="text-align: center">
  <h1 itemprop="name headline" class="post-title" style="font-size: 27pt; margin-bottom: 6pt;">404 Not Found！</h1>
  本連結已失效，預計將在 <span id="timeout">5</span> 秒後返回 <a href="/">首頁</a>
  <img src="./images/404.png" style="width: 70%; text-align: center">
</div>

{% raw %}
<script>

document.addEventListener("DOMContentLoaded", function() {
  let countTime = 5;

  function count() {
    const timeoutElement = document.getElementById('timeout');
    if (timeoutElement) {
      timeoutElement.textContent = countTime;
      countTime -= 1;
      if (countTime === 0) {
        location.href = '/';
      } else {
        setTimeout(count, 1000);
      }
    }
  }

  document.querySelectorAll('.post-header').forEach((element) => {
    element.style.display = 'none';  // 隱藏而不移除
  });
  document.querySelectorAll('.post-block').forEach((element) => {
    element.style.display = 'block';  // 確保它是可見的，避免影響結構
  });

  count();
});

</script>
{% endraw %}
