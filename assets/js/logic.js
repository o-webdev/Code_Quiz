var timeLeft = 60;
var currentQuestion = 0;
var score = 0;

// Variables to access all of the relevant elements in the html
var startBtn = document.querySelector("#start")
var timeEl = document.querySelector("#time")
var questionEl = document.querySelector("#questions")
var titleEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var endScreenEl = document.querySelector("#end-screen");
var finalScoreEl = document.querySelector("#final-score");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var submitBtn = document.querySelector("#submit")

// Function to start the quiz
function startQuiz () {
    // Hide start button once clicked
    startBtn.classList.add("hide");
    // Remove the hidden from the questions so they show
    questionEl.classList.remove("hide");
    // Remove the hidden from time so it shows
    timeEl.classList.remove("hide");
    // display first questions
    showQuestion();
    // start the timer countdown
    setTime();
}

// shows first and preceding questions and presents possible choices
function showQuestion() {
    var question = questions[currentQuestion];
    titleEl.textContent = question.question;
    choicesEl.innerHTML = "";
    // Loop through the question choices 
    for (var i = 0; i < question.choices.length; i++) {
        var button = document.createElement("button");
        button.textContent = question.choices[i];
        button.addEventListener("click", selectAnswer);
        choicesEl.appendChild(button);
    };
}


// Answer selection function and provide feedback based on choice selected
function selectAnswer(event) {
var selected = event.target;
// register as correct if the selected answer is === to the "correct" answer in the array
var correct = selected.textContent === questions[currentQuestion].answer;
// If selected answer is incorrect 15 secs are deducted from the timer
if (!correct) {
    timeLeft -= 15;
} else {
    score++; // add point to final score if answered correctly
}
// provide feedback depending on answer correct of incorrect
feedbackEl.classList.remove("hide");
if (correct) {
    feedbackEl.textContent = "Correct";
} else {
    feedbackEl.textContent = "Incorrect";
}
currentQuestion++;
if(currentQuestion === questions.length) {
    endQuiz()
} else {
    setTimeout (function(){
        feedbackEl.classList.add("hide")
        showQuestion();
    }, 800);
}
}

// Function for timer to check how much time left and if all questions have been answered
function setTime() {
    var timerInterval = setInterval(function () {
        timeEl.textContent = timeLeft;
        // check to see if sufficient time is left or if no more questions 
        if (timeLeft <= 0 || currentQuestion === questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        }
        timeLeft--;
    }, 1000);
}

// Ends quiz function 
function endQuiz() {
    // Hides questions and time at end of quiz
    questionEl.classList.add("hide");
    timeEl.classList.add("hide");
    // shows endscreen with score and asks for initials 
    endScreenEl.classList.remove("hide")
    finalScoreEl.textContent = score;
    initialsEl.textContent = initials;
}

// Save final score and associate with initials input, then update highscores table
function saveScore(){
    var initials =initialsEl.value;
    var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    var newScore = {initials: initials, score: score};
    highScores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highScores));
    updateHighscores();
}

// Update highscores table with initials and past scores 
 function updateHighscores() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    var highscoreTable = document.querySelector("#highscores");
    if (highscoreTable) {
        highscoreTable.innerHTML = "";
        for(var i = 0; i < highscores.length; i++) {
            var li = document.createElement("li");
            // list the initials next to the score in a highscore table
            li.textContent = highscores[i].initials + " - " + highscores[i].score;
            // keep adding to the table of each completed quiz
            highscoreTable.appendChild("li")
        }
    }
 }

 startBtn.addEventListener("click", startQuiz);
 submitBtn.addEventListener("click", saveScore)
 window.addEventListener("load", function () {
    updateHighscores();
 })
