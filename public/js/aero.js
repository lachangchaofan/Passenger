var global = require('./global');
var tools = require('./tools');

/**
 * 画陨石
 * @param num 帧数
 * @param imgs 图片对象
 */
exports.createAero = function (num,imgs) {
    if (num % 40 == 0) {
        var aeroObj = new Aero(imgs);
        global.aeroArr.push(aeroObj);
        console.log(global.aeroArr.length)
    }
    for (var i = 0; i < global.aeroArr.length; i++) {
        var bol = global.aeroArr[i].draw(i);
        if (bol){
            i--;
        }
    }
};

/**
 * 陨石类
 * @param imgs
 * @constructor 陨石类
 */
function Aero(imgs) {
    var r = tools.rand(0, 100);
    if (r >= 0 && r <= 10) {
        this.img = imgs.aero_l;
        this.w = global.w/7;
        this.h = global.w/7*1.2;
    } else if (r > 10 && r <= 70) {
        this.img = imgs.aero_m;
        this.w = global.w/8;
        this.h = global.w/8*0.70;
    } else {
        this.img = imgs.aero_s;
        this.w = global.w/9;
        this.h = global.w/9*0.90;
    }
    this.x = tools.rand(0,global.w-this.w);
    this.y = -this.h;
    this.speed = 3;
    this.diebol = false;
}
Aero.prototype.draw = function (index) {
    this.y += this.speed;
    global.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    if (this.y > global.h){
        global.aeroArr.splice(index,1);
        return true;
    }
    return false;
};



