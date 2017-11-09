function setup() {
    

gameScene = new Container();
stage.addChild(gameScene);


    
  //Create the `paddle1` sprite 
  paddle1 = new Sprite(resources["images/paddle.png"].texture);
  paddle1.y = 96; 
    paddle1.x = 2;
  paddle1.vx = 0;
  paddle1.vy = 0;
    
  gameScene.addChild(paddle1);
    
  //Create the `paddle2` sprite   
  paddle2 = new Sprite(resources["images/paddle.png"].texture);
  paddle2.y = 61; 
  paddle2.vx = 0;
  paddle2.vy = 6;
paddle2.x = paddle2MaxWidth;
  gameScene.addChild(paddle2);  
    
    //Create the `ball` sprite    
ball = new Sprite(resources["images/ball.png"].texture);
    ball.y = 61;
    ball.x = paddle1.width;
    ball.vx = 4;
    ball.vy = 4;
    gameScene.addChild(ball);
    
    
  //Capture the keyboard arrow keys
  var  up = keyboard(38),
      down = keyboard(40);
 
  //Up
  up.press = function() {
    paddle1.vy = -5;
    paddle1.vx = 0;
  };
  up.release = function() {
    if (!down.isDown && paddle1.vx === 0) {
      paddle1.vy = 0;
    }
  };
 
  //Down
  down.press = function() {
    paddle1.vy = 5;
    paddle1.vx = 0;
  };
  down.release = function() {
    if (!up.isDown && paddle1.vx === 0) {
      paddle1.vy = 0;
    }
  };
  //Set the game state
  state = play;
 
  //Start the game loop
  gameLoop();
}