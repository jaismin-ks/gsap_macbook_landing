import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import StudioLights from './three/StudioLights';
import clsx from 'clsx';
import { features, featureSequence} from "../constants";
import { useMediaQuery } from "react-responsive";
import MacBookModel from './models/Macbook';
import { Html } from "@react-three/drei";


const ModelScroll = () => {

  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });


  return (
    <group ref={groupRef}>
      <Suspense fallback={<Html><h1 className='text-white text-3xl uppercase'>Loading...</h1></Html>}>
        <MacBookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]}/>
      </Suspense>
    </group>
  )
}
const Features = () => {
  return (
    <section id="features">
      <h2>See it all in a new light.</h2>
      <Canvas id="f-canvas" camera={{position: [0, 1, 5], fov: 45}}>
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ModelScroll />

      </Canvas>
      <div className="absolute inset-0">
        {features.map((feature, index) => (
          <div key={feature.id} className={clsx('box', `box${index +1}`, feature.styles)}>{feature.text}</div>
        ))}
      </div>
    </section>
  )
}

export default Features