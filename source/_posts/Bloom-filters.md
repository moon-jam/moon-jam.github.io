---
title: Bloom filters 簡介
tags:
  - Data Structure
  - Bloom filters
  - 資料結構
categories:
  - 資料結構
abbrlink: 62941
date: 2026-01-04 00:00:00
lang:
---

## 前言

> 先備知識：Hash

這是一個類似 集合 (set) 的資料結構，他可以用來一個元素是否在集合中，他有可能會有 False Positive 的情況，但不會有 False Negative 的情況。

| 實際情況 / 回傳值 | 在集合中       | 不在集合中     |
| ----------------- | -------------- | -------------- |
| 在集合中          | True Positive  | False Negative |
| 不在集合中        | False Positive | True Negative  |

後文會詳細說明此資料結構的細節。

<!--more-->

## What is it

我覺得可以說 Bloom Filter 算是一種處理 Hash Collision 的方法，不過他不犧牲了 Hash Table 可以索引到實際的值特性，他只會告訴你這個值「可能」在集合中，或「一定不在」集合中。

過去在處理碰撞時，會用 Chaining 或 Open Addressing，並且一定要把實際的值存起來，但 Bloom Filter 則是用一個位元陣列 (bit array) ，利用多個 Hash Function 把值映射到位元陣列的不同位置，並把這些位置設為 1，就像個篩網一樣，當你要查詢一個值時，你會用同樣的 Hash Function 去計算這個值應該映射到位元陣列的哪些位置，然後檢查這些位置是否都是 1，因此，如果有任何一個位置是 0，那麼這個值「一定不在」集合中；但如果所有位置都是 1，也不一定代表值在集合中，以下是個簡單的例子：

假設我們有一個位元陣列長度為 10，並且有兩個 Hash Function：

- Hash1(x) = (sum of ASCII values of characters in x) % 10
- Hash2(x) = (length of x * 7) % 10
- 我們要加入 "cat" 和 "dog" 兩個元素。
- 對於 "cat"：
  - Hash1("cat") = (99 + 97 + 116) % 10 = 312 % 10 = 2
  - Hash2("cat") = (3 * 7) % 10 = 21 % 10 = 1
  - 我們將位元陣列的第 1 和第 2 個位置設為 1。
- 對於 "dog"：
  - Hash1("dog") = (100 + 111 + 103) % 10 = 314 % 10 = 4
  - Hash2("dog") = (3 * 7) % 10 = 21 % 10 = 1
  - 我們將位元陣列的第 1 和第 4 個位置設為 1。
  - 此時，位元陣列看起來像這樣： [0, 1, 1, 0, 1, 0, 0, 0, 0, 0]
  - 現在我們要查詢 "cat" 和 "bat"：
- 對於 "cat"：
  - Hash1("cat") = 2
  - Hash2("cat") = 1
  - 位元陣列的第 1 和第 2 個位置都是 1，所以我們可以說 "cat" 可能在集合中。
- 對於 "bat"：
  - Hash1("bat") = (98 + 97 + 116) % 10 = 311 % 10 = 1
  - Hash2("bat") = (3 * 7) % 10 = 21 % 10 = 1
  - 位元陣列的第 1 和第 1 個位置都是 1，所以我們也可以說 "bat" 可能在集合中，但實際上 "bat" 並沒有被加入集合中，這就是 False Positive 的例子。

## 怎麽樣能儘可能避免 False Positive

{% note info%}
定義符號

- $m$: 位元陣列的大小 (bit array size)
- $B = \{b_i\}_{i=0}^{m-1}$: 位元陣列 (bit array)
- $U$: 所有可能的元素集合 (universe of all possible elements)
- $S\subseteq U$: 所有要加入的元素集合 (set of elements to be added)
- $k = |S|$: 集合 $S$ 中的元素個數 (number of elements in set $S$)
- $f_1, f_2, \cdots, f_h: U\to (\mathbb{Z} \cap [0, m-1])$: 有 $h$ 個 Hash Function，從集合 $S$ 映射到位元陣列的索引，並這些 Hash Function 都是是獨立且均勻分佈的
- $P(A)$: 事件 $A$ 發生的機率 (probability of event $A$)
{% endnote %}

對於任意一個 元素 $e\in U$，任意一個整數 $i\in[0, m-1]$，任意一個 Hash Function $f_j,\ j\in[1, h]$，有

$$P(f_j(e) = i) = \frac{1}{m}$$

則

$$P(f_j(e) \neq i) = 1 - \frac{1}{m}$$

則對於任意一個 元素 $e\in U$，任意一個整數 $i\in[0, m-1]$，由於所有 hash function 都是各自獨立且均勻分佈的，所以有

$$P(\forall j\in[1, h],\ f_j(e) \neq i) = \prod_{j=1}^{h} P(f_j(e) \neq i) = (1 - \frac{1}{m})^h$$

則將所有在 $S$ 中的元素插入 $B$ 後 ( $|S|=k$ )，對於任意一個整數 $i\in[0, m-1]$，有

$$P(b_i = 0) = P(\forall e\in S, \forall j\in[1, h],\ f_j(e) \neq i) = (1 - \frac{1}{m})^{hk}$$

$$P(b_i = 1) = 1 - P(b_i = 0) = 1 - (1 - \frac{1}{m})^{hk}$$

若是查詢任意 $e \in U \setminus S$，則有

$$P(\text{False Positive}) = P(\forall j\in[1, h], b_{f_j(e)} = 1) = \prod_{j=1}^{h} P(b_{f_j(e)} = 1) = (1 - (1 - \frac{1}{m})^{hk})^h$$

想找到一個 $h$ 使得 $P(\text{False Positive})$ 最小，最直觀的方式是對 $h$ 求導數，並令其為 0，但因爲這個式子過於複雜，這邊改用近似的方式來求解，而且反正 $h$ 必須是整數，所以稍微差一點也不會有太大的影響。

我們假設 $m$ 很大，因此

$$\lim_{m\to\infty} (1 - \frac{1}{m})^{hk} = lim_{m\to\infty} [(1 - \frac{1}{m})^m]^{\frac{hk}{m}} = e^{-\frac{hk}{m}}$$

令 $p = e^{-\frac{hk}{m}}$,  $p\in(0,1)$ ，則 $h = \frac{-m}{k}\ln{p}$ 

因爲 $P(\text{False Positive}) > 0$ 則當其有最小值時，若且唯若 $\ln{(P(\text{False Positive}))}$ 有最小值 (因爲 $\ln{x}$ 在 $\mathbb{R}^+\to\mathbb{R}$ 上是嚴格遞增的)

則，我們只要找 $h$ 使得 $\ln{(P(\text{False Positive}))} = h \ln{(1 - p)}$ 有最小值

$$h \ln{(1 - p)} = \frac{-m}{k}(\ln{p}) (\ln{(1 - p)})$$

對 $p$ 求導數，並令其為 0：

$$\frac{d}{dp} [\frac{-m}{k}(\ln{p}) (\ln{(1 - p)})] =  \frac{-m}{k}(\frac{\ln{p}}{p-1} + \frac{\ln{(1 - p)}}{p}) = 0$$

$$\Rightarrow (1-p)\ln{(1-p)} - p \ln{p} = 0$$

$$\text{Clearly, when } p = \frac{1}{2}, \text{ the equation holds}$$

但我們需要確認在 (0,1) 中沒有其他解：

Let $g(p) = (1-p)\ln{(1-p)} - p \ln{p}$

Then, $g'(p) = \frac{-1}{1-p} - \ln{(1-p)} - \ln{p} - 1 < 0$ (Since each term is negative for $p\in(0,1)$)

所以 $g(p)$ 在 (0,1) 上是嚴格遞減的，而 $g(\frac{1}{2}) = 0$，所以在 (0,1) 上沒有其他解使得 $g(p) = 0$。

也因此

$$\frac{-m}{k}(\ln{p}) (\ln{(1 - p)}) = \frac{-m}{k(1-p)(p)} g(p)$$

是嚴格遞增的（因爲 $\frac{-m}{k(1-p)(p)} < 0$ 且 $g(p)$ 是嚴格遞減的），所以 $p = \frac{1}{2}$ 時，$\frac{-m}{k}(\ln{p}) (\ln{(1 - p)})$ 有最小值。

因此在 $m$ 足夠大的情況下，當 $p = \frac{1}{2}$ 時，$P(\text{False Positive})$ 有最小值。

而 $h = \frac{-m}{k}\ln{p} = \frac{m}{k}\ln{2}$ 但 $h$ 是整數，所以我們應該各自測試 $\lfloor \frac{m}{k}\ln{2} \rfloor$ 和 $\lceil \frac{m}{k}\ln{2} \rceil$ 看哪個 False Positive 機率較低。

{% note info %}
### 結論

- 在位元陣列大小為 $m$，且有 $k$ 個元素要加入集合的情況下，當 $m$ 足夠大時， False Positive 機率約為 $(1-e^{-\frac{hk}{m}})^h$，或者更準確地說，是 $(1-(1-\frac{1}{m})^{hk})^h$。
- 選擇 $h = \frac{m}{k}\ln{2}$ 個 Hash Function，可以使得 False Positive 的機率最小，但因爲 $h$ 必須是整數，所以應該各自測試 $\lfloor \frac{m}{k}\ln{2} \rfloor$ 和 $\lceil \frac{m}{k}\ln{2} \rceil$ 哪個 False Positive 機率較低。
{% endnote %}

## 總結

這篇文章介紹了 Bloom Filter 這個資料結構，並且詳細說明了它的運作原理以及如何選擇 Hash Function 的數量以最小化 False Positive 的機率。Bloom Filter 在許多應用中非常有用，特別是在需要快速查詢元素是否存在於大型集合中時。希望這篇文章能幫助你更好地理解 Bloom Filter 及其應用。

## 參考資料

- [Bloom filter - Wikipedia](https://en.wikipedia.org/wiki/Bloom_filter)
- [資料結構大便當：Bloom Filter](https://medium.com/@Kadai/%E8%B3%87%E6%96%99%E7%B5%90%E6%A7%8B%E5%A4%A7%E4%BE%BF%E7%95%B6-bloom-filter-58b0320a346d)
