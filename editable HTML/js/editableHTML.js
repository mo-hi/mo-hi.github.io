// region Init

function b_editableHTML_init(elementId = "body") {
    let container = document.getElementById(elementId);
    if (elementId == "body") container = document.body
    
    container.DescendantsWithClass('.js-edit').forEach(editDiv => {   
        let [editButton, saveButton, discardButton] = new cls_editableHTML_PerpareAndReturnEditGroup(editDiv)
       
        if (editDiv.dataset.editStatus == "solo") {
            // div Events
            let editableDivs = editDiv.DescendantsWithClass('.js-edit-div')
            for (let editableDiv of editableDivs) {
                editableDiv.addEventListener_ClickAndTouch(b_edit_edit)}

        } else {
            // button events
            editButton.addEventListener_ClickAndTouch(Toggle_EditSaveDiscard)
            saveButton.addEventListener_ClickAndTouch(Toggle_EditSaveDiscard)
            discardButton.addEventListener_ClickAndTouch(Toggle_EditSaveDiscard)

            editButton.addEventListener_ClickAndTouch(b_edit_edit)
            saveButton.addEventListener_ClickAndTouch(b_edit_unedit)
            discardButton.addEventListener_ClickAndTouch(b_edit_unedit)
        }
});
}


class cls_editableHTML_PerpareAndReturnEditGroup {
    constructor(editDiv) {
        this.class_edit = editDiv
        this.class_edit_btn()
        if (this.class_edit.dataset.editStatus == "solo") return [null, null, null]

        this.class_edit_edit = this.perpareEditButton()
        this.class_edit_save = this.perpareSaveButton()
        this.class_edit_discard = this.discardButton()
        return [this.class_edit_edit, this.class_edit_save, this.class_edit_discard]
    }

    setEditDiv(editDiv) {
        this.class_edit = editDiv}

    class_edit_btn() {
        // .edit-btn is a child of .edit (then creare a link via data-target-id)
        if (this.class_edit.DescendantsWithClass('.js-edit-btn').length == 1) {
            this.class_edit_btn = this.class_edit.DescendantsWithClass('.js-edit-btn')[0]
            this.class_edit_btn.dataset.targetId = this.class_edit.id
            return
        }
        // .edit-btn is a not a child of .edit (then they must by linked by data-target-id)
        if (document.querySelectorAll('.js-edit-btn[data-target-id="' + this.class_edit.id + '"]').length == 1) {
            this.class_edit_btn = document.querySelectorAll('.js-edit-btn[data-target-id="' + this.class_edit.id + '"]')[0]
            return
        }

        // in case of no edit-btn:
        this.class_edit.dataset.editStatus = "solo"
    }

    perpareEditButton() {
        let IsEditButton = this.class_edit_btn.DescendantsWithClass('.js-edit-edit')
        if (IsEditButton.length == 1) return IsEditButton[0]
        
        assert(IsEditButton.length == 0)
        let editButton = this.class_edit_btn.firstElementChild; 
        
        editButton.classList.addX('js-edit-edit');
        return editButton
    }

    perpareSaveButton() {
        let IsSaveButton = this.class_edit_btn.DescendantsWithClass('.js-edit-save')
        if (IsSaveButton.length == 1) return IsSaveButton[0]
        
        assert(IsSaveButton.length == 0)
        let saveButton = this.class_edit_edit.nextElementSibling

        saveButton.classList.addX('js-edit-save');
        return saveButton
    }

    discardButton() {   
        let IsDiscardButton = this.class_edit_btn.DescendantsWithClass('.js-edit-discard') 
        if (IsDiscardButton.length == 1) return IsDiscardButton[0] 

        IsDiscardButton = this.class_edit.DescendantsWithClass('.js-edit-discard') 
        if (IsDiscardButton.length == 1) return IsDiscardButton[0]  
    }

}

class cls_editableHTML_divTracer {
    constructor(anyButton) {
        this._IdentifyButtons(anyButton)
    }

    _IdentifyButtons(anyButton) {
        let tagButton = false
        if (anyButton.classList.contains('js-edit-discard')) {
            this.class_edit_discard = anyButton
            if (anyButton.closest('.js-edit-btn')) {
                this.class_edit_btn = anyButton.closest('.js-edit-btn')
                this.class_edit = document.getElementById(this.class_edit_btn.dataset.targetId)}
            if (anyButton.closest('.js-edit')) {
                this.class_edit = anyButton.closest('.js-edit')
                this.class_edit_btn = document.querySelectorAll('.js-edit-btn[data-target-id="' + this.class_edit.id + '"]')[0]}
            this.class_edit_save = this.class_edit_btn.DescendantsWithClass('.js-edit-save')[0]
            this.class_edit_edit = this.class_edit_btn.DescendantsWithClass('.js-edit-edit')[0]
            this.editableDivs = this.class_edit.DescendantsWithClass('.js-edit-div')
            return}

        if (anyButton.classList.contains('js-edit-save')) {
            this.class_edit_save = anyButton; 
            this.class_edit_btn = anyButton.closest('.js-edit-btn')
            this.class_edit = document.getElementById(this.class_edit_btn.dataset.targetId)
            this.class_edit_edit = this.class_edit_btn.DescendantsWithClass('.js-edit-edit')[0]
            this.class_edit_discard = this.class_edit_btn.DescendantsWithClass('.js-edit-discard')[0] || this.class_edit.DescendantsWithClass('.js-edit-discard')[0]
            this.editableDivs = this.class_edit.DescendantsWithClass('.js-edit-div')
            return}

        if (anyButton.classList.contains('js-edit-edit')) {
            this.class_edit_edit = anyButton
            this.class_edit_btn = anyButton.closest('.js-edit-btn')
            this.class_edit = document.getElementById(this.class_edit_btn.dataset.targetId)
            this.class_edit_save = this.class_edit_btn.DescendantsWithClass('.js-edit-save')[0]
            this.class_edit_discard = this.class_edit_btn.DescendantsWithClass('.js-edit-discard')[0] || this.class_edit.DescendantsWithClass('.js-edit-discard')[0]
            this.editableDivs = this.class_edit.DescendantsWithClass('.js-edit-div')
            return}

        // in case of no button
        assert (anyButton.classList.contains('js-edit-div'))
        this.editableDivs = anyButton.DescendantsWithClass('.js-edit-div')
    }

    Buttons() {
        return [this.class_edit_edit, this.class_edit_save, this.class_edit_discard]
    }
}


function Toggle_EditSaveDiscard(event) {
    let egoElement = DOM_ElementFromJSEvent(event)
    let Tracer = new cls_editableHTML_divTracer(egoElement)

    for (let button of Tracer.Buttons()) {
        button.classList.toggle('hidden');
    }
    Tracer.class_edit_discard.dataset.status = Tracer.class_edit_discard.classList.contains('hidden') ? '' : 'active';
}

// region Button Clicks

function b_edit_edit(event) {
    let divElement = DOM_ElementFromJSEvent(event)
    if (divElement.classList.contains('js-edit-div')) {
        b_edit_edit_text(divElement)}

    if (divElement.classList.contains('js-edit-edit') || divElement.classList.contains('js-edit-save') || divElement.classList.contains('js-edit-discard')) {
        b_edit_edit_button(divElement)}

}

function b_edit_edit_text(divElement) {
    let editableDivs = new cls_editableHTML_divTracer(divElement).editableDivs
    let minHeight = 40

    for (let editableDiv of editableDivs) {
        if (editableDiv.dataset.editMode == "active") return 
        editableDiv.dataset.editMode = "active"
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

function b_edit_edit_button(divElement) {
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


// function b_edit_Text(event) {
//     let fDict = CONST_EDITABLE_HTML_FUNCTION_CALLS
//     let divElement = DOM_ElementFromJSEvent(event)
//     assert (divElement.classList.contains('js-edit-div'))
//     let editableDivs = new cls_editableHTML_divTracer(divElement).editableDivs

//     for (let editableDiv of editableDivs) {
//         editableDiv = b_edit_edit_SetDataset(editableDiv)
// }

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

function b_editableHTML_DiscardAll() {
    document.querySelectorAll('.js-edit-discard[data-status="active"]').forEach(divElement => {
        b_edit_unedit(divElement); 
        Toggle_EditSaveDiscard(divElement);
    });

    document.querySelectorAll('.js-edit-div[data-edit-mode="active"]').forEach(divElement => {
        innerHTML = divElement.dataset.originalInnerHTML
        _restoreOriginal(divElement)
        divElement.dataset.editMode = ''
        divElement.innerHTML = innerHTML
    });
    
}

function b_editableHTML_SaveAllText() {
    let fDict = CONST_EDITABLE_HTML_FUNCTION_CALLS
    document.querySelectorAll('.js-edit-div[data-edit-mode="active"]').forEach(divElement => {
        let textarea = document.getElementById(divElement.id + "-textarea")
        innerHTML = fDict["save"](textarea.value)
        _restoreOriginal(divElement)
        divElement.dataset.editMode = ''
        divElement.innerHTML = innerHTML
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