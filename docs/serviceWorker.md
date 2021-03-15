# 产生背景
为解决应用离线后给用户带来糟糕的用户体验, 其中面临最重要的问题是如何缓存静态资源和自定义网络请求.
serviceWorker可以让 app 优先使用缓存资源, 以在离线时或在获取到更多数据之前能提供一个默认的 app 使用体验.

sw 功能类似代理服务器, 允许你修改请求和响应, 并使用缓存来代替它们.

# 使用
> 为安全起见, serviceWorker 需在 HTTPS 下使用; 此外, 为方便本地调试, localhost 也被认为是安全域.

sw 注册过程:
1. installing stage : 标志注册开始, 常用于初始化缓存以及添加离线应用时所需的文件
   - 对应 install 事件
     - 使用 event.waitUntil(promise)来扩展 installing stage 直到该 promise resolved
     - 使用 event.skipWaiting() , 可在激活前任何时间且无需等待当前受控 clients 的关闭就跳过 installed stage 直接进入 activating stage
2. installed stage : sw 安装完成并等待使用其它 sw 的 clients 关闭
3. activating stage : 没有 clients 受控于其它的 sw,该 stage 常用于允许 sw 安装完成或清除其它 sw 相关联的资源,如移除旧缓存
   - 对应 activate 事件
     - 使用 event.waitUntil(promise)来扩展 activating stage 直到该 promise resolved
     - 使用 self.clients.claim()在无需 reload clients 的前提下开始获取所有 open clients 的控制
       - clients 指的是当前应用活动的页面
4. activated stage : sw 现在可以处理功能事件了
5. redundant stage : sw 被其它 sw 所替代

> install --> activate --> redundant
> 三个阶段 , 两个事件(install , activate)

