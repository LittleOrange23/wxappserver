/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// console.log('controllers', controllers);

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

router.get('/demo', controllers.demo) 

// 测试接口
router.get('/test', async (ctx,next) => {
    ctx.state.data = {
        msg: 'The Weapp Server is running'
    }
})


/** 
 * 首页滚动宣传图查询
 */
 router.get('/selectads', controllers.home.selectAds)




/**
 * 商品模块
 */
// 新增商品
router.post('/addgoods', controllers.addGoods)
// 查询商品
router.get('/selectgoods', controllers.selectGoods)
// 商品详情
router.get('/goodsinfo', controllers.goodsInfo)
// 首页价格最低
router.get('/lowprice', controllers.lowPrice)
// 首页人气最高
router.get('/hotsee', controllers.hotSee)
//商品分类
router.get('/goodskind', controllers.goodsKind)
// 添加商品收藏
router.post('/addstar', controllers.goods.addStar)
// 查找我的收藏
router.get('/selectstar', controllers.goods.selectStar)
// 删除我的收藏
router.get('/deletestar', controllers.goods.deleteStar)
// 商品搜索
router.get('/searchgoods', controllers.goods.searchGoods)



/** 
 * 评论模块
 */
//  添加评论
router.post('/addcomments', controllers.comment.addComment)
// 查找评论
router.get('/selectcomments', controllers.comment.selectComment)


/**
 * 购物车模块
 */
// 添加购物车
router.post('/addshopcar', controllers.shop.addShopCar)
// 查询购物车
router.get('/selectshopcar', controllers.shop.selectShopCar)
// 更新购物车
router.post('/updateshopcar', controllers.shop.updateShopCar)
// 删除购物车
router.post('/deleteshopcar', controllers.shop.deleteShopCar)
/**
 * 订单模块
 */

// 根据购物车生成订单（所有） 
router.post('/order/create', controllers.order.create)
// 根据商品id生成订单（一个商品直接购买）
router.post('/order/createByGoodsId', controllers.order.createByGoodsId)
router.post('/order/list', controllers.order.list)
// 修改订单状态
router.post('/order/editStatus', controllers.order.editStatus)
// info
router.post('/order/info/orderTotal', controllers.order.info.orderTotal)


/**
 * 我的模块
 */
// 上传帮助与反馈
router.post('/addhelp', controllers.my.addHelp)
// 我发布的
router.get('/mypublish', controllers.my.myPublish)
// 下架商品
router.post('/undergoods', controllers.my.underGoods)

// 地址列表
router.get('/address/getListAction', controllers.my.address.list)
// 添加地址
router.post('/address/saveAction', controllers.my.address.addAddress)
// 删除地址
router.get('/address/deleteAction', controllers.my.address.deleteAddress)
// 地址详情
router.get('/address/detailAction', controllers.my.address.detailAddress)
   

/**
 * 搜索相关接口
 */
//1.关键词和搜索历史接口
router.get('/search/indexaction', controllers.search.index.indexAction)
//2.搜索提示接口
router.get('/search/helperaction', controllers.search.index.helperAction)
//3.搜索的关键词添加到数据库
router.post('/search/addhistoryaction', controllers.search.index.addHistoryAction)
//4.清空搜索历史
router.post('/search/clearhistoryAction', controllers.search.index.clearhistoryAction)




/** 
 * 后台管理模块 
 * 
*/

/** 
 * 商品模块 
*/
router.get('/goods/deletegoods', controllers.goods.deleteGoods)
router.post('/goods/update', controllers.goods.updateGoods)
router.post('/goods/getKindNumber', controllers.backmanage.getGoodsKindNum)


/** 
 * 管理员模块
 */
//查找管理员
router.get('/admin/adminlist', controllers.admin.selectAdmin)
router.post('/admin/adminlogin', controllers.admin.adminLogin)
router.get('/admin/delete', controllers.admin.delete)
router.post('/admin/add', controllers.admin.add)
router.post('/admin/update',controllers.admin.update)


/**用户模块 */
// 用户列表
router.get('/users/userlist', controllers.users.userList)
router.get('/users/delete', controllers.users.delete)


/** 
 * 商品评论模块
 */
router.get('/comment/list', controllers.comment.list)
router.get('/comment/delete', controllers.comment.delete)
router.post('/comment/update', controllers.comment.update)

// Banner 模块
router.get('/banner/list', controllers.banner.list)
router.post('/banner/add', controllers.banner.add)

// 帮助与反馈模块
router.get('/help/list', controllers.help.list)



   
module.exports = router
