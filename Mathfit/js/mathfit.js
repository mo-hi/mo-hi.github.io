let num1, num2
let operator = "+"
let maxNumber = 11
let userAnswer = "";

function SetPlus5() {
    SetMaxNumber(5)
    for (let id of ['num6', 'num7', 'num8', 'num9']) {
        document.getElementById(id).style.display = 'none'
    }
    }
function SetPlus10() {SetMaxNumber(10)}
function SetPlus20() {SetMaxNumber(20)}
function SetPlus50() {SetMaxNumber(50)}
function SetPlus100() {SetMaxNumber(100)}
function SetPlus1000() {SetMaxNumber(1000)}

function SetMinus10() {SetMaxNumber(10, "-")}
function SetMinus20() {SetMaxNumber(20, "-")}
function SetMinus50() {SetMaxNumber(50, "-")}
function SetMinus100() {SetMaxNumber(100, "-")}
function SetMinus1000() {SetMaxNumber(1000, "-")}



function SetMaxNumber(n, op = "+") {
    for (let id of ['num6', 'num7', 'num8', 'num9']) {
        document.getElementById(id).style.display = 'inline-block'}
    operator = op
    maxNumber = n + 1
    generateProblem()
}

function generateProblem() {
    switch (operator) {
        case "+":
            num1 = Math.floor(Math.random() * maxNumber);
            num2 = Math.floor(Math.random() * (maxNumber-num1));
            break;
        case "-":
            for (let x = 0; x<100; x++) {
                num1 = Math.floor(Math.random() * maxNumber);
                num2 = Math.floor(Math.random() * maxNumber);
                if (num1 > num2) break
                }
            break;
    }

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
        case "-":
            correctAnswer = num1 - num2;
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