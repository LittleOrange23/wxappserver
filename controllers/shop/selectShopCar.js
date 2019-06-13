const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
  const { openId } = ctx.request.query
  console.log('sdkjhfsdkjf', openId);
  const res = await mysql('shopcar').select('shopcar.*','goods.goodsid', 'goods.picture', 'goods.title', 'goods.describe').join('goods', 'shopcar.goodsid', 'goods.goodsid').where('shopcar.openid', openId).orderBy('shopcar.shopcarid', 'desc')

  ctx.state.data = {
    list: res.map(v => {
      const pics = JSON.parse(v.picture)
      return Object.assign({}, v, {
        picture: pics
      })
    }),
    message: 'SUCCESS'
  }
}