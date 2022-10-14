import { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";
import { dirtImg, grassImg, glassImg, logImg, woodImg } from "../images/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  log: logImg,
  wood: woodImg,
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, log, wood } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      log,
      wood,
    };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      console.log("pressed", pressedTexture);
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, log, wood]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute centered texture-selector">
        {Object.entries(images).map(([k, src]) => {
          return (
            <img
              key={k}
              src={src}
              alt={k}
              className={`${k === activeTexture ? `active` : ``}`}
            />
          );
        })}
      </div>
    )
  );
};
