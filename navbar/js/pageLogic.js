const config = {
    fixed: document.getElementById('id-fixed').checked,
    interaction: document.querySelector('input[name="interaction"]:checked').value,
    navNum: document.querySelector('input[name="navNum"]:checked').value,
    slimMode: document.querySelector('input[name="slimMode"]:checked').value,
    gapSize: document.querySelector('input[name="gapSize"]:checked').value
}

function Reset() {
    document.getElementById('id-form-position').reset()
    document.getElementById('id-form-interaction').reset()
    document.getElementById('id-form-navNum').reset()
    document.getElementById('id-form-slimMode').reset()
    document.getElementById('id-form-gapSize').reset()
}

function Update() {
    _UpdateConfig() 
    _UpdateNavBlock()
    _UpdateHTMLBlock()
}

function _UpdateConfig() {
    config["fixed"] = document.getElementById('id-fixed').checked
    config["interaction"] = document.querySelector('input[name="interaction"]:checked').value
    config["navNum"] = parseInt(document.querySelector('input[name="navNum"]:checked').value)
    config["slimMode"] = document.querySelector('input[name="slimMode"]:checked').value
    config["gapSize"] = parseInt(document.querySelector('input[name="gapSize"]:checked').value)
}

function _UpdateNavBlock() {
    let parentNav = _Template_Reset()

    if (config["fixed"]) {
        parentNav.classList.add("nav-fixed", "w-responsive-xl")
        let statusbar = document.getElementById('id-status1')
        statusbar.classList.remove("mt-30i")
        statusbar.classList.add("mt-82i")
    }
    
    // 1,2 or 3 navs
    if (parseInt(config["navNum"]) == 1)
        parentNav.appendChild(_CreateNavExample())
    
    if (parseInt(config["navNum"]) > 1)
        parentNav.classList.add("nav-multi")
        document.getElementById('id-form-gapSize').classList.remove("hidden")
        document.getElementById('id-form-gapSize').classList.add("hidden")
    
    if (parseInt(config["navNum"]) == 2) {
        let navLeft = _CreateNavExample()
        let navRight = _CreateNavExample()
        navRight.classList.add("nav-right")
        parentNav.appendChild(navLeft)
        parentNav.appendChild(navRight)
        document.getElementById('id-form-gapSize').classList.remove("hidden")
        document.getElementById('id-form-gapSize').classList.add("hidden")
    }

    if (parseInt(config["navNum"]) == 3) {
        let navLeft = _CreateNavExample()
        let navCenter = _CreateNavExample()
        let navRight = _CreateNavExample()
        navCenter.classList.add("nav-middle")
        navRight.classList.add("nav-right")
        parentNav.appendChild(navLeft)
        parentNav.appendChild(navCenter)
        parentNav.appendChild(navRight)
        document.getElementById('id-form-gapSize').classList.remove("hidden")
    }

    // hover of clickable
    let drops = parentNav.querySelectorAll('div.drop');
    if (config["interaction"] == "hover") {
        drops.forEach(drop => drop.classList.add("hover-toggle"))
        document.getElementById('id-info-javascript-needed').classList.remove("hidden")
        document.getElementById('id-info-javascript-needed').classList.add("hidden")
    }

    if (config["interaction"] == "click") {
        drops.forEach(drop => drop.classList.add("click-toggle"))
        _nav_initClickListeners()
        document.getElementById('id-info-javascript-needed').classList.remove("hidden")
  
    }

    if (config["interaction"] == "close") {
        drops.forEach(drop => drop.classList.add("click-toggle"))
        drops.forEach(drop => drop.classList.add("auto-close"))
        _nav_initClickListeners()
        document.getElementById('id-info-javascript-needed').classList.remove("hidden")
    }

    // gap in case of three nav parts
    if (parseInt(config["gapSize"]) == 10) {
        parentNav.classList.add("nav-gap-10")
    }
    if (parseInt(config["gapSize"]) == 20) {
        parentNav.classList.add("nav-gap-20")
    }

    // gap in case of nav-slim and nav-compact
    if (config["slimMode"] == "slim") {
        parentNav.classList.add("nav-slim")
    }
    if (config["slimMode"] == "compact") {
        parentNav.classList.add("nav-compact")
    }
}

function _UpdateHTMLBlock() {
    document.getElementById("id-show-out").innerHTML = ""
    // ShowHTMLinTextArea(document.getElementById("id-show"), document.getElementById("id-show-out"), false, true,  "code")
    ExposeHTML({
        divToExpose: document.getElementById("id-show"), 
        divToAppend: document.getElementById("id-show-out"),
        pretty: true, 
        textAreaClassName: "code",
        synchWithTarget: true})
}


function _Template_Reset() {
    let parentNav = document.getElementById("id-nav")
    parentNav.innerHTML = ""    
    parentNav.className = "";
    let statusbar = document.getElementById('id-status1')
    statusbar.classList.remove("mt-82i")
    statusbar.classList.add("mt-30i")
    return parentNav
}


function _CreateNavExample() {
    let nav = document.createElement('nav')
    
    nav.appendChild(_CreateLink("MoHi", "https://mo-hi.github.io/"))
    nav.appendChild(_CreateLink("Reset", "", "Reset(); Update()"))
    nav.appendChild(_CreateLink("..."))

    let drop = document.createElement('div')
    drop.classList.add("drop")
    drop.appendChild(_CreateLink("DropDown"))

    let down = document.createElement('div')
    down.classList.add("down")
    down.appendChild(_CreateLink("Link 1"))
    down.appendChild(_CreateLink("Link 2"))
    down.appendChild(_CreateLink("Link 3"))
    drop.appendChild(down)
    nav.appendChild(drop)

    nav.appendChild(_CreateLink("Button", "", "", "nav-btn-blue"))

    return nav
}

function _CreateLink(text, href, conlick, className) {
    let a = document.createElement('a')
    a.innerHTML = text
    if (href) a.href = href
    if (conlick) a.setAttribute('onclick', conlick)
    if (className) a.className = className
    return a
}

// Don't do <a href=""></a>. 
// href="" tells the browser to reload the current page breaking the navbar configuration. 