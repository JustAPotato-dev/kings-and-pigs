import Sprite from './objects/Sprite.js'
import Player from './objects/Player.js'
import { keysPressed, addEventListener } from './features/eventListener.js'
import { collisionsLevel1 } from './data/collisions.js'
import parse2D from './utils/parse2D.js'
import createObjectsFrom2D from './utils/createObjectsFrom2D.js'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576

const parsedCollisions = collisionsLevel1.parse2D()
const collisionBlocks = parsedCollisions.createObjectsFrom2D()

const backgroundLevel1 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: './assets/img/backgrounds/level1.png',
})

const player = new Player({
  collisionBlocks,
  imageSrc: './assets/img/king/idle.png',
  frameRate: 11,
})

function animate() {
  backgroundLevel1.draw(context)
  collisionBlocks.forEach((block) => block.draw(context))

  player.velocity.x = 0
  if (keysPressed.a) player.velocity.x = -4
  else if (keysPressed.d) player.velocity.x = 4

  player.draw(context)
  player.update(context)

  requestAnimationFrame(animate)
}

animate()
addEventListener(window, player)
