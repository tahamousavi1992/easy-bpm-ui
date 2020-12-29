

'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgCaptcha extends FgElement {

    constructor(id, label, cssClass, language, sitekey, privatekey, expressionVisibilityCode) {
        super(id, FgCaptcha.getType(), cssClass, label, expressionVisibilityCode);
        this.language = language;
        this.sitekey = sitekey;
        this.privatekey = privatekey;
    }

    static createCaptcha(id, label, cssClass, language, sitekey, privatekey, expressionVisibilityCode) {
        return new FgCaptcha(id, label, cssClass, language, sitekey, privatekey, expressionVisibilityCode);
    }

    static getType() {
        return FG_ElementTypeEnum.CAPTCHA;
    }
}

export default FgCaptcha