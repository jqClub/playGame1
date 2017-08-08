var e = sel => document.querySelector(sel)
var log = function(s) {
    e('#id-text-log').value += '\n' + s
}

var imageFrompath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(o, b) {
    if(b.y > o.y && b.y < o.y + o.image.height) {
        if(b.x > o.x && b.x < o.x + o.image.width) {
            log('相撞')
            return true
        }
    }
    return false
}
