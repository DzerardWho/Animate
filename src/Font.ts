import { Base } from "./Base";

export interface FontData {
    font?: string;
    size?: number | string;
    weight?: number | string;
    style?: string;
    align?: string;
    baseline?: string;
    color?: string;
}

export class Font {
    base: Base;
    ctx: CanvasRenderingContext2D;
    font: string;
    align: string;
    baseline: string;
    color: string;

    constructor(base: Base, data: FontData | string = {}) {
        this.base = base;
        this.ctx = base.textCtx;
        if (typeof(data) === 'string') {
            this.font = data;
            this.color = '#000000';
            this.align = 'left';
            this.baseline = 'top'
        } else {
            this.font = (data.size || '12') + 'px ' + (data.font || 'arial');
            if (data.weight) this.font = data.weight + ' ' + this.font;
            if (data.style) this.font = data.style + ' ' + this.font;
            this.align = data.align || 'left';
            this.baseline = data.baseline || 'top';
            this.color = data.color || '#000000';
        }
    }

    setupCtx() {
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.color;
        this.ctx.textBaseline = <CanvasTextBaseline>this.baseline;
        this.ctx.textAlign = <CanvasTextAlign>this.align;
    }
}