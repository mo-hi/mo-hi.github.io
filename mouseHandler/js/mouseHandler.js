/**
 * Handles mouse click events with timing logic to distinguish clicks.
 * You can define the onClickFunction either during initialization or when calling addEventListeners.
 *
 * Usage:
 * document.querySelectorAll('.js-event').forEach(element => {
 *  clsMouseHandler.addEventListeners(element, user_click);
 *  });

 */
class clsMouseHandler {
    
    static addEventListeners (element, onClickFunction) {
        if (!element || typeof onClickFunction != "function") 
            return

        let mousedownTime = 0

        element.addEventListener(
            'mousedown', 
            () => {
                mousedownTime = new Date().getTime()
            })

        element.addEventListener(
            'mouseup', 
            (event) => {
                let nextMouseupTime = new Date().getTime();
                let mousetime = nextMouseupTime-mousedownTime

                if (mousetime<300) onClickFunction(event)
            })        

    }
}