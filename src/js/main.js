import Sprite from "./objects/Sprite.js"
import Player from "./objects/Player.js"
import { keysPressed, addEventListener } from "./features/eventListener.js"
import { collisionsLevel1 } from "./data/collisions.js"
import parse2D from "./utils/parse2D.js"
import createObjectsFrom2D from "./utils/createObjectsFrom2D.js"

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576

const parsedCollisions = collisionsLevel1.parse2D()
const collisionBlocks = parsedCollisions.createObjectsFrom2D()

const backgroundLevel1 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./assets/img/backgrounds/level1.png",
})

const player = new Player({
  collisionBlocks,
  imageSrc: "./assets/img/king/idle.png",
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./assets/img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: "./assets/img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./assets/img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./assets/img/king/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: "./assets/img/king/enterDoor.png",
    },
  },
})

const doors = [
  new Sprite({
    position: {
      x: 770,
      y: 270,
    },
    imageSrc: "./assets/img/doorOpen.png",
    frameRate: 5,
    frameBuffer: 5,
    loop: false,
    autoPlay: false,
    animations: {
      open: {
        frameRate: 5,
        frameBuffer: 5,
        loop: false,
        imageSrc: "./assets/img/doorOpen.png",
      },
    },
  }),
]

function animate() {
  backgroundLevel1.draw(context)
  collisionBlocks.forEach((block) => block.draw(context))

  doors.forEach((door) => door.draw(context))

  player.handleInput(keysPressed)
  player.draw(context)
  player.update(context)

  requestAnimationFrame(animate)
}

animate()
addEventListener(window, player, doors)
