import { createProjection } from './Matrix'
import { Base } from './Base'
import { Color } from './Color'
import { Matrix } from './types';
import { NOOP } from './NOOP';
import { TimelineInstance } from './Timeline/TimelineInstance';

export class Renderer {
    gl: WebGLRenderingContext;
    resumed: boolean;
    timing: number;
    timeToNextUpdate: number;
    lastUpdate: number;
    mainTimeline: TimelineInstance;
    updateInterval: number;
    // frame: number;
    projectionMatrix: Matrix;
    backgroundColor: Color;
    frameUpdated: boolean;

    constructor(base: Base, fps: number, width: number, height: number, bgColor: Color) {
        if (fps <= 0) {
            throw new Error("Fps must be a positive number");
        }

        this.gl = base.gl;
        this.timing = 1000 / fps;
        this.timeToNextUpdate = this.timing;
        this.lastUpdate = 0;
        // this.frame = 0;
        this.mainTimeline = null;
        this.resumed = false;
        this.projectionMatrix = createProjection(width, height);
        this.backgroundColor = bgColor;
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);

        if (!base.debug) {
            this.debugIntervals = NOOP;
        }
    }

    resume() {
        if (!this.resumed) {
            this.resumed = true;
            this.render();
            this.lastUpdate = performance.now();
            setTimeout(() => {
                this.update();
                // this.updateInterval = setInterval(this.update, this.timing);
            }, this.timeToNextUpdate);
        }
    }

    suspend() {
        if (this.resumed) {
            clearInterval(this.updateInterval);
            this.timeToNextUpdate -= performance.now() - this.lastUpdate;
            this.resumed = false;
        }
    }
    
    play() {
        this.mainTimeline.play();
    }

    pause() {
        this.mainTimeline.pause();
    }

    debugIntervals(){
        if (this.timeToNextUpdate <= 37 || this.timeToNextUpdate >= 43)
            console.log(this.timeToNextUpdate);
    }

    async update() {
        if (this.resumed) {
            // ++this.frame;
            this.frameUpdated = true;
            requestAnimationFrame(this.render);
            // this.timeToNextUpdate = this.timing;
            this.timeToNextUpdate = this.timeToNextUpdate - (performance.now() - this.lastUpdate - this.timing);
            setTimeout(this.update, this.timeToNextUpdate);
            this.debugIntervals();
            this.lastUpdate = performance.now();
            this.mainTimeline.update();
        }
    }

    async render() {
        if (!this.mainTimeline) {
            throw new Error("There is nothing to render (mainTimeline isn't set)");
        }
        if (!(this.frameUpdated && this.resumed)) {
            return;
        }
        // console.log('render');
        this.frameUpdated = false;
        this.clear();
        this.mainTimeline.draw(this.projectionMatrix, 1);
        // if (!this.mainTimeline.loop && this.frame >= this.mainTimeline.duration - 1){
        //     this.pause();
        //     return;
        // }
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

    get frame() {
        return this.mainTimeline.frame;
    }

    set frame(value: number) {
        this.mainTimeline.frame = value;
    }
}