import { vec2, Matrix } from './types'

const degToRad = Math.PI / 180;

export function computeMatrix(_in: Matrix, out: Matrix, pos: vec2, scale: vec2, trans: vec2, angle: number): Matrix {
    let [a, b, , d, e, , g, h] = _in;
    let x = pos.x,
        y = pos.y,
        px = trans.x,
        py = trans.y,
        sx = scale.x,
        sy = scale.y;
    angle *= degToRad;
    let s = Math.sin(angle),
        c = Math.cos(angle);

    out[0] = sx * (c * a + s * d);
    out[1] = sx * (c * b + s * e);
    out[3] = sy * (c * d - s * a);
    out[4] = sy * (c * e - s * b);
    out[6] = a * (px * (1 - sx * c) + py * sy * s + x) + d * (py * (1 - sy * c) - px * sx * s + y) + g;
    out[7] = b * (px * (1 - sx * c) + py * sy * s + x) + e * (py * (1 - sy * c) - px * sx * s + y) + h;
    out[2] = out[5] = 0;
    out[8] = 1;

    return out;
}

export function projectionMatrix(out: Matrix, width: number, height: number): Matrix {
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
    return new Float32Array([
        2 / width,
        0,
        0,
        0,
        -2 / height,
        0,
        -1,
        1,
        1
    ]);
}