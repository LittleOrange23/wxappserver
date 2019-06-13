
const { mysql } = require('../../qcloud')


module.exports = async (ctx) => {
  const { openId, goodsId, num, price } = ctx.request.body
  console.log(openId, goodsId, num, price)
  const goods = await mysql('shopcar').select('shopcar.*').where('openid', openId).where('goodsid', goodsId)
  console.log('goodsLength', goods)
  if (goods.length == 0) {
    await mysql('shopcar').insert({
      openid: openId,
      goodsid: goodsId,
      num: num,
      price: price,
    })
  }
  else {
    await mysql('shopcar').update({
      num: parseInt(num) + parseInt(goods[0].num)
    }).where('shopcar.shopcarid', goods[0].shopcarid)
  }

  ctx.state.data = {
    message: 'SUCCESS'
  }
}