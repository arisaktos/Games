var quizGamePoints = 0;
var k = 0;

var allQuestions = [{
    question: "What is our name?",
    answers: ["Aptiv", "Delphi", "Random"],
    correctAnswer: "0"
}, {
    question: "What do we do?",
    answers: ["Mugs and pots", "Juices", "Technology of the future"],
    correctAnswer: "2"
}, {
    question: "How many dots are in our logo?",
    answers: ["Ten", "Two", "One"],
    correctAnswer: "1"
}];




$("#quiz-game-btn").on("click", function () {
    $('#game').show("slow");
    createQuizBoard();

});


function createQuizBoard() {
    $('#game').html('<div id="question-game"></div><button id="questions-submit">Submit</button>');

    $.each(allQuestions, function (i) {
        $('#question-game').append('<h3>' + allQuestions[i].question + '</h3>');
        $.each(this.answers, function (j) {
            currentAnswer = allQuestions[i].answers[j];
            $('#question-game').append('<div class="radio"><input type="radio" value="' + j + '" name="answer' + i + '" id="ans' + k + '" /><label for="ans' + k + '" class="label">' + currentAnswer + '</label></div>');
            k++;
        });

    });


    $("#questions-submit").on("click", function () {

        $.each(allQuestions, function (i) {

            if ($("input[name='answer" + i + "']:checked").val() == allQuestions[i].correctAnswer) {
                quizGamePoints++;

            }
        });
        createPointSummary();

    });


}

function createPointSummary() {
    $('#game').append('<div id="gameSummaryBox"><p>Points gained: ' + quizGamePoints + '<p></div>');
    $("#gameSummaryBox").addClass("showPointsAnim");
    $('#game').delay(2000).hide("slow");
    nextGameActive('.quiz-game', '.memory-game');
    totalGamePoints += quizGamePoints;
    updateTotalGamePoints();
    return totalGamePoints;

}
