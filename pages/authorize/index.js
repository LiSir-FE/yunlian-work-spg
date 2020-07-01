// pages/authorize/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: false
    },
    bindGetUserInfo(res) {
        let that = this;
        if (res.detail.userInfo) {
            // 用户按了允许授权按钮
            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
            that.setData({
              isHide: false
            });
            that.onLoad();
        } else {
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    }
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            //用户已经授权过
                          let encryptedData = res.encryptedData
                          let iv = res.iv
                          // // 登录
                          wx.login({
                            success: res => {
                              // 发送 res.code 到后台换取 openId, sessionKey, unionId
                              if (res.code) {
                                wx.ajax({
                                  url: 'tokens/xcx',
                                  data: {
                                    code: res.code,
                                    encryptedData: encryptedData,
                                    iv: iv
                                  },
                                  method: 'GET',
                                  success: function (res) {
                                    wx.setStorage({
                                      key: 'token',
                                      data: res.data.datas,
                                    });
                                    wx.switchTab({
                                      url: '../main/index'
                                    })
                                  },
                                  fail: function (err) {
                                    wx.showToast({ title: res.errMsg });
                                  }
                                })
                              } else {
                                console.log('获取用户登录状态失败!' + res.errMsg)
                              }
                            }

                          })
                            
                        }
                    });
                } else {
                  // 用户没有授权
                  // 改变 isHide 的值，显示授权页面
                  that.setData({
                    isHide: true
                  });
                }
            }
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