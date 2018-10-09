
const healthCheck = async (ctx, next) => {
    ctx.status = 200
    ctx.body = { status: 'OK' }
}


module.exports = {
    healthCheck
}

