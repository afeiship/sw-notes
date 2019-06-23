# basic usge

```js
// 首先引入workbox框架
// 这里说明 importScripts 是同步的：
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js');

workbox.precaching([
  // 注册成功后要立即缓存的资源列表
])

// 缓存策略: networkFirst、cacheFirst、staleWhileRevalidate
workbox.routing.registerRoute(
  new RegExp(''.*\.html'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  new RegExp('.*\.(?:js|css)'),
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('https://your\.cdn\.com/'),
  workbox.strategies.staleWhileRevalidate()
);
```
