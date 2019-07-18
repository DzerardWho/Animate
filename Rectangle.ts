import { Renderable } from './Renderable'
import { Color, _Color } from './Color'
import { Base } from './Base'

export class Rectangle extends Renderable {
	color: Color;

	constructor(
		base: Base,
		x: number,
		y: number,
		w: number,
		h: number,
		c: _Color = [1, 1, 1, 1]
	) {
		super(base, x, y, w, h);
		this.program = base.defaultShapeProgram;

		this.color = new Color(c);
		this.attribs["aPosition"] = this.gl.getAttribLocation(
			this.program,
			"aPosition"
		);
		this.gl.enableVertexAttribArray(this.attribs["aPosition"]);
		this.uniforms["uColor"] = this.gl.getUniformLocation(
			this.program,
			"uColor"
		);
		this.uniforms["mWorld"] = this.gl.getUniformLocation(
			this.program,
			"mWorld"
		);
		this.uniforms["mProj"] = this.gl.getUniformLocation(this.program, "mProj");
	}
}
