export const dvs = `precision mediump float;

attribute vec2 aPosition;

uniform mat3 transMatrix;

void main(){
    gl_Position = vec4((transMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
}`;

export const dfs = `precision mediump float;

uniform vec4 uColor;

void main(){
    gl_FragColor = uColor;
}`;

export const dsvs = `precision mediump float;

attribute vec2 aPosition;
attribute vec2 aTextureCoords;

uniform mat3 transMatrix;

varying vec2 f_texCoord;

void main(){
	f_texCoord = aTextureCoords;
    gl_Position = vec4((transMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
}`;

export const dsfs = `precision mediump float;

varying vec2 f_texCoord;
uniform sampler2D sampler;

void main(){
	gl_FragColor = texture2D(sampler, f_texCoord);
}`;
