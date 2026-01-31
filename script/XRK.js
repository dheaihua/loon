// 向日葵远程控制VIP解锁脚本
// 匹配URL: https://sl-api.oray.com/client/services

let body = $response.body;

try {
  let obj = JSON.parse(body);
  
  console.log("向日葵服务权限API拦截成功");
  
  // 1. 修改账户版本和等级标识
  obj.showversion = "vip";      // 显示版本改为VIP
  obj.gradename = "vip";        // 等级名称改为VIP
  obj.expiredate = "2099-12-31"; // 设置长期有效期
  
  // 2. 核心：权限交换与升级
  // 将servicebase的所有基础权限(true)转移给serviceupgrade
  // 将serviceupgrade的所有高级权限(false)转移给servicebase
  let tempService = {};
  
  // 复制servicebase的权限结构
  for (let key in obj.servicebase) {
    if (obj.servicebase.hasOwnProperty(key)) {
      // 基础权限中原本为true的功能，在高级权限中也设为true
      tempService[key] = true;
    }
  }
  
  // 复制serviceupgrade的权限结构作为新的基础权限
  let newBaseService = {};
  for (let key in obj.serviceupgrade) {
    if (obj.serviceupgrade.hasOwnProperty(key)) {
      // 高级权限中原本为false的功能，在基础权限中也设为false
      newBaseService[key] = false;
    }
  }
  
  // 应用修改
  obj.serviceupgrade = tempService;    // 高级服务：全部开启
  obj.servicebase = newBaseService;    // 基础服务：保持原有高级服务的状态
  
  // 3. 设置用户远程权限为高级
  obj.userremote = 2; // 可能1是基础，2是高级，根据实际情况调整
  
  // 4. 修改升级相关按钮显示
  if (obj.upgradebtntype === "buy") {
    obj.upgradebtntype = "renew"; // 将"购买"改为"续费"
  }
  
  console.log("账户状态: " + obj.gradename);
  console.log("到期时间: " + obj.expiredate);
  console.log("远程控制权限: " + (obj.serviceupgrade.remote ? "高级" : "基础"));
  console.log("文件传输权限: " + (obj.serviceupgrade.filemgr ? "开启" : "关闭"));
  
  $done({body: JSON.stringify(obj)});
  
} catch (e) {
  console.log("向日葵权限修改失败: " + e.message);
  $done({body: body}); // 出错时返回原始响应
}
