const errorHandler = (err, req, res, next) => {
    console.log(err.stack)
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    })
   
}
module.exports = errorHandler