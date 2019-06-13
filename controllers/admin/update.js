
const { mysql } = require('../../qcloud')

// 添加帮助与反馈
module.exports = async (ctx) => {
  const { id, name, pwd, avatar, tel } = ctx.request.body

  console.log(name, pwd, avatar, tel);
  try {
    const res = await mysql("admin")
      .where({
        id: id
      })
      .update({
        name: name,
        pwd: pwd,
        avatar: avatar,
        tel: tel
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