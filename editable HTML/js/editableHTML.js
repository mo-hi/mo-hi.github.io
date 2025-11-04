// region functions_editableHTML
class functions_editableHTML {
    constructor() {
        
    }

    Init(elementId) {
        let container = document.getElementById(elementId)
        assert(container != undefined)
        let editDivs = container.DescendantsWithClass('.js-edit')
        if (editDivs.length == 0) return
    
        for (let editDiv of editDivs) {
            let EditGroup = new cls_editableHTML_EditGroup(editDiv)
    
            if (EditGroup.HasButtons()) {
                EditGroup.div_editButton.addEventListener_ClickAndTouch(clsEDIT.ToogleButtons)
                EditGroup.div_saveButton.addEventListener_ClickAndTouch(clsEDIT.ToogleButtons)
                EditGroup.div_discardButton.addEventListener_ClickAndTouch(clsEDIT.ToogleButtons)
    
                EditGroup.div_editButton.addEventListener_ClickAndTouch(clsEDIT.OnClick)
                EditGroup.div_saveButton.addEventListener_ClickAndTouch(clsEDIT.OnClick)
                EditGroup.div_discardButton.addEventListener_ClickAndTouch(clsEDIT.OnClick)}
    
            if (EditGroup.IsSingleTextDiv()) {
                EditGroup.div_class_edit.addEventListener_ClickAndTouch(clsEDIT.OnClick)
                continue}
            if (EditGroup.IsMultiTextDiv()) {
                for (let edit_child of EditGroup.div_class_edit_childs) {
                    edit_child.addEventListener_ClickAndTouch(clsEDIT.OnClick)}}
        }
    }
}


// region editableHTML
// the edit group  class that contains all information about an editable HTML elements, like butttons and the actual editable divs
// there's no internal data structure that holds all edit groups. Each edit group is created when needed.
// necessary data is stored in the DOM via data-attributes.
// editableHTML class works either via eventlisteners or via direct calls to the class methods.
class cls_editableHTML_EditGroup {
    constructor(editDiv) {
        // internal variables for edit-group data structure
        this.div_class_edit = undefined         // the editable div container itself
        this.div_class_edit_childs = undefined  // child divs in case of multi text div
        this.div_class_edit_btn = undefined     // button container
        this.div_editButton = undefined     // edit button element
        this.div_saveButton = undefined     // save button element
        this.div_discardButton = undefined  // discard button element
        this._constructor(editDiv)}

    _constructor(editDiv) {
        if (editDiv == undefined) return // vaild construction, functionality of this class is still available
        assert(editDiv.classList.contains('js-edit'))
        
        this.div_class_edit = editDiv
        if (this.div_class_edit.dataset.editOnlyWhenControlPressed == undefined) {
            this.div_class_edit.dataset.editOnlyWhenControlPressed = "true"}

        if (this.IsMultiTextDiv()) {
            this.div_class_edit_childs = this.div_class_edit.DescendantsWithClass('.js-edit-child')}

        if (this.HasButtons()) {
            this.div_class_edit.dataset.editOnlyWhenControlPressed = "false"
            this.div_class_edit_btn = this._returnButtonContainer()

            this.div_editButton = this.div_class_edit_btn.firstElementChild;
            this.div_editButton.dataset.buttonType = "edit"

            this.div_saveButton = this.div_class_edit_btn.firstElementChild.nextElementSibling
            this.div_saveButton.dataset.buttonType = "save"

            this.div_discardButton = this._returnButton_Discard()
            this.div_discardButton.dataset.buttonType = "discard"
        }
    }

    FromClickEvent(event) {
        let divElement = DOM_ElementFromJSEvent(event)
        
        if (this._clickOnEditableDiv(divElement)) {
            this._constructor(divElement)
            return this}

        if (this._clickOnEditableDivChild(divElement)) {
            let parent = divElement.AncestorWithClass(".js-edit")
            this._constructor(parent)
            return this}

        if (this._clickOnButton(divElement)) {
            this.InitFromButton(divElement)
            assert(!this.IsEmpty())
            return this}

        assert(false)
    }

    _clickOnEditableDiv(divElement) {
       return  (divElement.classList.contains('js-edit') && divElement.DescendantsWithClass(".js-edit-child").length == 0) 
    }

    _clickOnEditableDivChild(divElement) {
        return divElement.classList.contains('js-edit-child')
    }

    _clickOnButton(divElement) {
        let buttonType = divElement.dataset.buttonType
        return ["edit","save", "discard"].includes(buttonType)
    }

    // build in jevascript method for classes that returns a boolean when the object is called without further functiuons/parameters

    IsInReadMode() {
        return !this.IsInEditMode()
    }
    IsInEditMode() {
        return this.div_class_edit.dataset.editMode == "active"
    }

    IsEmpty() {
        return this.div_class_edit == undefined
    }

    IsSingleTextDiv() {
        return this.div_class_edit.DescendantsWithClass('.js-edit-child').length == 0}
    IsMultiTextDiv() {
        return !this.IsEmpty() && !this.IsSingleTextDiv()}

    HasButtons() {
        return this.div_class_edit.dataset.editableLink !== undefined}

    _returnButtonContainer() {
        assert (this.HasButtons())
        let linkValue = this.div_class_edit.dataset.editableLink;
        let queryString = '[data-editable-link="' + linkValue + '"]'
        let queryString_Btn = '.js-edit-btn' + queryString
        assert (document.querySelectorAll(queryString_Btn).length == 1)

        return document.querySelectorAll(queryString_Btn)[0]}

    _returnButton_Discard() {
        if (this.div_saveButton.nextElementSibling) {
            return this.div_saveButton.nextElementSibling} 
        
        let linkValue = this.div_class_edit.dataset.editableLink;
        let queryString = '.js-event[data-editable-link="' + linkValue + '"]'
        // let queryString = '[data-editable-link="' + linkValue + '"][data-button-type="discard"]'
        if (document.querySelectorAll(queryString).length == 1) {
            return document.querySelectorAll(queryString)[0]}

        assert(false)
    }

    setEditDiv(editDiv) {
        this.div_class_edit = editDiv}

    class_edit_btn() {
        // .edit-btn is a child of .edit (then creare a link via data-target-id)
        if (this.div_class_edit.DescendantsWithClass('.js-edit-btn').length == 1) {
            this.div_class_edit_btn = this.div_class_edit.DescendantsWithClass('.js-edit-btn')[0]
            this.div_class_edit_btn.dataset.targetId = this.div_class_edit.id
            return
        }
        // .edit-btn is a not a child of .edit (then they must by linked by data-target-id)
        if (document.querySelectorAll('.js-edit-btn[data-target-id="' + this.div_class_edit.id + '"]').length == 1) {
            this.div_class_edit_btn = document.querySelectorAll('.js-edit-btn[data-target-id="' + this.div_class_edit.id + '"]')[0]
            return
        }

        // in case of no edit-btn:
        this.div_class_edit.dataset.editStatus = "solo"
    }


    Edit_CreateTeaxtarea() {
        let editableDivs = null
        if (this.IsSingleTextDiv()) {
        // document.querySelectorAll("textarea.temp-editable");
            clsEDIT.DiscardAll()
        }
        this.div_class_edit.dataset.editMode = "active"

        if (this.IsSingleTextDiv())  {editableDivs = [this.div_class_edit]}
        if (this.IsMultiTextDiv()) {editableDivs = this.div_class_edit.DescendantsWithClass(".js-edit-child")}

        for (let editableDiv of editableDivs) {

            editableDiv = this._CreateTeaxtarea_prepareEditableDivDataset(editableDiv)

            editableDiv.appendChild(this._CreateTeaxtarea_TextareaFromEditableDiv(editableDiv))
            editableDiv.DescendantsWithTag("textarea")[0].focus()
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
        editableDiv.dataset.originaTextAreaValue = fDict["edit"](editableDiv.innerHTML.trim(), editableDiv)
        editableDiv.innerHTML = ''

        return editableDiv
    }

    _CreateTeaxtarea_TextareaFromEditableDiv(editableDiv) {
        // let editableDiv = this.div_class_edit
        let textarea = document.createElement("textarea");

        textarea.classList = "temp-editable"
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
        // if (this.IsSingleTextDiv()) {
        //     textarea.onblur = function() {editableHTML_DiscardAll();}}
    
        return textarea
    }

    Buttons() {
        this._validate()
        return [this.div_editButton, this.div_saveButton, this.div_discardButton]
    }


    InitFromButton(anyButton) {
        assert(this.IsEmpty())      // in case js-edit is known, standedard init shall be used
        
        let linkValue = ""
        if (anyButton.dataset.editableLink) {
            assert (anyButton.dataset.buttonType == "discard")
            linkValue = anyButton.dataset.editableLink
        } else {
            let parent = anyButton.parentElement
            linkValue = parent.dataset.editableLink;
        }

        let queryString = '.js-edit[data-editable-link="' + linkValue + '"]'
        assert(document.querySelectorAll(queryString).length == 1)
        
        let editDiv = document.querySelectorAll(queryString)[0]  // now -js-edit is known
        this._constructor(editDiv)
    }

    _validate() {
        assert (this.div_class_edit !== undefined)
        if (this.IsSingleTextDiv()) {
            assert (this.div_class_edit_btn !== undefined)
            assert (this.div_editButton !== undefined)
            assert (this.div_saveButton !== undefined)
            assert (this.div_discardButton !== undefined)
        }
    }

    Save() {
        if (this.IsSingleTextDiv()) {
            this.div_class_edit.dataset.editMode = ''
            this._Save_Single(this.div_class_edit)}
        else {
            this.div_class_edit.dataset.editMode = ''
            for (let child of this.div_class_edit_childs) {
                this._Save_Single(child)}  }
        }

    _Save_Single(editableDiv) {
        let fDict = CONST_EDITABLE_HTML_FUNCTION_CALLS
        let textareas = editableDiv.DescendantsWithTag("textarea")
        assert (textareas.length == 1)
        let textarea = textareas[0]

        let innerHTML = fDict["save"](textarea.value, editableDiv)
        this._restoreOriginal(editableDiv)
        editableDiv.innerHTML = innerHTML
        }

    _restoreOriginal(editableDiv) {
        editableDiv.style.padding = ''
        editableDiv.dataset.padding = ''
        editableDiv.style.height = ''
        editableDiv.dataset.height = ''
    }

    Discard() {
        if (this.IsSingleTextDiv()) {
            this.div_class_edit.dataset.editMode = ''
            this._Discard_Single(this.div_class_edit)
        } else {
            this.div_class_edit.dataset.editMode = ''
            for (let child of this.div_class_edit_childs) {
                this._Discard_Single(child)}}
    }

    _Discard_Single(editableDiv) {
        this._restoreOriginal(editableDiv)
        editableDiv.innerHTML = editableDiv.dataset.originalInnerHTML
    }

    // Checker for empty EditGroup class
    IsEditText(divElement) {
        return divElement.classList.contains('js-edit') && divElement.DescendantsWithClass(".js-edit-child").length == 0}

    IsEditTextChild(divElement) {
        return divElement.classList.contains('js-edit-child')}

    IsEditButton(divElement) {
        return 
    }

}

// region clsEDIT
// The User interface class for editable HTML elements
class clsEDIT {
    constructor() {
    }

    static ButtonClick(event) {
        clsEDIT.OnClick(event)
        clsEDIT.ToogleButtons(event)
    }

    static ToogleButtons(event) {
        let egoButton = DOM_ElementFromJSEvent(event)
        let EditGroup = new cls_editableHTML_EditGroup()
        EditGroup.InitFromButton(egoButton)
        let buttons = EditGroup.Buttons()
        
        for (let button of buttons) {
            button.classList.toggle('hidden');
            button.dataset.status = button.classList.contains('hidden') ? '' : 'active';
        }  
    }

    static OnClick(event) {
        let EditGroup = new cls_editableHTML_EditGroup().FromClickEvent(event);
        if (!event.ctrlKey && EditGroup.div_class_edit.dataset.editOnlyWhenControlPressed == "true") return

        if (clsEDIT._IsTextEvent(event) || clsEDIT._Buttonevent(event, ["edit"])) {
            if (EditGroup.IsInReadMode()) EditGroup.Edit_CreateTeaxtarea() 
            return}

        if (clsEDIT._Buttonevent(event, ["save"])) {
            EditGroup.Save()}

        if (clsEDIT._Buttonevent(event, "discard")) {
            EditGroup.Discard()}

    }
    static _IsTextEvent(event) {
        let divElement = DOM_ElementFromJSEvent(event)
        if (divElement.classList.contains('js-edit') || divElement.classList.contains('js-edit-child') ) return true
    }

    static _Buttonevent(event, types) {
        let divElement = DOM_ElementFromJSEvent(event)
        let buttonType = divElement.dataset.buttonType
        return types.includes(buttonType)
    }

    static DiscardAll(includeButtons = false) {
            document.querySelectorAll('.js-edit[data-edit-mode="active"]').forEach(divElement => {
        let EditGroup = new cls_editableHTML_EditGroup(divElement)
        if (!EditGroup.HasButtons() || includeButtons) EditGroup.Discard()
    });
    }

    static SaveAll(includeButtons = false) {
        document.querySelectorAll('.js-edit[data-edit-mode="active"]').forEach(divElement => {
            let EditGroup = new cls_editableHTML_EditGroup(divElement)
            if (!EditGroup.HasButtons() || includeButtons) EditGroup.Save()
        });
    }
}