export default class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    }

    this.velocity = {
      x: 0,
      y: 0,
    }

    this.width = 100
    this.height = 100
    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.gravity = 1
  }

  draw(context) {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update(canvasHeight) {
    this.position.y += this.velocity.y

    // above bottom of canvas
    if (this.sides.bottom + this.velocity.y < canvasHeight) {
      this.velocity.y += this.gravity
      this.sides.bottom = this.position.y + this.height
    } else this.velocity.y = 0
  }
}
