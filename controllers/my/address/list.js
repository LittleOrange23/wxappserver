
const { mysql } = require('../../../qcloud')

// 添加帮助与反馈
module.exports = async (ctx) => {
  const { openId, is_default } = ctx.request.query
  console.log('openId', openId, 'is_default', is_default)
  try {
    if (is_default) {
      const address = await mysql("address")
        .where({
          openid: openId,
          is_default,
        }).select().first();
      ctx.state.data = {
        message: 'success',
        address
      }
    }else{
      const addressList = await mysql("address")
        .where({
          openid: openId
        }).select();
      ctx.state.data = {
        message: 'success',
        list: addressList
      }
    }

  }
  catch (error) {
    ctx.state = {
      code: -1,
      data: {
        msg: '添加失败' + error
      }
    }
  }
}