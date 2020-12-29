
'use strict'

class ElementToolbar {

    constructor(buttons) {
        this.buttons = buttons;
    }

    static createElementToolbar(buttons) {
        return new ElementToolbar(buttons);
    }

}

export default ElementToolbar 