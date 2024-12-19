---
title: IThome 2024 鐵人賽 一直刷 CTF - Day9
tags:
  - IThome 2024 鐵人賽
  - CTF
  - 資安
categories:
  - IThome 2024 鐵人賽
  - 一直刷 CTF
abbrlink: 58120
date: 2024-09-12 00:00:00
lang:
---

## 前言

本日進度：

- [x] 6 題 general skills

<!--more-->

## Writeup

### 第一題：Serpentine

看到他 python code 裡面有個函數叫做 `print_flag()` ，我就把它移動到 `if __name__ == '__main__':` 下面，然後執行就得到 Flag 了

![Image](https://i.imgur.com/C6UjyBZ.png)

### 第二題：PW Crack 5

因為懶得改太多程式，想說創一個通道讓`dictionary.txt`的資料自己一個個拿去測試，就是`cat dictionary.txt|python level5.py`，但原本的`level.py`只會執行一次，所以我就把其中的`level_5_pw_check()`改成以下這樣，就得到 Flag 了

```python
def level_5_pw_check():
    while 1:
        user_pw = input("Please enter correct password for flag: ")
        user_pw_hash = hash_pw(user_pw)

        if( user_pw_hash == correct_pw_hash ):
            print("Welcome back... your flag, user:")
            decryption = str_xor(flag_enc.decode(), user_pw)
            print(decryption)
            return
        print("That password is incorrect")
```

![Image](https://i.imgur.com/RFSR79J.png)

### 第三題：PW Crack 4

跟上一題很像，但這個比較好心把可能的密碼些在陣列裡面，所以我就直接改成以下這樣，就得到 Flag 了

```python
def level_4_pw_check(user_pw):
    # user_pw = input("Please enter correct password for flag: ")
    user_pw_hash = hash_pw(user_pw)

    if( user_pw_hash == correct_pw_hash ):
        print("Welcome back... your flag, user:")
        decryption = str_xor(flag_enc.decode(), user_pw)
        print(decryption)
        return 1
    print("That password is incorrect")

pos_pw_list = [ ... ] # Put possible passwords here

for pw in pos_pw_list:
    if level_4_pw_check(pw):
        break
```

![Image](https://i.imgur.com/wHbkutd.png)

### 第四題：PW Crack 3

這題跟前一題一樣是把答案寫在陣列裡面，但他只有七個，所以可以一個個慢慢試，就得到 Flag 了 (結果我就真的試了七次才猜倒也是很不容易 xddddd)

![Image](https://i.imgur.com/VMh9fcz.png)

### 第五題：1_wanna_b3_a_r0ck5tar

這題很神奇，他是用一個 Rockstar 的程式語言寫的，懶得看文件先隨便先猜了一下，裡面有 IF 和 Else，我就先試試看把他們刪掉，變成以下這樣執行，隨便亂輸入，就得到幾個數字，把他轉換成 ASCII 就得到 Flag 了~

```plaintext
Rocknroll is right              
Silence is wrong                
A guitar is a six-string        
Tommy's been down               
Music is a billboard-burning razzmatazz!
Listen to the music                            
Say "Keep on rocking!"                
Listen to the rhythm
Tommy is rockin guitar
Shout Tommy!                    
Music is amazing sensation 
Jamming is awesome presence
Scream Music!                   
Scream Jamming!                 
Tommy is playing rock           
Scream Tommy!       
They are dazzled audiences                  
Shout it!
Rock is electric heaven                     
Scream it!
Tommy is jukebox god            
Say it!                                     
Break it down
Shout "Bring on the rock!"
```

![Image](https://i.imgur.com/32w6UWZ.png)

後來去看別人 writeup 又去看了一下他的文件發現他是拿文字長度當每一位數字，題目本來應該是要我們去看懂他程式然後輸入進去啦，不過反正能拿到 Flag 都是好方法🫠

### 第六題：flag_shop

這題我蠻喜歡的，他用 `nc` 連到伺服器，然後要到他的商店裏面買 Flag，但是 Flag 的價錢遠超過自己的資產。不過還好她有提供 source code 可以參考，看了之後發現他有擋掉買負數的 Flag，但是但是，他沒有擋掉 `total_price` 是負數，可能一般人會想說 Flag 數量是正的，那 `total_price = 900 * number_flags` 也是正的，但是打過競程的一定都知道 overflow ，只要把 Flag 數量設成 (2^31/900, 2^31-1] ，就可以得到負數的 `total_price` 了，藉由買負數價錢的東西，就可以增加自己的資產然後買 Flag 了~

![Image](https://i.imgur.com/37l2nfy.png)

## 參考資料

- [【成大資安社社課】手把手Python教學 --- 從入門到入侵](https://youtu.be/-cMOv9QudOk?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 1](https://youtu.be/N60VGmhfhy0?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】WEB 2](https://youtu.be/PqydmB-IoYc?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】不是web3.0的 web3 - Vincent55](https://youtu.be/xjnAnrfApJo?list=PLFFwfkaPB2mqsfIQvdoT6xc0CziXhmrEV)
- [【成大資安社社課】Crypto 1](https://youtu.be/nVXA9S9Y07M?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Crypto 2](https://youtu.be/LtWiQxbMjwg?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】Linux 基礎指令與使用者管理](https://youtu.be/8WVrUqjBsRE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
- [【成大資安社社課】淺談網路與 H T T P](https://youtu.be/pNhHXhPkNcE?list=PLFFwfkaPB2mra818QJIiPJtXFShdndl9z)
