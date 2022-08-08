import './App.css';
import {Canvas} from '@react-three/fiber';
import { softShadows } from '@react-three/drei';
import Building from './components/Building'
import MercaptanFlow from './components/MercaptanFlow';
import MercaptanTrapped from './components/MercaptanTrapped';
import TemperatureInversion from './components/TemperatureInversion';
import { useEffect, useState } from 'react';

softShadows()
const Scene = () => {
  const [showMercaptanFlow, setshowMercaptanFlow] = useState(true);
  const [showMercaptanTrapped, setShowMercaptanTrapped] = useState(false);


  // useEffect(() => {
  //   setInterval(() => {
  //     setshowMercaptanFlow(!showMercaptanFlow);
  //   }, 3500)
  // }, []);

  useEffect(() => {
    setInterval(() => {
      setShowMercaptanTrapped(!showMercaptanTrapped);
    }, 5000)
  }, []);

  return (
    <Canvas shadows camera={{position: [-5, 4, 5], fov:85}}>
        <ambientLight intensity={0.3}/>
        <directionalLight
          castShadow
          position={[-1,8,-2]}
          intensity={0.8}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.3}/>
        <pointLight position={[5, -2, 5]} intensity={0.1}/>
        <Building args={[2, 7, 2]} position={[0,-3,0]} color='#cdcdcd'/>
        <Building args={[2, 5, 2]} position={[-1,-2.5,-2]} color='#a8acb3'/>
        <Building args={[2, 6, 2]} position={[2,-2.5,1]} color='#eee5e5'/>

        {/* building shadow */}
        <group>
          <mesh receiveShadow rotation={[-Math.PI/2, 0, 0]} position={[-20,-7,20]}>
            <planeBufferGeometry attach='geometry' args={[100,100]}/>
            <shadowMaterial attach="material" opacity={0.2}/> 
          </mesh>
        </group>

        <TemperatureInversion />
        {/* { showMercaptanFlow && <MercaptanFlow/> } */}
        { showMercaptanTrapped && <MercaptanTrapped /> }

    </Canvas>
  )
}

function App() {
  return (
    <>
      <Scene></Scene>
    </>
  );
}

export default App;
