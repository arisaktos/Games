


$("#pong-game-btn").on("click", function () {
    $('#game').show("slow");
 $('#game').html(renderer.view);
  $('#game').append('<div id="startPong"><p class="get-ready-pong-copy">Get ready!</p><button id="startPongBtn">START</button></div>')  ;

    $("#startPongBtn").on("click", function () {
    gameLoop();
        $("#startPong").hide();
        $('#game').css("overflow", "hidden");
});
    
});





   var Container = PIXI.Container,
       autoDetectRenderer = PIXI.autoDetectRenderer,
       loader = PIXI.loader,
       resources = PIXI.loader.resources,
       Sprite = PIXI.Sprite;
    Graphics = PIXI.Graphics;
Text = PIXI.Text;
Timer = PIXI.Timer;

   var type = "WebGL"
   if (!PIXI.utils.isWebGLSupported()) {
       type = "canvas"
   }

   //Create the renderer

   var stage = new Container();
//   var renderer = autoDetectRenderer(800, 600);

var renderer;


  function detectmob() {
   if(window.innerWidth <= 800) {
       
       isMobile = true;
     renderer = autoDetectRenderer(window.innerWidth, 450);
    
   } else {
       
    renderer = autoDetectRenderer(740, 600);
     
       isMobile = false;
   }
}


    
    detectmob();



 renderer.backgroundColor = 0xf6f6f6;

var pongPoints = 0;
var topPanel = new Graphics();
topPanel.beginFill(0x811099);
topPanel.drawRect(0, 0, renderer.width, 60);
topPanel.endFill();
topPanel.x = 0;
topPanel.y = 0;
stage.addChild(topPanel);

var moveUpBtn; 
var moveDownBtn;


var paddle1, paddle2, ball, ball2, state;
var maxWidth = renderer.width;
var paddle2MaxWidth = maxWidth-32;
var maxHeight = renderer.height;
var maxHeightNoTop = maxHeight - topPanel.height;


var middleLine = new Graphics();
middleLine.lineStyle(1, 0x811099, 1);
middleLine.moveTo(0, 0);
middleLine.lineTo(0, maxHeight);
middleLine.x = maxWidth/2;
middleLine.y = topPanel.height;
stage.addChild(middleLine);


var pongPointsText = 'Pong points:';
var speedText = 'Ball speed:';

var pointsMsg = new Text(
  pongPointsText + " " + pongPoints, 
  {fontFamily: "Arial", fontSize: 24, fill: "white"}
);

var messageMidWidth = maxWidth/2-pointsMsg.width/2;
var messageMidHeight = topPanel.height/2-pointsMsg.height/2;

pointsMsg.position.set(10, messageMidHeight);
topPanel.addChild(pointsMsg);

var speedMsg = new Text(
  speedText + " " + ballValueDisplayed, 
  {fontFamily: "Arial", fontSize: 24, fill: "white"}
);


var speedMsgWidthPosition = maxWidth-speedMsg.width-30;
speedMsg.position.set(speedMsgWidthPosition, messageMidHeight);
topPanel.addChild(speedMsg);



PIXI.loader
  .add("../img/paddle.png")
.add("../img/paddle-mobile.png")
.add("../img/ball.png")
.add("../img/ball2.png")
.add("../img/move-down-key.png")
.add("../img/move-up-key.png")
  .load(setup);


