const tokenExtractor = (request, response, next) => {
    const token = request.get('authorization')
    if (token) {
        request.token = token
    }
    next()
}

module.exports = {
    tokenExtractor
}