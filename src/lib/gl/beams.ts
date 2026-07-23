import * as THREE from 'three';

const VERTEX = `
varying vec2 vUv;
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
  vUv = uv;
}
`;

const FRAGMENT = `
uniform float uTime, uX, uAngle, uWidth, uIntensity, uAspect;
uniform vec3 uColor;
varying vec2 vUv;
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  p.x *= uAspect;
  vec2 dir = vec2(sin(uAngle), -cos(uAngle));
  float along = dot(p - vec2(uX, 1.0), dir);
  float across = abs(dot(p - vec2(uX, 1.0), vec2(dir.y, -dir.x)));
  float beam = smoothstep(uWidth, 0.0, across) * smoothstep(-2.4, -0.2, -along);
  float flicker = 0.96 + 0.04 * sin(uTime * 1.7 + along * 3.0);
  float fade = smoothstep(1.15, 0.1, vUv.y) * 0.35 + 0.65;
  gl_FragColor = vec4(uColor, beam * flicker * fade * uIntensity * 0.4);
}
`;

export const BEAM_ORANGE = new THREE.Vector3(0.949, 0.471, 0.188);
export const BEAM_HONEY = new THREE.Vector3(1.0, 0.698, 0.0);

export const SPECTRUM_COLORS = {
	t: new THREE.Vector3(0.29, 0.56, 0.81),
	e: new THREE.Vector3(1.0, 0.7, 0.0),
	a: new THREE.Vector3(0.95, 0.47, 0.19),
	m: new THREE.Vector3(0.36, 0.72, 0.65),
	u: new THREE.Vector3(0.36, 0.72, 0.45)
};
export const SPECTRUM_ANGLES = [-0.42, -0.21, 0, 0.21, 0.42];

function makeBeamMaterial(color: THREE.Vector3) {
	return new THREE.ShaderMaterial({
		vertexShader: VERTEX,
		fragmentShader: FRAGMENT,
		transparent: true,
		depthWrite: false,
		depthTest: false,
		blending: THREE.AdditiveBlending,
		uniforms: {
			uTime: { value: 0 },
			uX: { value: 0 },
			uAngle: { value: 0 },
			uWidth: { value: 0.2 },
			uIntensity: { value: 0 },
			uColor: { value: color.clone() },
			uAspect: { value: 1 }
		}
	});
}

export function createBeams() {
	const geometry = new THREE.PlaneGeometry(2, 2);
	const beamA = makeBeamMaterial(BEAM_ORANGE);
	const beamB = makeBeamMaterial(BEAM_HONEY);
	const meshA = new THREE.Mesh(geometry, beamA);
	const meshB = new THREE.Mesh(geometry, beamB);
	meshA.renderOrder = 0;
	meshB.renderOrder = 1;

	const splitMeshes = (['t', 'e', 'a', 'm', 'u'] as const).map((key, i) => {
		const mat = makeBeamMaterial(SPECTRUM_COLORS[key]);
		mat.uniforms.uWidth.value = 0.03;
		mat.uniforms.uAngle.value = SPECTRUM_ANGLES[i];
		const mesh = new THREE.Mesh(geometry, mat);
		mesh.renderOrder = 2 + i;
		mesh.visible = false;
		return mesh;
	});

	return { geometry, meshA, meshB, beamA, beamB, splitMeshes };
}
