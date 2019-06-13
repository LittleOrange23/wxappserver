
const { mysql } = require('../../qcloud')


module.exports = async (ctx) => {
  const { shopCarId } = ctx.request.body
  console.log(shopCarId)
  await mysql('shopcar').where('shopcarid', shopCarId).del()


  ctx.state.data = {
    message: 'SUCCESS'
  }
}