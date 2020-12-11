// pages/jobList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    id: '',
    like: true, //点赞
    teacher: false, //是否是当前作业的讲师，用来判断页面上讲师是否可以点评
    answers: [], //所有作业详情
    ellipsis: true, // 文字是否收起，默认收起
    name: '',
    answerId: '',
    content: '',
    focus: false
  },
  bindReply(e) {
    console.log('qweqwe',e)
    let name = e.currentTarget.dataset.name;
    let answerId = e.currentTarget.dataset.answerid;
    this.setData({
      focus: true,
      name: name,
      answerId: answerId
    });
  },
  comment(e) {
    let that = this;
    wx.ajax({
      url: `courseworks/${that.data.id}/answer`,
      method: 'POST',
      data: {
        cwatContent: that.data.content,
        answerId: that.data.answerId
      },
      success: function (res) {
        wx.showToast({ title: 'ok!', icon: 'none' });
        that.getInfo();
      }
    })
  },
  contentInput(e) { //当输入框的值发生改变时，获取
    this.setData({
      content: e.detail.value
    });
  },
  deleteFn(e) {
      console.log('shanchu', e)
      let that = this;
      wx.ajax({
        url: `answers/${e.currentTarget.dataset.id}`,
        method: 'DELETE',
        success: function (res) {
          wx.showToast({ title: '删除成功!', icon: 'none' });
          setTimeout(() => {
            wx.redirectTo({
                  url: '../curriculumList/index'
              })
          }, 800);
        }
      })
  },
  likeTap(e) {
    let that = this;
    let i = e.currentTarget.dataset.index;
    let answers = that.data.answers;
    let updata = `answers[${i}].star`
    console.log('eeee', that.data.answers[i])
    that.setData({
      [updata]: that.data.answers[i].star == 0 ? 1 : 0
    })
    wx.ajax({
      url: `answers/${e.currentTarget.dataset.id}/star`,
      method: 'PUT',
      data: {
        star: that.data.answers[i].star
      },
      success: function (res) {
        wx.showToast({ title: 'ok!', icon: 'none' });
      }
    })
  },
  ellipsis(e) {
    let that = this;
    let i = e.currentTarget.dataset.index;
    let answers = that.data.answers;
    let updata = `answers[${i}].ellipsis`
    that.setData({
      [updata]: !that.data.answers[i].ellipsis
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        title: decodeURIComponent(options.title2),
        id: options.id
      })
      this.getInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getInfo() {
    let that = this;
    wx.ajax({
      url: `courseworks/${that.data.id}/answers`,
      method: 'GET',
      success: function (res) {
        res.data.datas.answers.forEach(item => {
          item.ellipsis = true;
        })
        that.setData({
          teacher: res.data.datas.teacher,
          answers: res.data.datas.answers
        })
      }
    })
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