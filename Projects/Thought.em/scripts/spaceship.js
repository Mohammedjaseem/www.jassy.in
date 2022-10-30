class SpaceShip {
    constructor(ctx, radius, canvasWidth, canvasHeight) {
        this.ctx = ctx
        this.radius = radius
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.init()
    }

    init() {
        this.posX = this.canvasWidth / 2
        this.posY = this.canvasHeight / 2

        this.angle = radians(getRandomIntFromInterval(0, 359))

        this.velX = 0
        this.velY = 0

        this.laser = []
    }

    show() {
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.6)"
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        this.ctx.lineWidth = 1

        this.headX = this.posX + Math.cos(this.angle) * this.radius
        this.headY = this.posY + Math.sin(this.angle) * this.radius

        triangle(
            this.ctx, [this.headX, this.headY], [this.posX + Math.cos(this.angle - radians(135)) * (this.radius + this.radius * 0.45), this.posY + Math.sin(this.angle - radians(135)) * (this.radius + this.radius * 0.45)], [this.posX + Math.cos(this.angle - radians(225)) * (this.radius + this.radius * 0.45), this.posY + Math.sin(this.angle - radians(225)) * (this.radius + this.radius * 0.45)],
            true
        )

        triangle(
            this.ctx, [this.posX + Math.cos(this.angle) * this.radius, this.posY + Math.sin(this.angle) * this.radius], [this.posX + Math.cos(this.angle - radians(135)) * (this.radius * 0.5), this.posY + Math.sin(this.angle - radians(135)) * (this.radius * 0.5)], [this.posX + Math.cos(this.angle - radians(225)) * (this.radius * 0.5), this.posY + Math.sin(this.angle - radians(225)) * (this.radius * 0.5)],
            false
        )

        for (let i = 0; i < this.laser.length; i++) {
            this.laser[i].show()
        }
    }

    update() {
        this.posX += this.velX
        this.posY += this.velY

        this.velX -= this.velX / 60
        this.velY -= this.velY / 60

        if (this.posX > this.canvasWidth + this.radius) {
            this.posX = 0
        } else if (this.posX < -this.radius) {
            this.posX = this.canvasWidth
        }

        if (this.posY > this.canvasHeight + this.radius) {
            this.posY = 0
        } else if (this.posY < -this.radius) {
            this.posY = this.canvasHeight
        }

        for (let i = 0; i < this.laser.length; i++) {
            this.laser[i].update()
            if (
                this.laser[i].posX < 0 ||
                this.laser[i].posX > this.canvasWidth ||
                this.laser[i].posY < 0 ||
                this.laser[i].posY > this.canvasHeight
            ) {
                this.laser.splice(i, 1)
            }
        }
    }

    thrust() {
        this.velX += Math.cos(this.angle) * 1
        this.velY += Math.sin(this.angle) * 1
    }

    turnLeft() {
        this.angle -= radians(6)
    }

    turnRight() {
        this.angle += radians(6)
    }

    fire() {
        if (this.laser.length < 10) {
            this.laser.push(new Laser(this.ctx, [this.headX, this.headY], this.radius, this.angle))
        }
    }
}