//images used for the game
var boardImages = [
    {
        index: 0,
        url: "http://www.arisu.co.uk/images/beginning-photo.jpg"
    },
    {
        index: 1,
        url: "http://www.arisu.co.uk/images/beginning-photo.jpg"
    },
    {
        index: 2,
        url: "http://www.arisu.co.uk/images/pigeon-photo.jpg"
    },
    {
        index: 3,
        url: "http://www.arisu.co.uk/images/pigeon-photo.jpg",
    },
    {
        index: 4,
        url: "http://www.arisu.co.uk/images/bird-photo.jpg",

    },
    {
        index: 5,
        url: "http://www.arisu.co.uk/images/bird-photo.jpg"
    }


  ]


// revealed - array of revealed cards for matching purposes
var revealed = [];
var revealedIndexes = [];
var totalPairs = boardImages.length / 2;
var currentNumOfPairs = 0;
var memoryGamePoints = 17;



$("#memory-game-btn").on("click", function () {
    $('#game').show("slow");

    createMemoryBoard();

    $(".card-back").on("click", function () {
        checkCards($(this));

    });

});



//shuffle functions so they are in different positions each time board is created
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function createMemoryBoard() {
    $('#game').html('<div id="memory-game"></div>');
    shuffle(boardImages);
    $.each(boardImages, function (i, val) {
        $('#memory-game').append('<div class="memory-card"><div class="card-back"></div><div class="card-front"><img src="' + val.url + '" data-img="' + val.index + '"></div></div>');
    })
}

function checkCards(param) {
    //remove points for each click
    memoryGamePoints--;

    $(param).slideUp(300);

    //add clicked urls and their indexes to arrays so they can be compared
    revealed.push($(param).siblings().children('img').prop('src'));
    revealedIndexes.push($(param).siblings().children('img').attr('data-img'));

    //only match 2 array objects
    if (revealed.length == 2) {

        //checking if cards are same but have different index - same index happens when someone clicks same card really quick
        if (revealed[0] === revealed[1] && revealedIndexes[0] !== revealedIndexes[1]) {

            //if both opened cards are same remove them both and increase number of matched pairs
            $('img[src="' + revealed[0] + '"]').delay(400).hide(300);
            currentNumOfPairs++;
            revealed = [];
            revealedIndexes = [];

        } else {
            //if boards are not same, close them both, first one with bigger delay so it happens at the same time
            $('img[src="' + revealed[0] + '"]').parent().siblings('.card-back').delay(500).slideDown(300);
            $('img[src="' + revealed[1] + '"]').parent().siblings('.card-back').delay(200).slideDown(300);
            revealed = [];
            revealedIndexes = [];
        }

    }

    //if all pairs are uncovered count points and return them
    if (currentNumOfPairs == totalPairs) {
        createMemoryPointSummary();
    }
}


function createMemoryPointSummary() {

    //if number of clicks used all available points, award 1 point only
    if (memoryGamePoints <= 0) {
        memoryGamePoints = 1
    }

    $('#game').append('<div id="gameSummaryBox"><p>Points gained: ' + memoryGamePoints + '<p></div>');
    $("#gameSummaryBox").addClass("showPointsAnim");
    $('#game').delay(2000).hide("slow");
    $('.game-container').css("display", "flex");
    //page refresh so game can be played again
    setTimeout(location.reload.bind(location), 2500);
    return memoryGamePoints;

}
