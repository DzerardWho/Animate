import { Linear } from './EasingFunctions'
import { computeMatrix, Matrix } from '../Matrix'
import { Rectangle } from '../Renderable/Rectangle';
import { Sprite } from '../Renderable/Sprite';
import { Timeline } from './Timeline';
import { Data, _Data } from './Data';

export type timeElement = Timeline | Sprite | Rectangle;

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