import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures";
import { useStore } from "../hooks/useStore";
import { useState } from "react";

export const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  const activeTexture = textures[texture + "Texture"];

  const cubeSide = (side, x, y, z) => {
    switch (side) {
      case 0:
        addCube(x + 1, y, z);
        break;

      case 1:
        addCube(x - 1, y, z);
        break;

      case 2:
        addCube(x, y + 1, z);
        break;

      case 3:
        addCube(x, y - 1, z);
        break;

      case 4:
        addCube(x, y, z + 1);
        break;

      case 5:
        addCube(x, y, z - 1);
        break;

      default:
        break;
    }
  };

  return (
    <mesh
      ref={ref}
      onPointerMove={(event) => {
        event.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(event) => {
        event.stopPropagation();
        const clickedSide = Math.floor(event.faceIndex / 2);
        const { x, y, z } = ref.current.position;
        if (event.altKey) {
          removeCube(x, y, z);
        } else {
          cubeSide(clickedSide, x, y, z);
        }
      }}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "gray" : "white"}
        map={activeTexture}
        transparent={true}
        opacity={texture === 'glass' ? 0.6 : 1}
        attach="material"
      />
    </mesh>
  );
};
