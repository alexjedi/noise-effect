import React, { useEffect, useMemo, useRef, useState } from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { ShaderMaterial, VideoTexture, DoubleSide } from 'three'

const NoiseShaderMaterial = {
  uniforms: {
    tDiffuse: { type: 't', value: null },
    time: { type: 'f', value: 0.0 },
    distortion: { type: 'f', value: 3.0 },
    distortion2: { type: 'f', value: 5.0 },
    speed: { type: 'f', value: 0.2 },
    rollSpeed: { type: 'f', value: 0.1 },
    chromaticAberration: { type: 'f', value: 0.1 },
  },

  vertexShader: [
    'varying vec2 vUv;',
    'void main() {',
    'vUv = uv;',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '}',
  ].join('\n'),

  fragmentShader: [
    `uniform sampler2D tDiffuse;
uniform float time;
uniform float distortion;
uniform float distortion2;
uniform float speed;
uniform float rollSpeed;
uniform float chromaticAberration;
varying vec2 vUv;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));

  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

vec2 barrelDistortion(vec2 coord, float amt) {
  vec2 cc = coord - 0.5;
  float dist = dot(cc, cc);
  return coord + cc * dist * amt;
}

void main() {
  vec2 p = vUv;
  float ty = time * speed;
  float yt = p.y - ty;
  float offset = snoise(vec2(yt * 3.0, 0.0)) * 0.2;
  offset = offset * distortion * offset * distortion * offset;
  offset += snoise(vec2(yt * 50.0, 0.0)) * distortion2 * 0.001;

  vec2 offsetR = barrelDistortion(p, chromaticAberration);
  vec2 offsetG = barrelDistortion(p, 0.0);
  vec2 offsetB = barrelDistortion(p, -chromaticAberration);

  vec2 distortedR = vec2(fract(offsetR.x + offset), fract(offsetR.y - time * rollSpeed));
  vec2 distortedG = vec2(fract(offsetG.x + offset), fract(offsetG.y - time * rollSpeed));
  vec2 distortedB = vec2(fract(offsetB.x + offset), fract(offsetB.y - time * rollSpeed));

  float r = texture2D(tDiffuse, distortedR).r;
  float g = texture2D(tDiffuse, distortedG).g;
  float b = texture2D(tDiffuse, distortedB).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}
`,
  ].join('\n'),
}

extend({ NoiseShaderMaterial })

export function NoiseEffect({
  distortion,
  distortion2,
  speed,
  rollSpeed,
  chromaticAberration,
}: {
  distortion: number
  distortion2: number
  speed: number
  rollSpeed: number
  chromaticAberration: number
}) {
  useFrame((state) => {
    if (shaderMaterial && videoTexture) {
      shaderMaterial.uniforms.time.value = state.clock.getElapsedTime()
      shaderMaterial.uniforms.tDiffuse.value = videoTexture
      shaderMaterial.uniforms.distortion.value = distortion
      shaderMaterial.uniforms.distortion2.value = distortion2
      shaderMaterial.uniforms.speed.value = speed
      shaderMaterial.uniforms.rollSpeed.value = rollSpeed
      shaderMaterial.uniforms.chromaticAberration.value = chromaticAberration
    }
  })

  const materialRef = useRef()
  const videoRef = useRef()
  const [videoTexture, setVideoTexture] = useState(null)

  const shaderMaterial = useMemo(() => new ShaderMaterial(NoiseShaderMaterial), [])

  useEffect(() => {
    const video = document.createElement('video')
    video.src = 'https://videos.pexels.com/video-files/8721932/8721932-uhd_2732_1440_25fps.mp4'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    video.load()

    video.onloadeddata = () => {
      video.play()
      const texture = new VideoTexture(video)
      setVideoTexture(texture)
    }

    videoRef.current = video

    return () => {
      video.pause()
      video.src = ''
      video.load()
    }
  }, [])

  useFrame((state) => {
    if (shaderMaterial && videoTexture) {
      shaderMaterial.uniforms.time.value = state.clock.getElapsedTime()
      shaderMaterial.uniforms.tDiffuse.value = videoTexture
    }
  })

  const { viewport } = useThree()

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <primitive object={shaderMaterial} ref={materialRef} attach="material" side={DoubleSide} />
    </mesh>
  )
}
