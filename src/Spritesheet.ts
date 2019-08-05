import { Base } from "./Base";

interface DataElements {
    x: number;
    y: number;
    width: number;
    height: number;
    pad_x: number;
    pad_y: number;
    transparent: boolean;
}

interface Data {
    [propName: string]: DataElements;
}

interface _Sprite {
    texCoords: WebGLBuffer;
    source: Spritesheet;
    width: number;
    height: number;
    pad_x: number;
    pad_y: number;
    transparent: boolean;
}

export class SpritesheetLoader {
    manifest: object;
    files: object;
    loadComplete: boolean;
    manifestLoader: createjs.JSONLoader;

    constructor(manifestPath: string, fileLocation: string = '/', callback?) {
        this.loadComplete = false;
        this.files = {};
        this.manifestLoader = new createjs.JSONLoader(createjs.LoadItem.create(manifestPath));

        this.manifestLoader.on('complete', () => {
            let fileLoader = new createjs.LoadQueue(true, fileLocation);
            this.manifest = this.manifestLoader.getResult();

            for (let i in this.manifest) {
                fileLoader.loadFile({
                    'id': i,
                    'src': i
                });
            }

            fileLoader.on('complete', () => {
                // for (let i of Object.keys(this.manifest)){
                //     this.files[i] = fileLoader.getResult(i);
                // }
                for (let i of fileLoader.getItems(false)) {
                    this.files[i.item.id] = i.result;
                }
                this.loadComplete = true;
                if (typeof callback === 'function'){
                    callback();
                }
            });

            fileLoader.load()
        });
        this.manifestLoader.load();
    }

    generateSpritesheets(base: Base) {
        if (!this.loadComplete) {
            return;
        }
        let t = {}

        for (let i in this.files) {
            t[i.replace('.png', '')] = new Spritesheet(base, this.manifest[i], this.files[i]);
        }

        return t;
    }
}


export class Spritesheet {
    sprites: Array<_Sprite>;
    texture: WebGLTexture;
    gl: WebGLRenderingContext;

    constructor(base: Base, data: Data, img: ImageData) {
        this.gl = base.gl;
        this.sprites = [];

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

            this.sprites[i] = {
                texCoords: tmp,
                source: this,
                width: data[i].width,
                height: data[i].height,
                pad_x: data[i].pad_x || 0,
                pad_y: data[i].pad_y || 0,
                transparent: data[i].transparent
            };
        }
        tmp = null;
    }

    get(index: string): _Sprite | undefined {
        return this.sprites[index];
    }
}