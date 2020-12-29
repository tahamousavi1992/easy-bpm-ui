
'use strict';
import { FgElement, FG_ElementTypeEnum } from "../fgElement.js";

class FgRadioAndCheckboxList extends FgElement {

    constructor(type, options, isInline, helpMessageText, id, label, cssClass, variable, fillBinding, mapBinding, fillKey, fillText, events, parameter, expressionVisibilityCode, fillListBinding) {
        super(id, type, cssClass, label, expressionVisibilityCode);
        this.options = options;
        this.isInline = isInline;
        this.helpMessageText = helpMessageText;
        this.mapBinding = mapBinding;
        this.fillBinding = fillBinding;
        this.fillListBinding = fillListBinding;
        this.fillKey = fillKey;
        this.fillText = fillText;
        this.events = events;
        this.parameter = parameter;
    }
}

const inlineClassEnum = {
    list: "list",
    inline: "inline"
}

export { FgRadioAndCheckboxList, inlineClassEnum }



