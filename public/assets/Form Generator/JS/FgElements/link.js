
'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgLink extends FgElement {

    constructor(id, label, cssClass, address, fillBinding, width, height, type, events, expressionVisibilityCode, parameter) {
        super(id, FgLink.getType(), cssClass, label, expressionVisibilityCode);
        this.address = address;
        this.fillBinding = fillBinding;
        this.width = width;
        this.height = height;
        this.linkType = type;
        this.events = events;
        this.parameter = parameter;
    }

    static createLink(id, label, cssClass, address, fillBinding, width, height, type, events, expressionVisibilityCode, parameter) {
        return new FgLink(id, label, cssClass, address, fillBinding, width, height, type, events, expressionVisibilityCode, parameter);
    }

    static getType() {
        return FG_ElementTypeEnum.LINK;
    }

}

export default FgLink