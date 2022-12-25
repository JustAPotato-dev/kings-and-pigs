export default class Player {
  constructor({ collisionBlocks = [] }) {
    this.position = {
      x: 200,
      y: 200,
    }

    this.velocity = {
      x: 0,
      y: 0,
    }

    this.width = 25
    this.height = 25

    this.sides = {
      bottom: this.position.y + this.height,
    }

    this.gravity = 1

    this.collisionBlocks = collisionBlocks
  }

  draw(context) {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.position.x += this.velocity.x
    this.checkForHorizontalCollisions()

    this.applyGravity()
    this.checkForVerticalCollisions()
  }

  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForHorizontalCollisions() {
    this.collisionBlocks.forEach((block) => {
      if (
        this.position.x <= block.position.x + block.width &&
        this.position.x + this.width >= block.position.x &&
        this.position.y <= block.position.y + block.height &&
        this.position.y + this.height >= block.position.y
      ) {
        if (this.velocity.x < 0) {
          this.position.x = block.position.x + block.width + 0.01
          return
        }

        if (this.velocity.x > 0) {
          this.position.x = block.position.x - this.width - 0.01
          return
        }
      }
    })
  }

  checkForVerticalCollisions() {
    this.collisionBlocks.forEach((block) => {
      if (
        this.position.x <= block.position.x + block.width &&
        this.position.x + this.width >= block.position.x &&
        this.position.y <= block.position.y + block.height &&
        this.position.y + this.height >= block.position.y
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.position.y = block.position.y + block.height + 0.01
          return
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y = block.position.y - this.height - 0.01
          return
        }
      }
    })
  }
}
