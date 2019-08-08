const degToRad = Math.PI / 180;
function computeMatrix(_in, out, pos, scale, width, height, trans, angle, padding) {
    let [a, b, , d, e, , g, h] = _in;
    let x = pos.x, y = pos.y, px = trans.x, py = trans.y, sx = scale.x, sy = scale.y;
    angle *= degToRad;
    let s = Math.sin(angle), c = Math.cos(angle);
    let pax = 0, pay = 0;
    if (padding) {
        pax = padding.x;
        pay = padding.y;
    }
    out[0] = sx * (c * a + s * d) * width;
    out[1] = sx * (c * b + s * e) * width;
    out[3] = sy * (c * d - s * a) * height;
    out[4] = sy * (c * e - s * b) * height;
    out[6] = a * (sy * s * (py - pay) + sx * c * (pax - px) + px + x) +
        d * (sy * c * (pay - py) + sx * s * (pax - px) + py + y) +
        g;
    out[7] = b * (sy * s * (py - pay) + sx * c * (pax - px) + px + x) +
        e * (sy * c * (pay - py) + sx * s * (pax - px) + py + y) +
        h;
    out[2] = out[5] = 0;
    out[8] = 1;
    return out;
}
function projectionMatrix(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
}
function createProjection(width, height) {
    return new Float32Array([2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1]);
}
function identity() {
    return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
}

class Timeframe {
    constructor(start, duration) {
        this.start = start;
        this.duration = duration;
        this.elements = [];
    }
    in(frame) {
        return (this.start >= frame && frame <= this.start + this.duration);
    }
    addElement(element) {
        this.elements.push(element);
    }
    addElements(elements) {
        for (let i of elements) {
            this.addElement(i);
        }
    }
}

function Linear(a) {
    return a;
}

class Data {
    constructor(data) {
        this.angle = 0;
        this.alpha = 1;
        this.pos = { x: 0, y: 0 };
        this.scale = { x: 1, y: 1 };
        this.transformationPoint = { x: 0, y: 0 };
        if (data) {
            if (data.pos) {
                if (data.pos.x) {
                    this.pos.x = data.pos.x;
                }
                if (data.pos.y) {
                    this.pos.y = data.pos.y;
                }
            }
            this.angle = typeof data.angle === 'undefined' ? 0 : data.angle;
            if (data.scale) {
                if (data.scale.x) {
                    this.scale.x = data.scale.x;
                }
                if (data.scale.y) {
                    this.scale.y = data.scale.y;
                }
            }
            if (data.transformationPoint) {
                if (data.transformationPoint.x) {
                    this.transformationPoint.x = data.transformationPoint.x;
                }
                if (data.scale.y) {
                    this.transformationPoint.y = data.transformationPoint.y;
                }
            }
            this.alpha = typeof data.alpha === 'undefined' ? 1 : data.alpha;
        }
    }
    getData(to, progress) {
        let alpha = this.alpha + (to.alpha - this.alpha) * progress;
        if (alpha < 0) {
            alpha = 0;
        }
        else if (alpha > 1) {
            alpha = 1;
        }
        return {
            pos: {
                x: this.pos.x + (to.pos.x - this.pos.x) * progress,
                y: this.pos.y + (to.pos.y - this.pos.y) * progress
            },
            angle: this.angle + (to.angle - this.angle) * progress,
            scale: {
                x: this.scale.x + (to.scale.x - this.scale.x) * progress,
                y: this.scale.y + (to.scale.y - this.scale.y) * progress,
            },
            transformationPoint: {
                x: this.transformationPoint.x + (to.transformationPoint.x - this.transformationPoint.x) * progress,
                y: this.transformationPoint.y + (to.transformationPoint.y - this.transformationPoint.y) * progress,
            },
            alpha: alpha
        };
    }
}

class Element {
    constructor(obj, from, to, continueFromFrame = 0) {
        this.motion = to ? true : false;
        this.easing = this.motion ? Linear : null;
        this.to = this.motion ? new Data(to) : null;
        this.from = new Data(from);
        this.object = obj;
        this.transMatrix = identity();
        this.continueFrom = continueFromFrame || 0;
    }
    draw(parentMatrix, alpha, frame, duration) {
        let progress;
        frame += this.continueFrom;
        if (frame > duration) {
            if (this.object.loop) {
                frame %= duration;
            }
            else {
                frame = duration;
            }
        }
        progress = frame / duration;
        let data = this.motion ? this.from.getData(this.to, this.easing(progress)) : this.from;
        alpha *= data.alpha;
        if (!alpha) {
            return;
        }
        computeMatrix(parentMatrix, this.transMatrix, data.pos, data.scale, this.object.width || 1, this.object.height || 1, data.transformationPoint, data.angle, this.object.padding);
        this.object.draw(this.transMatrix, alpha, frame);
    }
}

class TimeframeLayer {
    constructor() {
        this.frames = [];
    }
    addElement(obj, from, to = null, start, duration, continueFrom = 0) {
        let _dur = start + duration;
        if (_dur > this.duration && start <= this.duration) {
            _dur -= this.duration;
            this.duration += _dur;
        }
        let timeFrame = this.find(start, duration);
        if (timeFrame) {
            timeFrame.addElement(new Element(obj, from, to, continueFrom));
        }
        else {
            let t = new Timeframe(start, duration);
            t.addElement(new Element(obj, from, to, continueFrom));
            let index = this.findIndex(start, duration);
            if (index === -1) {
                this.frames.push(t);
            }
            else {
                this.frames.splice(index + 1, 0, t);
            }
        }
        return _dur;
    }
    collision(start, duration) {
        return this.frames.filter((val) => {
            if (start === val.start && duration === val.duration) {
                return false;
            }
            if (start >= val.start && val.start < start + duration) {
                return true;
            }
            if (val.start >= start && start < val.start + val.duration) {
                return true;
            }
            return false;
        });
    }
    findByFrame(frame) {
        return this.frames.find((val) => {
            return (val.start <= frame && frame < val.start + val.duration);
        });
    }
    find(start, duration) {
        return this.frames.find((val) => {
            return (val.start === start && val.duration === duration);
        });
    }
    findIndex(start, duration) {
        return this.frames.findIndex((val) => {
            return (val.start < start);
        });
    }
}

class Timeline {
    constructor(loop = false, initLayers) {
        this.loop = loop;
        this.layers = [];
        this.duration = 0;
        this.addLayers(initLayers);
    }
    addLayer() {
        this.layers.push(new TimeframeLayer);
        return this;
    }
    addLayers(count) {
        for (let i = 0; i < count; ++i) {
            this.addLayer();
        }
        return this;
    }
    addToLayer(obj, from, to, start, duration, layer, continueFrom = 0) {
        if (layer > this.layers.length - 1) {
            throw new Error("Layer out of range");
        }
        this.duration += this.layers[layer].addElement(obj, from, to, start, duration, continueFrom);
        return this;
    }
    draw(matrix, alpha = 1, frame) {
        if (alpha) {
            let timeFrame, _frame;
            this.layers.forEach((layer) => {
                if (this.loop) {
                    frame %= this.duration;
                }
                timeFrame = layer.findByFrame(frame);
                if (!timeFrame) {
                    return;
                }
                _frame = frame - timeFrame.start;
                timeFrame.elements.forEach((element) => {
                    element.draw(matrix, alpha, _frame, timeFrame.duration);
                });
            });
        }
    }
}

const dvs = `precision mediump float;

attribute vec2 aPosition;

uniform mat3 transMatrix;

void main(){
    gl_Position = vec4((transMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
}`;
const dfs = `precision mediump float;

uniform vec4 uColor;

void main(){
    gl_FragColor = uColor;
}`;
const dsvs = `precision mediump float;

attribute vec2 aPosition;
attribute vec2 aTextureCoords;

uniform mat3 transMatrix;

varying vec2 f_texCoord;

void main(){
    f_texCoord = aTextureCoords;
    gl_Position = vec4((transMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
}`;
const dsfs = `precision mediump float;

varying vec2 f_texCoord;
uniform float alpha;
uniform sampler2D sampler;

void main(){
    vec4 color = texture2D(sampler, f_texCoord);
	gl_FragColor = vec4(color.rgb, color.a * alpha);
}`;

class Renderable {
    constructor(base, w, h) {
        this.base = base;
        this.gl = base.gl;
        this.loop = true;
        this.unitBuffer = base.unitBuffer;
        this.attribs = {};
        this.uniforms = {};
        this.width = w;
        this.height = h;
    }
    getProgramData(attribs, uniforms) {
        if (!this.program) {
            return;
        }
        for (let i of attribs) {
            this.attribs[i] = this.gl.getAttribLocation(this.program, i);
        }
        for (let i of uniforms) {
            this.uniforms[i] = this.gl.getUniformLocation(this.program, i);
        }
    }
}

class Color {
    constructor(r, g, b, a) {
        if (typeof r == "object") {
            this._r = typeof r[0] === 'number' ? this.abs_val(r[0]) : 1;
            this._g = typeof r[1] === 'number' ? this.abs_val(r[1]) : 1;
            this._b = typeof r[2] === 'number' ? this.abs_val(r[2]) : 1;
            this._a = typeof r[3] === 'number' ? this.abs_val(r[3]) : 1;
        }
        else {
            this._r = r ? this.abs_val(r) : 1;
            this._g = g ? this.abs_val(g) : 1;
            this._b = b ? this.abs_val(b) : 1;
            this._a = a ? this.abs_val(a) : 1;
        }
        this._buffer = new Float32Array(this.getColor());
    }
    set r(_c) {
        this._r = this.abs_val(_c);
        this.dirty = true;
    }
    get r() {
        return this._r;
    }
    set g(_c) {
        this._g = this.abs_val(_c);
        this.dirty = true;
    }
    get g() {
        return this._g;
    }
    set b(_c) {
        this._b = this.abs_val(_c);
        this.dirty = true;
    }
    get b() {
        return this._b;
    }
    set a(_c) {
        this._a = this.abs_val(_c);
        this.dirty = true;
    }
    get a() {
        return this._a;
    }
    abs_val(v) {
        return v <= 0 ? (v >= -1 ? -v : 0) : v > 255 ? (v % 255) / 255 : v / 255;
    }
    get color() {
        return [this._r, this._g, this._b, this._a];
    }
    set color(c) {
        this.r = c[0];
        this.g = c[1];
        this.b = c[2];
        this.a = c[3] || -this.a;
    }
    getColor() {
        return [this._r, this._g, this._b, this._a];
    }
    get buffer() {
        if (this.dirty) {
            this._buffer[0] = this._r;
            this._buffer[1] = this._g;
            this._buffer[2] = this._b;
            this._buffer[3] = this._a;
            this.dirty = false;
        }
        return this._buffer;
    }
    mixAlpha(alpha) {
        this.buffer[3] *= alpha;
        this.dirty = true;
        return this._buffer;
    }
}

class Rectangle extends Renderable {
    constructor(base, w, h, c = [1, 1, 1, 1]) {
        super(base, w, h);
        this.program = base.defaultShapeProgram;
        this.color = new Color(c);
        this.hasTransparency = false;
        this.getProgramData([
            'aPosition'
        ], [
            'uColor',
            'transMatrix',
        ]);
    }
    draw(matrix, alpha) {
        if (this.base.lastUsedProgram !== this.program) {
            this.base.lastUsedProgram = this.program;
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.unitBuffer);
        this.gl.vertexAttribPointer(this.attribs['aPosition'], 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(this.attribs['aPosition']);
        this.gl.uniform4fv(this.uniforms['uColor'], this.color.mixAlpha(alpha));
        this.gl.uniformMatrix3fv(this.uniforms['transMatrix'], false, matrix);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}

class Spritesheet {
    constructor(base, data, img) {
        this.gl = base.gl;
        this.sprites = {};
        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
        let tmp, x, y, w, h;
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
            ]), this.gl.STATIC_DRAW);
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
    get(index) {
        return this.sprites[index];
    }
}

class Sprite extends Renderable {
    constructor(base, img, transparent, index) {
        if (!(img instanceof Spritesheet)) {
            super(base, img.width, img.height);
            this.texture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
            this.textureCoords = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoords);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), this.gl.STATIC_DRAW);
        }
        else {
            if (!index) {
                throw new Error('Index is required');
            }
            let sprite = img.get(index);
            super(base, sprite.width, sprite.height);
            this.textureCoords = sprite.texCoords;
            this.texture = sprite.source.texture;
            this.padding = { x: sprite.pad_x, y: sprite.pad_y };
        }
        this.loop = true;
        this.program = base.defaultSpriteProgram;
        if (transparent) {
            this.blendFunc = this.gl.ONE;
        }
        else {
            this.blendFunc = this.gl.SRC_ALPHA;
        }
        this.getProgramData([
            'aPosition',
            'aTextureCoords'
        ], [
            'transMatrix',
            'sampler',
            'alpha'
        ]);
    }
    draw(matrix, alpha) {
        if (this.base.lastUsedProgram !== this.program) {
            this.base.lastUsedProgram = this.program;
        }
        if (this.base.lastUsedBlendFunc !== this.blendFunc) {
            this.base.lastUsedBlendFunc = this.blendFunc;
        }
        if (this.base.lastUsedTexture !== this.texture) {
            this.base.lastUsedTexture = this.texture;
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoords);
        this.gl.vertexAttribPointer(this.attribs["aTextureCoords"], 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(this.attribs["aTextureCoords"]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.unitBuffer);
        this.gl.vertexAttribPointer(this.attribs['aPosition'], 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(this.attribs['aPosition']);
        this.gl.uniform1i(this.uniforms['sampler'], 0);
        this.gl.uniformMatrix3fv(this.uniforms['transMatrix'], false, matrix);
        this.gl.uniform1f(this.uniforms['alpha'], alpha);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
    switchBlendFunc() {
        this.blendFunc = this.blendFunc === this.gl.ONE ? this.gl.SRC_ALPHA : this.gl.ONE;
    }
}

const recognizedTypes = [
    'image',
    'audio',
    'spritesheet',
    'json',
    'js',
    'anime'
];
let fileExt = new RegExp('.*?\\.(png|webp|jpg|jpeg|sp\\.json|json|js|anime|wav|mp3|webm)$', 'miu');
class Item {
    constructor(id, src, fileFormat, type, transparent) {
        this.id = id;
        this.src = src;
        if (!fileFormat) {
            let format = src.match(fileExt);
            if (!format) {
                throw new Error('Unsupported file type');
            }
            this.fileFormat = format[1];
        }
        else {
            if (!recognizedTypes.includes(fileFormat)) {
                throw new Error('Unsupported file type');
            }
            this.fileFormat = fileFormat;
        }
        if (recognizedTypes.includes(type)) {
            this.type = type;
            switch (type) {
                case 'audio':
                    this.result = new Audio();
                    break;
                case 'image':
                    this.result = new Image();
                    break;
                default:
                    break;
            }
        }
        else {
            switch (this.fileFormat) {
                case 'png':
                case 'webp':
                case 'jpg':
                case 'jpeg':
                    this.transparent = transparent || false;
                    this.type = 'image';
                    this.result = new Image();
                    break;
                case 'sp.json':
                    this.type = 'spritesheet';
                    break;
                case 'json':
                case 'anime':
                case 'js':
                    this.type = this.fileFormat.toLowerCase();
                    break;
                case 'wav':
                case 'mp3':
                case 'webm':
                    this.type = 'audio';
                    this.result = new Audio();
                    break;
            }
        }
    }
}

class AssetLoader {
    constructor(maxRetries = 3) {
        this.maxRetries = maxRetries;
        this.downloadQueue = [];
        this.downloaded = [];
        this.errors = [];
    }
    download(mode = 0) {
        return new Promise((resolve, reject) => {
            let downloadQueue = mode === 0 ? this.downloadQueue : this.errors;
            this.toDownload = downloadQueue.length;
            if (downloadQueue.length === 0) {
                resolve(this.downloaded);
            }
            for (let element of downloadQueue) {
                let request = new XMLHttpRequest();
                if (element.type === 'image') {
                    request.responseType = 'blob';
                }
                request.onload = async () => {
                    if (request.status !== 200) {
                        this.errors.push(element);
                        if (this.isDone()) {
                            resolve(this.downloaded);
                        }
                    }
                    switch (element.type) {
                        case 'image':
                            await new Promise((resolve) => {
                                element.result.src = URL.createObjectURL(new Blob([request.response], { type: `image/${element.fileFormat}` }));
                                element.result.onload = () => {
                                    URL.revokeObjectURL(element.result.src);
                                    resolve();
                                };
                            });
                            break;
                        case 'audio':
                            await new Promise((resolve) => {
                                element.result.src = URL.createObjectURL(new Blob([request.response], { type: `audio/${element.fileFormat}` }));
                                element.result.onload = () => {
                                    URL.revokeObjectURL(element.result.src);
                                    resolve();
                                };
                            });
                            break;
                        case 'json':
                        case 'spritesheet':
                            element.result = JSON.parse(request.responseText);
                            break;
                        case 'js':
                            element.result = request.responseText;
                            break;
                        case 'anime':
                            let t = new DOMParser();
                            element.result = t.parseFromString(request.responseText, 'text/xml');
                    }
                    this.downloaded.push(element);
                    downloadQueue.splice(downloadQueue.indexOf(element), 1);
                    if (this.isDone()) {
                        resolve(this.downloaded);
                    }
                };
                request.onerror = () => {
                    reject(new Error(`Error while downloading file: ${request.statusText}`));
                };
                request.open('GET', element.src, true);
                request.send();
            }
        });
    }
    async retryErrors() {
        if (this.errors.length) {
            for (let i = 0; i < this.maxRetries; ++i) {
                await this.download(1);
                if (this.isDone()) {
                    return this.downloaded;
                }
            }
            throw new Error('Exceeded max number of retries.');
        }
    }
    pushFile(id, src, fileFormat, type, transparent) {
        this.downloadQueue.push(new Item(id, src, fileFormat, type, transparent));
    }
    pushManifest(manifest) {
        for (let i of manifest) {
            this.pushFile(i.id, i.src, i.fileFormat, i.type, i.transparent);
        }
    }
    isDone() {
        return (this.downloaded.length + this.errors.length === this.toDownload);
    }
    clear() {
        this.downloadQueue.slice(0, this.downloadQueue.length);
        this.downloaded.slice(0, this.downloaded.length);
        this.errors.slice(0, this.errors.length);
    }
}

class AssetMenager {
    constructor(base) {
        this.base = base;
        this.assets = {};
        this.spritesheets = {};
    }
    loadAssets(assetLoader) {
        let assets = assetLoader.downloaded.splice(0, assetLoader.downloaded.length);
        let img, data;
        for (let spritesheet of assets.filter((v) => { return v.type === 'spritesheet'; })) {
            assets.splice(assets.indexOf(spritesheet), 1);
            for (let sheet in spritesheet.result) {
                img = assets.find((value) => {
                    return value.id === sheet;
                });
                if (!img) {
                    throw new Error('Missing spritesheet');
                }
                assets.splice(assets.indexOf(img), 1);
                data = spritesheet.result[sheet];
                sheet.replace(fileExt, '');
                sheet = 'sp_' + sheet;
                this.spritesheets[sheet] = new Spritesheet(this.base, data, img.result);
            }
        }
        for (let asset of assets) {
            switch (asset.type) {
                case 'image':
                    this.loadAssets[asset.id] = new Sprite(this.base, asset.result, asset.transparent);
                    break;
                default:
                    break;
            }
        }
    }
    createSprite(id) {
        let sp, k;
        for (let i in this.spritesheets) {
            if (k = this.spritesheets[i].get(id)) {
                sp = i;
                break;
            }
        }
        if (!sp) {
            throw new Error(`There is no image named "${id}" in spritesheets.`);
        }
        return (this.assets[id] = new Sprite(this.base, this.spritesheets[sp], k.transparent, id));
    }
    createAllSprites() {
        let s;
        for (let i in this.spritesheets) {
            s = this.spritesheets[i];
            for (let id in this.spritesheets[i].sprites) {
                this.assets[id] = new Sprite(this.base, s, s.sprites[id].transparent, id);
            }
        }
    }
    get(id) {
        return this.assets[id];
    }
}

class Renderer {
    constructor(base, fps, width, height, bgColor) {
        if (fps <= 0) {
            throw new Error("Fps must be a positive number");
        }
        this.gl = base.gl;
        this.timing = 1000 / fps;
        this.timeToNextUpdate = this.timing;
        this.lastUpdate = 0;
        this.frame = 0;
        this.mainTimeline = null;
        this.isPlaying = false;
        this.projectionMatrix = createProjection(width, height);
        this.backgroundColor = bgColor;
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
        this.changeBlendFunc(this.gl.ONE);
    }
    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.render();
            setTimeout(() => {
                this.update();
                this.updateInterval = setInterval(this.update, this.timing);
            }, this.timeToNextUpdate);
        }
    }
    pause() {
        if (this.isPlaying) {
            clearInterval(this.updateInterval);
            this.timeToNextUpdate -= performance.now() - this.lastUpdate;
            this.isPlaying = false;
        }
    }
    update() {
        if (this.isPlaying) {
            ++this.frame;
            this.frameUpdated = true;
            requestAnimationFrame(this.render);
            this.lastUpdate = performance.now();
            this.timeToNextUpdate = this.timing;
        }
    }
    render() {
        if (!this.mainTimeline) {
            throw new Error("There is nothing to render (mainTimeline isn't set)");
        }
        if (!(this.frameUpdated && this.isPlaying)) {
            return;
        }
        this.frameUpdated = false;
        this.clear();
        this.mainTimeline.draw(this.projectionMatrix, 1, this.frame);
        if (!this.mainTimeline.loop && this.frame >= this.mainTimeline.duration - 1) {
            this.pause();
            return;
        }
    }
    clear() {
        this.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    changeBlendFunc(func) {
        this.gl.blendFunc(func, this.gl.ONE_MINUS_SRC_ALPHA);
    }
}

function logGLCall(functionName, args) {
    console.log("gl." + functionName + "(" +
        WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
}
function validateNoneOfTheArgsAreUndefined(functionName, args) {
    for (var ii = 0; ii < args.length; ++ii) {
        if (args[ii] === undefined) {
            console.error("undefined passed to gl." + functionName + "(" +
                WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
        }
    }
}
function logAndValidate(functionName, args) {
    logGLCall(functionName, args);
    validateNoneOfTheArgsAreUndefined(functionName, args);
}
function throwOnGLError(err, funcName, args) {
    throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
}
function createDebugGl(gl) {
    return WebGLDebugUtils.makeDebugContext(gl, throwOnGLError, logAndValidate);
}

class Base {
    constructor(debug = false, width, height, canvas_id, fps = 25, webgl2 = false, bgC = [-1, -1, -1, -1]) {
        this.canvas = document.getElementById(canvas_id);
        if (this.canvas.nodeName != "CANVAS") {
            this.canvas = document.createElement("canvas");
            this.textCanvas = document.createElement('canvas');
            this.textCanvas.style.display = 'none';
            document.getElementById(canvas_id).appendChild(this.canvas);
            document.getElementById(canvas_id).appendChild(this.textCanvas);
        }
        this.gl = (this.canvas.getContext(webgl2 ? "webgl2" : "webgl", { alpha: false, depth: false }));
        if (!this.gl) {
            console.error(`Brak wsparcia dla ${webgl2 ? "webgl2" : "webgl"}.`);
            return;
        }
        if (debug) {
            this.gl = createDebugGl(this.gl);
        }
        this.setCanvasSize(width, height);
        this.lastUsedProgram = null;
        this.renderer = new Renderer(this, fps, width, height, bgC instanceof Color ? bgC : new Color(bgC));
        this.gl.frontFace(this.gl.CW);
        this.gl.enable(this.gl.BLEND);
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        this.defaultShapeProgram = this.newProgram();
        this.defaultSpriteProgram = this.newProgram(dsvs, dsfs);
        this.unitBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.unitBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            0, 0,
            0, 1,
            1, 0,
            1, 1
        ]), this.gl.STATIC_DRAW);
    }
    setCanvasSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
    compileShader(src, type) {
        let t;
        if (type == "vs") {
            t = this.gl.VERTEX_SHADER;
        }
        else if (type == "fs") {
            t = this.gl.FRAGMENT_SHADER;
        }
        else {
            throw new Error("Podano nie prawidłowy typ shader'a");
        }
        let s = this.gl.createShader(t);
        this.gl.shaderSource(s, src);
        this.gl.compileShader(s);
        if (!this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS)) {
            throw new Error(this.gl.getShaderInfoLog(s));
        }
        return s;
    }
    compileProgram(vs, fs) {
        let p = this.gl.createProgram();
        this.gl.attachShader(p, vs);
        this.gl.attachShader(p, fs);
        this.gl.linkProgram(p);
        if (!this.gl.getProgramParameter(p, this.gl.LINK_STATUS)) {
            throw new Error(this.gl.getProgramInfoLog(p));
        }
        return p;
    }
    newVertexShader(src) {
        try {
            return this.compileShader(src, "vs");
        }
        catch (e) {
            console.error(e);
            return -1;
        }
    }
    newFragmentShader(src) {
        try {
            return this.compileShader(src, "fs");
        }
        catch (e) {
            console.error(e);
            return -1;
        }
    }
    newProgram(vs = dvs, fs = dfs) {
        try {
            return this.compileProgram(this.newVertexShader(vs), this.newFragmentShader(fs));
        }
        catch (e) {
            console.error(e);
            return -1;
        }
    }
    get mainTimeline() {
        return this.renderer.mainTimeline;
    }
    set mainTimeline(value) {
        if (!(value instanceof Timeline)) {
            return;
        }
        this.renderer.mainTimeline = value;
    }
    play() {
        this.renderer.play();
    }
    pause() {
        this.renderer.pause();
    }
    get lastUsedBlendFunc() {
        return this._lastUsedBlendFunc;
    }
    set lastUsedBlendFunc(value) {
        this._lastUsedBlendFunc = value;
        this.renderer.changeBlendFunc(value);
    }
    get lastUsedProgram() {
        return this._lastUsedProgram;
    }
    set lastUsedProgram(value) {
        this._lastUsedProgram = value;
        this.gl.useProgram(value);
    }
    get lastUsedTexture() {
        return this._lastUsedTexture;
    }
    set lastUsedTexture(value) {
        this._lastUsedTexture = value;
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, value);
    }
}

// export { AssetLoader, AssetMenager, Base, Color, Data, Element, Item, Linear, Rectangle, Renderable, Sprite, Spritesheet, Timeframe, TimeframeLayer, Timeline, computeMatrix, dfs, dsfs, dsvs, dvs, projectionMatrix };
//# sourceMappingURL=Base.js.map
