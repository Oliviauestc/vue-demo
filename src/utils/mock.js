import Mock from 'mockjs'
Mock.mock('/api/folderList', 'get', (req, res) => {
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
