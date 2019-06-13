
const { mysql } = require('../../qcloud')


module.exports = async (ctx) => {
  const { kindId } = ctx.request.body
  console.log(kindId)
  try {
    //查找收藏
    const res = await mysql("goods").select('goods.*').where('kindid', kindId)

    ctx.state.data = {
      list: res,
      message: 'success',
    }
  }
  catch (error) {
    ctx.state = {
      code: -1,
      data: {
        msg: '获取失败' + error.sqlMessage
      }
    }
  }
}