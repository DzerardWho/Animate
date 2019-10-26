// import { BufferInfo } from "./twgl.js/dist/4.x/twgl";

export function createBufferInfoFromBuffers(gl: WebGLRenderingContext, buffers, srcBufferInto?: BufferInfo): BufferInfo {
    let out = {
        numElements: 0,
        attribs: {}
    };
    if (srcBufferInto){
        for (let i in srcBufferInto.attribs) {
            out.attribs[i] = srcBufferInto.attribs[i];
        }
    }
    for (let i in buffers) {
        out.attribs[i] = {};
        out.attribs[i]['buffer'] = buffers[i];
        out.attribs[i]['numComponents'] = 2;
    }

    return out;
}