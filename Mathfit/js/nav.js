function toggleDown(a) {
    let down = a.parentElement.querySelector("down")
    down.style.display = wenn(down.style.display == "block", "none", "block")}

function closeDown() {
    let nav = document.querySelector('nav')
    let downs = nav.querySelectorAll("down")
    for (let down of downs) {
        down.style.display = 'none'}
}

function wenn(condition, trueValue, falseValue) {
    return condition ? trueValue : falseValue;}