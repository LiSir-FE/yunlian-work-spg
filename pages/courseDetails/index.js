// pages/courseDetails/index.js
const httpConfig = require('../../httpConfig.js')
Page({
  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  onHide() {

  },
  inputValue: '',
  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    teacher: true,
    title: '',
    hostName: '',
    time:'',
    studyStatus: '',
    content: '',
    playFlag: true,
    bindplays: false,
    workAfter: [],
    timer: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.mycourses(options.id);
  },

  // 获取详情
  mycourses: function(id) {
    let that = this;
    wx.ajax({
      url: `mycourses/${id}`,
      method: 'GET',
      success: function (res) {
        wx.setNavigationBarTitle({
          title: res.data.datas.title//页面标题为路由参数
        })
        that.setData({
          src: httpConfig.picHead + res.data.datas.video,
          title: res.data.datas.title,
          hostName: res.data.datas.hostName,
          time: res.data.datas.time,
          studyTime: res.data.datas.studyTime,
          studyStatus: res.data.datas.studyStatus,
          studyPercent: res.data.datas.studyPercent,
          content: res.data.datas.content,
          workAfter: res.data.datas.courseWorks,
          teacher: res.data.datas.teacher
        })
      }
    })
  },

 

  // 观看视频的秒数
  bindplays(e) {
    let that = this;
    let times = that.data.time;
      let k = 0;
      if(that.data.timer == null) {
        that.data.timer = setInterval(function() {
          k++;
          if(k>10) {
            clearInterval(that.data.timer)
          } else {
            wx.ajax({
              url: `studies/${that.data.id}`,
              method: 'PUT',
              data:{
                studyTime: that.data.studyTime != 0 ? parseInt(k * (times - (times - that.data.studyTime)) / 10) : parseInt(k * times / 10)
              },
              success: function (res) {
              }
            })
          }
        }, times * 100)
      }
      
    
    
  },

  // 暂停
  bindpauses(e) {
    clearInterval(this.data.timer);
    this.setData({
      timer: null
    })
  },


  // 结束
  bindendeds(e) {
    let that = this;
    wx.ajax({
      url: `studies/${that.data.id}`,
      method: 'PUT',
      data:{
        studyTime: that.data.studyTime
      },
      success: function (res) {
        clearInterval(that.data.timer)
        that.setData({
          timer: null
        })
      }
    })
  },


  workAfterfn(e) {
    console.log('ew', e.currentTarget.dataset.title2)
    wx.navigateTo({
      url: '../jobList/index?id=' + e.currentTarget.dataset.id + '&title2=' + encodeURIComponent(e.currentTarget.dataset.title2),
    })
  },

  workAfter20fn(e) {
    wx.navigateTo({
      url: '../courseworks/index?id=' + e.currentTarget.dataset.id + '&status=' + e.currentTarget.dataset.status + '&courseId=' + e.currentTarget.dataset.courseid + '&title=' + encodeURIComponent(e.currentTarget.dataset.title1) + '&title2=' + encodeURIComponent(e.currentTarget.dataset.title2),
    })
  },



  // 行点击

  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },

  bindButtonTap() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  bindPlayVideo() {
    this.videoContext.play()
  },

  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
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
    console.log('123123')
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