
const Building = ({position, args, color}) => {
    return(
      <mesh castShadow position={position}>
        <boxBufferGeometry attach='geometry' args={args}/>
        <meshStandardMaterial attach='material' color={color}/>
      </mesh>
    )
}

export default Building;