
const { mysql } = require('../../qcloud')

// 添加帮助与反馈
module.exports = async (ctx) => {
  const { commentsid, comment } = ctx.request.body

  console.log(commentsid, comment);
  try {
    const res = await mysql("comments")
      .where({
        commentsid: commentsid
      })
      .update({
        comment: comment
      });

    ctx.state.data = {
      list: res,
      message: 'SUCCESS'
    }
  }
  catch (error) {
    ctx.state = {
      code: -1,
      data: {
        msg: '更新失败' + error.sqlMessage
      }
    }
  }
}