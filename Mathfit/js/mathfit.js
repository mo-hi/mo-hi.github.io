let num1, num2
let operator = "+"
let maxNumber = 11
let userAnswer = "";


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



function SetMaxNumber(n) {
    if (n == 5) {
        for (let id of ['num6', 'num7', 'num8', 'num9']) {
            document.getElementById(id).style.display = 'none'
        }
    }

    if (n > 5) {
        for (let id of ['num6', 'num7', 'num8', 'num9']) {
            document.getElementById(id).style.display = 'inline-block';
        }
    }
    document.getElementById("aufgabe").innerHTML = "Aufgaben bis " + String(n)
    maxNumber = n + 1;
    generateProblem();
}

function SetOperator(op) {
    operator = op;
    generateProblem();
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
        case "*":
            [num1, num2] = FromProblemTable("*", maxNumber-1);
            if (num1 != null) break;

            for (let x = 0; x < 100; x++) {
                num1 = Math.floor(Math.pow(Math.random() * maxNumber * maxNumber, 0.25));   // square->random -> root again. this way higher number are more likely
                num2 = Math.floor(Math.pow(Math.random() * maxNumber * maxNumber, 0.25));
                if (num1 * num2 <= maxNumber) break;
            }
            break;
        case "/":
            for (let x = 0; x < 100; x++) {
                num1 = Math.floor(Math.pow(Math.random() * maxNumber * maxNumber, 0.25));   // square->random -> root again. this way higher number are more likely
                num2 = Math.floor(Math.pow(Math.random() * maxNumber * maxNumber, 0.25));
                if (num1 * num2 <= maxNumber) {
                    num1 = num1 * num2
                    break; }
            }
            break;
    }

  document.getElementById("problem").innerHTML = num1 + " " + operator + " " + num2;
  userAnswer = "";
  document.getElementById("result").textContent = "";
}

function generateProblem_Mal() {
    if (maxNumber = 10) {

    }
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
            break;
        case "*":
            correctAnswer = num1 * num2;
            break;
        case "/":
            correctAnswer = num1 / num2;
            break;
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


// region level

generateProblem(); // Initial problem