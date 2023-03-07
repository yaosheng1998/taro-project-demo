import { FC, useEffect } from 'react';
import { View } from '@tarojs/components';
import { history } from '@tarojs/router';
import { useStore } from '@store/index';
import './index.less';

const Index: FC = () => {
    const { homeStore } = useStore();
    return (
        <View className="home__container">
            <View className="home__box">首页box</View>
        </View>
    );
};

export default Index;
