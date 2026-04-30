'use strict';

function resolveScope(post) {
  const raw = String(post.post_scope || post.scope || '').trim().toLowerCase();
  return ['home', 'posts', 'both'].includes(raw) ? raw : '';
}

hexo.extend.generator.register('posts', function(locals) {
  const posts = locals.posts.filter(post => {
    if (post.hidden === true || post.published === false) return false;

    const scope = resolveScope(post);
    if (scope) return scope === 'posts' || scope === 'both';

    return post.categories.toArray().some(cat => cat.name === '貼文');
  }).sort('-date');

  return {
    path: 'posts/index.html',
    data: { posts },
    layout: ['posts']
  };
});
