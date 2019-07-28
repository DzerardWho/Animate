export interface _Color {
    [0]: number;
    [1]: number;
    [2]: number;
    [3]?: number;
}
export declare class Color {
    private _r;
    private _g;
    private _b;
    private _a;
    private _buffer;
    constructor(r?: number | _Color, g?: number, b?: number, a?: number);
    r: number;
    g: number;
    b: number;
    a: number;
    private abs_val;
    color: _Color;
    getColor(): number[];
    readonly buffer: Float32Array;
}
