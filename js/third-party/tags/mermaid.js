// Store original source for each mermaid element so we can re-render on theme change.
const mermaidSources=new WeakMap,renderMermaid=e=>{e.forEach(e=>{const t=mermaidSources.get(e)||e.textContent,r=document.createElement("div");r.className="mermaid",r.textContent=t,mermaidSources.set(r,t);const a=e.parentNode;
// Fix issue #347
// Support mermaid inside backtick code block
a.matches("pre")?a.parentNode.replaceChild(r,a):a.replaceChild(r,e)}),mermaid.initialize({theme:document.body.classList.contains("darkmode--activated")?CONFIG.mermaid.theme.dark:CONFIG.mermaid.theme.light,logLevel:4,flowchart:{curve:"linear"},gantt:{axisFormat:"%m/%d/%Y"},sequence:{actorMargin:50}}),mermaid.run()};document.addEventListener("page:loaded",()=>{const e=document.querySelectorAll(".mermaid");e.length&&NexT.utils.getScript(CONFIG.mermaid.js,{condition:window.mermaid}).then(()=>{
// Save original sources before first render.
e.forEach(e=>mermaidSources.set(e,e.textContent)),renderMermaid(Array.from(e));
// Re-render when dark/light mode is toggled.
let t=document.body.classList.contains("darkmode--activated");new MutationObserver(()=>{const e=document.body.classList.contains("darkmode--activated");if(e===t)return;t=e;const r=document.querySelectorAll(".mermaid");r.length&&renderMermaid(Array.from(r))}).observe(document.body,{attributes:!0,attributeFilter:["class"]})})});