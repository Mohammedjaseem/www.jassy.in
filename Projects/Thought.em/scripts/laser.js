class Laser {
    constructor (ctx, pos, radius, angle) {
        this.ctx = ctx
        this.posX = pos[0]
        this.posY = pos[1]
        this.velX = Math.cos(angle) * radius * 0.4
        this.velY = Math.sin(angle) * radius * 0.4
        this.angle = angle
    }

    show() {
        this.dot()
    }

    update() {
        this.posX += this.velX
        this.posY += this.velY
    }

    dot() {
        this.ctx.beginPath();
		this.ctx.arc(this.posX, this.posY, 2, 0, Math.PI * 2, false);
		this.ctx.fill();
		this.ctx.closePath();
    }

    line(x1, y1, x2, y2) {
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
    }
}