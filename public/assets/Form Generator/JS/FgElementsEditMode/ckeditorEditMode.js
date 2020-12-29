
'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js"
class FgCKEDITOREditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.input, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createCKEDITOR(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgCKEDITOREditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgCKEDITOREditMode


