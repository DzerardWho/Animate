import { vec2 } from '../Base'

export interface _Data {
    pos?: vec2;
    angle?: number;
    scale?: vec2;
    transformationPoint?: vec2;
    alpha?: number;
}

export class Data {
    pos: vec2;
    angle: number;
    scale: vec2;
    transformationPoint: vec2;
    alpha: number;
    dirty: boolean;

    constructor(data: _Data | null) {
        if (!data) {
            return this;
        }
        this.pos = { x: 0, y: 0 };
        if (data.pos) {
            if (data.pos.x) {
                this.pos.x = data.pos.x;
            }
            if (data.pos.y) {
                this.pos.y = data.pos.y;
            }
        }

        this.angle = data.angle || 0;
        this.scale = { x: 1, y: 1 };
        this.transformationPoint = { x: 0, y: 0 };
        if (data.scale) {
            if (data.scale.x) {
                this.scale.x = data.scale.x;
            }
            if (data.scale.y) {
                this.scale.y = data.scale.y;
            }
        }
        if (data.transformationPoint) {
            if (data.transformationPoint.x) {
                this.transformationPoint.x = data.transformationPoint.x;
            }
            if (data.scale.y) {
                this.transformationPoint.y = data.transformationPoint.y;
            }
        }
        this.alpha = 1;
    }

    getData(to: Data, progress: number) {
        let alpha = this.alpha + (to.alpha - this.alpha) * progress;
        if (alpha < 0) {
            alpha = 0;
        } else if (alpha > 1) {
            alpha = 1
        }
        return {
            pos: {
                x: this.pos.x + (to.pos.x - this.pos.x) * progress,
                y: this.pos.y + (to.pos.y - this.pos.y) * progress
            },
            angle: this.angle + (to.angle - this.angle) * progress,
            scale: {
                x: this.scale.x + (to.scale.x - this.scale.x) * progress,
                y: this.scale.y + (to.scale.y - this.scale.y) * progress,
            },
            transformationPoint: {
                x: this.transformationPoint.x + (to.transformationPoint.x - this.transformationPoint.x) * progress,
                y: this.transformationPoint.y + (to.transformationPoint.y - this.transformationPoint.y) * progress,
            },
            alpha: alpha
        }
    }
}