
const { mysql } = require('../qcloud')


module.exports = async (ctx) => {
  const { openId, title, describe, picture, price, oldprice, pickind, name, tel, remark, time, location, isput, eye } = ctx.request.body
  console.log(openId, title, describe, picture, price, oldprice, pickind, name, tel, remark, time, location, isput, eye)

  try {
    const res = await mysql('goods').insert({ 
      openid: openId,
      title: title,
      describe: describe,
      picture: JSON.stringify(picture),
      price: price,
      oldprice: oldprice,
      kindid: pickind,
      name: name,
      phone: tel,
      remark: remark,
      publishtime: time,
      location: location,
      isput: isput,
      eye: eye
})
    ctx.state.data = {
      message: 'success',
      goodsId: res[0]
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