import _ from 'lodash';
import wkx from 'wkx';

//地图坐标系的转换
const x_PI = (3.1415 * 3000.0) / 180.0;
const PI = 3.1415;
const a = 6378245.0;
const ee = 0.0067;

export const isEmpty = pass => {
    const str = pass instanceof Array || pass instanceof Object ? JSON.stringify(pass) : String(pass);
    const arr = ['null', 'undefined', 'defined', '[]', '{}', '', '0', 'NaN'];
    return arr.some(item => item === str);
};
// 格式化请求数据
export const parseQueryResult = (result: { id: number; update_time: number; create_time: number; extra: any }[]) => {
    return result.map(item => ({ ...item.extra, id: item.id }));
};
// 获取对象值，为空返回'-'
export const val = (data: Record<string, any>, key: string) => data[key] || '-';
// 保留小数点后几位
export const decimal = (number: number, length = 2) => {
    if (!number) number = 0;
    return parseFloat(number.toFixed(length));
};
// 剔除对象中某个字段,返回新的对象
export const deleteObjectItem = (target: Record<string, any>, item: string) => {
    const targetClone = _.cloneDeep(target);
    delete targetClone[item];
    return targetClone;
};
// 格式化接口数据->{label: "", value:""}[]
export const parseBarLineData = (result: any[], label: string, value: string) => {
    return result
        .filter(item => item.extra[value])
        .map(item => ({ label: item.extra[label], value: item.extra[value] }));
};
// 格式化选择框数据
export const parseOptionsList = (value: string[]) => {
    return value.map(item => ({ label: item, value: item }));
};
// 格式化选择框接口数据
export const parseOptionsData = (result: any[], field: string) => {
    return result.filter(item => item[field]).map(item => ({ label: item[field], value: item[field] }));
};
export const isWeChatMiniApp = () => {
    const ua = window.navigator.userAgent.toLowerCase();
    return new Promise(resolve => {
        if (ua.indexOf('micromessenger') == -1) {
            resolve(false);
        } else {
            wx.miniProgram.getEnv(res => {
                if (res.miniprogram) resolve(true);
                else resolve(false);
            });
        }
    });
};

// EWKB 转 GeoJSON
export const ewkbToGeojson = (ewkb: string) => {
    if (!ewkb) return {};
    const bf = Buffer.from(ewkb, 'hex'); //先将EWKB字符串解析为buffer
    const g = wkx.Geometry.parse(bf).toGeoJSON(); //再将buffer解析为geometry后转为GeoJSON
    return g as any;
};
// 更改数据展示的get，有数据展示，无数据展示‘-’
export const getDataCheck = (object: Record<string, any> = {}) => {
    return new Proxy(object, {
        get: (target, keyProp: string) => (target[keyProp] !== undefined ? target[keyProp] : '--')
    });
};
// 获取路由参数
export const getHistorySearch = (search: string) => {
    const baseSearch = search.split('?');
    if (baseSearch.length === 1) return {};
    const searchArr = baseSearch[1].split('&');
    const result = {};
    searchArr.forEach(item => {
        const split = item.split('=');
        result[decodeURIComponent(split[0] || '')] = decodeURIComponent(split[1] || '');
    });
    return result;
};
export const transPolygonWgs2Bd = geometry => {
    const { coordinates, type } = geometry;
    const transCds: any[] = [];
    if (['Point', 'Circle'].includes(type)) {
        const temp = wgs84tobd09(coordinates[0], coordinates[1]);
        transCds.push(temp.lng);
        transCds.push(temp.lat);
    } else if (type === 'Heat') {
        coordinates.forEach(item => {
            const temp = wgs84tobd09(item[0], item[1]);
            transCds.push([temp.lng, temp.lat, item[2]]);
        });
    } else if (type === 'MultiPolygon') {
        coordinates.forEach(coo => {
            const tmp1: any[] = [];
            coo.forEach(co => {
                const tmp2: any[] = [];
                co.forEach(t => {
                    const tmp3 = wgs84tobd09(t[0], t[1]);
                    tmp2.push([tmp3.lng, tmp3.lat]);
                });
                tmp1.push(tmp2);
            });
            transCds.push(tmp1);
        });
    } else if (type === 'Polygon') {
        coordinates.forEach(coo => {
            const tmp1: any[] = [];
            coo.forEach(t => {
                const tmp2 = wgs84tobd09(t[0], t[1]);
                tmp1.push([tmp2.lng, tmp2.lat]);
            });
            transCds.push(tmp1);
        });
    }
    return { ...geometry, coordinates: transCds };
};
export function wgs84tobd09(lng, lat): any {
    const [p0, p1] = wgs84togcj02(lng, lat);
    const [b0, b1] = gcj02tobd09(p0, p1);
    return { lng: b0, lat: b1 };
}
function wgs84togcj02(g, t) {
    const lat = +t;
    const lng = +g;
    let dlat = transformlat(lng - 105.0, lat - 35.0);
    let dlng = transformlng(lng - 105.0, lat - 35.0);
    const radlat = (lat / 180.0) * PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
    const mglat = lat + dlat;
    const mglng = lng + dlng;
    return [mglng, mglat];
}
function gcj02tobd09(g, t) {
    const lat = +t;
    const lng = +g;
    const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    const bd_lng = z * Math.cos(theta) + 0.0065;
    const bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat];
}
function transformlat(g, t) {
    const lat = +t;
    const lng = +g;
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0;
    ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0;
    return ret;
}
function transformlng(g, t) {
    const lat = +t;
    const lng = +g;
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0;
    ret += ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0;
    return ret;
}
function radians(x) {
    return (x * Math.PI) / 180.0;
}
// 两点距离
export function pointsDistance(lng1, lat1, lng2, lat2) {
    const radLng1 = radians(lng1);
    const radLat1 = radians(lat1);
    const radLng2 = radians(lng2);
    const radLat2 = radians(lat2);

    const a = radLat1 - radLat2;
    const b = radLng1 - radLng2;

    const res =
        2 *
        Math.asin(
            Math.sqrt(
                Math.sin(a / 2) * Math.sin(a / 2) +
                    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(b / 2) * Math.sin(b / 2)
            )
        ) *
        6378.137;
    return +res.toFixed(2);
}
export function withinDis(distance, lng1, lat1, lng2, lat2) {
    return distance >= pointsDistance(lng1, lat1, lng2, lat2) * 1000;
}
