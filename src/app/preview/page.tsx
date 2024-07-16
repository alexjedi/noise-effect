'use client'

import {
  Component,
  Copy,
  Dribbble,
  Framer,
  Github,
  Grip,
  Linkedin,
  Star,
  TestTube,
  TestTubeDiagonal,
  Twitter,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import CustomLink from '@/components/ui/link'
import Image from 'next/image'
import profilePic from '@/app/avatar.png'
import { NoiseEffect } from '@/components/ThreeScene'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { EffectControls } from '@/components/EffectControlls'
import { component } from '@/lib/copyable'

const projectLinks = {
  code: 'https://github.com/alexjedi/noise-effect',
  framer: 'https://framer.com/projects/new?duplicate=4nZDiYRDmL3lVtSryEzt',
  twitter: 'https://twitter.com/pxl_alexjedi',
  linkedin: 'https://www.linkedin.com/in/alex-shelvey/',
  dribbble: 'https://dribbble.com/pxlhead',
}

export default function Home() {
  const [distortion, setDistortion] = useState(3.0)
  const [distortion2, setDistortion2] = useState(5.0)
  const [speed, setSpeed] = useState(0.2)
  const [rollSpeed, setRollSpeed] = useState(0.2)
  const [chromaticAberration, setChromaticAberration] = useState(0.2)
  const videoUrl = 'https://videos.pexels.com/video-files/8721932/8721932-uhd_2732_1440_25fps.mp4'
  const { toast } = useToast()
  return (
    <main className="relative flex w-screen h-screen flex-col items-start justify-center p-24">
      <Canvas className="!fixed inset-0 z-0">
        <Suspense fallback={null}>
          <NoiseEffect
            distortion={distortion}
            distortion2={distortion2}
            speed={speed}
            rollSpeed={rollSpeed}
            chromaticAberration={chromaticAberration}
            videoUrl={videoUrl}
          />
        </Suspense>
      </Canvas>
    </main>
  )
}
