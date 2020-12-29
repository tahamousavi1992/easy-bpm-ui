
'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgDownloadLink extends FgElement {

    constructor(id, label, cssClass, entityVariableId, documentDefId, documentFolderId, expressionVisibilityCode) {
        super(id, FgDownloadLink.getType(), cssClass, label, expressionVisibilityCode);
        this.entityVariableId = entityVariableId;
        this.documentFolderId = documentFolderId;
        this.documentDefId = documentDefId;
    }

    static createDownloadLink(id, label, cssClass, entityVariableId, documentDefId, documentFolderId, expressionVisibilityCode) {
        return new FgDownloadLink(id, label, cssClass, entityVariableId, documentDefId, documentFolderId, expressionVisibilityCode);
    }

    static getType() {
        return FG_ElementTypeEnum.DOWNLOADLINK;
    }

}

export default FgDownloadLink