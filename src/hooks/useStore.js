import create from 'zustand'
import { nanoid } from 'nanoid'

export const useStore = create(set => ({
  texture: 'dirt',
  cubes: [
    {
      id: nanoid(),
      pos: [1, 0, 1],
      texture: 'dirt'
    },
    {
      id: nanoid(),
      pos: [1, 0, 2],
      texture: 'wood'
    },
    {
      id: nanoid(),
      pos: [1, 0, 3],
      texture: 'glass'
    },
    {
      id: nanoid(),
      pos: [1, 0, 4],
      texture: 'log'
    }
  ],
  addCube: (x, y, z) => {
    set(state => ({
      cubes: [
        ...state.cubes,
        {
          id: nanoid(),
          pos: [x, y, z],
          texture: state.texture
        }
      ]
    }))
  },
  removeCube: (id) => {
    set(state => ({
      cubes: state.cubes.filter(cube => cube.id !== id)
    }))
  },
  setTexture: (texture) => {
    set(state => ({
      texture
    }))
  },
  saveWorld: () => {},
  resetWorld: () => {}
}))
