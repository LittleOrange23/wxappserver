const { mysql } = require('../../qcloud')
module.exports = async (ctx) => {
  const {username, pwd} = ctx.request.body
  const res = await mysql('admin').select('admin.*').where('name', username).where('pwd', pwd)
  if(res.length > 0) {
    ctx.state.data = {
      message: 'SUCCESS'
    }
  }else{
    ctx.state.data = {
      message: 'fail'
    }
  }


}
