//挡板的逻辑
var Paddle = function(game) {
    // var path = 'paddle.png'
    // var image = imageFrompath(path)
    
    //返回一个实例对象
    var o = game.imageByName('paddle')
    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 15,
    // }
    o.x = 100
    o.y = 250
    o.speed = 15
    var paddle = o
    o.move = function(x) {
        if(x < 0) {
            x = 0
        }
        if(x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(paddle.x -= paddle.speed)
    }
    o.moveRight = function() {
        o.move(paddle.x += paddle.speed)
    }
    o.colide = function(ball) {
        if(ball.y + ball.image.height > o.y) {
            if(ball.x > o.x && ball.x < o.x + o.image.width) {
                log('相撞')
                return true
            }
        }
        return false
    }
    return o
}
