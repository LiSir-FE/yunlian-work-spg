// pages/courseworks/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title: '',
      title2: '',
      id: '',
      courseId: '',


      content: ''
  },
  changeContext(e) {
    this.setData({
      content: e.detail.value
    })
  },

  submission() {
    let that = this;
    wx.ajax({
      url: `courseworks/${that.data.id}/answer`,
      method: 'POST',
      data: {
        cwaContent: that.data.content
      },
      success: function(res) {
        wx.showToast({ title: '作业完成', icon: 'none' });
        setTimeout(() => {
          wx.redirectTo({
                url: '../curriculumList/index'
            })
        }, 800);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title2: decodeURIComponent(options.title2),
      id: options.id,
      courseId: options.courseId,
      title1: decodeURIComponent(options.title)
    })
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