import { vec2 } from './Base';
import { instance } from './Instance';
import { Rectangle } from './Rectangle';
import { Sprite } from './Sprite';
import { Base } from './Base';
export declare class Container {
    children: Array<Container | Rectangle>;
    localMatrix: Float32Array;
    worldMatrix: Float32Array;
    gl: WebGLRenderingContext;
    base: Base;
    parent: Container | Rectangle | Sprite;
    instances: Array<instance>;
    x: number;
    y: number;
    og_width: number;
    og_height: number;
    width: number;
    height: number;
    private _angle;
    scale: vec2;
    pivot: vec2;
    constructor(base: Base, x: number, y: number, w: number, h: number, pivot?: vec2);
    setParent(parent: any): void;
    updateWorldMatrix(parentWorldMatrix?: Float32Array): void;
    moveTo(x: number, y: number): void;
    scaleAndRotate(): void;
    angle: number;
}
