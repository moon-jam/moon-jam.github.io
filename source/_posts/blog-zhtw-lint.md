---
title: 為 Blog 加上繁體中文 Linter (zhtw-mcp)
tags:
  - Hexo
  - Blog
  - zhtw-mcp
categories:
  - - 教學文
  - - 貼文
abbrlink: 16103
date: 2026-04-10 14:00:00
lang: zh-TW
---

前陣子看到 Jserv 開發了個 [zhtw-mcp](https://github.com/sysprog21/zhtw-mcp)，能讓語言模型在生成文字時[精準使用正確的資訊科技詞彙](https://hackmd.io/@sysprog/it-vocabulary)，同時這個工具也有 [CLI 的方式](https://github.com/sysprog21/zhtw-mcp/blob/main/docs/cli.md) 能使用，因此最近在寫文章時就常使用這個工具來檢查，發現其實自己蠻常會有一些錯誤，例如：界面 / 介面、優化 / 最佳化 等等，於是就想要直接將這個工具納入部落格 pre-commit 的一個 <ruby>Linter 檢查<rt>支語警察</rt></ruby>。

<!--more-->

## 實作

因為前陣子看到毛哥寫的這篇〈[Husky 教學 - 逼你的團隊給我 Format 完再 Commit](https://emtech.cc/p/husky)〉，而且我部落格本來就使用 npm (node package manager)，這樣整合也很方便，以下就照著毛哥的教學完成 Husky 安裝

```shell
npm install --save-dev husky
npx husky init
```

寫了一個使用 `zhtw-mcp` lint 的 shell script

{% details mode:close 程式碼 %}

```bash
#!/bin/bash

STAGED_MD_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep '\.md$')

if [ -z "$STAGED_MD_FILES" ]; then
    exit 0
fi

if ! command -v zhtw-mcp &> /dev/null; then
    echo "Because you want to commit Markdown files, you need to install zhtw-mcp for linting first."
    echo "You can reference this to get started on zhtw-mcp: https://github.com/sysprog21/zhtw-mcp?tab=readme-ov-file#getting-started"
    exit 1
fi

zhtw-mcp lint $STAGED_MD_FILES --explain # 若檔名含空白可能需額外處理
OUTPUT=$(zhtw-mcp lint $STAGED_MD_FILES --explain 2>&1)

if [[ ! "$OUTPUT" =~ ": info" && ! "$OUTPUT" =~ ": warning" ]]; then
    echo "You are Traditional Chinese writing master!"
    exit 0
fi

echo "----------------"
echo "Detect some sentences may contain improper Chinese words."
exec 3<&0
exec < /dev/tty
read -p "Continue with commit? (y/n): " yn
exec <&3 3<&-

case $yn in 
    [Yy]* )
        exit 0
        ;;
    * )
        echo "Commit abort."
        exit 1
        ;;
esac

```

{% enddetails %}

然後把 Shell Script 加入 `.husky/pre-commit` 就完成了🎉

```shell Demo 一下
$ git commit
15:255: warning [cross_strait] '優化' -> 最佳化
  context: @domain IT。tw「優化」泛用於商業；IT optimize 改「最佳化」以區分 improve
  english: optimize
21:25: info [punctuation] '-' -> ～
  context: 範圍表示建議使用全形波浪號「～」或半形連接號「–」
82:13: info [punctuation] '-' -> ～
  context: 範圍表示建議使用全形波浪號「～」或半形連接號「–」

3 issue(s) found.
----------------
Detect some sentences may contain improper Chinese words.
Continue with commit? (y/n): 
```

---

## 延伸閱讀

- [sysprog21/zhtw-mcp](https://github.com/sysprog21/zhtw-mcp)
- [Husky 教學 - 逼你的團隊給我 Format 完再 Commit](https://emtech.cc/p/husky)
