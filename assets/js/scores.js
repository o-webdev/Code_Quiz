var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
var highscoreTable = document.querySelector("#highscores");

// Updates additional scores on highscore table
function updateHighscores() {
    if (highscoreTable) {
        highscoreTable.innerHTML = "";
        for (var i = 0; i < highscores.length; i++) {
            var li = document.createElement("li");
            // adds new score to highscore table
            li.textContent = highscores[i].initials + " - scored: " + highscores[i].score;
            highscoreTable.appendChild(li);
        }
    }
}

// Clears the highscores records and creates a new empty string
document.querySelector("#clear").addEventListener("click", function() {
    localStorage.removeItem("highscores");
    highscores = [];
    updateHighscores();
});

window.addEventListener("load", function() {
    updateHighscores();
});

//  activates clear button on highscore pages to remove scores and initials from local storage
var clearBtn = document.querySelector('#clear');
clearBtn.addEventListener("click", function() {
    localStorage.clear();
    updateHighscores();
});

window.addEventListener("load", function() {
    updateHighscores();
})