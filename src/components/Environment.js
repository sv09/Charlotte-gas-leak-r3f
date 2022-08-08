import { TorusBufferGeometry } from "three";

const Environment = () => {
    return(
        <mesh >
            <TorusBufferGeometry attach='geometry' args={[10, 3, 16, 100]}/>
            <meshBasicMaterial attach='material' color='blue'/>
        </mesh>
    )
}

export default Environment;