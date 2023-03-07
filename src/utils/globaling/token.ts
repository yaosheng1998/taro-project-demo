// import { REACT_APP_AUTH } from '@/config';
import { getCookie } from './cookie';
import * as LZString from 'lz-string';

// 获取token
export const getToken = () => {
    const t = '859ce000-3e17-4698-b052-543cb621d524';
    return t;
    let dm_token = localStorage.getItem('dm_token_') || '';
    if (window.location.hostname.indexOf('maicedata') !== -1) dm_token = getCookie('__DM_TOKEN__') || '';
    return process.env.ENV_NODE === 'development' ? t : LZString.decompressFromEncodedURIComponent(dm_token);
};
