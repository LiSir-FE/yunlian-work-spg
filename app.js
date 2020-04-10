//app.js
const httpConfig = require('./httpConfig.js')
App({
    onLaunch: function () {
        let code = '';
        let token = '';
        wx.ajax = (config) => {
            let requestConfig = {
                method: config.method
            }
            if (wx.getStorageSync('token')) {
              requestConfig.header = {
                Authorization: 'Bearer ' + wx.getStorageSync('token')
              }
            }
            requestConfig = Object.assign(requestConfig, config);
            requestConfig.url = this.buildUrl(config.url, config.data);
            let success = requestConfig.success;
            let fail = requestConfig.fail;
            requestConfig.success = (res) => {
              if (res.statusCode === 200) {
                    if (res.data.code === 200) {
                        success && success(res);
                    } else {
                        if (res.data.code === 551102) {
                            fail && fail(res);
                        }else if (res.data.code === 510100) {
                            wx.showToast({ title: res.data.message, icon: 'none' });
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
                        } else if (res.data.code === 554101) {
                            success && success(res);
                        } else {
                            wx.showToast({ title: res.data.message, icon: 'none' });
                            let error = res.data.message;
                            wx.removeStorage({
                                key: 'token',
                                success: function (res) {
                                    setTimeout(() => {
                                        wx.reLaunch({
                                            url: '../error/index?error=' + error
                                        })
                                    }, 800);
                                }
                            })
                            return;
                        }
                        
                    }
                } else {
                    wx.showToast({ title: res.errMsg });
                }
            };
            return wx.request(requestConfig)
        }
        // // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              wx.setStorage({
                key: 'code',
                data: res.code,
              })
              wx.redirectTo({
                url: '../authorize/index'
              })
            } else {
              console.log('获取用户登录状态失败!' + res.errMsg)
            }
          }
            
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                } else {
                    wx.redirectTo({
                      url: '../authorize/index'
                    })
                }
            }
        })
    },


    buildUrl: function (path, params) {
        var url = httpConfig.baseUrl + path;
        var paramUrl = "";
        if (params) {
            paramUrl = Object.keys(params).map(function (k) {
                return [encodeURIComponent(k), encodeURIComponent(params[k])].join("=");
            }).join("&");
            paramUrl = "?" + paramUrl;
        }
        return url + paramUrl;
    },
    globalData: {
        userInfo: null
    }
})