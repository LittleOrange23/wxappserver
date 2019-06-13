
const { mysql } = require('../../qcloud')


module.exports = async (ctx) => {
  const { openId, starId} = ctx.request.query
  console.log(openId, starId)
  try {
    //删除收藏
    await mysql("star").where('openid', openId).where('starid', starId).del()

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