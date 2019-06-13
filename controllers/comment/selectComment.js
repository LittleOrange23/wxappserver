const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
  const { goodsId } = ctx.request.query
  console.log('aaaaa',goodsId);
  const res = await mysql('comments').select('comments.*', 'cSessionInfo.user_info').join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id').where('goodsid', goodsId)

  ctx.state.data = {
    list: res.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        user_info: {
          nickName: info.nickName,
          avatarUrl: info.avatarUrl
        }
      })
    }),
    message: 'SUCCESS'
  }
}