// pages/me/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: '',
        nickName: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        _getUserInfo();
        wx.showLoading({
            title: '加载中',
        })
        function _getUserInfo() {
            wx.getUserInfo({
                success: function (res) {
                    that.setData({
                        avatarUrl: res.userInfo.avatarUrl,
                        nickName: res.userInfo.nickName
                    })
                },
                fail: function (err) {
                    wx.removeStorage({
                        key: 'token',
                        success: function (res) {
                            setTimeout(() => {
                                wx.reLaunch({
                                    url: '../authorize/index'
                                })
                            }, 800);
                        }
                    })
                    return;
                },
                complete: function () {
                    wx.hideLoading()
                }
            })
        }
    },
  onTabItemTap(item) {
    // if (!wx.getStorageSync('token')) {
    //   wx.redirectTo({
    //     url: '../authorize/index',
    //   })
    // }
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