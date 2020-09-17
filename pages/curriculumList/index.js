// pages/curriculumList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isScroll: true,
    nickName: '',
    items: [],
    img: '../../resources/img/me/collection_1/png'
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
  courseDetailsFn: function(e) {
    wx.navigateTo({
      url: '../courseDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 获取列表
  qingqiu: function() {
    let that = this;
    wx.ajax({
      url: 'studies',
      method: 'GET',
      data: {
          pageNo: 1,
          pageSize: 10
      },
      success: function (res) {
        that.setData({
          items: res.data.datas.datas
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.qingqiu();
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