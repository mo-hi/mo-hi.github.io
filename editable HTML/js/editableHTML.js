// region Init

function b_editableHTML_init(elementId = "body") {
    let container = document.getElementById(elementId);
    if (elementId == "body") container = document.body
    
    container.DescendantsWithClass('.js-edit-btn').forEach(editBtn => {   
        let divInitializer = new cls_editableHTML_divInitializer()
        divInitializer.setEditButtonDiv(editBtn)
        let node = divInitializer.node()
        let editButton = divInitializer.editButton()
        let saveButton = divInitializer.saveButton()
        let discardButton = divInitializer.discardButton()
       

        // button events
        editButton.JSEvent_AddClickTouch(ToggleEditSaveDiscard)
        saveButton.JSEvent_AddClickTouch(ToggleEditSaveDiscard)
        discardButton.JSEvent_AddClickTouch(ToggleEditSaveDiscard)

        editButton.JSEvent_AddClickTouch(b_edit_edit)
        saveButton.JSEvent_AddClickTouch(b_edit_unedit)
        discardButton.JSEvent_AddClickTouch(b_edit_unedit)

        // key events
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') b_edit_ESC()
        });   
});
}


class cls_editableHTML_divInitializer {
    constructor() {
        // this.editBtnDiv = editBtnDiv
    }

    setEditDiv(editDiv) {
        this.editBtnDiv = editDiv}

    setEditButtonDiv(editButtonDiv) {
        this.editBtnDiv = editButtonDiv}

    node() {
        // if btn wrapper is inside the node, set the link (overwrite)
        let IsNode = this.editBtnDiv.closest('.js-edit')
        if (IsNode) this.editBtnDiv.dataset.targetId = IsNode.id
    
        let node = document.getElementById(this.editBtnDiv.dataset.targetId)
        
        this.validate(node)
        return node
    }

    editButton() {
        let IsEditButton = this.editBtnDiv.DescendantsWithClass('.js-edit-edit')
        if (IsEditButton.length == 1) return IsEditButton[0]
        
        assert(IsEditButton.length == 0)
        let editButton = this.editBtnDiv.firstElementChild; 
        
        this.validate(editButton)
        editButton.classList.addX('js-edit-edit');
        return editButton
    }

    saveButton() {
        let IsSaveButton = this.editBtnDiv.DescendantsWithClass('.js-edit-save')
        if (IsSaveButton.length == 1) return IsSaveButton[0]
        
        assert(IsSaveButton.length == 0)
        let saveButton = this.editButton().nextElementSibling

        this.validate(saveButton)
        saveButton.classList.addX('js-edit-save');
        return saveButton
    }

    discardButton() {   
        let IsDiscardButton = this.editBtnDiv.DescendantsWithClass('.js-edit-discard') 
        if (IsDiscardButton.length == 1) return IsDiscardButton[0] 

        assert(IsDiscardButton.length == 0)
        let node= this.node()
        let DiscardButtons= node.DescendantsWithClass('.js-edit-discard')
        
        this.validate(DiscardButtons)
        return DiscardButtons[0] 
    }

    validate(div) {
        assert(div != undefined)
    }
}

class cls_editableHTML_divTracer {
    constructor(anyButton) {
        this.btn = null
        this.node = null
        this.editButton = null
        this.saveButton = null
        this.discardButton = null
        this.editableDivs = null
        this.trace(anyButton)
    }

    trace(anyButton) {
        if (anyButton.classList.contains('js-edit-discard')) {
            this.discardButton = anyButton}
        
        if (anyButton.closest('.js-edit')) {
            this.node = anyButton.closest('.js-edit')}
        
        if (this.node) {
            this.btn = document.querySelectorAll('.js-edit-btn[data-target-id="' + this.node.id + '"]')[0]}
        else {
            this.btn = anyButton.closest('.js-edit-btn')
            this.node = document.getElementById(this.btn.dataset.targetId)}

        this.editButton = this.btn.DescendantsWithClass('.js-edit-edit')[0]
        this.saveButton = this.btn.DescendantsWithClass('.js-edit-save')[0]
        this.discardButton = this.btn.DescendantsWithClass('.js-edit-discard')[0] || this.node.DescendantsWithClass('.js-edit-discard')[0]

        this.editableDivs = this.node.DescendantsWithClass('.js-edit-div')
    }

    Buttons() {
        return [this.editButton, this.saveButton, this.discardButton]
    }
}


function ToggleEditSaveDiscard(event) {
    let egoElement = DOM_ElementFromJSEvent(event)
    let Tracer = new cls_editableHTML_divTracer(egoElement)

    for (let button of Tracer.Buttons()) {
        button.classList.toggle('hidden');
    }
    Tracer.discardButton.dataset.status = Tracer.discardButton.classList.contains('hidden') ? '' : 'active';
}

// region Button Clicks

function b_edit_edit(event) {
    let divElement = DOM_ElementFromJSEvent(event)
    let editableDivs = new cls_editableHTML_divTracer(divElement).editableDivs
    let minHeight = 40

    for (let editableDiv of editableDivs) {
        editableDiv = b_edit_edit_SetDataset(editableDiv)

        if (editableDiv.dataset.originalStylePadding) {
            let padding = 0 + "px"
            editableDiv.style.setProperty("padding", padding)
            editableDiv.dataset.padding = padding}

        if (editableDiv.dataset.originalHeight) {
            let height = Math.max(editableDiv.dataset.originalHeight, minHeight) + "px"
            editableDiv.style.setProperty("height", height)
            editableDiv.dataset.height = height}
        
        if (editableDiv.dataset.originalInnerHTML) {
            editableDiv.innerHTML = ''}

        editableDiv.appendChild(__b_textarea(editableDiv))  
    }
}

function b_edit_edit_SetDataset(editableDiv) {
    let fDict = CONST_EDITABLE_HTML_FUNCTION_CALLS
    
    editableDiv.dataset.originalStylePadding = getComputedStyle(editableDiv).padding
    editableDiv.dataset.originalInnerHTML = editableDiv.innerHTML.trim()
    editableDiv.dataset.originaTextAreaValue = fDict["edit"](editableDiv.innerHTML.trim())
    editableDiv.dataset.originalHeight = parseInt(getComputedStyle(editableDiv).height) +
    parseInt(getComputedStyle(editableDiv).paddingTop) + parseInt(getComputedStyle(editableDiv).paddingBottom)

    return editableDiv
}

function b_edit_unedit(event) {
    let fDict = CONST_EDITABLE_HTML_FUNCTION_CALLS
    let divElement = DOM_ElementFromJSEvent(event)
    let editableDivs = new cls_editableHTML_divTracer(divElement).editableDivs

    for (let editableDiv of editableDivs) {
        let innerHTML = ''
        if (divElement.classList.contains('js-edit-save')) {
            let textarea = document.getElementById(editableDiv.id + "-textarea")
            innerHTML = fDict["save"](textarea.value)}
        if (divElement.classList.contains('js-edit-discard')) {
            innerHTML = editableDiv.dataset.originalInnerHTML}
        
        editableDiv.innerHTML = innerHTML
        _restoreOriginal(editableDiv)
    }
}

function b_edit_ESC() {
    document.querySelectorAll('.js-edit-discard[data-status="active"]').forEach(divElement => {
        b_edit_unedit(divElement); 
        ToggleEditSaveDiscard(divElement);
    });
}


function __b_textarea(editableDiv) {
    let textarea = document.createElement("textarea");
    // take over dataset
    textarea.id             = editableDiv.id + "-textarea"
    textarea.value          = editableDiv.dataset.originaTextAreaValue  
    textarea.style.padding  = editableDiv.dataset.originalStylePadding
    textarea.style.height   = '100%'
    textarea.style.width    = "100%"

    // textarea syle
    textarea.style.boxSizing = "border-box";       // size of textarea box: border-box = same as div, content-box = based on content
    textarea.style.border = "1.5px solid #0d6efd";
    textarea.style.borderRadius = '3px';
    textarea.style.resize = "none";

    //vertical scrollbar if needed
    textarea.style.overflowY = 'auto'; 
    textarea.style.overflowX = 'hidden';

    return textarea
}

function _restoreOriginal(editableDiv) {
    if (editableDiv.dataset.padding) {
        editableDiv.style.padding = ''
        editableDiv.dataset.padding = ''}
    
    if (editableDiv.dataset.height) {
        editableDiv.style.height = ''
        editableDiv.dataset.height = ''}
    
    let textarea = document.getElementById(editableDiv.id + "-textarea")
    if (textarea) textarea.remove()
}


// region Templates

function EditableDiv_TemplateButtons(targetID, includeDiscard = false) {
    // Create the main div
    let mainDiv = document.createElement('div');
    mainDiv.classList.add('js-edit-btn');
    mainDiv.dataset.targetId = targetID;

    // Create the edit button div
    let editButton = document.createElement('div');
    editButton.classList.add('btn', 'blue', 'js-event');
    editButton.innerHTML = b_svg("svg-icon-edit-18")

    // Create the save button div
    let saveButton = document.createElement('div');
    saveButton.classList.add('btn', 'blue', 'js-event', 'hidden');
    saveButton.innerHTML = b_svg("svg-icon-save-18")

    // Append the buttons to the main div
    mainDiv.appendChild(editButton);
    mainDiv.appendChild(saveButton);

    if (includeDiscard) {
        // Create the discard button div
        let discardButton = document.createElement('div');
        discardButton.classList.add('btn', 'blue', 'js-event', 'hidden', 'js-edit-discard');
        discardButton.innerHTML = b_svg("svg-icon-discard-12");
        mainDiv.appendChild(discardButton);
    }

    return mainDiv;
}

function EditableDiv_TemplateDiscard (id) {
            // Create the discard button div
            let discardButton = document.createElement('div');
            discardButton.classList.add('btn', 'blue', 'js-event', 'hidden', 'js-edit-discard');
            discardButton.innerHTML = b_svg("svg-icon-discard-12");
            if (id) discardButton.id = id
            return discardButton
}