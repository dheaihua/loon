
let body = $response.body;

try {
  let obj = JSON.parse(body);

  if (obj?.data?.user) {
    const u = obj.data.user;
    
    // ========== 会员状态核心字段 ==========
    u.vip = "1";
    u.userType = 2;
    u.vipExpireTime = "2099-12-31 23:59:59";
    u.isEmployee = "1";
    u.isBossVip = "1";
    u.bossExpireTime = "2099-12-31 23:59:59";
    
    // ========== 99相关功能 ==========
    u.ninetyNineVip = "1";
    u.ninetyNinePopout = "0";
    u.ninetyNineLookExpireTime = "2099-12-31 23:59:59";
    
    // ========== 权益信息 ==========
    u.rightInfo = {
      "name": "永久会员",
      "remainingTime": "9999",
      "price": "0",
      "expireTime": "2099-12-31 23:59:59",
      "popupContent": "您已开通永久会员，享受所有VIP功能！",
      "no": "PERMANENT_VIP_20991231",
      "popupTitle": "永久会员权益",
      "purchaseType": "永久",
      "state": "green"
    };
    
    // ========== 存储空间升级 ==========
    u.userSpaceSize = "10737418240";
    u.projectSpaceSize = "10737418240";
    u.usedSpaceSize = "0";
    u.usedProjectSpaceSize = "0";
    
    // ========== 会员套餐信息 ==========
    u.goodsInfo = [{
      "content": [
        {"基本浏览功能": "1"},
        {"测量": "1"},
        {"体积测量": "1"},
        {"装配树": "1"},
        {"剖切": "1"},
        {"爆炸": "1"},
        {"存储空间": "100G"}
      ],
      "extraSpace": "10G",
      "subscribeNo": "PERMANENT_VIP_20991231",
      "price": "0",
      "no": "PERMANENT_VIP_001",
      "name": "永久VIP会员",
      "subscribePrice": "0"
    }];
    
    // ========== 用户信息增强 ==========
    u.nickName = "超级🐂🍺会员" + Date.now().toString().slice(-6);
    u.photo = "http://service.sview3d.com:80/data/upload/userphotofile/default/vip_icon.jpg";
    u.country = "CN";
    u.lang = "zh";
    u.channelName = "VIP专属通道";
    
    console.log("SV3D会员解锁成功");
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  console.log("SV3D会员解锁失败: " + e);
  $done({});
}
