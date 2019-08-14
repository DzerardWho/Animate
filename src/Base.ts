import { dvs, dfs, dsvs, dsfs } from './Programs'
import { Color } from './Color'
import { Renderer } from './Renderer'
import { Timeline } from './Timeline/Timeline';
import { createDebugGl } from './DebugGl'
import { _Color } from './types';


export class Base {
	canvas: HTMLCanvasElement;
	textCanvas: HTMLCanvasElement;
	gl: WebGLRenderingContext;

	renderer: Renderer;

	defaultShapeProgram: WebGLProgram;
	defaultSpriteProgram: WebGLProgram;
	unitBuffer: WebGLBuffer;

	_lastUsedProgram: WebGLProgram;
	_lastUsedTexture: WebGLTexture;

	debug: boolean;

	constructor(
		debug: boolean = false,
		width: number,
		height: number,
		canvas_id: string,
		fps: number = 25,
		webgl2: boolean = false,
		bgC: _Color | Color = [-1, -1, -1, -1]
	) {
		this.canvas = <HTMLCanvasElement>document.getElementById(canvas_id);
		if (this.canvas.nodeName != "CANVAS") {
			this.canvas = document.createElement("canvas");
			this.textCanvas = document.createElement('canvas');
			this.textCanvas.style.display = 'none';
			document.getElementById(canvas_id).appendChild(this.canvas);
			document.getElementById(canvas_id).appendChild(this.textCanvas);
		}

		this.gl = <WebGLRenderingContext>(
			this.canvas.getContext(webgl2 ? "webgl2" : "webgl", { depth: false })
		);

		if (!this.gl) {
			console.error(`Brak wsparcia dla ${webgl2 ? "webgl2" : "webgl"}.`);
			return;
		}

		if (debug) {
			this.gl = createDebugGl(this.gl);
		}
		this.debug = debug;

		this.setCanvasSize(width, height);
		this.lastUsedProgram = null;

		this.renderer = new Renderer(this, fps, width, height, bgC instanceof Color ? bgC : new Color(bgC));

		this.gl.frontFace(this.gl.CW);
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
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
		]),
		this.gl.STATIC_DRAW)
	}

	setCanvasSize(width, height) {
		this.canvas.width = width;
		this.canvas.height = height;
		this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	}

	compileShader(src: string, type: string) {
		let t: number;
		if (type == "vs") {
			t = this.gl.VERTEX_SHADER;
		} else if (type == "fs") {
			t = this.gl.FRAGMENT_SHADER;
		} else {
			throw new Error("Podano nie prawidłowy typ shader'a");
		}

		let s: WebGLShader = this.gl.createShader(t);

		this.gl.shaderSource(s, src);
		this.gl.compileShader(s);

		if (!this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS)) {
			throw new Error(this.gl.getShaderInfoLog(s));
		}

		return s;
	}

	compileProgram(vs: WebGLShader, fs: WebGLShader) {
		let p: WebGLProgram = this.gl.createProgram();
		this.gl.attachShader(p, vs);
		this.gl.attachShader(p, fs);
		this.gl.linkProgram(p);

		if (!this.gl.getProgramParameter(p, this.gl.LINK_STATUS)) {
			throw new Error(this.gl.getProgramInfoLog(p));
		}

		return p;
	}

	newVertexShader(src: string) {
		try {
			return this.compileShader(src, "vs");
		} catch (e) {
			console.error(e);
			return -1;
		}
	}

	newFragmentShader(src: string) {
		try {
			return this.compileShader(src, "fs");
		} catch (e) {
			console.error(e);
			return -1;
		}
	}

	newProgram(vs: string = dvs, fs: string = dfs) {
		try {
			return this.compileProgram(
				this.newVertexShader(vs),
				this.newFragmentShader(fs)
			);
		} catch (e) {
			console.error(e);
			return -1;
		}
	}

	get mainTimeline() {
		return this.renderer.mainTimeline;
	}

	set mainTimeline(value: Timeline) {
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

	get lastUsedProgram() {
		return this._lastUsedProgram;
	}

	set lastUsedProgram(value: WebGLProgram) {
		this._lastUsedProgram = value;
		this.gl.useProgram(value);
	}

	get lastUsedTexture() {
		return this._lastUsedTexture;
	}

	set lastUsedTexture(value: WebGLTexture) {
		this._lastUsedTexture = value;
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, value);
	}
}
