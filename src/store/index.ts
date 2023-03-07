import React from 'react';
import HomeStore from './HomeStore';

class RootStore {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {}
    readonly homeStore = new HomeStore();
}
// 实例化
const context = React.createContext(new RootStore());
export const useStore = () => React.useContext(context);
