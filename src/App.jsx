import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Ground } from './components/Ground'
import { FPV as Fpv } from './components/FPV'
import { Player } from './components/Player'
import { Cubes } from './components/Cubes'
import { TextureSelector } from './components/TextureSelector'

function App () {
  return (
    <>
      <Canvas>
        <Sky />
        <ambientLight intensity={0.5} />
        <Fpv />
        <Physics>
          <Player />
          <Ground />
          <Cubes />
        </Physics>
      </Canvas>
      <TextureSelector />
      <div className='crosshair'>+</div>
    </>

  )
}

export default App
