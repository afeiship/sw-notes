# use sw
> Service Worker 应用.
- https://www.bilibili.com/video/av35880493

## sw-register.js
```js
window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => console.log('ServiceWorker 注册成功！作用域为: ', registration.scope))
      .catch((err) => console.log('ServiceWorker 注册失败: ', err));
  }
});
```

## sw.js
- install
  ```js
  self.addEventListener('install', (event)=>{
    event.waitUntil(
      caches.open('cache_v1_1.0.0').then(cache=>{
        return cache.addAll([
          '/',
          'app.js',
          'style.css'
        ]);
      })
    )
  })
  ```
- activate
  ```js
  self.addEventListener('activate',(event)=>{
    
  })
  ```


## CacheStorage
- open 创建一个缓存的空间
- delete 删除 by Name
- keys 列出所有
- match 命中
- has ?

## Cache
- add
- addAll
- delete
- keys
- match
- matchAll
- put
