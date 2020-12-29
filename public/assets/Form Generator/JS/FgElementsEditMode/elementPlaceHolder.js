
'use strict'

import { fgAttributeName, fgCssClassName } from "../FgElementsEditMode/fgElementEditModes.js"

class ElementPlaceHolder {

    constructor(cssClass) {
        this.cssClass = cssClass !== undefined ? cssClass.replace(fgCssClassName.placeholder, '').replace('text-right', '') : '';
    }
    
    static createElementPlaceHolder(cssClass) {
        return new ElementPlaceHolder(cssClass);
    }

}

export default ElementPlaceHolder 