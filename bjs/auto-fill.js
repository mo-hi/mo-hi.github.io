// Automatically fill svg based on element class attribute
function Auto_Fill_SVGs(data) {
    _validateParts(data)
    let divElementsToFillWithSVG = document.querySelectorAll('[class^="svg-"].auto-fill');
    divElementsToFillWithSVG.forEach(divElement => {
        // let svgName = divElement.classList[0].replace('svg-', '');
        let key = Array.from(divElement.classList).find(className => className.startsWith('svg-'))
        if (data[key] != undefined) divElement.innerHTML = data[key]
        
    });
}

// Automatically fill text content based on element ID
function Auto_Fill_Parts(data) {
    _validateParts(data)
    for (let key in data) {
        let div = document.getElementById(key)
        if (div) {
            if(!div.classList.contains("auto-fill")) return
            div.innerHTML = data[key]}
    }
}

function Auto_Fill(targetdivID, data, toc = true) {
    let targetdiv = document.getElementById(targetdivID)
    if(!targetdiv.classList.contains("auto-fill")) return
    _validate(data)

    if (toc) {
        let SubSet_h2 = data.keyValues('h2').removeDuplicates()
        let ul = _ToC(SubSet_h2, 'horizontal')
        targetdiv.appendChild(ul)
    }

    data.forEach(item => {
        let keys = Object.keys(item)
        keys.forEach(key => {
            let div = document.createElement(key)
            if (key == 'h2') div.id = item[key]
            div.innerHTML = item[key]
            targetdiv.appendChild(div)
        })
    })
}

function _ToC(listofIDs, align = 'horizontal') {
    let ul = document.createElement('ul')
    listofIDs.forEach(id => {
        let li = document.createElement('li')
        let a = document.createElement('a')
        a.href = '#' + id; a.innerHTML = id
        li.appendChild(a)
        ul.appendChild(li)
    })
    ul.className = align
    return ul
}

function _validate(data) {
    if (data === null) throw new Error("auto-fill.js: data is null.")
    if (typOf(data) != "list") throw new Error("auto-fill.js: data is not a list.")
    
    let allowedKeys = ["h2", "h3", "p"];
    data.forEach(item => {
        if (item === null) throw new Error("auto-fill.js: item is null.")
        if (typOf(item) != "dict") throw new Error("auto-fill.js: item is not a dictionary.")
        if (!item.keys().every(key => allowedKeys.includes(key))) throw new Error("auto-fill.js: item has invalid keys.")
    });
}

function _validateParts(data) {
    if (data === null) throw new Error("auto-fill.js: data is null (Parts).")
    if (typOf(data) != "dict") throw new Error("auto-fill.js: data is not a dictionary.")
}