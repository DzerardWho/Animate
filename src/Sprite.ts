import { Renderable } from './Renderable'
import { _Color } from './Color'
import { Base } from './Base'

export class Sprite extends Renderable {
	attribs: Object;
	uniforms: Object;

	texture: WebGLTexture;
	textureCoords: WebGLBuffer;

	constructor(base: Base, img: ImageData) {
		super(base, img.width, img.height);
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
		this.uniforms["mWorld"] = this.gl.getUniformLocation(
			this.program,
			"mWorld"
		);
		this.uniforms["mProj"] = this.gl.getUniformLocation(this.program, "mProj");
		this.uniforms["sampler"] = this.gl.getUniformLocation(
			this.program,
			"sampler"
		);
	}
}
