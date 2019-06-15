const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {

  const { goodsId } = ctx.request.body
  console.log('商品ID', goodsId);
  const res = await mysql('goods').select('goods.*').where('goods.goodsid', goodsId)
  ctx.state.data = {
    list: res,
    message: 'SUCCESS'
  }
}