// pages/taskAdd/index.js
//获取应用实例
let app = getApp();
let dateTimePicker = require('../../utils/dateTimePicker.js')
let validateForm = require('../../validateForm/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    urgentFlag: false,
    title: '',
    items: null,
    modalName: null,
    modalNameItems: [],
    dateTimes: null

  },
  bindinputTitle(e) {
    this.setData({
        title: e.detail.value
    })
  },
  bindinputContent(e) {
    this.setData({
        content: e.detail.value
    })
  },
  bindDateChange: function(e) {

    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      dateTimes: new Date(e.detail.value + " " + "23:59:59").getTime()
    })
  },

  // 是否加急
  urgentFn: function () {
      this.setData({
        urgentFlag: !this.data.urgentFlag
      })
  },

  // 成员模态层
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  determine() {
    this.setData({
      modalName: this.data.modalNameItems
    })
  },

  // 选择成员
  checkboxChange(e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value, e)
   
    const items = this.data.items
    const values = e.detail.value
    
    if(values.length > 10) {
      wx.showToast({ title: '一个任务最多同事分配10人', icon: 'none' });
      values.splice(-1, 1);  
    }
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].selected = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].id === values[j]) {
          items[i].selected = true
          break
        }
      }
    }

    this.setData({
      modalNameItems: e.detail.value,
      items
    })
  },


  // 发布
  submission() {
    let that = this;
    let modalNameItems = validateForm.isArr(that.data.modalNameItems, '请选择成员');
    let title = validateForm.userName(that.data.title, '标题不能为空');
    if(title && modalNameItems) {
      wx.ajax({
        url: 'tasks',
        data: {
            title: that.data.title,
            content: that.data.content,
            endTime: that.data.dateTimes,
            priority: that.data.urgentFlag ? 2 : 1,
            staffs: that.data.modalNameItems
        },
        method: 'POST',
        success: function(res) {
          wx.showToast({ title: '创建任务成功', icon: 'none' });
          setTimeout(() => {
            wx.navigateTo({
                url: '../taskList/index',
            })
          }, 800);
        },
        fail: function(err) {
          wx.showToast({ title: err.data.message, icon: 'none' });
        }
      })
    }
  },


  // 获取成员
  getTaskID() {
    let that = this;
    wx.ajax({
      url: 'tasks/staffs',
      method: 'GET',
      success: function(res) {
        that.setData({
          items: res.data.datas
        })
      },
      fail: function(err) {
        wx.showToast({ title: err.data.message, icon: 'none' });
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let timestamp = Date.parse(new Date());
    let date = new Date(timestamp);
    //获取年份  
    let Y =date.getFullYear();
    //获取月份  
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    this.setData({
        date: Y + '-' + M + '-' + D,
        dateTimes: new Date(Y + '-' + M + '-' + D + " " + "23:59:59").getTime()
    })
    this.getTaskID();
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