// pages/authorize/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    bindGetUserInfo(res) {
        if (res.detail.userInfo) {
            if (!wx.getStorageSync('code')) {
                // 登录
                wx.login({
                    success: rest => {
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        if (rest.code) {
                            wx.ajax({
                                url: 'tokens/xcx',
                                data: {
                                    code: rest.code,
                                    encryptedData: res.detail.encryptedData,
                                    iv: res.detail.iv
                                },
                                method: 'GET',
                                success: function (res) {
                                    wx.setStorage({
                                        key: 'token',
                                        data: res.data.datas,
                                    })
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
            } else {
                wx.ajax({
                    url: 'tokens/xcx',
                    data: {
                        code: wx.getStorageSync('code'),
                        encryptedData: res.detail.encryptedData,
                        iv: res.detail.iv
                    },
                    method: 'GET',
                    success: function (res) {
                        wx.setStorage({
                            key: 'token',
                            data: res.data.datas,
                        })
                        wx.switchTab({
                            url: '../main/index'
                        })
                    },
                    fail: function (err) {
                        wx.showToast({ title: res.errMsg });
                    }
                })
            }
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
                            wx.ajax({
                                url: 'tokens/xcx',
                                data: {
                                    code: wx.getStorageSync('code'),
                                    encryptedData: res.encryptedData,
                                    iv: res.iv
                                },
                                method: 'GET',
                                success: function (res) {
                                    wx.setStorage({
                                        key: 'token',
                                        data: res.data.datas,
                                    })
                                    wx.switchTab({
                                        url: '../main/index'
                                    })
                                },
                                fail: function (err) {
                                    wx.showToast({ title: res.errMsg });
                                }
                            })
                        }
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