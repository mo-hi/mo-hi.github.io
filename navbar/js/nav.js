function toggleDown(a) {
    let divElement = null;
    if (a instanceof PointerEvent) divElement = a.target;   // if eventlistener was used
    if (a instanceof HTMLElement) divElement = a;           // if setAttribute / direct HTML was used
    if (a instanceof TouchEvent) divElement = a.target;     // if eventlistener was used
    if (divElement == null) return

    _nav_CloseOtherOpenDropdowns(divElement)

    if (_nav_IsTopNavBar(divElement) && _nav_IsThereSidebar()) _nav_toggleSidebarZIndex()

    divElement.parentElement.classList.toggle('active');

    //DEBUG
    console.log("toggleDown: " + divElement.innerHTML)
}


function _nav_CloseOtherOpenDropdowns(divElement) {
    for (let drop of document.querySelectorAll('nav drop')) {
        if (divElement.parentElement === drop) continue;
        drop.classList.remove('active');
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

function nav_AutoFillSidebar(targetID, data, clickfunction, numbering = true) {
    let ul = document.getElementById(targetID)
    assert (ul instanceof HTMLUListElement && ul.classList.contains("js-fill")) 

    ul.innerHTML = "" // clear before filling
    let no = wenn(numbering, 0, -1)

    ul = _ulist(ul, data, clickfunction, no, numbering)
}

function _ulist(parent, items, clickfunction, no, numbering) {
    for (let [count,item] of items.entries()) {
        let li = _ulist_li(item, no, count+1, clickfunction)
        let nextItem = wenn(item.includes('children'), _ulist_dropdown(li, item, count+1, clickfunction, numbering), li)
        parent.appendChild(nextItem)
    }
    return parent
}

function _ulist_li(item, no, count, clickfunction) {
    let li = document.createElement('li');
    if (!item.includes('children')) li = addEventListener_ClickTouch(li, clickfunction)
    
    if (no == -1) li.innerHTML = item.name

    if (no ==  0) li.innerHTML = String(count) + " " + item.name;

    if (no >   0) li.innerHTML = String(no) + "." + String(count) + " " + item.name;

    return li
}

// function _ulist_li_or_dropdown(li, item, count, clickfunction) {
function _ulist_dropdown(li, item, count, clickfunction, numbering) {
    if (!Object.keys(item).includes('children')) return 

    let drop = document.createElement('drop'); // parent element of ego li
    li = addEventListener_ClickTouch(li, toggleDown)
    drop.appendChild(li)

    let down = document.createElement('down'); // next neighbour element of ego li
    count = wenn(numbering, count, -1)
    down = _ulist(down,item["children"], clickfunction, count)
    
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









        // if (Object.keys(item).includes('children')) {
        //     li.setAttribute('onclick', 'toggleDown(this)');
        //     let drop = document.createElement('drop'); // parent element of ego li
        //     let down = document.createElement('down'); // next neighbour element of ego li
        //     down = _ulist(down,item["children"], count)
        //     drop.appendChild(li)
        //     drop.appendChild(down)
        //     parent.appendChild(drop)
        // } else {
        //     li.setAttribute('onclick', 'foo(this)');
        //     parent.appendChild(li)
        // }



        
// function nav_AutoFillSidebar(targetID, data, clearBefore = true, numbering = true) {
//     let ul = document.getElementById(targetID)
//     if (!ul.classList.contains("sidebar-auto-fill")) return

//     let no = -1
//     if (clearBefore) ul.innerHTML = ""
//     if (numbering) no = 0

//     ul = _ulist(ul, data, no)
// }

// function _ulist(parent, items, no = 0, sidebarFunction = '') {
//     for (let [count,item] of items.entries()) {
//         let li = document.createElement('li');
//         li.innerHTML = _ulist_InnerHTML(item, no, count+1)
        
//         parent.appendChild(_ulist_children(li, item, count+1))
//     }
//     return parent
// }

// function _ulist_children(li, item, count) {
//     if (Object.keys(item).includes('children')) {
//         let drop = document.createElement('drop'); // parent element of ego li
//         li.setAttribute('onclick', 'toggleDown(this)');
//         drop.appendChild(li)

//         let down = document.createElement('down'); // next neighbour element of ego li
//         down = _ulist(down,item["children"], count)
        
//         drop.appendChild(down)
//         return drop
//     } else {
//         li.setAttribute('onclick', 'foo(this)');
//         return li
//     }
// }

// function _ulist_InnerHTML(item, no, count) {
//     let li = document.createElement('li');
//     if (no == -1) return item.name

//     if (no ==  0) return String(count) + " " + item.name;

//     if (no >   0) return String(no) + "." + String(count) + " " + item.name;

//     return li
// }
