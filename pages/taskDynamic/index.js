// pages/taskDynamic/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: null
  },



  // 获取详情
  getTasksLogs(id) {
    let that = this;
    wx.ajax({
      url: 'tasks/'+id+'/logs',
      data: {
        all: true
      },
      method:'GET',
      success: function(res){
        console.log(res)
        that.setData({
          items: res.data.datas
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // options.id
      console.log(options)
      this.getTasksLogs(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})