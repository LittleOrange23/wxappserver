
const { mysql } = require('../../qcloud')

// 添加帮助与反馈
module.exports = async (ctx) => {
  const { openId, suggest, time } = ctx.request.body
  console.log(openId, suggest, time)
  try {
    const res = await mysql('help').insert({
      openid: openId,
      suggest: suggest,
      time: time
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