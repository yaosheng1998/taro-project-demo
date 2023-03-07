// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

const config = {
    env: {},
    projectName: 'project-taro-demo',
    date: '2022-10-14',
    designWidth: 375,
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
        375: 2 / 1
    },
    sourceRoot: 'src',
    outputRoot: `dist/${process.env.TARO_ENV}`,
    plugins: [],
    defineConstants: {},
    copy: {
        patterns: [],
        options: {}
    },
    framework: 'react',
    compiler: 'webpack4',
    cache: {
        enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
        postcss: {
            pxtransform: {
                enable: true,
                config: {}
            },
            url: {
                enable: true,
                config: {
                    limit: 1024 // 设定转换尺寸上限
                }
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            },
            'postcss-px-scale': {
                enable: true,
                config: {
                    scale: 0.5, // 缩放为 1/2
                    units: 'rpx',
                    includes: ['taro-ui']
                }
            }
        }
    },
    h5: {
        publicPath: '/statics/dazoulang_education',
        staticDirectory: 'static',
        esnextModules: ['taro-ui'],
        postcss: {
            autoprefixer: {
                enable: true,
                config: {}
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            },
            'postcss-px-scale': {
                enable: true,
                config: {
                    scale: 0.5, // 缩放为 1/2
                    units: 'rem',
                    includes: ['taro-ui']
                }
            }
        },
        alias: {
            '@api': path.resolve(__dirname, '..', 'src/api'),
            '@utils': path.resolve(__dirname, '..', 'src/utils'),
            '@pages': path.resolve(__dirname, '..', 'src/pages'),
            '@oldPages': path.resolve(__dirname, '..', 'src/oldPages'),
            '@components': path.resolve(__dirname, '..', 'src/components'),
            '@config': path.resolve(__dirname, '..', 'src/config'),
            '@styles': path.resolve(__dirname, '..', 'src/styles'),
            '@store': path.resolve(__dirname, '..', 'src/store'),
            '@': path.resolve(__dirname, '..', 'src')
        }
        // webpackChain(chain, webpack) {
        //     chain.merge({
        //         module: {
        //             rules: [
        //                 {
        //                     test: /\.mjs$/,
        //                     resolve: {
        //                         fullySpecified: false
        //                     },
        //                     include: /node_modules/,
        //                     type: 'javascript/auto'
        //                 }
        //             ]
        //         }
        //     });
        //     chain.plugin('process').use(webpack.ProvidePlugin, [{ process: 'process/browser' }]);
        //     chain.plugin('polyfill').use(require('node-polyfill-webpack-plugin'), []);
        // }
    }
};

module.exports = function (merge) {
    console.log('merge', process.env.PRI_NODE_ENV, process.env.ENV_NODE);
    if (process.env.PRI_NODE_ENV === 'dev') {
        return merge({}, config, require('./dev'));
    } else if (process.env.PRI_NODE_ENV === 'pri') {
        return merge({}, config, require('./pri'));
    } else if (process.env.PRI_NODE_ENV === 'zlb') {
        return merge({}, config, require('./zlb'));
    }
    return merge({}, config, require('./prod'));
};
