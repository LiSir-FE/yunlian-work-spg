// pages/todoTask/index.js
//获取应用实例
let app = getApp();
let dateTimePicker = require('../../utils/dateTimePicker.js')
let time = require('../../utils/timestampFormat.js');
let validateForm = require('../../validateForm/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    urgentFlag: false,
    items: null,
    modalName: null,
    modalNameItems: null,
    dateTimes: null,
    staffs: null,
    taskId: null,
    disabledFlag: false,
    typeFlag: false
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

  // tenMembers25Fn
  tenMembers25Fn: function (e) {
    let id = e.currentTarget.dataset.id;
    let idx = e.currentTarget.dataset.index;
    let that = this;
    wx.showModal({
      title: '发起者操作项',
      cancelText: '驳回',
      success: function(res) {
          if(res.confirm) {
            wx.ajax({
              url: 'tasks/'+that.data.taskId+'/confirm',
              data: {
                staffId: id,
                confirm: true
              },
              method: 'PUT',
              success: function(res) {
                that.data.staffs.find(function(val) {
                  if(val.id === id) {
                    console.log(that.data.staffs[0].staffStatus)
                    let staffs = that.data.staffs;
                    staffs[idx].staffStatus = 3;
                    that.setData({
                      staffs: staffs
                    })
                  } 
                  wx.showToast({ title: '通过成功', icon: 'none' });
                  setTimeout(() => {
                    wx.navigateTo({
                      url: '../taskList/index',
                    })
                  }, 800);
                })
              },
              fail: function(err) {
                console.log(err)
              }
            })
          }else if(res.cancel) {
            wx.ajax({
              url: 'tasks/'+that.data.taskId+'/confirm',
              data: {
                staffId: id,
                confirm: false
              },
              method: 'PUT',
              success: function(res) {
                that.data.staffs.find(function(val) {
                  if(val.id === id) {
                    console.log(that.data.staffs[0].staffStatus)
                    let staffs = that.data.staffs;
                    staffs[idx].staffStatus = 1;
                    that.setData({
                      staffs: staffs
                    })
                  } 
                  wx.showToast({ title: '驳回成功', icon: 'none' });
                  setTimeout(() => {
                    wx.navigateTo({
                      url: '../taskList/index',
                    })
                  }, 800);
                })
              },
              fail: function(err) {
                console.log(err)
              }
            })
            
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
  determine() {
    let that = this;
    that.setData({
      modalName: that.data.modalNameItems
    })
    wx.ajax({
      url: 'tasks/'+that.data.taskId+'/staffs',
      data: {
        staffs:that.data.modalNameItems
      },
      method:'PUT',
      success: function(res){
        that.getTaskPut(that.data.taskId)
        // console.log(res)
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },

  //dynamicFn动态
  dynamicFn: function() {
      wx.navigateTo({
        url: '../taskDynamic/index?id='+this.data.taskId
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
        let taskArr = that.data.items
        res.data.datas.task.staffs.forEach((itemS) => {
          taskArr.find(function(value) {
            if(value.id === itemS) {
              value.selected = true
            }
            that.setData({
              items:taskArr
            })
          })
        })
        that.setData({
          title: res.data.datas.task.title,
          content: res.data.datas.task.content,
          urgentFlag: res.data.datas.task.priority == '2' ? true : false,
          staffs: res.data.datas.staffs,
          date: time.formatTimeTwo(res.data.datas.task.endTime, 'Y-M-D'),
          disabledFlag: res.data.datas.staffs ? false : true,
          typeFlag: res.data.datas.task.type == 1 ? false : true
        })
        if(res.data.datas.task.type == 2) {
          wx.setNavigationBarTitle({
            title: '回收任务',
          })
        }
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
 
  // 获取成员
  getTaskID(id) {
    let that = this;
    wx.ajax({
      url: 'tasks/staffs',
      data: {
        taskId: id
      },
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

  // 保存
  submission() {
    let that = this;
    // let modalNameItems = validateForm.userName(that.data.modalNameItems, '请选择成员');
    let title = validateForm.userName(that.data.title, '标题不能为空');
    if(title) {
      wx.ajax({
        url: 'tasks',
        data: {
            id: that.data.taskId,
            title: that.data.title,
            content: that.data.content,
            endTime: that.data.dateTimes,
            priority: that.data.urgentFlag ? 2 : 1
        },
        method: 'PUT',
        success: function(res) {
          wx.showToast({ title: '修改任务成功', icon: 'none' });
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


  // 关闭
  closeFn() {
    let that = this;
    wx.ajax({
      url: 'tasks/'+that.data.taskId+'/leader',
      data: {
        operate: 1
      },
      method: 'PUT',
      success: function(res) {
        wx.showToast({ title: '结束任务成功', icon: 'none' });
          setTimeout(() => {
            wx.navigateTo({
                url: '../taskList/index',
            })
          }, 800);
        console.log(res)
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
        dateS: Y + '-' + M + '-' + D,
        dateTimes: new Date(Y + '-' + M + '-' + D + " " + "23:59:59").getTime()
    })
    this.setData({
      taskId: options.id
    })
    this.getTaskID(options.id);
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