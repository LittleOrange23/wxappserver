
const { mysql } = require('../../qcloud')


module.exports = async (ctx) => {
  const { openid } = ctx.request.query
  console.log(openid)
  try {
    //删除收藏
    await mysql("cSessionInfo").where('open_id', openid).del()

    ctx.state.data = {
      message: 'success',
    }
  }
  catch (error) {
    ctx.state = {
      code: -1,
      data: {
        msg: '删除失败' + error.sqlMessage
      }
    }
  }
}