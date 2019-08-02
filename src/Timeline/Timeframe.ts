import { Element } from './Element'

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
