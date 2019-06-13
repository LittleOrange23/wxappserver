
const { mysql } = require('../../../qcloud')

// 添加帮助与反馈
module.exports = async (ctx) => {
  const { addressId } = ctx.request.query

  try {
    await mysql("address").where({
      addresss_id: addressId
    }).del();
  }
  catch (error) {
    ctx.state = {
      code: -1,
      data: {
        msg: '添加失败' + error.sqlMessage
      }
    }
  }
}