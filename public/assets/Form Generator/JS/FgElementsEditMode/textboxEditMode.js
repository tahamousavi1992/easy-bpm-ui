'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgTextboxEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.input, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createTextbox(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgTextboxEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgTextboxEditMode


