
'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgDropdown extends FgElement {

    constructor(options, id, label, helpMessageText, isRequired, fontIconCssClass, cssClass, variable, fillBinding, mapBinding, fillKey, fillText, events, hasOptional, optionalCaption, readOnly, expressionVisibilityCode, validationGroup) {
        super(id, FG_ElementTypeEnum.DROPDOWNLIST, cssClass, label, expressionVisibilityCode);
        this.helpMessageText = helpMessageText;
        this.isRequired = isRequired;
        this.fontIconCssClass = fontIconCssClass;
        this.options = options;
        this.mapBinding = mapBinding;
        this.fillBinding = fillBinding;
        this.fillKey = fillKey;
        this.fillText = fillText;
        this.events = events;
        this.hasOptional = hasOptional;
        this.optionalCaption = optionalCaption;
        this.readOnly = readOnly;
        this.validationGroup = validationGroup;
    }

    static createDropdown(options, id, label, helpMessageText, isRequired, fontIconCssClass, cssClass, fillBinding, mapBinding, fillKey, fillText, events, hasOptional, optionalCaption, readOnly, expressionVisibilityCode, validationGroup) {
        return new FgDropdown(options, id, label, helpMessageText, isRequired, fontIconCssClass, cssClass, fillBinding, mapBinding, fillKey, fillText, events, hasOptional, optionalCaption, readOnly, expressionVisibilityCode, validationGroup);
    }

}

export default FgDropdown