
const { mysql } = require('../../qcloud')


module.exports = async (ctx) => {
  const { commentId } = ctx.request.query
  console.log(commentId)
  try {
    //删除收藏
    await mysql("comments").where('commentsid', commentId).del()

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