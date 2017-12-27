var totalGamePoints = 0;

function nextGameActive(oldGame, newGame){
    $(oldGame).removeClass('active').addClass('inactive');
    $(newGame).removeClass('inactive').addClass('active');
}

function updateTotalGamePoints(){
    $('#total-game-points-box').html(totalGamePoints);
}
