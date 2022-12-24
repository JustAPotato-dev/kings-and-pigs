export default class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    }

    this.width = 100
    this.height = 100

    this.sides = {
      bottom: this.position.y + this.height,
    }
  }

  draw(context) {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update(canvasHeight) {
    if (this.sides.bottom < canvasHeight) {
      this.position.y++
      this.sides.bottom = this.position.y + this.height
    }
  }
}
