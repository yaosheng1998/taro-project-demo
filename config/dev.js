module.exports = {
    env: {
        NODE_ENV: '"development"'
    },
    defineConstants: {
        'process.env.ENV_NODE': '"development"'
    },
    mini: {},
    h5: {
        devServer: {
            port: 8081,
            proxy: {
                '/pri': {
                    target: 'https://dazoulang-zhihuijiaoyu-internet.metrodata.cn:9002/',
                    pathRewrite: {
                        '^/pri': '' // 所以带有/api/请求的链接一律替换为空并追加域名请求
                    },
                    changeOrigin: true
                },
                '/coll': {
                    target: 'https://survey.maicedata.com/api',
                    pathRewrite: {
                        '^/coll': '' // 所以带有/api/请求的链接一律替换为空并追加域名请求
                    },
                    changeOrigin: true
                },
                '/datlas': {
                    target: 'https://www.datlas.cn/',
                    pathRewrite: {
                        '^/datlas': '' // 所以带有/api/请求的链接一律替换为空并追加域名请求
                    },
                    changeOrigin: true
                }
            }
        }
    }
};
