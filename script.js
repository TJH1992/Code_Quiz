// Collect HTML elements, global variables, questions array for DOM manipulation and funtions.

// Html elements stored as variables
let startQuizEl = document.getElementById("startpage");
let startButtonEl = document.getElementById("startbtn");
let quizEl = document.getElementById("quiz");
let timerEl = document.getElementById("timer");
let questionsEl = document.getElementById("questions");
let aButton = document.getElementById("a");
let bButton = document.getElementById("b");
let cButton = document.getElementById("c");
let dButton = document.getElementById("d");
let resultsEl = document.getElementById("results");
let gameOverEl = document.getElementById("gameover");
let finalScoreEl = document.getElementById("finalScore");
let initialsEl = document.getElementById("initials");
let submitScoreEl = document.getElementById("submitScore");
let highScoreContainerEl = document.getElementById("highScoreContainer");
let highScorePageEl = document.getElementById("high-scorePage");
let highScoreNameDisplayEl = document.getElementById("highscore-initials");
let highScoreDisplayEl = document.getElementById("highscore-score");
let endGameButtonsEl = document.getElementById("endGameBtns");

//Question objects in an array for the functions to pull from

let myQuestions = [
    {
    question: "Which of the following is not JavaScript Data Types?",
    aChoice: "Undefined",
    bChoice: "Number",
    cChoice: "Boolean",
    dChoice: "Float",
    correctAnswer: "d"
    },

    {
    question: "Which company developed JavaScript?",
    aChoice: "Netscape",
    bChoice: "Bell Labs",
    cChoice: "Sun Microsystems",
    dChoice: "IBM",
    correctAnswer: "a"
    },
    
    {
    question: "Inside which HTML element do we put the JavaScript?",
    aChoice: "<script>",
    bChoice: "<head>",
    cChoice: "<meta>",
    dChoice: "<style>",
    correctAnswer: "a"
    },

    {
    question: "What is the original name of JavaScript?",
    aChoice: "LiveScript",
    bChoice: "EScript",
    cChoice: "Mocha",
    dChoice: "JavaScript",
    correctAnswer: "c"
    },
];

//Global Variables
let finalQuestionIndex = myQuestions.length;
let currentQuestionIndex = 0;
let remainigTime = 50;
let timerInterval;
let score = 0;
let correct;



function quizQuestionGenerated() {
    gameOverEl.style.display = "none";
    
    if(currentQuestionIndex === finalQuestionIndex){
        return scoreAlert();
    }

    let currentQuestion = myQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    aButton.innerHTML = currentQuestion.aChoice;
    bButton.innerHTML = currentQuestion.bChoice;
    cButton.innerHTML = currentQuestion.cChoice;
    dButton.innerHTML = currentQuestion.dChoice;
}

function beginQuiz() {
    gameOverEl.style.display = "none";
    startQuizEl.style.display = "none";
    quizQuestionGenerated();

    //Timer
    timerInterval = setInterval(function() {
        remainigTime--;
        timerEl.textContent = "Time Remaining: " + remainigTime;

        if(remainigTime === 0) {
            clearInterval(timerInterval);
            scoreAlert();
        }
    }, 1000);
    quizEl.style.display = "block";
}


function scoreAlert() {
    quizEl.style.display = "none";
    gameOverEl.style.display = "flex";
    clearInterval(timerInterval);
    initialsEl.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + myQuestions.length + " correct!";
}


function highScore(){

    if(initialsEl.value === "") {
        alert("Please enter your initials");
        return false;
    }

    else{
        let highScoreSaved = JSON.parse(localStorage.getItem("highScoreSaved")) || [];
        let currentUser = initialsEl.value.trim();
        let currentHighScore = {
            name : currentUser,
            score : score
        };

        gameOverEl.style.display = "none";
        highScoreContainerEl.style.display = "flex";
        highScorePageEl.style.display = "block";
        endGameButtonsEl.style.display = "flex";

        highScoreSaved.push(currentHighScore);
        localStorage.setItem("highScoreSaved", JSON.stringify(highScoreSaved));
        highScoreGenerated();
    }
};

// Code stores in local storage as it should. However, it won't append to the highscore page as it should.
function highScoreGenerated(){


    highScoreNameDisplayEl.innerHTML = "";
    highScoreDisplayEl.innerHTML = "";
    
    let highScores = JSON.parse(localStorage.getItem("highScoreSaved")) || [];
    
    for (i=0; i<highScores.length; i++){
        let nameEl = document.createElement("li");
        let scoreEl = document.createElement("li");

        nameEl.textContent = highScores.name;
        scoreEl.textContent = highScores.score;

        nameEl.appendChild(highScoreNameDisplayEl);
        scoreEl.appendChild(highScoreDisplayEl);
    }
}


function highScoreAlert() {
    startButtonEl.style.display = "none";
    gameOverEl.style.display = "none";
    highScoreContainerEl.style.display = "flex";
    highScorePageEl.style.display = "block";
    endGameButtonsEl.style.display = "flex";

    highScoreGenerated();
}

function scoreErase(){
    window.localStorage.clear();
    highScoreDisplayEl.textContent = "";
    highScoreNameDisplayEl = "";
}

function quizReplay(){
    highScoreContainerEl.style.display = "none";
    gameOverEl.style.display = "none";
    startQuizEl.style.display = "flex";
    remainigTime = 60;
    score = 0;
    currentQuestionIndex = 0;
}

function answerVerification(answer){
    correct = myQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        quizQuestionGenerated();
    }
    else{
        scoreAlert();
    }
}

submitScoreEl.addEventListener("click", highScore);
startButtonEl.addEventListener("click", beginQuiz);