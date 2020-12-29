
'use strict';
import { FgElement, FG_ElementTypeEnum } from "../fgElement.js";

class FgDatepicker extends FgElement {

    constructor(id, label, helpMessageText, placeholderText, isRequired, cssClass, showtype, dateformat, fillBinding, mapBinding, events, readOnly, expressionVisibilityCode, validationGroup, parameter) {
        super(id, FgDatepicker.getType(), cssClass, label, expressionVisibilityCode);
        this.helpMessageText = helpMessageText;
        this.placeholderText = placeholderText;
        this.isRequired = isRequired;
        this.fillBinding = fillBinding;
        this.mapBinding = mapBinding;
        this.events = events;
        this.readOnly = readOnly;
        this.validationGroup = validationGroup;
        this.parameter = parameter;
        this.showtype = showtype;
        this.dateformat = dateformat;
    }

    static createDatepicker(id, label, helpMessageText, placeholderText, isRequired, cssClass, showtype, dateformat, fillBinding, mapBinding, events, readOnly, expressionVisibilityCode, validationGroup, parameter) {
        return new FgDatepicker(id, label, helpMessageText, placeholderText, isRequired, cssClass, showtype, dateformat, fillBinding, mapBinding, events, readOnly, expressionVisibilityCode, validationGroup, parameter);
    }

    static getType() {
        return FG_ElementTypeEnum.DATEPICKER;
    }

}

export default FgDatepicker