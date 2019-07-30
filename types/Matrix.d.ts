import { vec2 } from './Base';
export declare type Matrix = Array<number> | Float32Array;
export declare function computeMatrix(_in: Matrix, out: Matrix, pos: vec2, scale: vec2, trans: vec2, angle: number): Matrix;
export declare function projectionMatrix(out: Matrix, width: number, height: number): Matrix;
export declare function createProjection(width: number, height: number): Matrix;
