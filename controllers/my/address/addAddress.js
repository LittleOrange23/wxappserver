
const { mysql } = require('../../../qcloud')

// 添加帮助与反馈
module.exports = async (ctx) => {
  const { addressId, openId, userName, telNumber, address, detailadress, checked } = ctx.request.body

  //如果是默认选中
  //先在数据库查询是否默认的地址
  if (checked) {
    const isDefault = await mysql("address").where({
      openid: openId,
      is_default: 1
    });
    if (isDefault.length > 0) {
      await mysql("address")
        .where({
          openid: openId,
          is_default: 1
        })
        .update({
          is_default: 0
        });
    }
  }
  try {
    if (!addressId) {
      const res = await mysql("address").insert({
        name: userName,
        mobile: telNumber,
        address: address,
        address_detail: detailadress,
        openid: openId,
        is_default: checked == "true" || checked ? 1 : 0
      });
      ctx.state.data = {
        message: 'success',
        list: res
      }
    }
    else {
      //更新地址
      const res = await mysql("address")
        .where({
          addresss_id: addressId
        })
        .update({
          name: userName,
          mobile: telNumber,
          address: address,
          address_detail: detailadress,
          openid: openId,
          is_default: checked == "true" || checked ? 1 : 0
        });
      ctx.state.data = {
        message: 'success',
        list: res
      }
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