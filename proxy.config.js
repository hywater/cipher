module.exports = {
    '/api': {
        'target': 'http://localhost:8082',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/garden'
        }
    }
}