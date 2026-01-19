/*
 * SView3D VIP Rewrite
 * 仅修改前端会员判断字段
 */

let body = $response.body;
if (!body) $done({});

try {
  let obj = JSON.parse(body);

  if (obj?.data?.user) {
    const user = obj.data.user;

    // 1️⃣ 强制会员状态
    user.vip = 1;
    user.ninetyNineVip = "1";
    user.userType = 2;

    // 2️⃣ 设置超远过期时间
    user.vipExpireTime = "2099-12-31 23:59:59";
    user.ninetyNineLookExpireTime = "2099-12-31 23:59:59";

    // 3️⃣ 清空权益弹窗
    if (user.rightInfo) {
      user.rightInfo.state = "green";
      user.rightInfo.popupTitle = "";
      user.rightInfo.popupContent = "";
      user.rightInfo.name = "会员";
    }

    // 4️⃣ 防止前端再次判断到期
    user.isBossVip = "1";
  }

  body = JSON.stringify(obj);
} catch (e) {
  console.log("VIP Rewrite Error:", e);
}

$done({ body });
