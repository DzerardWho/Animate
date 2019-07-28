// import * as glMatrix from "gl-matrix";
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
	instances: Array<Instance>;

	x: number;
	y: number;
	og_width: number;
	og_height: number;
	width: number;
	height: number;
	private _angle: number;
	scale: vec2;
	transformationPoint: vec2;

	constructor(
		base: Base,
		x: number,
		y: number,
		w: number,
		h: number,
		transformationPoint: vec2 = { x: 0, y: 0 }
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
		this.transformationPoint = { x: transformationPoint["x"], y: transformationPoint["y"] };

		this.base.symbols.push(this);
	}

	addChild(child, createInstance: boolean = false){
		if (!child){
			return;
		}
		
		if (child.parent){
			let ndx = child.parent.children.indexOf(child.source);
			if (ndx >= 0){
				child.parent.children.splice(ndx, 1);
			}
		}
		child.parent = this;
		this.children.push(child);
		if (createInstance){
			this.instances.forEach(instance => {
				instance.addChild(child);
			});
		}
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

	updateWorldMatrix() {
		this.instances.forEach(instance => {
			instance.updateWorldMatrix();
		});
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

	get angle() {
		return this._angle;
	}

	set angle(a) {
		this._angle = glMatrix.glMatrix.toRadian(a);
	}
}
