---
title: 機率與統計筆記
tags:
  - 數學
  - 機率
  - 統計
  - 筆記
categories:
  - 數學
abbrlink: 1
date: 2026-04-16T22:53:26+08:00
lang: zh-TW
---

## 機率學的基本語彙[^1]

- 樣本空間（sample space）：是指某實驗中所有可能結果形成的集合。通常將其以 $\Omega$ 表示。其中元素則以 $\omega$ 表示。
- 事件（Event）：樣本空間 $\Omega$ 之子集合。其代表滿足特定條件之樣本點組合。
- 試驗（Trial）：對於任意事件 $A \subseteq \Omega$，單次試驗之結果 $\omega$ 必定滿足：

  $$\omega \in A \quad \text{或} \quad \omega \notin A$$

  意即該事件 $A$ 在該次試驗中為「發生」或「不發生」。

<!--more-->

- 機率函數（Probability Function）：對於事件 $A$，Probability of $A$ $\equiv P(A) = \frac{\text{Ways A can Happen}}{\text{of things that can happen}}$
  - 對於任意事件 $A, B$，機率函數滿足以下公理
    1. $P(A) \geq 0$
    2. $P(\Omega) = 1$
    3. $A\cap B=\emptyset \Rightarrow P(A\cup B) = P(A)+P(B)$
  - 可由上面的公理推導出
    1. $P(\emptyset) = 0$，因為 $A\cap \emptyset = \emptyset \Rightarrow P(A) = P(A\cup \emptyset) = P(A) + P(\emptyset)$。
    2. $P(A)=1-P(A^c)$，因為 $A\cap A^c=\emptyset,\ A\cup A^c=\Omega \Rightarrow 1 = P(\Omega) = P(A\cup A^c) = P(A) + P(A^c)$。
    3. $P(A\cup B) = P(A) + P(B) - P(A\cap B)$。
    4. $B \subseteq A \Rightarrow P(B) \leq P(A)$，因為 $A = B \cup (A\cap B^c),\ B\cap (A\cap B^c) = \emptyset \Rightarrow P(A) = P(B) + P(A\cap B^c) \geq P(B)$。
- 其他可以再參考我過去寫的高中數學[排列](https://moon-jam.me/gsat_math_proof/#排列)、[組合](https://moon-jam.me/gsat_math_proof/#組合)、[機率](https://moon-jam.me/gsat_math_proof/#機率古典機率條件機率期望值)、[資料分析](https://moon-jam.me/gsat_math_proof/#數據分析)

## PMF vs. PDF vs. CDF

{% gp 02x1 %}
![PMF-CDF](https://raw.githubusercontent.com/moon-jam/BlogPictures/main/pmf-cdf.svg)
![PDF-CDF](https://raw.githubusercontent.com/moon-jam/BlogPictures/main/pdf-cdf.svg)
{% endgp %}

- PMF: Probability Mass Function 代表的是一個**離散型隨機變數**等於某個**特定數值**的機率
- CDF: Cumulative Distribution Function 代表當變數 $\leq x$ 時的機率
- PDF: Probability Density Function 代表的是連續型隨機變數，曲線上的數值不是直接表示機率，可以想成 x 發生在 [a, b] 的機率就是 PDF 函數從 a 到 b 的積分，而這可以用 CDF 快速的算出

## 均勻分布

均勻分布 $X \sim Uniform(a, b)$ 的意思是：$X$ 在 $[a,b]$ 這個範圍內的機率密度完全相等。
PDF 就是一條水平線：

$$f(x) = \frac{1}{b-a}, \quad a \leq x \leq b$$

## Binomial Distribution (二項式分布)

- n 個事件皆有 p 的機率發生，有 k 個事件發生的機率是：$C^n_k \cdot p^k \cdot (1-p)^{n-k}$

$$
\begin{align*}
E[X] &= \sum_{k=0}^{n} k \cdot C^n_k \cdot p^k \cdot (1-p)^{n-k} \\
&= \sum_{k=1}^{n} \frac{n!}{(k-1)!(n-k)!} \cdot p^k \cdot (1-p)^{n-k} \\
&= np \sum_{k=1}^{n} C^{n-1}_{k-1} \cdot p^{k-1} \cdot (1-p)^{n-k} \\
&= np \sum_{j=0}^{n-1} C^{n-1}_{j} \cdot p^{j} \cdot (1-p)^{n-1-j} \\
&= np
\end{align*}
$$

- $$\begin{align*}
  E[X(X-1)] &= \sum_{k=0}^{n} k(k-1) \cdot C^n_k \cdot p^k \cdot (1-p)^{n-k} \\
  &= \sum_{k=2}^{n} \frac{n!}{(k-2)!(n-k)!} \cdot p^k \cdot (1-p)^{n-k} \\
  &= n(n-1)p^2 \sum_{k=2}^{n} C^{n-2}_{k-2} \cdot p^{k-2} \cdot (1-p)^{n-k} \\
  &= n(n-1)p^2
  \end{align*}$$
- $$\begin{align*}
  Var[X] &= E[X^2] - E[X]^2 \\
  &= E[X(X-1)] + E[X] - E[X]^2 \\
  &= n(n-1)p^2 + np - n^2p^2 \\
  &= n^2p^2 - np^2 + np - n^2p^2 \\
  &= np(1-p)
  \end{align*}$$

## Poisson Distribution (卜瓦松分布)

- 給定某一事件在一固定時間內會平均地發生 $\lambda$ 次（期望值為 $\lambda$）
- 則該事件在該固定時間發生 $k$ 次的機率為：$\frac{\lambda^k e^{-\lambda}}{k!}$
- 而發生次數的分布，期望值為：$\lambda$，變異數為：$\lambda$
- 情境：某路口每小時平均有 3 輛車闖紅燈，假設符合卜瓦松分布。請問某小時內剛好有 k 輛車闖紅燈的機率是多少
- 將該固定時間分割為 $n$ 等分，每 $1/n$ 段時間發生該事件的次數期望值皆為 $\frac{\lambda}{n}$
- 我們可以假設每段 $1/n$ 時間內最多發生一次（當 n 夠大時，每段時間極短，同一小段內發生兩次以上的機率趨近 0），則期望值 $\frac{\lambda}{n}$ 就可作為 **發生一次的機率**，因為只有可能是發生一次或不發生，所以就能視為二項分布，在這 $n$ 次的伯努利試驗中，發生 $k$ 次的機率是：$C^n_k\cdot (\frac{\lambda}{n})^k\cdot (1-\frac{\lambda}{n})^{n-k}$
- 我們考慮 $n\to \infty$ ，可推得
- $$
  \begin{align*}
  \lim_{n\to \infty}C^n_k\cdot (\frac{\lambda}{n})^k\cdot (1-\frac{\lambda}{n})^{n-k}
  &= \lim_{n\to \infty}\frac{n(n-1)\cdots(n-k+1)}{k!}\frac{\lambda^k}{n^k} (1-\frac{\lambda}{n})^{n-k} \\
  &= \lim_{n\to \infty}\frac{\lambda^k}{k!}(1-\frac{\lambda}{n})^{n-k} \\
  &= \frac{\lambda^k}{k!}\lim_{n\to \infty}(1-\frac{\lambda}{n})^{n} \\
  &= \frac{\lambda^k}{k!}e^{-\lambda}
  \end{align*}
  $$
- 期望值 $E[X]$（雖然這可以直接 by definition 不過還是可以倒推回來驗證一下）
- $$
  \begin{align*}
  E[X] &= \sum_{k=0}^{\infty}k \cdot \frac{\lambda^k}{k!}e^{-\lambda} \\
  &= e^{-\lambda}\cdot \sum_{k=1}^{\infty}\frac{\lambda^k}{(k-1)!} \\
  &= e^{-\lambda}\cdot \lambda \cdot \sum_{k=1}^{\infty}\frac{\lambda^{k-1}}{(k-1)!} \\
  &= e^{-\lambda}\cdot \lambda \cdot e^{\lambda} \\
  &= \lambda
  \end{align*}
  $$
- 變異數 $Var[X] = E[X^2] - E[X]^2$
- $$
  \begin{align*}
  E[X^2] &= \sum_{k=0}^{\infty}k^2 \cdot \frac{\lambda^k}{k!}e^{-\lambda} \\
  &= e^{-\lambda}\cdot \sum_{k=1}^{\infty}(k(k-1)+k)\frac{\lambda^k}{k!} \\
  &= e^{-\lambda}\cdot \left(\sum_{k=2}^{\infty}\frac{\lambda^k}{(k-2)!}+\sum_{k=1}^{\infty}\frac{\lambda^k}{(k-1)!}\right) \\
  &= e^{-\lambda}\cdot \lambda^2 \cdot \sum_{k=2}^{\infty}\frac{\lambda^{k-2}}{(k-2)!} + e^{-\lambda}\cdot \lambda \cdot \sum_{k=1}^{\infty}\frac{\lambda^{k-1}}{(k-1)!} \\
  &= e^{-\lambda}\cdot \lambda^2 \cdot e^{\lambda} + e^{-\lambda}\cdot \lambda \cdot e^{\lambda} \\
  &= \lambda^2 + \lambda
  \end{align*}
  $$
- $$Var[X] = \lambda^2+\lambda-\lambda^2 = \lambda$$

## 指數分布

- 與卜瓦松分布相對，在同樣情境下（給定某一事件在一固定時間內會平均地發生 $\lambda$ 次），兩個事件的間隔時間期望值會是 $\frac{1}{\lambda}$，變異數是 $\frac{1}{\lambda^2}$，標準差是 $\frac{1}{\lambda}$
- 情境：如果某路口平均每小時 3 輛車闖紅燈，那麼兩輛車闖紅燈之間的等待時間會是什麼分布？
- 可以用卜瓦松分布算出來，上面的情境就表示在時間 0 到 t 小時內，一輛車都沒有出現。（t 小時內平均出現 $t\lambda$ 台車）
- $P(X>t) = (t \lambda)^0/0! \cdot e^{-t \lambda} = e^{-\lambda t}$
- 則 $P(X \leq t) = 1 - e^{-\lambda t}$
- 對 $t$ 微分就得到 PDF：$f(t) = \lambda e^{-\lambda t},\ t \geq 0$
- $$E[X] = \int_0^{\infty} x \cdot \lambda e^{-\lambda x} dx = \left[x \cdot (-e^{-\lambda x})\right]_0^{\infty} - \int_0^{\infty} -e^{-\lambda x} dx = 0 - \left[\frac{e^{-\lambda x}}{-\lambda}\right]_0^{\infty} = 0 - \frac{1}{\lambda} \cdot(0-1)= \frac{1}{\lambda}$$
- $$\begin{align*}
  E[X^2]
  &= \int_0^{\infty} x^2 \cdot \lambda e^{-\lambda x} dx \\
  &= \left[x^2 \cdot (-e^{-\lambda x})\right]_0^{\infty} - \int_0^{\infty} 2x \cdot (-e^{-\lambda x}) dx \\
  &= 0 + \frac{2}{\lambda}\int_0^{\infty} x \cdot \lambda e^{-\lambda x} dx \\
  &= \frac{2}{\lambda} \cdot E[X] \\
  &= \frac{2}{\lambda^2}
  \end{align*}$$
- $$Var[X] = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac{1}{\lambda^2}$$

## 常態分布

$$f(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$
可以在標準化後直接查表[^2]看機率分布
$$Z = \frac{X - \mu}{\sigma}$$

兩個常態分布的線性組合：
如果 $X \sim N(\mu_X, \sigma_X^2)$ 和 $Y \sim N(\mu_Y, \sigma_Y^2)$ 獨立，令 $T = aX + bY$，則：

$$T \sim N(a\mu_X + b\mu_Y,\ a^2\sigma_X^2 + b^2\sigma_Y^2)$$

也就是說，獨立常態分布的線性組合還是常態分布，期望值和變異數分別按係數疊加。

## 聯合機率分布

當有兩個隨機變數 X 和 Y，若我們不只想知道「X 等於某個值的機率」或「Y 等於某個值的機率」，而是想知道「X 和 Y 同時等於某個組合的機率」時聯合機率分布就是描述這件事的工具。
例如：X 是今天的氣溫，Y 是今天的濕度，f(x,y) 就是「氣溫是 x 且濕度是 y」同時發生的機率。

通常題目中會給出類似這樣的式子 $f(x,y) = m(x^2+y)$ 這是直接用數學式定義兩個變數同時發生的機率規律，以這個例子來說就是：X 和 Y 同時出現某個組合 $(x,y)$ 的機率，跟 $x^2+y$ 這個值成正比，而 $m$ 是一個待定常數，目的是讓所有可能的組合機率加起來等於 1，可以看看後面離散型與連續型聯合分布的敘述可能會更瞭解這邊代表的意義。

### 離散型聯合分布

- 適用情境：X 和 Y 只能取有限個或可數個值，例如骰子點數、人數、次數。
- $f(x,y)$ 表示 X=x 且 Y=y 同時發生的機率。
- 條件：$f(x,y) \geq 0$，且 $\sum_x \sum_y f(x,y) = 1$
- 可以將分布化作一張表格：
$$\begin{array}{|c|c|c|c|} \hline & x=1 & x=2 & x=3 \\ \hline y=-1 & f(1,-1) & f(2,-1) & f(3,-1) \\ \hline y=0 & f(1,0) & f(2,0) & f(3,0) \\ \hline y=1 & f(1,1) & f(2,1) & f(3,1) \\ \hline \end{array}$$

- 邊際分布：如果你只關心 X，不管 Y 是多少，就把每一 column 加總：
$$f_X(x) = \sum_y f(x,y)$$
- 例如 $f_X(2) = f(2,-1) + f(2,0) + f(2,1)$，就是表格裡 x=2 那個 column 全部加起來。
- 條件分布：已知 X=2，Y 的分布是什麼？就是只看 x=2 那欄，但要讓機率加起來等於 1，所以最後除以 $f_X(2)$：
 $$f_{Y|X=x}(y) = \frac{f(x,y)}{f_X(x)}$$
- 條件期望值：已知 X=x 之後，Y 的期望值：
 $$E[Y|X=x] = \sum_y y \cdot f_{Y|X=x}(y)$$
- 獨立性：X 和 Y 獨立 $\Leftrightarrow$ $f(x,y) = f_X(x) \cdot f_Y(y)$ 對所有組合都成立。

### 連續型聯合分布

- 適用情境：X 和 Y 可以取連續的值，例如身高與體重、時間與距離。
- 單點機率永遠是 0，只有「範圍內」的機率有意義，所以用積分代替加總。
- 條件：$f(x,y) \geq 0$，且 $\int\int f(x,y)\,dx\,dy = 1$
- 積分範圍由題目的 domain 決定，沒有固定形式，每題都要先看清楚 x 和 y 的範圍關係。例如 $0 < x < y < 1$ 是三角形區域，x 的上界不是 1 而是 y；$0 < x < 1, 0 < y < 1$ 才是正方形區域。
- 邊際分布：把不關心的變數積掉，注意積分上下界要根據 domain 設定：
 $$f_X(x) = \int f(x,y)\,dy$$
- 條件分布：
 $$f_{Y|X=x}(y) = \frac{f(x,y)}{f_X(x)}$$
- 條件期望值：
 $$E[Y|X=x] = \int y \cdot f_{Y|X=x}(y)\,dy$$
- 獨立性：$f(x,y) = f_X(x) \cdot f_Y(y)$ 對所有 x, y 成立。
- 離散和連續的操作邏輯完全一樣，唯一差別就是加總換成積分，以及積分範圍要根據題目決定。

## Moment Generating Function (MGF)

- $$M(t) = E[e^{tX}]$$
- 可以用來求期望值和變異數，因為
  $$e^{tX} = 1 + tX + \frac{t^2X^2}{2!} + \cdots$$
  $$M(t) = E\left[1 + tX + \frac{t^2X^2}{2!} + \cdots\right] = 1 + tE[X] + \frac{t^2E[X^2]}{2!} + \cdots$$
  因此 $M'(0) = E[X]$，$M''(0) = E[X^2]$，$Var[X] = M''(0) - (M'(0))^2$
- 列出一些常見分布的 MGF：
  - Binomial(n, p): $M(t) = (1-p + pe^t)^n$
  - Poisson($\lambda$): $M(t) = e^{\lambda(e^t - 1)}$
  - Exponential($\lambda$): $M(t) = \frac{\lambda}{\lambda - t},\ t < \lambda$
  - Normal($\mu, \sigma^2$): $M(t) = e^{\mu t + \frac{1}{2}\sigma^2 t^2}$
- 更多可以參考：〈[線代啟示錄：動差生成函數 (上)](https://ccjou.wordpress.com/2013/10/09/動差生成函數-上/)〉、〈[線代啟示錄：動差生成函數 (下)](https://ccjou.wordpress.com/2013/10/15/動差生成函數-下/)〉

## 柴比雪夫不等式

不管分布長什麼樣子，只要知道期望值和變異數，就能估計某個範圍內的機率下界。
$$P(|X - \mu| \geq k\sigma) \leq \frac{1}{k^2}$$
$$P(|X - \mu| < k\sigma) \geq 1 - \frac{1}{k^2}$$

## 卡方分布

如果 $Z \sim N(0,1)$，那麼 $Z^2$ 就是一個自由度為 1 的卡方分布，記作 $\chi^2(1)$。
如果 $Z_1, Z_2, \ldots, Z_k$ 是 k 個獨立的標準常態分布，那麼：
$$\chi^2(k) = Z_1^2 + Z_2^2 + \cdots + Z_k^2$$
期望值和變異數：
$$E[X] = k, \qquad Var[X] = 2k$$
如果從 $N(\mu, \sigma^2)$ 抽 n 個樣本，樣本變異數 $S^2 = \frac{1}{n-1}\sum(X_i - \bar{X})^2$，則：
$$\frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$$

用途：

1. 檢定實際觀測頻率與理論預期頻率之差異程度（將誤差標準化和平方後進行檢定）。
2. 判斷兩個類別變數是否互相獨立。
3. 藉由樣本變異數推估母體波動程度之機率區間。

---

## 延伸閱讀

- [Probability Bootcamp](https://youtube.com/playlist?list=PLMrJAkhIeNNR3sNYvfgiKgcStwuPSts9V)
- [Probability Distributions Clearly Explained Visually (PMF, PDF and CDF)](https://youtu.be/yRbfLlTmPE8)
- 〈[線代啟示錄：# 機率統計](https://ccjou.wordpress.com/category/機率統計/)〉
- [高科大數位統計學 by 李明聰老師](https://elearning.nkust.edu.tw/base/10001/course/10064121/content/public/TM/%E6%95%B8%E4%BD%8D%E7%B5%B1%E8%A8%88%E5%AD%B8202208.pdf)

[^1]: 此處說明參考自：

    - [機率學的基本語彙](https://ccjou.wordpress.com/2016/01/29/%e6%a9%9f%e7%8e%87%e5%ad%b8%e7%9a%84%e5%9f%ba%e6%9c%ac%e8%aa%9e%e5%bd%99/)
    - [Probability Bootcamp](https://youtube.com/playlist?list=PLMrJAkhIeNNR3sNYvfgiKgcStwuPSts9V)

[^2]: 在[高科大數位統計學 by 李明聰老師](https://elearning.nkust.edu.tw/base/10001/course/10064121/content/public/TM/%E6%95%B8%E4%BD%8D%E7%B5%B1%E8%A8%88%E5%AD%B8202208.pdf)最後的附錄有附上各種不同的表供計算不同機率分布時方便計算
