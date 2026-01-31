// ========== 向日葵四接口终极解锁脚本 ==========
// 支持接口：
// 1. 功能权限：https://sl-api.oray.com/client/services
// 2. 用户信息：https://slapi.oray.net/passport/me
// 3. 用户中心：https://user-api-v2.oray.com/users/
// 4. 图片状态：https://slapi.oray.net/image/list

(function() {
    'use strict';
    
    const url = $request.url;
    const logPrefix = "[SunloginVIP]";
    
    console.log(`${logPrefix} === 脚本触发 ===`);
    console.log(`${logPrefix} URL: ${url}`);
    
    // 安全检查
    if (!$response.body) {
        console.log(`${logPrefix} ⚠️ 响应体为空，跳过处理`);
        $done({});
        return;
    }
    
    let originalBody = $response.body;
    let obj;
    
    try {
        obj = JSON.parse(originalBody);
    } catch (e) {
        console.log(`${logPrefix} ❌ JSON解析失败: ${e.message}`);
        $done({});
        return;
    }
    
    let modified = false;
    
    // ===== 接口1：用户信息接口 (passport/me) =====
    if (url.includes('/passport/me')) {
        console.log(`${logPrefix} 🎯 接口1：用户信息接口`);
        
        if (obj && obj.code === 0 && obj.data) {
            console.log(`${logPrefix}   原始等级: ${obj.data.gradename}`);
            
            // 核心修改
            obj.data.gradename = "vip";
            obj.data.servicename = "VIP会员";
            obj.data.issubscribe = 1;
            
            // 增强字段
            if (obj.data.sysexpiredate !== undefined) {
                obj.data.sysexpiredate = "2099-12-31";
            }
            if (obj.data.amount !== undefined) {
                obj.data.amount = 99999;
            }
            
            modified = true;
            console.log(`${logPrefix}   ✅ 修改完成 -> 等级: ${obj.data.gradename}`);
        }
    }
    
    // ===== 接口2：功能权限接口 (client/services) =====
    else if (url.includes('/client/services')) {
        console.log(`${logPrefix} 🎯 接口2：功能权限接口`);
        
        if (obj.serviceupgrade) {
            console.log(`${logPrefix}   原始版本: ${obj.showversion || '未知'}`);
            
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
            
            // 调整基础服务显示
            if (obj.servicebase) {
                for (let key in obj.servicebase) {
                    obj.servicebase[key] = false;
                }
            }
            
            modified = true;
            console.log(`${logPrefix}   ✅ 所有高级功能已开启`);
        }
    }
    
    // ===== 接口3：用户中心接口 (users/) =====
    else if (url.includes('/users/')) {
        console.log(`${logPrefix} 🎯 接口3：用户中心接口`);
        
        console.log(`${logPrefix}   原始状态 -> ismember: ${obj.ismember}, grade: ${obj.grade}`);
        
        // 核心修改
        obj.ismember = true;
        obj.grade = "1"; // VIP等级
        
        // 增强修改
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
        console.log(`${logPrefix}   ✅ 修改完成 -> ismember: ${obj.ismember}, grade: ${obj.grade}`);
    }
    
    // ===== 接口4：图片状态接口 (image/list) =====
    else if (url.includes('/image/list')) {
        console.log(`${logPrefix} 🎯 接口4：图片状态接口`);
        
        if (obj && obj.code === 0 && obj.data) {
            console.log(`${logPrefix}   原始vip字段: "${obj.data.vip}"`);
            console.log(`${logPrefix}   原始upgrade: ${obj.data.upgrade}`);
            
            // 核心：修改VIP状态 - 尝试不同的值
            obj.data.vip = "1"; // 关键修改！
            
            // 修改升级状态
            obj.data.upgrade = 0; // 0表示已升级，无需再升级
            
            // 可选：修改图片资源为VIP版本
            // 注意：需要知道VIP图片的实际URL
            // obj.data.service = "https://cdn.orayimg.com/sunlogin/slapi/img/service/app_v4/1_zh_CN_white.png";
            // obj.data.service_dark = "https://cdn.orayimg.com/sunlogin/slapi/img/service/app_v4/1_zh_CN_black.png";
            // obj.data.servicename = "https://cdn.orayimg.com/sunlogin/slapi/img/service/app_v2/1_zh_CN_sername.png";
            
            modified = true;
            console.log(`${logPrefix}   ✅ 修改完成 -> vip: "${obj.data.vip}", upgrade: ${obj.data.upgrade}`);
        }
    }
    
    // ===== 最终返回 =====
    if (modified) {
        console.log(`${logPrefix} ✅ 接口修改成功，返回新数据`);
        $done({body: JSON.stringify(obj)});
    } else {
        console.log(`${logPrefix} ⚠️ 非目标接口，放行原始响应`);
        $done({});
    }
    
    console.log(`${logPrefix} === 脚本结束 ===`);
})();
