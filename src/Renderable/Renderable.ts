import { Base } from '../Base'
import { vec2 } from '../types';

export class Renderable {
	attribs: Object;
	uniforms: Object;

	// shapeBuffer: WebGLBuffer;
	unitBuffer: WebGLBuffer;
	program: WebGLProgram;
	gl: WebGLRenderingContext;
	base: Base;
	hasTransparency: boolean;
	loop: boolean;
	width: number;
	height: number;
	
	padding: vec2;

	constructor(
		base: Base,
		w: number,
		h: number
	) {
		this.base = base;
		this.gl = base.gl;
		this.loop = true;
		this.unitBuffer = base.unitBuffer;

		// this.shapeBuffer = this.gl.createBuffer();
		this.attribs = {};
		this.uniforms = {};
		this.width = w;
		this.height = h;

		// this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);

		// this.gl.bufferData(
		// 	this.gl.ARRAY_BUFFER,
		// 	new Float32Array([
		// 		0, 0,
		// 		0, h,
		// 		w, 0,
		// 		w, h
		// 	]),
		// 	this.gl.STATIC_DRAW
		// );
	}

	getProgramData(attribs: Array<string>, uniforms: Array<string>){
		if (!this.program){
			return;
		}
		for (let i of attribs){
			this.attribs[i] = this.gl.getAttribLocation(
				this.program,
				i
			);
		}
		for (let i of uniforms){
			this.uniforms[i] = this.gl.getUniformLocation(
				this.program,
				i
			);
		}
	}
}
