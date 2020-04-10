// pages/answerDetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answeringList: [],
    option:[{
      options1: 'options', // 控制样式
      options2: 'options', // 控制样式
      options3: 'options', // 控制样式
      options4: 'options', // 控制样式
    }]
    
  },

  /** 
   * 生命周期函数--监听页面加载
   */         
  onLoad: function(options) {
    let that = this;
    that.setData({
      time: options.time ? options.time : Date.parse(new Date())
    })
    wx.ajax({
      url: 'quizes/detail',
      data: {
        time: options.time ? options.time : ''
      },
      method: 'GET',
      success: function(res) {
        that.setData({
          answeringList: res.data.datas.detail,
          rightNum: res.data.datas.rightNum,
          point: res.data.datas.point
        })
      },
      fail: function(err) {
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
 

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    // console.log(e)
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

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  // 展示正确答案
  shouAnswer: function(index, key) {
    let options = "option['+index+'].options['+key+']";
    // 通过swith语句判断正确答案，从而显示正确选项
    switch (key) {
      case 1:
        {
          this.setData({
            options: 'options2'
          })
        }
        break;
      case 2:
        {
          this.setData({
            options: 'options2'
          })
        }
        break;
      case 3:
        {
          this.setData({
            options: 'options2'
          })
        }
        break;
      default:
      case 4:
        {
          this.setData({
            options: 'options2'
          })
        }
    }
  },


  // 展示错误答案
  shouAnswer2: function(key) {
    // 通过swith语句判断错误答案，从而显示错误选项
    switch (key) {
      case 1:
        {
          this.setData({
            ['option.options' + key]: 'options1'
          })
        }
        break;
      case 2:
        {
          this.setData({
            ['option.options' + key]: 'options1'
          })
        }
        break;
      case 3:
        {
          this.setData({
            ['option.options' + key]: 'options1'
          })
        }
        break;
      default:
      case 4:
        {
          this.setData({
            ['option.options' + key]: 'options1'
          })
        }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})