var global = require('./global');

var a = "resources/images/";
global.img = {
    //加载页
    loading:a+"loading/loading.png",

    //通用
    rota:a+"common/rota.png",
    ship1:a+"common/ship.png",

    //首页
    bgHome:a+"home/bg.png",
    jump:a+"home/jump.png",
    starsky:a+"home/starsky.png",
    start:a+"home/start.png",

    //游戏
    bgPlay:a+"play/bg.jpg",
    ship:a+"play/ship.png",
    aero_l:a+"play/aero-l.png",
    aero_m:a+"play/aero-m.png",
    aero_s:a+"play/aero-s.png"

};

/**
 * 加载
 * @param obj
 */
exports.loadingImg = function (obj){
    var loadedImg = {};
    var len = 0;
    for (var i in obj.loadImg){
        len++;
    }
    var prog = 0;
    for (var i in obj.loadImg){
        var imgObj = new Image();
        imgObj.src = obj.loadImg[i];
        imgObj.key = i;
        imgObj.onload = function (){
            loadedImg[this.key] = this;
            prog++;
            if (prog>=len){
                //加载完成
                if (obj.complete){
                    obj.complete(loadedImg);
                }
            }
        }
    }
}