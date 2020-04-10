// pages/answerResult/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        subResults: 30
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.setData({
          subResults: options.resultSub
        })
    },

    timeTap: function(e) {
      wx.switchTab({
        url: '../main/index'
      })
    },

    timeTapList: function (e) {
      wx.navigateTo({
        url: '../answerList/index',
      })
    },


    onUnload: function () {
      wx.reLaunch({
        url: '../authorize/login'
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