import { Base } from '../Base'
import { vec2 } from '../types';
// import { ProgramInfo, BufferInfo } from '../twgl.js/dist/4.x/twgl';
import { NOOP } from '../NOOP';
import { TimelineObject } from '../Timeline/TimelineObject'

export class Renderable extends TimelineObject {
	unitBuffer: WebGLBuffer;
	bufferInfo: BufferInfo;
	program: ProgramInfo;
	gl: WebGLRenderingContext;
	base: Base;
	
	constructor(
		base: Base,
		w: number,
		h: number
	) {
		super();
		this.base = base;
		this.gl = base.gl;
		this.loop = true;
		// this.unitBuffer = base.unitBuffer;

		this.width = w;
		this.height = h;

		this.update = NOOP;
	}
}
