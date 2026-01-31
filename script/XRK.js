// 向日葵VIP解锁脚本 - 安全处理版
console.log("[SunloginVIP] 脚本触发，URL: " + $request.url);

// 安全检查：如果响应体为空或undefined，直接放行
if (!$response.body || $response.body.length === 0) {
    console.log("[SunloginVIP] 警告：响应体为空，跳过处理。响应头:", JSON.stringify($response.headers));
    $done({});
}

try {
    let obj = JSON.parse($response.body);
    console.log("[SunloginVIP] 原始JSON数据解析成功");
    
    // --- 核心修改逻辑（基于您最初提供的有效JSON结构）---
    // 1. 修改账户标识
    obj.showversion = "vip";
    obj.gradename = "vip";
    if (obj.expiredate !== undefined) {
        obj.expiredate = "2099-12-31";
    }
    
    // 2. 解锁所有高级服务 (serviceupgrade)
    if (obj.serviceupgrade) {
        for (let key in obj.serviceupgrade) {
            obj.serviceupgrade[key] = true;
        }
        console.log("[SunloginVIP] 已解锁所有serviceupgrade高级权限");
    }
    
    // 3. 可选：降级基础服务 (servicebase)，使对比更明显
    if (obj.servicebase) {
        for (let key in obj.servicebase) {
            obj.servicebase[key] = false;
        }
        console.log("[SunloginVIP] 已重置servicebase基础权限");
    }
    
    console.log("[SunloginVIP] 修改完成，返回新数据");
    $done({body: JSON.stringify(obj)});
    
} catch (e) {
    console.log("[SunloginVIP] 处理异常: " + e.message);
    console.log("[SunloginVIP] 异常响应体预览:", $response.body.substring(0, 300));
    $done({});
}
