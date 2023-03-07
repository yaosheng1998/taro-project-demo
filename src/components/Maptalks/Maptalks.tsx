import { FC, useEffect, useRef, PropsWithChildren } from 'react';
import { observer } from 'mobx-react';
import MaptalksStore from '@store/Maptalks/MaptalksStore';
import CLN from 'classname';
import './Maptalks.scss';

interface IProps extends PropsWithChildren<any> {
    className?: string;
    center: number[];
    zoom?: number;
    getMap: (map: MaptalksStore) => void;
}

const Maptalks: FC<IProps> = props => {
    const { className, center, zoom, getMap } = props;
    const dataRef = useRef(new MaptalksStore());
    const mapRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!mapRef.current) return;
        dataRef.current.initMap(mapRef.current!, center, zoom);
        getMap(dataRef.current);
        return () => dataRef.current.destory();
    }, []);
    return (
        <div className={CLN('map-talks__container', className)}>
            <div ref={mapRef} id="map-talks__map"></div>
        </div>
    );
};

export default observer(Maptalks);
