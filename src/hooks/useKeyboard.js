import { useEffect, useState } from 'react'

const ACTION_KEYBOARD_MAP = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  Space: 'jump',
  Digit1: 'dirt',
  Digit2: 'grass',
  Digit3: 'glass',
  Digit4: 'wood',
  Digit5: 'log'
}

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false
  })

  useEffect(() => {
    const handleKeyDown = e => {
      const { code } = e
      const action = ACTION_KEYBOARD_MAP[code]
      if (action) {
        setActions(prev => ({ ...prev, [action]: true }))
      }
    }

    const handleKeyUp = e => {
      const { code } = e
      const action = ACTION_KEYBOARD_MAP[code]
      if (action) {
        setActions(prev => ({ ...prev, [action]: false }))
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return actions
}
