import { Renderable } from './Renderable'
import { Base } from '../Base'
import { Matrix, _Color } from '../types'
import { Spritesheet } from '../AssetManagement/Spritesheet'
import { createBufferInfoFromBuffers } from '../BufferInfo';
// import * as twgl from '../twgl.js/dist/4.x/twgl';

export class Sprite extends Renderable {
	attribs: Object;
	uniforms: Object;

	_texture: WebGLTexture;
	textureCoords: WebGLBuffer;
	loop: boolean;
	src: Spritesheet | HTMLImageElement | ImageData;
	getTexture: (() => WebGLTexture);

	constructor(base: Base, img: ImageData | HTMLImageElement | Spritesheet, index?: string | number) {
		if (!(img instanceof Spritesheet)) {
			super(base, img.width, img.height);

			this.bufferInfo = base.defaultSpriteBufferInfo;
			this.getTexture = (() => {
				return this.texture;
			}).bind(this);
		} else {
			if (!index) {
				throw new Error('Index is required');
			}

			let sprite = img.get(index);
			super(base, sprite.width, sprite.height);
			this.bufferInfo = createBufferInfoFromBuffers(this.gl, {aTexCoords: sprite.texCoords}, base.defaultBufferInfo);
			this.getTexture = (() => {
				return this.src.getTexture();
			}).bind(this);
			this.padding = {x: sprite.pad_x, y: sprite.pad_y};
		}
		
		this._texture = null;
		this.src = img;
		this.loop = true;
		this.program = base.defaultSpriteProgram;
	}

	draw(matrix: Matrix, alpha: number) {
		if (this.base.lastUsedProgram !== this.program) {
			this.base.lastUsedProgram = this.program;
		}

		if (this.base.lastUsedTexture !== this._texture){
			this.base.lastUsedTexture = this._texture;
		}

		twgl.setBuffersAndAttributes(this.gl, this.program, this.bufferInfo);
		twgl.setUniforms(this.program, {uSampler: this.getTexture(), uTransMatrix: matrix, uAlpha: alpha})
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}

	get texture(): WebGLTexture {
        if (this._texture === null) {
            this._texture = this.base.loadTexture(this.src, this);
        } else {
            this.base.updateTextureBuffer(this);
        }
        return this._texture;
	}

	set texture(value: WebGLTexture) {
		this._texture = value;
	}
}