import { dvs, dfs, dsvs, dsfs } from './Programs'
import { Renderable } from './Renderable'
import { Rectangle } from './Rectangle'
import { Sprite } from './Sprite'
import { Color, _Color } from './Color'
import { Timeline } from './Timeline'
import { createProjection, projectionMatrix, Matrix } from './Matrix'

// TODO: Timeline ???
// Rysować do canvasu tylko wtedy, gdy bedzie 'frame' się zwiększy
export interface vec2 {
	x: number;
	y: number;
}

export class Base {
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

	constructor(
		width: number,
		height: number,
		canvas_id: string,
		bgC: _Color | Color = [-1, -1, -1, -1],
		webgl2: boolean = false,
		fps: number = 25
	) {
		this.canvas = <HTMLCanvasElement>document.getElementById(canvas_id);
		if (this.canvas.nodeName != "CANVAS") {
			this.canvas = document.createElement("canvas");
			document.getElementById(canvas_id).appendChild(this.canvas);
		}

		this.gl = <WebGLRenderingContext>(
			this.canvas.getContext(webgl2 ? "webgl2" : "webgl")
		);

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
		} else {
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

	play(){
		if (typeof this.mainScene == undefined){
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

	clear() {
		this.gl.clearColor(
			this.backgroundColor.r,
			this.backgroundColor.g,
			this.backgroundColor.b,
			this.backgroundColor.a
		);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}
}
