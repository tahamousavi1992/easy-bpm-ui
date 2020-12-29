
'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgColumn extends FgElement {

    constructor(id, children, cssClass, expressionVisibilityCode) {
        super(id, FgColumn.getType(), cssClass, null, expressionVisibilityCode);
        this.children = children;
    }

    static createColumn(id, children, cssClass, expressionVisibilityCode) {
        return new FgColumn(id, children, cssClass, expressionVisibilityCode);
    }

    static getType() {
        return FG_ElementTypeEnum.COLUMN;
    }

}

export default FgColumn