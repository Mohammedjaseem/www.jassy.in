window.onload = function() {
    let requestAnimationFrame,
        requestId,
        canvasMain,
        ctxMain,
        width,
        height,
        dots = [],
        n = 22,
        dist = 260,
        snake,
        tilesVertical = 0,
        tilesHorizontal = 0,
        updatedTime,
        pageIndicators = document.querySelectorAll('.indicator'),
        contactTypes = document.querySelectorAll('.contact-icon');

    let canvasType = CANVAS_ASTEROIDS;

    let spaceShip, asteroids = [];
    let asteroidKeyControl = -1
    let asteroidCount = 10

    pageIndicators[0].addEventListener('click', (evt => {
        setCanvasType(CANVAS_PARTICLES)
        setIndicator(canvasType)
    }));

    pageIndicators[1].addEventListener('click', (evt => {
        setCanvasType(CANVAS_SNAKE)
        setIndicator(canvasType)
    }));

    pageIndicators[2].addEventListener('click', (evt => {
        setCanvasType(CANVAS_ASTEROIDS)
        setIndicator(canvasType)
    }));

    contactTypes[0].addEventListener('click', (e => {
        openHyperLink("https://github.com/azwisec")
    }))

    contactTypes[1].addEventListener('click', (e => {
        openHyperLink("https://www.linkedin.com/in/aswin-govind/")
    }))

    contactTypes[2].addEventListener('click', (e => {
        openHyperLink("https://www.youtube.com/channel/UCnmXA9inncBTo2TDvIVmE6Q")
    }))

    function openHyperLink(link) {
        window.open(link, '_blank');
    }

    function setCanvasType(pos) {
        cancelAnimationFrame(requestId)
        canvasType = pos
        draw()
    }

    function setIndicator(index) {
        for (let i = 0; i < pageIndicators.length; i++) {
            if (i == index) {
                pageIndicators[index].children[IMAGE_INDEX].classList.remove('hidden')
                pageIndicators[index].children[DIV_INDEX].classList.add('glow')
            } else {
                pageIndicators[i].children[IMAGE_INDEX].classList.add('hidden')
                pageIndicators[i].children[DIV_INDEX].classList.remove('glow')
            }
        }
    }

    function setupEnvironment() {
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

        canvasMain = document.getElementById("canvasMain")

        ctxMain = canvasMain.getContext("2d")
    }

    function setupCanvas() {
        width = window.innerWidth
        height = window.innerHeight

        canvasMain.width = width
        canvasMain.height = height

        let widthRem = width % TILE_SIZE
        let heightRem = height % TILE_SIZE
        let gameWidth = width
        let gameHeight = height

        spaceShip = new SpaceShip(ctxMain, 16, width, height)
        for (let i = 0; i < asteroidCount; i++) {
            asteroids.push(new Asteroid(ctxMain, 28, width, height))
        }

        if (widthRem != 0) {
            gameWidth = width - widthRem
        }

        if (heightRem != 0) {
            gameHeight = height - heightRem
        }

        tilesHorizontal = gameWidth / TILE_SIZE
        tilesVertical = gameHeight / TILE_SIZE

        snake = new Snake(ctxMain, tilesHorizontal, tilesVertical, [widthRem / 2, heightRem / 2])
        updatedTime = Date.now()

        for (let i = 0; i < n; i++) {
            let offset = 14
            let x = getRandomIntFromInterval(offset, width - offset)
            let y = getRandomIntFromInterval(offset, height - offset)
            let dot = new Dot(x, y, ctxMain)
            dots.push(dot)
        }
    }

    function draw() {
        if (canvasType == CANVAS_PARTICLES) {
            drawParticles()
        } else if (canvasType == CANVAS_SNAKE) {
            drawSnake()
        } else {
            drawAsteroids()
        }
    }

    function drawParticles() {
        ctxMain.clearRect(0, 0, width, height)
        for (let i = 0; i < dots.length; i++) {
            for (let j = 0; j < dots.length; j++) {
                if (i != j) {
                    dots[j].check(dots[i], dist)
                }
            }
            dots[i].show()
            dots[i].update()
        }
        requestId = requestAnimationFrame(drawParticles)
    }

    function drawSnake() {
        let currentTime = Date.now()

        if ((currentTime - updatedTime) >= 200) {
            ctxMain.clearRect(0, 0, width, height)

            snake.update()
            snake.show()

            let probabilityToTurn = Math.random() > 0.7

            if (probabilityToTurn) {
                snake.move(getRandomIntFromInterval(1, 4))
            }

            updatedTime = currentTime
        }

        requestId = requestAnimationFrame(drawSnake)
    }

    function drawAsteroids() {
        ctxMain.clearRect(0, 0, width, height)
        spaceShip.show()

        let probabilityToTurn = Math.random() > 0.7

        if (probabilityToTurn) {
            asteroidKeyControl = getRandomIntFromInterval(1, 4)

            switch (asteroidKeyControl) {
                case 1:
                    spaceShip.turnLeft()
                    break

                case 2:
                    spaceShip.turnRight()
                    break

                case 3:
                    spaceShip.thrust()
                    break

                case 4:
                    spaceShip.fire()
                    break
            }
        }

        spaceShip.update()

        for (let i = 0; i < asteroids.length; i++) {
            asteroids[i].show()
            asteroids[i].update()
            for (let j = 0; j < spaceShip.laser.length; j++) {
                let d = distance(asteroids[i].posX, asteroids[i].posY, spaceShip.laser[j].posX, spaceShip.laser[j].posY)
                if (d < asteroids[i].radius) {
                    asteroids.splice(i, 1)
                    spaceShip.laser.splice(j, 1)
                    asteroids.push(new Asteroid(ctxMain, 28, width, height))
                }
            }
        }


        requestId = requestAnimationFrame(drawAsteroids)
    }

    window.addEventListener('resize', (ev => {
        dots.length = 0
        asteroids.length = 0
        cancelAnimationFrame(requestId)
        setupCanvas()
        draw()
    }))

    if (window.innerWidth < 767) {
        n = 16
        dist = 160
        asteroidCount = 8
    }

    setupEnvironment()
    setupCanvas()
    draw()
}
