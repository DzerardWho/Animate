import { Base } from "../Base";

export interface DataElements {
    x: number;
    y: number;
    width: number;
    height: number;
    pad_x: number;
    pad_y: number;
    transparent: boolean;
}

export interface Data {
    [propName: string]: DataElements;
}

export interface _SpritesheetData {
    [propName: string]: Data;
    [propName: number]: Data;
}

export interface _Sprite {
    texCoords: WebGLBuffer;
    source: Spritesheet;
    width: number;
    height: number;
    pad_x: number;
    pad_y: number;
    transparent: boolean;
}

export interface _Spritesheet {
    [propName: string]: _Sprite;
    [propName: number]: _Sprite;
}

export class Spritesheet {
    sprites: _Spritesheet;
    texture: WebGLTexture;
    gl: WebGLRenderingContext;

    constructor(base: Base, data: Data, img: ImageData) {
        this.gl = base.gl;
        this.sprites = {};

        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_WRAP_S,
            this.gl.CLAMP_TO_EDGE
        );
        this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_WRAP_T,
            this.gl.CLAMP_TO_EDGE
        );
        this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_MIN_FILTER,
            this.gl.LINEAR
        );
        this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_MAG_FILTER,
            this.gl.LINEAR
        );
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            img
        );

        let tmp: WebGLBuffer, x: number, y: number, w: number, h: number;
        for (let i in data) {
            x = data[i].x / img.width;
            w = (data[i].x + data[i].width) / img.width;
            y = data[i].y / img.height;
            h = (data[i].y + data[i].height) / img.height;

            tmp = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, tmp);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
                x, y,
                x, h,
                w, y,
                w, h
            ]), this.gl.STATIC_DRAW
            );

            this.sprites[i] = ({
                texCoords: tmp,
                source: this,
                width: data[i].width,
                height: data[i].height,
                pad_x: data[i].pad_x || 0,
                pad_y: data[i].pad_y || 0,
                transparent: data[i].transparent
            });
        }
        tmp = null;
    }

    get(index: string | number): _Sprite | undefined {
        return this.sprites[index];
    }
}