
'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js";
class FgConentEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getDefaultToolbarButtons());
    }

    static createContent(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgConentEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgConentEditMode
