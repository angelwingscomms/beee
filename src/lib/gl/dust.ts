import * as THREE from 'three';

const VERTEX = `
attribute float aSeed;
attribute vec2 aTarget;
uniform float uTime, uMorph, uAspect;
varying float vAlpha;
float hash(float n) { return fract(sin(n) * 43758.5453123); }
void main() {
  float t = uTime * 0.05;
  vec2 drift = vec2(
    sin(t + aSeed * 6.2831) * 0.35 + sin(t * 0.7 + aSeed * 12.566) * 0.15,
    cos(t * 0.8 + aSeed * 6.2831) * 0.35 + sin(t * 1.3 + aSeed * 9.42) * 0.1
  );
  vec2 field = vec2(hash(aSeed * 7.0) * 2.0 - 1.0, hash(aSeed * 13.0) * 2.0 - 1.0) + drift * 0.4;
  vec2 pos = mix(field, aTarget, smoothstep(0.0, 1.0, uMorph));
  pos.x /= uAspect;
  gl_Position = vec4(pos, 0.0, 1.0);
  gl_PointSize = 1.5 + hash(aSeed * 3.0) * 2.0;
  vAlpha = 0.25 + 0.75 * hash(aSeed * 5.0);
}
`;

const FRAGMENT = `
uniform float uIntensity, uBeamX, uBeamAngle, uBeamWidth;
varying float vAlpha;
void main() {
  vec2 uv = gl_FragCoord.xy;
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.1, d);
  gl_FragColor = vec4(1.0, 0.82, 0.55, soft * vAlpha * (0.10 + 0.45 * uIntensity));
}
`;

export function createDust(isMobile: boolean) {
	const count = isMobile ? 2200 : 6000;
	const geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(count * 3);
	const seeds = new Float32Array(count);
	const targets = new Float32Array(count * 2);
	for (let i = 0; i < count; i++) {
		seeds[i] = Math.random();
		targets[i * 2] = 0;
		targets[i * 2 + 1] = 0;
	}
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
	geometry.setAttribute('aTarget', new THREE.BufferAttribute(targets, 2));

	const material = new THREE.ShaderMaterial({
		vertexShader: VERTEX,
		fragmentShader: FRAGMENT,
		transparent: true,
		depthWrite: false,
		depthTest: false,
		blending: THREE.AdditiveBlending,
		uniforms: {
			uTime: { value: 0 },
			uMorph: { value: 0 },
			uBeamX: { value: 0.25 },
			uBeamAngle: { value: 0.32 },
			uBeamWidth: { value: 0.3 },
			uIntensity: { value: 0.9 },
			uAspect: { value: 1 }
		}
	});

	const points = new THREE.Points(geometry, material);
	return { points, material, geometry, targets };
}
