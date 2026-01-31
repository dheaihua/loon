// 向日葵用户信息解锁脚本 (增强调试版)
console.log("[SunloginDebug] === 脚本开始 ===");

let body = $response.body;
console.log("[SunloginDebug] 原始响应长度: " + body.length);
console.log("[SunloginDebug] 原始响应预览: " + body.substring(0, 200) + "...");

try {
    let obj = JSON.parse(body);
    console.log("[SunloginDebug] JSON解析成功");
    
    // === 关键调试：打印完整的原始数据结构 ===
    console.log("[SunloginDebug] 完整原始对象: " + JSON.stringify(obj));
    
    // 检查响应的整体结构
    if (obj) {
        console.log("[SunloginDebug] 对象存在，检查 code 和 data...");
        console.log("[SunloginDebug] obj.code = " + obj.code);
        console.log("[SunloginDebug] obj.data 类型: " + (typeof obj.data));
        
        if (obj.data) {
            console.log("[SunloginDebug] obj.data 内容: " + JSON.stringify(obj.data));
            // 特别检查 gradename 字段
            console.log("[SunloginDebug] 原始 obj.data.gradename = " + obj.data.gradename);
            console.log("[SunloginDebug] 原始 obj.data.servicename = " + obj.data.servicename);
        } else {
            console.log("[SunloginDebug] 警告：obj.data 为 null 或 undefined！");
        }
    }
    
    // === 核心修改逻辑 ===
    // 确保是成功的响应且包含data对象
    if (obj && obj.code === 0 && obj.data) {
        console.log("[SunloginDebug] ✅ 符合修改条件，开始修改...");
        
        // 1. 修改界面显示的关键字段
        // 注意：如果原始gradename为空，这里修改后可能仍需其他字段配合
        obj.data.gradename = "vip";
        obj.data.servicename = "VIP会员";
        
        // 2. 修改其他关联字段
        obj.data.issubscribe = 1;
        if (obj.data.sysexpiredate !== undefined) {
            obj.data.sysexpiredate = "2099-12-31";
        }
        obj.data.amount = 99999;
        
        console.log("[SunloginDebug] ✅ 修改完成");
        console.log("[SunloginDebug] 修改后 gradename = " + obj.data.gradename);
        console.log("[SunloginDebug] 修改后 servicename = " + obj.data.servicename);
        console.log("[SunloginDebug] 修改后完整 data: " + JSON.stringify(obj.data));
        
        $done({body: JSON.stringify(obj)});
    } else {
        console.log("[SunloginDebug] ⚠️ 不符合修改条件，放行原始响应");
        console.log("[SunloginDebug] 条件检查: obj=" + (obj? "true":"false") + 
                   ", code=" + obj.code + 
                   ", data=" + (obj.data? "存在":"null/undefined"));
        $done({});
    }
} catch (e) {
    console.log("[SunloginDebug] ❌ JSON解析异常: " + e.message);
    $done({});
}
console.log("[SunloginDebug] === 脚本结束 ===");
