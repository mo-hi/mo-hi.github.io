/**
 * Handles mouse click events with timing logic to distinguish clicks.
 *
 * You can define the onClickFunction either during initialization or when calling addEventListeners.
 *

 */
class clsMouseHandler {
    constructor(onClickFunction) {
        this.mousedownTime = 0
        if (typeof onClickFunction == "function") this.onClickFunction = onClickFunction
        
    }

    addEventListeners = (element, onClickFunction) => {
        if (typeof onClickFunction == "function") this.onClickFunction = onClickFunction
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