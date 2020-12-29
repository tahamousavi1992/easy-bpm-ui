
'use strict'

import { fgAttributeName, fgCssClassName } from "../FgElementsEditMode/fgElementEditModes.js"


class ElementContainer {

    constructor(cssClass, elementToolbar, elementPlaceHolder) {
        this.cssClass = cssClass !== undefined ? cssClass.replace(fgCssClassName.container, '') : '';
        this.elementToolbar = elementToolbar;
        this.elementPlaceHolder = elementPlaceHolder;
    }

    static creatElementContainer(cssClass, elementToolbar, elementPlaceHolder) {
        return new ElementContainer(cssClass, elementToolbar, elementPlaceHolder);
    }

}

export default ElementContainer