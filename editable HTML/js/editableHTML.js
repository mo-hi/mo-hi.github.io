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

        if (EditGroup.IsMultiTextDiv()) {
            for (let edit_child of EditGroup.class_edit_childs) {
                edit_child.addEventListener_ClickAndTouch(editableHTML_onclick)
            }
        }

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

        if (this.IsMultiTextDiv()) {
            this.class_edit_childs = this.class_edit.DescendantsWithClass('.js-edit-child')
        }

        if (this.IsTextDivWithButtons()) {
            this.class_edit_btn = this._returnButtonContainer()
            this.div_editButton = this._returnButton_Edit()
            this.div_saveButton = this._returnButton_Save()
            this.div_discardButton = this._returnButton_Discard()
        }
    }

    IsActive() {
        return this.class_edit.dataset.editMode == "active"
    }

    IsEmpty() {
        return this.class_edit == undefined
    }

    IsTextDiv() {
        return (this._IsSolo() && !this._IsLinked())
    }

    IsMultiTextDiv() {
        return (!this._IsSolo() && !this._IsLinked())
    }

    IsTextDivWithButtons() {
        return this._IsLinked()
    }

    _IsSolo() {
        return this.class_edit.DescendantsWithClass('.js-edit-child').length == 0}

    _IsLinked() {
        return this.class_edit.dataset.editableLink !== undefined}

    _returnButtonContainer() {
        assert (this._IsLinked())
        let linkValue = this.class_edit.dataset.editableLink;
        let queryString = '[data-editable-link="' + linkValue + '"]'
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
        if (this.div_saveButton.nextElementSibling) {
            return this.div_saveButton.nextElementSibling} 
        
        let linkValue = this.class_edit.dataset.editableLink;
        let queryString = '.js-edit-discard[data-editable-link="' + linkValue + '"]'
        if (document.querySelectorAll(queryString).length == 1) {
            return document.querySelectorAll(queryString)[0]}

        assert(false)
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

    CreateTeaxtarea() {
        let editableDivs = null
        this.class_edit.dataset.editMode = "active"

        if (this._IsSolo())  {editableDivs = [this.class_edit]}
        if (!this._IsSolo()) {editableDivs = this.class_edit.DescendantsWithClass(".js-edit-child")}

        for (let editableDiv of editableDivs) {
            editableDiv = this._CreateTeaxtarea_prepareEditableDivDataset(editableDiv)
            editableDiv.appendChild(this._CreateTeaxtarea_TextareaFromEditableDiv(editableDiv))  
        }
    }

    _CreateTeaxtarea_prepareEditableDivDataset(editableDiv) {
        let fDict = CONST_EDITABLE_HTML_FUNCTION_CALLS

        //padding
        editableDiv.dataset.originalStylePadding = getComputedStyle(editableDiv).padding
        let padding = 0 + "px"
        editableDiv.style.setProperty("padding", 0 + padding)
        editableDiv.dataset.padding = padding

        //height
        let minHeight = 40
        editableDiv.dataset.originalHeight = parseInt(getComputedStyle(editableDiv).height) +
        parseInt(getComputedStyle(editableDiv).paddingTop) + parseInt(getComputedStyle(editableDiv).paddingBottom)
        let height = Math.max(editableDiv.dataset.originalHeight, minHeight) + "px"
        editableDiv.style.setProperty("height", height)
        editableDiv.dataset.height = height
        
        //InnerHTML
        editableDiv.dataset.originalInnerHTML = editableDiv.innerHTML.trim()
        editableDiv.dataset.originaTextAreaValue = fDict["edit"](editableDiv.innerHTML.trim())
        editableDiv.innerHTML = ''

        return editableDiv
    }

    _CreateTeaxtarea_TextareaFromEditableDiv(editableDiv) {
        // let editableDiv = this.class_edit
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
        if (this.IsTextDiv()) {
            textarea.onblur = function() {editableHTML_DiscardAll();}}
    
        return textarea
    }

    Buttons() {
        this._validate()
        assert (!this.IsTextDiv())
        return [this.div_editButton, this.div_saveButton, this.div_discardButton]
    }


    InitFromButton(anyButton) {
        if (!this.IsEmpty()) return // in case js-edit is known, other functions shall be used
        
        let linkValue = ""
        if (anyButton.dataset.editableLink) {
            assert (anyButton.classList.contains("js-edit-discard"))
            linkValue = anyButton.dataset.editableLink
        } else {
            let parent = anyButton.parentElement
            linkValue = parent.dataset.editableLink;
        }

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

    Save() {
        if (this._IsSolo()) {
            this._Save_Single(this.class_edit)}
        else {
            for (let child of this.class_edit_childs) {
                this._Save_Single(child)}  }
        
        this.class_edit.dataset.editMode = ""
        }

    _Save_Single(editableDiv) {
        let fDict = CONST_EDITABLE_HTML_FUNCTION_CALLS
        let textareas = editableDiv.DescendantsWithTag("textarea")
        assert (textareas.length == 1)
        let textarea = textareas[0]

        let innerHTML = fDict["save"](textarea.value)
        this._restoreOriginal(editableDiv)
        editableDiv.innerHTML = innerHTML
        }

    _restoreOriginal(editableDiv) {
        editableDiv.dataset.editMode = ''
        editableDiv.style.padding = ''
        editableDiv.dataset.padding = ''
        editableDiv.style.height = ''
        editableDiv.dataset.height = ''
    }

    // Checker for empty EditGroup class
    IsEditText(divElement) {
        return divElement.classList.contains('js-edit') && divElement.DescendantsWithClass(".js-edit-child").length == 0}

    IsEditTextChild(divElement) {
        return divElement.classList.contains('js-edit-child')}

    IsEditButton(divElement) {
        return divElement.dataset.buttonType = "edit"
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
    let EditGroup  = new cls_editableHTML_EditGroup()
    // Enter edit mode
    if (EditGroup.IsEditText(divElement)) {
        EditGroup = new cls_editableHTML_EditGroup(divElement)}
    if (EditGroup.IsEditTextChild(divElement)) {
        let editParent = divElement.AncestorWithClass(".js-edit")
        EditGroup = new cls_editableHTML_EditGroup(editParent)}
    if (EditGroup.IsEditButton(divElement)) {
        EditGroup.InitFromButton(divElement)}

    // When not empty, then one of the above was sucessfull, i. e.click was on a "edit" user interface
    if (!EditGroup.IsEmpty()) {
        if (!EditGroup.IsActive()) EditGroup.CreateTeaxtarea()
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
    document.querySelectorAll('.js-edit[data-edit-mode="active"]').forEach(divElement => {
        let EditGroup = new cls_editableHTML_EditGroup(divElement)
        EditGroup.Save()
    });
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
