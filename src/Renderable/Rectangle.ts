import { Renderable } from './Renderable'
import { Color } from '../Color'
import { Base } from '../Base'
import { Matrix, _Color } from '../types'
// import { setBuffersAndAttributes, setUniforms } from '../twgl.js/dist/4.x/twgl';

export class Rectangle extends Renderable {
	color: Color;

	constructor(
		base: Base,
		w: number,
		h: number,
		c: _Color = [1, 1, 1, 1]
	) {
		super(base, w, h);
		this.program = base.defaultShapeProgram;
		
		this.color = new Color(c);
		this.bufferInfo = base.defaultBufferInfo;
	}

	draw(matrix: Matrix, alpha: number) {
		if (this.base.lastUsedProgram !== this.program) {
			this.base.lastUsedProgram = this.program;
		}

		twgl.setBuffersAndAttributes(this.gl, this.program, this.bufferInfo);
		twgl.setUniforms(this.program, {uColor: this.color.mixAlpha(alpha), uTransMatrix: matrix, uAlpha: alpha})
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}
}
