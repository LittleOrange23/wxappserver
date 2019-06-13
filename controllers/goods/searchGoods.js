const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {

  const { keyword } = ctx.request.query
  console.log('搜索内容', keyword);
  const res = await mysql('goods').select('goods.*', 'cSessionInfo.user_info').join('cSessionInfo', 'goods.openid', 'cSessionInfo.open_id').where('goodsid', goodsId)
  const isStar = await mysql('star').where('star.goodsid', goodsId).where('star.openid', openId)
  ctx.state.data = {
    list: res.map(v => {
      const info = JSON.parse(v.user_info)
      const pics = JSON.parse(v.picture)
      return Object.assign({}, v, {
        user_info: {
          nickName: info.nickName,
          avatarUrl: info.avatarUrl
        },
        picture: pics
      })
    }),
    isStar: isStar.length,
    message: 'SUCCESS'
  }

  await mysql('goods').where('goodsid', goodsId).increment('eye', 1)
}