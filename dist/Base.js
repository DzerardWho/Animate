const degToRad = Math.PI / 180;
function computeMatrix(_in, out, pos, scale, trans, angle) {
    let [a, b, , d, e, , g, h] = _in;
    let x = pos.x, y = pos.y, px = trans.x, py = trans.y, sx = scale.x, sy = scale.y;
    angle *= degToRad;
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
function createProjection(width, height) {
    return new Float32Array([
        2 / width,
        0,
        0,
        0,
        -2 / height,
        0,
        -1,
        1,
        1
    ]);
}
function identity() {
    return new Float32Array([
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ]);
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

function Linear(a) {
    return a;
}

class Data {
    constructor(data) {
        if (!data) {
            return this;
        }
        this.pos = { x: 0, y: 0 };
        if (data.pos) {
            if (data.pos.x) {
                this.pos.x = data.pos.x;
            }
            if (data.pos.y) {
                this.pos.y = data.pos.y;
            }
        }
        this.angle = typeof data.angle === 'undefined' ? 0 : data.angle;
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
        this.alpha = typeof data.alpha === 'undefined' ? 1 : data.alpha;
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
            console.log('element');
            return;
        }
        computeMatrix(parentMatrix, this.transMatrix, data.pos, data.scale, data.transformationPoint, data.angle);
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
    constructor(loop = false) {
        this.loop = loop;
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
        if (layer > this.layers.length - 1) {
            throw "Layer out of range";
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
        else {
            console.log('timeline');
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
        this.loop = true;
        this.program = base.defaultShapeProgram;
        this.color = new Color(c);
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
            this.gl.useProgram(this.program);
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);
        this.gl.vertexAttribPointer(this.attribs['aPosition'], 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(this.attribs['aPosition']);
        this.gl.uniform4fv(this.uniforms['uColor'], this.color.mixAlpha(alpha));
        this.gl.uniformMatrix3fv(this.uniforms['transMatrix'], false, matrix);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}

class SpritesheetLoader {
    constructor(manifestPath, fileLocation = '/', callback) {
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
                for (let i of fileLoader.getItems(false)) {
                    this.files[i.item.id] = i.result;
                }
                this.loadComplete = true;
                if (typeof callback === 'function') {
                    callback();
                }
            });
            fileLoader.load();
        });
        this.manifestLoader.load();
    }
    generateSpritesheets(base) {
        if (!this.loadComplete) {
            return;
        }
        let t = {};
        for (let i in this.files) {
            t[i.replace('.png', '')] = new Spritesheet(base, this.manifest[i], this.files[i]);
        }
        return t;
    }
}
class Spritesheet {
    constructor(base, data, img) {
        this.gl = base.gl;
        this.sprites = [];
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
            this.sprites[i] = {
                texCoords: tmp,
                source: this,
                width: data[i].width,
                height: data[i].height
            };
        }
        tmp = null;
    }
    get(index) {
        return this.sprites[index];
    }
}

class Sprite extends Renderable {
    constructor(base, img, index) {
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
                throw 'Index is required';
            }
            let sprite = img.get(index);
            super(base, sprite.width, sprite.height);
            this.textureCoords = sprite.texCoords;
            this.texture = sprite.source.texture;
        }
        this.loop = true;
        this.program = base.defaultSpriteProgram;
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
            this.gl.useProgram(this.program);
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoords);
        this.gl.vertexAttribPointer(this.attribs["aTextureCoords"], 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(this.attribs["aTextureCoords"]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);
        this.gl.vertexAttribPointer(this.attribs['aPosition'], 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
        this.gl.enableVertexAttribArray(this.attribs['aPosition']);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.uniform1i(this.uniforms['sampler'], 0);
        this.gl.uniformMatrix3fv(this.uniforms['transMatrix'], false, matrix);
        this.gl.uniform1f(this.uniforms['alpha'], alpha);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}

class Renderer {
    constructor(base, fps, width, height, bgColor) {
        if (fps <= 0) {
            throw "Fps must be a positive number";
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
            throw "There is nothing to render (mainTimeline isn't set)";
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
            document.getElementById(canvas_id).appendChild(this.canvas);
        }
        this.gl = (this.canvas.getContext(webgl2 ? "webgl2" : "webgl"));
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
        this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        this.defaultShapeProgram = this.newProgram();
        this.defaultSpriteProgram = this.newProgram(dsvs, dsfs);
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
}

// export { Base, Color, Data, Element, Linear, Rectangle, Renderable, Sprite, Spritesheet, SpritesheetLoader, Timeframe, TimeframeLayer, Timeline, computeMatrix, dfs, dsfs, dsvs, dvs, projectionMatrix };
//# sourceMappingURL=Base.js.map
