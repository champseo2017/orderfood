exports.testApi123 = (req, res, next) => {
    res.send({ status: 201, message: 'Username is Duplicate' })
    next()
}