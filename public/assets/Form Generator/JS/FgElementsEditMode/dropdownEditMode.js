'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgDropdownEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.select, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createDropdown(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgDropdownEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgDropdownEditMode