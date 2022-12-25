import Sprite from "./Sprite.js"

export default class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate }) {
    super({ imageSrc, frameRate })
    this.position = {
      x: 200,
      y: 200,
    }

    this.velocity = {
      x: 0,
      y: 0,
    }

    this.sides = {
      bottom: this.position.y + this.height,
    }

    this.gravity = 1

    this.collisionBlocks = collisionBlocks
  }

  update(context) {
    // This is for debugging purposes, to see the player's hitbox
    // context.fillStyle = 'rgba(0, 0, 255, 0.5)'
    // context.fillRect(this.position.x, this.position.y, this.width, this.height)

    this.position.x += this.velocity.x

    this.updateHitbox()

    this.checkForHorizontalCollisions()

    this.applyGravity()

    this.updateHitbox()

    this.checkForVerticalCollisions()
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForHorizontalCollisions() {
    this.collisionBlocks.forEach((block) => {
      if (
        this.hitbox.position.x <= block.position.x + block.width &&
        this.hitbox.position.x + this.hitbox.width >= block.position.x &&
        this.hitbox.position.y <= block.position.y + block.height &&
        this.hitbox.position.y + this.hitbox.height >= block.position.y
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x
          this.position.x = block.position.x + block.width - offset + 0.01
          return
        }

        if (this.velocity.x > 0) {
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
          this.position.x = block.position.x - offset - 0.01
          return
        }
      }
    })
  }

  checkForVerticalCollisions() {
    this.collisionBlocks.forEach((block) => {
      if (
        this.hitbox.position.x <= block.position.x + block.width &&
        this.hitbox.position.x + this.hitbox.width >= block.position.x &&
        this.hitbox.position.y <= block.position.y + block.height &&
        this.hitbox.position.y + this.hitbox.height >= block.position.y
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y
          this.position.y = block.position.y + block.height - offset + 0.01
          return
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = block.position.y - offset - 0.01
          return
        }
      }
    })
  }
}
