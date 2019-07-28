import { vec2 } from './Base';
import { Container } from './Container';
import { Renderable } from './Renderable';
import { Rectangle } from './Rectangle';
import { Sprite } from './Sprite';
export interface instance {
    visible: boolean;
    x: number;
    y: number;
    angle: number;
    scale: vec2;
    pivot: vec2;
    source: Container | Renderable | Rectangle | Sprite;
    children: Array<instance>;
    worldMatrix: Float32Array;
    buffer: WebGLFramebuffer | null;
}
export declare class Instance implements instance {
    visible: boolean;
    x: number;
    y: number;
    angle: number;
    scale: vec2;
    pivot: vec2;
    source: Container | Renderable | Rectangle | Sprite;
    children: Array<Instance>;
    localMatrix: Float32Array;
    worldMatrix: Float32Array;
    buffer: WebGLFramebuffer | null;
    constructor(source: Container | Rectangle | Sprite);
    updateWorldMatrix(parentWorldMatrix?: Float32Array): void;
    moveTo(x: number, y: number): void;
    scaleAndRotate(): void;
}
