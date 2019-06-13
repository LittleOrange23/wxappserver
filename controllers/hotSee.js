const { mysql } = require('../qcloud')

module.exports = async (ctx) => {

  const res = await mysql('goods').select('goods.*', 'cSessionInfo.user_info').join('cSessionInfo', 'goods.openid', 'cSessionInfo.open_id').where('isput', 1)
.orderBy('goods.eye', 'desc')

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