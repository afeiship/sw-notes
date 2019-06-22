# sw-introduction
> Service Worker 初探.

- https://www.bilibili.com/video/av35872705/


## 以前常见的优化手段
- CDN
- CSS Sprite
- Compress/Gzip
- Async/Defer
- HttpCache
- ....

## Sw 出现了
- 网页秒开
- 可以离线浏览

## 原理
![](https://ws1.sinaimg.cn/large/006tNc79gy1g49unu5xsoj30z60fydig.jpg)

## 前身 AppCache 
- appcache.manifest

```html
<html manifest="appcache.manifest" >
  <!-- ... -->
</html>
```

```conf
CACHE MANIFEST
# 2019年06月22 13时06分44秒

; 需要缓存的列表
CACHE:
/favicon.ico
index.html
style.css
images/logo.png

; 不需要缓存的
NETWORK:
/api

FALLBACK:
/index.html
/static.html
```

缺点：Google 开发者写的文章
- 声明式的，控制力度很小
- http://alistapart.com/article/application-cache-is-a-douchebag/


## ServiceWorker 基本特性
- 因为是子线程，所以，不能直接操作 DOM
- 需要时唤醒，不需要的时候关闭
- 可编辑的网络代理，可控
- 安装了，永远存活
- 必须 在https/localhost 下工作
  - sw很强大，保证安全，所以必须 https
- 使用 Promise

## 简化生命周期
- register
- install
- activate

## 使用过程
- 注册代码：sw-register.js
- 工作代码：sw.js
- 放在 load 里进行，防止抢占资源，而影响了实际的用户体验
- 同一个域名下，可以注册多个不同的sw.js，只要管理不同的 scope就行了

## 注意事项
![](https://ws3.sinaimg.cn/large/006tNc79gy1g49v1zdfznj31040mgdke.jpg)

