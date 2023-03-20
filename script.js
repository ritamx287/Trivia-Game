const questions = [
	{
		question: "What is the capital of France?",
		choices: ["Paris", "Berlin", "Madrid"],
		answer: "Paris",
	},
	{
		question: "What is the tallest mammal?",
		choices: ["Giraffe", "Elephant", "Hippo"],
		answer: "Giraffe",
	},
	{
		question: "What is the currency of Japan?",
		choices: ["Yen", "Dollar", "Euro"],
		answer: "Yen",
	},
    {
		question: "What is the smallest country in the world by land area?",
		choices: ["Vatican City", "Monaco", "Nauru"],
		answer: "Vatican City",
	},
	{
		question: "Which planet in our solar system is closest to the sun?",
		choices: ["Mercury", "Venus", "Mars"],
		answer: "Mercury",
	},
	{
		question: "What is the largest ocean in the world?",
		choices: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean"],
		answer: "Pacific Ocean",
	},
];

let currentQuestion = 0;
let score = 0;

const question = document.getElementById("question");
const choices = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const scoreText = document.getElementById("score");

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
Velocity(question, {
    translateX: "100%", // move the element to the right
    opacity: 0 // make the element transparent
  }, {
    duration: 0 // set the initial state without animation
  });
  
  Velocity(question, {
    translateX: 0, // move the element back to its original position
    opacity: 1 // make the element visible
  }, {
    duration: 1000, // set the duration of the animation
    easing: "easeOutQuint" // set the easing of the animation
  });

function loadQuestion() {
    question.textContent = questions[currentQuestion].question;
    choices.innerHTML = "";
    shuffle(questions[currentQuestion].choices);
    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = questions[currentQuestion].choices[i];
        label.appendChild(radio);
        label.appendChild(document.createTextNode(questions[currentQuestion].choices[i]));
        choices.appendChild(label);
    }
}

function updateScore() {
    scoreText.textContent = `Score: ${score}`;
}

function checkAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;
    if (selected.value === questions[currentQuestion].answer) {
        score++;
        updateScore();
    }
    selected.checked = false;
    currentQuestion++;
    if (currentQuestion === questions.length) {
        showScore();
    } else {
        loadQuestion();
    }
}

function showScore() {
    question.textContent = "Quiz complete!";
    choices.innerHTML = "";
    submitButton.style.display = "none";
    scoreText.textContent = `Final score: ${score} out of ${questions.length}`;
}

shuffle(questions);
loadQuestion();
submitButton.addEventListener("click", checkAnswer);
updateScore();