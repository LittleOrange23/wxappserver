const { mysql } = require('../../qcloud')
const UUID = require('node-uuid')
const moment = require('moment')
module.exports = async (ctx, next) => {
  const { openid } = ctx.request.body
  try {
    const goods = await mysql('shopcar').select('goodsid', 'num', 'price').where('shopcar.openid', openid)
    // 首先创建一个订单
    const order_number = UUID.v1()
    const order = await mysql('orderinfo').insert({
      order_number,
      open_id: openid,
      trade_status: 0,
      pay_status: 0,
      create_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    })

    let count = 0
    let goods_count = 0
    await goods.map(async v => {
      count = count + v.num * v.price
      goods_count = goods_count + v.num
      await mysql('orderitem').insert({
        order_id: order,
        order_number,
        goods_id: v.goodsid,
        goods_number: v.num,
        goods_price: v.price,
        create_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      })
    })
    await mysql('orderinfo').update({
      order_amount: count,
      goods_count,
    }).where('order_id', order)
    // 删除购物车中的内容
    await mysql('shopcar').del().where('openid', openid)
    ctx.state.data = {
      message: 'SUCCESS',
      count,
      order
    }
  } catch (error) {
    ctx.state.data = {
      error,
      message: 'fail'
    }
  }
}