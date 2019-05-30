//index.js
//获取应用实例
let app = getApp();
let dateTimePicker = require('../../utils/dateTimePicker.js')
let validateForm = require('../../validateForm/index.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputPicker: false,
        userNameVal: '',
        userId: '',
        sceneIndex: 0,
        // sceneArr: [{label: '一对一', value: '1', label: '一对多', value: '2'}],
        sceneArr: ['一对一', '一对多', '其他'],
        modeIndex: 0,
        modeArr: ['电话', '微信', '邮件', '见面', '视频会议'],
        dateTime: null,
        dateTimeArray: null,

        // 时间
        startYear: 2012,
        endYear: 2050,
        timestamp: Date.now(),

        title: '',
        classificationArr: ['信息沟通', '商务合作', '资源对接', '采访报道', '培训咨询'],
        classificationIndex: 0,
        hosList: [],
        company: '',
        companyId: '',

        content: '',
        fragmentArr: ['商机', '重要信息', '其他信息'],
        fragmentIndex: 0,
        fragmentContent: ''
    },
    bindButtonTapCompan() {
        wx.navigateTo({
            url: '../company/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        let lastArray = obj.dateTimeArray.pop();
        let lastTime = obj.dateTime.pop();
        this.setData({
            dateTime: obj.dateTime,
            dateTimeArray: obj.dateTimeArray,
        })
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
    bindinputfragmentContent(e) {
        this.setData({
            fragmentContent: e.detail.value
        })
    },
    bindButtonTap() {
        wx.navigateTo({
            url: '../userName/index',
        })
    },
    bindScenePickerChange(e) {
        this.setData({
            sceneIndex: e.detail.value
        })
    },
    bindClassPickerChange(e) {
        this.setData({
            classificationIndex: e.detail.value
        })
    },
    bindfragmentPickerChange(e) {
        this.setData({
            fragmentIndex: e.detail.value
        })
    },

    bindModePickerChange(e) {
        this.setData({
            modeIndex: e.detail.value
        })
    },

    bindTimePickerChange(e) {
        this.setData({
            dateTime: e.detail.value
        })
    },
    changeDateTimeColumn(e) {
        let {
            dateTimeArray,
            dateTime
        } = this.data

        var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray: dateArr
        });



        let time = `${dateTimeArray[0][dateTime[0]]}-${dateTimeArray[1][dateTime[1]]}-${dateTimeArray[2][dateTime[2]]} ${dateTimeArray[3][dateTime[3]]}:${dateTimeArray[4][dateTime[4]]}`

        let timestamp = Date.parse(time)
        this.setData({
            timestamp: timestamp
        });
    },
    IconFn: function (e) {
        wx.showModal({
            content: '增加一个用户信息',
            success(res) {
                if (res.confirm) {
                    wx.navigateTo({
                        url: '../userInfo/index',
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    submission() {
        let that = this;
        let content = validateForm.userName(that.data.content, '请输入内容!');
        let title = validateForm.userName(that.data.title, '请输入标题!');
        let company = validateForm.userName(that.data.company, '请选择公司!');
        let userName = validateForm.userName(that.data.userNameVal, '请输入用户姓名!');
        if (company && content && title && userName) { 
            wx.ajax({
                url: 'jobs/',
                data: {
                    userId: that.data.userId,
                    companies: that.data.companyId,
                    scene: ++that.data.sceneIndex,
                    communicateMethod: ++that.data.modeIndex,
                    type: ++that.data.classificationIndex,
                    title: that.data.title,
                    content: that.data.content,
                    infoType: ++that.data.fragmentIndex,
                    visitTime: that.data.timestamp,
                    infoContent: that.data.fragmentContent,
                    operate: 1,
                    step: 2
                },
                method: 'POST',
                success: function(res) {
                    if(res.data.success) {
                        wx.showToast({ title: '新增工作成功!', icon: 'none' });
                        setTimeout(() => {
                            wx.reLaunch({
                                url: '../main/index',
                            })
                        }, 800);
                    }
                },
                fail: function(err) {
                    wx.showToast({ title: err.data.message, icon: 'none' });
                    setTimeout(() => {
                        wx.reLaunch({
                            url: '../work/index',
                        })
                    }, 800);
                }
            })
        }
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
