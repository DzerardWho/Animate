// import * as glMatrix from "gl-matrix";
import { vec2 } from "./Base";
import { Instance, instance } from "./_Instance";
import { Rectangle } from "./Rectangle";
import { Sprite } from "./Sprite";
import { _Color } from "./Color";
import { Base } from "./Base";
import { Timeline } from "./Timeline";
import { TimelineMax } from "gsap";
import { Renderable } from "./Renderable";

export class Symbol {
    children: Array<Symbol>;
    // children: Array<Instance>;
    // children: Array<Instance | Rectangle | Sprite>;
    gl: WebGLRenderingContext;
    base: Base;
    instances: Array<Instance>;

    transformationPoint: vec2;
    timeline: Timeline;

    constructor(
        base: Base,
        transformationPoint: vec2 = { x: 0, y: 0 },
        pos: vec2 = { x: 0, y: 0 },
        scale: vec2 = { x: 1, y: 1 },
        angle: number = 0
    ) {
        this.base = base;
        this.gl = base.gl;

        this.instances = [];
        this.children = [];
        this.transformationPoint = {
            x: transformationPoint.x,
            y: transformationPoint.y
        };
        this.timeline = new Timeline();

        this.base.symbols.push(this);
    }

    addToSymbol(
        child: any,
        pos: vec2,
        angle: number = 0,
        scale: vec2 = { x: 1, y: 1 },
        transformationPoint: vec2 = { x: 0, y: 0 },
        to: number,
        from: number = 0
    ) {
        if (child) {
            if (child instanceof Symbol) {
                this.children.push(child);
            } else {
                this.children.push(
                    new Symbol(this.base, transformationPoint, pos, scale, angle)
                );
            }
        }
    }

    createInstanece(
        x: number = 0,
        y: number = 0,
        angle: number = 0,
        scale: vec2 = { x: 0, y: 0 }
    ) {
        return new Instance(this, x, y, scale, angle);
    }

    init() { }

    render() { }
}
