/**
 * 发现精彩 - 开屏广告生命周期阻断
 * 不影响主业务，只让广告“走不下去”
 */

$done({
  status: 200,
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    success: true,
    data: null,
    msg: "ads blocked"
  })
});
