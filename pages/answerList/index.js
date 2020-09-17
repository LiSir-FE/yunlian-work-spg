// pages/answerList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableData: []
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.ajax({
      url: 'quizes/his',
      method: 'GET',
      success: function(res) {
        that.setData({
          tableData: res.data.datas.datas
        })
      },
      fail: function(err) {
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  onUnload: function () {//如果页面被卸载时被执行
      wx.switchTab({
        url: '../me/index',
      })
  },

  // 详情
  loadmoreTap(e) {
      wx.navigateTo({
        url: '../answerDetails/index?time=' + e.currentTarget.dataset.time,
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})