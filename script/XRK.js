// 向日葵用户信息解锁脚本 (针对 passport/me 接口)
// 匹配URL: https://slapi.oray.net/passport/me

console.log("[SunloginUser] 用户信息接口拦截成功");

let body = $response.body;
try {
    let obj = JSON.parse(body);
    
    // 确保是成功的响应且包含data对象
    if (obj && obj.code === 0 && obj.data) {
        console.log("[SunloginUser] 原始等级: ", obj.data.gradename);
        
        // === 核心修改 ===
        // 1. 修改界面显示的关键字段
        obj.data.gradename = "vip";
        obj.data.servicename = "VIP会员";
        
        // 2. 修改其他关联字段，使状态更完整（可选但推荐）
        obj.data.issubscribe = 1;
        if (obj.data.sysexpiredate !== undefined) {
            obj.data.sysexpiredate = "2099-12-31";
        }
        obj.data.amount = 99999;
        
        console.log("[SunloginUser] 修改后等级: ", obj.data.gradename);
        console.log("[SunloginUser] 用户信息已更新为VIP");
        
        // ===== 新增的调试信息 =====
        // 打印完整的data对象（便于全面检查）
        console.log("[SunloginUser] 调试：修改后的data对象 => " + JSON.stringify(obj.data));
        // 同时打印关键字段（便于快速确认）
        console.log("[SunloginUser] 调试：gradename=" + obj.data.gradename + ", servicename=" + obj.data.servicename);
        
        $done({body: JSON.stringify(obj)});
    } else {
        console.log("[SunloginUser] 响应格式不符，放行");
        $done({});
    }
} catch (e) {
    console.log("[SunloginUser] 处理异常: " + e.message);
    $done({});
}
