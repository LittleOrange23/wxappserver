const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
  const { openId, goodsId, isPut } = ctx.request.body
  console.log('aaaaa', openId, goodsId, isPut);
  await mysql('goods').update({
    isput: isPut
  }).where('goods.goodsid', goodsId).where('goods.openid', openId)

  ctx.state.data = {
    message: 'SUCCESS'
  }
}