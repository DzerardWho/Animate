import { Timeline } from './Timeline/Timeline'
import { createProjection } from './Matrix'
import { Base } from './Base'
import { Color } from './Color'
import { Matrix } from './types';

export class Renderer {
    gl: WebGLRenderingContext;
    isPlaying: boolean;
    timing: number;
    timeToNextUpdate: number;
    lastUpdate: number;
    mainTimeline: Timeline;
    updateInterval: number;
    frame: number;
    projectionMatrix: Matrix;
    backgroundColor: Color;
    frameUpdated: boolean;

    constructor(base: Base, fps: number, width: number, height: number, bgColor: Color) {
        if (fps <= 0) {
            throw "Fps must be a positive number";
        }

        this.gl = base.gl;
        this.timing = 1000 / fps;
        this.timeToNextUpdate = this.timing;
        this.lastUpdate = 0;
        this.frame = 0;
        this.mainTimeline = null;
        this.isPlaying = false;
        this.projectionMatrix = createProjection(width, height);
        this.backgroundColor = bgColor;
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
        this.changeBlendFunc(this.gl.ONE);
    }

    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.render();
            setTimeout(() => {
                this.update();
                this.updateInterval = setInterval(this.update, this.timing);
            }, this.timeToNextUpdate);
        }
    }

    pause() {
        if (this.isPlaying) {
            clearInterval(this.updateInterval);
            this.timeToNextUpdate -= performance.now() - this.lastUpdate;
            this.isPlaying = false;
        }
    }

    update() {
        if (this.isPlaying) {
            ++this.frame;
            // console.log('update');
            this.frameUpdated = true;
            requestAnimationFrame(this.render);
            this.lastUpdate = performance.now();
            this.timeToNextUpdate = this.timing;
        }
    }

    render() {
        if (!this.mainTimeline) {
            throw "There is nothing to render (mainTimeline isn't set)";
        }
        if (!(this.frameUpdated && this.isPlaying)) {
            return;
        }
        // console.log('render');
        this.frameUpdated = false;
        this.clear();
        this.mainTimeline.draw(this.projectionMatrix, 1, this.frame);
        if (!this.mainTimeline.loop && this.frame >= this.mainTimeline.duration - 1){
            this.pause();
            return;
        }
    }

    clear() {
        this.gl.clearColor(
            this.backgroundColor.r,
            this.backgroundColor.g,
            this.backgroundColor.b,
            this.backgroundColor.a
        );
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    changeBlendFunc(func: number) {
        this.gl.blendFunc(func, this.gl.ONE_MINUS_SRC_ALPHA);
    }
}