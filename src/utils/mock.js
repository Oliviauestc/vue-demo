import Mock from 'mockjs'
Mock.mock('/api/folderList', 'get', (req, res) => {
  console.log('weee', req)
  return {
    returnCode: 1,
    details: [{
      id: 1,
      licNumber: '陕A79898',
      color: 1,
      buyTime: '2017-04-01'
    }, {
      id: 1,
      licNumber: '陕A79898',
      color: 1,
      buyTime: '2017-04-01'
    }],
    returnMsg: '查询成功'
  }
})
Mock.mock('/api/code', 'get', (req, res) => {
  console.log('code', req)
  return {
    returnCode: 1,
    details: Mock.Random.dataImage('50x20', Mock.mock({'regexp': /\w{4}/}).regexp)
  }
})
Mock.mock('/api/login', 'post', (req, res) => {
  console.log('code', req.body)
  const data = JSON.parse(req.body)
  return {
    returnCode: 1,
    details: {
      userName: data.loginName,
      token: Mock.mock({'regexp': /\w{12}/}).regexp
    }
  }
})
