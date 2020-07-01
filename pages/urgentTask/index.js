// pages/todoTask/index.js
//获取应用实例
let app = getApp();
let dateTimePicker = require('../../utils/dateTimePicker.js')
let validateForm = require('../../validateForm/index.js')
let time = require('../../utils/timestampFormat.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    urgentFlag: false,
    feedback: '',
    taskLog: null,
    typeFlag: false,
    staffStatus: null
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
  bindinputFeedback(e) {
    this.setData({
      feedback: e.detail.value
    })
  },
  bindDateChange: function(e) {

    console.log('picker发送选择改变，携带值为', e.detail.value, new Date())
    this.setData({
      date: e.detail.value
    })
  },

  // tenMembers25Fn
  tenMembers25Fn: function () {
    wx.showModal({
      cancelText: '驳回',
      success: function(res) {
          if(res.confirm) {
            console.log('用户点击确定')
          }else if(res.cancel) {
            console.log('用户点击取消')
          }
      }
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

  //dynamicFn动态
  dynamicFn: function() {
      wx.navigateTo({
        url: '../taskDynamic/index?id='+this.data.taskId,
      })
  },

  // 选择成员
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      items
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

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },


    // 获取详情
    getTaskPut(id) {
      let that = this;
      wx.ajax({
        url: 'tasks/' + id,
        method: 'GET',
        success: function(res) {
          that.setData({
            title: res.data.datas.task.title,
            content: res.data.datas.task.content,
            urgentFlag: res.data.datas.task.priority == '2' ? true : false,
            staffs: res.data.datas.staffs,
            date: time.formatTimeTwo(res.data.datas.task.endTime, 'Y-M-D'),
            taskLog: res.data.datas.taskLog,
            staffStatus: res.data.datas.taskStaff.staffStatus,
            typeFlag: res.data.datas.task.type == 1 ? false : true

          })
        },
        fail: function(err) {
          console.log(err)
        }
      })
    },


    // 添加反馈
    postTasksLogs() {
      let that = this;
      wx.ajax({
        url: 'tasks/'+that.data.taskId+'/logs',
        data: {
          content: that.data.feedback
        },
        method: 'POST',
        success: function(res){
          wx.showToast({ title: '添加反馈成功', icon: 'none' });
          setTimeout(() => {
            that.getTaskPut(that.data.taskId);
          }, 800);
        },
        fail: function(err) {
          console.log(err)
        }
      })
    },


    delete(e) {
        let that = this;
        wx.showModal({
          title: '确定删除此条反馈信息吗?',
          success: function(res) {
            if(res.confirm) {
              wx.ajax({
                url: 'tasks/' +that.data.taskId+ '/logs/' +e.currentTarget.dataset.id,
                method: 'DELETE',
                success: function(res) {
                  wx.showToast({ title: '删除反馈成功', icon: 'none' });
                  setTimeout(() => {
                    that.getTaskPut(that.data.taskId);
                  }, 800);
                },
                fail: function(err) {
                  console.log(err)
                }
              })
            } else if(res.cancel) {
                wx.hideModal()
            }
          }
        })
        
    },


    // 完成任务
    submission() {
      let that = this;
      wx.ajax({
        url: 'tasks/'+that.data.taskId+'/complete',
        method: 'PUT',
        success: function(res) {
          // if(res.data.code === 556111) {
          //   wx.showToast({ title: '您已完成此任务！', icon: 'none' });
          // }
          wx.showToast({ title: '任务完成', icon: 'none' });
          setTimeout(() => {
            wx.navigateTo({
                url: '../taskList/index',
            })
          }, 800);
        },
        fail: function(err) {
          console.log(err)
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
        taskId: options.id
    })
    this.getTaskPut(options.id)
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