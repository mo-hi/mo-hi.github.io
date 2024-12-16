let num1, num2, operator;
let maxNumber = 10
let userAnswer = "";

function SetMaxNumber(n) {
    maxNumber = n
    generateProblem()
}

function generateProblem() {
  num1 = Math.floor(Math.random() * maxNumber);
  num2 = Math.floor(Math.random() * maxNumber);
  operator = "+"; // For now, just addition

  document.getElementById("problem").innerHTML = num1 + " " + operator + " " + num2;
  userAnswer = "";
  document.getElementById("result").textContent = "";
}

function appendToResult(number) {
    if (document.getElementById("check").innerHTML == 'Leider Falsch') {
        userAnswer = "";
        document.getElementById("check").innerHTML = ''
        clearCheck()}
    userAnswer += number;
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = userAnswer;

    // Highlight the result
    resultDiv.classList.add("highlight");
    setTimeout(() => {
        resultDiv.classList.remove("highlight");
    }, 300); // Remove the highlight after 300ms (0.3 seconds)
}

function clearr(divID){
    document.getElementById(divID).innerHTML = "";
}

function clearResult(){
    userAnswer = "";
    clearr("result")
}

function clearCheck(){
    let check = document.getElementById("check")
    check.innerHTML = ""
    check.classList.remove("correct", "incorrect");
}

function checkAnswer() {
    let correctAnswer;
    switch (operator) {
        case "+":
            correctAnswer = num1 + num2;
            break;
        // Add cases for -, *, / later
    }

    let check = document.getElementById("check")
    clearCheck()

    if (parseInt(userAnswer) === correctAnswer) {
        check.classList.add("correct")
        check.innerHTML = 'Korrekt!'
        setTimeout(() => {
            generateProblem();
            clearr('check')
        }, 1000); 
        
    } else {
        check.classList.add("incorrect")
        check.innerHTML = 'Leider Falsch'
    }
}

generateProblem(); // Initial problem