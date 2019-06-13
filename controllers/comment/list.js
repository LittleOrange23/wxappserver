const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {

  const res = await mysql('comments').select('comments.*', 'cSessionInfo.user_info', 'goods.*').join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id').join('goods','comments.goodsid', 'goods.goodsid')

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
    message: 'SUCCESS'
  }
}