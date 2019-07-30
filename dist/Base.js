function computeMatrix(_in, out, pos, scale, trans, angle) {
    let [a, b, , d, e, , g, h] = _in;
    let x = pos.x, y = pos.y, px = trans.x, py = trans.y, sx = scale.x, sy = scale.y;
    let s = Math.sin(angle), c = Math.cos(angle);
    out[0] = sx * (c * a + s * d);
    out[1] = sx * (c * b + s * e);
    out[3] = sy * (c * d - s * a);
    out[4] = sy * (c * e - s * b);
    out[6] = a * (px * (1 - sx * c) + py * sy * s + x) + d * (py * (1 - sy * c) - px * sx * s + y) + g;
    out[7] = b * (px * (1 - sx * c) + py * sy * s + x) + e * (py * (1 - sy * c) - px * sx * s + y) + h;
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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function Linear(a) {
    return a;
}

class Data {
    constructor(data) {
        if (!data) {
            return this;
        }
        this.pos = { x: data.pos.x, y: data.pos.y };
        this.angle = data.angle;
        this.scale = { x: 1, y: 1 };
        this.transformationPoint = { x: 0, y: 0 };
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
        this.alpha = 1;
    }
    // get x(){
    //     return this._x;
    // }
    // set x(value: number){
    //     if (this._x === value){
    //         return;
    //     }
    //     this._x = value;
    //     this.dirty = true;
    // }
    // get y(){
    //     return this._y;
    // }
    // set y(value: number){
    //     if (this._y === value){
    //         return;
    //     }
    //     this._y = value;
    //     this.dirty = true;
    // }
    // get angle(){
    //     return this._angle;
    // }
    // set angle(value: number){
    //     if (this._angle === value){
    //         return;
    //     }
    //     this._angle = value;
    //     this.dirty = true;
    // }
    // get scale(){
    //     return this._scale;
    // }
    // set scale(value: vec2){
    //     if (this._scale === value){
    //         return;
    //     }
    //     this._scale = value;
    //     this.dirty = true;
    // }
    // get transformationPoint(){
    //     return this._transformationPoint;
    // }
    // set transformationPoint(value: vec2){
    //     if (this._transformationPoint === value){
    //         return;
    //     }
    //     this._transformationPoint = value;
    //     this.dirty = true;
    // }
    // get alpha(){
    //     return this._alpha;
    // }
    // set alpha(value: number){
    //     if (this._alpha === value){
    //         return;
    //     }
    //     this._alpha = value;
    //     this.dirty = true;
    // }
    getData(to, progress) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
class Element {
    constructor(obj, from, to, continueFromFrame = 0) {
        this.motion = to ? true : false;
        this.easing = this.motion ? Linear : null;
        this.to = this.motion ? new Data(to) : null;
        // this.val = this.motion ? new Data(null) : null;
        this.from = new Data(from);
        this.object = obj;
        this.continueFrom = continueFromFrame || 0;
    }
    draw(parentMatrix, frame, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            let progress;
            frame += this.continueFrom;
            if (frame > duration) {
                if (this.object.loop) {
                    frame %= duration;
                }
                else {
                    return;
                }
            }
            progress = frame / duration;
            let data = this.motion ? yield this.from.getData(this.to, this.easing(progress)) : this.from;
            computeMatrix(parentMatrix, this.transMatrix, data.pos, data.scale, data.transformationPoint, data.angle);
            this.object.draw(this.transMatrix, frame);
        });
    }
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
    split(splitPoint) {
        let t = splitPoint - this.start;
        let s = new Timeframe(splitPoint, this.duration - t);
        this.duration = t;
        s.addElements(this.elements);
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
class TimeframeLayer {
    constructor() {
        this.frames = [];
    }
    addElement(obj, from, to = null, start, duration, continueFrom = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let _dur = start + duration;
            if (_dur > this.duration && start <= this.duration) {
                _dur -= this.duration;
                this.duration += _dur;
            }
            // let elem = new Element(obj, from, to, continueFrom);
            // await this.solveCollisions(await this.collision(start, duration), start, duration);
            // let timeframe = await this.find(start, start + duration);
            let timeFrame = yield this.find(start, duration);
            if (timeFrame) {
                timeFrame.addElement(new Element(obj, from, to, continueFrom));
            }
            else {
                let t = new Timeframe(start, duration);
                t.addElement(new Element(obj, from, to, continueFrom));
                let index = yield this.findIndex(start, duration);
                if (index === -1) {
                    this.frames.push(t);
                }
                else {
                    this.frames.splice(index + 1, 0, t);
                }
            }
            return _dur;
        });
    }
    // async solveCollisions(collisions: Array<Timeframe>, start: number, duration: number){
    // }
    collision(start, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.frames.filter((val) => {
                if (start === val.start && duration === val.duration) {
                    return false;
                }
                if (start >= val.start && val.start <= start + duration) {
                    return true;
                }
                if (val.start >= start && start <= val.start + val.duration) {
                    return true;
                }
                return false;
            });
        });
    }
    findByFrame(frame) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.frames.find((val) => {
                return (val.start >= frame && frame <= val.start + val.duration);
            });
        });
    }
    find(start, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.frames.find((val) => {
                return (val.start === start && val.duration === duration);
            });
        });
    }
    findIndex(start, duration) {
        return this.frames.findIndex((val) => {
            return (val.start < start);
        });
    }
}
class Timeline {
    constructor() {
        this.loop = false;
        this.layers = [];
        this.duration = 0;
    }
    addLayer() {
        this.layers.push(new TimeframeLayer);
    }
    addLayers(count) {
        for (let i = 0; i < count; ++i) {
            this.addLayer();
        }
    }
    addToLayer(obj, from, to, start, duration, layer, continueFrom = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (layer > this.layers.length - 1) {
                throw "Layer out of range";
            }
            this.duration += yield this.layers[layer].addElement(obj, from, to, start, duration, continueFrom);
            return this;
        });
    }
    draw(matrix, frame) {
        return __awaiter(this, void 0, void 0, function* () {
            let timeFrame, _frame;
            this.layers.forEach((layer) => __awaiter(this, void 0, void 0, function* () {
                timeFrame = yield layer.findByFrame(frame);
                if (!timeFrame) {
                    return;
                }
                _frame = frame - timeFrame.start;
                timeFrame.elements.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    yield element.draw(matrix, _frame);
                }));
            }));
        });
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
uniform sampler2D sampler;

void main(){
	gl_FragColor = texture2D(sampler, f_texCoord);
}`;

class Renderable {
    constructor(base, w, h) {
        this.base = base;
        this.gl = base.gl;
        this.shapeBuffer = this.gl.createBuffer();
        this.attribs = {};
        this.uniforms = {};
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            0, 0,
            0, h,
            w, 0,
            w, h
        ]), this.gl.STATIC_DRAW);
    }
}

class Color {
    constructor(r, g, b, a) {
        if (typeof r == "object") {
            this._r = r[0] ? this.abs_val(r[0]) : 1;
            this._g = r[1] ? this.abs_val(r[1]) : 1;
            this._b = r[2] ? this.abs_val(r[2]) : 1;
            this._a = r[3] ? this.abs_val(r[3]) : 1;
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
    }
    get r() {
        return this._r;
    }
    set g(_c) {
        this._g = this.abs_val(_c);
    }
    get g() {
        return this._g;
    }
    set b(_c) {
        this._b = this.abs_val(_c);
    }
    get b() {
        return this._b;
    }
    set a(_c) {
        this._a = this.abs_val(_c);
    }
    get a() {
        return this._a;
    }
    abs_val(v) {
        return v < 0 ? (v >= -1 ? -v : 0) : v > 255 ? (v % 255) / 255 : v / 255;
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
        return this._buffer;
    }
}

class Rectangle extends Renderable {
    constructor(base, w, h, c = [1, 1, 1, 1]) {
        super(base, w, h);
        this.loop = true;
        this.program = base.defaultShapeProgram;
        this.color = new Color(c);
        this.attribs["aPosition"] = this.gl.getAttribLocation(this.program, "aPosition");
        this.gl.enableVertexAttribArray(this.attribs["aPosition"]);
        this.uniforms["uColor"] = this.gl.getUniformLocation(this.program, "uColor");
        this.uniforms["transMatrix"] = this.gl.getUniformLocation(this.program, "transMatrix");
        this.uniforms["mProj"] = this.gl.getUniformLocation(this.program, "mProj");
    }
    draw(matrix, frame) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.base.lastUsedProgram !== this.program) {
                this.base.lastUsedProgram = this.program;
                this.gl.useProgram(this.program);
            }
            this.gl.uniform4fv(this.attribs['uColor'], this.color.buffer);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);
            this.gl.vertexAttribPointer(this.attribs['position'], 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.gl.enableVertexAttribArray(this.attribs['position']);
            this.gl.uniformMatrix3fv(this.attribs['transMatrix'], false, matrix);
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        });
    }
}

class Sprite extends Renderable {
    constructor(base, img) {
        super(base, img.width, img.height);
        this.loop = true;
        this.program = base.defaultSpriteProgram;
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
        this.attribs["position"] = this.gl.getAttribLocation(this.program, "aPosition");
        this.attribs["textureCoords"] = this.gl.getAttribLocation(this.program, "aTextureCoords");
        this.uniforms["uColor"] = this.gl.getUniformLocation(this.program, "uColor");
        this.uniforms["transMatrix"] = this.gl.getUniformLocation(this.program, "transMatrix");
        this.uniforms["mProj"] = this.gl.getUniformLocation(this.program, "mProj");
        this.uniforms["sampler"] = this.gl.getUniformLocation(this.program, "sampler");
    }
    draw(matrix) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.base.lastUsedProgram !== this.program) {
                this.base.lastUsedProgram = this.program;
                this.gl.useProgram(this.program);
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoords);
            this.gl.vertexAttribPointer(this.attribs["textureCoords"], 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.gl.enableVertexAttribArray(this.attribs["textureCoords"]);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);
            this.gl.vertexAttribPointer(this.attribs['position'], 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.gl.enableVertexAttribArray(this.attribs['position']);
            this.gl.uniformMatrix3fv(this.attribs['transMatrix'], false, matrix);
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        });
    }
}

class Base {
    constructor(width, height, canvas_id, bgC = [-1, -1, -1, -1], webgl2 = false, fps = 25) {
        this.canvas = document.getElementById(canvas_id);
        if (this.canvas.nodeName != "CANVAS") {
            this.canvas = document.createElement("canvas");
            document.getElementById(canvas_id).appendChild(this.canvas);
        }
        this.gl = (this.canvas.getContext(webgl2 ? "webgl2" : "webgl"));
        if (!this.gl) {
            console.error(`Brak wsparcia dla ${webgl2 ? "webgl2" : "webgl"}.`);
            return;
        }
        this.projectionMatrix = new Float32Array(9);
        this.setCanvasSize(width, height);
        this.lastUsedProgram = null;
        this.mainScene = null;
        if (bgC instanceof Color) {
            this.backgroundColor = bgC;
        }
        else {
            this.backgroundColor = new Color(bgC);
        }
        this.clear();
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.BLEND);
        this.gl.cullFace(this.gl.BACK);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.defaultShapeProgram = this.newProgram();
        this.defaultSpriteProgram = this.newProgram(dsvs, dsfs);
    }
    play() {
        if (typeof this.mainScene == undefined) {
            return;
        }
        this.mainScene.draw(this.projectionMatrix, 0);
    }
    setCanvasSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        projectionMatrix(this.projectionMatrix, width, height);
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
    clear() {
        this.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}

//# sourceMappingURL=Base.js.map
