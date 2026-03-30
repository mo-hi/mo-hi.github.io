function navbar_home() {
    for (let tag of tagsAll) {
        tag.classList.remove("active")}

    for (let tag of tags_default_active) {
        tag.classList.add("active")}
    Update()
}

function Update() {
    UpdateNavBlock()
    UpdateHTMLBlock()
}

function navbar_static() {
    tag_fixed.classList.remove("active")
    tag_static.classList.add("active")
    Update()
}

function navbar_fixed() {
    tag_static.classList.remove("active")
    tag_autoclose.classList.remove("active")
    tag_fixed.classList.add("active")
    Update()
}

function navbar_click() {
    tag_hover.classList.remove("active")
    tag_autoclose.classList.remove("active")
    tag_click.classList.add("active")
    Update()
}

function navbar_autoclose() {
    tag_click.classList.remove("active")
    tag_hover.classList.remove("active")
    tag_autoclose.classList.add("active")
    Update()
}

function navbar_hover() {
    tag_hover.classList.add("active")
    tag_click.classList.remove("active")
    Update()
}

function One() {
    tag_1.classList.add("active")
    tag_2.classList.remove("active")
    Update()
}

function Two() {
    tag_1.classList.remove("active")
    tag_2.classList.add("active")
    Update()
}

function OldTemplate() {
    tag_new.classList.remove("active")
    tag_old.classList.add("active")

    Update()
}

function NewTemplate() {
    tag_old.classList.remove("active")
    tag_new.classList.add("active")

    Update()
}


function UpdateNavBlock() {
    let parentNav = _Template_Reset()

    // static of fixed
    if (tag_fixed.classList.contains("active")) {
        parentNav.classList.add("fixed", "wr-800-400", "top-0")
        let statusbar = document.getElementById('id-status1')
        statusbar.classList.remove("mt-30i")
        statusbar.classList.add("mt-82i")
    }

    

    // 1 or 2 navs (and new and old templates insice _CreateNavExample)
    if (tag_1.classList.contains("active") ) 
        parentNav.appendChild(_CreateNavExample())
    
    if (tag_2.classList.contains("active") ) {
        let navLeft = _CreateNavExample()
        navLeft.classList.add("w-55")

        let navRight = _CreateNavExample()
        navRight.classList.add("w-45")

        parentNav.appendChild(navLeft)
        parentNav.appendChild(navRight)
        parentNav.classList.add("flex")
    }


    // hover of clickable
    let drops = parentNav.querySelectorAll('drop, div.drop');
    if (tag_hover.classList.contains("active")) {
        drops.forEach(drop => drop.classList.add("hover-toggle"))
    }

    if (tag_click.classList.contains("active")) {
        drops.forEach(drop => drop.classList.add("click-toggle"))
        _nav_initClickListeners()
    }

    if (tag_autoclose.classList.contains("active")) {
        drops.forEach(drop => drop.classList.add("click-toggle"))
        drops.forEach(drop => drop.classList.add("auto-close"))
        _nav_initClickListeners()
    }
}

function UpdateHTMLBlock() {
    document.getElementById("id-show-out").innerHTML = ""
    ShowHTMLinTextArea(document.getElementById("id-show"), document.getElementById("id-show-out"), false, true)
}

function _AddOnClickAttribute() {
    let parentNav = document.getElementById("id-nav")
    let drop_as = parentNav.querySelectorAll('drop > a, div.drop > a');

    for (let i = 0; i < drop_as.length; i++) {
        drop_as[i].setAttribute('onclick', '_nav_toggleDown(this)');            
    }
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

    nav.appendChild(_CreateLink("Home", "", "navbar_home()"))
    nav.appendChild(_CreateLink("Link"))
    nav.appendChild(_CreateLink("Call"))

    if (tag_new.classList.contains("active")) {
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
    }

    if (tag_old.classList.contains("active")) {
        let drop = document.createElement('drop')
        drop.appendChild(_CreateLink("DropDown"))

        let down = document.createElement('down')
        down.appendChild(_CreateLink("Link 1"))
        down.appendChild(_CreateLink("Link 2"))
        down.appendChild(_CreateLink("Link 3"))
        drop.appendChild(down)
        nav.appendChild(drop)
    }

    return nav

}

function _CreateLink(text, href, conlick) {
    let a = document.createElement('a')
    a.innerHTML = text
    if (href) a.href = href
    if (conlick) a.setAttribute('onclick', conlick)
    return a
}

// Don't do <a href=""></a>. 
// href="" tells the browser to reload the current page breaking the navbar configuration. 