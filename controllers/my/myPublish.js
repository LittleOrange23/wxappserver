const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
  const { openId } = ctx.request.query
  console.log('aaaaa', openId);
  const res = await mysql('goods').select('goods.*', 'cSessionInfo.user_info').join('cSessionInfo', 'goods.openid', 'cSessionInfo.open_id').where('openid', openId)

  ctx.state.data = {
    list: res.map(v => {
      const info = JSON.parse(v.user_info)
      const picture = JSON.parse(v.picture)
      return Object.assign({}, v, {
        user_info: {
          nickName: info.nickName,
          avatarUrl: info.avatarUrl
        },
        picture: picture
      })
    }),
    message: 'SUCCESS'
  }
}