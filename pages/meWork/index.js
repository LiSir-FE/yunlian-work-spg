// pages/meWork/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        param: '',
        pageNo: 1,
        pageSize: 10,
        tableData: [],
        pageNoFlag: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getworkList();
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
        this.getworkList();
    },
    input1: function(e) {
        this.setData({
            param: e.detail.value
        })
        this.getworkList();
    },
    // 点击键盘上的搜索
    bindconfirm: function (e) {
        var that = this;
        that.setData({
            param: e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading();
        let that = this;
        wx.ajax({
            url: 'jobs/',
            data: {
                param: that.data.param,
                pageNo: 1,
                pageSize: that.data.pageSize
            },
            method: 'GET',
            success: function (res) {
                if (res.data.success) {
                    that.setData({
                        tableData: res.data.datas.datas
                    })
                }
                // 隐藏导航栏加载框
                wx.hideNavigationBarLoading();
                // 停止下拉动作
                wx.stopPullDownRefresh();
            },
            fail: function (err) {
                wx.showToast({
                    title: err,
                    icon: 'none'
                })
            }
        })
    },
    getworkList: function() {
        let that = this;
        wx.showLoading({
            title: '玩命加载中',
        })
        wx.ajax({
            url: 'jobs/',
            data: {
                param: that.data.param,
                pageNo: that.data.pageNo,
                pageSize: that.data.pageSize
            },
            method: 'GET',
            success: function (res) {
                if (res.data.success) {
                    that.setData({
                        tableData: res.data.datas.datas
                    })
                }
                // 隐藏加载框
                wx.hideLoading();
            },
            fail: function (err) {
                wx.showToast({
                    title: err,
                    icon: 'none'
                })
            }
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        wx.ajax({
            url: 'jobs/',
            data: {
                param: that.data.param,
                pageNo: that.data.pageNoFlag ? ++that.data.pageNo : that.data.pageNo,
                pageSize: that.data.pageSize
            },
            method: 'GET',
            success: function (res) {
                if (res.data.success) {
                    if (res.data.datas.datas.length === 0) {
                        wx.showToast({
                            title: '暂无更多数据',
                            icon: 'none',
                            duration: 1000
                        })
                        that.setData({
                            pageNoFlag: false
                        })
                    } else {
                        wx.showLoading({
                            title: '玩命加载中',
                            icon: 'none',
                            duration: 1000
                        })
                        res.data.datas.datas.forEach(item => {
                            that.data.tableData.push(item);
                        })
                    }
                    that.setData({
                        tableData: that.data.tableData
                    })
                    // res.data.datas.datas.forEach(item => {
                    //     that.data.tableData.push(item);
                    // })
                    // that.setData({
                    //     tableData: that.data.tableData
                    // })
                }
                // 隐藏加载框
                setTimeout(() => {
                    wx.hideLoading();
                }, 1200)
            },
            fail: function (err) {
                wx.showToast({
                    title: err,
                    icon: 'none'
                })
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})