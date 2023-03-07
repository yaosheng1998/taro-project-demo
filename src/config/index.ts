export const BASE_URL_DATLAS = {
    development: '/pri',
    production: 'https://www.datlas.cn',
    pri: 'https://dazoulang-zhihuijiaoyu-internet.metrodata.cn:9002'
}[process.env.ENV_NODE];
export const BASE_URL_COLLECTOR = {
    development: '/pri/api',
    production: 'https://www.datlas.cn/api/',
    pri: 'https://dazoulang-zhihuijiaoyu-internet.metrodata.cn:9002/api/'
}[process.env.ENV_NODE];
