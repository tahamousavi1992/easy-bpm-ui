
'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgFileuploaderEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.input, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createFileuploader(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgFileuploaderEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgFileuploaderEditMode


