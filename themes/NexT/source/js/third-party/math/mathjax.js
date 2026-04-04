/* global NexT, CONFIG, MathJax */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.enableMath) return;

  if (typeof MathJax === 'undefined') {
    window.MathJax = {
      tex: {
        inlineMath: { '[+]': [['$', '$']] },
        tags      : CONFIG.mathjax.tags
      },
      options: {
        renderActions: {
          insertedScript: [200, () => {
            document.querySelectorAll('mjx-container').forEach(node => {
              const target = node.parentNode;
              if (target.nodeName.toLowerCase() === 'li') {
                target.parentNode.classList.add('has-jax');
              }
            });
          }, '', false]
        }
      }
    };
    NexT.utils.getScript(CONFIG.mathjax.js, {
      attributes: {
        defer: true
      }
    });
  } else {
    MathJax.startup.document.state(0);
    MathJax.typesetClear();
    MathJax.texReset();
    // Remove CHTML adaptive CSS so MathJax re-injects font glyph styles.
    // Without this, PJAX navigation leaves glyphs invisible because the
    // output jax thinks styles are already present.
    const chtmlStyles = document.getElementById('MJX-CHTML-styles');
    if (chtmlStyles) chtmlStyles.remove();
    if (MathJax.startup.output && MathJax.startup.output.clearCache) {
      MathJax.startup.output.clearCache();
    }
    MathJax.typesetPromise();
  }
});
