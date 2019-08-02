import { Renderable } from './Renderable'
import { Color } from '../Color'
import { Base } from '../Base'
import { Matrix, _Color } from '../types'

export class Rectangle extends Renderable {
	color: Color;
	loop: boolean;

	constructor(
		base: Base,
		w: number,
		h: number,
		c: _Color = [1, 1, 1, 1]
	) {
		super(base, w, h);
		this.loop = true;
		this.program = base.defaultShapeProgram;

		this.color = new Color(c);

		this.getProgramData([
			// Atribs
			'aPosition'
		],[
			// Uniforms
			'uColor',
			'transMatrix',
		])
	}

	draw(matrix: Matrix, alpha: number) {
		if (this.base.lastUsedProgram !== this.program) {
			this.base.lastUsedProgram = this.program;
			this.gl.useProgram(this.program);
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);
		this.gl.vertexAttribPointer(
			this.attribs['aPosition'],
			2,
			this.gl.FLOAT,
			false,
			2 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
		this.gl.enableVertexAttribArray(this.attribs['aPosition']);
		this.gl.uniform4fv(this.uniforms['uColor'], this.color.mixAlpha(alpha));
		this.gl.uniformMatrix3fv(this.uniforms['transMatrix'], false, matrix);
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}
}
