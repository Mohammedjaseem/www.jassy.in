class Snake {
    constructor(ctx, tilesHorizontal, tilesVertical, paddings) {
        this.ctx = ctx
        this.tilesHorizontal = tilesHorizontal
        this.tilesVertical = tilesVertical
        this.paddings = paddings
        this.init()
    }

    init() {
        let x = getRandomIntFromInterval(1, this.tilesHorizontal)
        let y = getRandomIntFromInterval(1, this.tilesVertical)
        this.body = [
            {
                x: x,
                y: y
            },
            {
                x: x - 1,
                y: y
            },
            {
                x: x - 2, 
                y: y
            },
            {
                x: x - 3, 
                y: y
            }
        ];
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.direction = RIGHT;
    }

    show(){
        for (let i = 0; i < this.body.length; i++) {
            this.ctx.fillStyle = `rgba(255, 255, 255, 0.4)`
            this.ctx.fillRect(
                ((this.body[i].x * TILE_SIZE + 2) - TILE_SIZE) + this.paddings[0], 
                ((this.body[i].y * TILE_SIZE + 2) - TILE_SIZE) + this.paddings[1], 
                TILE_SIZE - 2 , 
                TILE_SIZE - 2
            )
        }
    }

    checkSelf() {
        for (let i = 4; i < this.body.length; i++) {
            if (this.body[0].x == this.body[i].x  && this.body[0].y == this.body[i].y) {
                this.xSpeed = this.ySpeed = 0
                return true
            }
        }
        return false
    }

    update() {
        let newX = this.body[0].x
        let newY = this.body[0].y

        newX += this.xSpeed
        newY += this.ySpeed

        if (newX > this.tilesHorizontal) {
            newX = 1
        }
        if (newX < 1) {
            newX = this.tilesHorizontal
        }
        if (newY > this.tilesVertical) {
            newY = 1
        }
        if (newY < 1) {
            newY = this.tilesVertical
        }
        
        this.body.unshift({x: newX, y: newY})
        this.body.pop();
    }

    move(dir){
        switch(dir){
            case LEFT:
                if (this.direction != RIGHT) {
                    this.xSpeed = -1
                    this.ySpeed = 0
                    this.direction = dir
                }
                break

            case TOP:
                if (this.direction != DOWN) {
                    this.xSpeed = 0
                    this.ySpeed = -1
                    this.direction = dir
                }
                break

            case RIGHT:
                if (this.direction != LEFT) {
                    this.xSpeed = 1
                    this.ySpeed = 0
                    this.direction = dir
                }
                break

            case DOWN:
                if (this.direction != TOP) {
                    this.xSpeed = 0
                    this.ySpeed = 1
                    this.direction = dir
                }
                break
        }
    }

    eat(food){
        return this.body[0].x == food.x && this.body[0].y == food.y
    }
}