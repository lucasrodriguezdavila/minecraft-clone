import { useEffect, useMemo } from 'react'
import { useKeyboard } from '../hooks/useKeyboard'
import { useStore } from '../hooks/useStore'
import { dirtImg, glassImg, grassImg, logImg, woodImg } from '../images/images'

export const TextureSelector = () => {
  const { dirt, glass, grass, wood, log } = useKeyboard()
  const [texture, setTexture] = useStore(state => [state.texture, state.setTexture])

  useEffect(() => {
    const options = {
      dirt, glass, grass, wood, log
    }
    const selectedTexture = Object.entries(options).find(([_, value]) => value)

    console.log({ selectedTexture, texture })
    if (selectedTexture) {
      const [textureName] = selectedTexture
      setTexture(textureName)
    }
  }, [dirt, glass, grass, wood, log])

  const images = useMemo(() => {
    return {
      dirt: dirtImg,
      grass: grassImg,
      glass: glassImg,
      wood: woodImg,
      log: logImg
    }
  }, [])

  return (
    <div className='texture-selector'>

      {Object.entries(images).map(([imageKey, img]) => (
        <img
          className={texture === imageKey ? 'selected' : ''}
          key={imageKey}
          src={img}
          alt
        />
      ))}
    </div>
  )
}
