import { vec2, Base } from './Base'
import { Instance } from './_Instance';

export class Renderable {
	transformationPoint: vec2;

	attribs: Object;
	uniforms: Object;
	instances: Array<Instance>;

	shapeBuffer: WebGLBuffer;
	indicesBuffer: WebGLBuffer;
	program: WebGLProgram;
	worldMatrix: Float32Array;
	gl: WebGLRenderingContext;
	base: Base;


	constructor(
		base: Base,
		w?: number,
		h?: number,
		transformationPoint: vec2 = { x: 0, y: 0 }
	) {
		this.base = base;
		this.gl = base.gl;

		this.transformationPoint = { x: transformationPoint.x, y: transformationPoint.y };
		this.instances = [];

		this.shapeBuffer = this.gl.createBuffer();
		this.indicesBuffer = base.defaultIndicesBuffer;
		this.attribs = {};
		this.uniforms = {};
		this.base.objectsToDraw.push(this);

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

	createInstance(){
		return new Instance(this)
	}
}
