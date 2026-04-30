'use strict';

// Exclude posts that are only categorized as "貼文" from the homepage index.
// Posts that also belong to any other category should still appear on home.
function resolveScope(post) {
  const raw = String(post.post_scope || post.scope || '').trim().toLowerCase();
  return ['home', 'posts', 'both'].includes(raw) ? raw : '';
}

hexo.extend.filter.register('template_locals', function(locals) {
  if (!locals.page || !locals.page.__index) return locals;

  const filtered = locals.page.posts.filter(post => {
    if (post.hidden === true || post.published === false) return false;

    const scope = resolveScope(post);
    if (scope) return scope === 'home' || scope === 'both';

    const categoryNames = post.categories.toArray().map(cat => cat.name);
    const hasPostCategory = categoryNames.includes('貼文');
    if (!hasPostCategory) return true;

    return categoryNames.some(name => name !== '貼文');
  });

  locals.page.posts = filtered;
  return locals;
});
