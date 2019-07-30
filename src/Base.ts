import { dvs, dfs, dsvs, dsfs } from './Programs'
import { Color, _Color } from './Color'
import { Timeline } from './Timeline'
import { projectionMatrix, Matrix } from './Matrix'
import { WebGLDebugUtils } from './../webgl-debug'

// Rysować do canvasu tylko wtedy, gdy bedzie 'frame' się zwiększy
export interface vec2 {
	x: number;
	y: number;
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
    validateNoneOfTheArgsAreUndefined (functionName, args);
 }

 function throwOnGLError(err, funcName, args) {
    throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
  };

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
	frame: number;

	constructor(
		width: number,
		height: number,
		canvas_id: string,
		debug: boolean = false,
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

		if (debug){
			this.gl = WebGLDebugUtils.makeDebugContext(this.gl, throwOnGLError, logAndValidate);
		}

		this.projectionMatrix = new Float32Array(9);
		this.setCanvasSize(width, height);
		this.lastUsedProgram = null;
		this.mainScene = null;
		this.frame = 0;

		if (bgC instanceof Color) {
			this.backgroundColor = bgC;
		} else {
			this.backgroundColor = new Color(bgC);
		}

		this.clear();

		this.gl.frontFace(this.gl.CW);
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

		this.defaultShapeProgram = this.newProgram();
		this.defaultSpriteProgram = this.newProgram(dsvs, dsfs);
	}

	play(){
		if (typeof this.mainScene == undefined){
			return;
		}
		this.clear();
		this.mainScene.draw(this.projectionMatrix, this.frame);
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
