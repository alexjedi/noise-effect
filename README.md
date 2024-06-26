# Noise Effect Component

A customizable noise effect component for React Three Fiber projects.

## Description

This component creates a distorted noise effect over a video texture, with adjustable parameters for distortion, speed, and chromatic aberration. It's built using React Three Fiber and Three.js.

## Installation

1. Clone this repository or copy the `ThreeScene.tsx` file into your project.
2. Ensure you have the following dependencies installed:

```bash
npm install three @react-three/fiber
```

## Usage

1. Import the `NoiseEffect` component in your React component:

```jsx
import { NoiseEffect } from './path/to/ThreeScene';
import { Canvas } from '@react-three/fiber';
```

2. Use the component within a React Three Fiber `Canvas`:

```jsx
<Canvas>
  <NoiseEffect
    distortion={3.0}
    distortion2={5.0}
    speed={0.2}
    rollSpeed={0.1}
    chromaticAberration={0.1}
    videoUrl="path/to/your/video.mp4"
  />
</Canvas>
```

3. Adjust the parameters as needed:

- `distortion`: Controls the primary distortion effect (default: 3.0)
- `distortion2`: Controls the secondary distortion effect (default: 5.0)
- `speed`: Adjusts the speed of the noise animation (default: 0.2)
- `rollSpeed`: Controls the rolling speed of the effect (default: 0.1)
- `chromaticAberration`: Adjusts the chromatic aberration effect (default: 0.1)
- `videoUrl`: URL or path to the video file to be used as the texture

## Example

```jsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { NoiseEffect } from './ThreeScene';

function App() {
  const [distortion, setDistortion] = useState(3.0);
  const [speed, setSpeed] = useState(0.2);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <NoiseEffect
          distortion={distortion}
          speed={speed}
          videoUrl="/path/to/video.mp4"
        />
      </Canvas>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={distortion}
          onChange={(e) => setDistortion(parseFloat(e.target.value))}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}

export default App;
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- I share this effect for free, you would help me a lot if you supported me with a like, retweet or [follow](https://x.com/pxl_alexjedi): it gives my products a chance to find their users.
- WebGL Noises by [Stefan Gustavson](https://github.com/stegu/webgl-noise/)
