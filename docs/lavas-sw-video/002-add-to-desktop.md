# Add to desktop
> 将网站添加至桌面.

## web app manifest
- 是w3c提出的一项标准
  - 有唯一的图标与其它站点区分
  - 控制主屏启动地的内容，避免生硬过渡
  - 隐藏了与浏览器相关的UI
- 一个简单的JSON文件
  ```json
  {
    "name":"百度天气",
    "short_name":"天气"
    ...
  }
  ```
- 引入到浏览器
  ```html
  <link rel="manifest" href="/assets/manifest.json">
  ```

## 如何调试 APP Manifest
- Chrome 工具
- Charles 代理

## 相关属性介绍
> 下面的属性，在不同浏览器支持程度并不一致.

- name: 应用名称，用于安装横幅提示的名称和启动画面中的文字
- short_name: 手机主屏上显示的名称
- display: "standalone"，用于（fullscreen/standalone/minialui/browser）
  - 推荐这两个：fullscreen/standalone
- start_url: 就用打开时的网址
- icons: 桌面图标和启动画面时的图标
- background_color: 启动画面的背景颜色 
- theme_color: 用户设置状态、地址栏的颜色 

## 跳出安装提示横幅的条件
- 部署 manifets 而且正确安装
- 注册了 serviceWorker
- 支持 https 访问
- 用户在同一浏览器中至少2次访问，且时间间隔少于5分钟


## resources
- https://www.bilibili.com/video/av35835201/
