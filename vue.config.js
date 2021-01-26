const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/" : "./",
    // 在npm run build时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: './prod/flashloanraja_admin',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: 'static',
    // 是否开启eslint保存检测，有效值：ture | false | 'error'
    lintOnSave: false,
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // webpack-dev-server 相关配置


    devServer: {
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: 'https://loan.ineasyfinance.com/ad',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: '',
                },
                emulateJSON: true,
                headers: {
                    "content-type": "application/json"
                }
            },
        },

    },


    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()

        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },
}