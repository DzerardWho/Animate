import { Renderable } from './Renderable'
import { Base } from '../Base'
import { Matrix, _Color } from '../types'
import { Spritesheet } from '../Spritesheet'

export class Sprite extends Renderable {
	attribs: Object;
	uniforms: Object;

	texture: WebGLTexture;
	textureCoords: WebGLBuffer;
	loop: boolean;

	constructor(base: Base, img: ImageData | Spritesheet, index?: string) {
		if (!(img instanceof Spritesheet)) {
			super(base, img.width, img.height);

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
		} else {
			if (!index) {
				throw 'Index is required';
			}

			let sprite = img.get(index);
			super(base, sprite.width, sprite.height);
			this.textureCoords = sprite.texCoords;
			this.texture = sprite.source.texture;
		}

		this.loop = true;
		this.program = base.defaultSpriteProgram;

		this.getProgramData([
			// Atribs
			'aPosition',
			'aTextureCoords'
        ],
        [
            // Uniforms
            'transMatrix',
			'sampler',
			'alpha'
        ])
	}

	draw(matrix: Matrix, alpha: number) {
		if (this.base.lastUsedProgram !== this.program) {
			this.base.lastUsedProgram = this.program;
			this.gl.useProgram(this.program);
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoords);
		this.gl.vertexAttribPointer(
			this.attribs["aTextureCoords"],
			2,
			this.gl.FLOAT,
			false,
			2 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
        this.gl.enableVertexAttribArray(this.attribs["aTextureCoords"]);
    
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
            
		this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.uniform1i(this.uniforms['sampler'], 0);

		this.gl.uniformMatrix3fv(this.uniforms['transMatrix'], false, matrix);
		
		this.gl.uniform1f(this.uniforms['alpha'], alpha);
        
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}
}