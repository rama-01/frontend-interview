### 1. CommonJS,ES6模块化
- 前者支持动态导⼊，也就是 require(${path}/xx.js)，后者目前不支持，但是已有提案,前者是同步导⼊，因为用于服务端，文件都在本地，同步导⼊即使卡住主线程影响也不大。
- 而后者是异步导⼊， 因为用于浏览器， 需要下载文件， 如果也采用同步导⼊会对渲染有很大影响
- 前者在导出时都是值拷贝，就算导出的值变了， 导⼊的值也不会改变，所以如果想更新值，必须重新导⼊⼀次。
- 但是后者采用实时绑定的方式， 导⼊导出的值都指向同⼀个内存地址，所以导⼊值会跟随导出值变化后者会编译成 require/exports 来执行的

```js
// a.js
module.exports = {
    a: 1
}
// or
exports.a = 1

// index.js
var module = require('./a')
console.log(module)  // {a : 1}

// exports的内部实现
var module = {
    exports: {},
}
var exports = module.exports
```

### 2. 继承
```js
// ES5
function Super(){}
Super.prototype.getNumber = function(){}

function Sub(){}

Sub.prototype = Object.create(Super.prototype,{
    constructor:{
        value: Sub,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

const s = new Sub()

// ES6
class Sub extends Super {}

// Object.setPrototypeOf(obj,prototype)
Object.setPrototypeOf(Sub.prototype,Super.prototype)
```

### 3. 事件机制
1. 事件触发三阶段
- document往事件触发处传播，遇到注册的捕获事件会触发
- 传播到事件触发处，出发注册的事件
- 从事件触发处往document传播，遇到注册的冒泡事件会触发

2. 事件代理  
如果⼀个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册在父节点上。优点：节省内存，不需要给子节点注销事件

### 4. 跨域
因为浏览器出于安全考虑，有同源策略，如果协议、域名、端口有一个不同就是跨域。
1. JSONP<br>
    利用script标签没有跨域限制的漏洞，通过script标签指向一个需要访问的地址并提供一个回调来接收数据
2. CORS<br>
    - CORS需要浏览器和后端同时支持
    - 只要后端实现了CORS，就实现了跨域，浏览器会自动进行CORS通信
    - 服务端设置Access-Control-Allow-Origin就可以开启CORS
3. document.domain<br>
    该方式只适用于二级域名相同的情况下，比如a.example.com,b.example.com,它们同属于基础域名example.com。页面设置document.domain = 'example.com'
4. postMessage

### 5. EventLoop
js在执行过程中会产生执行环境，这些执行环境会按顺序加入到执行栈中。先执行同步代码，如果遇到异步代码，会被挂起并加入到Task队列中。一旦执行栈为空，EventLoop就会从Task队列中取出需要执行的代码并放入执行栈中执行，从本质上讲js的异步还是同步行为。

EventLoop：
- 执行同步代码（宏任务）
- 若执行栈为空，查询是否有微任务需要执行
- 执行所有的微任务
- 如有必要rendering UI
- 开始下一轮EventLoop，执行宏任务中的异步代码

宏任务：
- script
- setTimeout
- setInterval
- setImmediate
- I/O
- UI rendering

微任务：
- process.nextTick
- promise
- MutationObserver

### 6. Service Worker
Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理 。它们旨在 ( 除其他之外) 使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作 。他们还允许访问推送通知和后台同步API
```js
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      console.log('Service Worker 注册成功：', registration);
    })
    .catch(function(error) {
      console.log('Service Worker 注册失败：', error);
    });
}

// 在 Service Worker 中缓存资源
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js'
      ]);
    })
  );
});

// 拦截网络请求并从缓存中返回资源
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
```
[Service Worker,PWA](https://zhuanlan.zhihu.com/p/658101025)

### 7. 浏览器渲染机制
- Parsing HTML
- Parsing CSS
- Constructing the Rendering Tree
- Layout
- Painting
- Compositing
[The Anatomy of Browser Rendering](https://medium.com/@regondaakhil/the-anatomy-of-browser-rendering-how-web-pages-come-to-life-6fa9e801a3f)

### 8. 性能优化
1. DNS预解析
2. 缓存
- 强缓存<br>
   实现强缓存可以通过两种响应头实现，Expires，Cache-Control。
- 协商缓存<br>
    协商缓存需要发送请求，如果缓存有效，会返回304.协商缓存需要客户端和服务端共同实现。
    - Last-Modified，If-Modified-Since<br>
        Last-Modified是本地文件最后修改时间，If-Modified-Since会将前者的值发送给服务器，询问该日期后是否有资源更新，如果有将发送新的资源，否则使用缓存
    - ETag，If-None-Match<br>
        If-None-Match会将ETag发送给服务器，询问该资源ETag是否变动，并且ETag优先级比Last-Modified高
3. 使用HTTP/2.0
4. 预加载<br>
`<link rel='preload' href=''>`
5. 预渲染<br>
`<link rel='prerender' href=''>`
6. 懒执行和懒加载
7. 文件优化
- 图片加载优化
    - 使用CDN
    - 小图使用base64
    - 雪碧图
    - webP
    - 图标类使用svg
- 其他文件
    - 服务端开启文件压缩功能
    - script标签放在body底部，script标签加上defer，async
    - 对于需要大量计算逻辑的代码，使用WebWorker，另开一个脚本执行线程而不影响渲染
8. webpack优化
- 对于webpack4，打包项目时开启production模式，自动开启代码压缩
- 开启tree-shaking，删除无用的代码
- 按照路由拆分代码，实现按需加载
- 给打包出来的文件名加上哈希，实现浏览器缓存

### 9. 

