
const { mysql } = require('../../qcloud')


module.exports = async (ctx) => {
  const { openId, goodsId, isStar } = ctx.request.body
  console.log(openId, goodsId, isStar)
  try {
    if (isStar == 1) {//添加收藏
      const res = await mysql('star').insert({
        openid: openId,
        goodsid: goodsId
      })
    }
    else { //删除收藏
      await mysql("star").where('openid', openId).where('goodsid', goodsId).del();
    }
    
    ctx.state.data = {
      message: 'success',
    }
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