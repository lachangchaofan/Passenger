var global = require('./global');

/**
 * canvas适配，兼容
 */
exports.resizeCanvas = function () {
    global.canvas.width = global.w;
    global.canvas.height = global.h;
    window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
};

/**
 * 随机数
 * @param min
 * @param max
 * @returns {Number}
 */
exports.rand = function (min,max){
    return parseInt(Math.random()*(max-min+1)+min);
};

/**
 * 碰撞检测
 * @param obj1
 * @param obj2
 * @returns {boolean}
 */
exports.crash = function (obj1,obj2){
    var l1 = obj1.x;
    var r1 = obj1.x+obj1.w;
    var t1 = obj1.y;
    var b1 = obj1.y+obj1.h;
    var l2 = obj2.x;
    var r2 = obj2.x+obj2.w;
    var t2 = obj2.y;
    var b2 = obj2.y+obj2.h;
    // if (l1<r2&&r1>l2&&t1<b2&&b1>t2){
    //     return true;
    // }else{
    //     return false;
    // }
    var bol = l1<r2&&r1>l2&&t1<b2&&b1>t2 ? true:false;
    return bol;
}