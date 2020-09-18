// pages/answerResult/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        subResults: 30,
        src: 'https://resource.wetuc.com/static/quiz/again.jpg',
        srcFlag: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.setData({
          subResults: options.resultSub
        })

        wx.ajax({
          url: 'quizes/pic',
          method: 'GET',
          success: function (res) {
            if(res.data.datas.answerNum == 1 && res.data.datas.point != 100) {
              that.setData({
                src: 'https://resource.wetuc.com/static/quiz/again.jpg',
                srcFlag: true
              })
            } else if(res.data.datas.answerNum == 2 && res.data.datas.point != 100) {
              that.setData({
                src: 'https://resource.wetuc.com/static/quiz/over.jpg',
                srcFlag: false
              })
            } else{
              that.setData({
                src: 'https://resource.wetuc.com/static/quiz/success.jpg',
                srcFlag: false
              })
            }
          }
        })


    },



    srcFlagFn() {
      wx.switchTab({
        url: '../main/index'
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
        url: '../main/index'
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