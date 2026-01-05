/**
 * 发现精彩 - 开屏广告拦截脚本
 * 作用：
 * 1. 阻断广告日志上报
 * 2. 阻断广告配置下发
 * 3. 防止广告再次被注入
 */

$done({
  status: 200,
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    success: true,
    data: null,
    msg: "blocked by loon"
  })
});
