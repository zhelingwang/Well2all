const host = "http://127.0.0.1:3005";

// 获取订阅对象中的终端 , endpoint
const getEndpoint = () => {
  return self.registration.pushManager.getSubscription().then(subscription => {
    if (subscription) return subscription.endpoint;
    throw new Error('user not subscribed!');
  })
}

// 监听来自服务器 webPush.sendNotification 推送的消息
self.addEventListener('push', event => {
  // 获取 payload 的方式一 : 支持的格式还有 ArrayBuffer , Blob , JSON => event.data.arrayBuffer() / blob() / json()
  // const payload = event.data ? event.data.text() : 'no payload';
  // 此处 payload 来自 webPush.sendNotification(subscription, payload, options)

  // tag作用 : 通知ID , 让你使用新通知代替旧通知或者将多个通知折叠成一个
  // 接收的不同消息需要不同的tag , 否则下一个相同tag的通知会替换旧通知(由于旧通知已经弹出过了,故复用该通知只会替换通知内容而不会再有重新弹出的动作)
  const tag = "TODOList-PWA-sample" + Math.random();
  // 获取 payload 的方式二 : 通过 subscription 的 endpoint 来重发请求
  // 通知可以在caches中自定义一个cache来保存 , 再通过 caches.open('notifications') 获取
  event.waitUntil(
    getEndpoint().
      then(endpoint => {
        return fetch(host + '/getPayload?endpoint=' + endpoint);
      })
      .then(response => response.text())
      .then(payload => {
        payload = JSON.parse(payload);
        self.registration.showNotification("TODO tips", {
          body: payload.text,
          icon: '',
          tag
        });
        // more others options : https://notifications.spec.whatwg.org/ or MDN
      })
  );
});