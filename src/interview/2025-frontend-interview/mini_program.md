### 1. 小程序聊天系统

1.1 创建聊天界面

1.2 实现websocket通信(微信原生api): 初始化websocket连接、监听websocket事件、接收消息处理、发送消息处理

1.3 实现多种消息类型，比如图片、文件等

进阶功能：心跳机制与断线重连

### 2. 基础问题

2.1 生命周期

2.2 登陆流程

用户触发登陆-调用wx.login()-发送登陆凭证code-等待后台处理(openid,session_key)-接收并存储token

2.3 路由跳转

wx.navigateTo,wx.redirectTo,wx.switchTab,wx.navigateBack,wx.reLaunch

2.4 微信支付

wx.login()获取code-获取openid-预支付订单请求-wx.requestPayment()

2.5 小程序原理

2.6 体验优化

加载过程：压缩代码，减少资源数量和大小(oss)，分包，预加载

渲染过程：onLoad获取数据，减少请求(本地存储)，正确使用setData，

2.7 性能优化与分包

优化首屏加载: 代码拆分，资源懒加载，资源压缩，图片优化

网络请求优化：缓存机制，限制请求数量(防抖和节流)，分批加载

优化页面渲染性能：启动速度优化(减少全局数据，分包)，合理使用setData，组件化，内存管理，合理使用异步任务
