import { Renderable } from './Renderable'
import { Color, _Color } from './Color'
import { Base } from './Base'
import { Matrix } from './Matrix'

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
		this.attribs["aPosition"] = this.gl.getAttribLocation(
			this.program,
			"aPosition"
		);
		this.gl.enableVertexAttribArray(this.attribs["aPosition"]);
		this.uniforms["uColor"] = this.gl.getUniformLocation(
			this.program,
			"uColor"
		);
		this.uniforms["transMatrix"] = this.gl.getUniformLocation(
			this.program,
			"transMatrix"
		);
		this.uniforms["mProj"] = this.gl.getUniformLocation(this.program, "mProj");
	}

	async draw(matrix: Matrix, frame: number){
		if (this.base.lastUsedProgram !== this.program){
			this.base.lastUsedProgram = this.program;
			this.gl.useProgram(this.program);
		}

		this.gl.uniform4fv(this.attribs['uColor'], this.color.buffer);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);
		this.gl.vertexAttribPointer(
			this.attribs['position'],
			2,
			this.gl.FLOAT,
			false,
			2 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
		this.gl.enableVertexAttribArray(this.attribs['position']);
		this.gl.uniformMatrix3fv(this.attribs['transMatrix'], false, matrix);
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}
}
