import { Renderable } from './Renderable';
import { Color, _Color } from './Color';
import { Base } from './Base';
import { Matrix } from './Matrix';
export declare class Rectangle extends Renderable {
    color: Color;
    loop: boolean;
    constructor(base: Base, w: number, h: number, c?: _Color);
    draw(matrix: Matrix, frame: number): Promise<void>;
}
