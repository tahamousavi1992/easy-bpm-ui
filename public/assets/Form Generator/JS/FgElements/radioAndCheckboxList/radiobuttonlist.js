
'use strict';
import { FgRadioAndCheckboxList, inlineClassEnum } from "./radioAndCheckboxList.js";
import { FgElement, FG_ElementTypeEnum } from "../fgElement.js";


class FgRadiobuttonlist extends FgRadioAndCheckboxList {

    constructor(options, isInline, helpMessageText, id, label, cssClass, isRequired, fillBinding, mapBinding, fillKey, fillText, events, parameter, readOnly, expressionVisibilityCode, validationGroup, fillListBinding) {
        super(FG_ElementTypeEnum.RADIOBUTTONLIST, options, isInline, helpMessageText, id, label, cssClass, null, fillBinding, mapBinding, fillKey, fillText, events, parameter, expressionVisibilityCode, fillListBinding);
        this.isRequired = isRequired;
        this.readOnly = readOnly;
        this.validationGroup = validationGroup;
    }

    static createFgRadiobuttonlist(options, isInline, helpMessageText, id, label, cssClass, isRequired, fillBinding, mapBinding, fillKey, fillText, events, parameter, readOnly, expressionVisibilityCode, validationGroup, fillListBinding) {
        return new FgRadiobuttonlist(options, isInline, helpMessageText, id, label, cssClass, isRequired, fillBinding, mapBinding, fillKey, fillText, events, parameter, readOnly, expressionVisibilityCode, validationGroup, fillListBinding);
    }

    static getType() {
        return FG_ElementTypeEnum.RADIOBUTTONLIST;
    }

}

export default FgRadiobuttonlist