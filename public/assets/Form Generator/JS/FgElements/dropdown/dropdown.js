
'use strict';
import { FgElement, FG_ElementTypeEnum } from "../fgElement.js";

class FgDropdown extends FgElement {

    constructor(options, id, label, helpMessageText, isRequired, fontIconCssClass, cssClass, fillBinding, mapBinding, fillKey, fillText, events, parameter, optionalCaption, readOnly, expressionVisibilityCode, validationGroup, fillListBinding) {
        super(id, FgDropdown.getType(), cssClass, label, expressionVisibilityCode);
        this.helpMessageText = helpMessageText;
        this.isRequired = isRequired;
        this.fontIconCssClass = fontIconCssClass;
        this.options = options;
        this.mapBinding = mapBinding;
        this.fillBinding = fillBinding;
        this.fillListBinding = fillListBinding;
        this.fillKey = fillKey;
        this.fillText = fillText;
        this.events = events;
        this.parameter = parameter;
        this.optionalCaption = optionalCaption;
        this.readOnly = readOnly;
        this.validationGroup = validationGroup;
    }

    static createDropdown(options, id, label, helpMessageText, isRequired, fontIconCssClass, cssClass, fillBinding, mapBinding, fillKey, fillText, events, parameter, optionalCaption, readOnly, expressionVisibilityCode, validationGroup, fillListBinding) {
        return new FgDropdown(options, id, label, helpMessageText, isRequired, fontIconCssClass, cssClass, fillBinding, mapBinding, fillKey, fillText, events, parameter, optionalCaption, readOnly, expressionVisibilityCode, validationGroup, fillListBinding);
    }

    static getType() {
        return FG_ElementTypeEnum.DROPDOWNLIST;
    }

}

export default FgDropdown