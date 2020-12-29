

'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgContent extends FgElement {

    constructor(id, rows, cssClass, expressionVisibilityCode) {
        super(id, FgContent.getType(), cssClass, null, expressionVisibilityCode);
        this.rows = rows;
    }

    static createContent(id, rows, cssClass, expressionVisibilityCode) {
        return new FgContent(id, rows, cssClass, expressionVisibilityCode);
    }

    static getType() {
        return FG_ElementTypeEnum.CONTENT;
    }
}

export default FgContent





