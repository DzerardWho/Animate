import { Timeframe } from './Timeframe'
import { Element, timeElement } from './Element'
import { _Data } from './Data'

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
            if (start >= val.start && val.start < start + duration) {
                return true;
            }
            if (val.start >= start && start < val.start + val.duration) {
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
