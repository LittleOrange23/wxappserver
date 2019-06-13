
const { mysql } = require('../../../qcloud')

// 添加帮助与反馈
module.exports = async (ctx) => {
  const { id } = ctx.request.query

  try {
    const res = await mysql("address")
      .where({
        addresss_id: id
      })
      .select();

    ctx.state.data = {
      list: res,
      message: 'SUCCESS'
    }
  }
  catch (error) {
    ctx.state = {
      code: -1,
      data: {
        msg: '查询失败' + error.sqlMessage
      }
    }
  }
}