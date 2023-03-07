import { BASE_URL_DATLAS } from '@/config';
import { transStyleJson } from './bMapUtil';
import { getToken } from '@utils/globaling/token';

const baseStyleJson = [
    {
        featureType: 'water',
        elementType: 'all',
        stylers: {
            color: '#1f314eff'
        }
    },
    {
        featureType: 'highway',
        elementType: 'geometry.fill',
        stylers: {
            color: '#2b335aff'
        }
    },
    {
        featureType: 'highway',
        elementType: 'geometry.stroke',
        stylers: {
            color: '#1c212eff',
            weight: '0.5'
        }
    },
    {
        featureType: 'arterial',
        elementType: 'geometry.fill',
        stylers: {
            color: '#191533ff'
        }
    },
    {
        featureType: 'arterial',
        elementType: 'geometry.stroke',
        stylers: {
            color: '#263151ff'
        }
    },
    {
        featureType: 'local',
        elementType: 'geometry',
        stylers: {
            color: '#1d2235ff'
        }
    },
    {
        featureType: 'land',
        elementType: 'all',
        stylers: {
            color: '#162235ff'
        }
    },
    {
        featureType: 'railway',
        elementType: 'geometry.fill',
        stylers: {
            color: '#000000'
        }
    },
    {
        featureType: 'railway',
        elementType: 'geometry.stroke',
        stylers: {
            color: '#08304b'
        }
    },
    {
        featureType: 'subway',
        elementType: 'geometry',
        stylers: {
            lightness: -70
        }
    },
    {
        featureType: 'building',
        elementType: 'geometry.fill',
        stylers: {
            color: '#1d1f35ff'
        }
    },
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#857f7fff'
        }
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: {
            color: '#191b27ff'
        }
    },
    {
        featureType: 'building',
        elementType: 'geometry',
        stylers: {
            color: '#182745ff'
        }
    },
    {
        featureType: 'green',
        elementType: 'geometry',
        stylers: {
            color: '#152921ff'
        }
    },
    {
        featureType: 'boundary',
        elementType: 'all',
        stylers: {
            color: '#20254aff'
        }
    },
    {
        featureType: 'manmade',
        elementType: 'geometry',
        stylers: {
            color: '#022338'
        }
    },
    {
        featureType: 'poi',
        elementType: 'all',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#6069a8ff',
            visibility: 'on'
        }
    },
    {
        featureType: 'town',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#4a649aff'
        }
    },
    {
        featureType: 'city',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#7490d4ff'
        }
    },
    {
        featureType: 'district',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#5773b8ff'
        }
    },
    {
        featureType: 'subway',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#4f73bdff'
        }
    },
    {
        featureType: 'subway',
        elementType: 'geometry',
        stylers: {
            color: '#dce1efff',
            weight: '0.6'
        }
    }
];
const normalStyleJson = [
    {
        featureType: 'land',
        elementType: 'geometry.fill',
        stylers: {
            color: '#f6f6f4ff'
        }
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: {
            color: '#e1e7e8ff'
        }
    },
    {
        featureType: 'green',
        elementType: 'all',
        stylers: {
            color: '#eceeedff'
        }
    },
    {
        featureType: 'manmade',
        elementType: 'geometry.fill',
        stylers: {
            color: '#eceeedff'
        }
    },
    {
        featureType: 'subwaystation',
        elementType: 'geometry.fill',
        stylers: {
            color: '#cacdcfff'
        }
    },
    {
        featureType: 'education',
        elementType: 'all',
        stylers: {
            color: '#efefefff'
        }
    },
    {
        featureType: 'medical',
        elementType: 'all',
        stylers: {
            color: '#eaecedff'
        }
    },
    {
        featureType: 'scenicspots',
        elementType: 'geometry.fill',
        stylers: {
            color: '#d3dadaff'
        }
    },
    {
        featureType: 'building',
        elementType: 'geometry.fill',
        stylers: {
            color: '#ffffffff'
        }
    },
    {
        featureType: 'manmade',
        elementType: 'labels',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'manmade',
        elementType: 'labels.icon',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'poilabel',
        elementType: 'labels.icon',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'highway',
        elementType: 'geometry.fill',
        stylers: {
            color: '#ffffffff'
        }
    },
    {
        featureType: 'highway',
        elementType: 'geometry.stroke',
        stylers: {
            color: '#dce0deff'
        }
    },
    {
        featureType: 'subway',
        elementType: 'geometry',
        stylers: {
            color: '#ffffffff'
        }
    },
    {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'highway',
        elementType: 'labels.icon',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'poilabel',
        elementType: 'labels',
        stylers: {
            color: '#ffffffff',
            visibility: 'off'
        }
    },
    {
        featureType: 'subway',
        elementType: 'labels',
        stylers: {
            saturation: -100
        }
    },
    {
        featureType: 'road',
        elementType: 'labels',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'manmade',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#899690ff'
        }
    },
    {
        featureType: 'poilabel',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#a6afabff'
        }
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#ccccccff',
            visibility: 'off'
        }
    },
    {
        featureType: 'subway',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#cacdcfff'
        }
    },
    {
        featureType: 'background',
        elementType: 'labels.text.stroke',
        stylers: {
            color: '#ffffffff'
        }
    },
    {
        featureType: 'subway',
        elementType: 'labels.icon',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'highway',
        elementType: 'labels.text.stroke',
        stylers: {
            color: '#959f99ff'
        }
    },
    {
        featureType: 'district',
        elementType: 'labels.text.stroke',
        stylers: {
            color: '#ffffffff',
            visibility: 'off'
        }
    },
    {
        featureType: 'district',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#ccccccff',
            visibility: 'off'
        }
    },
    {
        featureType: 'town',
        elementType: 'labels',
        stylers: {
            color: '#ccccccff',
            visibility: 'off'
        }
    },
    {
        featureType: 'arterial',
        elementType: 'geometry.fill',
        stylers: {
            color: '#ebebebff'
        }
    },
    {
        featureType: 'arterial',
        elementType: 'geometry.stroke',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'railway',
        elementType: 'all',
        stylers: {
            color: '#ebebeb63'
        }
    }
];

const darkStyleJson = [
    {
        featureType: 'water',
        elementType: 'all',
        stylers: {
            color: '#0b1824ff'
        }
    },
    {
        featureType: 'highway',
        elementType: 'geometry',
        stylers: {
            color: '#19222f7a'
        }
    },
    {
        featureType: 'arterial',
        elementType: 'geometry',
        stylers: {
            color: '#151e2f57'
        }
    },
    {
        featureType: 'local',
        elementType: 'geometry',
        stylers: {
            color: '#1019224f'
        }
    },
    {
        featureType: 'land',
        elementType: 'all',
        stylers: {
            color: '#070e16ff'
        }
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: {
            color: '#000000',
            visibility: 'off'
        }
    },
    {
        featureType: 'subway',
        elementType: 'geometry',
        stylers: {
            lightness: -70,
            visibility: 'off'
        }
    },
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#857f7fff'
        }
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: {
            color: '#191b27ff'
        }
    },
    {
        featureType: 'building',
        elementType: 'geometry.fill',
        stylers: {
            color: '#1c253563'
        }
    },
    {
        featureType: 'green',
        elementType: 'geometry',
        stylers: {
            color: '#031114ff'
        }
    },
    {
        featureType: 'boundary',
        elementType: 'all',
        stylers: {
            color: '#212847ff'
        }
    },
    {
        featureType: 'manmade',
        elementType: 'all',
        stylers: {
            color: '#000000ff'
        }
    },
    {
        featureType: 'town',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#4a649a00',
            visibility: 'off'
        }
    },
    {
        featureType: 'city',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#7490d400',
            visibility: 'off'
        }
    },
    {
        featureType: 'district',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#5773b800',
            visibility: 'off'
        }
    },
    {
        featureType: 'railway',
        elementType: 'geometry',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'all',
        elementType: 'labels',
        stylers: {
            visibility: 'off'
        }
    }
];
const whiteLabelStyleJson = [
    // {
    //     featureType: 'all',
    //     elementType: 'labels',
    //     stylers: {
    //         lightness: -6,
    //         saturation: -100
    //     }
    // }
    // {
    //     featureType: 'subway.fill',
    //     elementType: 'all',
    //     stylers: {
    //         color: '#aaaaaaff',
    //         visibility: 'on'
    //     }
    // },
    // {
    //     featureType: 'manmade.fill',
    //     elementType: 'labels',
    //     stylers: {
    //         color: '#aaaaaaff',
    //         visibility: 'on'
    //     }
    // },
    // {
    //     featureType: 'manmade',
    //     elementType: 'geometry',
    //     stylers: {
    //         color: '#cfcfcfff',
    //         visibility: 'on'
    //     }
    // },
    // {
    //     featureType: 'building',
    //     elementType: 'all',
    //     stylers: {
    //         color: '#ffffffff'
    //     }
    // }
    {
        featureType: 'green',
        elementType: 'geometry.fill',
        stylers: {
            color: '#b0feb0'
        }
    },
    {
        featureType: 'water',
        elementType: 'all',
        stylers: {
            color: '#87CEFA'
        }
    }
];
const whiteFreshStyleJson = [
    {
        featureType: 'land',
        elementType: 'geometry.fill',
        stylers: {
            color: '#e5e3e3ff',
            visibility: 'on'
        }
    },
    {
        featureType: 'subway.fill',
        elementType: 'all',
        stylers: {
            color: '#aaaaaaff',
            visibility: 'on'
        }
    },
    {
        featureType: 'manmade.fill',
        elementType: 'labels',
        stylers: {
            color: '#aaaaaaff',
            visibility: 'on'
        }
    },
    {
        featureType: 'manmade',
        elementType: 'geometry',
        stylers: {
            color: '#cfcfcfff',
            visibility: 'on'
        }
    },
    {
        featureType: 'building',
        elementType: 'all',
        stylers: {
            color: '#ffffffff'
        }
    },
    {
        featureType: 'water',
        elementType: 'all',
        stylers: {
            color: '#9cbfd1ff'
        }
    },
    {
        featureType: 'local',
        elementType: 'all',
        stylers: {
            color: '#b9d1b6ff'
        }
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: {
            color: '#ffffffff'
        }
    },
    {
        featureType: 'arterial',
        elementType: 'geometry.stroke',
        stylers: {
            color: '#e1e1e1ff',
            weight: '1'
        }
    },
    {
        featureType: 'highway',
        elementType: 'geometry.stroke',
        stylers: {
            color: '#e1e1e1ff'
        }
    },
    {
        featureType: 'local',
        elementType: 'geometry.stroke',
        stylers: {
            color: '#e6e6e6ff',
            weight: '0.7',
            visibility: 'on'
        }
    },
    {
        featureType: 'poilabel',
        elementType: 'labels',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'administrative',
        elementType: 'all',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'highway',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#c1bebeff',
            visibility: 'on'
        }
    },
    {
        featureType: 'highway',
        elementType: 'labels.text.stroke',
        stylers: {
            color: '#ffffffff',
            weight: '0.1',
            visibility: 'on'
        }
    },
    {
        featureType: 'arterial',
        elementType: 'labels',
        stylers: {
            color: '#c4c4c4ff'
        }
    },
    {
        featureType: 'arterial',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#b8b7b7ff'
        }
    },
    {
        featureType: 'arterial',
        elementType: 'labels.text.stroke',
        stylers: {
            color: '#ffffffff'
        }
    },
    {
        featureType: 'education',
        elementType: 'all',
        stylers: {
            color: '#ddddddff'
        }
    },
    {
        featureType: 'highway',
        elementType: 'labels.icon',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'local',
        elementType: 'geometry',
        stylers: {
            color: '#fcfffbfc'
        }
    },
    {
        featureType: 'green',
        elementType: 'geometry.fill',
        stylers: {
            color: '#b7ccb1ff'
        }
    }
];

const darkLabelStyleJson = [
    {
        featureType: 'water',
        elementType: 'all',
        stylers: {
            color: '#0b1824ff'
        }
    },
    {
        featureType: 'highway',
        elementType: 'geometry',
        stylers: {
            color: '#19222f7a'
        }
    },
    {
        featureType: 'arterial',
        elementType: 'geometry',
        stylers: {
            color: '#151e2f57'
        }
    },
    {
        featureType: 'local',
        elementType: 'geometry',
        stylers: {
            color: '#1019224f'
        }
    },
    {
        featureType: 'land',
        elementType: 'all',
        stylers: {
            color: '#070e16ff'
        }
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: {
            color: '#000000',
            visibility: 'off'
        }
    },
    {
        featureType: 'subway',
        elementType: 'geometry',
        stylers: {
            lightness: -70,
            visibility: 'off'
        }
    },
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#857f7fff'
        }
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: {
            color: '#191b27ff'
        }
    },
    {
        featureType: 'building',
        elementType: 'geometry.fill',
        stylers: {
            color: '#1c253563'
        }
    },
    {
        featureType: 'green',
        elementType: 'geometry',
        stylers: {
            color: '#031114ff'
        }
    },
    {
        featureType: 'boundary',
        elementType: 'all',
        stylers: {
            color: '#212847ff'
        }
    },
    {
        featureType: 'manmade',
        elementType: 'all',
        stylers: {
            color: '#000000ff'
        }
    },
    {
        featureType: 'town',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#4a649a00',
            visibility: 'off'
        }
    },
    {
        featureType: 'city',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#7490d400',
            visibility: 'off'
        }
    },
    {
        featureType: 'district',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#5773b800',
            visibility: 'off'
        }
    },
    {
        featureType: 'railway',
        elementType: 'geometry',
        stylers: {
            visibility: 'off'
        }
    },
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: {
            color: '#eeeeeeff',
            weight: '1.4',
            lightness: -20,
            visibility: 'on'
        }
    }
];
const darkLabelStyleStr = encodeURIComponent(transStyleJson(darkLabelStyleJson));
const whiteLabelStyleStr = encodeURIComponent(transStyleJson(whiteLabelStyleJson));
const whiteFreshStyleStr = encodeURIComponent(transStyleJson(whiteFreshStyleJson));
const baseStyleStr = encodeURIComponent(transStyleJson(baseStyleJson));
const normalStyleStr = encodeURIComponent(transStyleJson(normalStyleJson));
const darkStyleStr = encodeURIComponent(transStyleJson(darkStyleJson));

const bMapStyles = {
    base: {
        urlTemplate: `${BASE_URL_DATLAS}/webapi/bdimg/api0/customimage/tile?&x={x}&y={y}&z={z}&udt=20181205&scale=2&styles=${baseStyleStr}`,
        subdomains: [0, 1, 2],
        attribution: '&copy; <a href="http://map.baidu.com/">Baidu</a>'
    },
    normal: {
        urlTemplate: `${BASE_URL_DATLAS}/webapi/bdimg/api0/customimage/tile?&x={x}&y={y}&z={z}&udt=20181205&scale=2&styles=${normalStyleStr}`,
        subdomains: [0, 1, 2],
        attribution: '&copy; <a href="http://map.baidu.com/">Baidu</a>'
    },
    dark: {
        urlTemplate: `${BASE_URL_DATLAS}/webapi/bdimg/api0/customimage/tile?&x={x}&y={y}&z={z}&udt=20181205&scale=2&styles=${darkStyleStr}`,
        subdomains: [0, 1, 2],
        attribution: '&copy; <a href="http://map.baidu.com/">Baidu</a>'
    },
    wxt: {
        urlTemplate: `${BASE_URL_DATLAS}/webapi/bdimg/shangetu0/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46`,
        subdomains: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        attribution: '&copy; <a href="http://map.baidu.com/">Baidu</a>'
    },
    whiteLabel: {
        urlTemplate: `${BASE_URL_DATLAS}/webapi/bdimg/api0/customimage/tile?&x={x}&y={y}&z={z}&udt=20181205&scale=2&styles=${whiteLabelStyleStr}`,
        subdomains: [0, 1, 2],
        attribution: '&copy; <a href="http://map.baidu.com/">Baidu</a>'
    },
    whiteFresh: {
        urlTemplate: `${BASE_URL_DATLAS}/webapi/bdimg/api0/customimage/tile?&x={x}&y={y}&z={z}&udt=20181205&scale=2&styles=${whiteFreshStyleStr}`,
        subdomains: [0, 1, 2],
        attribution: '&copy; <a href="http://map.baidu.com/">Baidu</a>'
    },
    darkLabel: {
        urlTemplate: `${BASE_URL_DATLAS}/webapi/bdimg/api0/customimage/tile?&x={x}&y={y}&z={z}&udt=20181205&scale=2&styles=${darkLabelStyleStr}`,
        subdomains: [0, 1, 2],
        attribution: '&copy; <a href="http://map.baidu.com/">Baidu</a>'
    },
    mapBoxWhite: token => ({
        urlTemplate: `${BASE_URL_DATLAS}/webapi/mapbox/styles/v1/carolinec/ckfm8gyvs5u6i19qilos0h2gj/tiles/256/{z}/{x}/{y}@2x?authorization=${token}`,
        subdomains: [1, 2, 3, 4]
    }),
    gaoDeWhite: {
        urlTemplate: `https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}`,
        subdomains: [1, 2, 3, 4]
    },
    gaoDeWxt: {
        urlTemplate: `https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}`,
        subdomains: [1, 2, 3, 4]
    },
    gaoDeRoad: {
        urlTemplate: `https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}`,
        subdomains: [1, 2, 3, 4]
    },
    tianDiWhite: {
        repeatWorld: false,
        urlTemplate: `${BASE_URL_DATLAS}/webapi/service5/{s}/DataServer?T=vec_w&X={x}&Y={y}&L={z}&authorization=${getToken()}`,
        subdomains: [1, 2, 3, 4, 5, 6, 7]
    },
    tianDiWhiteLabel: {
        repeatWorld: false,
        urlTemplate: `${BASE_URL_DATLAS}/webapi/service5/1/DataServer?T=cva_w&X={x}&Y={y}&L={z}&authorization=${getToken()}`,
        subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
    }
};

export default bMapStyles;
