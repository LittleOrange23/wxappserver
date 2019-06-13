const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {

  const res = await mysql('ads').select('ads.*','admin.*').join('admin', 'ads.admin_id', 'admin.id')

  ctx.state.data = {
    list: res,
    message: 'SUCCESS'
  }
}