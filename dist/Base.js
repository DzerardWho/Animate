const dvs = `precision mediump float;

attribute vec2 aPosition;

uniform mat3 mWorld;
uniform mat3 mProj;

void main(){
    gl_Position = vec4((mWorld * vec3(aPosition, 1)).xy, 0, 1);
}`;
const dfs = `precision mediump float;

uniform vec4 uColor;

void main(){
    gl_FragColor = uColor;
}`;
const dsvs = `precision mediump float;

attribute vec2 aPosition;
attribute vec2 aTextureCoords;

uniform mat3 mWorld;
uniform mat3 mProj;

varying vec2 f_texCoord;

void main(){
	f_texCoord = aTextureCoords;
    gl_Position = vec4((mWorld * vec3(aPosition, 1)).xy, 0, 1);
}`;
const dsfs = `precision mediump float;

varying vec2 f_texCoord;
uniform sampler2D sampler;

void main(){
	gl_FragColor = texture2D(sampler, f_texCoord);
}`;

class Container {
    constructor(base, x, y, w, h, transformationPoint = { x: 0, y: 0 }) {
        this.children = [];
        this.program = null;
        this.color = null;
        this.localMatrix = glMatrix.mat3.identity(new Float32Array(9));
        this.worldMatrix = glMatrix.mat3.identity(new Float32Array(9));
        this.base = base;
        this.gl = base.gl;
        this.x = x;
        this.y = y;
        this.og_width = w;
        this.og_height = h;
        this.width = this.og_width;
        this.height = this.og_height;
        this.angle = 0;
        this.scale = { x: 1, y: 1 };
        this.instances = [];
        this.transformationPoint = { x: transformationPoint["x"], y: transformationPoint["y"] };
        this.base.symbols.push(this);
    }
    addChild(child, createInstance = false) {
        if (!child) {
            return;
        }
        if (child.parent) {
            let ndx = child.parent.children.indexOf(child.source);
            if (ndx >= 0) {
                child.parent.children.splice(ndx, 1);
            }
        }
        child.parent = this;
        this.children.push(child);
        if (createInstance) {
            this.instances.forEach(instance => {
                instance.addChild(child);
            });
        }
    }
    setParent(parent) {
        if (this.parent) {
            let ndx = this.parent.children.indexOf(this);
            if (ndx >= 0) {
                this.parent.children.splice(ndx, 1);
            }
        }
        if (parent) {
            parent.children.push(this);
        }
        this.parent = parent;
    }
    updateWorldMatrix() {
        this.instances.forEach(instance => {
            instance.updateWorldMatrix();
        });
    }
    moveTo(x, y) {
        glMatrix.mat3.translate(this.worldMatrix, this.worldMatrix, [x, y]);
    }
    scaleAndRotate() {
        this.moveTo(this.transformationPoint["x"], this.transformationPoint["y"]);
        glMatrix.mat3.scale(this.worldMatrix, this.worldMatrix, [
            this.scale.x,
            this.scale.y
        ]);
        glMatrix.mat3.rotate(this.worldMatrix, this.worldMatrix, this.angle);
        this.moveTo(-this.transformationPoint["x"], -this.transformationPoint["y"]);
    }
    get angle() {
        return this._angle;
    }
    set angle(a) {
        this._angle = glMatrix.glMatrix.toRadian(a);
    }
}

class Instance {
    constructor(source, isChild = false) {
        this.source = source;
        this.visible = true;
        this.x = source.x;
        this.y = source.y;
        this.angle = source.angle;
        this.scale = source.scale;
        this.transformationPoint = source.transformationPoint;
        this.children = [];
        // this.localMatrix = new Float32Array(9);
        this.worldMatrix = new Float32Array(9);
        this.buffer = source.gl.createFramebuffer();
        this.isChild = isChild;
        this.source.base.renderQueue.push(this);
        source.children.forEach(child => {
            this.children.push(new Instance(child, true));
        });
        source.instances.push(this);
    }
    updateWorldMatrix(parentWorldMatrix) {
        // glMatrix.mat3.fromTranslation(this.worldMatrix, [this.x, this.y]);
        // this.scaleAndRotate();
        if (parentWorldMatrix) {
            glMatrix.mat3.copy(this.worldMatrix, parentWorldMatrix);
            // glMatrix.mat3.multiply(this.worldMatrix, parentWorldMatrix, this.worldMatrix);
        }
        this.moveTo(this.x, this.y);
        this.scaleAndRotate();
        let worldMatrix = this.worldMatrix;
        this.children.forEach(child => {
            child.updateWorldMatrix(worldMatrix);
        });
    }
    moveTo(x, y) {
        glMatrix.mat3.translate(this.worldMatrix, this.worldMatrix, [x, y]);
    }
    scaleAndRotate() {
        // this.moveTo(this.transformationPoint["x"], this.transformationPoint["y"]);
        glMatrix.mat3.scale(this.worldMatrix, this.worldMatrix, [
            this.scale.x,
            this.scale.y
        ]);
        glMatrix.mat3.rotate(this.worldMatrix, this.worldMatrix, this.angle);
        // this.moveTo(-this.transformationPoint["x"], -this.transformationPoint["y"]);
    }
    addChild(child) {
        this.children.push(new Instance(child, true));
    }
}

class Renderable extends Container {
    constructor(base, x, y, w, h, transformationPoint = { x: 0, y: 0 }) {
        super(base, x, y, w, h, transformationPoint);
        this.shapeBuffer = this.gl.createBuffer();
        this.indicesBuffer = base.defaultIndicesBuffer;
        this.attribs = {};
        this.uniforms = {};
        this.base.objectsToDraw.push(this);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            0,
            0,
            0,
            this.height,
            this.width,
            0,
            this.width,
            this.height
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
    constructor(base, x, y, w, h, c = [1, 1, 1, 1]) {
        super(base, x, y, w, h);
        this.program = base.defaultShapeProgram;
        this.color = new Color(c);
        this.attribs["aPosition"] = this.gl.getAttribLocation(this.program, "aPosition");
        this.gl.enableVertexAttribArray(this.attribs["aPosition"]);
        this.uniforms["uColor"] = this.gl.getUniformLocation(this.program, "uColor");
        this.uniforms["mWorld"] = this.gl.getUniformLocation(this.program, "mWorld");
        this.uniforms["mProj"] = this.gl.getUniformLocation(this.program, "mProj");
    }
}

class Sprite extends Renderable {
    constructor(base, img, x, y) {
        super(base, x, y, img.width, img.height);
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
        this.uniforms["mWorld"] = this.gl.getUniformLocation(this.program, "mWorld");
        this.uniforms["mProj"] = this.gl.getUniformLocation(this.program, "mProj");
        this.uniforms["sampler"] = this.gl.getUniformLocation(this.program, "sampler");
    }
}

// import * as glMatrix from "gl-matrix";
class Base {
    constructor(width, height, canvas_id, bgC = [-1, -1, -1, -1], webgl2 = false) {
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
        this.objectsToDraw = [];
        this.symbols = [];
        this.renderQueue = [];
        this.scene = new Container(this, 0, 0, 1, 1);
        // this.sceneInstance = new Instance(this.scene);
        this.defaultIndicesBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.defaultIndicesBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 2, 1, 3]), this.gl.STATIC_DRAW);
        this.defaultShapeProgram = this.newProgram();
        this.defaultSpriteProgram = this.newProgram(dsvs, dsfs);
        // this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW);
    }
    oldDraw() {
        this.clear();
        this.scene.updateWorldMatrix();
        let lastProgram = null;
        let child;
        for (let i = 0; i < this.objectsToDraw.length; ++i) {
            child = this.objectsToDraw[i];
            if (child.program !== lastProgram) {
                lastProgram = child.program;
                this.gl.useProgram(lastProgram);
            }
            if (child.color) {
                this.gl.uniform4fv(child.uniforms.uColor, child.color.buffer);
            }
            else if (child.texture) {
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, child.textureCoords);
                this.gl.vertexAttribPointer(child.attribs.textureCoords, 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
                this.gl.enableVertexAttribArray(child.attribs.textureCoords);
                this.gl.activeTexture(this.gl.TEXTURE0);
                this.gl.bindTexture(this.gl.TEXTURE_2D, child.texture);
                this.gl.uniform1i(child.uniforms.sampler, 0);
            }
            this.gl.bindBuffer(child.gl.ARRAY_BUFFER, child.shapeBuffer);
            this.gl.vertexAttribPointer(child.attribs.position, 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.gl.enableVertexAttribArray(child.attribs.position);
            this.gl.uniformMatrix3fv(child.uniforms.mProj, false, this.projectionMatrix);
            this.gl.uniformMatrix3fv(child.uniforms.mWorld, false, child.worldMatrix);
            this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
        }
    }
    draw() {
        this.clear();
        // this.scene.updateWorldMatrix();
        this.sceneInstance.updateWorldMatrix(this.projectionMatrix);
        let lastProgram = null;
        for (let item of this.renderQueue) {
            // if (!item.isChild){
            // 	item.updateWorldMatrix();
            // }
            if (!item.visible || !item.source.program) {
                continue;
            }
            if (lastProgram !== item.source.program) {
                lastProgram = item.source.program;
                this.gl.useProgram(lastProgram);
            }
            if (item.source.color) {
                this.gl.uniform4fv(item.source.uniforms.uColor, item.source.color.buffer);
            }
            else if (item.source.texture) {
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.source.textureCoords);
                this.gl.vertexAttribPointer(item.source.attribs.textureCoords, 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
                this.gl.enableVertexAttribArray(item.source.attribs.textureCoords);
                this.gl.activeTexture(0);
                this.gl.bindTexture(this.gl.TEXTURE_2D, item.source.texture);
                this.gl.uniform1i(item.source.uniforms.sampler, 0);
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.source.shapeBuffer);
            this.gl.vertexAttribPointer(item.source.attribs.position, 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.gl.enableVertexAttribArray(item.source.attribs.position);
            this.gl.uniformMatrix3fv(item.source.uniforms.mProj, false, this.projectionMatrix);
            this.gl.uniformMatrix3fv(item.source.uniforms.mWorld, false, item.worldMatrix);
            this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
        }
    }
    _draw() {
        this.clear();
        // this.scene.updateWorldMatrix();
        // this.sceneInstance.updateWorldMatrix();
        let lastProgram = null;
        for (let item of this.renderQueue) {
            // if (!item.isChild){
            // 	item.updateWorldMatrix();
            // }
            if (!item.visible || !item.source.program) {
                continue;
            }
            if (lastProgram !== item.source.program) {
                lastProgram = item.source.program;
                this.gl.useProgram(lastProgram);
            }
            if (item.source.color) {
                this.gl.uniform4fv(item.source.uniforms.uColor, item.source.color.buffer);
            }
            else if (item.source.texture) {
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.source.textureCoords);
                this.gl.vertexAttribPointer(item.source.attribs.textureCoords, 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
                this.gl.enableVertexAttribArray(item.source.attribs.textureCoords);
                this.gl.activeTexture(0);
                this.gl.bindTexture(this.gl.TEXTURE_2D, item.source.texture);
                this.gl.uniform1i(item.source.uniforms.sampler, 0);
            }
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.source.shapeBuffer);
            this.gl.vertexAttribPointer(item.source.attribs.position, 2, this.gl.FLOAT, false, 2 * Float32Array.BYTES_PER_ELEMENT, 0);
            this.gl.enableVertexAttribArray(item.source.attribs.position);
            this.gl.uniformMatrix3fv(item.source.uniforms.mProj, false, this.projectionMatrix);
            this.gl.uniformMatrix3fv(item.source.uniforms.mWorld, false, item.worldMatrix);
            this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
            this.gl.flush();
        }
    }
    createSceneInstance() {
        this.sceneInstance = new Instance(this.scene);
    }
    setCanvasSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        glMatrix.mat3.projection(this.projectionMatrix, width, height);
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
