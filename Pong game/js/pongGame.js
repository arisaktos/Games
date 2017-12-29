var timer = 0;
var newBallValue = 6;
var numberOfHits = 6;
var ballValueDisplayed = 1;
var roundNumber = 1;
var pause = false;
var isMobile;

if(isMobile){
    newBallValue = 2;
}


function gameLoop() {
    //Loop this function 60 times per second

    if (pause) return;


    requestAnimationFrame(gameLoop);
    //Update the current game state
    state();
    timer++;
    //paddle2 movement + containment 
    paddle2.y += ball.vy;
    var paddle2HitsBottom = contain(paddle2, {
        x: paddle2MaxWidth,
        y: 61,
        width: maxWidth,
        height: maxHeight - 2
    });
    if (paddle2HitsBottom === "bottom" || paddle2HitsBottom === "top") {
        //if paddle hits top or bottom move it oposite direction
        paddle2.vy *= -1;

    }

    ball.y += ball.vy;
    ball.x += ball.vx;
    var ballHitsBottom = contain(ball, {
        x: ball.x,
        y: 61,
        width: maxWidth + 25,
        height: maxHeight
    });
    if (ballHitsBottom === "bottom" || ballHitsBottom === "top") {
        ball.vy *= -1;



    }

    paddle1.y += paddle1.vy
    contain(paddle1, {
        x: paddle1.x,
        y: 61,
        width: maxWidth,
        height: maxHeight - 2
    });

  if(isMobile){
        moveDownBtn.interactive = true;
        moveUpBtn.interactive = true;
        moveUpBtn.on('touchstart', function () {
            paddle1.vy = -10;
            paddle1.vx = 0;
        });
        moveUpBtn.on('touchend', function () {
            paddle1.vy = 0;
        });

        moveDownBtn.on('touchstart', function () {
            paddle1.vy = 10;
            paddle1.vx = 0;
        });

        moveDownBtn.on('touchend', function () {
            paddle1.vy = 0;
        });
         }


    renderer.render(stage);


    //do something every 10sec
    if (timer % 600 === 1) {
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
        console.log('x: ' + ball.y);
        pongPoints++
        pointsMsg.text = pongPointsText + " " + pongPoints;



        numberOfHits++;
        if (numberOfHits % 2 === 0) {
            console.log(newBallValue);
            newBallValue += 2;
            speedMsg.text = speedText + " " + ballValueDisplayed;
            ball.vx = newBallValue;
            ballValueDisplayed++;
        }

    

    }
    //if ball goes out of boundaries
    if (ball.x < 25 || ball.x > maxWidth - 30) {
        if (roundNumber === 1) {
            gameScene.removeChild(ball);
            ball = new Sprite(resources["../img/ball2.png"].texture);
            ball.y = 61;
            ball.x = paddle1.width;
            if(isMobile){
               ball.vx = 3; 
            }
            else{
               ball.vx = 6; 
            }
            
            ball.vy = 6;
            $('#game').append('<p class="round2msg">Round 2</p>');
            newBallValue = 6;
            if(isMobile){
                newBallValue = 2;
            }
            gameScene.addChild(ball);
            roundNumber++;
            ballValueDisplayed = 1;
            speedMsg.text = speedText + " " + ballValueDisplayed;

        } else {


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
}

function createGameOverScene() {
    $('#game').append('<div id="gameSummaryBox"><p>Points gained: ' + pongPoints + '<p></div>');
    $("#gameSummaryBox").addClass("showPointsAnim");
    $('#game').delay(2000).hide("slow");

}

