'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgButton extends FgElement {

    constructor(id, text, subtype, cssClass, events, backendCoding, accessType, openFormParameter, openFormId, formWidth, formHeight, openFormCallBackScript,
        hasConfirm, confirmText, hasExpressionConfirm, expressionConfirmText, expressionConfirmCode, expressionConfirmHasFalseAction, expressionVisibilityCode, validationGroup) {
        super(id, FgButton.getType(), cssClass, text, expressionVisibilityCode);
        this.subtype = subtype;
        //c# code with base64 format.
        this.backendCoding = backendCoding;
        this.events = events;
        this.accessType = accessType;
        this.openFormParameter = openFormParameter;
        this.openFormId = openFormId;
        this.formWidth = formWidth;
        this.formHeight = formHeight;
        this.openFormCallBackScript = openFormCallBackScript;
        this.hasConfirm = hasConfirm;
        this.confirmText = confirmText;
        this.hasExpressionConfirm = hasExpressionConfirm;
        this.expressionConfirmText = expressionConfirmText;
         //c# code with base64 format.
        this.expressionConfirmCode = expressionConfirmCode;
        this.expressionConfirmHasFalseAction = expressionConfirmHasFalseAction;
        this.validationGroup = validationGroup;
    }

    static createButton(id, text, subtype, cssClass, events, backendCoding, accessType, openFormParameter, openFormId, formWidth, formHeight, openFormCallBackScript, hasConfirm, confirmText, hasExpressionConfirm, expressionConfirmText, expressionConfirmCode, expressionConfirmHasFalseAction, expressionVisibilityCode, validationGroup) {
        return new FgButton(id, text, subtype, cssClass, events, backendCoding, accessType, openFormParameter, openFormId, formWidth, formHeight, openFormCallBackScript, hasConfirm, confirmText, hasExpressionConfirm, expressionConfirmText, expressionConfirmCode, expressionConfirmHasFalseAction, expressionVisibilityCode, validationGroup);
    }

    static getType() {
        return FG_ElementTypeEnum.BUTTON;
    }

}

export default FgButton