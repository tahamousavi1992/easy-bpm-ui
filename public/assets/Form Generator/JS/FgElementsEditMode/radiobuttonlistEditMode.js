
'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgRadiobuttonlistEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createRadiobuttonlist(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgRadiobuttonlistEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgRadiobuttonlistEditMode