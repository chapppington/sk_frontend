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
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 cameraPosition = viewMatrix * worldPosition;

    // Focus
    float focusDistance = distance(vec3(position), uRevealPosition);
    focusDistance = step(0.0, focusDistance - uRevealDistance);

    // Fluctuation
    float alphaFluctuation = 
        sin(uTime * uFluctuationFrequency + worldPosition.x * uFluctuationAmplitude * 1.0) * 0.5 + 0.5 +
        sin(uTime * uFluctuationFrequency + worldPosition.y * uFluctuationAmplitude * 1.754) * 0.5 + 0.5 +
        sin(uTime * uFluctuationFrequency + worldPosition.z * uFluctuationAmplitude * 0.679) * 0.5 + 0.5;
    
    alphaFluctuation /= 3.0;
    alphaFluctuation = alphaFluctuation * 0.9 + 0.1;

    // Alpha
    vAlpha = focusDistance * alphaFluctuation;

    // Color
    vColor = uColor;

    // Return
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}