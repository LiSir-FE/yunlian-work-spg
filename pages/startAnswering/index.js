// pages/startAnswering/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duration: 500,
    footerFlag: false,
    resultPage: null,
    isClicked: false, //判断是否点击
    isSelect: false, // 选项是否被选中
    swiperCurrent: 0, //索引
    option: {
      options1: 'options', // 控制样式
      options2: 'options', // 控制样式
      options3: 'options', // 控制样式
      options4: 'options', // 控制样式
    },
    answerArr: [], //缓存数组
    wrongQuestions: 0, // 错题
    topic: 0, // 正确
    generalQuestions: 0, // 总数
    nextQuestion: true, //下一题
    answeringList: [], //题库
    answerSub: [], //提交
    answerArr1: [],
    answerArrList: []
  },



  forbidMove(e) {
    return
  },
  optionTap: function(e) {
    let that = this;

    let rightNo = e.currentTarget.dataset.rightno;
    let no = e.currentTarget.dataset.no;
    let dex = e.currentTarget.dataset.dex + 1;
    let id = e.currentTarget.dataset.id;
    
    //改变正确样式
    that.shouAnswer(rightNo)
    that.data.answerArr.push({
      quizId: id,
      right: rightNo === no ? true : false,
      wrongNo: rightNo === no ? '' : no,
      rightNo: rightNo,
      wrongQuestions: that.data.wrongQuestions,
      topic: that.data.topic,
      resultPage: that.data.resultPage,
      generalQuestions: e.currentTarget.dataset.dex + 1,
      quizId: e.currentTarget.dataset.id,
      no: e.currentTarget.dataset.no
    });
   
    that.removeFn(that.data.answerArr, id)
    that.setData({
      generalQuestions: dex, //总题数
      isClicked: true //只能点击一次
    });
    if (rightNo !== e.currentTarget.dataset.no) {
      let wrongQuestions = ++that.data.wrongQuestions; //错误数量
      that.setData({
        isSelect: true,
        wrongQuestions: wrongQuestions,
        ['option.options' + no]: 'options1'
      })
    } else {
      let topic = ++that.data.topic; //正确数量
      that.setData({
        isSelect: true,
        topic: topic,
        resultPage: topic * 5, // 答题分数
        ['option.options' + no]: 'options2'
      })
    }
    wx.setStorage({
      key: 'answerArr',
      data: that.data.answerArr,
    })
  },
  removeFn: function(array, val) {

    for (var i = 0; i < array.length - 1; i++) {

      if (array[i].quizId == val) {
        array.splice(i, 1);
      }

    }

    return -1;

  },
  // 展示正确答案
  shouAnswer: function(key) {
    // 通过swith语句判断正确答案，从而显示正确选项
    switch (key) {
      case 0:
        {
          this.setData({
            ['option.options' + key]: 'options2'
          })
        }
        break;
      case 1:
        {
          this.setData({
            ['option.options' + key]: 'options2'
          })
        }
        break;
      case 2:
        {
          this.setData({
            ['option.options' + key]: 'options2'
          })
        }
        break;
      default:
      case 3:
        {
          this.setData({
            ['option.options' + key]: 'options2'
          })
        }
    }
  },
  // 阻止用户手动滑动
  swichNav(e) {
    console.log(e)
  },

  // 提交
  resultTap(e) {
    let that = this;
    let answerSub = [];
    that.data.answerArr.forEach(item => {
      answerSub.push({
          quizId: item.quizId,
          right: item.right,
          wrongNo: item.wrongNo
        })
    })
    if (!that.data.isClicked) {
      wx.showToast({
        title: '请先回答问题！',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {
      wx.ajax({
        url: 'quizes/answer',
        method: 'POST',
        data: {
          json: JSON.stringify(answerSub)
        },
        success: function(res) {
          if (res.data.code) {
            that.setData({
              answeringList: res.data.datas
            })
            wx.removeStorage({
              key: 'answeringList',
              success: function (res) { },
            })
            wx.removeStorage({
              key: 'answerArr',
              success: function (res) { },
            })
            if(e.currentTarget.dataset.resultsub >= 100) {
              wx.navigateTo({
                url: '../mysteryMap/index?resultSub=' + e.currentTarget.dataset.resultsub
              })
            } else {
              wx.navigateTo({
                url: '../answerResult/index?resultSub=' + e.currentTarget.dataset.resultsub
              })
            }

            
          }
         
        },
        fail: function(err) {
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
     
    }

  },

  // 下一步
  nextStepTap(e) {
    let that = this;
    if (!that.data.isClicked) {
      wx.showToast({
        title: '请先回答问题！',
        icon: 'none',
        duration: 2000
      })
      return;
    } else {
      that.setData({
        isClicked: false,
        isSelect: false,
        'option.options1': 'options',
        'option.options2': 'options',
        'option.options3': 'options',
        'option.options4': 'options'
      });
      let swiperCurrent = ++that.data.swiperCurrent; //滑动索引
      if (swiperCurrent >= that.data.answeringList.length - 1) { // 超过题库数量改变下一步为完成
        that.setData({
          nextQuestion: false
        })
      }
      that.setData({
        swiperCurrent: swiperCurrent
      })

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },


  getInfo: function(type) {
    let that = this;
    wx.ajax({
      url: 'quizes',
      method: 'GET',
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            answeringList: res.data.datas,
            footerFlag: false
          })
          res.data.datas.forEach((item, index) => {
            console.log(index, item.rightNo)
          })
          if (type == 1) {
            // 缓存
            wx.setStorage({
              key: 'answeringList',
              data: res.data.datas
            })
          }
        } else if (res.data.code == 554101) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          that.setData({
            footerFlag: true
          })
          setTimeout(() => {
            wx.switchTab({
              url: '../main/index'
            })
          }, 800);
          return;
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
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
    let that = this;
    wx.getStorage({
      key: 'answerArr',
      success: function (resArr) {
        wx.showModal({
          title: '提示',
          content: '是否继续答题?',
          success: function (res) {
            if (res.confirm) {
              wx.getStorage({
                key: 'answeringList',
                success: function (resOk) {
                  if (resArr.data.length >= 20) {
                    that.setData({
                      nextQuestion: false
                    })
                  }
                  resArr.data.forEach((item, index) => {
                    
                    if (resOk.data.indexOf(item.quizId)){
                      that.data.answerArr1.push({
                        rightNo: item.rightNo,
                        topic: item.topic,
                        quizId: item.quizId,
                        no: item.no
                      })
                        that.setData({
                          answeringList: resOk.data,
                          topic: item.topic,
                          generalQuestions: item.generalQuestions,
                          swiperCurrent: index,
                          wrongQuestions: item.wrongQuestions,
                        });
                    }
                  })
                  that.setData({
                    answerArr: resArr.data
                  })
                },
              })
            } else if (res.cancel) {
              wx.removeStorage({
                key: 'answeringList',
                success: function(res) {
                },
              }),
                wx.removeStorage({
                  key: 'answerArr',
                  success: function (res) {
                  },
                })
                that.setData({
                  wrongQuestions: 0, // 错题
                  topic: 0, // 正确
                  generalQuestions: 0, // 总数
                  isSelect: false,
                  isClicked: false,
                  'option.options1': 'options',
                  'option.options2': 'options',
                  'option.options3': 'options',
                  'option.options4': 'options'
                })
                that.getInfo(1);
            }
          }
        })
        
      },
      fail: function(err) {
        that.getInfo(1);
      }
    })
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