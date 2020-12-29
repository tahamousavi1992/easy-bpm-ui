'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgImageEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.img, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createImage(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgImageEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgImageEditMode