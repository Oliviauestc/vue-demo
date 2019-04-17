const RULE = {
  idNumber15: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/,
  idNumber18: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
  macAddress: /^([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}$/,
  carNumber: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领甲A-Za-z]{1}[A-Za-z]{1}[A-Za-z0-9]{4,5}[A-Za-z0-9挂学警港澳]{1}$/,
  ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  // password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
  number: /^\d+(\.\d+)?$/,
  positiveInteger: /^[1-9]\d*$/,
  telephone: /^1[0-9]{10}$/,
  code: /^[0-9]{11}$/,
  name: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
  email: /^\w+((-\w+)|(\.\w+)*)+@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
  time: /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/,
  shiftname: /^[\d|A-z|\u4E00-\u9FFF]+$/,
  mac: /^[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}$/,
  phone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
  blueTooth: /^[0-9A-Za-z]{18}$/,
  serialNumber: /^\w+$/,
  cardNumber: /^[A-Fa-f0-9]{8,16}$/,
  hundredNumber: /^[1-9]\d{0,1}$|100$/,
  eightNumber: /^[1-9]\d{0,7}$|^0$/,
  count: /^([1-9]\d*|[0]{1,1})$/,
  price: /^(([1-9]\d{0,3})|0)(\.\d{1,2})?$/,
  productPrice: /^([1-9]\d{0,9}$)|^([1-9]\d{0,7}(\.\d{1,2})?$)|^0(\.\d{1,2})$/
}

export default {
  RULE: RULE,
  codeNumber: (rule, value, callback) => {
    if (!value) {
      return callback()
    }
    if (value.length > 9 || value.length < 1) {
      callback(new Error('请输入长度在9位以内的数字'))
    } else if (RULE.number.test(value) === false) {
      return callback(new Error('请输入长度在9位以内的数字'))
    } else {
      callback()
    }
  },
  sortPass: (rule, value, callback) => {
    if (value === '' || value === null) {
      return callback()
    }
    if (RULE.hundredNumber.test(value) === false) {
      return callback(new Error('请输入正确的排序，范围为1-100的整数'))
    } else {
      callback()
    }
  },
  commission: (rule, value, callback) => {
    if (!value) {
      return callback()
    }
    if (value < 1 || value > 100) {
      callback(new Error('请输入1-100的数字'))
    } else {
      callback()
    }
  },
  serialPass: (rule, value, callback) => {
    if (!value) {
      return callback()
    }
    if (value.length !== 15 && value.length !== 18) {
      callback(new Error('请输入15位或18位身份证号'))
    } else if (RULE.serialNumber.test(value) === false) {
      return callback(new Error('请输入数字和字母的组合'))
    } else {
      callback()
    }
  },
  carNumberPass: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else if (RULE.carNumber.test(value) === false) {
      return callback(new Error('请输入正确的车牌号'))
    } else {
      callback()
    }
  },
  shiftnamePass: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else if (RULE.shiftname.test(value) === false) {
      return callback(new Error('请输入中英文及数字组合'))
    } else {
      callback()
    }
  },
  IDnumberPass: (rule, value, callback) => {
    if (!value) return callback()

    if (value.length !== 15 && value.length !== 18) {
      callback(new Error('请输入15位或18位身份证号'))
    } else {
      if (value.includes('****************')) return callback()
      RULE.idNumber15.test(value) || RULE.idNumber18.test(value)
        ? callback()
        : callback(new Error('请输入正确的身份证号'))
    }
  },
  passwordPass: (rule, value, callback) => {
    if (!value) return callback()

    if (value.length < 8 || value.length > 16) {
      return callback(new Error('请输入8到16位密码'))
    } else {
      !RULE.password.test(value) ? callback(new Error('密码必须由大小写字母数字三种组合而成')) : callback()
    }
  },
  telephonePass: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else if (value.length !== 11) {
      return callback(new Error('请输入11位手机号'))
    } else if (RULE.telephone.test(value) === false) {
      return callback(new Error('请输入正确手机号码'))
    } else {
      callback()
    }
  },
  phonePass: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else if (RULE.phone.test(value) === false) {
      return callback(new Error('请输入正确座机号码'))
    } else {
      callback()
    }
  },
  blueToothPass: (rule, value, callback) => {
    if (!value) {
      return callback()
    } else if (value.length !== 18) {
      return callback(new Error('请输入18位序列号'))
    } else if (RULE.blueTooth.test(value) === false) {
      return callback(new Error('请输入正确序列号'))
    } else {
      callback()
    }
  },
  numberPass: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.number.test(value)
      ? callback(new Error('请输入数字'))
      : callback()
  },
  countPass: (rule, value, callback) => {
    if (value === '') {
      return callback()
    }
    if (value > 99999 || value <= 0) {
      callback(new Error('请输入大于0且小于99999的整数'))
    }
    !RULE.count.test(value)
      ? callback(new Error('请输入整数'))
      : callback()
  },
  pricePass: (rule, value, callback) => {
    if (!value) return callback()
    !RULE.price.test(value)
      ? callback(new Error('请正确输入产品单价'))
      : callback()
  },
  namePass: (rule, value, callback) => {
    if (!value) return callback()
    !RULE.name.test(value)
      ? callback(new Error('请输入中英文或数字'))
      : callback()
  },
  macAddressPass: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.macAddress.test(value)
      ? callback(new Error('请输入正确格式的mac地址'))
      : callback()
  },
  ipPass: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.ip.test(value)
      ? callback(new Error('请输入正确格式的IP地址'))
      : callback()
  },
  macPass: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.mac.test(value)
      ? callback(new Error('请输入正确格式的MAC地址'))
      : callback()
  },
  dateCheckPass: (arr) => {
    let isPass = true
    let begin = null
    let end = null
    let months = 0

    if (!arr || arr.length !== 2) isPass = false

    begin = new Date(arr[0])
    end = new Date(arr[1])

    if ((end.getTime() - begin.getTime()) / (3600 * 24 * 1000) > 92) isPass = false

    months = end.getMonth() < begin.getMonth()
      ? end.getMonth() + 11 - begin.getMonth()
      : end.getMonth() - begin.getMonth()

    if (months > 3) isPass = false

    return isPass
  },
  emailPass: (rule, value, callback) => {
    if (!value) return callback()

    !RULE.email.test(value)
      ? callback(new Error('邮箱格式错误'))
      : callback()
  },
  validateDatePass: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入天数'))
    } else if (!/^[1-9]\d{0,7}$|^0$/.test(value)) {
      callback(new Error('请输入正确的天数'))
    } else {
      callback()
    }
  },
  validateRetailPricePass: (rule, value, callback) => {
    if (value !== '' && !RULE.productPrice.test(value)) {
      callback(new Error('最多8位整数及2位小数'))
    }
    callback()
  },
  // validateMarkingPricePass: (rule, value, callback) => {
  //   if (value !== '' && !RULE.productPrice.test(value)) {
  //     callback(new Error('请输入划线价，不超过8位整数，小数不超过2位'))
  //   }
  //   callback()
  // },
  validateCommissionPercentPass: (rule, value, callback) => {
    if (!value) return callback()
    if (value <= 0 || value >= 100) {
      callback(new Error('大于0且小于100'))
    } else if (
      !/(^([1-9]\d{0,1})(\.\d{1,2})?$)|(^0(\.\d{1,2})$)/.test(value)
    ) {
      callback(new Error('最多包含2位小数'))
    }
    callback()
  }
}

