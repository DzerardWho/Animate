import { Renderable } from './Renderable'
import { Base } from '../Base'
import { Matrix, _Color } from '../types'
import { Spritesheet } from '../AssetManagement/Spritesheet'

export class Sprite extends Renderable {
	attribs: Object;
	uniforms: Object;

	texture: WebGLTexture;
	textureCoords: WebGLBuffer;
	loop: boolean;
	blendFunc: number;

	constructor(base: Base, img: ImageData | Spritesheet, transparent: boolean, index?: string | number) {
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

			this.textureCoords = this.unitBuffer;
		} else {
			if (!index) {
				throw new Error('Index is required');
			}

			let sprite = img.get(index);
			super(base, sprite.width, sprite.height);
			this.textureCoords = sprite.texCoords;
			this.texture = sprite.source.texture;
			this.padding = {x: sprite.pad_x, y: sprite.pad_y};
		}

		this.loop = true;
		this.program = base.defaultSpriteProgram;
		if (transparent) {
			this.blendFunc = this.gl.ONE;
		} else {
			this.blendFunc = this.gl.SRC_ALPHA;
		}

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
		}

		if (this.base.lastUsedBlendFunc !== this.blendFunc){
			this.base.lastUsedBlendFunc = this.blendFunc;
		}

		if (this.base.lastUsedTexture !== this.texture){
			this.base.lastUsedTexture = this.texture;
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
    
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.unitBuffer);
		this.gl.vertexAttribPointer(
            this.attribs['aPosition'],
			2,
			this.gl.FLOAT,
			false,
			2 * Float32Array.BYTES_PER_ELEMENT,
			0
        );
        this.gl.enableVertexAttribArray(this.attribs['aPosition']);
        this.gl.uniform1i(this.uniforms['sampler'], 0);
		this.gl.uniformMatrix3fv(this.uniforms['transMatrix'], false, matrix);
		this.gl.uniform1f(this.uniforms['alpha'], alpha);
        
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}

	switchBlendFunc() {
		this.blendFunc = this.blendFunc === this.gl.ONE ? this.gl.SRC_ALPHA : this.gl.ONE;
	}
}