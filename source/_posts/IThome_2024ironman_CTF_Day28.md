---
title: IThome 2024 鐵人賽 一直刷 CTF - Day28
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 9444
date: 2024-10-01 00:00:00
lang:
---

## 前言

本日進度：

- [x] [【成大資安社社課】Crypto 1 - 完](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)

<!--more-->

## 上課紀錄

### XOR

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_TC7cmgZ.webp)

### MOD

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_yms7Qj7.webp)

### Lab - XOR wormup

改一下他的程式碼就可以得到 Flag 了

```python
from Crypto.Random import get_random_bytes
# from flag import FLAG

FLAG = bytes.fromhex("603ad76575ed41dd3fd38be80d6edfdc569e2a324c928741129e210e2c934aa3770ff8d4f0c5340e82d9c0eea5")

def xor_bytes(a, b):
    return bytes(x ^ y for x, y in zip(a, b))

random_data = bytes.fromhex("0209e4030e9929b44c8ce29b5216b0ae09ed456d29f3f4386be7585114f22ec2436ecdb795f2506db0bff5dcd8")
result = xor_bytes(FLAG, random_data)
print({result.decode()})
```

### 流密碼

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_arAPaTX.webp)

#### 隨機數

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_EmZmTpv.webp)

##### 偽隨機數

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_rbi5s58.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_ACkE2aL.webp)

#### 線性同餘生成器 (Linear Congruential Generator)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_qlvKoCn.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_cqS7Nan.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_ATlq3yR.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_DJI6Uiy.webp)

#### 其他常見方法

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_b6ijdxU.webp)

#### 反饋位移生成器 (Feedback Shift Register)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_YCEkSYS.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_xRBOzHv.webp)

### lab - eof-almost baby prng

### lab - easy lcg

### lab - eof lf3r

### 對稱式加密

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_zO68JRG.webp)

重點是 **使用同一把鑰匙**

#### 基本策略

- Confusion
  - 混淆密文和密鑰的關係，使難以從密文推斷出密鑰
- Defusion
  - 改變一點點明文，就能改變很多密文

#### Feistel Network

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_dGaAKs5.webp)

#### DES (Data Encryption Standard)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_fLYccox.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_sJ9GnKY.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_leafhwv.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_N3xsOAS.webp)

#### Substitution-Permutation Network

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_URyyjmX.webp)

#### AES (Advanced Encryption Standard)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_0OW7vJe.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_qh3p4NV.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_cXFzP3U.webp)

![Image](https://cdn.jsdelivr.net/gh/moon-jam/BlogPictures@main/webp/IThome_2024ironman_CTF_Day28_kPJEXG2.webp)

## TODO

之後好好研究一下原理還有把上面三題 lab 做完

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
