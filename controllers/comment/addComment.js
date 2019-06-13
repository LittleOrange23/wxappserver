
const { mysql } = require('../../qcloud')


module.exports = async (ctx) => {
  const { openId, comment, time, goodsId } = ctx.request.body
  console.log(openId, comment, time, goodsId)
  try {
    const res = await mysql('comments').insert({
      openid: openId,
      comment: comment,
      time: time,
      goodsid: goodsId
    })
    ctx.state.data = {
      message: 'success',
      commentId: res[0]
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