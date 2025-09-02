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
    
    let drops = ul.querySelectorAll('drop')
    if (drops.length > 0) {
        for (let drop of drops) {
            addEventListener_ClickTouch(drop, clickfunction);
        }
        return
    }
    assert(false)
}

function _nav_toggleDown(event) {
    let divElement = DOM_ElementFromJSEvent(event, true)

    _nav_CloseOtherOpenDropdowns(divElement)

    // class 'nav-js-active' is used (instead data attribute) to allow CSS to style the dropdown (hide/show)
    
    //explicit toogle (multiple actions)
    if (divElement.parentElement.classList.contains('nav-js-active')) {
        divElement.parentElement.classList.remove('nav-js-active');
        divElement.closest('nav').classList.remove('nav-js-active');
        // Add any additional logic needed when closing the dropdown here
    } else {
        divElement.parentElement.classList.add('nav-js-active');
        divElement.closest('nav').classList.add('nav-js-active');
        // Add any additional logic needed when opening the dropdown here
    }

    //explicit toogle (extended logic)
    if (_nav_IsTopNavBar(divElement) && _nav_IsThereSidebar()) {
        let sidebar = document.querySelector('.sidebar')
        if (divElement.closest('nav').classList.contains('nav-js-active')) {
            sidebar.classList.add('z--1')
        } else {
            sidebar.classList.remove('z--1')
        }
    
    }
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
    element.addEventListener('click', function(event) {
        event.preventDefault();
        functionName(event);
    });

    element.addEventListener('touchstart', function(event) {
        event.preventDefault(); // Prevent mouse events
        functionName(event);     // Call your function
    });
    return element
}



// ################################################################
// Download File                                                  #
// ################################################################

// class clsFiles {
//     static download(fileContent, filename, mimeType = 'text/plain;charset=utf-8') {
//         // fileContent can be string, ArrayBuffer, Uint8Array or Blob
//         const blob = fileContent instanceof Blob
//             ? fileContent
//             : new Blob([fileContent], { type: mimeType });

//         const url = URL.createObjectURL(blob);
//         const element = document.createElement('a');
//         element.style.display = 'none';
//         element.href = url;
//         element.download = filename || 'download';

//         document.body.appendChild(element);
//         element.click();
//         document.body.removeChild(element);

//         // Release ObjectURL after short time
//         setTimeout(() => URL.revokeObjectURL(url), 1000);
//     }

//     static readFiles(files) {
//         const readers = Array.from(files).map(file => {
//             return new Promise((resolve, reject) => {
//                 const reader = new FileReader();
//                 reader.onload = e => resolve({ file: file, content: e.target.result }); // ev.target === this === reader
//                 reader.onerror = () => resolve(null);
//                 reader.readAsText(file);
//             });
//         });

//         return Promise.all(readers);
//     }

//     // must be callled with await or inside async function
//     static upload(multiple=false) {
//         return new Promise(function (resolve) {
//             var input = document.createElement('input');
//             input.type = 'file';
//             if (multiple) input.multiple = true
//             input.style.display = 'none';

//             input.addEventListener('change', async function (e) {
//                 if (!input.files || input.files.length === 0) {
//                     input.remove(); resolve([]); return;}
                
//                 let files = input.files;
//                 input.remove();

//                 let result = await clsFiles.readFiles(files);
//                 resolve(result);
//             }, { once: true });

//             document.body.appendChild(input);
//             input.click();
//             });
//     }
// }