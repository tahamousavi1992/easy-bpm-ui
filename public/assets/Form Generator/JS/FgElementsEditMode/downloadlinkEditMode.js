'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgDownloadLinkEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.a, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createDownloadLink(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgDownloadLinkEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgDownloadLinkEditMode


