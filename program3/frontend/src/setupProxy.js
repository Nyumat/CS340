const {createProxyMiddleware} = require('http-proxy-middleware');

// let port = process.argv[2] || 3355;


module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://flip1.engr.oregonstate.edu:3355`,
      changeOrigin: true,
      secure: false,
    }),
  );
};