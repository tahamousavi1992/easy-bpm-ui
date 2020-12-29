'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgDatepickerEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.input, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createDatepicker(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgDatepickerEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgDatepickerEditMode