module.exports = {
    // lintOnSave: false, // 关闭ESLint的规则检查
    lintOnSave: 'warning', // 输出提示错误, 但项目继续运行

    devServer:{   //只用与开发环境
      proxy:{
        'api':{       //支队请求路由以/api开头的其你去进行代理转发
          target:'http://39.98.123.211',    //转发的目标url
          changeOrigin:true,       //支持跨域
          // pathRewrite:{'^/api':''}     // 后台接口都有/api
        }
      }
    }
  }