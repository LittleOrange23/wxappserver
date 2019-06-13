
const { mysql } = require('../../qcloud')
const moment = require('moment')

module.exports = async (ctx) => {
  const { imgUrl, isPut, imgName, admin_id } = ctx.request.body
  console.log(imgUrl, isPut, imgName, admin_id)
  try {
    const res = await mysql('ads').insert({
      imgUrl: imgUrl,
      isPut: isPut,
      imgName: imgName,
      admin_id: admin_id
    })
    ctx.state.data = {
      message: 'success'
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