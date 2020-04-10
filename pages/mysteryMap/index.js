// pages/mysteryMap/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imageUrlFull1:'../../resources/img/more/map.jpg',
    filePath: null, // 图片地址
    windowWidth: '',
    windowHeight: '',
    hostLogo: '',
    hostName: '',
    rank: '',
    pic: '',
    basePoint: '',
    totalPoint: '',
    anFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    wx.showToast({
      title: '图片生成中...',
      icon: 'loading'
    });

    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
        });
        that.setData({
          // 屏幕宽度 375px = 750rpx，1px=2rpx
          // 1px = （750 / 屏幕宽度）rpx；
          // 1rpx = （屏幕宽度 / 750）px;
          ratio: 750 / that.data.windowWidth
        });
      },
    })


    wx.ajax({
      url: 'quizes/index',
      method: 'GET',
      success: function (res) {
        that.setData({
          hostLogo: 'https://resource.wetuc.com/' + res.data.datas.hostLogo,
          hostName: res.data.datas.hostName,
          rank: res.data.datas.rank,
          basePoint: res.data.datas.basePoint,
          totalPoint: res.data.datas.totalPoint,
          pic: 'https://resource.wetuc.com' + res.data.datas.pic
        })

        wx.getImageInfo({
          src: that.data.hostLogo,    //请求的网络图片路径
          success: function (res) {
            that.setData({
              hostLogo: res.path
            })


            wx.getImageInfo({
              src: that.data.pic,    //请求的网络图片路径
              success: function (res) {
                that.setData({
                  pic: res.path
                })

                setTimeout(function () {
                  that.createCanvasShareImage();
                })
              }
            })
          }
        })
      }
    });
   

    
  },
  createCanvasShareImage:function() {
    let that = this;
    let ctx = wx.createCanvasContext('myCanvas');
    // 获取canvas的宽度：
    // 750的设计稿基于iphone6的尺寸（屏幕宽度： 375px）在小程序中的比例是： 1px = 2rpx ==> 375px = 750rpx ==> 屏幕宽度(px) = 750rpx
    // 所以 1rpx = 屏幕宽度 / 750
    // 我们这里css中设置的 canvas 的width：700rpx, 所以 canvas的宽度计算是： [（屏幕宽度 / 750）* 700]rpx， 这样就可以做到在不同手机上都可以        适配
    let canvasWidthPx = 750 / that.data.ratio;



 


    // 设置 canvas 的背景并填充canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvasWidthPx, that.data.windowHeight);


   
    ctx.drawImage(that.data.pic, 0, 0, canvasWidthPx / 1.36, that.data.windowHeight / 1.25 - 60);
    // 计算文本的宽度：measureText() 取到文本的 width
    let txtWidth = ctx.measureText(that.data.hostName).width;
    // 设置字体大小、文本颜色
    ctx.setFontSize(14);
    ctx.fillStyle = "#000";
    // 绘制居中文本：这个地方的 (x, y)的坐标是在文本的居中位置
    ctx.fillText(that.data.hostName, canvasWidthPx / 4, that.data.windowHeight / 1.25 - 42);

    // 设置字体大小、文本颜色
    ctx.setFontSize(10);
    ctx.fillStyle = "#666";
      // 绘制居中文本：这个地方的 (x, y)的坐标是在文本的居中位置
    if (that.data.rank > 0) {
      ctx.fillText('恭喜您成为第 '+that.data.rank+' 位截图成功的人', canvasWidthPx / 4, that.data.windowHeight / 1.25 - 15);
      that.setData({
        anFlag: true,
      });
    } else {
      ctx.fillText('解锁中', canvasWidthPx / 4, that.data.windowHeight / 1.25 - 15);
      that.setData({
        anFlag: false,
      });
    }

  
    
    ctx.save()//保存当前的绘图上下文。
    ctx.beginPath()//开始创建一个路径
    ctx.arc((canvasWidthPx - txtWidth) / 7, that.data.windowHeight / 1.25 - 30, 26, 0, 2 * Math.PI) // 画一个圆形裁剪区域
    // ctx.setStrokeStyle('#333333')
    ctx.clip()//裁剪
    ctx.setStrokeStyle('rgba(0,0,0,0)');
    ctx.drawImage(that.data.hostLogo, (canvasWidthPx - txtWidth) / 7 - 30, that.data.windowHeight / 1.25 - 60, 60, 60)
    ctx.stroke();
    ctx.restore();//恢复之前保存的绘图上下文


    // 设置 神秘图 的背景并填充canvas
    if (that.data.totalPoint <= that.data.basePoint) {
      ctx.fillStyle = '#93e0ff';
      ctx.fillRect(0, ((that.data.windowHeight / 1.25 - 60) / that.data.basePoint) * that.data.totalPoint, canvasWidthPx / 1.36, (that.data.windowHeight / 1.25 - 60) - ((that.data.windowHeight / 1.25 - 60) / that.data.basePoint) * that.data.totalPoint);
    }
  

    ctx.draw();

    setTimeout(function () {
      wx.canvasToTempFilePath({
        fileType: 'jpg',
        canvasId: 'myCanvas',
        success: (res) => {
          that.setData({
            filePath: res.tempFilePath,
          });
          wx.hideToast()
        }
      })
    }, 600)
  },
  // 保存图片
  shareFriends: function () {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.filePath,
      success: (res) => {
        console.log(res);
      }, fail: function (err) {
        console.log(err)
      }
    });
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