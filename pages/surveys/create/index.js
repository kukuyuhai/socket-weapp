// pages/surveys/create/index.js
const util = require('../../../utils/util.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    maxDate: new Date().getTime() + 1296000000, //最长15天
    currentDateVal: util.formatDate(new Date()),
    currentHours: '18:00',
    minHour: 0,
    maxHour: 23,
    yearPicker: false,
    hourPicker: false,
    show: false,
    actions: [{
        name: '15分钟'
      },
      {
        name: '25分钟'
      },
      {
        name: '30分钟'
      },
      {
        name: '60分钟以上'
      }
    ]
  },
  onConfirmDate(event) {
    this.setData({
      currentDateVal: util.formatDate(new Date(event.detail)),
      currentDate: event.detail,
      yearPicker: false
    });
  },
  onConfirmTime() {
    this.setData({
      currentHours: event.detail,
      hourPicker: false
    });
  },
  onInputTime(event) {
    this.setData({
      currentHours: event.detail
    });
  },
  onShowPopUp(e) {
    const key = e.currentTarget.dataset.evn;
    this.setData({
      [key]: true
    })
  },
  onClosePopup(e) {
    const key = e.currentTarget.dataset.evn;
    this.setData({
      [key]: false
    })
  },
  showActionsheets() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },

  onSelect(event) {
    console.log(event.detail);
    this.setData({
      duration: event.detail.name
    })
  },
  addTag() {
    this.setData({
      tag: true
    })
  },
  onInputTagText(e) {
    this.setData({
      tagText: e.detail
    })
  },
  onCloseTag() {
    const text = this.data.tagText;
    let tmp;
    if (text.indexOf("，") > -1) {
      tmp = text.split("，").filter(d => d);
    } else {
      tmp = [text]
    }
    this.setData({
      tagGroup: tmp,
      tag: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})