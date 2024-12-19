---
title: IThome 2024 鐵人賽 一直刷 CTF - Day26
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 57445
date: 2024-09-29 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

<!--more-->

## Linux 基礎指令與使用者管理

![Image](https://i.imgur.com/crswIVm.png)

### Kernel Space vs User Space

![Image](https://i.imgur.com/Cmt2y72.png)

區分成這樣是為了讓 Kernel 方便管理 User Space 的 Application ，避免有些 Application 搶資源，這時候就可以由 Kernel Space 停止那些指令運行

### Shell

![Image](https://i.imgur.com/RFSND8t.png)

### SSH

Secure Shell Protocol

![Image](https://i.imgur.com/L8lFFSA.png)

[SSH 金鑰登入 就不用打密碼了](https://blog.gtwang.org/linux/linux-ssh-public-key-authentication/)

### Linux 目錄架構

![Image](https://i.imgur.com/aIJTb9C.png)

### 檔案種類

![Image](https://i.imgur.com/2dh0cQk.png)

#### 正規檔案 (Regular File)

- 檔案類型：`-`
- 純文字檔(ASCII)、二進位檔(binary)、資料格式檔(data)

#### 目錄 (Directory)

- 檔案類型：`d`
- 就是目錄

#### 連結檔(link)

- 檔案類型：`l`
- 就同於 Windows 下的捷徑

#### 設備與裝置檔(device)

- 區塊(block)設備檔
  - 檔案類型：b
  - 硬碟或儲存設備
- 字元(character)設備檔
  - 檔案類型：c
  - 鍵盤、滑鼠等

#### 資料接口檔(sockets)

- 檔案類型：s
- 讓兩個程式做溝通，讓一個程式把資料灌進 sockets ，另一個程式就可以從 sockets 拿資料

#### 資料輸送檔(FIFO, pipe)

- 檔案類型：p
- 讓不同進程間能溝通

### 用戶與群組

用戶：就用戶
群組：主群組和附加群組

#### 用戶 /etc/password

![Image](https://i.imgur.com/7j0LQsL.png)

密碼不會存在這，所以上面是寫 `x`

#### 用戶 /etc/shadow

![Image](https://i.imgur.com/VBwPnAJ.png)

#### 群組 /etc/group

![Image](https://i.imgur.com/x6EP4D5.png)

#### 群組 /etc/gshadow

![Image](https://i.imgur.com/cb7ZUgf.png)

### 權限

![Image](https://i.imgur.com/uYL8Ucw.png)

#### 目錄的權限

> r ：\
> 表示具有讀取目錄結構清單的權限，可以查詢該目錄下的檔名資料。 \
> w ：\
> 建立新的檔案與目錄；\
> 刪除已經存在的檔案與目錄(不論該檔案的權限為何！)\
> 將已存在的檔案或目錄進行更名；\
> 搬移該目錄內的檔案、目錄位置。\
> x (access directory)：\
> 使用者能否進入該目錄成為工作目錄的用途（能否cd進入）\

![Image](https://i.imgur.com/WrkLjvg.png)

#### 特殊權限 SUID/SGID/SBIT

> SUID：執行時相當於擁有檔案owner的權限，僅對檔案生效\
> SGID：\
> 對檔案設定：執行時相當於擁有檔案group的權限\
> 對目錄設定：此目錄下的有效群組(effective group)將會變成該目錄的群組\
> SBIT：僅能對目錄設定，使用者在該目錄下建立檔案或目錄時，僅有自己與 root 才有權力刪除該檔案\
> SUID = 4 SGID = 2 SBIT = 1         _755

![Image](https://i.imgur.com/sixviML.png)

#### Umask

他的值會是 777 減去 umask 的值，所以如果 umask 是 022 的話，那就是 755

`-S`: 顯示成比較好檢視的樣子

![Image](https://i.imgur.com/z3UIhku.png)

### 未知的指令

- Google
- `man xxx`
- `xxx -h` / `xxx --help`

### 常見指令

- `cd`: change directory (可用絕對路徑或相對路徑)
- `pwd`: print working directory
- `ls`: list
  - `-a`: 顯示隱藏檔
  - `-l`: 顯示詳細資訊 (`ll` 是 `ls -l` 的縮寫)
- `exa`: 跟 `ls` 類似，但是有顏色
- `rm`: remove
  - `-r`: 遞迴刪除
  - `-f`: 強制刪除
- `cp`: copy
- `mv`: move
- `cat`: concatenate
- `tac`: 反向顯示
- `od`: octal dump
- `nl`: number lines(會把檔案的每一行編號)
- `more`: 一次顯示一頁
- `less`: 也是一次顯示一頁，但是可以往前翻 (vim 的操作方式)
- `mkdir`: make directory
- `touch`: 建立檔案
- `rmdir`: remove directory
- `nano`: 編輯器
- `vi`: 很棒的編輯器
- `vim`: 更棒的編輯器
- `chmod`: change mode
  - `chmod 777 xxx`: 三個數字分別代表 user/group/others，每個數字代表 rwx，所以 777 就是全部都有 rwx
  - `chmod -x xxx`: 移除所有人對 xxx 的執行權限
  - `chmod +x xxx`: 給所有人對 xxx 的執行權限
  - `chmod u+x xxx`: 給 user 對 xxx 的執行權限 (u = user, g = group, o = others, a = all)
  - 也可設定 SUID/SGID/SBIT 可以用 `chmod 4755 xxx` 來設定 SUID ，然後`+s` 來設定 SUID/SGID，`+t` 來設定 SBIT
- `chown`: change owner
  - `chown user xxx`: 把 xxx 的 owner 改成 user
  - `chown user:group xxx`: 把 xxx 的 owner 改成 user，group 改成 group
- `chgrop`: change group
  - `chgrp group xxx`: 把 xxx 的 group 改成 group
- `chattr`: change attribute
  - `chattr +i xxx`: 讓 xxx 變成不可刪除
  - `chattr +a xxx`: 讓 xxx 變成只能增加資料，不能刪除
  - 其他不常用需要再看
- `lsattr`: 顯示檔案屬性
- `passwd`: 更改密碼
- `which` / `whereis`: 找指令的位置
- `tar`: 包裝 or 壓縮檔案
  - `v`: 顯示詳細資訊
  - `f`: 檔案名稱
  - `c`: 建立壓縮檔
  - `j`: 用 bzip2 壓縮
  - `z`: 用 gzip 壓縮
  - `J`: 用 xz 壓縮
  - `x`: 解壓縮
  - `tar -cvf xxx.tar xxx`: 壓縮
  - `tar -xvf xxx.tar`: 解壓縮
  - `tar -zcvf xxx.tar.gz xxx`: 壓縮成 .tar.gz
  - `tar -zxvf xxx.tar.gz`: 解壓縮 .tar.gz
- pipe: `|`，把前面的結果傳給後面
  - 例如 `ls | grep xxx` 就是把 `ls` 的結果傳給 `grep` 來找 `xxx`
- `sleep`: 會暫停後面接的秒數
- 一些特殊 combo
  - `Ctrl+C`: 中斷目前的指令
  - `Ctrl+Z`: 暫停目前的指令 (suspended)
    - `jobs`: 查看暫停的指令
    - `fg`: 把暫停的指令恢復 (利用 `%{number}` 來指定要恢復 jobs 中指令的編號)
    - `bg`: 把暫停的指令變成背景執行
  - `Ctrl+D`: EOF
- redirect: `>`，把前面的結果寫到後面的檔案，`>>` 是 append， `<` 是把檔案的內容傳給後面的指令
  - `ls > xxx.txt` 就是把 `ls` 的結果寫到 `xxx.txt`
  - `ls >> xxx.txt` 就是把 `ls` 的結果 append 到 `xxx.txt`
  - `cat < xxx.txt` 就是把 `xxx.txt` 的內容傳給 `cat`
  - `2>` 是把錯誤訊息寫到檔案
- regex
  - 可以在 [regexlearn](https://regexlearn.com/) 學
  - 在 [regex101](https://regex101.com/) 測試
  - `.`: 任意字元
  - `*`: 0 到無限多次
  - `+`: 1 到無限多次
  - `[abc]`: a, b, c 任一個
  - `[^abc]`: 除了 a, b, c 之外
  - `[a-z]`: a 到 z 之間
- `sed`: stream editor 有點複雜，會用到的時候再查就好
- `grep`: global regular expression print
  - `-i`: 不分大小寫
  - `-v`: 反向選取
  - `-n`: 顯示行數
  - `-r`: 遞迴
  - `-l`: 只顯示檔名
  - `-c`: 只顯示數量
  - `-e`: 多個條件
  - `-E`: 正規表達式
  - `-A`: 顯示後面幾行
  - `-B`: 顯示前面幾行
  - `-C`: 顯示前後幾行
  - `grep xxx *`: 在所有檔案中找 `xxx`
- `find`: 找檔案
- bash script
  - 就是用 `.sh` 結尾的檔案，然後裡面寫一些指令
  - 然後在檔案裡面寫一些指令，`chmod` 加執行權限就可以執行了
- `crontab`: 定時執行
  - `crontab -e`: 編輯
  - `crontab -l`: 列出
  - `crontab -r`: 刪除
  - `* * * * * xxx`: 分鐘 小時 日 月 星期幾 指令
- apt/mirror: 安裝套件
  - `apt update`: 更新套件
  - `apt upgrade`: 升級套件 (順序會是先更新再升級)
  - `apt install xxx`: 安裝套件
  - `apt remove xxx`: 移除套件
  - `apt search xxx`: 搜尋套件
  - `apt list`: 列出所有套件
  - `apt show xxx`: 顯示套件資訊
  - `apt autoremove`: 移除不需要的套件
  - `apt clean`: 清除快取
  - `apt autoclean`: 清除舊的快取
- `$()`: 會優先執行 `()` 指令的標準輸出，當成前面的指令的參數
  - 例如 `echo $(ls)` 就是把 `ls` 的結果傳給 `echo`
- `cut`: 切割
  - `-d`: 分隔符號
  - `-f`: 第幾個
  - `cut -d " " -f 1 xxx`: 以空格切割，取第一個

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
