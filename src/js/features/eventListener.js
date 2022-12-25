export const keysPressed = {
  w: false,
  a: false,
  s: false,
}

export function addEventListener(window, player) {
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case ' ':
        if (player.velocity.y === 0) player.velocity.y = -25
        break
      case 'a':
        keysPressed.a = true
        break
      case 'd':
        keysPressed.d = true
        break
    }
  })

  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'a':
        keysPressed.a = false
        break
      case 'd':
        keysPressed.d = false
        break
    }
  })
}
