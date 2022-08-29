/*
 * @Author: shino 1471386835@qq.com
 * @Date: 2022-04-21 08:02:57
 * @LastEditors: shino 1471386835@qq.com
 * @LastEditTime: 2022-06-04 23:02:14
 * @FilePath: \shop-client\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
    publicPath: "./",
    // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false,
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    // productionSourceMap: !IS_PROD, // 生产环境的 source map
    parallel: require("os").cpus().length > 1,
    pwa: {},
    chainWebpack: config => {
      // 修复HMR
      config.resolve.symlinks(true);
    }
    // devServer:{   //只用与开发环境
    //   proxy:{
    //     'api':{       //支队请求路由以/api开头的其你去进行代理转发
    //       target:'http://gmall-h5-api.atguigu.cn',    //转发的目标url
    //       changeOrigin:true,       //支持跨域
    //       // pathRewrite:{'^/api':''}     // 后台接口都有/api
    //     }
    //   }
  }