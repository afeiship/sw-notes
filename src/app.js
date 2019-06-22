// registet sw:
window.addEventListener('load', function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => console.log('ServiceWorker 注册成功！作用域为: ', registration.scope))
      .catch((err) => console.log('ServiceWorker 注册失败: ', err));

    //self.clients.claim()
    this.navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('changed!', 'You can reload!');
    });
  }
});

console.log('hello app!');
