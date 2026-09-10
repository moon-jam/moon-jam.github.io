---
title: 資料結構筆記
tags:
  - 演算法
  - 資料結構
categories:
  - 筆記
abbrlink: 51715
date: 2025-12-02
lang:
hidden: true
published: false
---

## 前言

大二修了資訊系的 [資料結構](https://class-qry.acad.ncku.edu.tw/syllabus/online_display.php?syear=0114&sem=1&co_no=F720300&class_code=1) 這堂課，複習了許多以前高中時學過的知識，另外因為課程限定只能使用 C 語言，也從中了解到以前直接用的各種 STL 底層的實作方式，雖然網路上對各個資料結構的實作方式已有不少資源，但很少有把這些內容整理在一起的文章，若有查找稍顯不便，因此就有了這篇文章，也期望能幫助到其他人。

如文章中有錯誤或用字不當的地方，歡迎留言指正，亦可直接繳交 PR，感謝！

<!--more-->

## Complexity

### Asymptotic Notations

- Big O Notation (O)，$g(n) = O(f(n)) \iff \exists c > 0, n_0 > 0$，使得對所有 $n \geq n_0$，都有 $g(n) \leq c \cdot f(n)$
- Small o Notation (o)，如果 $g(n) = o(f(n)) \iff \forall c > 0, \exists n_0 > 0$，使得對所有 $n \geq n_0$，都有 $g(n) < c \cdot f(n)$
- Big Omega Notation (Ω)，如果 $g(n) = \Omega(f(n)) \iff \exists c > 0, n_0 > 0$，使得對所有 $n \geq n_0$，都有 $g(n) \geq c \cdot f(n)$
- Small omega Notation (ω)，如果 $g(n) = \omega(f(n)) \iff \forall c > 0, \exists n_0 > 0$，使得對所有 $n \geq n_0$，都有 $g(n) > c \cdot f(n)$
- Theta Notation (Θ)，如果 $g(n) = \Theta(f(n)) \iff \exists c_1 > 0, c_2 > 0, n_0 > 0$，使得對所有 $n \geq n_0$，都有 $c_1 \cdot f(n) \leq g(n) \leq c_2 \cdot f(n)$
  - 常常會把 Big O 誤用成 Theta

不過正確來說，上面應該要用 $g(n) \in$ 而不是 $g(n) =$，因為這些符號表示的是一個集合，而不是等式，例如 $O(f(n))$ 應該是這樣

$$ O(f(n)) = \{ g(n) | \exists c > 0, n_0 > 0, \forall n \geq n_0, g(n) \leq c \cdot f(n) \} $$

但寫成等於的話比較簡潔，所以通常還是會這樣寫。

ref: <https://en.wikipedia.org/wiki/Big_O_notation#Other_notation>

### 均攤複雜度（Amortized Complexity）

直接看範例應該比較快

![截自 <https://en.wikipedia.org/wiki/Amortized_analysis>](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/Amortized_example.png)

## Stack

先進後出 (LIFO, Last In First Out)

實作方法：

- 陣列，用一個 index 指向目前的頂端
- 鏈結串列，記下最後一個插入的節點指標

## Queue

先進先出 (FIFO, First In First Out)

實作方法：

- 陣列
  - 用兩個 index 指向目前的頭和尾，但是這樣入過一直 pop 陣列前半段會浪費空間
  - 把陣列當作一個環，用 modulo 來處理 index 繞回去的問題，用兩個指針指著頭尾，但需要考慮全空和全滿的情況，一個解法是浪費一格空間，如果尾指針的下一格是頭指針就代表滿了，如果兩個指針是同一個位置就代表空的
- 鏈結串列
  - 記下頭和尾的指標，入隊在尾巴插入，出隊在頭部刪除

## Linked List

好幾個節點，中間用指標把它們串起來

### Singly Linked List

```c
typedef struct node {
    type data;
    struct node* next;
}
```

### Doubly Linked List

```c
typedef struct node {
    type data;
    struct node* next;
    struct node* prev;
}
```

## Tree

## Binary Tree

就每個節點最多有兩個子節點的樹狀結構。

- Skewed Tree: 每個節點只有一個子節點的樹
  - Left-Skewed Tree: 每個節點只有左子節點
  - Right-Skewed Tree: 每個節點只有右子節點
- Full Binary Tree: 每個節點要麼是葉節點，要麼有兩個子節點
- Complete Binary Tree: 除了最後一層，其他層的節點數都達到最大值，且最後一層的節點都集中在左邊
- Perfect Binary Tree: 所有內部節點都有兩個子節點，且所有葉節點都在同一層

![截自 <https://web.ntnu.edu.tw/~algo/BinaryTree.html>](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/binary_tree_adj_from.png)

{% note warning%}
通常網路上大家是像上面這樣講的

不過我們課本（[Fundamentals of Data Structures in C, 2/e](https://www.tenlong.com.tw/products/9780929306407)）裡面是說

> A full binary tree of depth k is a binary tree of depth k having $2^k - 1$ nodes, k≥0.

也就是原本大家說的 Perfect Binary Tree，然後沒有特別說沒有定義原先我們的 Full Binary Tree 是什麼，而 Complete Binary Tree 的定義就是我們原先知道的 Complete Binary Tree。
{% endnote %}

### Binary Tree Traversal

- Inorder Traversal (中序)：左子樹 -> 根節點 -> 右子樹 (根節點是在中間拜訪的)
- Preorder Traversal (前序)：根節點 -> 左子樹 -> 右子樹 (根節點是最先拜訪的)
- Postorder Traversal (後序)：左子樹 -> 右子樹 -> 根節點 (根節點是最後拜訪的)
- Level-order Traversal (層序)：從上到下、從左到右逐層拜訪節點

## Binary Search Tree

### Heap

- Min-Heap: 每個節點的值都小於或等於其子節點的值 (因此也小於等於所有子孫節點)
- Max-Heap: 每個節點的值都大於或等於其子

**通常** 會是二元樹

### Leftist Tree

### Binomial Heap

可以達到各個操作的均攤時間服雜度如下：

- Insert: O(1)
- Delete(min or max): O(log n)
- Meld: O(1)

![截自 <https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html>](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/binomial_example.png)

![截自 <https://www.cs.usfca.edu/~galles/visualization/BinomialQueue.html>](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/binomial_heap_demo.gif)

### Fibonacci Heap

可以達到各個操作的均攤時間服雜度如下：

- Insert: O(1)
- Find min / max: O(1)
- Extract min / max: O(log n)
- Meld: O(1)
- Delete Any: O(log n)
- Decrease / Increase Key: O(1)

（為方便說明，後續皆以 Min Fibonacci Heap 為例，也就是上面只會能做 Find min / Extract min / Decrease Key，如果要做 Max Fibonacci Heap 可以用類似的方法實作）

#### Fibonacci Heap - Structure

![截自 <https://www.cs.usfca.edu/~galles/visualization/FibonacciHeap.html>](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/fibonacci_heap_example.png)

Fibonacci Heap 是由多個 Min-Heap 的集合，

每個節點的 struct:

- Data
- Child

```c
typedef
```

#### Fibonacci Heap - Insertion

把新節點加到根節點的 

{% note info Implement%}
```c

```
{% endnote %}

### Min-Max Heap

> Double-Ended Priority Queues (DEPQ)
> Operations: insert, find min, find max, delete min, delete max

### AVL Tree

## Disjoint Set

## Graph

### DFS

### BFS

### Spanning Tree

#### Minimum Spanning Tree

##### Prim's Algorithm

##### Kruskal's Algorithm

### Connectivity

## References

- [Fundamentals of Data Structures in C, 2/e](https://www.tenlong.com.tw/products/9780929306407)
- <https://web.ntnu.edu.tw/~algo/>
- <https://blog.cx330.tw/posts/7f04b563/>
- <https://visualgo.net/>
- <https://www.cs.usfca.edu/~galles/visualization/Algorithms.html>
- <https://en.wikipedia.org/wiki/Big_O_notation>
- <https://en.wikipedia.org/wiki/Amortized_analysis>
