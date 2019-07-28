import { Container } from './Container';
import { instance } from './Instance';
import { Renderable } from './Renderable';
import { Rectangle } from './Rectangle';
import { Sprite } from './Sprite';
import { Color, _Color } from './Color';
export interface vec2 {
    x: number;
    y: number;
}
export declare class Base {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    scene: Container;
    backgroundColor: Color;
    defaultShapeProgram: WebGLProgram;
    defaultSpriteProgram: WebGLProgram;
    defaultIndicesBuffer: WebGLBuffer;
    indices: Uint16Array;
    projectionMatrix: Float32Array;
    objectsToDraw: Array<any | instance>;
    symbols: Array<Container | Renderable | Rectangle | Sprite>;
    constructor(width: number, height: number, canvas_id: string, bgC?: _Color | Color, webgl2?: boolean);
    draw(): void;
    newDraw(): void;
    setCanvasSize(width: any, height: any): void;
    compileShader(src: string, type: string): WebGLShader;
    static compileShader(gl: any, src: string, type: string): WebGLShader;
    compileProgram(vs: WebGLShader, fs: WebGLShader): WebGLProgram;
    static compileProgram(gl: any, vs: WebGLShader, fs: WebGLShader): WebGLProgram;
    newVertexShader(src: string): WebGLShader;
    static newVertexShader(gl: any, src: string): WebGLShader;
    newFragmentShader(src: string): WebGLShader;
    static newFragmentShader(gl: any, src: string): WebGLShader;
    newProgram(vs?: string, fs?: string): WebGLProgram;
    static newProgram(gl: any, vs?: string, fs?: string): WebGLProgram;
    clear(): void;
}
