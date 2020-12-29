'use strict';
import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";
import FgElementEditModeFactory from "../FgElementsEditMode/elementEditModeFactory.js"
import FgRow from "../FgElements/row.js"
import FgRowEditMode from "../FgElementsEditMode/rowEditMode.js"
import FgRowEditModeConvertor from "./rowEditModeConvertor.js"
import FgAccordionEditMode from "../FgElementsEditMode/accordionEditMode.js"
import FgAccordionEditModeConvertor from "./accordionEditModeConvertor.js"

import FgContent from "../FgElements/content.js"
import FgContentEditMode from "../FgElementsEditMode/contentEditMode.js"
import FgElementEditModeConvertorFactory from "./elementEditModeConvertorFactory.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import { FgElement, FG_ElementTypeEnum } from "../FgElements/fgElement.js";

class FgContentEditModeConvertor extends ElementEditModeConvertor {
    constructor() {
        super();
    }

    toJQueryObject(fgContentElementEditMode) {

        let fgContent = fgContentElementEditMode.fgElement;

        let contentJQueryObject = $('#content');
        document.getElementById('content').innerHTML = '';
        // rows
        for (var row of fgContent.rows) {
            if (row.type == "ROW") {
                let rowJqueryObj = new FgRowEditModeConvertor().toJQueryObject(FgRowEditMode.createRow(row));
                contentJQueryObject.append(rowJqueryObj);
            }
            else {
                if (row.type == "ACCORDION") {
                    let accordionJqueryObj = new FgAccordionEditModeConvertor().toJQueryObject(FgAccordionEditMode.createAccordion(row));
                    contentJQueryObject.append(accordionJqueryObj);
                }
            }
        }

        // sortable rows in content
        contentJQueryObject.sortable();

        return contentJQueryObject;
    }

    fromJQueryObject(contentElementContainer) {
        var children = [];
        let contentElement = FgUtilityConvertor.getFgElChildByType(contentElementContainer, FG_ElementTypeEnum.CONTENT);
        let childrenElement = FgUtilityConvertor.getFgElChildByType(contentElementContainer, FgContent.getType());
        $.each(FgUtilityConvertor.getFgElChildren(contentElement), function () {
            let fgElementType = FgUtilityConvertor.getFgElType($(this));
            if (fgElementType == "ROW" || fgElementType == "ACCORDION") {
                //if it was accordion's children don't put it into children.
                if (fgElementType != "ROW" || this.closest("[fg_element_type=\"ACCORDION\"]") == null) {
                    let fgElementContainer = FgUtilityConvertor.getFgContainerElementJqueryObj($(this));
                    let fgElementEditModeConvertor = FgElementEditModeConvertorFactory.toCreateByType(fgElementType);
                    let fgElementEditMode = fgElementEditModeConvertor.fromJQueryObject(fgElementContainer);
                    let fgElement = fgElementEditMode.fgElement;
                    children.push(fgElement);
                }
            }
        });

        var fgContent = FgContent.createContent(
            contentElement.attr('id'),
            children
        );

        var fgContentEditMode = FgContentEditMode.createContent(fgContent);

        return fgContentEditMode;
    }
}

export default FgContentEditModeConvertor