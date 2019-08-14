export const dvs = `precision mediump float;

attribute vec2 aPosition;

uniform mat3 transMatrix;

void main(){
    gl_Position = vec4((transMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
}`;

export const dfs = `precision mediump float;

uniform vec4 uColor;

void main(){
    vec4 color = uColor;
    color.rgb *= color.a;
    gl_FragColor = color;
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
uniform float alpha;
uniform sampler2D sampler;

void main(){
    vec4 color = texture2D(sampler, f_texCoord);
    color.a *= alpha;
    color.rgb *= color.a;
	gl_FragColor = color;
}`;
