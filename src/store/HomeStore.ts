import { makeAutoObservable, runInAction } from 'mobx';
import { parseQueryResult, ewkbToGeojson, isWeChatMiniApp } from '@utils/globaling';
import { getStorageSync } from '@tarojs/taro';
import request from '@api/index';
import * as API from '@api/collector';

class HomeStore {
    constructor() {
        makeAutoObservable(this);
    }
    loading = { swiper: false, land: false };
    swiperImageList: any[] = [];
    landData: any[] = [];
    isWeChatMiniApp: boolean = false;

    // 判断是否在微信小程序环境
    checkWeChatMiniApp() {
        isWeChatMiniApp().then(res => (this.isWeChatMiniApp = !!res));
    }
    // 获取轮播图
    async getSwiperImageList() {
        if (this.swiperImageList.length) return;
        !this.loading.swiper && runInAction(() => (this.loading.swiper = true));
        const style = getStorageSync('uiStyle') || 'normal';
        const data = await request.get(API.SWIPER_IMAGES_QUERY, { w: `extra.image_type = '${style}'` });
        runInAction(() => {
            this.loading.swiper = false;
            this.swiperImageList = parseQueryResult(data.result);
        });
    }
    // 获取规划边界
    async getLandData() {
        if (this.landData.length) return;
        !this.loading.land && runInAction(() => (this.loading.land = true));
        const data = await request.get(API.HOME_LAND_DATA_QUERY);
        runInAction(() => {
            this.loading.land = false;
            this.landData = parseQueryResult(data.result);
        });
    }
}
export default HomeStore;
