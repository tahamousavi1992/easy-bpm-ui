'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgTitleEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, fgElement.titleType, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createTitle(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgTitleEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgTitleEditMode