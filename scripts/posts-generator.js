'use strict';

hexo.extend.generator.register('posts', function(locals) {
  const posts = locals.posts.filter(post => {
    return post.categories.toArray().some(cat => cat.name === '貼文');
  }).sort('-date');

  return {
    path: 'posts/index.html',
    data: { posts },
    layout: ['posts']
  };
});
