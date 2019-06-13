
const { mysql } = require('../../qcloud')

// 添加帮助与反馈
module.exports = async (ctx) => {
  const { goodsid, title, price, oldprice, kindid, describe, remark,  phone} = ctx.request.body

  console.log(goodsid, title, price, oldprice, kindid, describe, remark, phone);
  try {
    const res = await mysql("goods")
      .where({
        goodsid: goodsid
      })
      .update({
        title: title,
        price: price,
        oldprice: oldprice,
        kindid: kindid,
        describe: describe,
        remark: remark,
        phone: phone
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