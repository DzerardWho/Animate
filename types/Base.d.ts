import { Color, _Color } from './Color';
import { Timeline } from './Timeline';
import { Matrix } from './Matrix';
export interface vec2 {
    x: number;
    y: number;
}
export declare class Base {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    mainScene: Timeline;
    backgroundColor: Color;
    defaultShapeProgram: WebGLProgram;
    defaultSpriteProgram: WebGLProgram;
    defaultIndicesBuffer: WebGLBuffer;
    indices: Uint16Array;
    projectionMatrix: Matrix;
    lastUsedProgram: WebGLProgram;
    constructor(width: number, height: number, canvas_id: string, bgC?: _Color | Color, webgl2?: boolean, fps?: number);
    play(): void;
    setCanvasSize(width: any, height: any): void;
    compileShader(src: string, type: string): WebGLShader;
    compileProgram(vs: WebGLShader, fs: WebGLShader): WebGLProgram;
    newVertexShader(src: string): WebGLShader;
    newFragmentShader(src: string): WebGLShader;
    newProgram(vs?: string, fs?: string): WebGLProgram;
    clear(): void;
}
