function getRandomArbitrary(min, max) {
    return Math.random() * (max - min + 0.1) + min;
}

function getRandomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function triangle(ctx, top, left, right, stroke) {
    ctx.beginPath()
    ctx.moveTo(top[0], top[1])
    ctx.lineTo(left[0], left[1])
    ctx.lineTo(right[0], right[1])
    ctx.closePath()
    if (stroke) {
        ctx.stroke()
    } else {
        ctx.fill()
    }
}

function radians(angle) {
    return angle * Math.PI / 180
}

function hexagon(ctx, one, two, three, four, five, six) {
    ctx.beginPath()
    ctx.moveTo(one[0], one[1])
    ctx.lineTo(two[0], two[1])
    ctx.lineTo(three[0], three[1])
    ctx.lineTo(four[0], four[1])
    ctx.lineTo(five[0], five[1])
    ctx.lineTo(six[0], six[1])
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
}

function getDimensions(pos, angle, radius) {
    return [pos[0] + Math.cos(angle) * radius, pos[1] + Math.sin(angle) * radius]
}

function distance(x1, y1, x2, y2) {
    let a = Math.abs(x1 - x2);
    let b = Math.abs(y1 - y2);
    return Math.sqrt(a * a + b * b);
}