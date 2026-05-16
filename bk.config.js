module.exports = {
  host: process.env.BK_APP_HOST,
  port: process.env.BK_APP_PORT,
  publicPath: process.env.BK_STATIC_URL,
  cache: true,
  open: true,
  replaceStatic: true,

  // webpack config 配置
  configureWebpack() {
    if (process.env.NODE_ENV === 'production') {
      return {};
    }
    return {
      devServer: {
        setupMiddlewares: require('./mock-server'),
      },
    };
  },
};
