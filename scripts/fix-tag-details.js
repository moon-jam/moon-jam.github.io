'use strict';

const util = require('hexo-util');

const config = hexo.config.tag_details || {};
const className = config.className || false;
const openSetting = Object.prototype.hasOwnProperty.call(config, 'open')
  ? Boolean(config.open)
  : false;

hexo.extend.tag.register('details', tagDetails, { ends: true });

hexo.extend.filter.register('after_render:html', html => {
  if (!html || !html.includes('&lt;')) return html;

  return html.replace(/<details(\s[^>]*)?>([\s\S]*?)<\/details>/gs, (full, attrs = '', body = '') => {
    if (!body.includes('&lt;')) return full;

    // Unescape HTML entities outside of <pre> blocks (preserve escaped content in code blocks)
    const fixedBody = body.replace(/([\s\S]*?)(<pre[\s\S]*?<\/pre>|$)/g, (_m, nonPre, pre) => {
      const unescaped = nonPre
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#x2F;/g, '/')
        .replace(/&amp;/g, '&');
      return unescaped + (pre || '');
    });

    return `<details${attrs}>${fixedBody}</details>`;
  });
});

function tagDetails(args, content = '') {
  const isOpen = value => value === 'mode:open';
  const isClose = value => value === 'mode:close';
  const isMode = value => isOpen(value) || isClose(value);

  const filtered = args.filter(value => !isMode(value));
  const modeArg = args.find(value => isMode(value));
  const modeFlag = isOpen(modeArg);
  const openMode = filtered.length < args.length ? modeFlag : openSetting;

  const summary = util.htmlTag('summary', {}, filtered.join(' '));
  const rendered = hexo.render.renderSync({ text: content, engine: 'markdown' });

  const attrs = {};
  if (openMode) attrs.open = 'open';
  if (className) attrs.class = className;

  // Keep nested HTML from rendered markdown (e.g. <summary>, <figure>) unescaped.
  return util.htmlTag('details', attrs, summary + rendered, false);
}
