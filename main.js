var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        // 设置 block 坐标
        // b.x = p[0]
        // b.y = p[1]
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    // 这个是为了 debug
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if(k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            blocks = loadLevel(game ,Number(k))
        }
    })

    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    // enableDebugMode(true)

    var iamges = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
    var game = GuaGame(30, iamges, function(g) {

            var paddle = Paddle(game)
            var ball = Ball(game)

            var score = 0

            blocks = loadLevel(game, 1)

            // 暂停的功能
            var paused = false
            game.registerAction('a', function() {
                paddle.moveLeft()
            })
            game.registerAction('d', function() {
                paddle.moveRight()
            })
            game.registerAction('f', function() {
                ball.fire()
            })

            game.update = function() {
                if(window.paused) {
                    return
                }
                ball.move()
                // 判断相撞
                if(paddle.colide(ball)) {
                    // ball.speedY *= -1
                    ball.反弹()
                }
                // 判断 ball 和 block 相撞
                for (var i = 0; i < blocks.length; i++) {
                    var block = blocks[i]
                    if(block.colide(ball)) {
                        log('block 相撞')
                        block.kill()
                        ball.反弹()
                        // 更新分数
                        score += 100
                    }
                }
            }
            game.draw = function() {
                // draw
                game.drawImage(paddle)
                game.drawImage(ball)
                // draw blocks
                for (var i = 0; i < blocks.length; i++) {
                    var block = blocks[i]
                    if(block.alive) {
                        game.drawImage(block)
                    }
                }
                // draw labels
                // MDN canvas text
                game.context.fillText('分数：' + score, 10, 290)
            }
    })

    enableDebugMode(game, true)
}
__main()
