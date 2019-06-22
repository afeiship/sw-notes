# sw best practice

## 注册

```js
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js',{ scope: '/' })
    .then((registration)=>{
      console.log('registration:->', registration);
    });
}

// { scope: '/' } 需要注意，不要跨域调用，会造成管理混乱
```
## scope:
![](https://ws3.sinaimg.cn/large/006tNc79gy1g4aap3u7rqj319c0m2thm.jpg)


## 注销所有的 serviceWorker

```js
if('serviceWorker' in navigator){
  navigator.serviceWorker.getRegistrations().then(regs=>{
    for(var reg of regs){
      reg.unregister();
    }
  })
}
```


## serviceWorker 触发更新
- 浏览器24小时自动更新一次 ServiceWorker
- 注册user的 ServiceWorker，带上版本号 /sw.js?v=2019-06-22
- 手动更新 registration.update();
- 逐字节对比新的 sw 文件和旧的 sw 文件，有区别才更新


## 实际场景
- 后端上线，前端还是老的。
- 关键代码：client.postMessage('sw.update');
![](https://ws4.sinaimg.cn/large/006tNc79gy1g4acp26rh2j313q0sok92.jpg)
- 这里的client可能有多个，举个例子：指的是浏览器开的多个 Tab
- sw 更新过程
![](https://ws1.sinaimg.cn/large/006tNc79gy1g4acv4f1nbj31680js0yc.jpg)

## Sw端：

```js
self.addEventListener('activate',(event)=>{
  let cacheName = 'a_cache_naem';
  event.waitUntial(
    caches.open(cacheName)
      .then(cache=>{
        // 这里可以清除缓存
        // 或者说是 applyUpdate
      })
      .then(cache=>{
        return self.clients.macthAll()
          .then((clients)=>{
            if(clients && clients.length){
              clients.forEach((client)=>{
                client.postMessage('sw.update');
              })
            }
          })
      })
  )
});
```


## Sw-clients端：

```js
navigator.serviceWorker('message',(e)=>{
  if(e.data === 'sw.update'){
    // 这里可以做一些代码提示，然后再refresh
    window.location.reload();
  }
})
```


## 新的问题 sw.js 的缓存问题
> sw.js 被浏览器给缓存了. 
- 方案1：sw.js 在服务端做 cach-control的处理。
  ```conf
  location ~ \/sw\.js$ {
    add_header Cache-Control no-store;
    add_header Pragma no-cache;
  }
  ```
- 方案2：给sw-register.js
```js
// https://www.demo.com/sw-register.js
// 只有每次上线的时候，才需要添加构建版本号
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js?v=1.2.2');
}

// index.html
<script>
  window.onload = function(){
    var script = document.crateElement('script');
    script.src = '/sw-register.js?v='+Date.now();
    script.async = true;
    docuemnt.head.appendChild(script);
  }
</script>
```
- 下面是两种不行的方案
![](https://ws3.sinaimg.cn/large/006tNc79gy1g4ad87fmjlj31760jon4l.jpg)


## sw 的 fallback.js
- 出了问题怎么办？
  ```js
  if(window.__SW_DISABLE__){
    if('serviceWorker' in navigator){
      navigator.serviceWorker.getRegistrations().then(regs=>{
        for(var reg of regs){
          reg && reg.unregister();
        }
      });
      return;
    }
  }
  ```
