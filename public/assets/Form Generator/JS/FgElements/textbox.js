
'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgTextbox extends FgElement {

    constructor(id, label, subtype, helpMessageText, placeholderText, maxLength, isRequired, fontIconCssClass, cssClass, fillBinding, mapBinding, readOnly, pattern, events, isMultiline, expressionVisibilityCode, validationGroup, parameter) {
        super(id, FgTextbox.getType(), cssClass, label, expressionVisibilityCode);
        this.subtype = subtype;
        this.helpMessageText = helpMessageText;
        this.placeholderText = placeholderText;
        this.maxLength = maxLength;
        this.isRequired = isRequired;
        this.fontIconCssClass = fontIconCssClass;
        this.fillBinding = fillBinding;
        this.mapBinding = mapBinding;
        this.readOnly = readOnly;
        this.pattern = pattern;
        this.events = events;
        this.isMultiline = isMultiline;
        this.validationGroup = validationGroup;
        this.parameter = parameter;
    }

    static createTextbox(id, label, subtype, helpMessageText, placeholderText, maxLength, isRequired, fontIconCssClass, cssClass, fillBinding, mapBinding, readOnly, pattern, events, isMultiline, expressionVisibilityCode, validationGroup, parameter) {
        return new FgTextbox(id, label, subtype, helpMessageText, placeholderText, maxLength, isRequired, fontIconCssClass, cssClass, fillBinding, mapBinding, readOnly, pattern, events, isMultiline, expressionVisibilityCode, validationGroup, parameter);
    }

    static getType() {
        return FG_ElementTypeEnum.TEXTBOX;
    }

}

export default FgTextbox