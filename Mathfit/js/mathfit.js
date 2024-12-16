let num1, num2, operator;
let userAnswer = "";

function generateProblem() {
  num1 = Math.floor(Math.random() * 10);
  num2 = Math.floor(Math.random() * 10);
  operator = "+"; // For now, just addition

  document.getElementById("problem").innerHTML = num1 + " " + operator + " " + num2;
  userAnswer = "";
  document.getElementById("result").textContent = "";
}

function appendToResult(number) {
    userAnswer += number;
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = userAnswer;

    // Highlight the result
    resultDiv.classList.add("highlight");
    setTimeout(() => {
        resultDiv.classList.remove("highlight");
    }, 300); // Remove the highlight after 300ms (0.3 seconds)
}

function clearResult(){
    userAnswer = "";
    document.getElementById("result").textContent = "";
}

function checkAnswer() {
    let correctAnswer;
    switch (operator) {
        case "+":
            correctAnswer = num1 + num2;
            break;
        // Add cases for -, *, / later
    }
    if (parseInt(userAnswer) === correctAnswer) {
        alert("Correct!");
        generateProblem();
    } else {
        alert("Try again!");
    }
}

generateProblem(); // Initial problem