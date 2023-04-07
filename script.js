const questions = [
    {
        question: "How many provinces are there in Thailand?",
        answers: [
            { text: "Seventy-six", correct: false },
            { text: "Seventy-seven", correct: true },
            { text: "Seventy-eight", correct: false },
            { text: "Seventy-nine", correct: false },
        ]
    },
    {
        question: "Which is the northernmost province in Thailand?",
        answers: [
            { text: "Chaing Rai", correct: true },
            { text: "Chaing Mai", correct: false },
            { text: "Mae Hong Son", correct: false },
            { text: "Phayao", correct: false },
        ]
    },
    {
        question: "Which is the largest lake in Thailand?",
        answers: [
            { text: "Nong Han Lake", correct: false },
            { text: "Bueng Si Fai", correct: false },
            { text: "Bueng Boraphet", correct: false },
            { text: "Songkhla Lake", correct: true },
        ]
    },
    {
        question: "Which is the most rain province in Thailand?",
        answers: [
            { text: "Suratthani", correct: false },
            { text: "Ranong", correct: true },
            { text: "Chumphon", correct: false },
            { text: "Trang", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
        question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showscore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showscore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
