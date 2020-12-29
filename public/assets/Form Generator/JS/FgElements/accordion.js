'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgAccordion extends FgElement {

    constructor(id, cards, cssClass, expressionVisibilityCode) {
        super(id, FG_ElementTypeEnum.ACCORDION, cssClass, null, expressionVisibilityCode);
        this.cards = cards;
    }

    static createAccordion(id, cards, cssClass, expressionVisibilityCode) {
        return new FgAccordion(id, cards, cssClass, expressionVisibilityCode);
    }

    static getType() {
        return FG_ElementTypeEnum.ACCORDION;
    }

}

export default FgAccordion





