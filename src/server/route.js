const Router = require('koa-router');
const router = new Router();

const webPush = require('web-push');

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    const vapidKeys = webPush.generateVAPIDKeys();
    process.env.VAPID_PUBLIC_KEY = vapidKeys.publicKey;
    process.env.VAPID_PRIVATE_KEY = vapidKeys.privateKey;
    console.log(vapidKeys);
    webPush.setVapidDetails(
        'mailto:welltooall@gmail.com',
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );
}
const respondData = (code = 0, msg = 'success', data = '') => ({ code, data, msg });

const payloads = {};

router.get('/', (ctx, next) => {
    ctx.response.body = "index";
});

router.get('/vapidPublicKey', function (ctx, next) {
    ctx.response.body = process.env.VAPID_PUBLIC_KEY;
});

router.post('/register', function (ctx, next) {
    ctx.response.status = 201;
});
// 获取客户端发送过来的通知, 并将订阅对象和数据保存起来, 再向客户端推送一个消息
// 客户端的 sw 对象通过监听 push 事件来接收服务器推送的消息
router.post('/notifyServer', async function (ctx, next) {
    const { subscription, payload } = ctx.request.body;
    const options = {
        TTL: 3000
    };
    // console.log(ctx.request.body, '----', subscription);
    payloads[subscription.endpoint] = payload;
    await webPush.sendNotification(subscription, "fake payload from webPush.sendNotification", options)
        .then(function () {
            ctx.response.status = 201;
            ctx.response.body = respondData();
        })
        .catch(function (error) {
            ctx.response.status = error.statusCode;
            ctx.response.body = respondData(error.statusCode, error, null);
        });
});

router.get('/getPayload', function (ctx, next) {
    console.log('getPayload ---- ');
    ctx.response.body = (payloads[ctx.request.query.endpoint]);
});

module.exports = router;