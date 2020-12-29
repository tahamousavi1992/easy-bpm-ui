
'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgComboSearch extends FgElement {

    constructor(id, label, helpMessageText, isRequired, fontIconCssClass, cssClass, fillBinding, mapBinding, fillKey, fillText, events, parameter, expressionVisibilityCode, validationGroup, fillListBinding) {
        super(id, FgComboSearch.getType(), cssClass, label, expressionVisibilityCode);
        this.helpMessageText = helpMessageText;
        this.isRequired = isRequired;
        this.fontIconCssClass = fontIconCssClass;
        this.mapBinding = mapBinding;
        this.fillBinding = fillBinding;
        this.fillKey = fillKey;
        this.fillText = fillText;
        this.events = events;
        this.parameter = parameter;
        this.validationGroup = validationGroup;
        this.fillListBinding = fillListBinding;
    }

    static createComboSearch(id, label, helpMessageText, isRequired, fontIconCssClass, cssClass, fillBinding, mapBinding, fillKey, fillText, events, parameter, expressionVisibilityCode, validationGroup, fillListBinding) {
        return new FgComboSearch(id, label, helpMessageText, isRequired, fontIconCssClass, cssClass, fillBinding, mapBinding, fillKey, fillText, events, parameter, expressionVisibilityCode, validationGroup, fillListBinding);
    }

    static getType() {
        return FG_ElementTypeEnum.COMBOSEARCH;
    }

}

export default FgComboSearch