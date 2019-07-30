import { vec2, Base } from './Base'

export class Renderable {
	attribs: Object;
	uniforms: Object;

	shapeBuffer: WebGLBuffer;
	program: WebGLProgram;
	gl: WebGLRenderingContext;
	base: Base;

	constructor(
		base: Base,
		w: number,
		h: number
	) {
		this.base = base;
		this.gl = base.gl;

		this.shapeBuffer = this.gl.createBuffer();
		this.attribs = {};
		this.uniforms = {};

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);

		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array([
				0, 0,
				0, h,
				w, 0,
				w, h
			]),
			this.gl.STATIC_DRAW
		);
	}
}
