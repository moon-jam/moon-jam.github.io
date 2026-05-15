---
title: 關於 COXX（Cross-Origin）的那些事
tags:
  - 資安
categories:
  - 資安
scope: both
abbrlink: 51089
date: 2026-05-15 00:00:00
lang:
---

前陣子在看 [Linux-Wasm](https://github.com/joelseverin/linux-wasm/)[^linux-wasm] 可能會有的相關限制，其中有一點就是瀏覽器中的各種 Cross-Origin 規範，~~因此開始重新學習了那些在打資安時就沒很搞清楚的各種知識~~。過程中也整理了些筆記，想說寫都寫了，那就也放到部落格上分享吧~

[^linux-wasm]: [Linux-Wasm](https://github.com/joelseverin/linux-wasm/) 專案是嘗試利用 [WebAssembly](https://webassembly.org/) 技術在瀏覽器上運行 Linux Kernel

<!--more-->

在這項專案中需使用 [WebAssembly.Memory](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory) 將同一個記憶體共享給不同 [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)，達到 Multi-thread 的能力，但這麼一來 WebAssembly.Memory 就需要用到 [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)，可是這樣的特性能夠讓網站做出高精度計時器，使得如 [Spectre](<https://en.wikipedia.org/wiki/Spectre_(security_vulnerability)>) (`/ˈspek.tɚ/`) 的漏洞能以 side-channal attack 方式讀取到 cross origin 的網站資訊（只要能將受害網站的資源載入到目前相同網站上就有機會讀取到內容），因此必須開啟 COI (cross-origin isolated) 的設定（避免其他網站的資源被惡意載入），也就是要在 HTTP Header 設定

- `Cross-Origin-Embedder-Policy: require-corp | credentialless` (兩者皆可)
- `Cross-Origin-Opener-Policy: same-origin`

分別解釋一下：

- [COEP (Cross-Origin-Embedder-Policy)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy)：可以設定 `unsafe-none` | `require-corp` | `credentialless`，避免資源在 `no-cors`[^no-cors] 的狀況下被嵌入在網頁中
  - `unsafe-none` 就跟沒設一樣
  - `require-corp` 表示載入的資源一定有在 response Header CORP 標示可以載入的（或是可透過 CORS 載入的資源，[但須額外加上 attribute](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy#avoiding_coep_blockage_with_cors)）（關於這兩個 COXX 可以見下方說明）
  - `credentialless` 可以不用有 CORP 的標示，但會以不帶 Cookie 的方式存取該資源，不過這個的選項[支援性較差一點](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy#browser_compatibility)
- [COOP (Cross-Origin-Opener-Policy)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy)：當網頁使用 [Window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 開啟一個新的頁面後，會在同一個 [browsing context group (BCG)](https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context)，能利用 [window.opener](https://developer.mozilla.org/en-US/docs/Web/API/Window/opener) 操作原網頁重新導向（location）或關閉（close）等操作，但如果是 cross-origin 瀏覽器預設就是無法直接存取 DOM 的
  - `unsafe-none`：就跟沒設一樣
  - `same-origin`：要 opener 和 openee 是同一個 origin 且都設定 COOP 是 `same-origin` 才能互相存取
  - `same-origin-allow-popups`:
    - openee COOP 是 `unsafe-none`（或者就完全沒設定）
    - 要 opener 和 openee 是同一個 origin 且 COOP 都是 `same-origin-allow-popups`
  - `noopener-allow-popups`:
    - 對於任何 COOP 設定的 opener，如果 openee 的 COOP 設定是 `noopener-allow-popups` 那就會被分成兩個不同的 BCG
    - 如果 opener 是 `noopener-allow-popups`，openee 是 `unsafe-none`，則 openee 會跟 opener 在同一個 BCG
    - 以上是在使用 `window.open()` 的方式時的表現，如果是用 Navigate（像是點超連結或 `location.href = "https://example.com"`）的方式切換會有不一樣的規則，可以參考 [MDN 的說明](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy#navigations)

以下也列出一些與瀏覽器上的 Policy 及限制 (除 CORB 外，都是寫在 HTTP Header 上的規則):

- [CSP (Content Security Policy)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)：用來限制哪些內容可以出現在網頁上，包含但不限於 JavaScript / CSS / connect / frame... (但因為這是開發者為避免被攻擊設下的防禦機制，所以對 wasm-linux 的影響不大)
- [CORS (Cross-Origin Resourse Share)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS){#CORS}：當一個網站需要跨不同 Origin 對其他網站發 request 時，且 request 不是單純的將內容嵌入網站（如 `<img>`、`<script>`）而是使用 fetch / XMLHttpRequest [或其他可能會被 JavaScript 讀取的 Method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS#what_requests_use_cors)，需要原網站是該網頁允許存取資訊的對象，**瀏覽器** 才允許原網站收到 response（所以 request 是可以發出去的，但 response 可能會被瀏覽器擋下來），此外還有 [Preflight 機制](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)，針對非 [Simple Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS#simple_requests) 的請求會先發一個 Preflight request 檢查是否同意我們請求中的 Header / HTTP Method，否則連真正的 Request 都不會發出去
- [CORB (Cross-Origin Read Blocking)](https://chromium.googlesource.com/chromium/src/+/lkgr/services/network/cross_origin_read_blocking_explainer.md)：Chrome 內建的機制，自動阻止不合理的 Cross-Origin 讀取，例如在 `<img>` 裡請求 HTML / XML / JSON
- [CORP (Cross-Origin-Resource-Policy)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Resource-Policy)：可以設定哪些網站 (same-site | same-origin | cross-origin) 能讀取該網站的資源（`no-cors` 模式下），但無法限制被 iframe 嵌入（不過能利用 CSP 設定不被嵌入）

[^no-cors]: （請先看過上方 [CORS](./#CORS) 的說明內容）如果該跨來源的資源不是使用 fetch / XMLHttpRequest [或其他可能會被 JavaScript 讀取的 Method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS#what_requests_use_cors)（也就是如 `<img>`、`<script>` 的方式嵌入網頁），那該資源就屬於 `no-cors` 模式的載入的；此外如果他原本是使用 `no-cors` 載入可以 [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/crossorigin) 這個 attribute 使其以 `cors` 的規則載入

Origin vs. Site:

- Origin 表示一個網址的 schema (http / https / ftp...), port, host (domain / subdomain 都要一樣才算，因此 example.com, x.example.com 不能算是 same origin)
- Site 表示一個網址的 schema / host (但這邊只要 domain 相同，subdomain 不同也算，因此 <http://example.com>, <http://x.example.com> 算是 same site)

## 延伸閱讀

- [網頁的另一個大腦：從基礎到進階掌握 Web Worker 技術 - 在 Javascript 中共享記憶體 - SharedArrayBuffer](https://ithelp.ithome.com.tw/articles/10334292)
- [Beyond XSS：探索網頁前端資安宇宙 - [Day22] 跨來源的安全性問題](https://ithelp.ithome.com.tw/articles/10324775)
- [Beyond XSS：探索網頁前端資安宇宙 - [Day21] 跨來源資源共用 CORS 基本介紹](https://ithelp.ithome.com.tw/articles/10323953)
- [Beyond XSS：探索網頁前端資安宇宙 - [Day20] 重中之重：Same-origin policy 與 site](https://ithelp.ithome.com.tw/articles/10323108)
- [Beyond XSS：探索網頁前端資安宇宙 - [Day7] XSS 的第二道防線：CSP](https://ithelp.ithome.com.tw/articles/10315612)
