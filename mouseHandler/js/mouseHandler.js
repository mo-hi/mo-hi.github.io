class clsMouseHandler {
    constructor({"onClick":onClickFunction}) {
        this.mousedownTime = 0
        this.onClickFunction = onClickFunction
    }

    addEventListeners = (element) => {
        element.addEventListener('mousedown', this._MouseDown)
        element.addEventListener('mouseup', this._MouseUp)
    }
    
    _MouseDown = (event) => {
        this.mousedownTime = new Date().getTime();
    }

    _MouseUp = (event) => {
        let nextMouseupTime = new Date().getTime();
        let mousetime = nextMouseupTime-this.mousedownTime

        if (mousetime<300) this.onClickFunction(event)
    } 
}