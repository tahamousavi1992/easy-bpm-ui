'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgCard extends FgElement {

    constructor(id, label, rows, cssClass, expressionVisibilityCode) {
        super(id, FG_ElementTypeEnum.CARD, cssClass, label, expressionVisibilityCode);
        this.rows = rows;
    }

    static createCard(id, label, rows, cssClass, expressionVisibilityCode) {
        return new FgCard(id, label, rows, cssClass, expressionVisibilityCode);
    }

    static getType() {
        return FG_ElementTypeEnum.Card;
    }

}

export default FgCard





