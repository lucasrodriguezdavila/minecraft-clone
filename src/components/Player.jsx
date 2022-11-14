import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useKeyboard } from '../hooks/useKeyboard'

const CHARACTER_SPEED = 4
const CHARACTER_JUMP_FORCE = 6

export const Player = () => {
  const { forward, backward, left, right, jump } = useKeyboard()
  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 0.5, 0]
  }))

  const pos = useRef([0, 0, 0])
  const vel = useRef([0, 0, 0])

  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p))
  }, [api.position])
  useEffect(() => {
    api.velocity.subscribe((p) => (vel.current = p))
  }, [api.velocity])

  useFrame(() => {
    camera.position.copy(
      new Vector3(
        pos.current[0],
        pos.current[1],
        pos.current[2]
      )
    )

    const direction = new Vector3()
    const frontVector = new Vector3(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0))
    const sideVector = new Vector3((left ? 1 : 0) - (right ? 1 : 0), 0, 0)

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(CHARACTER_SPEED).applyEuler(camera.rotation)

    api.velocity.set(direction.x, vel.current[1], direction.z)

    if (jump && Math.abs(vel.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(vel.current[0], CHARACTER_JUMP_FORCE, vel.current[2])
    }
  })

  return (
    <mesh ref={ref} />
  )
}
