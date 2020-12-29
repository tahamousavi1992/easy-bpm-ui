
'use strict';

import ElementEditModeConvertor from "./elementEditModeConvertor.js";

import FgRow from "../FgElements/row.js"
import FgRowEditMode from "../FgElementsEditMode/rowEditMode.js"

import FgContent from "../FgElements/content.js"
import FgContentEditMode from "../FgElementsEditMode/contentEditMode.js"

import FgUtilityConvertor from "./fgUtilityConvertor.js"
import { FgElement, FG_ElementTypeEnum } from "../FgElements/fgElement.js";

class FgContentEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
        //this.fgColumnEditModeConvertor = new FgColumnEditModeConvertor();
    }

    toJQueryObject(fgContentElementEditMode) {
 
        let elementContainerJqObj = ContainerConvertor().toJQueryObject(fgContentElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // fgRow
        let fgContent = fgContentElementEditMode.fgElement;

        let contentJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgContentElementEditMode)
            .addClass("form-horizontal fg-content demo col-sm-12 ui-droppable ui-sortable");

        // rows
        for (var row of fgContent.rows) {
            rowJQueryObject.append(new FgRowEditModeConvertor().toJQueryObject(FgRowEditMode.createRow(row)));
        }

        elPlaceholderJqObj.append(contentJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(rowElementContainer) {

        var rows = [];

        let contentElement = FgUtilityConvertor.getFgElChildrenByType(rowElementContainer, FgRow.getType());
        $.each(FgUtilityConvertor.getFgElChildrenByType(contentElement, FG_ElementTypeEnum.ROW), function () {
            let fgRowContainer = FgUtilityConvertor.getFgContainerElementJqueryObj($(this));
            let fgRowEditMode = new FgRowEditModeConvertor().fromJQueryObject(fgRowContainer);
            let fgRow = fgRowEditMode.fgElement;
            rows.push(fgRow);
        });

        var fgContent = FgContent.createContent(
            rowElement.attr('id'),
            rows
        );

        var fgContentEditMode = FgContentEditMode.createContent(fgContent);

        return fgContentEditMode;
    }
}

export default FgContentEditModeConvertor