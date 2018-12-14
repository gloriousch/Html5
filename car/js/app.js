//页面元素加载完成
//监听移动事件
//绘制的对象
var context;
var totalPoints;
var time;
var canvasW = document.getElementById("gameCanvas");
var canvasH = document.getElementById("gameCanvas");
var cW = 750;
var cH =1206;

//初始化 整个程序开始的地方
var own = [];
// var tu = [11, 10, 1, 9, 8, 5, 7, 11, 6, 10, 9, 2, 8, 7, 4, 11, 10, 3, 9, 8];
var tu = [11, 10, 1, 9, 8, 3, 7, 11, 5, 10, 9, 2, 8, 7, 6, 11, 10, 4, 9, 8];
function init() {
  var canvas = document.getElementById("gameCanvas");
  context = canvas.getContext("2d");
  log(context);
  bg = new Image();
  // bg.src = "res/road.jpg";
  bg = loadImage("res/road.jpg");
  bg2 = loadImage("res/road.jpg");
  crtBg = bg;
  nextBg = bg2;
  //加载玩家
  player = loadImage("res/player.png");
  bg.onload = function() {
    context.drawImage(bg, 0, 0);
    // setInterval("context.drawImage(bg, 0, 0)",3000)
  };
  update();
  console.log("start");
  lightScore();
}

var update = function() {
  time = setInterval(loop, 1000 / 60);
};

// -----游戏循环逻辑--------
var count = 0;
var m = 0;
//----游戏主循环-----
function loop() {

  count++;
  clearScreen();
  // log( count );
  // drawBG();
  drawBG();
  //绘制玩家
  drawPlayer();
  // if(count % 100 == 0) spawnObs();
  if (count % 100 == 30) spawnPrice();
  // drawObs();
  drawPrice();
  hitTest();
  // hitTest2();
  // hitTest3();
}

//----玩家------
var playerX = 300,
    playerY = 800;
var player;
// log(player);
var playerWidth = 163;
var playerHeight = 359;
var score = 0;
var playerIndex = 0; //切片索引
var playerSpeed = 90;
function drawPlayer() {
  var playerClipX = playerWidth * playerIndex; //x坐标
  context.drawImage(
    player,
    playerClipX,
    0,
    playerWidth,
    playerHeight,
    playerX,
    playerY,
    playerWidth,
    playerHeight
  );

  // playerIndex++;
  // if(playerIndex >2) playerIndex = 0;
}
//-------移动----------
function moveleft(modifier) {
  // log(playerX);
  if (playerX == 50) {
    playerX = 50;
  }else{
    playerX = playerX - 250;
  }
}
function moveright() {
  
  if (playerX == 550) {
    playerX = 550;
  }else{
    playerX = playerX + 250;
  }
}



//------碰撞检测-----
function hitTest() {
  hitTestPriceAndCar();
}

function hitTestPriceAndCar() {
  for (var i = priceArr.length - 1; i >= 0; i--) {
    var price = priceArr[i];
    var player = player;
    var hit = hitTestObject(price, player);
    if (hit) {
      priceArr.splice(i, 1);
      log(price);
      if (price.id <= 6) {
        $(".game-pop-wrap")
          .children()
          .eq(price.id - 1)
          .show();
        clearInterval(time);
        own.push(price.id);
        console.log("pushown", own);
      } else {
        own.push(price.id);
        console.log("pushown", own);
      }
      totalPoints = own.reduce((t, x) => t + (x > 6 ? -20 : 200), 0);
      console.log(totalPoints);
      if (totalPoints < 0) {
        clearInterval(time);
        $(".all-ranking .rank-pop-bg").show();
      }
      isFinished();
    }
  }
}

function hitTestPoint(x1,y1, w1,h1, x2, y2, w2) {
  if (x2 >= x1 && x2 <= x1 + w1 && y1 + h1 >= y2 || x2+w2 >= x1 && x2 + w2 <= x1+w1 && y1 + h1 >= y2 ||x1 >= x2&& x1<= x2+w2 && y1 + h1 >= y2 || x2 <=x1+w1 && x1+w1 <= x2+w2&& y1 + h1 >= y2 ) {
    return true;
  } else {
    return false;
  }
}
//检测两个对象
function hitTestObject(obj, obj2) {
  return hitTestPoint(
    obj.x,
    obj.y,
    obj.img.width,
    obj.img.height,
    playerX,
    playerY,
    playerWidth
  );
}

//-------随机障碍物-------
var obsArr = [];
var priceArr = [];
function spawnObs() {
  var obs = {};
  var i = parseInt(Math.random() * 5) + 7;
  obs.img = loadImage("res/obs/" + i + ".png");
  var xArray = [50, 320, 560];
  var s = parseInt(Math.random() * 3);
  obs.x = xArray[s];
  obs.y = -50;
  obs.speedx = 0; //速度
  obs.speedy = 30; //速度

  obsArr.push(obs);
}
//-----绘制障碍物-----
function drawObs() {
  for (var i = obsArr.length - 1; i >= 0; i--) {
    var obs = obsArr[i];
    obs.x += obs.speedx;
    obs.y += obs.speedy;
    if (obs.y > 1500) {
      obsArr.splice(i, 1); //超出范围销毁
      continue;
    }
    context.drawImage(obs.img, obs.x, obs.y);
  }
}
//-------生成奖品-------
function spawnPrice() {
  var price = {};
  // var tu=[11,10,1,9,8,5,7,11,6,10,9,2,8,7,4,11,10,3,9,8];
  // console.log("M",m);
  price.id = tu[m];
  console.log("id",price.id);
  if(price.img = loadImage("res/" + tu[m] + ".png")){
      m=m+1;
    //   console.log(m);
      if(m>tu.length-1){
          m=0;
        //   price.id = tu[m];
      }
  }
  // price.hitCheck = "not";
  var xArray = [85,355,595];
  // var yArray = [5, 6, 7, 8, 9, 10];
  var s =parseInt(Math.random() *3);
  var d = parseInt(Math.random() * 5);
  price.x = xArray[s];
  // price.x = 300;
  price.y = -30;
  price.speedx = 0; //速度
  price.speedy = 5; //速度
  // price.speedy = 1*d;
  priceArr.push(price);
}

//-----绘制奖品-----
function drawPrice() {
  for (var i = priceArr.length - 1; i >= 0; i--) {
    var price = priceArr[i];
    price.x += price.speedx;
    price.y += price.speedy;

    if (price.y > 1000) {
      priceArr.splice(i, 1); //超出范围销毁
      continue;
    }

    context.drawImage(price.img, price.x, price.y);
  }
}
//-----背景滚动-------
var bg, bg2;
var bgMoveSpeed = 5; //背景移动速度
var crtBgY = 0;
var lineX =250;
var crtBg, nextBg;
function drawBG() {
  crtBgY += bgMoveSpeed;
  context.drawImage(crtBg, lineX, crtBgY);
  context.drawImage(nextBg, lineX, crtBgY - 1246);

  if (crtBgY > cH) {
    if (crtBg == bg) {
      crtBg = bg2;
      nextBg = bg;
    } else {
      crtBg = bg;
      nextBg = bg2;
    }
    crtBgY = crtBgY - cH;
  }
}

//-----方法-------
//加载图片
function loadImage(src) {
  var img = new Image();
  img.src = src;
  return img;
}
//清屏
function clearScreen() {
  context.clearRect(0, 0, cW, cH);
  tu = tu
  .filter(v => !own.includes(v) && v <= 6)
  .map(v => "789" + v)
  .join("")
  .split("");
console.log("filter", tu);
}

function log(s) {
  console.log(s);
}

function isFinished() {
  console.log("W", own);
  if (own.filter(v => v <= 6).length === 6) {
    console.log("finished");
    lightScore();
    $(".w-close").on("click",function () {
      $(".rank-pop").children('.apply-pop').show();
    })
    // $(".rank-pop").children('.apply-pop').show();
    clearInterval(time);
  }
}

function restart() {
    // window.location.reload();
    window.location.href = location.href+'?time='+((new Date()).getTime());

};

function lightScore() {   
    console.log(totalPoints);
    var p = parseInt(Math.random() * 10) + 1;
    if(totalPoints ==1200){
        $("#score-list li").eq(p).addClass('c-light');
    }
}