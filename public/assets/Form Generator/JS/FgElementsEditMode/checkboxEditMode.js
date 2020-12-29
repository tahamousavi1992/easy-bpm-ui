
'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js"
class FgCheckboxEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createCheckbox(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgCheckboxEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgCheckboxEditMode