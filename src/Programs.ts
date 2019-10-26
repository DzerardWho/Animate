export const colorShapeVertexShader = `precision mediump float;

attribute vec2 aPos;

uniform mat3 uTransMatrix;

void main(){
    gl_Position = vec4((uTransMatrix * vec3(aPos, 1.0)).xy, 0.0, 1.0);
}`;

export const colorShapeFragmentShader = `precision mediump float;

uniform vec4 uColor;

void main(){
    vec4 color = uColor;
    color.rgb *= color.a;
    gl_FragColor = color;
}`;

export const spriteVertexShader = `precision mediump float;

attribute vec2 aPos;
attribute vec2 aTexCoords;

uniform mat3 uTransMatrix;

varying vec2 vTexCoord;

void main(){
    vTexCoord = aTexCoords;
    gl_Position = vec4((uTransMatrix * vec3(aPos, 1.0)).xy, 0.0, 1.0);
}`;

export const spriteFragmentShader = `precision mediump float;

varying vec2 vTexCoord;
uniform float uAlpha;
uniform sampler2D uSampler;

void main(){
    vec4 color = texture2D(uSampler, vTexCoord);
    color.a *= uAlpha;
    color.rgb *= color.a;
	gl_FragColor = color;
}`;

export const timelineVertexShader = `precision mediump float;

attribute vec2 aPos;

uniform mat3 uTransMatrix;

varying vec2 vTexCoord;

void main(){
    vTexCoord = aPos;
    gl_Position = vec4((uTransMatrix * vec3(aPos, 1.0)).xy, 0.0, 1.0);
}`;

export const colorTimelineFragmentShader = `precision mediump float;

varying vec2 vTexCoord;
uniform vec4 uColor;
uniform sampler2D uSampler;

void main(){
    vec4 color = uColor;
    color *= texture2D(uSampler, vTexCoord).a;
    gl_FragColor = color;
}`;

export const maskTimelineFragmentShader = `precision mediump float;

varying vec2 vTexCoord;
uniform float uAlpha;
uniform sampler2D uSampler;
uniform sampler2D uMask;

void main(){
    vec4 color = texture2D(uSampler, vTexCoord);
    color.a *= uAlpha * texture2D(uMask, vTexCoord).a;
    color.rgb *= color.a;
	gl_FragColor = color;
}`;

export const colorAndMaskTimelineFragmentShader = `precision mediump float;

varying vec2 vTexCoord;
uniform vec4 uColor;
uniform sampler2D uSampler;
uniform sampler2D uMask;

void main(){
    vec4 color = texture2D(uSampler, vTexCoord);
    color.a *= uColor.a * texture2D(uMask, vTexCoord).r;
    color.rgb *= color.a;
	gl_FragColor = color;
}`;