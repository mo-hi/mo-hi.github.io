// region Init

function editableHTML_init(elementId = "body") {
    let container = wenn(elementId == "body", document.body,document.getElementById(elementId))
    
    let editDivs = container.DescendantsWithClass('.js-edit')
    if (editDivs.length == 0) return

    for (let editDiv of editDivs) {
        let EditGroup = new cls_editableHTML_EditGroup(editDiv)

        if (EditGroup.IsTextDiv()) {
            EditGroup.class_edit.addEventListener_ClickAndTouch(editableHTML_onclick)
            continue}

        if (EditGroup.IsTextDivWithButtons()) {
            EditGroup.div_editButton.dataset.buttonType = "edit"
            EditGroup.div_saveButton.dataset.buttonType = "save"
            EditGroup.div_discardButton.dataset.buttonType = "discard"
            
            EditGroup.div_editButton.addEventListener_ClickAndTouch(editableHTML_ToogleButtons)
            EditGroup.div_saveButton.addEventListener_ClickAndTouch(editableHTML_ToogleButtons)
            EditGroup.div_discardButton.addEventListener_ClickAndTouch(editableHTML_ToogleButtons)

            EditGroup.div_editButton.addEventListener_ClickAndTouch(editableHTML_onclick)
            EditGroup.div_saveButton.addEventListener_ClickAndTouch(editableHTML_onclick)
            EditGroup.div_discardButton.addEventListener_ClickAndTouch(editableHTML_onclick)
        }
    }
}

class cls_editableHTML_EditGroup {
    constructor(editDiv) {
        if (editDiv == undefined) return // vaild construction, functionality is still available
        assert(editDiv.classList.contains('js-edit'))
        this.class_edit = editDiv

        if (this.IsTextDiv()) return

        if (this.IsSolo() && this.IsLinked()) {
            this.class_edit_btn = this._returnButtonContainer()
            this.div_editButton = this._returnButton_Edit()
            this.div_saveButton = this._returnButton_Save()
            this.div_discardButton = this._returnButton_Discard()
        }
    }

    IsEmpty() {
        return this.class_edit == undefined
    }

    IsTextDiv() {
        return (this.IsSolo() && !this.IsLinked())
    }

    IsTextDivWithButtons() {
        return this.IsLinked()
    }

    IsSolo() {
        return this.class_edit.DescendantsWithClass('.js-edit-div').length == 0}

    IsLinked() {
        return this.class_edit.dataset.editableLink !== undefined}

    _returnButtonContainer() {
        assert (this.IsLinked())
        let linkValue = this.class_edit.dataset.editableLink;
        let queryString = '[data-editable-link="' + linkValue + '"]'
        assert (document.querySelectorAll(queryString).length == 2)
        let queryString_Btn = '.js-edit-btn' + queryString
        assert (document.querySelectorAll(queryString_Btn).length == 1)

        return document.querySelectorAll(queryString_Btn)[0]}

    _returnButton_Edit() {
        assert (this.class_edit_btn !== undefined)
        return this.class_edit_btn.firstElementChild;
    }

    _returnButton_Save() {
        assert (this.class_edit_btn !== undefined)
        return this.class_edit_btn.firstElementChild.nextElementSibling
    }

    _returnButton_Discard() {
        assert (this.class_edit_btn !== undefined)
        if (this.div_saveButton.nextElementSibling !== undefined) {
            return this.div_saveButton.nextElementSibling} 
        
        //else: find it this.class_edit_btn()
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


    discardButton() {   
        let IsDiscardButton = this.class_edit_btn.DescendantsWithClass('.js-edit-discard') 
        if (IsDiscardButton.length == 1) return IsDiscardButton[0] 

        IsDiscardButton = this.class_edit.DescendantsWithClass('.js-edit-discard') 
        if (IsDiscardButton.length == 1) return IsDiscardButton[0]  
    }

    IsButton(divElement) {
        return divElement.classList.contains('js-edit-edit') || divElement.classList.contains('js-edit-save') || divElement.classList.contains('js-edit-discard')
    }

    CreateTeaxtarea() {
        let editableDiv = null
        let minHeight = 40

        if (this.IsSolo()) {editableDiv = this.class_edit}

        if (editableDiv.dataset.editMode == "active") return
        editableDiv.dataset.editMode = "active"
        this._SetDataset()

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

        editableDiv.appendChild(this._Textarea())  
    }

    _Textarea() {
        let editableDiv = this.class_edit
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

    _SetDataset() {
        let fDict = CONST_EDITABLE_HTML_FUNCTION_CALLS
        let editableDiv = this.class_edit

        editableDiv.dataset.originalStylePadding = getComputedStyle(editableDiv).padding
        editableDiv.dataset.originalInnerHTML = editableDiv.innerHTML.trim()
        editableDiv.dataset.originaTextAreaValue = fDict["edit"](editableDiv.innerHTML.trim())
        editableDiv.dataset.originalHeight = parseInt(getComputedStyle(editableDiv).height) +
        parseInt(getComputedStyle(editableDiv).paddingTop) + parseInt(getComputedStyle(editableDiv).paddingBottom)
    
        return editableDiv
    }

    Buttons() {
        this._validate()
        assert (!this.IsTextDiv())
        return [this.div_editButton, this.div_saveButton, this.div_discardButton]
    }


    InitFromButton(anyButton) {
        if (!this.IsEmpty()) return // in case js-edit is known, other functions shall be used
        
        let parent = anyButton.parentElement
        let linkValue = parent.dataset.editableLink;
        let queryString = '.js-edit[data-editable-link="' + linkValue + '"]'
        assert(document.querySelectorAll(queryString).length == 1)
        
        this.class_edit = document.querySelectorAll(queryString)[0]  // now -js-edit is known
        //copypaste from constructor:
        this.class_edit_btn = this._returnButtonContainer()
        this.div_editButton = this._returnButton_Edit()
        this.div_saveButton = this._returnButton_Save()
        this.div_discardButton = this._returnButton_Discard()
        this._validate()
    }

    _validate() {
        assert (this.class_edit !== undefined)
        if (this.IsTextDiv()) {
            assert (this.class_edit_btn !== undefined)
            assert (this.div_editButton !== undefined)
            assert (this.div_saveButton !== undefined)
            assert (this.div_discardButton !== undefined)
        }
    }

}


function editableHTML_ToogleButtons(event) {
        let egoButton = DOM_ElementFromJSEvent(event)
        let EditGroup = new cls_editableHTML_EditGroup()
        EditGroup.InitFromButton(egoButton)
        let buttons = EditGroup.Buttons()
        
        for (let button of buttons) {
            button.classList.toggle('hidden');
            button.dataset.status = button.classList.contains('hidden') ? '' : 'active';
        }
    }

function editableHTML_onclick(event) {
    let divElement = DOM_ElementFromJSEvent(event)
    let buttonType = divElement.dataset.buttonType
    let EditGroup  = null; 
    let actionEdit = false
    // Enter edit mode
    if (divElement.classList.contains('js-edit')) {
        actionEdit  = true
        EditGroup = new cls_editableHTML_EditGroup(divElement)}
    if (buttonType == "edit") {
        actionEdit  = true
        EditGroup = new cls_editableHTML_EditGroup()
        EditGroup.InitFromButton(divElement)
    }
    if (actionEdit) {
        EditGroup.CreateTeaxtarea()
        return}
    
    let actionUnEdit = false
    // save + discard (Undo Edit)
    if (["save", "discard"].includes(buttonType)) {
        actionUnEdit = true
        EditGroup = new cls_editableHTML_EditGroup()
        EditGroup.InitFromButton(divElement)
    }

    if (buttonType == "save") {
        let textarea = EditGroup.class_edit.DescendantsWithTag("textarea")[0]
        innerHTML = CONST_EDITABLE_HTML_FUNCTION_CALLS["save"](textarea.value)}

    if (buttonType == "discard") {
        innerHTML = EditGroup.class_edit.dataset.originalInnerHTML}

    if (actionUnEdit) {
        _restoreOriginal(EditGroup.class_edit)
        EditGroup.class_edit.innerHTML = innerHTML
        return}
    
    assert (false)
}

function editableHTML_DiscardAll() {
    document.querySelectorAll('.js-edit[data-edit-mode="active"]').forEach(divElement => {
        innerHTML = divElement.dataset.originalInnerHTML
        _restoreOriginal(divElement)
        divElement.dataset.editMode = ''
        divElement.innerHTML = innerHTML
    });

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

function editableHTML_SaveAllText() {
    let fDict = CONST_EDITABLE_HTML_FUNCTION_CALLS
    document.querySelectorAll('.js-edit[data-edit-mode="active"]').forEach(divElement => {
        let textarea = document.getElementById(divElement.id + "-textarea")
        innerHTML = fDict["save"](textarea.value)
        _restoreOriginal(divElement)
        divElement.dataset.editMode = ''
        divElement.innerHTML = innerHTML
    });
}


function _restoreOriginal(editableDiv) {
    if (editableDiv.dataset.padding) {
        editableDiv.style.padding = ''
        editableDiv.dataset.padding = ''}
    
    if (editableDiv.dataset.height) {
        editableDiv.style.height = ''
        editableDiv.dataset.height = ''}
    
    editableDiv.dataset.editMode = ""
    let textarea = editableDiv.DescendantsWithTag("textarea")[0]
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
