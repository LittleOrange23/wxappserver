const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {

  const res = await mysql('help').select('help.*')
  ctx.state.data = {
    list: res,
    message: 'SUCCESS'
  }
}