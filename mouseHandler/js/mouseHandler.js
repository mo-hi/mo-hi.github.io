class clsMouseHandler {
    constructor({"onClick":onClickFunction}) {
        this.mousedownTime = 0
        this.onClickFunction = onClickFunction
    }
    
    MouseDown = (event) => {
        this.mousedownTime = new Date().getTime();
    }

    MouseUp = (event) => {
        let nextMouseupTime = new Date().getTime();
        let mousetime = nextMouseupTime-this.mousedownTime

        if (mousetime<300) this.onClickFunction(event)
    } 
}