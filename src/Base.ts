import { colorShapeVertexShader, colorShapeFragmentShader, spriteVertexShader, spriteFragmentShader, colorAndMaskTimelineFragmentShader, maskTimelineFragmentShader, colorTimelineFragmentShader, timelineVertexShader } from './Programs'
import { Color } from './Color'
import { Renderer } from './Renderer'
import { Timeline } from './Timeline/Timeline';
import { createDebugGl } from './DebugGl'
import { _Color, Matrix } from './types';
import { computeMatrix } from './Matrix';
import { createBufferInfoFromBuffers } from './BufferInfo'
import { Spritesheet } from './AssetManagement/Spritesheet';
import { Sprite } from './Renderable/Sprite';
import { TimelineInstance } from './Timeline/TimelineInstance';
// import * as twgl from './twgl.js/dist/4.x/twgl';

interface TextureBuffer {
	texture: WebGLTexture;
	src: Spritesheet | Sprite;
}

export class Base {
	canvas: HTMLCanvasElement;
	textCanvas: HTMLCanvasElement;
	textCtx: CanvasRenderingContext2D;
	gl: WebGLRenderingContext;

	renderer: Renderer;

	unitBuffer: WebGLBuffer;

	_lastUsedProgram: twgl.ProgramInfo;
	_lastUsedTexture: WebGLTexture;
	_lastUsedFramebuffer: WebGLFramebuffer;

	projectionMatrixAndSize: Matrix;

	debug: boolean;

	defaultShapeProgram: twgl.ProgramInfo;
	defaultSpriteProgram: twgl.ProgramInfo;
	maskProgram: twgl.ProgramInfo;
	colorProgram: twgl.ProgramInfo;
	colorAndMaskProgram: twgl.ProgramInfo;

	defaultBufferInfo: twgl.BufferInfo;
	defaultSpriteBufferInfo: twgl.BufferInfo;

	audioContext: AudioContext;

	textureBuffers: Array<TextureBuffer>;
	maxTextureBufferSize: number;


	constructor(
		debug: boolean = false,
		width: number,
		height: number,
		canvas_id: string,
		fps: number = 25,
		webgl2: boolean = false,
		bgC: _Color | Color = [-1, -1, -1, -1],
		maxTextureBufferSize: number = 20
	) {
		this.canvas = <HTMLCanvasElement>document.getElementById(canvas_id);
		if (this.canvas.nodeName != "CANVAS") {
			this.canvas = document.createElement("canvas");
			this.textCanvas = document.createElement('canvas');
			this.textCtx = this.textCanvas.getContext("2d");
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

		this.renderer = new Renderer(this, fps, width, height, bgC instanceof Color ? bgC : new Color(bgC));
		this.projectionMatrixAndSize = computeMatrix(this.renderer.projectionMatrix, new Float32Array(9), {x: 0, y: height}, {x: 1, y: -1}, width, height, {x: 0, y: 0}, 0, {x: 0, y: 0});

		this.gl.frontFace(this.gl.CW);
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);

		this.defaultShapeProgram = twgl.createProgramInfo(this.gl, [colorShapeVertexShader, colorShapeFragmentShader])
		this.defaultSpriteProgram = twgl.createProgramInfo(this.gl, [spriteVertexShader, spriteFragmentShader]);
		this.maskProgram = twgl.createProgramInfo(this.gl, [timelineVertexShader, maskTimelineFragmentShader])
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

	set mainTimeline(value: Timeline | TimelineInstance) {
		if (value instanceof Timeline) {
			this.renderer.mainTimeline = new TimelineInstance(this, value);
		} else if (value instanceof TimelineInstance) {
			this.renderer.mainTimeline = value;
		} else {
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

	set lastUsedProgram(value: twgl.ProgramInfo) {
		this._lastUsedProgram = value;
		this.gl.useProgram(value.program);
	}

	get lastUsedTexture() {
		return this._lastUsedTexture;
	}

	set lastUsedTexture(value: WebGLTexture) {
		this._lastUsedTexture = value;
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, value);
	}

	get lastUsedFramebuffer() {
		return this._lastUsedFramebuffer;
	}

	set lastUsedFramebuffer(value: WebGLFramebuffer) {
		this._lastUsedFramebuffer = value;
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, value);
	}

	bindTexture(texture: WebGLTexture) {
		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
	}

	setupTexture(texture: WebGLTexture) {
		this.bindTexture(texture);
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
			this.gl.NEAREST
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MAG_FILTER,
			this.gl.NEAREST
		);
	}

	uploadTexture(texture: WebGLTexture, src: ImageData | HTMLImageElement | HTMLCanvasElement) {
		this.bindTexture(texture);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.RGBA,
			this.gl.RGBA,
			this.gl.UNSIGNED_BYTE,
			src
		);
	}

	loadTexture(img: ImageData | HTMLImageElement, src: Spritesheet | Sprite): WebGLTexture {
		let buffer: TextureBuffer;
		if (this.textureBuffers.length < this.maxTextureBufferSize) {
			buffer = {
				texture: this.gl.createTexture(),
				src: src
			}

			this.setupTexture(buffer.texture);
		} else {
			buffer = this.textureBuffers.shift();
			buffer.src.texture = null;
			buffer.src = src;
		}
		this.uploadTexture(buffer.texture, img);
		this.textureBuffers.push(buffer);
		return buffer.texture;
	}

	updateTextureBuffer(src: Spritesheet | Sprite) {
		let buffer = this.textureBuffers.findIndex(element => {
			return element === src;
		})
		if (buffer !== -1) {
			this.textureBuffers.push(this.textureBuffers.splice(buffer, 1)[0]);
		}
	}

	setupTextCanvas(width: number, height: number) {
		this.textCanvas.width = width;
		this.textCanvas.height = height;
		this.textCtx.clearRect(0, 0, width, height);
	}
}
