

'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgWordCaptcha extends FgElement {

    constructor(id, label, cssClass, length, expressionVisibilityCode) {
        super(id, FgWordCaptcha.getType(), cssClass, label, expressionVisibilityCode);
        this.length = length;
    }

    static createCaptcha(id, label, cssClass, length, expressionVisibilityCode) {
        return new FgWordCaptcha(id, label, cssClass, length, expressionVisibilityCode);
    }

    static getType() {
        return FG_ElementTypeEnum.WORDCAPTCHA;
    }
}

export default FgWordCaptcha