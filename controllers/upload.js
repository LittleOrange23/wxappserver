const { uploader } = require('../qcloud')

module.exports = async ctx => {
    // 获取上传之后的结果
    // 具体可以查看：
    console.log('111111111111111111111111111111111111111111111111111111111111111111');
    const data = await uploader(ctx.req)
    console.log('data', data);
    ctx.state.data = data
}
