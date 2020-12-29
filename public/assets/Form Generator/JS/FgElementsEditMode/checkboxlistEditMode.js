'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js"
class FgCheckboxlistEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createCheckboxlist(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgCheckboxlistEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgCheckboxlistEditMode