/* global NexT, CONFIG, MathJax */
document.addEventListener("page:loaded",()=>{if(CONFIG.enableMath)if("undefined"==typeof MathJax)window.MathJax={tex:{inlineMath:{"[+]":[["$","$"]]},tags:CONFIG.mathjax.tags},options:{renderActions:{insertedScript:[200,()=>{document.querySelectorAll("mjx-container").forEach(t=>{const e=t.parentNode;"li"===e.nodeName.toLowerCase()&&e.parentNode.classList.add("has-jax")})},"",!1]}}},NexT.utils.getScript(CONFIG.mathjax.js,{attributes:{defer:!0}});else{MathJax.startup.document.state(0),MathJax.typesetClear(),MathJax.texReset();
// Remove CHTML adaptive CSS so MathJax re-injects font glyph styles.
// Without this, PJAX navigation leaves glyphs invisible because the
// output jax thinks styles are already present.
const t=document.getElementById("MJX-CHTML-styles");t&&t.remove(),MathJax.startup.output&&MathJax.startup.output.clearCache&&MathJax.startup.output.clearCache(),MathJax.typesetPromise()}});