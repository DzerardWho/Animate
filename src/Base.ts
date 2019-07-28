// import * as glMatrix from "gl-matrix";
import { dvs, dfs, dsvs, dsfs } from './Programs'
import { Container } from './Container'
// import { Instance, instance } from './Instance'
import { Instance } from './_Instance'
import { Renderable } from './Renderable'
import { Rectangle } from './Rectangle'
import { Sprite } from './Sprite'
import { Color, _Color } from './Color'
import { Symbol } from './Symbol'

// TODO: Timeline ???

export interface vec2 {
	x: number;
	y: number;
}

export class Base {
	canvas: HTMLCanvasElement;
	gl: WebGLRenderingContext;

	scene: Container;
	sceneInstance: Instance;
	backgroundColor: Color;

	defaultShapeProgram: WebGLProgram;
	defaultSpriteProgram: WebGLProgram;
	defaultIndicesBuffer: WebGLBuffer;
	indices: Uint16Array;

	projectionMatrix: Float32Array;

	objectsToDraw: Array<any | Instance>;
	symbols: Array<Container | Renderable | Rectangle | Sprite | Symbol>;
	renderQueue: Array<Instance>;

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

		this.objectsToDraw = [];
		this.symbols = [];
		this.renderQueue = [];
		this.scene = new Container(this, 0, 0, 1, 1);
		// this.sceneInstance = new Instance(this.scene);

		// this.defaultIndicesBuffer = this.gl.createBuffer();
		// this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.defaultIndicesBuffer);

		// this.gl.bufferData(
		// 	this.gl.ELEMENT_ARRAY_BUFFER,
		// 	new Uint16Array([0, 1, 2, 2, 1, 3]),
		// 	this.gl.STATIC_DRAW
		// );

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
			} else if (child.texture) {
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, child.textureCoords);
				this.gl.vertexAttribPointer(
					child.attribs.textureCoords,
					2,
					this.gl.FLOAT,
					false,
					2 * Float32Array.BYTES_PER_ELEMENT,
					0
				);
				this.gl.enableVertexAttribArray(child.attribs.textureCoords);

				this.gl.activeTexture(this.gl.TEXTURE0);
				this.gl.bindTexture(this.gl.TEXTURE_2D, child.texture);
				this.gl.uniform1i(child.uniforms.sampler, 0);
			}
			this.gl.bindBuffer(child.gl.ARRAY_BUFFER, child.shapeBuffer);
			this.gl.vertexAttribPointer(
				child.attribs.position,
				2,
				this.gl.FLOAT,
				false,
				2 * Float32Array.BYTES_PER_ELEMENT,
				0
			);
			this.gl.enableVertexAttribArray(child.attribs.position);
			this.gl.uniformMatrix3fv(
				child.uniforms.mProj,
				false,
				this.projectionMatrix
			);
			this.gl.uniformMatrix3fv(child.uniforms.mWorld, false, child.worldMatrix);
			this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
		}
	}

	draw() {
		this.clear();
		// this.scene.updateWorldMatrix();
		this.sceneInstance.updateWorldMatrix();
		let lastProgram = null;

		for (let item of this.renderQueue){
			// if (!item.isChild){
			// 	item.updateWorldMatrix();
			// }
			if (!item.visible || !item.source.program){
				continue;
			}
			if (lastProgram !== item.source.program){
				lastProgram = item.source.program;
				this.gl.useProgram(lastProgram);
			}
			
			if (item.source.color){
				this.gl.uniform4fv(item.source.uniforms.uColor, item.source.color.buffer);
			}else if (item.source.texture){
				this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.source.textureCoords);
				this.gl.vertexAttribPointer(
					item.source.attribs.textureCoords,
					2,
					this.gl.FLOAT,
					false,
					2 * Float32Array.BYTES_PER_ELEMENT,
					0
				);
				this.gl.enableVertexAttribArray(item.source.attribs.textureCoords);
				this.gl.activeTexture(this.gl.TEXTURE0);
				this.gl.bindTexture(this.gl.TEXTURE_2D, item.source.texture);
				this.gl.uniform1i(item.source.uniforms.sampler, 0);
			}
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.source.shapeBuffer);
			this.gl.vertexAttribPointer(
				item.source.attribs.position,
				2,
				this.gl.FLOAT,
				false,
				2 * Float32Array.BYTES_PER_ELEMENT,
				0
			);
			this.gl.enableVertexAttribArray(item.source.attribs.position);
			this.gl.uniformMatrix3fv(
				item.source.uniforms.mProj,
				false,
				this.projectionMatrix
			);
			this.gl.uniformMatrix3fv(
				item.source.uniforms.mWorld,
				false,
				item.worldMatrix
			);
			this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
			// this.gl.drawElements(this.gl.TRIANGLE_STRIP, 4, this.gl.UNSIGNED_SHORT, 0);
		}
	}

	createSceneInstance(){
		this.sceneInstance = new Instance(this.scene);
	}

	finishInit(){
		this.sceneInstance = new Instance(this.scene);
		this.scene.children.forEach(child => {
			// child.init();
		});
	}

	setCanvasSize(width, height) {
		this.canvas.width = width;
		this.canvas.height = height;
		this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
		glMatrix.mat3.projection(this.projectionMatrix, width, height);
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
