
'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js"
class FgComboSearchEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.select, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createComboSearch(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgComboSearchEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgComboSearchEditMode