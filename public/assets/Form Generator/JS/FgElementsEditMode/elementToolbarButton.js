
'use strict'

class ElementToolbarButton {

    constructor(text, cssClass) {
        this.text = text;
        this.cssClass = cssClass;
    }

    static createElementToolbarButton(text, cssClass) {
        return new ElementToolbarButton(text, cssClass);
    }

}


export default ElementToolbarButton 