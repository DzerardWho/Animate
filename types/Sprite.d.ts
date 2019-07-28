import { Renderable } from './Renderable';
import { Base } from './Base';
export declare class Sprite extends Renderable {
    attribs: Object;
    uniforms: Object;
    texture: WebGLTexture;
    textureCoords: WebGLBuffer;
    constructor(base: Base, img: ImageData, x: number, y: number);
}
