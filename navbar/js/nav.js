// MOHI: Change this to class toggling
function toggleDown(a) {
    let down = a.parentElement.querySelector('down')
    down.style.display = wenn(down.style.display == 'block', 'none', 'block')
}

function wenn(condition, trueValue, falseValue) {
    return condition ? trueValue : falseValue;
}


// dynamic sidebar generation
function nav_AutoFillSidebar(targetID, data) {
    let ul = document.getElementById(targetID)
    if (!ul.classList.contains("sidebar-auto-fill")) return

    ul = _ulist(ul, data)
}

function _ulist(parent, items) {
    for (let item of items) {
        let li = document.createElement('li');
        li.innerHTML = item.name;
        if (Object.keys(item).includes('children')) {
            li.setAttribute('onclick', 'toggleDown(this)');
            let drop = document.createElement('drop'); // parent element of ego li
            let down = document.createElement('down'); // next neighbour element of ego li
            down = _ulist(down,item["children"])
            drop.appendChild(li)
            drop.appendChild(down)
            parent.appendChild(drop)
        } else {
            parent.appendChild(li)
        }
    }
    return parent
}