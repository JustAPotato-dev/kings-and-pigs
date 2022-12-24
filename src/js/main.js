import Sprite from './objects/Sprite.js'
import Player from './objects/Player.js'
import { keysPressed, addEventListener } from './features/eventListener.js'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576

const backgroundLevel1 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: './assets/img/backgrounds/level1.png',
})

const player = new Player()

function animate() {
  backgroundLevel1.draw(context)

  player.velocity.x = 0
  if (keysPressed.a) player.velocity.x = -4
  else if (keysPressed.d) player.velocity.x = 4

  player.draw(context)
  player.update(canvas.height)

  requestAnimationFrame(animate)
}

animate()
addEventListener(window, player)
