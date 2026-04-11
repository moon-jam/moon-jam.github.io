'use strict';

hexo.extend.generator.register('random-posts', function(locals) {
  const urls = locals.posts.toArray()
    .filter(post => post && post.published !== false && post.hidden !== true)
    .map(post => String(post.path || '').replace(/^\/+/, ''))
    .filter(Boolean)
    .map(path => `/${path}`);

  const uniqueUrls = Array.from(new Set(urls));

  return {
    path: 'random-posts.json',
    data: JSON.stringify(uniqueUrls)
  };
});