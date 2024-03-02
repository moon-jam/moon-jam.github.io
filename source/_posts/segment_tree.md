---
tags:
  - 演算法
  - 線段樹
categories:
  - 演算法
  - 線段樹
# hidden: true
abbrlink: 2
date: 2023-10-27 00:00:00
title: 線段樹練習
lang:
---

## 前言

線段樹們。

<!--more-->

## 區間詢問單點修改

[neoj80 RMQ問題](https://neoj.sprout.tw/problem/80/)

```c++
#include <bits/stdc++.h>

using namespace std;

const int N = 1E6 + 6;

int arr[N], seg[N*4];

void build(int l, int r, int idx){
    if(r==l+1){ 
        seg[idx] = arr[l];
        return;
    }
    int mid = (l+r)/2;
    build(l, mid, idx*2+1), build(mid, r, idx*2+2);
    seg[idx] = min(seg[idx*2+1], seg[idx*2+2]);
}

int query(int l, int r, int ql, int qr, int idx){
    if(ql==l && qr==r) return seg[idx];
    int mid = (l+r)/2;
    if(ql>=mid) return query(mid, r, ql, qr, idx*2+2);
    if(qr<=mid) return query(l, mid, ql, qr, idx*2+1);
    return min(query(l,mid, ql, mid, idx*2+1), query(mid,r, mid, qr, idx*2+2));
}

void modify(int l, int r, int chg_place, int chg_data, int idx){
    if(r==l+1 && l==chg_place) { 
        seg[idx]=chg_data;
        return;
    }
    int mid = (l+r)/2;
    if(chg_place>=mid) modify(mid, r, chg_place, chg_data, idx*2+2);
    else modify(l, mid, chg_place, chg_data, idx*2+1);
    seg[idx] = min(seg[idx*2+1], seg[idx*2+2]);
}

signed main(){
    // ios::sync_with_stdio(0);
    // cin.tie(0), cout.tie(0);
    int n, t;
    cin >>t>>n;
    for(int i =0; i< n; i++) cin >> arr[i];
    build(0,n,0);
    while(t--){
        int cmd, x, y;
        cin >> cmd >> x >>y;
        if(cmd == 1) cout << query(0, n, x, y+1,0) << '\n';
        if(cmd == 2) modify(0, n, x, y,0);
    }
    return 0;
}
```

## 區間修改區間詢問 - lazy tag

[neoj257](https://neoj.sprout.tw/problem/257/)

```c++
#include <bits/stdc++.h>
using namespace std;

const int N = 2000006;

struct node{
    int turn, reset, data1, data2, data3;
}seg[N*4];

void build(int l, int r, int idx){
    seg[idx] = {0,0,1,0,0};
    if(l==r-1) return;
    int mid = (l+r)/2;
    build(l, mid, idx*2+1), build(mid, r, idx*2+2);
    seg[idx].data1 = seg[idx*2+1].data1 + seg[idx*2+2].data1;
    //cout << l << ' ' <<r << ' ' << seg[idx].data1 << '\n';
}

void push(int l, int r, int idx){
    //cout << seg[idx].reset << ' ' << seg[idx].turn << ' ' ;
    if(seg[idx].reset){
        seg[idx].data1 += seg[idx].data2 + seg[idx].data3;
        seg[idx].data2 = 0; seg[idx].data3 = 0;
        seg[idx].reset=0;
        if(r>l+1) seg[idx*2+1].reset=1, seg[idx*2+1].turn=0;
        if(r>l+1) seg[idx*2+2].reset=1, seg[idx*2+2].turn=0;
    }
    if(seg[idx].turn){ //bj
        seg[idx].turn %= 3;
        if(r>l+1) seg[idx*2+1].turn+=seg[idx].turn;
        if(r>l+1) seg[idx*2+2].turn+=seg[idx].turn;
        while(seg[idx].turn-- > 0) swap(seg[idx].data1, seg[idx].data2), swap(seg[idx].data1, seg[idx].data3);
        seg[idx].turn = 0;
    } //cout << l << ' ' <<r << ' ' <<seg[idx].data1 << ' ' << seg[idx].data2 <<' ' <<seg[idx].data3 <<'\n';
}

int count(int l, int r, int ql, int qr, int idx){
    push(l,r,idx);
    if(l==ql && r==qr) return seg[idx].data1;
    int mid = (l+r)/2;
    if(ql>=mid) return count(mid, r, ql, qr, idx*2+2);
    if(qr<=mid) return count(l, mid, ql, qr, idx*2+1);
    return count(l, mid, ql, mid, idx*2+1) + count(mid, r, mid, qr,idx*2+2);
}

void turn(int l, int r, int ml, int mr, int idx){
    push(l,r,idx);
    int mid = (l+r)/2;
    if(l==ml && r==mr){
        seg[idx].turn++;
        return;
    }else if(ml>=mid)    turn(mid, r, ml, mr, idx*2+2);
    else if(mr<=mid)    turn(l, mid, ml, mr, idx*2+1);
    else turn(l, mid, ml, mid, idx*2+1), turn(mid, r, mid, mr,idx*2+2);
    push(l,mid,idx*2+1); push(mid,r,idx*2+2);
    seg[idx].data1=seg[idx*2+1].data1+seg[idx*2+2].data1;
    seg[idx].data2=seg[idx*2+1].data2+seg[idx*2+2].data2;
    seg[idx].data3=seg[idx*2+1].data3+seg[idx*2+2].data3;
}

void reset(int l, int r, int ml, int mr, int idx){
    push(l,r,idx);
    int mid = (l+r)/2;
    if(l==ml && r==mr){
        seg[idx].reset = 1;
        return;
    }else if(ml>=mid)    reset(mid, r, ml, mr, idx*2+2);
    else if(mr<=mid)    reset(l, mid, ml, mr, idx*2+1);
    else reset(l, mid, ml, mid, idx*2+1), reset(mid, r, mid, mr,idx*2+2);
    push(l,mid,idx*2+1); push(mid,r,idx*2+2);
    seg[idx].data1=seg[idx*2+1].data1+seg[idx*2+2].data1;
    seg[idx].data2=seg[idx*2+1].data2+seg[idx*2+2].data2;
    seg[idx].data3=seg[idx*2+1].data3+seg[idx*2+2].data3;
}

signed main(){
    // ios::sync_with_stdio(0);
    // cin.tie(0); cout.tie(0);
    int n, m;
    cin >> n >>m;
    build(0, n, 0);
    while(m--){
        string cmd;
        int a, b;
        cin >> cmd >> a >> b;
        if(cmd == "TURN") turn(0, n, --a, b, 0);
        if(cmd == "RESET") reset(0, n, --a, b, 0);
        if(cmd == "COUNT") cout << count(0, n, --a, b, 0) << '\n';
    }
    return 0;
}
```

## 寫點題目

[neoj249](https://neoj.sprout.tw/problem/249/)

```c++
#include <bits/stdc++.h>
#define int long long
#define piii pair<int ,pair<int, int>>
#define ans first
#define pre second.first
#define suf second.second
using namespace std;

const int N = 1E5 + 5;

int arr[N], arr_pre[N], seg[N*4], seg_pre[N*4], seg_suf[N*4];
int n, q;

int sum(int a, int b){
    if(a>0) return arr_pre[b-1]-arr_pre[a-1];
    return  arr_pre[b-1];   
}; //[a,b)

void build(int l, int r, int idx){
    if(r-l == 1){
        seg[idx] = seg_pre[idx] = seg_suf[idx]= arr[l];
        
        return;
    }int mid = (l+r)/2;
    build(l, mid, idx*2+1), build(mid, r, idx*2+2);
    seg_pre[idx] = max(seg_pre[idx*2+1], sum(l, mid)+seg_pre[idx*2+2]);
    seg_suf[idx] = max(seg_suf[idx*2+2], sum(mid, r)+seg_suf[idx*2+1]);
    seg[idx] = max(seg_suf[idx*2+1]+seg_pre[idx*2+2], max(seg[idx*2+1], seg[idx*2+2]));
    
}

piii query(int l , int r, int ql, int qr, int idx){
    if(l==ql && r==qr) return {seg[idx], {seg_pre[idx], seg_suf[idx]}};
    int mid = (l+r)/2;
    if(ql>=mid) return query(mid, r, ql, qr, idx*2+2);
    if(qr<=mid) return query(l, mid, ql, qr, idx*2+1);
    piii lres = query(l, mid, ql, mid, idx*2+1);
    piii rres = query(mid, r, mid, qr, idx*2+2);
    return {max(lres.suf+rres.pre, max(rres.ans, lres.ans)), 
        {max(lres.pre, sum(l, mid)+rres.pre), max(rres.suf, sum(mid, r)+lres.suf)}};
}

signed main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cin >> n >> q;
    memset(arr, 0 , sizeof(arr));
    memset(arr_pre, 0 , sizeof(arr_pre));
    memset(seg, 0 , sizeof(seg));
    memset(seg_pre, 0 , sizeof(seg_pre));
    memset(seg_suf, 0 , sizeof(seg_suf));
    for(int i = 0; i< n; i++) cin >>arr[i], arr_pre[i] = arr[i] + arr_pre[(i-1)*(i>0)];
    build(0, n, 0);
    while(q--){
        int x, y;
        cin >> x >> y;
        cout << max(query(0, n, --x, y, 0).ans, 0ll) << '\n';
    }
    return 0;
}
```

[neoj259](https://neoj.sprout.tw/problem/259/)
[neoj367](https://neoj.sprout.tw/problem/367/)
[neoj368](https://neoj.sprout.tw/problem/368/)

[2022附中校內賽PE](https://codeforces.com/gym/401059/problem/E)

[2022 師大附中暑期資訊培訓模擬競賽I PE](https://codeforces.com/gym/401057/problem/E)
