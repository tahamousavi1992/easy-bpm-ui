
'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgImage extends FgElement {

    constructor(id, label, width, height, cssClass, address, fillBinding, events, expressionVisibilityCode, parameter) {
        super(id, FgImage.getType(), cssClass, label, expressionVisibilityCode);
        this.width = width;
        this.height = height;
        this.address = address;
        this.fillBinding = fillBinding;
        this.events = events;
        this.parameter = parameter;
    }

    static createImage(id, label, width, height, cssClass, address, fillBinding, events, expressionVisibilityCode, parameter) {
        return new FgImage(id, label, width, height, cssClass, address, fillBinding, events, expressionVisibilityCode, parameter);
    }

    static getType() {
        return FG_ElementTypeEnum.IMAGE;
    }

}

export default FgImage