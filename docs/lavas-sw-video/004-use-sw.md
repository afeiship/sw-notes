# use sw
> Service Worker 应用.
- https://www.bilibili.com/video/av35880493

## 缓存策略
- css/js 等，优化从缓存获取 
- api 等，network 获取 

## 常见的缓存策略
- Cache Only (所有的资源从缓存中获取返回，如果缓存找不到，则失败；对于static比较合适)
- Network Only(适应于坚决不缓存的需求，send_event 等打点的需求)
- Cache, falling back to network (优先从cache中获取，失败再从network中获取 )
- Network, falling back to cache (反之)
- Cache & network race (同时从网络和硬盘获取，取快的；硬盘极慢的情况，现在不觉了)
- Cache then network (优先从Cache获取，网络较新，则后面覆盖这里的内容)
- Generic fallback

## 注意事项
- 测试一下缓存情况 `curl -I -L https://www.demo.com/sw.js`
- 另外，浏览器对 `sw.js` 最多只缓存 24 小时，不管服务器设置的缓存有多长时间
- 避免缓存跨域资源
  - 只缓存200的结果
  - 响应类型为 basic/cors 类型的；同源的或者正确的跨域结果
- 注意存储空间

## SW都有现成的解决方案
- workbox  


```shell
curl -I -L https://www.demo.com/tucloud/sw.js

# HTTP/1.1 200 OK
# Server: nginx/1.10.3 (Ubuntu)
# Date: Sat, 22 Jun 2019 13:52:41 GMT
# Content-Type: application/javascript
# Content-Length: 13264
# Connection: keep-alive
# Vary: Accept-Encoding
# Accept-Ranges: bytes
# ETag: W/"13264-1561112077000"
# Last-Modified: Fri, 21 Jun 2019 10:14:37 GMT
# Vary: Accept-Encoding
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: GET, POST, OPTIONS
# Access-Control-Allow-Headers: DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization
```

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


