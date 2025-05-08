function NAV_Sidebar(targetID, data,
    {numbering = true, idPrefix = "", idPostfix = ""} = {}) {
    let ul = document.getElementById(targetID)
    assert (ul instanceof HTMLUListElement && ul.classList.contains("js-fill")) 

    ul.innerHTML = "" // clear before filling
    let no = wenn(numbering, 0, -1)

    ul = _ulist(ul, data, no, numbering)

    if (idPrefix != "" || idPostfix != "") _addIDToLiChildren(ul, idPrefix, idPostfix)
}

function NAV_Sidebar_AddGenericClickFunction(targetID, clickfunction) {
    let ul = document.getElementById(targetID)
    assert (ul instanceof HTMLUListElement) 

    for (let li of ul.querySelectorAll('li')) {
        addEventListener_ClickTouch(li, clickfunction);
    }
}

function _nav_toggleDown(event) {
    let divElement = DOM_ElementFromJSEvent(event, true)

    _nav_CloseOtherOpenDropdowns(divElement)

    // Bugfix: in the landing page there are two sidebars, not one
    if (_nav_IsTopNavBar(divElement) && _nav_IsThereSidebar()) _nav_toggleSidebarZIndex()

    divElement.parentElement.classList.toggle('nav-js-active');
}

function _nav_CloseOtherOpenDropdowns(divElement) {
    for (let drop of document.querySelectorAll('nav drop')) {
        if (divElement.parentElement === drop) continue;
        drop.classList.remove('nav-js-active');
    }
}

function _nav_IsTopNavBar(divElement) {
    return divElement.tagName.toLowerCase() === 'a';
}

function _nav_IsThereSidebar() {
    return document.querySelectorAll('.sidebar').length === 1;}

function _nav_toggleSidebarZIndex() {
    let sidebar = document.querySelector('.sidebar')
    sidebar.classList.toggle('z--1')
}

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
    element.addEventListener('click', functionName)
    element.addEventListener('touchstart', function(event) {
  event.preventDefault(); // Prevent mouse events
  functionName(event);     // Call your function
});
    return element
}