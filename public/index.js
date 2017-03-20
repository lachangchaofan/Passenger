var global = require('./js/global');
var tool = require('./js/tools');
var load = require('./js/load');
var ship = require('./js/ship');
var aero = require('./js/aero');

tool.resizeCanvas();
load.loadingImg({loadImg:global.img, complete:init});

function init(imgs) {

    var num = global.num;//帧数

    function frameFn() {

        num++;

        ship.createBg(num,imgs);

        ship.createShip(num,imgs);

        ship.shipCrashAero(imgs);


        aero.createAero(num,imgs);

        if (num > 1000) {
            num = 0;
        }
        requestAnimationFrame(frameFn);

        // if (global.gameBol){
        //     // console.log(1)
        //     window.cancelAnimationFrame(frameFn);
        //     // return;
        // }
    }
    frameFn();

} //init over

