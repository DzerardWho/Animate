import { Container } from './Container';
import { vec2, Base } from './Base';
export declare class Renderable extends Container {
    attribs: Object;
    uniforms: Object;
    shapeBuffer: WebGLBuffer;
    indicesBuffer: WebGLBuffer;
    program: WebGLProgram;
    constructor(base: Base, x?: number, y?: number, w?: number, h?: number, pivot?: vec2);
}
