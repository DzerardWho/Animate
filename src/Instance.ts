// import * as glMatrix from "gl-matrix";
import { vec2 } from './Base'
import { Container } from './Container'
import { Renderable } from './Renderable'
import { Rectangle } from './Rectangle'
import { Sprite } from './Sprite'
import { _Color } from './Color'


export interface instance {
	visible: boolean;
	x: number;
	y: number;
	angle: number;
	scale: vec2;
	transformationPoint: vec2;
	source: Container | Renderable | Rectangle | Sprite;
	children: Array<instance>;
	// localMatrix: Float32Array;
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
	source: Container | Renderable | Rectangle | Sprite;
	children: Array<Instance>;
	localMatrix: Float32Array;
	worldMatrix: Float32Array;
	buffer: WebGLFramebuffer | null;
	isChild: any;

	constructor(source: Container | Rectangle | Sprite, isChild: boolean = false) {
		this.source = source;
		this.visible = true;
		this.x = source.x;
		this.y = source.y;
		this.angle = source.angle;
		this.scale = source.scale;
		this.transformationPoint = source.transformationPoint;
		this.children = [];
		// this.localMatrix = new Float32Array(9);
		this.worldMatrix = new Float32Array(9);
		this.buffer = source.gl.createFramebuffer();
		this.isChild = isChild;

		this.source.base.renderQueue.push(this);
		source.children.forEach(child => {
			this.children.push(new Instance(child, true));
		});

		source.instances.push(this);
	}

	updateWorldMatrix(parentWorldMatrix?: Float32Array) {
		glMatrix.mat3.fromTranslation(this.worldMatrix, [this.x, this.y]);
		this.scaleAndRotate();
		if (parentWorldMatrix) {
			glMatrix.mat3.multiply(
				this.worldMatrix,
				parentWorldMatrix,
				this.worldMatrix
			);
		}

		let worldMatrix = this.worldMatrix;
		this.children.forEach(child => {
			child.updateWorldMatrix(worldMatrix);
		});
		// glMatrix.mat3.identity(this.localMatrix);
	}

	moveTo(x: number, y: number) {
		glMatrix.mat3.translate(this.worldMatrix, this.worldMatrix, [x, y]);
	}

	scaleAndRotate() {
		this.moveTo(this.transformationPoint["x"], this.transformationPoint["y"]);
		glMatrix.mat3.scale(this.worldMatrix, this.worldMatrix, [
			this.scale.x,
			this.scale.y
		]);
		glMatrix.mat3.rotate(this.worldMatrix, this.worldMatrix, this.angle);
		this.moveTo(-this.transformationPoint["x"], -this.transformationPoint["y"]);
	}

	addChild(child: any){
		this.children.push(new Instance(child, true));
	}
}