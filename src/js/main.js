import Player from './objects/Player.js'
import { keysPressed, addEventListener } from './features/eventListener.js'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
canvas.width = 64 * 16 // 1024
canvas.height = 64 * 9 // 576

const player = new Player()

function animate() {
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)

  player.velocity.x = 0
  if (keysPressed.a) player.velocity.x = -4
  else if (keysPressed.d) player.velocity.x = 4

  player.draw(context)
  player.update(canvas.height)

  requestAnimationFrame(animate)
}

animate()
addEventListener(window, player)
