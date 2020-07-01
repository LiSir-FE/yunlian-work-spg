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
        angle: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     
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