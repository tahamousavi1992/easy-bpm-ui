'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgForm extends FgElement {
    constructor(id, label, cssClass, readOnly, formId, expressionVisibilityCode) {
        super(id, FgForm.getType(), cssClass, label, expressionVisibilityCode);
        this.readOnly = readOnly;
        this.formId = formId;
    }

    static createForm(id, label, cssClass, readOnly, formId, expressionVisibilityCode) {
        return new FgForm(id, label, cssClass, readOnly, formId, expressionVisibilityCode);
    }

    static getType() {
        return FG_ElementTypeEnum.FORM;
    }
}

export default FgForm