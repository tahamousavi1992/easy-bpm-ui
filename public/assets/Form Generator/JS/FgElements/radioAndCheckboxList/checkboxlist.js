
'use strict';
import { FgRadioAndCheckboxList, inlineClassEnum } from "./radioAndCheckboxList.js";
import { FgElement, FG_ElementTypeEnum } from "../fgElement.js";


class FgCheckboxlist extends FgRadioAndCheckboxList {

    constructor(options, isInline, helpMessageText, id, label, cssClass, isRequired, fillBinding, mapBinding, fillKey, fillText, events, parameter, readOnly, expressionVisibilityCode, validationGroup, fillListBinding) {
        super(FG_ElementTypeEnum.CHECKBOXLIST, options, isInline, helpMessageText, id, label, cssClass, null, fillBinding, mapBinding, fillKey, fillText, events, parameter, expressionVisibilityCode, fillListBinding);
        this.isRequired = isRequired;
        this.readOnly = readOnly;
        this.validationGroup = validationGroup;
    }

    static createFgCheckboxlist(options, isInline, helpMessageText, id, label, cssClass, isRequired, fillBinding, mapBinding, fillKey, fillText, events, parameter, readOnly, expressionVisibilityCode, validationGroup, fillListBinding) {
        return new FgCheckboxlist(options, isInline, helpMessageText, id, label, cssClass, isRequired, fillBinding, mapBinding, fillKey, fillText, events, parameter, readOnly, expressionVisibilityCode, validationGroup, fillListBinding);
    }

    static getType() {
        return FG_ElementTypeEnum.CHECKBOXLIST;
    }

}

export default FgCheckboxlist