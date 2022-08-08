import { Html } from '@react-three/drei';
import { useEffect, useState } from 'react';

const CoolAir = () => {
    return (
        <mesh position={[0,-1.01,0]}>
            <sphereGeometry args={[6, 30, 30, 2, 6.28, 0, 0.45]}/>
            <meshPhysicalMaterial color={'#004cff'} transmission={0.7} metalness={0.5} roughness={0.25} />
        </mesh>
    );
}

const TemperatureInversion = () => {
const [showCoolLayer, setShowCoolLayer] = useState(false);

useEffect(() => {
    setInterval(() => {
      setShowCoolLayer(!showCoolLayer)
    }, 2000)
}, []);

    return (
        <>
            {/* hot air */} 
            <mesh position={[0,-1,0]}>
                <sphereGeometry args={[6, 30, 30, 2, 6.28, 0, 0.4]}/>
                <meshPhysicalMaterial color={'#ff8400'} transmission={0.5} metalness={0.7} roughness={0.8}/>
            </mesh>

            {/* cool air */}
            {showCoolLayer && <CoolAir />}

            <group position={[0, 0, 0]}>
                <Html 
                    as='div'
                    wrapperClass='wi-text'
                    center={true}
                    position={[-4.2, 4.5, 0]}
                >
                <h4 className='wi'>Inversion</h4>
                <p>When a thin layer of cool air develops under a warm layer of air</p>
                </Html>
            </group>
        </>
    );
}

export default TemperatureInversion;