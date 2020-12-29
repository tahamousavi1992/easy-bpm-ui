

'use strict';
import { FgElementEditMode, getDefaultToolbarButtons } from "./fgElementEditMode.js";
import FgCommon, { htmlElementType } from "../FgCommon.js"
class FgWordCaptchaEditMode extends FgElementEditMode {

    constructor(fgElement, containerCssClass, placeHolderCssClass) {
        super(fgElement, htmlElementType.div, getDefaultToolbarButtons(), containerCssClass, placeHolderCssClass);
    }

    static createCaptcha(fgElement, containerCssClass, placeHolderCssClass) {
        return new FgWordCaptchaEditMode(fgElement, containerCssClass, placeHolderCssClass);
    }

}

export default FgWordCaptchaEditMode