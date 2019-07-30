import { Renderable } from './Renderable';
import { Base } from './Base';
import { Matrix } from './Matrix';
export declare class Sprite extends Renderable {
    attribs: Object;
    uniforms: Object;
    texture: WebGLTexture;
    textureCoords: WebGLBuffer;
    loop: boolean;
    constructor(base: Base, img: ImageData);
    draw(matrix: Matrix): Promise<void>;
}
