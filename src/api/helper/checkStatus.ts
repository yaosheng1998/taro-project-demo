import { AtToast } from 'taro-ui';
/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
    // switch (status) {
    //     case 400:
    //         taro.AtMessage('请求失败！请您稍后重试');
    //         break;
    //     case 401:
    //         taro.AtMessage('登录失效！请您重新登录');
    //         break;
    //     case 403:
    //         taro.AtMessage('当前账号无权限访问！');
    //         break;
    //     case 404:
    //         taro.AtMessage('你所访问的资源不存在！');
    //         break;
    //     case 405:
    //         taro.AtMessage('请求方式错误！请您稍后重试');
    //         break;
    //     case 408:
    //         taro.AtMessage('请求超时！请您稍后重试');
    //         break;
    //     case 500:
    //         taro.AtMessage('服务异常！');
    //         break;
    //     case 502:
    //         taro.AtMessage('网关错误！');
    //         break;
    //     case 503:
    //         taro.AtMessage('服务不可用！');
    //         break;
    //     case 504:
    //         taro.AtMessage('网关超时！');
    //         break;
    //     default:
    //         taro.AtMessage('请求失败！');
    // }
};
