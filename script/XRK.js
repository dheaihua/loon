// 向日葵VIP解锁脚本 - 增强调试版
console.log("脚本开始执行...");

// 1. 首先检查 $response.body 是否存在及类型
if (typeof $response === 'undefined') {
    console.log("错误：$response 对象未定义");
    $done({});
} else if (typeof $response.body === 'undefined') {
    console.log("错误：$response.body 未定义，请求可能未被MITM捕获或为空响应");
    console.log("$response: " + JSON.stringify($response));
    $done({});
} else {
    console.log("获取到响应体，长度：" + $response.body.length);
    // 打印前500个字符，方便查看原始内容
    console.log("响应体预览：" + $response.body.substring(0, 500));
    
    let body = $response.body;
    
    try {
        let obj = JSON.parse(body);
        console.log("JSON解析成功，开始修改...");
        
        // --- 以下是修改逻辑 ---
        // 修改版本标识
        obj.showversion = "vip";
        obj.gradename = "vip";
        if (obj.expiredate !== undefined) {
            obj.expiredate = "2099-12-31";
        }
        
        // 核心：解锁所有高级服务
        if (obj.serviceupgrade) {
            for (let key in obj.serviceupgrade) {
                obj.serviceupgrade[key] = true; // 所有功能设为true
            }
            console.log("serviceupgrade 所有权限已开启");
        }
        
        // 可选：调整基础服务，保持原样或做相应改变
        // if (obj.servicebase) {
        //     for (let key in obj.servicebase) {
        //         obj.servicebase[key] = false; // 或保持原逻辑
        //     }
        // }
        
        console.log("修改完成，准备返回新数据");
        $done({body: JSON.stringify(obj)});
        
    } catch (parseError) {
        // 捕获解析错误，并给出更具体的错误信息
        console.log("JSON解析失败！详细错误：" + parseError.message);
        console.log("出错的响应体开头是：" + body.substring(0, 200));
        // 出错时返回原响应，避免导致客户端异常
        $done({body: body});
    }
}
