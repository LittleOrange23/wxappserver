
const { mysql } = require('../../qcloud')


module.exports = async (ctx) => {
  const { adminId } = ctx.request.query
  console.log(adminId)
  try {
    //删除收藏
    await mysql("admin").where('id', adminId).del()

    ctx.state.data = {
      message: 'success',
    }
  }
  catch (error) {
    ctx.state = {
      code: -1,
      data: {
        msg: '删除失败' + error.sqlMessage
      }
    }
  }
}