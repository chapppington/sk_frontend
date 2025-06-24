#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uGridTexture;
uniform float uAlpha;

varying vec3 vColor;
varying float vAlpha;

void main() {
    gl_FragColor = vec4(vColor, vAlpha * uAlpha);
}