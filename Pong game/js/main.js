
   var Container = PIXI.Container,
       autoDetectRenderer = PIXI.autoDetectRenderer,
       loader = PIXI.loader,
       resources = PIXI.loader.resources,
       Sprite = PIXI.Sprite;
    Graphics = PIXI.Graphics;
Text = PIXI.Text;

   var type = "WebGL"
   if (!PIXI.utils.isWebGLSupported()) {
       type = "canvas"
   }

   //Create the renderer

   var stage = new Container();
   var renderer = autoDetectRenderer(800, 600);
   //change renderer bg color
   renderer.backgroundColor = 0x061639;

var points = 0;
var allPoints;
var topPanel = new Graphics();
topPanel.lineStyle(1, 0xFF3300, 1);
topPanel.beginFill(0x66CCFF);
topPanel.drawRect(0, 0, renderer.width, 60);
topPanel.endFill();
topPanel.x = 0;
topPanel.y = 0;
stage.addChild(topPanel);




//gameOverMessage.visible = false;


var pointsMsg = new Text(
  "Points: "+points, 
  {fontFamily: "Arial", fontSize: 18, fill: "white"}
);
pointsMsg.position.set(10, 10);
stage.addChild(pointsMsg);

   //Add the canvas to the HTML document

   $('#game').append(renderer.view);

   //Create a container object called the `stage`




PIXI.loader
  .add("images/paddle.png")
.add("images/ball.png")
  .load(setup);

//This `setup` function will run when the image has loaded
var paddle1, paddle2, ball, state;
var maxWidth = renderer.width;
var paddle2MaxWidth = maxWidth-32;
var maxHeight = renderer.height;
var maxHeightNoTop = maxHeight - topPanel.height;

