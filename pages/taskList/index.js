// pages/taskList/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contantFlag: true,
    items: null,
    delBtnWidth:160,
    isScroll: true,

    tabArr: [{
      name: "待办任务", 
      index: '0'
    },{
      name: "回收任务", 
      index: '1'
    }],

    TabCur: 0,
    scrollLeft:0,
    footerFlag: true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTaskList();
  },
  // 添加任务
  taskAdd: function () {
    wx.navigateTo({
      url: '../taskAdd/index',
    })
  },
  agencyTask: function () {
      this.setData({
        contantFlag: true
      })
      this.getTaskList()
  },
  // 修改任务
  emidTaskFn: function (e) {
    wx.navigateTo({
      url: '../todoTask/index?id='+e.currentTarget.dataset.id,
    })
  },


  // tab切换
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    if(e.currentTarget.dataset.id == 0) {
      this.agencyTask()
      this.setData({
        footerFlag:true
      })
    } else {
      this.budgetTask()
      this.setData({
        footerFlag:false
      })
    }
  },  


  //
  editCollectFn: function(e) {
    wx.navigateTo({
      url: '../urgentTask/index?id='+e.currentTarget.dataset.id,
    })
  },
  budgetTask: function () {
    this.setData({
      contantFlag: false
    })
    this.getTaskList()
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


  // 左滑
  drawStart: function(e) {
    let touch = e.touches[0]
    for(let i in this.data.items) {
      let item = this.data.items[i]
      item.right = 0
    }
    this.setData({
      items: this.data.items,
      startX: touch.clientX,
    })
  },
  drawMove: function (e) {
    var touch = e.touches[0]
    
    var item = this.data.items[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX
    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        items: this.data.items
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        items: this.data.items
      })
    }
  },  
  drawEnd: function (e) {
    var item = this.data.items[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth/2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        items: this.data.items,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        items: this.data.items,
      })
    }
  },
  // 归档
  fileFn: function (e) {
    let that = this;
    wx.ajax({
      url: 'tasks/'+e.currentTarget.dataset.id+'/leader',
      data: {
        operate: 2
      },
      method: 'PUT',
      success: function(res) {
        wx.showToast({ title: '任务归档成功', icon: 'none' });
          setTimeout(() => {
            that.getTaskList()
          }, 800);
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },

  // 删除
  delItem: function (e) {
    let that = this;
    wx.ajax({
      url: 'tasks/'+e.currentTarget.dataset.id+'/leader',
      data: {
        operate: 4
      },
      method: 'PUT',
      success: function(res) {
        wx.showToast({ title: '任务删除成功', icon: 'none' });
          setTimeout(() => {
            that.getTaskList()
          }, 800);
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },


  // 获取列表
  getTaskList() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.ajax({
      url: 'tasks',
      data: {
        type: that.data.contantFlag ? 1 : 2
      },
      method: 'GET',
      success: function(res) {
        that.setData({
          items: res.data.datas.datas.length >= 1 ? res.data.datas.datas : false
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 800)
      },
      fail: function(err) {
        console.log(err)
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