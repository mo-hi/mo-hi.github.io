
function b_editableHTML_init() {
    document.querySelectorAll('.js-edit-btn').forEach(editWrapper => {
        let editButton = editWrapper.firstElementChild
        let saveButton = editButton.nextElementSibling
        let editTarget = document.getElementById(editWrapper.dataset.targetId)
        let editableDiv = editTarget.firstElementChild
        let discardButton = editableDiv.nextElementSibling
        
        editButton = addEventListener_ClickTouch(editButton, ToggleEditSaveDiscard)
        saveButton = addEventListener_ClickTouch(saveButton, ToggleEditSaveDiscard)
        discardButton = addEventListener_ClickTouch(discardButton, ToggleEditSaveDiscard)

        editButton = addEventListener_ClickTouch(editButton, b_edit_edit)
        saveButton = addEventListener_ClickTouch(saveButton, b_edit_save)
        discardButton = addEventListener_ClickTouch(discardButton, b_edit_discard)
});
}

// Pure Desktop Application
function addEventListener_ClickTouch(element, functionName) {
    if (element.classList.contains("js-event")) {
        element.addEventListener('click', functionName)
        element.addEventListener('touchstart', function(event) {
            event.preventDefault(); // Prevent mouse events
            functionName(event);     // Call your function
            });
    }

    return element
}

function addEventListener_ClickTouch(element, functionName) {
    if (element.classList.contains("js-event")) {
        element.addEventListener('click', functionName)
        element.addEventListener('touchstart', function(event) {
            event.preventDefault(); // Prevent mouse events
            functionName(event);     // Call your function
            });
    }

    return element
}

function ToggleEditSaveDiscard(event) {
    let egoElement = divFromEvent(event)
    let [editButton, saveButton, discardButton, editableDiv, textareaDiv] = _return_edit_save_discard_editable_textarea(egoElement)

    if (!editButton) return 
    editButton.classList.toggle('hidden');
    saveButton.classList.toggle('hidden');
    discardButton.classList.toggle('hidden');
}

function b_edit_edit(event) {
    divElement = divFromEvent(event)

    let editableTarget = document.getElementById(divElement.parentElement.dataset.targetId)
    let editableDiv = editableTarget.firstElementChild
    
    // padding: store to dataset and modify element styling (to overwrite css styling)
    editableDiv.dataset.stylePadding = getComputedStyle(editableDiv).padding
    editableDiv.style.padding = "0px"
    // width: store to dataset and modify   -> if padding = 0 would not be applied, then then padding must also be substracted
    editableDiv.dataset.originalWidth = Math.round(editableDiv.offsetWidth  -2*parseFloat(getComputedStyle(editableDiv).borderWidth)) +"px"
    let wwidth = (parseInt(editableDiv.offsetWidth, 10)-36) + "px"
    editableDiv.style.setProperty("width", wwidth, "important")
    // innerHTML: store to dataset (used when discard is clicked later)
    editableDiv.dataset.originalInnerHTML = editableDiv.innerHTML
    // value for textarea
    let fDict = CONST_EDITABLE_HTML_FUNCTION_CALLS
    if (fDict["edit"]) {
        editableDiv.dataset.originalTextAreaValue = fDict["edit"](editableDiv.innerHTML)
    } else {
        editableDiv.dataset.originalTextAreaValue = editableDiv.innerHTML}

    // delete inner HTML and repalce by textarea
    editableDiv.innerHTML = ''
    editableDiv.appendChild(__b_textarea(editableDiv))  
}

function b_edit_save(event) {
    divElement = divFromEvent(event)
    let [editButton, saveButton, discardButton, editableDiv, textareaDiv] = _return_edit_save_discard_editable_textarea(divElement)
    
    let fDict = CONST_EDITABLE_HTML_FUNCTION_CALLS
    if (fDict["save"]) {
        editableDiv.innerHTML = fDict["save"](textareaDiv.value)
    } else {
        editableDiv.innerHTML = textareaDiv.value
    }

    _unedit(divElement)
}

function b_edit_discard(event) {
    divElement = divFromEvent(event)
    let [editButton, saveButton, discardButton, editableDiv, textareaDiv] = _return_edit_save_discard_editable_textarea(divElement)

    editableDiv.innerHTML = editableDiv.dataset.originalInnerHTML
    
    _unedit(divElement)
}

function divFromEvent(event) {
    let divElement = null;
    if (event instanceof PointerEvent) divElement = event.target;   // if eventlistener was used
    if (event instanceof HTMLElement) divElement = event;           // if setAttribute / direct HTML was used
    if (event instanceof TouchEvent) divElement = event.target;     // if eventlistener was used
    if (divElement == null) return

    /// target may be pointing to childrean of the intended target. Loop Up 5 parents. if not found, abort.
    for (i = 0; i < 5; i++) {
        if (!divElement.classList.contains('js-event')) divElement = divElement.parentElement}      
    if (!divElement.classList.contains('js-event')) return

    return divElement
}

function __b_textarea(editableDiv) {
    const textarea = document.createElement("textarea");
    // take over dataset
    textarea.value = editableDiv.dataset.originalTextAreaValue
    textarea.style.padding = editableDiv.dataset.stylePadding

    // take over width and height, modified id
    textarea.style.width = (editableDiv.offsetWidth) + "px"
    textarea.style.height = (editableDiv.offsetHeight) + "px"
    textarea.id = editableDiv.id + "-textarea"

    // textarea syle
    textarea.style.boxSizing = "border-box";       // size of textarea box: border-box = same as div, content-box = based on content
    textarea.style.border = "1.5px solid #0d6efd";
    textarea.style.borderRadius = '3px';
    textarea.style.resize = "none";

    return textarea
}

function _unedit(egoElement) {
    let [editButton, saveButton, discardButton, editableDiv, textareaDiv] = _return_edit_save_discard_editable_textarea(egoElement)

    // resert element styling (to activate back css styling)
    editableDiv.style.padding = ''
    editableDiv.style.width = ''

    if (textareaDiv) textareaDiv.remove()

}

function _return_edit_save_discard_editable_textarea(egoElement) {
    if (!egoElement.classList.contains('js-event')) return
    // fyi: the egoElement is one of the three
    let editButton = undefined
    let saveButton = undefined
    let discardButton = undefined
    // and the editable div + textarea (in case of save and discard )
    let editableDiv = undefined
    let textareaDiv = undefined

    if (egoElement.parentElement.classList.contains("js-edit-btn")) {
        editButton = egoElement.parentElement.firstElementChild
        saveButton = editButton.nextElementSibling
        discardButton = document.getElementById(egoElement.parentElement.dataset.targetId).firstElementChild.nextElementSibling}
    if (egoElement.parentElement.classList.contains("js-edit-div")) {
        sources = document.querySelectorAll('div[data-target-id="' + egoElement.parentElement.id + '"]')
        editButton = sources[0].firstElementChild
        saveButton = editButton.nextElementSibling
        discardButton = egoElement
    }
    editableDiv = discardButton.parentElement.firstElementChild
    if (egoElement === saveButton  || egoElement === discardButton) textareaDiv = editableDiv.firstElementChild
    return [editButton, saveButton, discardButton, editableDiv, textareaDiv]
}
