import * as glMatrix from "gl-matrix";
import { vec2 } from './Base'
import { Instance, instance } from './Instance'
import { Rectangle } from './Rectangle'
import { Sprite } from './Sprite'
import { _Color } from './Color'
import { Base } from './Base'

export class Container {
	children: Array<Container | Rectangle> = [];
	localMatrix: Float32Array;
	worldMatrix: Float32Array;
	gl: WebGLRenderingContext;
	base: Base;
	parent: Container | Rectangle | Sprite;
	instances: Array<instance>;

	x: number;
	y: number;
	og_width: number;
	og_height: number;
	width: number;
	height: number;
	private _angle: number;
	scale: vec2;
	pivot: vec2;

	constructor(
		base: Base,
		x: number,
		y: number,
		w: number,
		h: number,
		pivot: vec2 = { x: 0, y: 0 }
	) {
		this.localMatrix = glMatrix.mat3.identity(new Float32Array(9));
		this.worldMatrix = glMatrix.mat3.identity(new Float32Array(9));
		this.base = base;
		this.gl = base.gl;

		this.x = x;
		this.y = y;
		this.og_width = w;
		this.og_height = h;
		this.width = this.og_width;
		this.height = this.og_height;
		this.angle = 0;
		this.scale = { x: 1, y: 1 };
		this.instances = [];
		this.pivot = { x: pivot["x"], y: pivot["y"] };

		this.base.symbols.push(this);
	}

	updateWorldMatrix(parentWorldMatrix?: Float32Array) {
		glMatrix.mat3.fromTranslation(this.localMatrix, [this.x, this.y]);
		this.scaleAndRotate(this.width, this.height, this.angle);
		if (parentWorldMatrix) {
			glMatrix.mat3.multiply(
				this.worldMatrix,
				parentWorldMatrix,
				this.localMatrix
			);
		} else {
			glMatrix.mat3.copy(this.worldMatrix, this.localMatrix);
		}

		let worldMatrix = this.worldMatrix;
		this.children.forEach(child => {
			child.updateWorldMatrix(worldMatrix);
		});
		// glMatrix.mat3.identity(this.localMatrix);
	}

	setParent(parent) {
		if (this.parent) {
			let ndx = this.parent.children.indexOf(this);
			if (ndx >= 0) {
				this.parent.children.splice(ndx, 1);
			}
		}

		if (parent) {
			parent.children.push(this);
		}
		this.parent = parent;
	}

	moveTo(x: number, y: number) {
		glMatrix.mat3.translate(this.localMatrix, this.localMatrix, [x, y]);
	}

	scaleAndRotate(x: number, y: number, angle: number) {
		this.moveTo(this.pivot["x"], this.pivot["y"]);
		glMatrix.mat3.scale(this.localMatrix, this.localMatrix, [
			this.scale.x,
			this.scale.y
		]);
		glMatrix.mat3.rotate(this.localMatrix, this.localMatrix, angle);
		this.moveTo(-this.pivot["x"], -this.pivot["y"]);
	}

	// createInstance() {
	// 	let instance = <instance>{};
	// 	instance.visible = true;
	// 	instance.x = this.x;
	// 	instance.y = this.y;
	// 	instance.scale = { x: this.scale.x, y: this.scale.y };
	// 	instance.angle = this.angle;
	// 	instance.source = this;
	// 	instance.localMatrix = new Float32Array(9);
	// 	instance.worldMatrix = new Float32Array(9);
	// 	instance.buffer = this.gl.createFramebuffer();
	// 	instance.children = [];

	// 	this.children.forEach(child => {
	// 		instance.children.push(child.createInstance());
	// 	});

	// 	this.instances.push(instance);

	// 	return instance;
	// }

	get angle() {
		return this._angle;
	}

	set angle(a) {
		this._angle = glMatrix.glMatrix.toRadian(a);
	}
}
