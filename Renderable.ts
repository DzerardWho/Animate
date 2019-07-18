import { Container } from './Container'
import { vec2, Base } from './Base'

export class Renderable extends Container {
	attribs: Object;
	uniforms: Object;

	shapeBuffer: WebGLBuffer;
	indicesBuffer: WebGLBuffer;
	program: WebGLProgram;

	constructor(
		base: Base,
		x?: number,
		y?: number,
		w?: number,
		h?: number,
		pivot: vec2 = { x: 0, y: 0 }
	) {
		super(base, x, y, w, h, pivot);

		this.shapeBuffer = this.gl.createBuffer();
		this.indicesBuffer = base.defaultIndicesBuffer;
		this.attribs = {};
		this.uniforms = {};
		this.base.objectsToDraw.push(this);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);

		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array([
				0,
				0,
				0,
				this.height,
				this.width,
				0,
				this.width,
				this.height
			]),
			this.gl.STATIC_DRAW
		);
	}
}
