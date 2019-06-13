const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
  const res = await mysql('admin').select('admin.*')

  ctx.state.data = {
    list: res,
    message: 'SUCCESS'
  }
}
