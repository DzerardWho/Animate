import { Base } from '../Base'
import { vec2 } from '../types';
// import { ProgramInfo, BufferInfo } from '../twgl.js/dist/4.x/twgl';
import { NOOP } from '../NOOP';

export class Renderable {
	unitBuffer: WebGLBuffer;
	bufferInfo: BufferInfo;
	program: ProgramInfo;
	gl: WebGLRenderingContext;
	base: Base;
	loop: boolean;
	width: number;
	height: number;
	
	padding: vec2;

	update: () => void;

	constructor(
		base: Base,
		w: number,
		h: number
	) {
		this.base = base;
		this.gl = base.gl;
		this.loop = true;
		// this.unitBuffer = base.unitBuffer;

		this.width = w;
		this.height = h;

		this.update = NOOP;
	}
}
