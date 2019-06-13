const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
  const { openId } = ctx.request.query
  console.log('aaaaa', openId);
  const res = await mysql('star').select('star.*','goods.*').join('goods', 'star.goodsid', 'goods.goodsid').where('star.openid', openId)

  ctx.state.data = {
    list: res.map(v => {
      const picture = JSON.parse(v.picture)
      return Object.assign({}, v, {
        picture: picture
      })
    }),
    message: 'SUCCESS'
  }
}