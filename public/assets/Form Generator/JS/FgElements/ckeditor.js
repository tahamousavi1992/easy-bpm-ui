
'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgCKEDITOR extends FgElement {

    constructor(id, label, helpMessageText, isRequired, cssClass, fillBinding, mapBinding, events, expressionVisibilityCode, validationGroup, parameter) {
        super(id, FgCKEDITOR.getType(), cssClass, label, expressionVisibilityCode);
        this.helpMessageText = helpMessageText;
        this.isRequired = isRequired;
        this.fillBinding = fillBinding;
        this.mapBinding = mapBinding;
        this.events = events;
        this.validationGroup = validationGroup;
        this.parameter = parameter;
    }

    static createCKEDITOR(id, label, helpMessageText, isRequired, cssClass, fillBinding, mapBinding, events, expressionVisibilityCode, validationGroup, parameter) {
        return new FgCKEDITOR(id, label, helpMessageText, isRequired, cssClass, fillBinding, mapBinding, events, expressionVisibilityCode, validationGroup, parameter);
    }

    static getType() {
        return FG_ElementTypeEnum.CKEDITOR;
    }

}

export default FgCKEDITOR