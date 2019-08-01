import { vec2 } from './Base'
import { Linear } from './EasingFunctions'
import { computeMatrix, Matrix } from './Matrix'
import { Rectangle } from './Rectangle';
import { Sprite } from './Sprite';

type timeElement = Timeline | Sprite | Rectangle;

interface _Data {
    pos?: vec2;
    angle?: number;
    scale?: vec2;
    transformationPoint?: vec2;
    alpha?: number;
}

export class Data {
    pos: vec2;
    angle: number;
    scale: vec2;
    transformationPoint: vec2;
    alpha: number;
    dirty: boolean;

    constructor(data: _Data | null) {
        if (!data) {
            return this;
        }
        this.pos = { x: 0, y: 0 };
        if (data.pos) {
            if (data.pos.x) {
                this.pos.x = data.pos.x;
            }
            if (data.pos.y) {
                this.pos.y = data.pos.y;
            }
        }

        this.angle = data.angle || 0;
        this.scale = { x: 1, y: 1 };
        this.transformationPoint = { x: 0, y: 0 };
        if (data.scale) {
            if (data.scale.x) {
                this.scale.x = data.scale.x;
            }
            if (data.scale.y) {
                this.scale.y = data.scale.y;
            }
        }
        if (data.transformationPoint) {
            if (data.transformationPoint.x) {
                this.transformationPoint.x = data.transformationPoint.x;
            }
            if (data.scale.y) {
                this.transformationPoint.y = data.transformationPoint.y;
            }
        }
        this.alpha = 1;
    }

    getData(to: Data, progress: number) {
        let alpha = this.alpha + (to.alpha - this.alpha) * progress;
        if (alpha < 0) {
            alpha = 0;
        } else if (alpha > 1) {
            alpha = 1
        }
        return {
            pos: {
                x: this.pos.x + (to.pos.x - this.pos.x) * progress,
                y: this.pos.y + (to.pos.y - this.pos.y) * progress
            },
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

export class Element {
    object: timeElement;
    motion: boolean;
    continueFrom: number;
    from: Data;
    to: Data | null;
    val: Data | null;
    transMatrix: Float32Array;
    easing: ((arg0: number) => number);

    constructor(obj: timeElement, from: _Data, to?: _Data | null, continueFromFrame: number = 0) {
        this.motion = to ? true : false;
        this.easing = this.motion ? Linear : null;
        this.to = this.motion ? new Data(to) : null;
        // this.val = this.motion ? new Data(null) : null;
        this.from = new Data(from);
        this.object = obj;

        this.transMatrix = new Float32Array(9);

        this.continueFrom = continueFromFrame || 0;
    }

    draw(parentMatrix: Matrix, frame: number, duration: number) {
        let progress;
        frame += this.continueFrom;
        if (frame > duration) {
            if (this.object.loop) {
                frame %= duration;
            } else {
                frame = duration;
            }
        }
        progress = frame / duration;
        let data = this.motion ? this.from.getData(this.to, this.easing(progress)) : this.from;
        computeMatrix(parentMatrix, this.transMatrix, data.pos, data.scale, data.transformationPoint, data.angle);
        this.object.draw(this.transMatrix, frame);
    }
}

export class Timeframe {
    start: number;
    duration: number;
    elements: Array<Element>;

    constructor(start: number, duration: number) {
        this.start = start;
        this.duration = duration;
        this.elements = [];
    }

    in(frame: number) {
        return (this.start >= frame && frame <= this.start + this.duration);
    }

    split(splitPoint: number) {
        let t = splitPoint - this.start;
        let s = new Timeframe(splitPoint, this.duration - t);
        this.duration = t;
        s.addElements(this.elements);
    }

    addElement(element: Element) {
        this.elements.push(element);
    }

    addElements(elements: Array<Element>) {
        for (let i of elements) {
            this.addElement(i);
        }
    }
}

export class TimeframeLayer {
    frames: Array<Timeframe>;
    duration: number;

    constructor() {
        this.frames = [];
    }

    addElement(obj: timeElement, from: _Data, to: _Data = null, start: number, duration: number, continueFrom: number = 0) {
        // TODO 
        // Coś tu nie działa
        let _dur = start + duration;
        if (_dur > this.duration && start <= this.duration) {
            _dur -= this.duration;
            this.duration += _dur;
        }

        // let elem = new Element(obj, from, to, continueFrom);
        //  this.solveCollisions( this.collision(start, duration), start, duration);
        // let timeframe =  this.find(start, start + duration);
        let timeFrame = this.find(start, duration);
        if (timeFrame) {
            timeFrame.addElement(new Element(obj, from, to, continueFrom))
        } else {
            let t = new Timeframe(start, duration);
            t.addElement(new Element(obj, from, to, continueFrom));
            let index = this.findIndex(start, duration);
            if (index === -1) {
                this.frames.push(t);
            } else {
                this.frames.splice(index + 1, 0, t);
            }
        }

        return _dur;
    }

    //  solveCollisions(collisions: Array<Timeframe>, start: number, duration: number){

    // }

    collision(start: number, duration: number) {
        return this.frames.filter((val) => {
            if (start === val.start && duration === val.duration) {
                return false;
            }
            if (start >= val.start && val.start <= start + duration) {
                return true;
            }
            if (val.start >= start && start <= val.start + val.duration) {
                return true;
            }
            return false;
        });
    }

    findByFrame(frame: number) {
        return this.frames.find((val) => {
            return (val.start <= frame && frame < val.start + val.duration);
        });
    }

    find(start: number, duration: number) {
        return this.frames.find((val) => {
            return (val.start === start && val.duration === duration)
        });
    }

    findIndex(start: number, duration: number) {
        return this.frames.findIndex((val) => {
            return (val.start < start)
        });
    }
}

export class Timeline {
    loop: boolean;
    layers: Array<TimeframeLayer>;
    duration: number;

    constructor(loop: boolean = false) {
        this.loop = loop;
        this.layers = [];
        this.duration = 0;
    }

    addLayer() {
        this.layers.push(new TimeframeLayer);
    }

    addLayers(count: number) {
        for (let i = 0; i < count; ++i) {
            this.addLayer();
        }
    }

    addToLayer(obj: timeElement, from: _Data, to: _Data, start: number, duration: number, layer: number, continueFrom: number = 0) {
        if (layer > this.layers.length - 1) {
            throw "Layer out of range";
        }

        this.duration += this.layers[layer].addElement(obj, from, to, start, duration, continueFrom);
        return this;
    }

    draw(matrix: Matrix, frame: number) {
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
            // if (this.loop){
            //     _frame %= this.duration;
            // }
            // console.log(this, _frame);
            timeFrame.elements.forEach((element) => {
                element.draw(matrix, _frame, timeFrame.duration);
            });
        });
    }
}