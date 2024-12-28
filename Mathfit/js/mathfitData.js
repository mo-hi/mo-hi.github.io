function FromProblemTable(operator, maxNumber) {
    let pairs = [];
    if (mathfitData[operator] === undefined) return [null, null]
    if (mathfitData[operator][maxNumber] === undefined) return [null, null]

    // Generate the list with factors
    mathfitData[operator][maxNumber].forEach(item => {
        let factor = item.factor || 1;
        for (let i = 0; i < factor; i++) {
            pairs.push([item.num1, item.num2]);
        }
    });

    // Choose a random pair
    let randomPair = pairs[Math.floor(Math.random() * pairs.length)];

    // 50% chance to switch the order
    if (Math.random() < 0.5) return [randomPair[1], randomPair[0]]
    return randomPair
        
}

var mathfitData = {
    "*": {
        "5": [
            {"num1": 0, "num2": 1},
            {"num1": 0, "num2": 2},
            {"num1": 0, "num2": 3},
            {"num1": 0, "num2": 4},
            {"num1": 0, "num2": 5},
            {"num1": 1, "num2": 1, "factor": 2},
            {"num1": 1, "num2": 2, "factor": 2},
            {"num1": 1, "num2": 3, "factor": 2},
            {"num1": 1, "num2": 4, "factor": 2},
            {"num1": 1, "num2": 5, "factor": 2},
            {"num1": 2, "num2": 2, "factor": 4},
        ], 
        "10": [
            {"num1": 0, "num2": 6},
            {"num1": 0, "num2": 7},
            {"num1": 0, "num2": 8},
            {"num1": 0, "num2": 9},
            {"num1": 0, "num2": 10},
            {"num1": 1, "num2": 6, "factor": 2},
            {"num1": 1, "num2": 7, "factor": 2},
            {"num1": 1, "num2": 8, "factor": 2},
            {"num1": 1, "num2": 9, "factor": 2},
            {"num1": 1, "num2": 10, "factor": 2},
            {"num1": 2, "num2": 3, "factor": 4},
            {"num1": 2, "num2": 4, "factor": 4},
            {"num1": 2, "num2": 5, "factor": 4},
            {"num1": 3, "num2": 3, "factor": 8}
        ], 
    }
}

