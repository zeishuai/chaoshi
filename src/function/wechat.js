const startPay = function (configData,payConfig) {
    return new Promise((resolve, reject) => {
        wx.config({
            debug: configData.debug,
            appId: configData.appId, // 必填，公众号的唯一标识
            timestamp: configData.timestamp, // 必填，生成签名的时间戳
            nonceStr: configData.nonceStr, // 必填，生成签名的随机串
            signature: configData.signature,// 必填，签名
            jsApiList: configData.jsApiList // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {
            wx.chooseWXPay({
                debug: configData.debug,
                appId: configData.appId,
                timestamp: payConfig.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: payConfig.nonceStr, // 支付签名随机串，不长于 32 位
                package: payConfig.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: payConfig.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: payConfig.paySign, // 支付签名
                success: function (res) {
                    resolve({map: res})
                },
                fail: function (err) {
                    reject({err: err});
                }
            });
        });
    });
};


export { startPay };
