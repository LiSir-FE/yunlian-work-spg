
Component({
  options: {
    multipleSlots: true
  },

  properties: {
    isCurent:{
      type: Boolean,
      value: false
    },
    isShowLeftLine: {
      type: Boolean,
      value: true
    },
    axisTitle: {
      type: String,
      value: ''
    },
    axisTitle2: {
      type: String,
      value: ''
    },
    axisTitle3: {
      type: String,
      value: ''
    },
    axisTime:{
      type: String,
      value: ''
    },
    textArray:{
      type: Array,
      value:[]
    }

  },

  data: {
   
  },
  ready() {
    console.log(  this.data.textArray)
  },

  methods: {
 // 这里是一个自定义方法
    delete: function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
