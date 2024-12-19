---
title: IThome 2024 鐵人賽 一直刷 CTF - Day24
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 8676
date: 2024-09-27 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】淺談網路與 H T T P - 到 NAT](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

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
   ![Image](https://i.imgur.com/TyrNoiL.png)
2. Transport layer (信封)
   ![Image](https://i.imgur.com/Mh6F6Ru.png)
3. Network layer (寄件人和收件人)
   ![Image](https://i.imgur.com/ctf7Io9.png)
   ![Image](https://i.imgur.com/BJAtXDq.png)
4. Link layer (郵局)
   ![Image](https://i.imgur.com/WjtMKGY.png)

### 什麼事 Mac Address

![Image](https://i.imgur.com/guXiiJc.png)

跟 IP 的差異是 IP 是可以變動的， Mac Address 是固定的，所以在區域網路裡面是檢查 Mac Address 的，而不是 IP Address

在古代沒有 Switch 的時候， 適用 Hub 來連接多台電腦，但是 Hub 是沒有腦袋的，他會把信送給所有人，每台電腦會檢查 Mac Address 看那封信是不是寄給自己的，如果是就接收，如果不是就丟掉

![Image](https://i.imgur.com/r575Pbz.png)

在有 Switch 後就只會把信送給對的人

![Image](https://i.imgur.com/TZKfGgs.png)

但在我們瀏覽網頁是用 IP Address 來找到對方的，要找到對方的 Mac Address 就要用 ARP 協定

![Image](https://i.imgur.com/NIA1F6B.png)
![Image](https://i.imgur.com/R8bhGIW.png)

會有一個 ARP Table 來記錄對方的 Mac Address，固定一段時間後會清理和更新

會不會有資安問題？
會的，如果在我問目標的 Mac Address 時，有壞人騙我說他是目標的 Mac Address，這樣就會把信送給壞人，這就是 ARP Spoofing

![Image](https://i.imgur.com/3uRI4Kk.png)

### Lab - ARP Spoofing

Lab 關掉了不能玩 😥

![Image](https://i.imgur.com/2dhPc7O.png)

```shell
sudo tcpdump -Ai eth1
```

tcpdump 去聽封包的內容， `-A` 是把封包的內容顯示出來， `-i` 是指定網卡

```shell
sudo arpspoof -i eth1 -t 192.168.111.1 192.168.111.2
```

這個指令就會幫你實作 ARP Spoofing 把 `192.168.111.1` 要傳給 `192.168.111.2` 的封包攔截

![Image](https://i.imgur.com/zWABU43.png)

### 什麼是網路 - 網段

![Image](https://i.imgur.com/9Qut1Lg.png)

上下最不同的是，上面的送的人是區域網路，下面的是送給區域外的人，所以他是要經過 Router 來轉發的

一樣用寄信來比喻

![Image](https://i.imgur.com/yFWXbH2.png)

![Image](https://i.imgur.com/ckCjpOt.png)

上下最大的差異就是在區域內還是區域外，在網路內也是一樣的，要怎沒看是在區域內外等等會講

![Image](https://i.imgur.com/2u1JCbv.png)

![Image](https://i.imgur.com/xWRmV85.png)

可以通過判斷目標 IP 是否是寄給 Default Gateway 來判斷是區域內還是區域外

![Image](https://i.imgur.com/JfzeMAX.png)

如何知道來源 IP 和目標 IP 是不是在同一個網段？

![Image](https://i.imgur.com/QC3dXek.png)

把 Address 和 Netmask 的二進制做 AND 運算，就會是 Network ID ，俗果兩個 Network ID 一樣就是在同一個網段 (所以如果 netmask 是 `255.255.255.0` 的話其實就看 IP 前九碼是不是都一樣就知道是不是在同區域，如果 netmask 是 `255.255.0.0` 就看 IP 前六碼)

`/24` 的意思 `255.255.255.0` 轉成二進制是 `11111111.11111111.11111111.00000000` ，因為有 24 個 1，就表示成 `/24`

### 什麼是網路 - 路由

資料送到 router 時， router 會根據上面的路由表傳送 packet ，路由會根據他的路由地圖來決定要傳送給誰（就像我們可以利用 mtr 看到我們資料是怎麼傳送目標的)

![Image](https://i.imgur.com/ARzYFfG.png)

上面這個就是路由表，如果是 192.168.20.5 就會通過 192.168.20.2 出去

![Image](https://i.imgur.com/hg8FCbD.png)

router table 會以 netmask 最長的為優先  

default gateway 就是 `0.0.0.0/0` 的縮寫，那如果沒有 default gateway 就會找不到路徑，就會出現 `Destination Host Unreachable`

### TCP vs UDP

![Image](https://i.imgur.com/GzBbOug.png)

#### UDP

就是直接丟過去，不管有沒有真的收到

![Image](https://i.imgur.com/tdKM6ao.png)

#### TCP

如果需要可靠信傳送，要是資料很大用 UDP 傳過去可能就會很破碎，TCP 就會每次都確認有沒有收到，有收到後才會傳下一個

![Image](https://i.imgur.com/MEndg57.png)

![Image](https://i.imgur.com/Xj2Qrqw.png)

![Image](https://i.imgur.com/9wLfeyg.png)

![Image](https://i.imgur.com/RJqKk88.png)

因為 TCP 的效能有點差，現在有一個叫做 QUIC 的協定，他是基於 UDP 的，但是他有 TCP 的功能，所以效能會比較好

### Port

因為一台電腦上有很多程式，所以要用 Port 來區分，每個服務都有自己的 Port，像是 HTTP 預設是 80，HTTPS 是 443

### NAT

現今 IPv4 最嚴重的問題，就是 IP 數量不夠用，因為 IP 最多就只有 `2^32` 個，也就是 `4,294,967,296` 個，而且還有一些 IP 是不能用的，很明顯不可能讓地球上每個人都能用，這樣就會有些人沒有辦法用網路，所以就有兩個辦法

1. 換一個 IP 的協議: IPv6，但因為目前很多服務都是架在 IPv4 上，大家也都還習慣用 IPv4，所以短期間就只能用下面那個方法
2. NAT: 既然我們 IP 不夠用，那就讓一些電腦有 IP 就好，其他電腦用假的 IP
   ![Image](https://i.imgur.com/kNC761j.png)
   ![Image](https://i.imgur.com/mVPj0YS.png)
   Router 會有一個 NAT Table 來記錄每個請求的 Source IP 和 Destination IP，然後再把 Source IP 改成 Router 的 IP，然後再把封包送出去，當對方回應時， Router 會根據 NAT Table 把封包送到對應的電腦
   但這樣還有個問題，如果有個 Server 架在 NAT 後面，外面就戳不到，解決的方法就是 Port Forwarding
   ![Image](https://i.imgur.com/DbLNxvt.png)
   ![Image](https://i.imgur.com/Vr2qpuD.png)
   會把外面送進拉的 Port 轉換成對應的內部 IP
   [How does NAT work](https://youtu.be/xleMUfUYbGw)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)