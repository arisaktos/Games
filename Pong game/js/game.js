

function gameLoop(){
  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);
  //Update the current game state
  state();
    
    //paddle2 movement + containment 
    paddle2.y += paddle2.vy;
    var paddle2HitsBottom = contain(paddle2, {x: paddle2MaxWidth, y: 61, width: maxWidth, height: maxHeight});
    if (paddle2HitsBottom === "bottom" || paddle2HitsBottom === "top") {
        //if paddle hits top or bottom move it oposite direction
  paddle2.vy *= -1;

}
    
    ball.y += ball.vy;
    ball.x += ball.vx;
    var ballHitsBottom = contain(ball, {x: ball.x, y: 61, width: maxWidth+30, height: maxHeight});
    if (ballHitsBottom === "bottom" || ballHitsBottom === "top") {
  ball.vy *= -1;

}
      paddle1.x += paddle1.vx;
  paddle1.y += paddle1.vy
  contain(paddle1, {x: paddle1.x, y: 61, width: maxWidth, height: maxHeight});    
 

  //Render the stage
  renderer.render(stage);
}
function play() {

    
    if (hitTestRectangle(ball, paddle2)) {
ball.vx *= -1;
 
  } 
    
       if (hitTestRectangle(ball, paddle1)) {
ball.vx *= -1;
 points++
        pointsMsg.text = "Points: " +points;
  } 
    //if ball goes out of boundaries
    if(ball.x < 0 || ball.x > maxWidth-30)
        {
        
            state = end;
        }
    
    
}

function end() {
  gameScene.visible = false;
 createGameOverScene();
     
    
}

function createGameOverScene()
{
    gameOverScene = new Container();
stage.addChild(gameOverScene);
    
    
var gameOverPanel = new Graphics();
gameOverPanel.lineStyle(1, 0xFF3300, 1);
gameOverPanel.beginFill(0x66CCFF);
gameOverPanel.drawRect(0, 0, 400, 300);
gameOverPanel.endFill();
gameOverPanel.x = maxWidth/4;
gameOverPanel.y = maxHeight/4;
gameOverScene.addChild(gameOverPanel);


var gameOverMessage = new Text(
  "Game Over! Your points: "+points, 
  {fontFamily: "Arial", fontSize: 18, fill: "white"}
);
gameOverMessage.position.set(10, 10);
gameOverPanel.addChild(gameOverMessage);
    
gameScene = new Container();
stage.addChild(gameScene);
}
