
'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js"

class FgButtonEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.button, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createButton(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgButtonEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }
}

export default FgButtonEditMode