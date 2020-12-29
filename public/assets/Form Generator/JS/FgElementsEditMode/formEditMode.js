'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgFormEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createForm(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgFormEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgFormEditMode


