#ifdef GL_ES
precision highp float;
#endif

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uRevealPosition;
uniform float uRevealDistance;
uniform float uFluctuationFrequency;
uniform float uFluctuationAmplitude;

varying vec3 vColor;
varying float vAlpha;

void main() {
    // Position
     vec3 localPos = position;
    // vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    // vec4 viewPosition = viewMatrix * worldPosition;

    // Focus
    float focusDistance = distance(localPos, uRevealPosition);
    focusDistance = step(0.0, focusDistance - uRevealDistance);
    // float focusDistance = distance(vec3(position.xyz), uRevealPosition);
    // focusDistance = step(0.0, focusDistance - uRevealDistance);

    // Fluctuation
    // float alphaFluctuation = 
    //     sin(uTime * uFluctuationFrequency + worldPosition.x * uFluctuationAmplitude * 1.0) * 0.5 + 0.5 +
    //     sin(uTime * uFluctuationFrequency + worldPosition.y * uFluctuationAmplitude * 1.754) * 0.5 + 0.5 +
    //     sin(uTime * uFluctuationFrequency + worldPosition.z * uFluctuationAmplitude * 0.679) * 0.5 + 0.5;
    float alphaFluctuation = 
        sin(uTime * uFluctuationFrequency + localPos.x * uFluctuationAmplitude * 1.0) * 0.5 + 0.5 +
        sin(uTime * uFluctuationFrequency + localPos.y * uFluctuationAmplitude * 1.754) * 0.5 + 0.5 +
        sin(uTime * uFluctuationFrequency + localPos.z * uFluctuationAmplitude * 0.679) * 0.5 + 0.5;
    
    alphaFluctuation /= 3.0;
    alphaFluctuation = alphaFluctuation * 0.9 + 0.1;
    // Alpha
    vAlpha = focusDistance * alphaFluctuation;

    // Color
    vColor = uColor;

    // Return
    // gl_Position = projectionMatrix * viewPosition;
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewPosition;
}