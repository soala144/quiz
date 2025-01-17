let questions = []
let currentQuestionIndex = 0
async function loadQuestions(){
    try {
        const response = await fetch('real.json')
        const questions = await response.json()
        displayQuestion(currentQuestionIndex)
        console.log(questions.length)
   
        // Update Buttons Function
        function updateButtons() {
            // Disable previous if at the first question 
            if (currentQuestionIndex === 0) {
                previousButton.disabled = true
            } else {
                previousButton.disabled = false
            }

            // disable next if at the last question
            if (currentQuestionIndex === questions.length - 1) {
                nextButton.disabled = true
            } else {
                nextButton.disabled = false
            }
        }
        // Add the Next Button
        const nextButton = document.getElementById("next")
        nextButton.addEventListener("click", () => {
            
            currentQuestionIndex++
            displayQuestion(questions[currentQuestionIndex])
            updateButtons()
        })

    //    Previous button
        const previousButton = document.getElementById("previous")
      
        previousButton.addEventListener("click", () => {
            currentQuestionIndex--
            displayQuestion(questions[currentQuestionIndex])
            updateButtons()
           
        })
    } catch (error) {
        console.error('Errror loading questions: ', error)
    }
}
//    const questionNumber = document.getElementById("number")
//     questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`
function displayQuestion(index){
    const question = questions[index]
    console.log(question.question)
    // const questionNumber = document.getElementById("number")
    // const questionContainer = document.getElementById("right")
    // const optionElement = document.getElementById("left")

    // display Question
    // questionNumber.textContent = `Q${index + 1}: `
    // questionContainer.textContent =  `${question.question}`
    //  Clear previous Option
    // optionElement.innerHTML = "" 

    // question.option.forEach((option, i) => {
    //     const optionDiv = document.createElement("div")
    //     const optionInput = document.createElement("input")
    //     const optionLabel = document.createElement("label")

    //     optionInput.type = "radio"
    //     optionInput.name = "option"
    //     optionInput.value = option
    //     optionInput.id = `option${i}`

    //     optionLabel.htmlFor = `option${i}`
    //     optionLabel.textContent = `${String.fromCharCode(65 + 1)}. ${option}`

    //     // optionsDiv.classList.add("left") //add classlist
    //     optionDiv.appendChild(optionInput)
    //     optionDiv.appendChild(optionLabel)

    // })


}
document.addEventListener('DOMContentLoaded', loadQuestions)