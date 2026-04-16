let obj = JSON.parse($response.body);

// ======================
// 🚫 去除 loading 启动广告（安全版）
// ======================
if (obj.loading) {
  obj.loading.loadingEnoughTime = 0;
  obj.loading.slideBan = false;
  obj.loading.headImg = "";
  obj.loading.brandImg = "";
  obj.loading.slogan = "";
}

// ======================
// ✂️ 精简底栏（首页 + 我的）
// ======================
if (obj.tabs) {
  obj.tabs = obj.tabs.filter(t => 
    t.tabId === "home" || t.tabId === "my"
  );

  // 删除金融预请求
  obj.tabs.forEach(t => {
    delete t.preRequest;
  });
}

// ======================
$done({ body: JSON.stringify(obj) });
