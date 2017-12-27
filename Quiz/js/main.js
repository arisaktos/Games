var quizGamePoints = 0;
var k = 0;

//questions used in the quiz
var allQuestions = [{
    question: "In our solar system which planet rotates clockwise?",
    answers: ["Venus", "Mars", "Saturn"],
    correctAnswer: "0"
}, {
    question: "What is TARDIS disguised as?",
    answers: ["Underground entrance", "A telephone booth", "A blue police box"],
    correctAnswer: "2"
}, {
    question: "Train platform from which students board the Hogwarts Express is",
    answers: ["9 1/2", "9 3/4", "9 3/5"],
    correctAnswer: "1"
}];




$("#quiz-game-btn").on("click", function () {
    $('#game').show("slow");
    createQuizBoard();

});


function createQuizBoard() {
    $('#game').html('<div id="question-game"></div><button id="questions-submit">Submit <i class="fa fa-angle-right" aria-hidden="true"></i></button>');

    //create quiz questions based on the allQuestions object
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

            //if marked answer is same as the correct one increase number of points
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

    //reset quiz points so quiz can be taken again
    quizGamePoints = 0;

}
