
'use strict';
import { inlineClassEnum } from "./radioAndCheckboxList.js";
import { FgElement, FG_ElementTypeEnum } from "../fgElement.js";


class FgCheckbox extends FgElement {

    constructor(options, isInline, helpMessageText, id, label, cssClass, fillBinding, mapBinding, isSwitch, events, readOnly, expressionVisibilityCode, parameter) {
        super(id, FG_ElementTypeEnum.CHECKBOX, cssClass, label, expressionVisibilityCode);
        this.options = options;
        this.isInline = isInline;
        this.helpMessageText = helpMessageText;
        this.mapBinding = mapBinding;
        this.fillBinding = fillBinding;
        this.isSwitch = isSwitch;
        this.events = events;
        this.readOnly = readOnly;
        this.parameter = parameter;
    }

    static createFgCheckbox(options, isInline, helpMessageText, id, label, cssClass, fillBinding, mapBinding, isSwitch, events, readOnly, expressionVisibilityCode, parameter) {
        return new FgCheckbox(options, isInline, helpMessageText, id, label, cssClass, fillBinding, mapBinding, isSwitch, events, readOnly, expressionVisibilityCode, parameter);
    }

    static getType() {
        return FG_ElementTypeEnum.CHECKBOX;
    }

}

export default FgCheckbox