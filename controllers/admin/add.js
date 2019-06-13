
const { mysql } = require('../../qcloud')
const moment = require('moment')

module.exports = async (ctx) => {
  const { name, pwd, tel } = ctx.request.body
  console.log(name, pwd, tel)
  try {
    const res = await mysql('admin').insert({
      name: name,
      pwd: pwd,
      tel: tel,
      create_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    })
    ctx.state.data = {
      message: 'success'
    }
  }
  catch (error) {
    ctx.state = {
      code: -1,
      data: {
        msg: '添加失败' + error.sqlMessage
      }
    }
  }
}