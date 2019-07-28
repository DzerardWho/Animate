import * as glMatrix from "gl-matrix";
import { vec2 } from './Base'
import { Renderable } from './Renderable'
import { Rectangle } from './Rectangle'
import { Sprite } from './Sprite'
import { Symbol } from './Symbol'
import { _Color } from './Color'
import { TimelineMax } from "gsap";


export interface instance {
    visible: boolean;
    x: number;
    y: number;
    angle: number;
    scale: vec2;
    transformationPoint: vec2;
    source: Symbol | Renderable | Rectangle | Sprite;
    children: Array<instance>;
    worldMatrix: Float32Array;
    buffer: WebGLFramebuffer | null;
}

export class Instance implements instance {
    visible: boolean;
    x: number;
    y: number;
    angle: number;
    scale: vec2;
    transformationPoint: vec2;
    source: Symbol | Renderable | Rectangle | Sprite;
    children: Array<Instance>;
    worldMatrix: Float32Array;
    buffer: WebGLFramebuffer | null;
    timeline: TimelineMax | null;
    // dirty: boolean;

    constructor(source: Symbol | Rectangle | Sprite | Renderable, x: number = 0, y: number = 0, scale: vec2 = { x: 0, y: 0 }, angle: number = 0) {
        this.source = source;
        this.visible = true;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.scale = scale;
        this.transformationPoint = source.transformationPoint;
        this.children = [];
        this.worldMatrix = new Float32Array(9);

        this.source.base.renderQueue.push(this);

        if (source instanceof Symbol){
            this.buffer = source.gl.createFramebuffer();

            source.children.forEach(child => {
                this.children.push(new Instance(child));
            });
        }
        
        source.instances.push(this);
    }

    updateWorldMatrix(parentWorldMatrix?: Float32Array) {
        if (parentWorldMatrix) {
            glMatrix.mat3.copy(
                this.worldMatrix,
                parentWorldMatrix,
            );
            this.moveTo(this.x, this.y);
        }else{
            glMatrix.mat3.fromTranslation(this.worldMatrix, [this.x, this.y]);
        }
        this.scaleAndRotate({x: 1, y: 1}, 0);

        let worldMatrix = this.worldMatrix;
        this.children.forEach(child => {
            child.updateWorldMatrix(worldMatrix);
        });
    }

    moveTo(x: number, y: number) {
        glMatrix.mat3.translate(this.worldMatrix, this.worldMatrix, [x, y]);
    }

    scaleAndRotate(scale: vec2, angle: number) {
        this.moveTo(this.transformationPoint.x, this.transformationPoint.y);
        glMatrix.mat3.rotate(this.worldMatrix, this.worldMatrix, this.angle);
        glMatrix.mat3.scale(this.worldMatrix, this.worldMatrix, [
            this.scale.x,
            this.scale.y
        ]);
        this.moveTo(-this.transformationPoint["x"], -this.transformationPoint["y"]);
    }

    addChild(child: any) {
        this.children.push(new Instance(child));
    }

    setVisible(visible: boolean){
        this.visible = visible;
    }
}