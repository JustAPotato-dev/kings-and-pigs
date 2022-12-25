import Sprite from "./objects/Sprite.js"
import Player from "./objects/Player.js"
import { keysPressed, addEventListener, removeKeydownEventListener } from "./features/eventListener.js"
import { collisionsLevel1, collisionsLevel2, collisionsLevel3 } from "./data/collisions.js"
import parse2D from "./utils/parse2D.js"
import createObjectsFrom2D from "./utils/createObjectsFrom2D.js"

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")
canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576

let parsedCollisions, collisionBlocks, background, doors

const player = new Player({
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
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 1,
          duration: 1,
          onComplete: () => {
            level++
            if (level === 4) level = 1
            removeKeydownEventListener(window)
            levels[level].init()
            player.switchSprite("idleRight")
            player.preventInput = false
            gsap.to(overlay, {
              opacity: 0,
              duration: 1,
            })
          },
        })
      },
    },
  },
})

let level = 1
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D()
      collisionBlocks = player.collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.lastDirection = "right"

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "./assets/img/backgrounds/level1.png",
      })

      doors = [
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
        }),
      ]

      addEventListener(window, player, doors)
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D()
      collisionBlocks = player.collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.position = { x: 96, y: 140 }
      player.lastDirection = "right"

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "./assets/img/backgrounds/level2.png",
      })

      doors = [
        new Sprite({
          position: {
            x: 772.0,
            y: 336,
          },
          imageSrc: "./assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoPlay: false,
        }),
      ]

      addEventListener(window, player, doors)
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D()
      collisionBlocks = player.collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.position = { x: 724, y: 140 }
      player.lastDirection = "left"

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: "./assets/img/backgrounds/level3.png",
      })

      doors = [
        new Sprite({
          position: {
            x: 176.0,
            y: 335,
          },
          imageSrc: "./assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoPlay: false,
        }),
      ]

      addEventListener(window, player, doors)
    },
  },
}

const overlay = {
  opacity: 0,
}

function animate() {
  background.draw(context)
  collisionBlocks.forEach((block) => block.draw(context))

  doors.forEach((door) => door.draw(context))

  player.handleInput(keysPressed)
  player.draw(context)
  player.update()

  context.save()
  context.globalAlpha = overlay.opacity
  context.fillStyle = "black"
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.restore()

  requestAnimationFrame(animate)
}

levels[level].init()
animate()
addEventListener(window, player, doors)
