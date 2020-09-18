// pages/index/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        remind: '加载中',
        windowHeight: null,
        hostName: '',
        totalPoint: '',
        unlockNum: '',
        basePoint:'',
        angle: 0,


        shenmituFlag: false,
        avatarUrl: ''
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



    startAnswer: function() {
      if (!wx.getStorageSync('token')) {
        wx.redirectTo({
          url: '../authorize/index',
        })
      } else {
        wx.navigateTo({
          url: '../startAnswering/index',
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {

          },
          complete: function (res) {

          }
        })
      }
      
    },
  mysteryMap: function () {
    if (!wx.getStorageSync('token')) {
      wx.redirectTo({
        url: '../authorize/index',
      })
    } else {
      wx.navigateTo({
        url: '../mysteryMap/index',
        // url: '../mysteryMap/index',
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {

        },
        complete: function (res) {

        }
      })
    }
    
  },
  leaderboards: function () {
    if (!wx.getStorageSync('token')) {
      wx.redirectTo({
        url: '../authorize/index',
      })
    } else {
      wx.navigateTo({
        url: '../leaderboards/index',
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {

        },
        complete: function (res) {

        }
      })
    }
    
  },


  // 任务系统
  taskSystem: function() {
    if (!wx.getStorageSync('token')) {
      wx.redirectTo({
        url: '../authorize/index',
      })
    } else {
      wx.navigateTo({
        url: '../taskList/index',
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {

        },
        complete: function (res) {

        }
      })
    }

  },

 // 课程
 taskCurriclum: function() {
  if (!wx.getStorageSync('token')) {
    wx.redirectTo({
      url: '../authorize/index',
    })
  } else {
    wx.navigateTo({
      url: '../curriculumList/index',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    })
  }

},
  
  // 查看神秘图
    shenmituFn() {
      let that = this;
      wx.ajax({
        url: 'quizes/pic',
        method: 'GET',
        success: function (res) {
          if((res.data.datas.answerNum == 1 || res.data.datas.answerNum == 2) && res.data.datas.point == 100) {
            that.setData({
              shenmituFlag: true
            })
          } else {
            that.setData({
              shenmituFlag: false
            })
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
      var that = this;
      // 获取系统信息
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            windowHeight: res.windowHeight / 2 + 'rpx',
          });
        },
      })
     
      if (wx.getStorageSync('token')) {
        that.qingqiu();
        that.shenmituFn();
      }
      
    },

    qingqiu: function() {
      let that = this;
      wx.ajax({
        url: 'quizes/index',
        method: 'GET',
        success: function (res) {
          that.setData({
            hostName: res.data.datas.hostName,
            totalPoint: res.data.datas.totalPoint,
            unlockNum: res.data.datas.unlockNum,
            basePoint: res.data.datas.basePoint
          })
        }
      })
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