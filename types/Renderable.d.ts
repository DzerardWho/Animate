import { Base } from './Base';
export declare class Renderable {
    attribs: Object;
    uniforms: Object;
    shapeBuffer: WebGLBuffer;
    program: WebGLProgram;
    gl: WebGLRenderingContext;
    base: Base;
    constructor(base: Base, w: number, h: number);
}
