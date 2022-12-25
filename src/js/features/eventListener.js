export const keysPressed = {
  w: false,
  a: false,
  s: false,
}

export function addEventListener(window, player, doors) {
  window.addEventListener("keydown", (event) => {
    if(player.preventInput) return
    switch (event.key) {
      case "w":
        for (let i = 0; i < doors.length; i++) {
          const door = doors[i]

          if (
            player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
            player.hitbox.position.x >= door.position.x &&
            player.hitbox.position.y <= door.position.y + door.height &&
            player.hitbox.position.y + player.hitbox.height >= door.position.y
          ) {
            player.velocity.x = 0
            player.velocity.y = 0
            player.preventInput = true;
            player.switchSprite("enterDoor")
            door.play()
            return
          }
        }

        if (player.velocity.y === 0) player.velocity.y = -25
        break
      case "a":
        keysPressed.a = true
        break
      case "d":
        keysPressed.d = true
        break
    }
  })

  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "a":
        keysPressed.a = false
        break
      case "d":
        keysPressed.d = false
        break
    }
  })
}
