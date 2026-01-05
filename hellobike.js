
// 清空哈啰出行挑战赛数据
let body = $response.body;

try {
  // 替换topBanners为空数组
  body = body.replace(/"topBanners":\[.*?\]/g, '"topBanners":[]');
  
  // 替换bottomBanners为空数组
  body = body.replace(/"bottomBanners":\[.*?\]/g, '"bottomBanners":[]');
  
  // 替换resources为空数组（可选）
  body = body.replace(/"resources":\[.*?\]/g, '"resources":[]');
  
  // 如果是模块化结构，删除整个挑战赛模块
  body = body.replace(/"moduleId":"challenge_round".*?},?/g, '');
  
  console.log("哈啰出行挑战赛模块已移除");
} catch (e) {
  console.log("处理响应时出错：" + e);
}

$done({body});
