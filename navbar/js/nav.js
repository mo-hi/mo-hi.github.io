class clsNAV {
    constructor(targetID, data) {
        this.targetID = targetID
        this.data = data
    }

    static Sidebar = NAV_Sidebar
    static AddGenericClickFunction = NAV_AddGenericClickFunction
}


function NAV_Sidebar(targetID, data,
    {numbering = true, idPrefix = "", idPostfix = ""} = {}) {
    let ul = document.getElementById(targetID)
    assert (ul instanceof HTMLUListElement && ul.classList.contains("js-fill")) 

    ul.innerHTML = "" // clear before filling
    let no = wenn(numbering, 0, -1)

    ul = _ulist(ul, data, no, numbering)

    if (idPrefix != "" || idPostfix != "") _addIDToLiChildren(ul, idPrefix, idPostfix)
}

function NAV_AddGenericClickFunction(targetID, clickfunction) {
    let ul = document.getElementById(targetID)
    if (ul instanceof HTMLUListElement) {
        for (let li of ul.querySelectorAll('li')) {
            addEventListener_ClickTouch(li, clickfunction);
        }
        return
    }
    
    let drops = ul.querySelectorAll('drop');
    if (drops.length > 0) {
        for (let drop of drops) {
            addEventListener_ClickTouch(drop, clickfunction);
        }
        return
    }
    assert(false)
}

function _nav_CloseAllDropdowns(exceptElement = null) {
    for (let drop of document.querySelectorAll('nav .nav-js-active')) {
        if (!exceptElement || exceptElement.parentElement !== drop)
            drop.classList.remove('nav-js-active');
    }
}

function _nav_toggleDown(event) {
    // stop default browser behavior after clicking on href, etc...
    if (event instanceof Event) event.preventDefault();
    // get clicked element
    let divElement = DOM_ElementFromJSEvent(event, true)

    //close other open dropdowns
    _nav_CloseAllDropdowns(divElement)
    // for (let drop of document.querySelectorAll('nav .nav-js-active')) {
    //     if (divElement.parentElement != drop)
    //         drop.classList.remove('nav-js-active');
    // }

    //toggle navbar menu
    let navActiveState = divElement.parentElement.classList.toggle('nav-js-active');
    //toggle navbar status
    let nav = divElement.closest('nav');
    if (nav)
        nav.classList.toggle('nav-js-active', navActiveState);

    //z-index toogle if there is a navbar and a sidebar
    if (_nav_IsTopNavBar(divElement) && _nav_IsThereSidebar()) {
        let sidebar = document.querySelector('.sidebar')
        sidebar.classList.toggle('z--1', navActiveState)
    }
}

function _nav_initClickListeners() {
    //stnadard dropdown behavior
    let navItems = document.querySelectorAll('nav .drop.click-toggle > a, nav drop.click-toggle > a'); 
    navItems.forEach(item => {
        item.removeEventListener('click', _nav_toggleDown);
        item.addEventListener('click', _nav_toggleDown);
    });

    // autoclose dropdown, i. e. dropdown closed after subitem click
    let subItems= document.querySelectorAll(
        'nav .drop.click-toggle.auto-close .down > a,\
        nav drop.click-toggle.auto-close down > a'); 
    subItems.forEach(item => {
        item.removeEventListener('click', _nav_CloseAllDropdowns);
        item.addEventListener('click', _nav_CloseAllDropdowns);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    _nav_initClickListeners()
});



function _nav_IsTopNavBar(divElement) {
    return divElement.tagName.toLowerCase() === 'a' && !!divElement.closest('nav');
    // return divElement.tagName.toLowerCase() === 'a';
}

function _nav_IsThereSidebar() {
    return document.querySelectorAll('.sidebar').length === 1;}



// ################################################################
// dynamic sidebar                                                #
// ################################################################


function _addIDToLiChildren(ul, idPrefix, idPostfix) {
    for (let li of ul.DescendantsWithTag('li')) {
        li.id = idPrefix + li.dataset["name"] + idPostfix
    }
}

function _ulist(parent, items, no, numbering) {
    for (let [count,item] of items.entries()) {
        let li = _ulist_li(item, no, count+1)
        let nextItem = wenn(item.includes('children'), _ulist_dropdown(li, item, count+1, numbering), li)
        parent.appendChild(nextItem)
    }
    return parent
}

function _ulist_li(item, no, count) {
    let li = document.createElement('li');
    
    if (no == -1) li.innerHTML = item.name

    if (no ==  0) li.innerHTML = String(count) + " " + item.name;

    if (no >   0) li.innerHTML = String(no) + "." + String(count) + " " + item.name;

    li.dataset["name"] = item.name
    return li
}

function _ulist_dropdown(li, item, count,  numbering) {
    if (!Object.keys(item).includes('children')) return 

    let drop = document.createElement('drop'); // parent element of ego li
    li = addEventListener_ClickTouch(li, _nav_toggleDown)
    drop.appendChild(li)

    let down = document.createElement('down'); // next neighbour element of ego li
    count = wenn(numbering, count, -1)
    down = _ulist(down,item["children"], count)
    
    drop.appendChild(down)
    return drop
}

function addEventListener_ClickTouch(element, functionName) {
    // element.addEventListener('click', functionName)
    // element.addEventListener('click', function(event) {
    //     event.preventDefault();
    //     functionName(event);
    // });

    // element.addEventListener('touchstart', function(event) {
    //     event.preventDefault(); // Prevent mouse events
    //     functionName(event);     // Call your function
    // });
    element.addEventListener('click', functionName);
    element.addEventListener('touchstart', functionName, { passive: false });

    return element
}

