'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'
//@ts-ignore
import fragmentShader from '@/lib/fragment.glsl'

extend({ OrthographicCamera })

const ShaderMaterial = () => {
  const materialRef = useRef<any>()
  const { size } = useThree()
  const vScroll = useRef(300)
  const vScrollDamp = useRef(0)
  const vResolution = useRef(new THREE.Vector2(size.width, size.height))

  useEffect(() => {
    const onScroll = () => {
      vScroll.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useFrame((state, delta) => {
    vScrollDamp.current += (vScroll.current - vScrollDamp.current) * delta * 0.1
    if (materialRef.current) {
      materialRef.current.uniforms.u_mouse.value = new THREE.Vector2(
        state.size.width / 4,
        vScrollDamp.current
      )
      materialRef.current.uniforms.u_resolution.value.set(state.size.width, state.size.height)
    }
  })

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={`
        varying vec2 v_texcoord;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          v_texcoord = uv;
        }
      `}
      fragmentShader={fragmentShader}
      uniforms={{
        u_mouse: { value: new THREE.Vector2(0, vScrollDamp.current) },
        u_resolution: { value: new THREE.Vector2(size.width, size.height) },
        u_pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      }}
      defines={{
        VAR: 2,
      }}
    />
  )
}

const Plane = () => {
  const meshRef = useRef<any>()
  const { size } = useThree()

  useEffect(() => {
    const handleResize = () => {
      if (meshRef.current) {
        meshRef.current.scale.set(size.width, size.height, 1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [size])

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <ShaderMaterial />
    </mesh>
  )
}

const ThreeScene = () => {
  return (
    <section className="relative w-100vw h-[300vh] overflow-scroll">
      <div className="w-100vw h-100vh fixed inset-0">
        <Canvas gl={{ antialias: true }} dpr={[1, 1]}>
          <OrthographicCamera makeDefault position={[0, 0, 1]} zoom={1} />
          <Plane />
        </Canvas>
      </div>
    </section>
  )
}

export default ThreeScene
