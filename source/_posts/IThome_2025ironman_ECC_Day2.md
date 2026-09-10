---
title: "[ECC 橢圓曲線密碼學：30 天從入門到入土] 橢圓曲線數學基礎"
tags:
  - IThome 2025 鐵人賽
  - CTF
  - 資安
  - 密碼學
  - ECC
categories:
  - IThome 2025 鐵人賽
abbrlink: 24821
date: 2025-09-16
lang:
hidden: true
published: false
---

<!-- > 本文同步刊載於 [[ECC 橢圓曲線密碼學：30 天從入門到入土] 橢圓曲線數學基礎](https://moon-jam.me/IThome_2025ironman_ECC_Day02/) -->

在 [上一篇](https://moon-jam.me/IThome_2025ironman_ECC_Day01/) 了解了橢圓曲線密碼學是在做什麼後，這篇想來說說：

1. 為什麼橢圓曲線要寫成 $y^2 = x^3 + ax + b$，以及這條曲線的條件限制
2. Abelian group（阿貝爾群）是什麼
3. 如何將橢圓曲線上的點構成 Abelian group

<!--more-->

## 橢圓曲線要寫成 $y^2 = x^3 + ax + b$，以及這條曲線的條件限制

數學上「橢圓曲線」並不是長得像橢圓的曲線，而是一種特殊形式的三次曲線。  
標準定義是：

$$
y^2 = x^3 + ax + b
$$

其中 $a, b$ 是常數，並且要滿足：

$$
4a^3 + 27b^2 \neq 0
$$

這個限制是為了避免曲線出現「奇異點 (singularity)」，像是 cusp 尖點或自交點 (self-intersection)。  
如果曲線有這些問題，就沒辦法建立良好的「加法運算規則」，所以一定要排除。

## Abelian group（阿貝爾群）是什麼

再說 Abelian group 前，我們需要先知道群是什麼，一個「群」是某個集合加上一個運算，我們這邊就把 `+` 當作那個運算符號好了，一個群需要滿足：

1. 封閉性：集合裡的元素互相運算，結果還在集合裡。
2. 結合律：$(a+b)+c=a+(b+c)$。
3. 單位元素：有一個元素 $e$，滿足 $a+e=a$。
4. 反元素：每個元素 $a$ 都有 $-a$，滿足 $a+(-a)=e$。

如果再加上：
5. 交換律：$a+b=b+a$。
那就是 Abelian group。

## 如何將橢圓曲線上的點構成 Abelian group

### 加法規則（弦切法）

1. 取曲線上兩點 $P$ 和 $Q$，畫一條直線。
2. 它會和曲線相交於第三點 $R$。
3. 定義 $P+Q$ 為 $R$ 關於 $x$ 軸的對稱點。

特例：
- 當 $P=Q$，使用切線而不是割線。
- 當直線垂直於 $x$ 軸，定義結果為「無窮遠點」 $O$，它就是單位元素。

這樣定義的加法滿足群的四大公理，而且還是 Abelian。

### 為什麼奇異點 ( $\Delta = 0$ ) 會有問題

在 cusp 上，切線不唯一 → $P+P$ 無法定義。

在 node 上，切線有兩條 → $P+P$ 有多種可能結果。

所以群結構失效。

這正是前面判別式條件的用意：保證曲線光滑，弦切法才能良好運作。

## 參考資料

1. Wikipedia: [Elliptic curve](https://en.wikipedia.org/wiki/Elliptic_curve)
2. Wikipedia: [Group theory](https://en.wikipedia.org/wiki/Group_theory)

<!-- > 本文同步刊載於 [[ECC 橢圓曲線密碼學：30 天從入門到入土] 橢圓曲線數學基礎](https://moon-jam.me/IThome_2025ironman_ECC_Day02/) -->
