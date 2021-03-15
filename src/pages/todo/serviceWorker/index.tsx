import config from "./../config";
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

//注册 sw
export function registerSW() {
  if ('serviceWorker' in navigator) {
    const sw = navigator.serviceWorker;
    sw.register('/sw.bundle.js', {
      scope: '/' //指定 sw 可控制内容的范围
    }).then((reg) => {
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
      console.warn('Registration failed with ' + error);
    });
  } else {
    console.log('Do not support sw');
  }
}

// 注册后, 浏览器将会为你的页面/站点安装并激活 serviceWorker
// install / fetch / activate event to capture requests and decide to content of response



// web push
// 1.subscribe and get permission of notification
export const subscribe = (callback) => {
  // navigator.serviceWorker.getRegistration().then(function (registration) { })
  return navigator.serviceWorker.ready.then(function (register) {
    // 还可以在订阅前对用户是否授予了通知弹出的权限进行验证
    // console.log('register ---- ', register);
    // 若状态一直是 denied , 需要去浏览器添加允许通知权限的域(origin)
    Notification.requestPermission(function (status) {
      console.log('Notification permission status : ', status); // granted or denied
      if (status === "denied") return;
      return register.pushManager
        .getSubscription()
        .then(async function (subscription) {
          // already exist
          if (subscription) {
            console.log('already has subscription.');
            return subscription;
          }
          console.log('get subscription ...');
          // 1.get server's public key
          const response = await fetch(config.HOST + "/vapidPublicKey");
          const vapidPublicKey = await response.text();
          const convertVapidKey = urlBase64ToUint8Array(vapidPublicKey);
          console.log('current pk :: ', vapidPublicKey);
          return register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertVapidKey
          });
        })
        .then(function (subscription) {
          callback(subscription);
        }).catch(err => {
          console.warn('getSubscription :: ', err);
        })
    });
  });
}

// 2.当客户端完成了某个操作后 通知让服务器推送通知消息
export const notifyServerToSendNotification = payload => {
  // 将订阅对象 subscription 和 数据 发送给服务器
  subscribe(subscription => {
    console.log("payload of notifying server : ", payload);
    fetch(config.HOST + "/notifyServer", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        subscription,
        payload
      })
    }).catch(err => {
      console.log("[ err ]: ", err);
    })
  });
}

// 3.add 'push' event to listen and accept information from server

// 4.注销
export const unsubscribe = () => {
  navigator.serviceWorker.ready
    .then(function (registration) {
      return registration.pushManager.getSubscription();
    })
    .then(function (subscription) {
      subscription.unsubscribe().then(function () {
        console.log("Unsubscribed", subscription.endpoint);
        // 若服务器端在订阅时保存了subscription , 则需要订阅响应的接口移除subscription
        // ...fetch('unregister',function(){})
      });
    });
}

export default {
  registerSW,
  subscribe,
  unsubscribe,
  notifyServerToSendNotification
}

