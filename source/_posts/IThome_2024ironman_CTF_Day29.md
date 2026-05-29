---
title: IThome 2024 鐵人賽 一直刷 CTF - Day29
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 58405
date: 2024-10-02 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

<!--more-->

## 淺談網路與 H T T P

### 什麼是網路？

簡單來說就是把很多台電腦用網路線或是 WIFI 串連在一起就是所謂的網路了

可以比喻為一個送信的過程

1. 撰寫信件內容
2. 放進信封決定要掛號還是平信，還有寄給誰
3. 季見底止和收件地址
4. 把信給郵局，然後轉發到其他郵局再送到收件人手上（如果你要送的人就在你家隔壁，你就直接給他就好了）

網路也是一樣的概念，假設要去瀏覽 Google 這個網站

1. Application layer (信件內容)
   ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_TyrNoiL.webp)
2. Transport layer (信封)
   ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_Mh6F6Ru.webp)
3. Network layer (寄件人和收件人)
   ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_ctf7Io9.webp)
   ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_BJAtXDq.webp)
4. Link layer (郵局)
   ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_WjtMKGY.webp)

### 什麼事 Mac Address

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_guXiiJc.webp)

跟 IP 的差異是 IP 是可以變動的， Mac Address 是固定的，所以在區域網路裡面是檢查 Mac Address 的，而不是 IP Address

在古代沒有 Switch 的時候， 適用 Hub 來連接多台電腦，但是 Hub 是沒有腦袋的，他會把信送給所有人，每台電腦會檢查 Mac Address 看那封信是不是寄給自己的，如果是就接收，如果不是就丟掉

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_r575Pbz.webp)

在有 Switch 後就只會把信送給對的人

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_TZKfGgs.webp)

但在我們瀏覽網頁是用 IP Address 來找到對方的，要找到對方的 Mac Address 就要用 ARP 協定

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_NIA1F6B.webp)
![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_R8bhGIW.webp)

會有一個 ARP Table 來記錄對方的 Mac Address，固定一段時間後會清理和更新

會不會有資安問題？
會的，如果在我問目標的 Mac Address 時，有壞人騙我說他是目標的 Mac Address，這樣就會把信送給壞人，這就是 ARP Spoofing

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_3uRI4Kk.webp)

### Lab - ARP Spoofing

Lab 關掉了不能玩 😥

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_2dhPc7O.webp)

```shell
sudo tcpdump -Ai eth1
```

tcpdump 去聽封包的內容， `-A` 是把封包的內容顯示出來， `-i` 是指定網卡

```shell
sudo arpspoof -i eth1 -t 192.168.111.1 192.168.111.2
```

這個指令就會幫你實作 ARP Spoofing 把 `192.168.111.1` 要傳給 `192.168.111.2` 的封包攔截

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_zWABU43.webp)

### 什麼是網路 - 網段

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_9Qut1Lg.webp)

上下最不同的是，上面的送的人是區域網路，下面的是送給區域外的人，所以他是要經過 Router 來轉發的

一樣用寄信來比喻

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_yFWXbH2.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_ckCjpOt.webp)

上下最大的差異就是在區域內還是區域外，在網路內也是一樣的，要怎沒看是在區域內外等等會講

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_2u1JCbv.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_xWRmV85.webp)

可以通過判斷目標 IP 是否是寄給 Default Gateway 來判斷是區域內還是區域外

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_JfzeMAX.webp)

如何知道來源 IP 和目標 IP 是不是在同一個網段？

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_QC3dXek.webp)

把 Address 和 Netmask 的二進制做 AND 運算，就會是 Network ID ，俗果兩個 Network ID 一樣就是在同一個網段 (所以如果 netmask 是 `255.255.255.0` 的話其實就看 IP 前九碼是不是都一樣就知道是不是在同區域，如果 netmask 是 `255.255.0.0` 就看 IP 前六碼)

`/24` 的意思 `255.255.255.0` 轉成二進制是 `11111111.11111111.11111111.00000000` ，因為有 24 個 1，就表示成 `/24`

### 什麼是網路 - 路由

資料送到 router 時， router 會根據上面的路由表傳送 packet ，路由會根據他的路由地圖來決定要傳送給誰（就像我們可以利用 mtr 看到我們資料是怎麼傳送目標的)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_ARzYFfG.webp)

上面這個就是路由表，如果是 192.168.20.5 就會通過 192.168.20.2 出去

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_hg8FCbD.webp)

router table 會以 netmask 最長的為優先

default gateway 就是 `0.0.0.0/0` 的縮寫，那如果沒有 default gateway 就會找不到路徑，就會出現 `Destination Host Unreachable`

### TCP vs UDP

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_GzBbOug.webp)

#### UDP

就是直接丟過去，不管有沒有真的收到

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_tdKM6ao.webp)

#### TCP

如果需要可靠信傳送，要是資料很大用 UDP 傳過去可能就會很破碎，TCP 就會每次都確認有沒有收到，有收到後才會傳下一個

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_MEndg57.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_Xj2Qrqw.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_9wLfeyg.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_RJqKk88.webp)

因為 TCP 的效能有點差，現在有一個叫做 QUIC 的協定，他是基於 UDP 的，但是他有 TCP 的功能，所以效能會比較好

### Port

因為一台電腦上有很多程式，所以要用 Port 來區分，每個服務都有自己的 Port，像是 HTTP 預設是 80，HTTPS 是 443

### NAT

現今 IPv4 最嚴重的問題，就是 IP 數量不夠用，因為 IP 最多就只有 `2^32` 個，也就是 `4,294,967,296` 個，而且還有一些 IP 是不能用的，很明顯不可能讓地球上每個人都能用，這樣就會有些人沒有辦法用網路，所以就有兩個辦法

1. 換一個 IP 的協議: IPv6，但因為目前很多服務都是架在 IPv4 上，大家也都還習慣用 IPv4，所以短期間就只能用下面那個方法
2. NAT: 既然我們 IP 不夠用，那就讓一些電腦有 IP 就好，其他電腦用假的 IP
   ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_kNC761j.webp)
   ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_mVPj0YS.webp)
   Router 會有一個 NAT Table 來記錄每個請求的 Source IP 和 Destination IP，然後再把 Source IP 改成 Router 的 IP，然後再把封包送出去，當對方回應時， Router 會根據 NAT Table 把封包送到對應的電腦
   但這樣還有個問題，如果有個 Server 架在 NAT 後面，外面就戳不到，解決的方法就是 Port Forwarding
   ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_DbLNxvt.webp)
   ![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_Vr2qpuD.webp)
   會把外面送進拉的 Port 轉換成對應的內部 IP
   [How does NAT work](https://youtu.be/xleMUfUYbGw)

### 什麼是協定

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_RSNrYo5.webp)

#### HTTP

> HTTP/2 之前的版本是一種建立在 TCP 上的傳輸協定。(HTTP/3 例外，今天不提)
> 為何需要使用 TCP 是因為網頁他會需要可靠性的傳輸。

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_ofobafe.webp)

##### Request

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_sPrrISD.webp)

路徑就是想要檔案的位置

##### Response

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_VRbe3Ws.webp)

status code: 2開頭成功，3開頭重新導向，4開頭客戶端錯誤，5開頭伺服器錯誤

##### HTTP Lab

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_i7lPkRs.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_P1HGD39.webp)

[HTTP Method](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Methods)

#### DNS

> 全名叫做 Domain Name System，是一種建立在 UDP 的協定。
> 主要用來查詢 Domain Name 的 IP Address 或是查詢 IP Address 對應的 Domain Name。
> 那什麼是 Domain Name 呢？

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_P1axnwy.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_63XpbUD.webp)

##### DNS Lab

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_ezlp25H.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_25rSqEN.webp)

## Linux 基礎指令與使用者管理

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_crswIVm.webp)

### Kernel Space vs User Space

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_Cmt2y72.webp)

區分成這樣是為了讓 Kernel 方便管理 User Space 的 Application ，避免有些 Application 搶資源，這時候就可以由 Kernel Space 停止那些指令運行

### Shell

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_RFSND8t.webp)

### SSH

Secure Shell Protocol

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_L8lFFSA.webp)

[SSH 金鑰登入 就不用打密碼了](https://blog.gtwang.org/linux/linux-ssh-public-key-authentication/)

### Linux 目錄架構

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_aIJTb9C.webp)

### 檔案種類

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_2dh0cQk.webp)

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

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_7j0LQsL.webp)

密碼不會存在這，所以上面是寫 `x`

#### 用戶 /etc/shadow

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_VBwPnAJ.webp)

#### 群組 /etc/group

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_x6EP4D5.webp)

#### 群組 /etc/gshadow

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_cb7ZUgf.webp)

### 權限

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_uYL8Ucw.webp)

#### 目錄的權限

> r ：
> 表示具有讀取目錄結構清單的權限，可以查詢該目錄下的檔名資料。
> w ：
> 建立新的檔案與目錄；
> 刪除已經存在的檔案與目錄(不論該檔案的權限為何！)
> 將已存在的檔案或目錄進行更名；
> 搬移該目錄內的檔案、目錄位置。
> x (access directory)：
> 使用者能否進入該目錄成為工作目錄的用途（能否cd進入）

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_WrkLjvg.webp)

#### 特殊權限 SUID/SGID/SBIT

> SUID：執行時相當於擁有檔案owner的權限，僅對檔案生效
> SGID：
> 對檔案設定：執行時相當於擁有檔案group的權限
> 對目錄設定：此目錄下的有效群組(effective group)將會變成該目錄的群組
> SBIT：僅能對目錄設定，使用者在該目錄下建立檔案或目錄時，僅有自己與 root 才有權力刪除該檔案
> SUID = 4 SGID = 2 SBIT = 1 \_755

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_sixviML.webp)

#### Umask

他的值會是 777 減去 umask 的值，所以如果 umask 是 022 的話，那就是 755

`-S`: 顯示成比較好檢視的樣子

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day29_z3UIhku.webp)

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

