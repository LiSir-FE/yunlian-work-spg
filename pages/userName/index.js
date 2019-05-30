// pages/userName/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    
    data: {
        hosList: []
    },
    input1: function (e) {
        this.search(e.detail.value);
    },
    textBindTap: function (e) {
        let pages = getCurrentPages(); // 获取页面栈
        let currPage = pages[pages.length - 1]; // 当前页面
        let prevPage = pages[pages.length - 2]; // 上一个页面
        prevPage.setData({
            "userNameVal": e.currentTarget.dataset.text,
            "userId": e.currentTarget.dataset.userid,
        });
        wx.navigateBack(); //关闭当前页面，返回上一个页面
    },

    search: function (key) {
        let that = this;
        wx.ajax({
            url: 'groups/1/jobusers/',
            data: {
                groupId: 1,
                pageNo: 1,
                pageSize: 10,
                search: key
            },
            method: 'GET',
            success: function (res) {
                if(res.data.success) {
                    let arr = [];
                    for (let i in res.data.datas.datas) {
                        if (res.data.datas.datas[i].name.indexOf(key) >= 0 || res.data.datas.datas[i].phone.indexOf(key) >= 0) {
                            arr.push(res.data.datas.datas[i]);
                        }
                    }
                    that.setData({
                        hosList: arr
                    })
                }
            },
            fail: function (err) {
                wx.showToast({
                    title: msg,
                    icon: 'none'
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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