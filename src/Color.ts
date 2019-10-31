import { _Color } from "./types";

export class Color {
	private _r: number;
	private _g: number;
	private _b: number;
	private _a: number;
	private _buffer: Float32Array;
	private dirty: boolean;

	constructor(r?: number | _Color, g?: number, b?: number, a?: number) {
		if (typeof r == "object") {
			this._r = typeof r[0] === 'number' ? this.abs_val(r[0]) : 1;
			this._g = typeof r[1] === 'number' ? this.abs_val(r[1]) : 1;
			this._b = typeof r[2] === 'number' ? this.abs_val(r[2]) : 1;
			this._a = typeof r[3] === 'number' ? this.abs_val(r[3]) : 1;
		} else {
			this._r = r ? this.abs_val(r) : 1;
			this._g = g ? this.abs_val(g) : 1;
			this._b = b ? this.abs_val(b) : 1;
			this._a = a ? this.abs_val(a) : 1;
		}
		this._buffer = new Float32Array(this.getColor());
	}

	set r(_c: number) {
		this._r = this.abs_val(_c);
		this.dirty = true;
	}

	get r() {
		return this._r;
	}

	set g(_c: number) {
		this._g = this.abs_val(_c);
		this.dirty = true;
	}

	get g() {
		return this._g;
	}

	set b(_c: number) {
		this._b = this.abs_val(_c);
		this.dirty = true;
	}

	get b() {
		return this._b;
	}

	set a(_c: number) {
		this._a = this.abs_val(_c);
		this.dirty = true;
	}

	get a() {
		return this._a;
	}

	private abs_val(v: number) {
		return v <= 0 ? (v >= -1 ? -v : 0) : v > 255 ? (v % 255) / 255 : v / 255;
	}

	get color() {
		return [this._r, this._g, this._b, this._a];
	}

	set color(c: _Color) {
		this.r = c[0];
		this.g = c[1];
		this.b = c[2];
		this.a = c[3] || -this.a;
	}

	getColor() {
		return [this._r, this._g, this._b, this._a];
	}

	get buffer() {
		if (this.dirty) {
			this._buffer[0] = this._r;
			this._buffer[1] = this._g;
			this._buffer[2] = this._b;
			this._buffer[3] = this._a;
			this.dirty = false;
		}
		return this._buffer;
	}

	mixAlpha(alpha: number) {
        this.buffer[0] *= alpha;
        this.buffer[1] *= alpha;
        this.buffer[2] *= alpha;
		this.buffer[3] *= alpha;
		this.dirty = true;
		return this._buffer;
	}

	// static mixColors(src: Color, dst: Color, step: number) {
	// 	let sr = -src.r,
	// 		sg = -src.g,
	// 		sb = -src.b,
	// 		sa = -src.a;
	// 	let dr = -dst.r,
	// 		dg = -dst.g,
	// 		db = -dst.b,
	// 		da = -dst.a;

	// 	return new Color();
	// }

	static getColor(value: Color | _Color) {
		if (value instanceof Color) {
			return value;
		}
		return new Color(value);
	}
}