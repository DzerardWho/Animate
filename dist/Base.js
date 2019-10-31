function NOOP() { }

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
                if (data.transformationPoint.y) {
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
    update(frame) {
        this.object.update(frame);
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
        this.duration = 0;
    }
    addElement(obj, from, to = null, start, duration, continueFrom = 0) {
        if (start + duration > this.duration) {
            this.duration = start + duration;
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
        this.labels = {};
        this.createLayer();
        this.createMultipleLayers(initLayers - 1);
        this.lastUsed = {
            nextFrame: 0,
            layer: 0
        };
    }
    createLayer() {
        this.layers.push(new TimeframeLayer);
        return this;
    }
    createMultipleLayers(count) {
        for (let i = 0; i < count; ++i) {
            this.createLayer();
        }
        return this;
    }
    addObjectToLayer(obj, from, to, start, duration, layer, continueFrom = 0) {
        if (layer > this.layers.length - 1) {
            throw new Error("Layer out of range");
        }
        this.layers[layer].addElement(obj, from, to, start, duration, continueFrom);
        if (start + duration > this.duration) {
            this.duration = start + duration;
        }
        return this;
    }
    set(data, obj) {
        if (!data.data) {
            throw new Error('There is no data to be set.');
        }
        if (typeof obj !== 'undefined') {
            this.lastUsed.obj = obj;
        }
        else if (!this.lastUsed.obj) {
            throw new Error('Object is required.');
        }
        data.duration = data.duration || 1;
        this.lastUsed.layer = typeof data.layer === 'number' ? data.layer : this.lastUsed.layer;
        this.lastUsed.nextFrame = typeof data.start !== 'undefined' ? data.start : this.lastUsed.nextFrame;
        this.lastUsed.from = data.data;
        if (this.lastUsed.layer > this.layers.length - 1) {
            throw new Error("Layer out of range");
        }
        this.layers[this.lastUsed.layer].addElement(this.lastUsed.obj, data.data, null, this.lastUsed.nextFrame, data.duration, data.continueFrom);
        if (this.lastUsed.nextFrame + data.duration > this.duration) {
            this.duration = this.lastUsed.nextFrame + data.duration;
        }
        this.lastUsed.nextFrame += data.duration;
        return this;
    }
    to(data, obj) {
        if (!data.data) {
            throw new Error('There is no data to be set.');
        }
        if (typeof obj !== 'undefined') {
            this.lastUsed.obj = obj;
        }
        else if (!this.lastUsed.obj) {
            throw new Error('Object is required.');
        }
        data.duration = data.duration || 1;
        this.lastUsed.nextFrame = typeof data.start !== 'undefined' ? data.start : this.lastUsed.nextFrame;
        this.lastUsed.layer = typeof data.layer === 'number' ? data.layer : this.lastUsed.layer;
        if (this.lastUsed.layer > this.layers.length - 1) {
            throw new Error("Layer out of range");
        }
        this.layers[this.lastUsed.layer].addElement(this.lastUsed.obj, this.lastUsed.from, data.data, this.lastUsed.nextFrame, data.duration, data.continueFrom);
        if (this.lastUsed.nextFrame + data.duration > this.duration) {
            this.duration = this.lastUsed.nextFrame + data.duration;
        }
        this.lastUsed.nextFrame += data.duration;
        this.lastUsed.from = data.data;
        return this;
    }
    fromTo(data, obj) {
        if (!(data.data && data.to)) {
            throw new Error('There is no data to be set.');
        }
        if (typeof obj !== 'undefined') {
            this.lastUsed.obj = obj;
        }
        else if (!this.lastUsed.obj) {
            throw new Error('Object is required.');
        }
        data.duration = data.duration || 1;
        this.lastUsed.nextFrame = typeof data.start !== 'undefined' ? data.start : this.lastUsed.nextFrame;
        this.lastUsed.layer = typeof data.layer === 'number' ? data.layer : this.lastUsed.layer;
        if (this.lastUsed.layer > this.layers.length - 1) {
            throw new Error("Layer out of range");
        }
        this.layers[this.lastUsed.layer].addElement(this.lastUsed.obj, data.data, data.to, this.lastUsed.nextFrame, data.duration, data.continueFrom);
        if (this.lastUsed.nextFrame + data.duration > this.duration) {
            this.duration = this.lastUsed.nextFrame + data.duration;
        }
        this.lastUsed.nextFrame += data.duration;
        this.lastUsed.from = data.to;
        return this;
    }
    toSet(data, dur, obj) {
        this.to(data, obj);
        data.duration = dur;
        this.set(data);
    }
    fromToSet(data, dur, obj) {
        this.fromTo(data, obj);
        data.data = data.to;
        data.duration = dur;
        this.set(data);
    }
    update(frame) {
        let timeFrame, _frame;
        if (this.loop) {
            frame %= this.duration;
        }
        else if (frame >= this.duration) {
            frame = this.duration - 1;
        }
        this.layers.forEach((layer) => {
            timeFrame = layer.findByFrame(frame);
            if (!timeFrame) {
                return;
            }
            _frame = frame - timeFrame.start;
            timeFrame.elements.forEach((element) => {
                element.update(_frame);
            });
        });
    }
    draw(matrix, alpha = 1, frame) {
        if (alpha) {
            let timeFrame, _frame;
            if (this.loop) {
                frame %= this.duration;
            }
            else if (frame >= this.duration) {
                frame = this.duration - 1;
            }
            this.layers.forEach((layer) => {
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
    addLabel(label, frame) {
        if (typeof (label) === 'string' && typeof (frame) === 'number' && frame >= 0)
            this.labels[label] = frame;
    }
    getLabel(label) {
        return this.labels[label] || -1;
    }
}

class TimelineInstance {
    constructor(base, timeline, useColor = null, useMask = false) {
        this.frame = 0;
        this.base = base;
        this.timeline = timeline;
        this.gl = base.gl;
        this.projectionMatrix = base.projectionMatrixAndSize;
        if (useColor) {
            this.setUpForFramebuffer();
            this.program = base.colorProgram;
            this.draw = this.drawAndModify;
            this.color = useColor;
            this.uniforms = { uSampler: this.texture, uTransMatrix: this.projectionMatrix };
        }
        else {
            this.draw = this.basicDraw;
        }
        this.play();
    }
    reset() {
        this.frame = 0;
    }
    pause() {
        this.playing = false;
    }
    play() {
        this.playing = true;
    }
    update() {
        if (this.playing)
            ++this.frame;
        this.timeline.update(this.frame);
    }
    setUpForFramebuffer() {
        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.base.canvas.width, this.base.canvas.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
        this.framebuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, 0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.bufferInfo = this.base.defaultBufferInfo;
    }
    basicDraw(matrix, alpha) {
        this.timeline.draw(matrix, alpha, this.frame);
    }
    drawAndModify(matrix, alpha) {
        this.prevFramebuffer = this.base.lastUsedFramebuffer;
        this.base.lastUsedFramebuffer = this.framebuffer;
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.clear();
        this.basicDraw(matrix, 1);
        this.base.lastUsedFramebuffer = this.prevFramebuffer;
        if (this.base.lastUsedProgram !== this.program) {
            this.base.lastUsedProgram = this.program;
        }
        twgl.setBuffersAndAttributes(this.gl, this.program, this.bufferInfo);
        this.uniforms['uColor'] = this.color.mixAlpha(alpha);
        twgl.setUniforms(this.program, this.uniforms);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
    get loop() {
        return this.timeline.loop;
    }
    get duration() {
        return this.timeline.duration;
    }
    clear() {
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    goto(dest) {
        let frame;
        if (typeof (dest) === 'string') {
            frame = this.timeline.getLabel(dest);
        }
        else {
            frame = dest;
        }
        if (frame !== -1)
            this.frame = frame;
    }
    gotoAndPlay(dest) {
        this.goto(dest);
        this.playing = true;
    }
    gotoAndPause(dest) {
        this.goto(dest);
        this.playing = false;
    }
    gotoAndStop(dest) {
        this.gotoAndPause(dest);
    }
}

const colorShapeVertexShader = `precision mediump float;

attribute vec2 aPos;

uniform mat3 uTransMatrix;

void main(){
    gl_Position = vec4((uTransMatrix * vec3(aPos, 1.0)).xy, 0.0, 1.0);
}`;
const colorShapeFragmentShader = `precision mediump float;

uniform vec4 uColor;

void main(){
    vec4 color = uColor;
    color.rgb *= color.a;
    gl_FragColor = color;
}`;
const spriteVertexShader = `precision mediump float;

attribute vec2 aPos;
attribute vec2 aTexCoords;

uniform mat3 uTransMatrix;

varying vec2 vTexCoord;

void main(){
    vTexCoord = aTexCoords;
    gl_Position = vec4((uTransMatrix * vec3(aPos, 1.0)).xy, 0.0, 1.0);
}`;
const spriteFragmentShader = `precision mediump float;

varying vec2 vTexCoord;
uniform float uAlpha;
uniform sampler2D uSampler;

void main(){
    vec4 color = texture2D(uSampler, vTexCoord);
    color.a *= uAlpha;
    color.rgb *= color.a;
	gl_FragColor = color;
}`;
const timelineVertexShader = `precision mediump float;

attribute vec2 aPos;

uniform mat3 uTransMatrix;

varying vec2 vTexCoord;

void main(){
    vTexCoord = aPos;
    gl_Position = vec4((uTransMatrix * vec3(aPos, 1.0)).xy, 0.0, 1.0);
}`;
const colorTimelineFragmentShader = `precision mediump float;

varying vec2 vTexCoord;
uniform vec4 uColor;
uniform sampler2D uSampler;

void main(){
    vec4 color = uColor;
    color *= texture2D(uSampler, vTexCoord).a;
    gl_FragColor = color;
}`;
const maskTimelineFragmentShader = `precision mediump float;

varying vec2 vTexCoord;
uniform float uAlpha;
uniform sampler2D uSampler;
uniform sampler2D uMask;

void main(){
    vec4 color = texture2D(uSampler, vTexCoord);
    color.a *= uAlpha * texture2D(uMask, vTexCoord).a;
    color.rgb *= color.a;
	gl_FragColor = color;
}`;
const colorAndMaskTimelineFragmentShader = `precision mediump float;

varying vec2 vTexCoord;
uniform vec4 uColor;
uniform sampler2D uSampler;
uniform sampler2D uMask;

void main(){
    vec4 color = texture2D(uSampler, vTexCoord);
    color.a *= uColor.a * texture2D(uMask, vTexCoord).r;
    color.rgb *= color.a;
	gl_FragColor = color;
}`;

class Renderable {
    constructor(base, w, h) {
        this.base = base;
        this.gl = base.gl;
        this.loop = true;
        this.width = w;
        this.height = h;
        this.update = NOOP;
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
        this.buffer[0] *= alpha;
        this.buffer[1] *= alpha;
        this.buffer[2] *= alpha;
        this.buffer[3] *= alpha;
        this.dirty = true;
        return this._buffer;
    }
    static getColor(value) {
        if (value instanceof Color) {
            return value;
        }
        return new Color(value);
    }
}

class Rectangle extends Renderable {
    constructor(base, w, h, c = [1, 1, 1, 1]) {
        super(base, w, h);
        this.program = base.defaultShapeProgram;
        this.color = new Color(c);
        this.bufferInfo = base.defaultBufferInfo;
    }
    draw(matrix, alpha) {
        if (this.base.lastUsedProgram !== this.program) {
            this.base.lastUsedProgram = this.program;
        }
        twgl.setBuffersAndAttributes(this.gl, this.program, this.bufferInfo);
        twgl.setUniforms(this.program, { uColor: this.color.mixAlpha(alpha), uTransMatrix: matrix, uAlpha: alpha });
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}

class Spritesheet {
    constructor(base, data, img) {
        this.base = base;
        this.gl = base.gl;
        this.sprites = {};
        this._texture = null;
        this.src = img;
        let tmp, x, y, w, h;
        for (let i in data) {
            x = data[i].x / img.width;
            w = (data[i].x + data[i].width) / img.width;
            y = data[i].y / img.height;
            h = (data[i].y + data[i].height) / img.height;
            if (x === 0 && y === 0 && w === 1 && h === 1) {
                tmp = base.unitBuffer;
            }
            else {
                tmp = this.gl.createBuffer();
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, tmp);
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
                    x, y,
                    x, h,
                    w, y,
                    w, h
                ]), this.gl.STATIC_DRAW);
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
    get(index) {
        return this.sprites[index];
    }
    get texture() {
        if (this._texture === null) {
            this._texture = this.base.loadTexture(this.src, this);
        }
        else {
            this.base.updateTextureBuffer(this);
        }
        return this._texture;
    }
    getTexture() {
        return this.texture;
    }
    set texture(buffer) {
        this._texture = buffer;
    }
}

function createBufferInfoFromBuffers(gl, buffers, srcBufferInto) {
    let out = {
        numElements: 0,
        attribs: {}
    };
    if (srcBufferInto) {
        for (let i in srcBufferInto.attribs) {
            out.attribs[i] = srcBufferInto.attribs[i];
        }
    }
    for (let i in buffers) {
        out.attribs[i] = {};
        out.attribs[i]['buffer'] = buffers[i];
        out.attribs[i]['numComponents'] = 2;
    }
    return out;
}

class Sprite extends Renderable {
    constructor(base, img, index) {
        if (!(img instanceof Spritesheet)) {
            super(base, img.width, img.height);
            this.bufferInfo = base.defaultSpriteBufferInfo;
            this.getTexture = (() => {
                return this.texture;
            }).bind(this);
        }
        else {
            if (!index) {
                throw new Error('Index is required');
            }
            let sprite = img.get(index);
            super(base, sprite.width, sprite.height);
            this.bufferInfo = createBufferInfoFromBuffers(this.gl, { aTexCoords: sprite.texCoords }, base.defaultBufferInfo);
            this.getTexture = (() => {
                return this.src.getTexture();
            }).bind(this);
            this.padding = { x: sprite.pad_x, y: sprite.pad_y };
        }
        this._texture = null;
        this.src = img;
        this.loop = true;
        this.program = base.defaultSpriteProgram;
    }
    draw(matrix, alpha) {
        if (this.base.lastUsedProgram !== this.program) {
            this.base.lastUsedProgram = this.program;
        }
        if (this.base.lastUsedTexture !== this._texture) {
            this.base.lastUsedTexture = this._texture;
        }
        twgl.setBuffersAndAttributes(this.gl, this.program, this.bufferInfo);
        twgl.setUniforms(this.program, { uSampler: this.getTexture(), uTransMatrix: matrix, uAlpha: alpha });
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
    get texture() {
        if (this._texture === null) {
            this._texture = this.base.loadTexture(this.src, this);
        }
        else {
            this.base.updateTextureBuffer(this);
        }
        return this._texture;
    }
    set texture(value) {
        this._texture = value;
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
                    this.result = document.createElement('img');
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
    constructor(xml = false, maxRetries = 3) {
        this.maxRetries = maxRetries;
        this.downloadQueue = [];
        this.downloaded = [];
        this.errors = [];
        this.loaderDiv = document.getElementById('loader');
        this.xml = xml;
        if (!this.loaderDiv) {
            this.loaderDiv = document.createElement('div');
            this.loaderDiv.style.display = 'none';
            document.body.appendChild(this.loaderDiv);
        }
    }
    download(mode = 0) {
        return new Promise((resolve, reject) => {
            let downloadQueue = mode === 0 ? this.downloadQueue : this.errors;
            this.toDownload = downloadQueue.length;
            if (downloadQueue.length === 0) {
                resolve(this.downloaded);
            }
            for (let element of downloadQueue) {
                if (!this.xml && element.type === 'image') {
                    element.result.onload = () => {
                        this.loaderDiv.appendChild(element.result);
                        this.downloaded.push(element);
                        downloadQueue.splice(downloadQueue.indexOf(element), 1);
                        if (this.isDone()) {
                            resolve(this.downloaded);
                        }
                    };
                    element.result.src = element.src;
                }
                else {
                    let request = new XMLHttpRequest();
                    if (element.type === 'image') {
                        request.responseType = 'blob';
                    }
                    else if (element.type === 'audio') {
                        request.responseType = 'arraybuffer';
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
                                        this.loaderDiv.appendChild(element.result);
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
            this.pushFile(i.id, i.src, i.fileFormat, i.type);
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
                    this.assets[asset.id] = new Sprite(this.base, asset.result);
                    break;
                default:
                    break;
            }
        }
    }
    createSprite(id, name) {
        let sp, k;
        if (typeof name === 'undefined') {
            name = id;
        }
        for (let i in this.spritesheets) {
            if (k = this.spritesheets[i].get(id)) {
                sp = i;
                break;
            }
        }
        if (!sp) {
            throw new Error(`There is no image named "${id}" in spritesheets.`);
        }
        return (this.assets[name] = new Sprite(this.base, this.spritesheets[sp], id));
    }
    createAllSprites() {
        let s;
        for (let i in this.spritesheets) {
            s = this.spritesheets[i];
            for (let id in this.spritesheets[i].sprites) {
                this.assets[id] = new Sprite(this.base, s, id);
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
        this.lastFrameRequest = null;
        this.mainTimeline = null;
        this.resumed = false;
        this.projectionMatrix = createProjection(width, height);
        this.backgroundColor = bgColor;
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
        if (!base.debug) {
            this.debugIntervals = NOOP;
        }
    }
    resume() {
        if (!this.resumed) {
            this.resumed = true;
            this.render();
            this.lastUpdate = performance.now();
            setTimeout(() => {
                this.update();
            }, this.timeToNextUpdate);
        }
    }
    suspend() {
        if (this.resumed) {
            clearInterval(this.updateInterval);
            this.timeToNextUpdate -= performance.now() - this.lastUpdate;
            this.resumed = false;
        }
    }
    play() {
        this.mainTimeline.play();
    }
    pause() {
        this.mainTimeline.pause();
    }
    debugIntervals() {
        if (this.timeToNextUpdate <= 37 || this.timeToNextUpdate >= 43)
            console.log(this.timeToNextUpdate);
    }
    async update() {
        if (this.resumed) {
            this.frameUpdated = true;
            this.lastFrameRequest = requestAnimationFrame(this.render);
            this.timeToNextUpdate = this.timeToNextUpdate - (performance.now() - this.lastUpdate - this.timing);
            setTimeout(this.update, this.timeToNextUpdate);
            this.debugIntervals();
            this.lastUpdate = performance.now();
            this.mainTimeline.update();
        }
    }
    async render() {
        if (!this.mainTimeline) {
            throw new Error("There is nothing to render (mainTimeline isn't set)");
        }
        if (!(this.frameUpdated && this.resumed)) {
            return;
        }
        this.frameUpdated = false;
        this.clear();
        this.mainTimeline.draw(this.projectionMatrix, 1);
    }
    clear() {
        this.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    get frame() {
        return this.mainTimeline.frame;
    }
    set frame(value) {
        this.mainTimeline.frame = value;
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
    constructor(debug = false, width, height, canvas_id, fps = 25, webgl2 = false, bgC = [-1, -1, -1, -1], maxTextureBufferSize = 20) {
        this.canvas = document.getElementById(canvas_id);
        if (this.canvas.nodeName != "CANVAS") {
            this.canvas = document.createElement("canvas");
            this.textCanvas = document.createElement('canvas');
            this.textCanvas.style.display = 'none';
            document.getElementById(canvas_id).appendChild(this.canvas);
            document.getElementById(canvas_id).appendChild(this.textCanvas);
        }
        this.gl = (this.canvas.getContext(webgl2 ? "webgl2" : "webgl", { depth: false }));
        if (!this.gl) {
            console.error(`Brak wsparcia dla ${webgl2 ? "webgl2" : "webgl"}.`);
            return;
        }
        if (debug) {
            this.gl = createDebugGl(this.gl);
        }
        this.debug = debug;
        this.setCanvasSize(width, height);
        this.renderer = new Renderer(this, fps, width, height, bgC instanceof Color ? bgC : new Color(bgC));
        this.projectionMatrixAndSize = computeMatrix(this.renderer.projectionMatrix, new Float32Array(9), { x: 0, y: height }, { x: 1, y: -1 }, width, height, { x: 0, y: 0 }, 0, { x: 0, y: 0 });
        this.gl.frontFace(this.gl.CW);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
        this.defaultShapeProgram = twgl.createProgramInfo(this.gl, [colorShapeVertexShader, colorShapeFragmentShader]);
        this.defaultSpriteProgram = twgl.createProgramInfo(this.gl, [spriteVertexShader, spriteFragmentShader]);
        this.maskProgram = twgl.createProgramInfo(this.gl, [timelineVertexShader, maskTimelineFragmentShader]);
        this.colorProgram = twgl.createProgramInfo(this.gl, [timelineVertexShader, colorTimelineFragmentShader]);
        this.colorAndMaskProgram = twgl.createProgramInfo(this.gl, [timelineVertexShader, colorAndMaskTimelineFragmentShader]);
        this.unitBuffer = twgl.createBufferFromArray(this.gl, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), 'Float32Array');
        this.defaultBufferInfo = createBufferInfoFromBuffers(this.gl, { aPos: this.unitBuffer });
        this.defaultSpriteBufferInfo = createBufferInfoFromBuffers(this.gl, { aPos: this.unitBuffer, aTexCoords: this.unitBuffer });
        this.lastUsedFramebuffer = null;
        this.maxTextureBufferSize = maxTextureBufferSize;
        this.textureBuffers = [];
        this.audioContext = new AudioContext();
    }
    setCanvasSize(width, height) {
		this.canvas.width = width;
		this.textCanvas.width = width;
		this.canvas.height = height;
		this.textCanvas.height = height;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
    get mainTimeline() {
        return this.renderer.mainTimeline;
    }
    set mainTimeline(value) {
        if (value instanceof Timeline) {
            this.renderer.mainTimeline = new TimelineInstance(this, value);
        }
        else if (value instanceof TimelineInstance) {
            this.renderer.mainTimeline = value;
        }
        else {
            return;
        }
    }
    resume() {
        this.renderer.resume();
    }
    suspend() {
        this.renderer.suspend();
    }
    play() {
        this.renderer.play();
    }
    pause() {
        this.renderer.pause();
    }
    get lastUsedProgram() {
        return this._lastUsedProgram;
    }
    set lastUsedProgram(value) {
        this._lastUsedProgram = value;
        this.gl.useProgram(value.program);
    }
    get lastUsedTexture() {
        return this._lastUsedTexture;
    }
    set lastUsedTexture(value) {
        this._lastUsedTexture = value;
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, value);
    }
    get lastUsedFramebuffer() {
        return this._lastUsedFramebuffer;
    }
    set lastUsedFramebuffer(value) {
        this._lastUsedFramebuffer = value;
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, value);
    }
    loadTexture(img, src) {
        let buffer;
        if (this.textureBuffers.length < this.maxTextureBufferSize) {
            buffer = {
                texture: this.gl.createTexture(),
                src: src
            };
            this.gl.bindTexture(this.gl.TEXTURE_2D, buffer.texture);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
        }
        else {
            buffer = this.textureBuffers.shift();
            buffer.src.texture = null;
            buffer.src = src;
            this.gl.bindTexture(this.gl.TEXTURE_2D, buffer.texture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
        }
        this.textureBuffers.push(buffer);
        return buffer.texture;
    }
    updateTextureBuffer(src) {
        let buffer = this.textureBuffers.findIndex(element => {
            return element === src;
        });
        if (buffer !== -1) {
            this.textureBuffers.push(this.textureBuffers.splice(buffer, 1)[0]);
        }
    }
}

// export { AssetLoader, AssetMenager, Base, Color, Data, Element, Item, Linear, NOOP, Rectangle, Renderable, Renderer, Sprite, Spritesheet, Timeframe, TimeframeLayer, Timeline, TimelineInstance, colorAndMaskTimelineFragmentShader, colorShapeFragmentShader, colorShapeVertexShader, colorTimelineFragmentShader, computeMatrix, maskTimelineFragmentShader, projectionMatrix, spriteFragmentShader, spriteVertexShader, timelineVertexShader };
//# sourceMappingURL=Base.js.map
