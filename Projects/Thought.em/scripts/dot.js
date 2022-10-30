class Dot{
	
	constructor(x, y, ctx, innerWidth, innerHeight) {
		this.x = x;
		this.y = y;
		this.ctx = ctx;
		this.radius = Math.floor(getRandomIntFromInterval(3, 9));
		this.directionX = Math.random() < 0.5 ? -1 : 1;
		this.directionY = Math.random() < 0.5 ? -1 : 1;
		this.xSpeed = getRandomArbitrary(0.1, 0.8) * this.directionX;
		this.ySpeed = getRandomArbitrary(0.1, 0.8) * this.directionY;
		this.alpha = getRandomArbitrary(0.1, 0.3);
		this.canvasWidth = innerWidth
		this.canvasHeight = innerHeight
	}

	update() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		if (this.x < this.radius || this.x > this.innerWidth - this.radius) {
			this.xSpeed *= -1;
		}
		if (this.y < this.radius || this.y > this.innerHeight - this.radius) {
			this.ySpeed *= -1;
		}
	}

	show() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		this.ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
		this.ctx.fill();
		this.ctx.closePath();
	}

	check(dot, dist) {
		let d = distance(this.x, this.y, dot.x, dot.y)
		if (d <= dist) {
				let gradient = this.ctx.createLinearGradient(this.x, this.y, dot.x, dot.y);
				gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
				gradient.addColorStop(1,`rgba(255, 255, 255, ${dot.alpha})` );
	
				this.ctx.beginPath();
				this.ctx.moveTo(this.x, this.y);
				this.ctx.lineTo(dot.x, dot.y);
				this.ctx.strokeStyle = gradient
				this.ctx.stroke();
				this.ctx.closePath();
		}
	}
}