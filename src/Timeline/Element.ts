import { Linear } from './EasingFunctions'
import { computeMatrix, identity } from '../Matrix'
import { Data } from './Data';
import { timeElement, _Data, Matrix } from '../types';

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

        this.transMatrix = identity();

        this.continueFrom = continueFromFrame || 0;
    }

    update(frame: number) {
        this.object.update(frame);
    }

    draw(parentMatrix: Matrix, alpha: number, frame: number, duration: number) {
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
        alpha *= data.alpha;
        if (!alpha){
            return;
        }
        computeMatrix(parentMatrix, this.transMatrix, data.pos, data.scale, this.object.width || 1, this.object.height || 1, data.transformationPoint, data.angle, this.object.padding);
        this.object.draw(this.transMatrix, alpha, frame);
    }
}