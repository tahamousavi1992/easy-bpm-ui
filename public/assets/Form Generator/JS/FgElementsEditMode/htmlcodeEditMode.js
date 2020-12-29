'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgHTMLCODEEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createHTMLCODE(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgHTMLCODEEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgHTMLCODEEditMode