import { Renderable } from "./Renderable";
import { Base } from "../Base";
import { Font, FontData } from "../Font";
import { Matrix } from "../types";
// import * as twgl from '../twgl.js/dist/4.x/twgl';

export class TextObject extends Renderable {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    _text: string;
    font: Font;
    texture: WebGLTexture;

    constructor(base: Base, w: number, h: number, font: string | FontData) {
        super(base, w, h);
        this.ctx = base.textCtx;
        this.canvas = base.textCanvas;
        this.program = base.defaultSpriteProgram;
        this.bufferInfo = base.defaultSpriteBufferInfo;
        this.texture = this.gl.createTexture();
        this.font = new Font(base, font);
        
        base.setupTexture(this.texture);
    }

    // setText(text: string) {
    //     this.text = text;
    // }

    get text() {
        return this._text;
    }

    set text(text: string) {
        this._text = text;
        this.renderText();
    }

    renderText() {
        this.base.setupTextCanvas(this.width, this.height);
        this.font.setupCtx();
        this.ctx.fillText(this._text, 0, 0, this.width);
        this.base.uploadTexture(this.texture, this.canvas);
    }

    draw(matrix: Matrix, alpha: number) {
        if (this.base.lastUsedProgram !== this.program) {
			this.base.lastUsedProgram = this.program;
		}

		if (this.base.lastUsedTexture !== this.texture){
			this.base.lastUsedTexture = this.texture;
		}

		twgl.setBuffersAndAttributes(this.gl, this.program, this.bufferInfo);
		twgl.setUniforms(this.program, {uSampler: this.texture, uTransMatrix: matrix, uAlpha: alpha})
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}