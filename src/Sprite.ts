import { Renderable } from './Renderable'
import { _Color } from './Color'
import { Base } from './Base'
import { Matrix } from './Matrix'

export class Sprite extends Renderable {
	attribs: Object;
	uniforms: Object;

	texture: WebGLTexture;
	textureCoords: WebGLBuffer;
	loop: boolean;

	constructor(base: Base, img: ImageData) {
		super(base, img.width, img.height);
		this.loop = true;
		this.program = base.defaultSpriteProgram;

		this.texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_S,
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_T,
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MIN_FILTER,
			this.gl.LINEAR
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MAG_FILTER,
			this.gl.LINEAR
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.RGBA,
			this.gl.RGBA,
			this.gl.UNSIGNED_BYTE,
			img
		);

		this.textureCoords = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoords);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
			this.gl.STATIC_DRAW
		);

		this.attribs["position"] = this.gl.getAttribLocation(
			this.program,
			"aPosition"
		);
		this.attribs["textureCoords"] = this.gl.getAttribLocation(
			this.program,
			"aTextureCoords"
		);
		this.uniforms["uColor"] = this.gl.getUniformLocation(
			this.program,
			"uColor"
		);
		this.uniforms["transMatrix"] = this.gl.getUniformLocation(
			this.program,
			"transMatrix"
		);
		this.uniforms["mProj"] = this.gl.getUniformLocation(this.program, "mProj");
		this.uniforms["sampler"] = this.gl.getUniformLocation(
			this.program,
			"sampler"
		);
	}

	draw(matrix: Matrix) {
		if (this.base.lastUsedProgram !== this.program) {
			this.base.lastUsedProgram = this.program;
			this.gl.useProgram(this.program);
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoords);
		this.gl.vertexAttribPointer(
			this.attribs["textureCoords"],
			2,
			this.gl.FLOAT,
			false,
			2 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
		this.gl.enableVertexAttribArray(this.attribs["textureCoords"]);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.shapeBuffer);
		this.gl.vertexAttribPointer(
			this.attribs['position'],
			2,
			this.gl.FLOAT,
			false,
			2 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.uniform1i(this.uniforms['sampler'], 0);
		this.gl.enableVertexAttribArray(this.attribs['position']);
		this.gl.uniformMatrix3fv(this.uniforms['transMatrix'], false, matrix);
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}
}
