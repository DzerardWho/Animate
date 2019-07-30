import { vec2 } from './Base';
import { Matrix } from './Matrix';
import { Rectangle } from './Rectangle';
import { Sprite } from './Sprite';
declare type timeElement = Timeline | Sprite | Rectangle;
interface _Data {
    pos?: vec2;
    angle?: number;
    scale?: vec2;
    transformationPoint?: vec2;
    alpha?: number;
}
declare class Data {
    pos: vec2;
    angle: number;
    scale: vec2;
    transformationPoint: vec2;
    alpha: number;
    dirty: boolean;
    constructor(data: _Data | null);
    getData(to: Data, progress: number): Promise<{
        pos: {
            x: number;
            y: number;
        };
        angle: number;
        scale: {
            x: number;
            y: number;
        };
        transformationPoint: {
            x: number;
            y: number;
        };
        alpha: number;
    }>;
}
declare class Element {
    object: timeElement;
    motion: boolean;
    continueFrom: number;
    from: Data;
    to: Data | null;
    val: Data | null;
    transMatrix: Float32Array;
    easing: ((arg0: number) => number);
    constructor(obj: timeElement, from: _Data, to?: _Data | null, continueFromFrame?: number);
    draw(parentMatrix: Matrix, frame: number, duration: number): Promise<void>;
}
declare class Timeframe {
    start: number;
    duration: number;
    elements: Array<Element>;
    constructor(start: number, duration: number);
    in(frame: number): boolean;
    split(splitPoint: number): void;
    addElement(element: Element): void;
    addElements(elements: Array<Element>): void;
}
declare class TimeframeLayer {
    frames: Array<Timeframe>;
    duration: number;
    constructor();
    addElement(obj: timeElement, from: _Data, to: _Data, start: number, duration: number, continueFrom?: number): Promise<number>;
    collision(start: number, duration: number): Promise<Timeframe[]>;
    findByFrame(frame: number): Promise<Timeframe>;
    find(start: number, duration: number): Promise<Timeframe>;
    findIndex(start: number, duration: number): number;
}
export declare class Timeline {
    loop: boolean;
    layers: Array<TimeframeLayer>;
    duration: number;
    constructor();
    addLayer(): void;
    addLayers(count: number): void;
    addToLayer(obj: timeElement, from: _Data, to: _Data, start: number, duration: number, layer: number, continueFrom?: number): Promise<this>;
    draw(matrix: Matrix, frame: number): Promise<void>;
}
export {};
