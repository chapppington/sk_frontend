export const lentaVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const lentaFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    uv.y = mod(-uv.y + uTime * 0.1, 1.0); 
    vec4 texColor = texture2D(uTexture, uv);
    gl_FragColor = texColor;
  }
`; 