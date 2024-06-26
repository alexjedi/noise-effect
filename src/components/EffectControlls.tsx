import React from 'react'
import { Slider } from './ui/slider'

export function EffectControls({
  distortion,
  setDistortion,
  distortion2,
  setDistortion2,
  speed,
  setSpeed,
  rollSpeed,
  setRollSpeed,
}: {
  distortion: number
  setDistortion: (value: number) => void
  distortion2: number
  setDistortion2: (value: number) => void
  speed: number
  setSpeed: (value: number) => void
  rollSpeed: number
  setRollSpeed: (value: number) => void
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white z-20">
      <div className="mb-2">
        <label>Distortion: {distortion.toFixed(2)}</label>
        <Slider
          value={[distortion]}
          onValueChange={(value) => setDistortion(value[0])}
          max={10}
          step={0.1}
        />
      </div>
      <div className="mb-2">
        <label>Distortion 2: {distortion2.toFixed(2)}</label>
        <Slider
          value={[distortion2]}
          onValueChange={(value) => setDistortion2(value[0])}
          max={10}
          step={0.1}
        />
      </div>
      <div className="mb-2">
        <label>Speed: {speed.toFixed(2)}</label>
        <Slider value={[speed]} onValueChange={(value) => setSpeed(value[0])} max={1} step={0.01} />
      </div>
      <div className="mb-2">
        <label>Roll Speed: {rollSpeed.toFixed(2)}</label>
        <Slider
          value={[rollSpeed]}
          onValueChange={(value) => setRollSpeed(value[0])}
          max={1}
          step={0.01}
        />
      </div>
    </div>
  )
}
