
'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js"
class FgColumnEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createColumn(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgColumnEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgColumnEditMode