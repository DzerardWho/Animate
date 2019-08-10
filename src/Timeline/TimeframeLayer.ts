import { Timeframe } from './Timeframe'
import { Element } from './Element'
import { _Data, timeElement } from '../types'

export class TimeframeLayer {
    frames: Array<Timeframe>;
    duration: number;

    constructor() {
        this.frames = [];
        this.duration = 0;
    }

    addElement(obj: timeElement, from: _Data, to: _Data = null, start: number, duration: number, continueFrom: number = 0) {
        // TODO 
        // Coś tu nie działa
        if (start + duration > this.duration) {
            this.duration = start + duration;
        }

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
