// Store original source for each mermaid element so we can re-render on theme change.
const mermaidSources = new WeakMap();

const renderMermaid = elements => {
    elements.forEach(element => {
        const src = mermaidSources.get(element) || element.textContent;
        const newElement = document.createElement('div');
        newElement.className = 'mermaid';
        newElement.textContent = src;
        mermaidSources.set(newElement, src);
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
};

document.addEventListener('page:loaded', () => {
    const mermaidElements = document.querySelectorAll('.mermaid');
    if (!mermaidElements.length) return;

    NexT.utils.getScript(CONFIG.mermaid.js, {
        condition: window.mermaid
    }).then(() => {
        // Save original sources before first render.
        mermaidElements.forEach(el => mermaidSources.set(el, el.textContent));
        renderMermaid(Array.from(mermaidElements));

        // Re-render when dark/light mode is toggled.
        let lastDark = document.body.classList.contains('darkmode--activated');
        const observer = new MutationObserver(() => {
            const isDark = document.body.classList.contains('darkmode--activated');
            if (isDark === lastDark) return;
            lastDark = isDark;
            const current = document.querySelectorAll('.mermaid');
            if (current.length) renderMermaid(Array.from(current));
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    });
});
