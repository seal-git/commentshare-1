const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://flask:5000',
      // changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  );
};