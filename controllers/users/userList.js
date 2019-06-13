const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {

  const res = await mysql('cSessionInfo').select('cSessionInfo.*')
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