
'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgFileuploader extends FgElement {

    constructor(id, label, helpMessageText, placeholderText, isRequired, fontIconCssClass, cssClass, entityVariableId, documentDefId, documentFolderId, multiple, events, deleteClass, downloadClass, deleteCaption, downloadCaption, expressionVisibilityCode, validationGroup) {
        super(id, FgFileuploader.getType(), cssClass, label, expressionVisibilityCode);
        this.helpMessageText = helpMessageText;
        this.placeholderText = placeholderText;
        this.isRequired = isRequired;
        this.fontIconCssClass = fontIconCssClass;
        this.documentDefId = documentDefId;
        this.entityVariableId = entityVariableId;
        this.multiple = multiple;
        this.events = events;
        this.deleteClass = deleteClass;
        this.downloadClass = downloadClass;
        this.deleteCaption = deleteCaption;
        this.downloadCaption = downloadCaption;
        this.validationGroup = validationGroup;
        this.documentFolderId = documentFolderId;
    }

    static createFileuploader(id, label, helpMessageText, placeholderText, isRequired, fontIconCssClass, cssClass, entityVariableId, documentDefId,documentFolderId, multiple, events, deleteClass, downloadClass, deleteCaption, downloadCaption, expressionVisibilityCode, validationGroup) {
        return new FgFileuploader(id, label, helpMessageText, placeholderText, isRequired, fontIconCssClass, cssClass, entityVariableId, documentDefId, documentFolderId, multiple, events, deleteClass, downloadClass, deleteCaption, downloadCaption, expressionVisibilityCode, validationGroup);
    }

    static getType() {
        return FG_ElementTypeEnum.FILEUPLOAD;
    }

}

export default FgFileuploader