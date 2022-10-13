import {dirtImg,glassImg,grassImg,logImg,woodImg} from './images'
import {TextureLoader} from "three";

const  dirtTexture = new TextureLoader().load(dirtImg)
const  glassTexture = new TextureLoader().load(glassImg)
const  grassTexture = new TextureLoader().load(grassImg)
const  logTexture = new TextureLoader().load(logImg)
const  woodTexture = new TextureLoader().load(woodImg)

export {
    dirtTexture,
    glassTexture,
    grassTexture,
    logTexture,
    woodTexture
}
