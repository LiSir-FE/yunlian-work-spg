function checkPhone(val) {
    if (val === '' || val === null || val === undefined) {
        wx.showToast({
            title: '请输入手机号',
            icon: 'none'
        });
        return false;
    } else {
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(val)) {
            wx.showToast({
                title: '格式错误',
                icon: 'none'
            });
            return false;
        } else {
            return true;
        }
    }
}

function checkPassword(val, msg) {
    if (val === '' || val === null || val === undefined) {
        wx.showToast({
            title: msg,
            icon: 'none'
        });
        return false;
    } else {
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(val)) {
            wx.showToast({
                title: '请输入6-14位数字与英文字母组合',
                icon: 'none'
            });
            return false;
        } else {
            return true;
        }
    }
}

function userName(val, msg) {
    if (val === '' || val === null || val === undefined) {
        wx.showToast({
            title: msg,
            icon: 'none'
        });
        return false;
    } else {
        return true;
    }
}

function isArr(val, msg) {
    if(val === null || val === undefined) {
        
    }
    if (val.length == 0 || val === null || val === undefined) {
        wx.showToast({
            title: msg,
            icon: 'none'
        });
        return false;
    } else {
        return true;
    }
}


module.exports = {
    checkPhone: checkPhone,
    isArr: isArr,
    checkPassword: checkPassword,
    userName: userName
}