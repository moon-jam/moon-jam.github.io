---
title: MacOS 使用 &lt;bits/extc++.h&gt; 標頭檔 (以VSCode為例)
tags:
  - c++
  - MacOS
  - 環境架設
categories:
  - 教學文
abbrlink: 15630
date: 2024-03-02 00:00:00
lang:
---

## 前言

{% note info %}
先說結論，如果用Clang作為編譯器是難以使用`<bits/extc++.h>`標頭檔的，會產生各種神奇報錯，本文採取適用Homebrew安裝GCC的方式，並且使用GCC作為編譯器。
{% endnote %}
<!--more-->

本來在寫CSES想要用看看pbds，啊結果發現完全沒辦法用，網路上到處找好像都沒什麼解決方法，研究一番之後就有了這篇文章。

## 安裝Homebrew(如果沒有的話)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## 安裝GCC

這邊可以選擇安裝不同版本的GCC，但要注意Arm架構（M系列晶片）的Mac只有支援GCC 11以上的版本。

```bash
# 安裝最新版本的GCC
brew install gcc

# 安裝GCC 11
brew install gcc@11
```

## 使用GCC編譯器

如果不知道安裝的GCC版本，可以使用以下指令查看：

```bash
ls /usr/local/bin/gcc*  # Intel Mac
ls /opt/homebrew/bin/gcc*  # Apple Silicon Mac
```

確定了 GCC 的確切版本號（例如 gcc-11），可以使用該版本號的 GCC 編譯您的程式碼。 例如，如果 GCC 版本是 11，則執行：

```bash
g++-11 example.cpp -o example -std=c++11
```

## 在VSCode中使用GCC

### 使用 [C/C++ Compile Run](https://marketplace.visualstudio.com/items?itemName=danielpinto8zz6.c-cpp-compile-run) 插件

進入到插件設定頁面，搜尋`C-cpp-compile-run: Cpp-compiler`，設定使用gcc編譯。
![設定使用gcc編譯](https://i.imgur.com/aUY9uQR.png)

### 使用 [Competitive Programming Helper (cph)](https://marketplace.visualstudio.com/items?itemName=DivyanshuAgrawal.competitive-programming-helper) 插件

進入到插件設定頁面，搜尋`cph.language.cpp.Command`，設定使用gcc編譯。
![設定使用gcc編譯](https://i.imgur.com/xKEDhsr.png)

## 結語

這樣就可以在MacOS上使用`<bits/extc++.h>`標頭檔了，可以試試底下這個程式碼能否正常運行：

```c++
#include <bits/extc++.h>

using namespace __gnu_pbds;
using namespace std;

int main() {
    tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> s;
    s.insert(1);
    s.insert(3);
    cout << *s.find_by_order(1) << '\n'; // 輸出第二個元素（3）
    return 0;
}
```

如果對在MacOS上使用GCC和<bits/extc++.h>標頭檔有任何問題，歡迎在下方留言討論。
