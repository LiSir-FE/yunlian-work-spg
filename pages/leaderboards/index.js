const httpConfig = require('../../httpConfig.js')
Page({
  data: {
    // 数据
    list: []
  },
  onLoad: function (options) {
    var that = this;
    wx.ajax({
      url: 'quizes/rank',
      method: 'GET',
      success: function (res) {
        res.data.datas.forEach((item) => {
          item.hostLogo = 'https://resource.wetuc.com/' + item.hostLogo
        })
        that.setData({
          list: res.data.datas,
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

})
