let currentQuestionIndex = 0;
let selectedAnswers = {}; // To track the user's answers
let questions = []; // Placeholder for fetched questions

// Fetch the questions from the JSON file
async function fetchQuestions() {
  try {
    const response = await fetch("real.json"); // Replace with the path to your JSON file
    questions = await response.json();
    initializeQuiz(); // Start the quiz after fetching questions
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

// Display the current question and options
function displayQuestion(index) {
  const question = questions[index];
  const questionElement = document.getElementById("question-container");
  const optionsElement = document.getElementById("left");

  // Display the question
  questionElement.textContent = `${question.question}`;

  // Clear previous options
  optionsElement.innerHTML = "";

  // Create radio buttons for options
  question.options.forEach((option, i) => {
    const optionDiv = document.createElement("div");
    const optionInput = document.createElement("input");
    const optionLabel = document.createElement("label");

    // Configure the radio input
    optionInput.type = "radio";
    optionInput.name = "option";
    optionInput.value = option;
    optionInput.id = `option${i}`;

    // Preselect the user's previous answer (if any)
    if (selectedAnswers[currentQuestionIndex] === option) {
      optionInput.checked = true;
    }

    // Configure the label
    optionLabel.htmlFor = `option${i}`;
    optionLabel.textContent = `${String.fromCharCode(65 + i)}. ${option}`;

    // Append the input and label to the div
    optionDiv.classList.add("option");
    optionDiv.appendChild(optionInput);
    optionDiv.appendChild(optionLabel);

    // Add the div to the options container
    optionsElement.appendChild(optionDiv);
  });

  // Update the question number display
  const questionNumber = document.getElementById("number");
  questionNumber.textContent = `Question ${index + 1} of ${questions.length}`;
}

// Update navigation button states
function updateButtons() {
  previousButton.disabled = currentQuestionIndex === 0;
  nextButton.textContent =
    currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
}


// Event Listeners for navigation
const nextButton = document.getElementById("next")


nextButton.addEventListener("click", () => {
  // Save the selected answer
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    selectedAnswers[currentQuestionIndex] = selectedOption.value;
  } else {
    alert("Please select an option before proceeding.");
    return; // Do not move to the next question if no option is selected
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
    updateButtons();
  } else {
    calculateScore(); // Show the score when submitting
  }
});
const previousButton = document.getElementById("previous")

previousButton.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion(currentQuestionIndex);
    updateButtons();
  }
});

// Calculate and display the score
function calculateScore() {
  let score = 0;

  // Compare user's answers with the correct answers
  questions.forEach((question, index) => {
    const userAnswer = selectedAnswers[index];
    const correctAnswer = question.answer;

    // Debugging logs
    console.log(`User's answer: ${userAnswer}, Correct answer: ${correctAnswer}`);

    if (userAnswer?.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      score++;
    }
  });

  // Display the score
  const restartButton = document.getElementById("restart-quiz");
  const quizContainer = document.getElementById("container");
  quizContainer.innerHTML = `
    <h2>Your Score: ${score} / ${questions.length}</h2>
    <p>Refresh the page to retake the quiz.</p>
  `;
  

  
  restartButton.addEventListener("click", () => {
  // Reset quiz state
  currentQuestionIndex = 0;
  selectedAnswers = {};
  initializeQuiz(); // Restart the quiz
});
}

// Initialize the quiz
function initializeQuiz() {
  displayQuestion(currentQuestionIndex);
  updateButtons();
}


// Fetch questions and start the quiz
document.addEventListener("DOMContentLoaded", fetchQuestions);
