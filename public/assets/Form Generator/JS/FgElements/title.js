

'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgTitle extends FgElement {

    constructor(id, label, cssClass, titleType, fillBinding, expressionVisibilityCode, parameter) {
        super(id, FgTitle.getType(), cssClass, label, expressionVisibilityCode);
        this.titleType = titleType;
        this.fillBinding = fillBinding;
        this.parameter = parameter;
    }

    static createTitle(id, label, cssClass, titleType, fillBinding, expressionVisibilityCode, parameter) {
        return new FgTitle(id, label, cssClass, titleType, fillBinding, expressionVisibilityCode, parameter);
    }

    static getType() {
        return FG_ElementTypeEnum.TITLE;
    }

}

export default FgTitle