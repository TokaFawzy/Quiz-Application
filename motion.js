const quizQuestions = [
    {
        id: 1,
        question: "Which HTML tag is used to link a JavaScript file?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<js>", correct: false },
            { text: "<script>", correct: true },
            { text: "<href>", correct: false },
        ],
    },
    {
        id: 2,
        question: "What does CSS stand for?",
        answers: [
            { text: "Creative Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false },
        ],
    },
    {
        id: 3,
        question: "Which property is used to change the background color in CSS?",
        answers: [
            { text: "color", correct: false },
            { text: "bgcolor", correct: false },
            { text: "background-color", correct: true },
            { text: "canvas-color", correct: false },
        ],
    },
    {
        id: 4,
        question: "How do you declare a variable in modern JavaScript?",
        answers: [
            { text: "v x = 5;", correct: false },
            { text: "variable x = 5;", correct: false },
            { text: "let x = 5;", correct: true },
            { text: "define x = 5;", correct: false },
        ],
    },
    {
        id: 5,
        question: "What is the result of '2' + 2 in JavaScript?",
        answers: [
            { text: "4", correct: false },
            { text: "'22'", correct: true },
            { text: "undefined", correct: false },
            { text: "NaN", correct: false },
        ],
    },
];
const landing = document.querySelector(".landing");
const quiz = document.querySelector(".quiz");
const resultScreen = document.querySelector(".result");

const questionText = document.querySelector(".question-text");
const answersContainer = document.querySelector(".answer-container");
const previousBtn=document.querySelector(".btn-Previous");
const nextBtn=document.querySelector(".btn-next");

const questionNo = document.querySelector(".question-no");
const questionCount = document.querySelector(".question-count");
const scoreCount = document.querySelector(".score-count");

const progress = document.querySelector(".progress");

const finalScore = document.querySelector(".final-score");
const maxScore = document.querySelector("#max-score");
const resultMessage = document.querySelector(".result-message");

const restartBtn = document.querySelector(".restart-btn");


let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    landing.classList.remove("active");
    quiz.classList.add("active");
    currentQuestionIndex=0;
    score=0;
    quizQuestions.forEach(q => q.userSelectedAnswer = undefined);
    questionCount.innerHTML=quizQuestions.length;
    maxScore.innerHTML=quizQuestions.length;
    scoreCount.innerHTML=0;
    showQuestions();
}
function showQuestions(){
    resetState();
    let curQuestion=quizQuestions[currentQuestionIndex];
    questionText.innerHTML=curQuestion.question
    questionNo.innerHTML=curQuestion.id;
    if (currentQuestionIndex === 0) {
        previousBtn.style.display = "none";
        nextBtn.style.width="100%";
    }else {
        previousBtn.style.display = "inline-block";
        previousBtn.style.width = "48%";
        nextBtn.style.width = "48%";
    }
    curQuestion.answers.forEach(answer=>{
        let btn=document.createElement("button");
        btn.innerText=answer.text;
        btn.classList.add("answer-btn");
        if (answer.correct) {
            btn.dataset.correct = answer.correct;
        }
        if (curQuestion.userSelectedAnswer !== undefined) {
            btn.disabled = true;
        if (answer.correct) {
            btn.classList.add("correct");
        }
        if (answer.text === curQuestion.userSelectedAnswer && !answer.correct) {
            btn.classList.add("wrong");
        }
        } else {
            btn.addEventListener("click", selectAnswer);
        }
        answersContainer.appendChild(btn);
    })
    updateProgress();
}
function selectAnswer(e){
    const selected=e.target;
    const correct=selected.dataset.correct === "true";
    let curQuestion=quizQuestions[currentQuestionIndex];
    curQuestion.userSelectedAnswer = selected.innerText;
    if(correct){
        
        score++;
        scoreCount.innerHTML=score;
        selected.classList.add("correct")
    }else{
        selected.classList.add("wrong")
    }
    Array.from(answersContainer.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
}
function updateProgress(){
    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progress.style.width = progressPercent + "%";
}
function resetState() {
    answersContainer.innerHTML = "";
}
function reStartQuiz(){
    resultScreen.classList.remove("active");
    quiz.classList.add("active");
    score=0;
    startQuiz();
}
nextBtn.addEventListener("click", nextQuestion);
previousBtn.addEventListener("click", preQuestion);
restartBtn.addEventListener("click", reStartQuiz);

function nextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex<quizQuestions.length){
        showQuestions();
    }else{
        showResult();
    }
}
function preQuestion(){
    if(currentQuestionIndex > 0){
        currentQuestionIndex--;
        showQuestions();
    }
}
function showResult(){
    quiz.classList.remove("active");
    resultScreen.classList.add("active");
    finalScore.innerHTML=score;
    if(score === quizQuestions.length){
        resultMessage.innerHTML = "Excellent!";
    } else if(score >= quizQuestions.length / 2){
        resultMessage.innerHTML = "Good Job :)";
    } else {
        resultMessage.innerHTML = "Try Again :(";
    }
}
