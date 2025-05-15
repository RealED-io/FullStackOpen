const tokenExtractor = (request, response, next) => {
    const token = request.get('authorization')
    if (token && token.startsWith('Bearer ')) {
        request.token = token.replace('Bearer ', '')
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.kind === 'ObjectId' && error.name === 'CastError') {
        return response.status(404).end()
    }
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' })
    }
    next(error)
}

module.exports = {
    tokenExtractor,
    errorHandler
}