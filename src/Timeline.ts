import { vec2 } from './Base'
import { Symbol } from './Symbol'
import { Linear } from './EasingFunctions'

interface _Data{
    x?: number;
    y?: number;
    angle?: number;
    scale?: vec2;
    transformationPoint?: vec2;
    alpha?: number;
    // data?: any; // ????????
}

class Data {
    x: number;
    y: number;
    angle: number;
    scale: vec2;
    transformationPoint: vec2;
    alpha: number;
    dirty: boolean;

    constructor(data: _Data | null) {
        if (!data){
            return this;
        }
        this.x = data.x;
        this.y = data.y;
        this.angle = data.angle;
        this.scale = {x: 1, y: 1};
        this.transformationPoint = {x: 0, y: 0};
        if (data.scale){
            if (data.scale.x){
                this.scale.x = data.scale.x;
            }
            if (data.scale.y){
                this.scale.y = data.scale.y;
            }
        }
        if (data.transformationPoint){
            if (data.transformationPoint.x){
                this.transformationPoint.x = data.transformationPoint.x;
            }
            if (data.scale.y){
                this.transformationPoint.y = data.transformationPoint.y;
            }
        }
        this.alpha = 1;
    }

    // get x(){
    //     return this._x;
    // }

    // set x(value: number){
    //     if (this._x == value){
    //         return;
    //     }
    //     this._x = value;
    //     this.dirty = true;
    // }
    
    // get y(){
    //     return this._y;
    // }

    // set y(value: number){
    //     if (this._y == value){
    //         return;
    //     }
    //     this._y = value;
    //     this.dirty = true;
    // }
    
    // get angle(){
    //     return this._angle;
    // }

    // set angle(value: number){
    //     if (this._angle == value){
    //         return;
    //     }
    //     this._angle = value;
    //     this.dirty = true;
    // }
    
    // get scale(){
    //     return this._scale;
    // }

    // set scale(value: vec2){
    //     if (this._scale == value){
    //         return;
    //     }
    //     this._scale = value;
    //     this.dirty = true;
    // }
    
    // get transformationPoint(){
    //     return this._transformationPoint;
    // }
    
    // set transformationPoint(value: vec2){
    //     if (this._transformationPoint == value){
    //         return;
    //     }
    //     this._transformationPoint = value;
    //     this.dirty = true;
    // }
    
    // get alpha(){
    //     return this._alpha;
    // }
    
    // set alpha(value: number){
    //     if (this._alpha == value){
    //         return;
    //     }
    //     this._alpha = value;
    //     this.dirty = true;
    // }

    getData(to: Data, progress: number): _Data{
        let alpha = this.alpha + (to.alpha - this.alpha) * progress;
        if (alpha < 0){
            alpha = 0;
        }else if(alpha > 1){
            alpha = 1
        }
        return {
            x: this.x + (to.x - this.x) * progress,
            y: this.y + (to.y - this.y) * progress,
            angle: this.angle + (to.angle - this.angle) * progress,
            scale: {
                x: this.scale.x + (to.scale.x - this.scale.x) * progress,
                y: this.scale.y + (to.scale.y - this.scale.y) * progress,
            },
            transformationPoint: {
                x: this.transformationPoint.x + (to.transformationPoint.x - this.transformationPoint.x) * progress,
                y: this.transformationPoint.y + (to.transformationPoint.y - this.transformationPoint.y) * progress,
            },
            alpha: alpha
        }
    }
}

class Element {
    object: any;
    motion: boolean;
    from: Data;
    to: Data | null;
    val: Data | null;
    easing;

    constructor(obj: any, from: _Data, to?: _Data, continueFromFrame?: number){
        this.motion = to ? true : false;
        this.easing = this.motion ? Linear : null;
        this.to = this.motion ? new Data(to) : null;
        this.val = this.motion ? new Data(null) : null;
        this.from = new Data(from);
        this.object = obj;

        if (continueFromFrame && this.object instanceof TimelineInstance){
            this.object.frame = continueFromFrame;
        }
    }

    getData(progress: number){
        return {
            object: this.object,
            data: this.motion ? this.val.getData(this.from, this.to, this.easing(progress)) : this.from
        };
    }

    async draw(){

    }
}

class Timeframe {
    start: number;
    duration: number;
    elements: Array<Element>;
    progress: number;
    _frame: number;

    constructor(start: number, duration: number) {
        this.start = start;
        this.duration = duration;
    }

    in(frame: number){
        return (this.start >= frame && frame <= this.start + this.duration);
    }

    get frame(){
        return this._frame;
    }

    set frame(value: number){
        if (value >= this.duration){
            this._frame = 0;
            return;
        }
        this._frame = value;
        this.progress = value / this.duration;
    }
    
    getData(progress: number){
        let data = [];
        this.elements.forEach(element => {
            data.push(element.getData(progress));
        });
        return data;
    }

    split(splitPoint: number){
        let t = splitPoint - this.start;
        let s = new Timeframe(splitPoint, this.duration - t);
        this.duration = t;
        s.addElements(this.elements);
    }

    addElement(element: Element){
        this.elements.push(element);
    }

    addElements(elements: Array<Element>){
        for (let i of elements){
            this.addElement(i);
        }
    }

    async draw(progress: number){

    }
}

class TimeframeLayer {
    elements: Array<Element>;

    

    async draw(parentData: Data, currentTimeframe: number, currentFrame: number, progress: number){

    }
}

export class Timeline {
    loop: boolean;
    layers: Array<TimeframeLayer>;
    duration: number;

    constructor(){
        this.loop = false;
        this.layers = [];
        this.duration = 0;
    }

    addLayer(){
        this.layers.push(new TimeframeLayer);
    }

    addLayers(count: number){
        for(let i = 0; i < count; ++i){
            this.addLayer();
        }
    }

    addToLayer(data: _Data, start: number, duration: number, layer: number){
        if (layer > this.layers.length - 1){
            throw "Layer out of range";
        }

        // TODO

        this.duration += duration;
        return this;
    }

}

export class TimelineInstance {
    parentTimeline: Timeline;
    _frame: number;
    progress: number;
    duration: number;
    playing: boolean;
    currentTimeframes: Array<number>;

    constructor(parentTimeline: Timeline){
        this.parentTimeline = parentTimeline;
        this.frame = 0;
        this.playing = false;
        this.duration = parentTimeline.duration;
        this.currentTimeframes = [];

        for (let i = 0; i < this.parentTimeline.layers.length; ++i){
            this.currentTimeframes.push(0);
        }
    }

    resetProgress(){
        this.frame = 0;
    }

    get frame(){
        return this._frame;
    }

    set frame(value: number){
        if (value >= this.duration){
            if (this.parentTimeline.loop){
                this._frame = 0;
            }
            return;
        }
        this._frame = value;
        this.progress = value / this.duration;
    }

    play(){
        this.playing = true;
    }

    pause(){
        this.playing = false;
    }

    gotoAndPlay(frame: number){
        this.frame = frame;
        this.playing = true;
    }

    gotoAndPause(frame: number){
        this.frame = frame;
        this.playing = false;
    }
    
    async draw(parentData: Data){
        for (let i = this.parentTimeline.layers.length; i >= 0 ; --i){
            await this.parentTimeline.layers[i].draw(parentData, this.currentTimeframes[i], this.frame, this.progress);
        }
        ++this.frame;
    }
}