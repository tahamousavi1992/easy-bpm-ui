'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";

class FgLinkEditMode extends FgElementEditMode {
    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.a, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createLink(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgLinkEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }
}

export default FgLinkEditMode