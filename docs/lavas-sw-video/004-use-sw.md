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
    clearCache();
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

## sw更新流程
- 页面发送请求
- new ServiceWorker
- sw-install (precache)
- skipWaiting
- activate (新的SW获取控制权，clearOldCache)
- tips(提示用户更新，请刷新页面)

## install 流程
```js
// 按上面流程，代码更新如下：
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['/', 'app.js', 'style.css']).then(() => {
        self.skipWaiting();
      });
    })
  );
});
```

## activate 流程

```js
self.addEventListener('activate', (event) =>
  event.waitUntil(
    caches.keys().then((cacheList) =>
      Promise.all([
        cacheList.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            caches.delete(cacheName);
          }
        }),
        // 控制权发生变化
        self.clients.claim()
      ])
    )
  )
);
```

## 判断online/offline

```js
// navigator.onLine
navigator.addEventListener('online',()=>{
  conosle.log('online!');
});
// on offline:
navigator.addEventListener('offline',()=>{
  conosle.log('offline!');
});
```


