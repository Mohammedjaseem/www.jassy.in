class Asteroid {
    constructor(ctx, radius, canvasWidth, canvasHeight) {
        this.ctx = ctx
        this.posX = getRandomIntFromInterval(radius, canvasWidth)
        this.posY = getRandomIntFromInterval(radius, canvasHeight)
        this.radius = radius
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.init()
    }

    init() {
        this.angleAndRadiusOne = [0, getRandomArbitrary(6, this.radius)]
        this.angleAndRadiusTwo = [radians(60), getRandomArbitrary(6, this.radius)]
        this.angleAndRadiusThree = [radians(60 * 2), getRandomArbitrary(6, this.radius)]
        this.angleAndRadiusFour = [radians(60 * 3), getRandomArbitrary(6, this.radius)]
        this.angleAndRadiusFive = [radians(60 * 4), getRandomArbitrary(6, this.radius)]
        this.angleAndRadiusSix = [radians(60 * 5), getRandomArbitrary(6, this.radius)]

        this.velX = getRandomArbitrary(-2, 2) + 0.2
        this.velY = getRandomArbitrary(-2, 2) + 0.2
    }

    show() {
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
        hexagon(
            this.ctx,
            getDimensions([this.posX, this.posY], this.angleAndRadiusOne[0], this.angleAndRadiusOne[1]),
            getDimensions([this.posX, this.posY], this.angleAndRadiusTwo[0], this.angleAndRadiusTwo[1]),
            getDimensions([this.posX, this.posY], this.angleAndRadiusThree[0], this.angleAndRadiusThree[1]),
            getDimensions([this.posX, this.posY], this.angleAndRadiusFour[0], this.angleAndRadiusFour[1]),
            getDimensions([this.posX, this.posY], this.angleAndRadiusFive[0], this.angleAndRadiusFive[1]),
            getDimensions([this.posX, this.posY], this.angleAndRadiusSix[0], this.angleAndRadiusSix[1])
        )
    }

    update() {
        this.posX += Math.floor(this.velX)
        this.posY += Math.floor(this.velY)

        if (this.posX > this.canvasWidth + this.radius) {
            this.posX = 0
        }

        if (this.posX < -this.radius) {
            this.posX = this.canvasWidth
        }

        if (this.posY > this.canvasHeight + this.radius) {
            this.posY = 0
        }

        if (this.posY < -this.radius) {
            this.posY = this.canvasHeight
        }
    }
}