import { makeAutoObservable, runInAction } from 'mobx';
import { BASE_URL_DATLAS } from '@/config';
import TokenStore from '@store/TokenStore';
// import MapStyles from '@utils/map/mapStyles';
import * as maptalks from 'maptalks';

class MaptalksStore {
    constructor() {
        makeAutoObservable(this);
    }
    map: Recordable | null = null; // 地图对象
    mapToken = ''; // 地图token
    coverManager = {}; // 地图覆盖物管理器
    layerClickEventManager = {}; // 图层点击事件管理器
    mapEventManager = {}; // 地图事件管理
    infoWindowTarget: Recordable | null = null; // 显示信息窗的mark对象
    // 视角移动到青山湖中心
    goToCenter() {
        if (!this.map) return;
        this.map.setCenter([119.81350105930095, 30.289731723519502]);
        this.map.setZoom(13.75);
    }
    // 获取点数据对象
    getPoint(id: number | string, geometry: Record<string, any>, options: Record<string, any> = {}) {
        const pointOptions = {
            id,
            visible: true,
            editable: true,
            // cursor: "pointer",
            shadowBlur: 0,
            shadowColor: 'black',
            draggable: false,
            dragShadow: false, // display a shadow during dragging
            drawOnAxis: null, // force dragging stick on a axis, can be: x, y
            symbol: [
                {
                    markerType: 'pin',
                    markerWidth: 65,
                    markerHeight: 50,
                    markerLineColor: '#fff',
                    markerLineWidth: 2,
                    markerFill: '#abcdef',
                    textWeight: 'normal',
                    textStyle: 'normal',
                    textSize: 20,
                    textFont: null,
                    textFill: '#34495e',
                    textOpacity: 1,
                    textHaloFill: '#fff',
                    textHaloRadius: 5,
                    textWrapWidth: null,
                    textWrapCharacter: '\n',
                    textLineSpacing: 0
                },
                {
                    textFaceName: 'sans-serif',
                    textName: '幼',
                    textFill: '#fff',
                    textSize: 14,
                    textDy: -22
                }
            ],
            ...options
        };
        return new maptalks.Marker(geometry.coordinates, pointOptions);
    }
    // 获取面数据对象
    getPolygon(id: number | string, geometry: Record<string, any>, options: Record<string, any> = {}) {
        const polygonOptions = {
            id,
            visible: true,
            editable: true,
            // cursor: "pointer",
            shadowBlur: 0,
            shadowColor: 'black',
            draggable: false,
            dragShadow: false, // display a shadow during dragging
            drawOnAxis: null, // force dragging stick on a axis, can be: x, y
            ...options,
            symbol: {
                lineColor: '#34495e',
                lineWidth: 1,
                polygonFill: geometry.fillColor || 'rgb(135,196,240)',
                polygonOpacity: 0.2,
                ...options.symbol
            }
        };
        let cover = null;
        if (geometry.type === 'Polygon') {
            cover = new maptalks.Polygon(geometry.coordinates, polygonOptions);
        } else if (geometry.type === 'MultiPolygon') {
            cover = new maptalks.MultiPolygon(geometry.coordinates, polygonOptions);
        }
        return cover;
    }
    // 添加地图覆盖物
    addCover(
        id: number | string,
        geometry: Record<string, any>,
        layer = 'baseLayer',
        options: Record<string, any> = {},
        zIndex?: number
    ) {
        if (!this.map) return;
        let vectorLayer = this.map.getLayer(layer, null, { zIndex: zIndex || 0 });
        if (!vectorLayer) vectorLayer = new maptalks.VectorLayer(layer).addTo(this.map);
        if (!this.coverManager[layer]) this.coverManager[layer] = [];
        let cover: Recordable | null = null;
        if (geometry.type === 'Point') {
            cover = this.getPoint(id, geometry, options);
        } else if (['MultiPolygon', 'Polygon'].includes(geometry.type)) {
            cover = this.getPolygon(id, geometry, options);
        }
        this.coverManager[layer].push(cover);
        cover?.addTo(vectorLayer);
        return cover;
    }
    // 添加瓦片图层
    addTileLayer(id: string, options: Record<string, any>) {
        if (!this.map) return;
        let tileLayer = this.map.getLayer(id);
        if (tileLayer) tileLayer.remove();
        tileLayer = new maptalks.TileLayer(id, options);
        tileLayer?.addTo(this.map);
    }
    // 根据图层与id获取覆盖物对象
    getTargetByLayerAndId(layer: string, id: string) {
        if (!this.map) return null;
        let vectorLayer = this.map.getLayer(layer);
        if (!vectorLayer) return null;
        return vectorLayer.getGeometryById(id);
    }
    // 批量添加覆盖物
    batchAddCover(
        layer = 'baseLayer',
        list: { id: number | string; geometry: Record<string, any>; options?: Record<string, any> }[]
    ) {
        if (!this.map) return;
        let vectorLayer = this.map.getLayer(layer);
        if (!vectorLayer) vectorLayer = new maptalks.VectorLayer(layer).addTo(this.map);
        if (!this.coverManager[layer]) this.coverManager[layer] = [];
        const coverList = list.map(item => {
            const geometry = item.geometry;
            if (geometry.type === 'Point') {
                const point = this.getPoint(item.id, geometry, item.options || {});
                this.coverManager[layer].push(point);
                return point;
            } else if (['MultiPolygon', 'Polygon'].includes(geometry.type)) {
                const polygon = this.getPolygon(item.id, geometry, item.options || {});
                this.coverManager[layer].push(polygon);
                return polygon;
            }
        });
        vectorLayer.addGeometry(coverList).addTo(this.map);
    }
    // 飞行到指定位置
    animateTo(position: { center: number[]; zoom?: number }, options?: { duration?: number }) {
        if (!this.map) return;
        this.map.animateTo(position, options || { duration: 1000 });
    }
    // 飞行到用户当前位置
    animateToCurrentPosition() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this;
        //定位数据获取成功响应
        function onSuccess(position) {
            let longitude = position.coords.longitude;
            let latitude = position.coords.latitude;
            _this.animateTo({ center: [longitude, latitude], zoom: 18 });
            _this.removeLayerMark('center_point');
            _this.addCover('center_point', { type: 'Point', coordinates: [longitude, latitude] }, 'currentLayer');
        }
        function error() {
            alert('position error');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, error);
    }
    // 显示自定义信息框
    showInfoWindow(coordinate: { x: number; y: number }, target: Record<string, any>, ref: any) {
        if (!this.map) return;
        this.infoWindowTarget = target;
        this.map.setCenter(coordinate);
        target.setInfoWindow({ content: ref, width: 250 });
        target.openInfoWindow(coordinate);
        setTimeout(() => this?.map?.setZoom(16), 100);
    }
    // 移除自定义信息窗
    removeInfoWindow() {
        if (!this.infoWindowTarget) return;
        this.infoWindowTarget.removeInfoWindow();
    }
    // 图层绑定点击事件
    bindLayerClickEvent(layer: string, callback: (...args: any) => void) {
        this.layerClickEventManager[layer] = callback;
    }
    // 删除图层绑定点击事件
    removeLayerClickEvent(layer: string) {
        this.layerClickEventManager[layer] = '';
    }
    // 删除图层数据
    removeLayerMark(layer = 'baseLayer') {
        if (!this.map) return;
        const vectorLayer = this.map.getLayer(layer);
        if (!vectorLayer) return;
        this.coverManager[layer] = [];
        vectorLayer.remove();
    }
    // 隐藏/打开图层
    showLayer(layer: string, visible: boolean) {
        if (!this.map) return;
        const vectorLayer = this.map.getLayer(layer);
        if (!vectorLayer) return;
        if (visible) vectorLayer.show();
        else vectorLayer.hide();
    }
    // 设置地图事件
    setMapEvent(type: string, func: Function) {
        this.mapEventManager[type] = func;
    }
    // 删除地图事件
    removeMapEvent(type) {
        this.mapEventManager[type] = null;
    }
    // 初始化地图
    initMap(dom: HTMLDivElement, center: number[], zoom?: number) {
        this.map = new maptalks.Map(dom, {
            center,
            zoom: zoom || 10,
            seamlessZoom: true, //是否使用无缝缩放模式
            zoomInCenter: true, //缩放时是否固定在中央
            dragRotate: true, //默认为true。如果为true，则可以通过右键单击或按住Ctrl +左键拖动来拖动地图以旋转
            dragPitch: true, //默认为true。如果为true，则可以通过右键单击或按Ctrl +左键拖动来拖动地图以使其倾斜
            dragRotatePitch: true, //如果为true，则拖动地图以同时俯仰和旋转
            control: true, //是否允许地图添加控件
            scaleControl: false, //如果设置为true，则在地图上显示比例尺控件，或者将一个对象作为控件构造选项。
            overviewControl: false, //如果设置为true，则在地图上显示概述控件，或者将一个对象作为控件的构造选项。
            draggable: true, //如果设置为false，则禁用地图拖动
            dragPan: true, //如果为true，则可以拖动地图进行平移
            attribution: false,
            // spatialReference: { projection: 'tiandi' },
            baseLayer: new maptalks.GroupTileLayer('base', [
                new maptalks.TileLayer('tianDiWhite', {
                    repeatWorld: false,
                    urlTemplate: `${BASE_URL_DATLAS}/webapi/service5/{s}/DataServer?T=vec_w&X={x}&Y={y}&L={z}`,
                    subdomains: [1, 2, 3, 4, 5, 6, 7]
                }),
                new maptalks.TileLayer('tianDiWhiteLabel', {
                    repeatWorld: false,
                    urlTemplate: `${BASE_URL_DATLAS}/webapi/service5/1/DataServer?T=cva_w&X={x}&Y={y}&L={z}`,
                    subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
                })
                // new maptalks.TileLayer('test', {
                //     repeatWorld: false,
                //     opacity: 0.1,
                //     urlTemplate: `/pri/map/4f43204eb89c807c5f52748bc5f5f2740b8de907/{x}/{y}/{z}.png?map_srs=wbmc&authorization=3e95ded4-db3e-4c1e-8880-b5006444b508&cache=true`,
                //     subDomains: ['a', 'b', 'c', 'd']
                // })
            ]),
            layers: [new maptalks.VectorLayer('bgLayer'), new maptalks.VectorLayer('baseLayer')]
        });
        this?.map?.on('click', e => {
            Object.keys(this.layerClickEventManager).forEach(key => {
                const vectorLayer = this?.map?.getLayer(key);
                if (!vectorLayer) return;
                this?.map?.identify({ coordinate: e.coordinate, layers: [vectorLayer] }, geos => {
                    if (!geos.length) return;
                    this.layerClickEventManager[key] && this.layerClickEventManager[key](e, geos[0]);
                });
            });
        });
        this?.map?.on('zooming', _e => {
            if (!this.mapEventManager['zooming']) return;
            this.mapEventManager['zooming'](this?.map?.getZoom());
        });
    }
    destory() {
        this.map?.remove();
        this.layerClickEventManager = {};
        this.coverManager = {};
        this.infoWindowTarget = null;
    }
}
export default MaptalksStore;
