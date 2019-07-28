import { Renderable } from './Renderable';
import { Color, _Color } from './Color';
import { Base } from './Base';
export declare class Rectangle extends Renderable {
    color: Color;
    constructor(base: Base, x: number, y: number, w: number, h: number, c?: _Color);
}
