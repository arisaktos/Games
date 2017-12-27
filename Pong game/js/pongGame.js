var timer = 0;
var newBallValue = 6;
var numberOfHits = 6;
var roundNumber = 1;
 var pause = false;

function gameLoop(){
  //Loop this function 60 times per second
    
    if(pause) return;
    
    
  requestAnimationFrame(gameLoop);
  //Update the current game state
  state();
timer++;
    //paddle2 movement + containment 
    paddle2.y += ball.vy;
    var paddle2HitsBottom = contain(paddle2, {x: paddle2MaxWidth, y: 61, width: maxWidth, height: maxHeight-2});
    if (paddle2HitsBottom === "bottom" || paddle2HitsBottom === "top") {
        //if paddle hits top or bottom move it oposite direction
  paddle2.vy *= -1;

}
    
    ball.y += ball.vy;
    ball.x += ball.vx;
    var ballHitsBottom = contain(ball, {x: ball.x, y: 61, width: maxWidth+10, height: maxHeight});
    if (ballHitsBottom === "bottom" || ballHitsBottom === "top") {
  ball.vy *= -1;

  

}
  
  paddle1.y += paddle1.vy
  contain(paddle1, {x: paddle1.x, y: 61, width: maxWidth, height: maxHeight-2});    
 
                                                                                                                                                                                                                                                                     
  renderer.render(stage);
    

    //do something every 10sec
   if (timer%600 === 1)
        {
//             newBallValue++
//       ball.vx = newBallValue;
      //                                              console.log('speedup' + ball.vx);
        }
    
}
function play() {

    
    if (hitTestRectangle(ball, paddle2)) {
ball.vx *= -1;

  } 
    
       if (hitTestRectangle(ball, paddle1)) {
ball.vx *= -1;
 pongPoints++
        pointsMsg.text = pongPointsText + " " + pongPoints;
  
           
           
            numberOfHits++;
   if(numberOfHits%2 === 0)
       {
           console.log(newBallValue);
           newBallValue +=2;
            speedMsg.text =  speedText + " " + newBallValue;
           ball.vx = newBallValue;
           
       }
           
  } 
    //if ball goes out of boundaries
    if(ball.x < 0 || ball.x > maxWidth-30)
        {
            if(roundNumber === 1)
                {gameScene.removeChild(ball);
                 ball = new Sprite(resources["../img/ball2.png"].texture);
    ball.y = 61;
    ball.x = paddle1.width;
    ball.vx = 6;
    ball.vy = 6;
                 newBallValue = 6;
                 
              
                 
                 
                    gameScene.addChild(ball);
               
                    roundNumber++;
                 speedMsg.text =  speedText + " " + newBallValue;
                   
                }
            else{
                
                
                state = end;
                return;
            console.log('state end');
            }
            
           
        }
    
    
}

function end() {
  gameScene.visible = false;                                                             
 createGameOverScene();
     pause = true;
     console.log('end()');
  

    
}

function createGameOverScene()
{
$('#game').append('<div id="gameSummaryBox"><p>Points gained: ' + pongPoints + '<p></div>');
    $("#gameSummaryBox").addClass("showPointsAnim");
    $('#game').delay(2000).hide("slow");
   
    totalGamePoints += pongPoints;
    updateTotalGamePoints();
createFinalScene();
    return totalGamePoints;

     

}

function createFinalScene(){
     $('.game-container').html('<div id="final-stage"><h3>Thank you for playing pong!</h3><p>Your total points: ' + totalGamePoints + '</p></div>');
}

