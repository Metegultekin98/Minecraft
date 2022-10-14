import create from "zustand";
import { nanoid } from "nanoid";

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))


export const useStore = create((set) => ({
  texture: "dirt",
  cubes: getLocalStorage('cubes') || [],
  addCube: (x, y, z) => {
    set((prevState) => ({
      cubes: [
        ...prevState.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: prevState.texture,
        },
      ],
    }));
  },
  removeCube: (x,y,z) => {
    set((prevState) => ({
      cubes: prevState.cubes.filter(cube => {
        const [X,Y,Z] = cube.pos
        return X !== x || Y !== y || Z !== z
      }),
    }));
  },
  setTexture: (texture) => {
    set((prevState) => ({
      texture
    }))
  },
  saveWorld: () => {
    set((prevState) => {
      setLocalStorage('cubes', prevState.cubes)
    })
  },
  resetWorld: () => {
    set(() => ({
      cubes: []
    }))
  },
}));
