---
title: IThome 2024 鐵人賽 一直刷 CTF - Day30
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 9481
date: 2024-10-03 00:00:00
lang:
---

## 前言

三十天了！ 今天就寫六題 Crypto 的 Writeup ，最後再來個小小總結

<!--more-->

## Writeup

### 第一題：rsa_oracle

這題要利用 RSA 模運算中乘的性質解出這題

$$c = m^e \mod n$$
$$m = c^d \mod n$$
$$(a \cdot b) \mod n = ((a \mod n) \cdot (b \mod n)) \mod n$$
$$m_1*m_2 = (c_1^d \mod n) \cdot (c_2^d \mod n) = (c_1^d \cdot c_2^d) \mod n = (c_1 \cdot c_2)^d \mod n$$

我們可將 $c_1$ 設為題目給的密碼，$c_2$ 自己設一個數字，就能藉由 $c_2$ 和 $c_1*c_2$ 的解密結果，推出 $c_1$ 的明文，也就是用來解密用的密碼，再根據提示利用 openssl 解出 flag。

```python
In [1]: from Crypto.Util.number import *

In [2]: from pwn import *

In [3]: io = remote("titan.picoctf.net", 59764)
[x] Opening connection to titan.picoctf.net on port 59764
[x] Opening connection to titan.picoctf.net on port 59764: Trying 3.139.174.234
[+] Opening connection to titan.picoctf.net on port 59764: Done

In [4]: io.sendline(b"E")

In [5]: io.sendline(b"\x02")

In [6]: io.recv()
Out[6]: b'*****************************************\n****************THE ORACLE***************\n*****************************************\nwhat should we do for you? \nE --> encrypt D --> decrypt. \nenter text to encrypt (encoded length must be less than keysize): \x02\n\nencoded cleartext as Hex m: 2\n\nciphertext (m ^ e mod n) 5067313465613043651275429665315895824157755779222372979446076012356324498190828210335763979330272318657269048435311897896433721115606764442199497891219230\n\nwhat should we do for you? \nE --> encrypt D --> decrypt. \n'

In [7]: c2 = 5067313465613043651275429665315895824157755779222372979446076012356324498190828210335763979330272318657
   ...: 269048435311897896433721115606764442199497891219230

In [8]: c = 17650370497640477243481146344736587348304908520660613456869163656586181949810972167509294217348129116804
   ...: 34647401939068526285652985802740837961814227312100

In [9]: io.sendline(b"D")

In [10]: io.sendline(str(c2*c).encode())

In [11]: io.recv()
Out[11]: b'Enter text to decrypt: decrypted ciphertext as hex (c ^ d mod n): 707062c872\ndecrypted ciphertext: ppb\xc3\x88r\n\nwhat should we do for you? \nE --> encrypt D --> decrypt. \n'

In [12]: password = int("707062c872", 16) // 2

In [13]: long_to_bytes(password).decode()
Out[13]: '881d9'
```

```shell
$ openssl enc -aes-256-cbc -d -in secret.enc


enter AES-256-CBC decryption password:
*** WARNING : deprecated key derivation used.
Using -iter or -pbkdf2 would be better.
picoCTF{su......b6}
```

### 第二題：Custom encryption

按照題目給的 script 一步步倒推回去就可以得到答案了

```python
from math import gcd

a = 95
b = 21
sharded_key = gcd(237915, 1850450, 1850450, 158610, 2458455, 2273410, 1744710, 1744710, 1797580, 1110270, 0, 2194105, 555135, 132175, 1797580, 0, 581570, 2273410, 26435, 1638970, 634440, 713745, 158610, 158610, 449395, 158610, 687310, 1348185, 845920, 1295315, 687310, 185045, 317220, 449395) // 311

cipher = [237915, 1850450, 1850450, 158610, 2458455, 2273410, 1744710, 1744710, 1797580, 1110270, 0, 2194105, 555135, 132175, 1797580, 0, 581570, 2273410, 26435, 1638970, 634440, 713745, 158610, 158610, 449395, 158610, 687310, 1348185, 845920, 1295315, 687310, 185045, 317220, 449395]

semi_cipher = ""

for char in cipher:
    semi_cipher += (chr(char//sharded_key//311))

def dynamic_xor_decrypt(cipher_text, text_key):
    rev_ans = ""
    key_length = len(text_key)
    for i, char in enumerate(cipher_text):
        key_char = text_key[i % key_length]
        encrypted_char = chr(ord(char) ^ ord(key_char))
        rev_ans += encrypted_char
    return rev_ans[::-1]

plain_text = dynamic_xor_decrypt(semi_cipher, "trudeau")

print(plain_text)
```

### 第三題：C3

一樣按照編碼器構造出解碼器

```python
lookup1 = "\n \"#()*+/1:=[]abcdefghijklmnopqrstuvwxyz"
lookup2 = "ABCDEFGHIJKLMNOPQRSTabcdefghijklmnopqrst"

cipher = "DLSeGAGDgBNJDQJDCFSFnRBIDjgHoDFCFtHDgJpiHtGDmMAQFnRBJKkBAsTMrsPSDDnEFCFtIbEDtDCIbFCFtHTJDKerFldbFObFCFtLBFkBAAAPFnRBJGEkerFlcPgKkImHnIlATJDKbTbFOkdNnsgbnJRMFnRBNAFkBAAAbrcbTKAkOgFpOgFpOpkBAAAAAAAiClFGIPFnRBaKliCgClFGtIBAAAAAAAOgGEkImHnIl"

ans = ""

prev = 0
for char in cipher:
    cur = (lookup2.index(char) + prev) % 40
    ans += lookup1[cur]
    prev = cur

print(ans)
```

神奇地得到了一串新的 python 2 程式碼

```python
#asciiorder
#fortychars
#selfinput
#pythontwo

chars = ""
from fileinput import input
for line in input():
    chars += line
b = 1 / 1

for i in range(len(chars)):
    if i == b * b * b:
        print chars[i] #prints
        b += 1 / 1
```

把修改成 python3 的程式碼然後再把這串程式碼當成輸入就得到 flag 了

`picoctf{a....s}`

### 第四題：rotation

根據題目給的密文隨便 rotate 一下就得到答案了

![Image](https://i.imgur.com/2PdDAFF.png)

### 第五題：ReadMyCert

查了一下解析 cert 的指令，然後就得到 flag 了

![Image](https://i.imgur.com/nabNssw.png)

### 第六題：HideToSee

查了一下隱寫術的工具，想用用 Steghide 但 mac 一時裝不起來就隨便找了一個 [online tool](https://futureboy.us/stegano/decinput.html) 解出了一串看起來一副快是 flag 的東西

```plaintext
krxlXGU{zgyzhs_xizxp_05y2z65z}
```

然後再用圖片中講到的 Atbash Cipher 解密看看，就成功得到 flag 了

![Image](https://i.imgur.com/wp3kUxt.png)

## 總結

最後一天了，鐵人賽這段時間是我第一次這樣長時間接觸這些資安技術、刷 CTF 題目，來看一下最後的成果

- 每天六題 picoCTF
  - 達成： 103/174 題
- 每三天一部 Beef Soup 的教學影片
  - 達成： 6/9 部

我的達成率大概只有 6 成 ww，不過學到的技術還是挺多的，知道各種常見的題型，因為跟著課程學，主要還是在玩 Web ，像是 path traversal, lfi, sql injection, ... 一大堆可以玩的洞，而 Crypto, pwn, reverse 都還沒有太多研究，目前感覺 web 的這些 CTF 題目很好玩，雖然知道題目都是設計過的，但每次把一個看似一切正常的網站打出一個洞就很有成就感，之後應該會慢慢點開自己的技能樹，去參加一些酷酷的比賽 (~~可是最近真的參加太多活動太多了 RRRRRRRR~~)
