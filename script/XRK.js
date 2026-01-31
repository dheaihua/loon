
// ========== 向日葵全接口解锁脚本 (最终整合版) ==========
// 支持接口：
// 1. 用户信息接口：https://slapi.oray.net/passport/me
// 2. 功能权限接口：https://sl-api.oray.com/client/services
// 3. 用户中心接口：https://user-api-v2.oray.com/users/

console.log("[SunloginAll] === 脚本开始 ===");
console.log("[SunloginAll] 请求URL: " + $request.url);

// 安全检查
if (!$response.body) {
    console.log("[SunloginAll] ⚠️ 响应体为空，跳过处理");
    $done({});
}

let body = $response.body;
console.log("[SunloginAll] 原始响应长度: " + body.length);
console.log("[SunloginAll] 原始响应预览: " + body.substring(0, 200) + "...");

try {
    let obj = JSON.parse(body);
    console.log("[SunloginAll] ✅ JSON解析成功");
    
    // 打印完整原始对象用于调试
    console.log("[SunloginAll] 完整原始对象: " + JSON.stringify(obj));
    
    let modified = false;
    let requestUrl = $request.url;
    
    // ===== 情况1：用户信息接口 (passport/me) =====
    if (requestUrl.indexOf('/passport/me') !== -1) {
        console.log("[SunloginAll] 🎯 识别为用户信息接口");
        
        if (obj && obj.code === 0 && obj.data) {
            console.log("[SunloginAll] 原始数据 -> 等级: " + obj.data.gradename + 
                       ", 服务名: " + obj.data.servicename);
            
            // 核心修改
            obj.data.gradename = "vip";
            obj.data.servicename = "VIP会员";
            obj.data.issubscribe = 1;
            
            // 增强字段修改
            if (obj.data.sysexpiredate !== undefined) {
                obj.data.sysexpiredate = "2099-12-31";
            }
            if (obj.data.amount !== undefined) {
                obj.data.amount = 99999;
            }
            
            modified = true;
            console.log("[SunloginAll] ✅ 用户信息修改完成 -> 新等级: " + obj.data.gradename);
            console.log("[SunloginAll] 修改后完整data: " + JSON.stringify(obj.data));
        }
    }
    
    // ===== 情况2：功能权限接口 (client/services) =====
    else if (requestUrl.indexOf('/client/services') !== -1) {
        console.log("[SunloginAll] 🎯 识别为功能权限接口");
        
        if (obj.serviceupgrade) {
            console.log("[SunloginAll] 原始版本: " + (obj.showversion || "未知"));
            
            // 修改账户标识
            obj.showversion = "vip";
            obj.gradename = "vip";
            if (obj.expiredate !== undefined) {
                obj.expiredate = "2099-12-31";
            }
            
            // 解锁所有高级服务
            for (let key in obj.serviceupgrade) {
                obj.serviceupgrade[key] = true;
            }
            
            // 可选：调整基础服务显示
            if (obj.servicebase) {
                for (let key in obj.servicebase) {
                    obj.servicebase[key] = false;
                }
            }
            
            modified = true;
            console.log("[SunloginAll] ✅ 高级功能权限已全部开启");
        }
    }
    
    // ===== 情况3：用户中心接口 (users/) =====
    else if (requestUrl.indexOf('/users/') !== -1) {
        console.log("[SunloginAll] 🎯 识别为用户中心接口");
        
        console.log("[SunloginAll] 原始状态 -> ismember: " + obj.ismember + ", grade: " + obj.grade);
        
        // 核心修改
        obj.ismember = true;
        obj.grade = "1";  // 可能 "1" 代表VIP，"2"代表更高级别
        
        // 增强修改（可选但推荐）
        if (obj.accountmode && obj.accountmode.isexperience !== undefined) {
            obj.accountmode.isexperience = false;
        }
        
        if (obj.isenterprise !== undefined) {
            obj.isenterprise = 1;
        }
        
        if (obj.balance !== undefined) {
            obj.balance = 99999;
        }
        
        modified = true;
        console.log("[SunloginAll] ✅ 用户中心修改完成 -> ismember: " + obj.ismember + ", grade: " + obj.grade);
    }
    
    // ===== 最终处理 =====
    if (modified) {
        console.log("[SunloginAll] ✅ 修改完成，返回新数据");
        $done({body: JSON.stringify(obj)});
    } else {
        console.log("[SunloginAll] ⚠️ 非目标接口或无需修改，放行原始响应");
        $done({});
    }
    
} catch (e) {
    console.log("[SunloginAll] ❌ JSON解析异常: " + e.message);
    $done({});
}

console.log("[SunloginAll] === 脚本结束 ===");
