const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);


// vue 3.0 的配置
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? "/blog/" : "/",
    lintOnSave: true,
    outputDir: 'blog',
    devServer: {
        port: 8888,
        // proxy: {
        //     "/blog": {
        //       /* 目标代理服务器地址 */
        //       target: "http://localhost:3000",
        //       /* 允许跨域 */
        //       ws: true,
        //       changeOrigin: true,
        //       // pathRewrite: {
        //       //   "^/api": "" 
        //       // }
        //     }
        // },
    },
    chainWebpack: config => {
        config.resolve.alias // 添加别名
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@store', resolve('src/store'));
    }

    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             '@': path.resolve(__dirname, './src'),
    //         }
    //     }
    // }

}