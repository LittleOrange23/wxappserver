const { mysql } = require('../../qcloud')

module.exports = async (ctx, next) => {
  const { openid, trade_status} = ctx.request.body
  const orderlist = mysql('orderinfo')
    .select('orderinfo.*')
  try {
    let res
    if (openid) {
      if (trade_status) {
        res = await orderlist.where('orderinfo.open_id', openid).where('orderinfo.trade_status', trade_status)
        console.log('xxx', trade_status);
      } else {
        res = await orderlist.where('orderinfo.open_id', openid)
      }
    } else {
      if (trade_status) {
        res = await orderlist.where('orderinfo.trade_status', trade_status)
      } else {
        res = await orderlist
      }
    }
    const list = await Promise.all(
      res.map(async v => {
        v.goods = await mysql('orderitem')
          .select('orderitem.goods_id', 'orderitem.goods_number', 'orderitem.goods_price', 'goods.goodsid',
          'goods.picture')
          .join('goods', 'goods.goodsid', 'orderitem.goods_id')
          .where('orderitem.order_id', v.order_id)
        return v
      })
    )
    ctx.state.data = {
      message: 'SUCCESS',
      list,
    }
  } catch (error) {
    ctx.state.data = {
      error,
      message: 'fail'
    }
  }
}