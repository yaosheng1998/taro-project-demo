import coordinates from 'coordtransform';

export function Bd09ToGcj02(lng: number, lat: number): { lng: number; lat: number } {
    const [p0, p1] = coordinates.bd09togcj02(lng, lat);
    return { lng: p0, lat: p1 };
}

export function Gcj02ToBd09(lng: number, lat: number): { lng: number; lat: number } {
    const [p0, p1] = coordinates.gcj02tobd09(lng, lat);
    return { lng: p0, lat: p1 };
}

export function Wgs84ToGcj02(lng: number, lat: number): { lng: number; lat: number } {
    const [p0, p1] = coordinates.wgs84togcj02(lng, lat);
    return { lng: p0, lat: p1 };
}

export function Gcj02ToWgs84(lng: number, lat: number): { lng: number; lat: number } {
    const [p0, p1] = coordinates.gcj02towgs84(lng, lat);
    return { lng: p0, lat: p1 };
}

export function Bd09ToWgs84(lng: number, lat: number): { lng: number; lat: number } {
    let p0, p1;
    [p0, p1] = coordinates.bd09togcj02(lng, lat);
    [p0, p1] = coordinates.gcj02towgs84(p0, p1);
    return { lng: p0, lat: p1 };
}

export function Wgs84ToBd09(lng: number, lat: number): { lng: number; lat: number } {
    let p0, p1;
    [p0, p1] = coordinates.wgs84togcj02(lng, lat);
    [p0, p1] = coordinates.gcj02tobd09(p0, p1);
    return { lng: p0, lat: p1 };
}

export function TransPoint(
    lng: number,
    lat: number,
    origin: 'wgs84' | 'gcj02' | 'bd09',
    target: 'wgs84' | 'gcj02' | 'bd09'
): [number, number] {
    if (origin === target) return [lng, lat];
    if (origin === 'wgs84' && target === 'gcj02') {
        const [p0, p1] = coordinates.wgs84togcj02(lng, lat);
        return [p0, p1];
    }
    if (origin === 'wgs84' && target === 'bd09') {
        const [t0, t1] = coordinates.wgs84togcj02(lng, lat);
        const [p0, p1] = coordinates.gcj02tobd09(t0, t1);
        return [p0, p1];
    }
    if (origin === 'gcj02' && target === 'wgs84') {
        const [p0, p1] = coordinates.gcj02towgs84(lng, lat);
        return [p0, p1];
    }
    if (origin === 'gcj02' && target === 'bd09') {
        const [p0, p1] = coordinates.gcj02tobd09(lng, lat);
        return [p0, p1];
    }
    if (origin === 'bd09' && target === 'wgs84') {
        const [t0, t1] = coordinates.bd09togcj02(lng, lat);
        const [p0, p1] = coordinates.gcj02towgs84(t0, t1);
        return [p0, p1];
    }
    if (origin === 'bd09' && target === 'gcj02') {
        const [p0, p1] = coordinates.bd09togcj02(lng, lat);
        return [p0, p1];
    }
    return [lng, lat];
}
