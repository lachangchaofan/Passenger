module.exports = {
    appid : 'wx61477c05fc1aa64c',
    serverPath : 'http://www.51guess.cn/universe',//服务器路径
    openid : '',


    num: 0,
    w : window.innerWidth,
    h : window.innerHeight,
    canvas : document.querySelector("#game"),
    ctx : document.querySelector("#game").getContext("2d"),
    y : 0,
    img : {},
    aeroArr : [],
    gameBol : false,
    shipArr : [],
};