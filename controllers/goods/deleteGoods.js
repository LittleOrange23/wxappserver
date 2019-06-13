
const { mysql } = require('../../qcloud')


module.exports = async (ctx) => {
  const { goodsId } = ctx.request.query
  console.log(goodsId)
  try {
    //删除收藏
    await mysql("goods").where('goodsid', goodsId).del()

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