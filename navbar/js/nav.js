function toggleDown(a) {
    let down = a.parentElement.querySelector('down')
    down.style.display = wenn(down.style.display == 'block', 'none', 'block')
}

function wenn(condition, trueValue, falseValue) {
    return condition ? trueValue : falseValue;
}