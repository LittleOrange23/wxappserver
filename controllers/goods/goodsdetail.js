const {
  mysql
} = require('../../qcloud')

module.exports = async (ctx, next) => {
  const {
    goodsId
  } = ctx.request.body
  console.log('Id', goodsId);
  // 获取商品信息 根据商品 id
  const goodInfo = await mysql('goods')
    .select('goods.*').where('goods.goodsid', goodsId)
  console.log('jieguo',goodInfo);
  ctx.state.data = {
    message: 'SUCCESS',
    goodInfo: goodInfo.map(v => {
      const pics = JSON.parse(v.picture)
      return Object.assign({}, v, {
        picture: pics
      })
    }),
  }
}