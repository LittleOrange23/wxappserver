
const { mysql } = require('../../qcloud')


module.exports = async (ctx) => {
  const { shopCarId, num } = ctx.request.body
  console.log(shopCarId, num)

  if (num == 0) {
    await mysql('shopcar').where('shopcarid', shopCarId).del()
  }
  else {
    await mysql('shopcar').update({
      num: num
    }).where('shopcar.shopcarid', shopCarId)
  }
  


  ctx.state.data = {
    message: 'SUCCESS'
  }
}