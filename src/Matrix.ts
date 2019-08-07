import { vec2, Matrix } from "./types";

const degToRad = Math.PI / 180;

export function computeMatrix(_in: Matrix, out: Matrix, pos: vec2, scale: vec2, width: number, height: number, trans: vec2, angle: number, padding: vec2): Matrix {
    let [a, b, , d, e, , g, h] = _in;
    let x = pos.x, y = pos.y, px = trans.x, py = trans.y, sx = scale.x, sy = scale.y;
    angle *= degToRad;
    let s = Math.sin(angle),
        c = Math.cos(angle);
    let pax = 0,
        pay = 0;

    if (padding) {
        pax = padding.x;
        pay = padding.y;
    }

    out[0] = sx * (c * a + s * d) * width;
    out[1] = sx * (c * b + s * e) * width;
    out[3] = sy * (c * d - s * a) * height;
    out[4] = sy * (c * e - s * b) * height;
    out[6] = a * (sy * s * (py - pay) + sx * c * (pax - px) + px + x) +
        d * (sy * c * (pay - py) + sx * s * (pax - px) + py + y) +
        g;
    out[7] = b * (sy * s * (py - pay) + sx * c * (pax - px) + px + x) +
        e * (sy * c * (pay - py) + sx * s * (pax - px) + py + y) +
        h;
    out[2] = out[5] = 0;
    out[8] = 1;

    return out;
}

export function projectionMatrix(
    out: Matrix,
    width: number,
    height: number
): Matrix {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
}

export function createProjection(width: number, height: number): Matrix {
    return new Float32Array([2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1]);
}

export function identity() {
    return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
}
