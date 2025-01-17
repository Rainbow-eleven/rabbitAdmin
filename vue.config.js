//引入该插件
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== "development";
module.exports = {
  //设置为false以加速生产环境构建
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        lessOptions: { javascriptEnabled: true },
      },
    },
  },
  configureWebpack: (config) => {
    externals: {
      echarts: 'echarts' // 配置使用CDN，
    }
    // 生产环境相关配置
    if (isProduction) {
      //gzip压缩
      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
    }
  }
};
