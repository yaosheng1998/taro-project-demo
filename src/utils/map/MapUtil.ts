/* eslint-disable no-var */
/* eslint-disable prefer-const */
import * as CoordTrans from './CoordTrans';

function getArrayDepth(value: Array<any>): number {
    return Array.isArray(value) ? 1 + Math.max(...value.map(getArrayDepth)) : 0;
}

function extd(a, b) {
    for (const c in b) {
        Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
    }
    return a;
}

/**
 * 传入StyleJson，返回BaiduStyle
 * https://lbsyun.baidu.com/custom/index.htm
 * @param a StyleJson
 * @returns {string} BaiduStyle
 */
export function transBaiduStyleJson(a: { elementType: string; [x: string]: any }[]) {
    for (
        var b = {
                featureType: 't',
                elementType: 'e',
                visibility: 'v',
                color: 'c',
                lightness: 'l',
                saturation: 's',
                weight: 'w',
                zoom: 'z',
                hue: 'h'
            },
            c = {
                all: 'all',
                geometry: 'g',
                'geometry.fill': 'g.f',
                'geometry.stroke': 'g.s',
                labels: 'l',
                'labels.text.fill': 'l.t.f',
                'labels.text.stroke': 'l.t.s',
                'labels.text': 'l.t',
                'labels.icon': 'l.i'
            },
            d = [] as any,
            e = 0;
        e < a.length;
        e++
    ) {
        const f = a[e];
        const fs = f.stylers;
        delete f.stylers;
        extd(f, fs);
        let g = [] as any[],
            i;
        for (i in b) {
            if (f[i]) {
                if ('elementType' === i) {
                    g.push(b[i] + ':' + c[f[i]]);
                } else {
                    switch (f[i]) {
                        case 'poilabel':
                            f[i] = 'poi';
                            break;
                        case 'districtlabel':
                            f[i] = 'label';
                            break;
                        default:
                            break;
                    }
                    g.push(b[i] + ':' + f[i]);
                }
            }
        }
        2 < g.length && d.push(g.join('|'));
    }
    return d.join(',');
}

interface Geometry {
    type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon';
    coordinates: [number, number] | [number, number][] | [number, number][][] | [number, number][][][];
}

/**
 * 传入geometry，返回转过坐标的geometry
 * @param geometry geometry
 * @param origin 原始坐标系 84/高德/百度
 * @param target 目标坐标系 84/高德/百度
 * @returns {geometry} geometry
 */
export function transGeometryCoordinates(
    geometry: Geometry,
    origin: 'wgs84' | 'gcj02' | 'bd09',
    target: 'wgs84' | 'gcj02' | 'bd09'
) {
    const { coordinates, type } = geometry;
    let transCds: Geometry['coordinates'] = [];

    const depth = getArrayDepth(coordinates);

    // type = 'Point'
    if (depth === 1) {
        const [lng, lat] = CoordTrans.TransPoint(
            (coordinates as [number, number])[0],
            (coordinates as [number, number])[1],
            origin,
            target
        );
        transCds = [lng, lat];
        return { type, coordinates: transCds };
    }

    // type = 'LineString' | 'MultiPoint'
    if (depth === 2) {
        (coordinates as [number, number][]).forEach(c => {
            const [lng, lat] = CoordTrans.TransPoint(c[0], c[1], origin, target);
            (transCds as [number, number][]).push([lng, lat]);
        });
        return { type, coordinates: transCds };
    }

    // type = 'Polygon' | 'MultiLineString'
    if (depth === 3) {
        (coordinates as [number, number][][]).forEach(co => {
            const tmp1: [number, number][] = [];
            co.forEach(c => {
                const [lng, lat] = CoordTrans.TransPoint(c[0], c[1], origin, target);
                tmp1.push([lng, lat]);
            });

            (transCds as [number, number][][]).push(tmp1);
        });
        return { type, coordinates: transCds };
    }

    // type = 'MultiPolygon'
    if (depth === 4) {
        (coordinates as [number, number][][][]).forEach(coo => {
            const tmp1: [number, number][][] = [];
            coo.forEach(co => {
                const tmp2: [number, number][] = [];
                co.forEach(c => {
                    const [lng, lat] = CoordTrans.TransPoint(c[0], c[1], origin, target);
                    tmp2.push([lng, lat]);
                });
                tmp1.push(tmp2);
            });
            (transCds as [number, number][][][]).push(tmp1);
        });
        return { type, coordinates: transCds };
    }
}
