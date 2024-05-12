---
tags: 
  - null
categories:
  - null
abbrlink: 2
date: 2024-05-11 00:00:00
title: 在note中的note會造成Mathjax渲染問題(Adding a note within a note causes Mathjax rendering issues)
lang:
hidden: true
---

## Example

<span id="inline-blue">程式(Code)</span>

```markdown
{% note info %}
這邊的數學式是正常的  
The math expression here can be correctly rendered.  
$E=mc^2$
{% note default %}
這邊數學式是壞的  
The math expression here can not be correctly rendered.  
$E=mc^2$
{% endnote %}
{% endnote %}
```

<span id="inline-blue">成果(Result)</span>

{% note info %}
這邊的數學式是正常的  
The math expression here can be correctly rendered.  
$E=mc^2$
{% note default %}
這邊數學式是壞的  
The math expression here can not be correctly rendered.  
$E=mc^2$
{% endnote %}
{% endnote %}
