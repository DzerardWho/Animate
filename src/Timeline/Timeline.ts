import { Matrix, timeElement, _Data, vec2, elementData } from '../types'
import { TimeframeLayer } from './TimeframeLayer';
import { Timeframe } from './Timeframe';

interface lastUsedData {
    obj?: any;
    from?: _Data;
    nextFrame: number;
    layer: number;
}

export class Timeline {
    loop: boolean;
    layers: Array<TimeframeLayer>;
    lastUsed: lastUsedData;
    duration: number;
    padding: vec2;
    width: number;
    height: number;

    constructor(loop: boolean = false, initLayers?: number) {
        this.loop = loop;
        this.layers = [];
        this.duration = 0;
        this.createLayer();
        this.createMultipleLayers(initLayers - 1);
        this.lastUsed = {
            nextFrame: 0,
            layer: 0
        };
    }

    createLayer() {
        this.layers.push(new TimeframeLayer);
        return this;
    }

    createMultipleLayers(count: number) {
        for (let i = 0; i < count; ++i) {
            this.createLayer();
        }
        return this;
    }

    addObjectToLayer(obj: timeElement, from: _Data, to: _Data, start: number, duration: number, layer: number, continueFrom: number = 0) {
        if (layer > this.layers.length - 1) {
            throw new Error("Layer out of range");
        }

        this.layers[layer].addElement(obj, from, to, start, duration, continueFrom);

        if (start + duration > this.duration){
            this.duration = start + duration;
        }

        return this;
    }

    set(data: elementData, obj?: timeElement) {
        if (!data.data) {
            throw new Error('There is no data to be set.');
        }

        if (typeof obj !== 'undefined') {
            this.lastUsed.obj = obj;
        } else if (!this.lastUsed.obj) {
            throw new Error('Object is required.');
        }

        data.duration = data.duration || 1;

        this.lastUsed.layer = typeof data.layer === 'number' ? data.layer : this.lastUsed.layer;
        // this.lastUsed.layer = data.layer || this.lastUsed.layer;
        // this.lastUsed.nextFrame = data.start || this.lastUsed.nextFrame;
        this.lastUsed.nextFrame = typeof data.start !== 'undefined' ? data.start : this.lastUsed.nextFrame;
        this.lastUsed.from = data.data;

        if (this.lastUsed.layer > this.layers.length - 1) {
            throw new Error("Layer out of range");
        }

        this.layers[this.lastUsed.layer].addElement(this.lastUsed.obj, data.data, null, this.lastUsed.nextFrame, data.duration, data.continueFrom);

        if (this.lastUsed.nextFrame + data.duration > this.duration){
            this.duration = this.lastUsed.nextFrame + data.duration;
        }

        this.lastUsed.nextFrame += data.duration;
        return this;
    }

    to(data: elementData, obj?: timeElement) {
        if (!data.data) {
            throw new Error('There is no data to be set.');
        }

        if (typeof obj !== 'undefined') {
            this.lastUsed.obj = obj;
        } else if (!this.lastUsed.obj) {
            throw new Error('Object is required.');
        }

        data.duration = data.duration || 1;

        this.lastUsed.nextFrame = typeof data.start !== 'undefined' ? data.start : this.lastUsed.nextFrame;
        this.lastUsed.layer = typeof data.layer === 'number' ? data.layer : this.lastUsed.layer;

        if (this.lastUsed.layer > this.layers.length - 1) {
            throw new Error("Layer out of range");
        }

        this.layers[this.lastUsed.layer].addElement(this.lastUsed.obj, this.lastUsed.from, data.data, this.lastUsed.nextFrame, data.duration, data.continueFrom);

        if (this.lastUsed.nextFrame + data.duration > this.duration){
            this.duration = this.lastUsed.nextFrame + data.duration;
        }

        this.lastUsed.nextFrame += data.duration;
        this.lastUsed.from = data.data;
        return this;
    }

    fromTo(data: elementData, obj?: timeElement) {
        if (!(data.data && data.to)) {
            throw new Error('There is no data to be set.');
        }

        if (typeof obj !== 'undefined') {
            this.lastUsed.obj = obj;
        } else if (!this.lastUsed.obj) {
            throw new Error('Object is required.');
        }

        data.duration = data.duration || 1;

        this.lastUsed.nextFrame = typeof data.start !== 'undefined' ? data.start : this.lastUsed.nextFrame;
        this.lastUsed.layer = typeof data.layer === 'number' ? data.layer : this.lastUsed.layer;

        if (this.lastUsed.layer > this.layers.length - 1) {
            throw new Error("Layer out of range");
        }

        this.layers[this.lastUsed.layer].addElement(this.lastUsed.obj, data.data, data.to, this.lastUsed.nextFrame, data.duration, data.continueFrom);

        if (this.lastUsed.nextFrame + data.duration > this.duration){
            this.duration = this.lastUsed.nextFrame + data.duration;
        }

        this.lastUsed.nextFrame += data.duration;
        this.lastUsed.from = data.to;
        return this;
    }

    toSet(data: elementData, dur?:number, obj?: timeElement){
        this.to(data, obj);
        data.duration = dur;
        this.set(data);
    }

    fromToSet(data: elementData, dur?:number, obj?: timeElement){
        this.fromTo(data, obj);
        data.data = data.to;
        data.duration = dur;
        this.set(data);
    }

    draw(matrix: Matrix, alpha: number = 1, frame: number) {
        if (alpha) {
            let timeFrame: Timeframe | null, _frame;
            this.layers.forEach((layer) => {
                if (this.loop) {
                    frame %= this.duration;
                }
                timeFrame = layer.findByFrame(frame);
                if (!timeFrame) {
                    return;
                }
                _frame = frame - timeFrame.start;
                timeFrame.elements.forEach((element) => {
                    element.draw(matrix, alpha, _frame, timeFrame.duration);
                });
            });
        }
    }
}