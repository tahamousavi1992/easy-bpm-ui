

'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgHTMLCODE extends FgElement {

    constructor(id, label, cssClass, fillBinding, expressionVisibilityCode, parameter) {
        super(id, FG_ElementTypeEnum.HTMLCODE, cssClass, label, expressionVisibilityCode);
        this.fillBinding = fillBinding;
        this.parameter = parameter;
    }

    static createHTMLCODE(id, label, cssClass, fillBinding, expressionVisibilityCode, parameter) {
        return new FgHTMLCODE(id, label, cssClass, fillBinding, expressionVisibilityCode, parameter);
    }

    static getType() {
        return FG_ElementTypeEnum.HTMLCODE;
    }

}

export default FgHTMLCODE