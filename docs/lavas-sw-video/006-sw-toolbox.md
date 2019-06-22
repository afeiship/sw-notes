# sw-toolbox
- sw-precache 构建工具
- sw-toolbox 动态缓存
- workbox 集大成者

## precache 的简单实现
```js
self.addEventListener('install',()=>{
  //
});

self.addEventListern('activate',()=>{

})
```


## sw-precache 插件
```js
new SwPrecacheWebpackPlugin({
  cacheId:'sw-tools',
  filename:'service-worker.js'
})
```

## 动态缓存
- API 资源
- 第三方资源
- 需要在实际请求的时候再去缓存
```js
// 同一个插件
new SwPrecacheWebpackPlugin({
  cacheId:'sw-tools',
  filename:'service-worker.js',
  runtimeCaching:[
    {
      urlPattern: ''
    }
  ]
})
```
