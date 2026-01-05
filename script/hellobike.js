let body = $response.body;

try {
  let obj = JSON.parse(body);
  
  // 清空topBanners和bottomBanners，无论它们在哪一层
  function clearBanners(obj) {
    if (typeof obj !== 'object' || obj === null) return;
    
    // 如果是数组，遍历每个元素
    if (Array.isArray(obj)) {
      obj.forEach(item => clearBanners(item));
      return;
    }
    
    // 如果是对象，检查是否有topBanners或bottomBanners属性
    for (let key in obj) {
      if (key === 'topBanners' || key === 'bottomBanners') {
        obj[key] = [];
      } else {
        clearBanners(obj[key]);
      }
    }
  }
  
  clearBanners(obj);
  body = JSON.stringify(obj);
} catch (e) {
  console.log('解析JSON失败：' + e);
}

$done({body});
