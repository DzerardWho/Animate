import { Base } from "../Base";

export interface DataElements {
    x: number;
    y: number;
    width: number;
    height: number;
    pad_x: number;
    pad_y: number;
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
}

export interface _Spritesheet {
    [propName: string]: _Sprite;
    [propName: number]: _Sprite;
}

export class Spritesheet {
    base: Base;
    sprites: _Spritesheet;
    private _texture: WebGLTexture;
    gl: WebGLRenderingContext;
    src: HTMLImageElement | ImageData;

    constructor(base: Base, data: Data, img: ImageData) {
        this.base = base;
        this.gl = base.gl;
        this.sprites = {};

        this._texture = null;
        this.src = img;

        let tmp: WebGLBuffer, x: number, y: number, w: number, h: number;
        for (let i in data) {
            x = data[i].x / img.width;
            w = (data[i].x + data[i].width) / img.width;
            y = data[i].y / img.height;
            h = (data[i].y + data[i].height) / img.height;

            if (x === 0 && y === 0 && w === 1 && h === 1) {
                tmp = base.unitBuffer;
            } else {
                tmp = this.gl.createBuffer();
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, tmp);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
                    x, y,
                    x, h,
                    w, y,
                    w, h
                ]), this.gl.STATIC_DRAW
                );
            }
            
            this.sprites[i] = ({
                texCoords: tmp,
                source: this,
                width: data[i].width,
                height: data[i].height,
                pad_x: data[i].pad_x || 0,
                pad_y: data[i].pad_y || 0
            });
        }
    }

    get(index: string | number): _Sprite | undefined {
        return this.sprites[index];
    }

    get texture(): WebGLTexture {
        if (this._texture === null) {
            this._texture = this.base.loadTexture(this.src, this);
        } else {
            this.base.updateTextureBuffer(this);
        }
        return this._texture;
    }

    getTexture(): WebGLTexture {
        return this.texture;
    }

    set texture(buffer: WebGLTexture) {
        this._texture = buffer;
    }
}