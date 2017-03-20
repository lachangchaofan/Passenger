var global = require('./global');
var tool = require('./tools');

/**
 * 画飞船
 * @param num
 * @param imgs
 */
exports.createShip = function (num,imgs) {
    var shipObj = new Ship(imgs);
    shipObj.draw();
    global.canvas.addEventListener('touchmove',function (ev) {
        var disx = ev.touches[0].clientX;
        var disy = ev.touches[0].clientY;
        shipObj.x = disx;
        shipObj.y = disy;
        console.log(disx,disy);
    },false)
};

/**
 * 画背景
 * @param num
 * @param imgs
 */
exports.createBg = function (num,imgs) {
    var n = 3.32;//背景图高与屏幕高的比
    if (num % 2 == 0) {
        global.y += 10;
        if (global.y >= global.h * n) {
            global.y = 0;
        }
    }
    global.ctx.drawImage(imgs.bgPlay, 0, global.y, global.w, global.h * n);
    global.ctx.drawImage(imgs.bgPlay, 0, global.y - global.h * n, global.w, global.h * n);
};

exports.shipCrashAero = function (imgs) {
    for (var i=0; i<global.aeroArr.length; i++){
        var obj1 = {x:global.aeroArr[i].x,y:global.aeroArr[i].y,w:global.aeroArr[i].w,h:global.aeroArr[i].h};
        if (tool.crash(obj1,new Ship(imgs))){
            global.gameBol = true;
        }
    }
}

/**
 * 飞船类
 * @param imgs
 * @constructor
 */
function Ship(imgs) {
    this.w = global.w/6;
    this.h = global.w/6*2.22;
    this.x = global.w/2-global.w*0.108;
    this.y = global.h-this.h;
    this.img = imgs.ship;
    this.moveBol = true;
}
Ship.prototype.move = function (imgs) {
    if (this.moveBol){
        this.img = imgs.ship;
        this.moveBol = false;
    }else {
        this.img = imgs.ship; //这里的值是飞船被废后的图，记得找李凯要一张炸毁的飞船图
        this.moveBol = true;
    }
};
Ship.prototype.draw = function (num) {
    if (num%6==0){
        this.move();
    }
    global.ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
};

