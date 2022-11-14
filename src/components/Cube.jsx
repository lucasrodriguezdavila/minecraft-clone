import { useBox } from '@react-three/cannon'
import { useMemo, useState } from 'react'
import { useStore } from '../hooks/useStore'
import { dirtTexture, glassTexture, logTexture, woodTexture } from '../images/textures'

const MAX_DISTANCE = 3

export const Cube = ({ id, pos, texture }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ref] = useBox(() => ({
    type: 'Static',
    position: pos
  }))

  const activeTexture = useMemo(() => {
    switch (texture) {
      case 'dirt':
        return dirtTexture
      case 'glass':
        return glassTexture
      case 'log':
        return logTexture
      case 'wood':
        return woodTexture

      default:
        return dirtTexture
    }
  }, [texture])

  const removeCube = useStore(state => state.removeCube)

  return (
    <mesh
      ref={ref}
      onPointerOver={(e) => {
        if (e.distance < MAX_DISTANCE) {
          e.stopPropagation()
          setIsHovered(true)
        }
      }}
      onPointerOut={(e) => {
        if (e.distance < MAX_DISTANCE) {
          e.stopPropagation()
          setIsHovered(false)
        }
      }}
      onClick={(e) => {
        if (e.distance < MAX_DISTANCE) {
          if (e.altKey) {
            e.stopPropagation()
            removeCube(id)
          }
        }
      }}
    >
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial
        attach='material' map={activeTexture}
        color={isHovered ? 'grey' : 'white'}
      />
    </mesh>
  )
}
