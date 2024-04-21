document.addEventListener('page:loaded', () => {
  console.log('The page has been loaded.');
  const mermaidElements = document.querySelectorAll('.mermaid');
  if (mermaidElements.length) {
    NexT.utils.getScript(CONFIG.mermaid.js, {
      condition: window.mermaid
    }).then(() => {
      mermaidElements.forEach(element => {
        const newElement = document.createElement('div');
        newElement.innerHTML = element.innerHTML;
        newElement.className = element.className;
        const parent = element.parentNode;
        // Fix issue #347
        // Support mermaid inside backtick code block
        if (parent.matches('pre')) {
          parent.parentNode.replaceChild(newElement, parent);
        } else {
          parent.replaceChild(newElement, element);
        }
      });
      mermaid.initialize({
        theme    : document.body.classList.contains("darkmode--activated") ? CONFIG.mermaid.theme.dark : CONFIG.mermaid.theme.light,
        logLevel : 4,
        flowchart: { curve: 'linear' },
        gantt    : { axisFormat: '%m/%d/%Y' },
        sequence : { actorMargin: 50 }
      });
      mermaid.run();
    });
  }
});
