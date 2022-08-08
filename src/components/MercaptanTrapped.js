import { useRef, Suspense } from 'react';
import {extend, useFrame} from '@react-three/fiber';
import { shaderMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import glsl from 'babel-plugin-glsl/macro';

const WaveShaderMaterial = shaderMaterial(
    // Uniform
    {
      uTime: 0,
      // uColor: new THREE.Color(0.0, 0.0, 0.0),
      uColor: new THREE.Color(0.3, 0.3, 0.0,),
    },
    // Vertex Shader
    glsl`
      precision mediump float;
      varying vec2 vUv;
      varying float vWave;
      uniform float uTime;
      #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);
  
      void main() {
        vUv = uv;
  
        vec3 pos = position;
        float noiseFreq = 1.5;
        float noiseAmp = 0.4;
        vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
        pos.z += snoise3(noisePos) * noiseAmp;
        vWave = pos.z;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
      }
    `,
    // Fragment Shader
    glsl`
      precision mediump float;
  
      uniform vec3 uColor;
      uniform float uTime;
      uniform sampler2D uTexture;
  
      varying vec2 vUv;
      varying float vWave;
  
      void main() {
        float wave = vWave * 0.2;
  
        gl_FragColor = vec4(sin(uColor), 0.5);
        // gl_FragColor = vec4(uColor, 0.4);
      }
    `
  );
  
  extend({ WaveShaderMaterial });
  
  const Wave = () => {
    const waveRef = useRef();
    useFrame(({clock}) => (waveRef.current.uTime = clock.getElapsedTime()));
    return(
        <mesh rotation={[0,-0.7,0]} position={[0.1,3.8,0]}>
            <planeBufferGeometry args={[6,1,16,16]} />
            <waveShaderMaterial ref={waveRef}/> 
        </mesh>
    );
  }
  
  const MercaptanTrapped = () => {
      return(
        <>
            <Suspense fallback={null}>
                <Wave/>
            </Suspense>

            <group position={[0, 0, 0]}>
                <Html 
                    as='div'
                    // wrapperClass='mercaptan-trap'
                    center={true}
                    position={[28, 3.5 ,0]}
                    >
                    <p className="mt-text">Mercaptan trapped close to ground due to inversion causing the smell to linger</p>
                </Html>
            </group>
        </>
    );
}

// const MercaptanTrapped = () => {
//     const gaseousTexture = useLoader(TextureLoader, 'assets/texture/yellow_smoke.jpg');
//     return (
//         <>
//             {/* mercaptan retained */}
//             <mesh rotation={[0,-0.7,0]} position={[0.1,3.8,0]}>
//                 <planeBufferGeometry args={[6,1]}/>
//                 <meshBasicMaterial map={gaseousTexture} color='#ffffb1'/>
//             </mesh>

//             <group position={[0, 0, 0]}>
//                 <Html 
//                 as='div'
//                 // wrapperClass='mercaptan-trap'
//                 center={true}
//                 position={[28, 3.5 ,0]}
//                 >
//                 <p class="mt-text">Mercaptan trapped close to ground due to inversion causing the smell to linger</p>
//                 </Html>
//             </group>
//         </>
//     );
// }

export default MercaptanTrapped;