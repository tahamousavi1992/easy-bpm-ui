'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgRow extends FgElement {

    constructor(id, columns, cssClass, expressionVisibilityCode, isFooter) {
        super(id, FG_ElementTypeEnum.ROW, cssClass, null, expressionVisibilityCode);
        this.columns = columns;
        this.isFooter = isFooter;
    }

    static createRow(id, columns, cssClass, expressionVisibilityCode, isFooter) {
        return new FgRow(id, columns, cssClass, expressionVisibilityCode, isFooter);
    }

    static getType() {
        return FG_ElementTypeEnum.ROW;
    }

}

export default FgRow





