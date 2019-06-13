const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {

  const res = await mysql('ads').select('ads.*')

  ctx.state.data = {
    list: res,
    message: 'SUCCESS'
  }
}