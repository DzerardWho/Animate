import { Timeline } from './Timeline'
import { Base } from '../Base';
import { Color } from '../Color';
import { Matrix, vec2 } from '../types';
// import * as twgl from '../twgl.js/dist/4.x/twgl';

export class TimelineInstance {
    gl: WebGLRenderingContext;
    base: Base;
    timeline: Timeline;
    colorTimeline: Timeline;
    maskTimeline: Timeline;
    frame: number;
    color: Color;
    projectionMatrix: Matrix;
    program: twgl.ProgramInfo;
    bufferInfo: twgl.BufferInfo;
    texture: WebGLTexture;
    framebuffer: WebGLFramebuffer;
    prevFramebuffer: WebGLFramebuffer;
    uniforms: object;
    width: number;
    height: number;
    padding: vec2;

    draw: ((arg1: Matrix, arg2: number) => void);

    constructor(base: Base, timeline: Timeline, useColor: Color = null, useMask: boolean = false) {
        this.frame = 0;
        this.base = base;
        this.timeline = timeline;
        this.gl = base.gl;
        this.projectionMatrix = base.projectionMatrixAndSize;
        // if (useColor && useMask) {
        //     this.program = base.colorAndMaskProgram;
        //     this.draw = this.drawAndModify;
        //     this.uniforms = {uSampler: this.texture, uTransMatrix: this.projectionMatrix};
        //     this.setUpForFramebuffer();
        // } else 
        if (useColor) {
            this.setUpForFramebuffer();
            this.program = base.colorProgram;
            this.draw = this.drawAndModify;
            this.color = useColor;
            this.uniforms = {uSampler: this.texture, uTransMatrix: this.projectionMatrix};
        // } else if (useMask) {
        //     this.program = base.maskProgram;
        //     this.draw = this.drawAndModify;
        //     this.uniforms = {uSampler: this.texture, uTransMatrix: this.projectionMatrix};
        //     this.setUpForFramebuffer();
        } else {
            this.draw = this.basicDraw;
        }
    }

    reset() {
        this.frame = 0;
    }

    update() {
        ++this.frame;
        this.timeline.update(this.frame);
    }

    private setUpForFramebuffer() {
        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.base.canvas.width, this.base.canvas.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
    
        this.framebuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, 0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

        this.bufferInfo = this.base.defaultBufferInfo;
    }

    private basicDraw(matrix: Matrix, alpha: number) {
        this.timeline.draw(matrix, alpha, this.frame);
    }

    private drawAndModify(matrix: Matrix, alpha: number) {
        this.prevFramebuffer = this.base.lastUsedFramebuffer;
        this.base.lastUsedFramebuffer = this.framebuffer;

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        this.clear();
        this.basicDraw(matrix, 1);

        this.base.lastUsedFramebuffer = this.prevFramebuffer;
        if (this.base.lastUsedProgram !== this.program){
            this.base.lastUsedProgram = this.program;
        }
        
        twgl.setBuffersAndAttributes(this.gl, this.program, this.bufferInfo);
        this.uniforms['uColor'] = this.color.mixAlpha(alpha);
        twgl.setUniforms(this.program, this.uniforms);

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    get loop(){
        return this.timeline.loop;
    }

    get duration() {
        return this.timeline.duration;
    }

    clear() {
        this.gl.clearColor(0,0,0,0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}