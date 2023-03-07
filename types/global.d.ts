/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
    interface ProcessEnv {
        TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
        ENV_NODE: 'development' | 'production';
    }
}
declare class ZwLog {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_payload?: any);
    [x: string]: any;
}
declare const ZWJSBridge: Recordable;
declare const wx: Recordable;
declare type Recordable<T = any> = Record<string, T>;
interface Window {
    srt: any;
    NODE_ENV: string;
}
