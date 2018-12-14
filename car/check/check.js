window.onload = init;
var context;
var x=250;
var cW =750;
var cH = 1206;
function init() {
    var canvas =document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    bgLine = loadImage("./road-line.png");
    bgLine2 = loadImage("./road-line.png");
    crtBg =bgLine;
    nextBg =bgLine2;
    // bgLine = new Image();
    // bgLine.src ="./road-line.png";
    // bgLine2 = new Image();
    // bgLine2.src ="./road-line.png";
    // bgLine.onload = function(){
        
    // };

    setInterval(loop,1000/60);
}

function loop() {
    clearScreen();
    drawBG();
}
var bgLine;
var bgLine2;
var bgMoveSpeed = 2;
// var crtBgY =-1476;
var crtBgY =0;
var crtBg,nextBg;
function drawBG(){
    crtBgY +=bgMoveSpeed;
    context.drawImage(crtBg,x,crtBgY);
    context.drawImage(nextBg,x,crtBgY-1246);

    if(crtBgY > cH){
        if(crtBg ==bgLine){
            crtBg =bgLine2;
            nextBg =bgLine;
        }else{
            crtBg =bgLine;
            nextBg = bgLine2;
        }
        crtBgY = crtBgY-1246;
    }
}

function loadImage(src) {
    var img = new Image();
    img.src = src;
    return img;
}

//绘制前先清屏幕
function clearScreen() {
    context.clearRect(0,0,cW,cH);
    
}