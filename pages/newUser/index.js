// pages/newUser/index.js
const app = getApp();
let validateForm = require('../../validateForm/index.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userNameVal: '',
        phone: '',
        items: [
            { name: '男士', value: '1', checked: true },
            { name: '女士', value: '2' },
        ],
        sex: '',
        company: '',
        companyId: ''
    },
    radioChange(e) {
        this.setData({
            sex: e.detail.value
        })
    },
    bindButtonTap() {
        wx.navigateTo({
            url: '../company/index',
        })
    },
    submission(e) {
        let phone = validateForm.checkPhone(e.detail.value.phone, '请输入手机号!');
        let userNameVal = validateForm.userName(e.detail.value.userNameVal, '请输入用户姓名!');
        if (userNameVal && phone) {
            wx.ajax({
                url: 'users/',
                data: {
                    name: e.detail.value.userNameVal,
                    phone: e.detail.value.phone,
                    sex: e.detail.value.sex,
                    companyId: this.data.companyId
                },
                method: 'POST',
                success: function (res) {
                    if (res.data.success) {
                        wx.showToast({ icon: 'none', title: '新增成功!', duration: 800 });
                        setTimeout(() => {
                            wx.reLaunch({
                                url: '../main/index'
                            })
                        }, 1200);
                    }
                },
                fail: function (err) {
                    wx.showToast({ icon: 'none', title: msg });
                }
            })
        }
    },
  onTabItemTap(item) {
    if (!wx.getStorageSync('token')) {
      wx.redirectTo({
        url: '../authorize/index',
      })
    }
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            company: options.company ? options.company : '',
            companyId: options.companyid ? options.companyid : ''
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