'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgElementEditModeFactory from "../FgElementsEditMode/elementEditModeFactory.js"
import { fgCssClassName } from "../FgElementsEditMode/fgElementEditModes.js"
import FgElementEditModeConvertorFactory from "./elementEditModeConvertorFactory.js"

import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgColumn from "../FgElements/column.js"
import FgColumnEditMode from "../FgElementsEditMode/columnEditMode.js"
import { callSortableForColOfRow } from "../FG_elements.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"

class FgColumnEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    fromFgElementJson(fgElementJson) {

        // Parse json into fgElement
        let fgElement = JSON.parse(fgElementJson);

        // Get new instance by fgElement
        let fgElementEditMode = FgElementEditModeFactory.toCreateByType(fgElement.type)(fgElement, fgElement.cssClass);
        //return new FgElementEditModeFactory().toCreate(fgElement);
        return fgElementEditMode;
    }

    toJQueryObject(fgColumnElementEditMode) {
        let fgColumnContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgColumnElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(fgColumnContainerJqObj);
        fgColumnContainerJqObj.addClass(fgColumnElementEditMode.fgElement.cssClass);

        let columnJQueryObject = FgUtilityConvertor.createDefaultFgColumnEditModeJqueryObj(fgColumnElementEditMode)
            .addClass("fg-column column clearfix");
        FgCommon.setVisibilityCodeObjectToElement(columnJQueryObject, fgColumnElementEditMode.fgElement.expressionVisibilityCode);
        elPlaceholderJqObj.append(columnJQueryObject);

        for (var element of fgColumnElementEditMode.fgElement.children) {

            let fgElementEditMode = FgElementEditModeFactory.toCreateByType(element.type)(element);

            let fgElementContainerJqObj = FgElementEditModeConvertorFactory.toCreateByType(element.type).toJQueryObject(fgElementEditMode);
            columnJQueryObject.append(fgElementContainerJqObj);
        }

        // sortable children in col
        columnJQueryObject.sortable();

        callSortableForColOfRow(columnJQueryObject);

        return fgColumnContainerJqObj;
    }

    fromJQueryObject(columnElementContainer) {

        var children = [];

        let columnElement = FgUtilityConvertor.getFgElChildByType(columnElementContainer, FgColumn.getType());
        $.each(FgUtilityConvertor.getFgElChildren(columnElement), function () {
            let fgElementType = FgUtilityConvertor.getFgElType($(this));
            let fgElementContainer = FgUtilityConvertor.getFgContainerElementJqueryObj($(this));
            let fgElementEditModeConvertor = FgElementEditModeConvertorFactory.toCreateByType(fgElementType);
            let fgElementEditMode = fgElementEditModeConvertor.fromJQueryObject(fgElementContainer);
            let fgElement = fgElementEditMode.fgElement;
            children.push(fgElement);
        });

        // Notic: containerCss for column and column container are same due to show in design mode properly.
        var containerCss = columnElementContainer.attr('class').replace(fgCssClassName.container, '').replace('ui-sortable-handle', '');

        var fgColumn = FgColumn.createColumn(
            columnElement.attr('id'),
            children,
            containerCss, // this is similar to column container
            FgCommon.getVisibilityCodeObjectFromElement(columnElement)
        );
        
        var fgColumnEditMode = FgColumnEditMode.createColumn(fgColumn, containerCss);

        return fgColumnEditMode;
    }

    generateElementEditPopUp(type, element, modalBody, baseSettingTab) {
        // Class name
        baseSettingTab.append(FgCommon.createClassNameDiv_EditPopUp(element.parent().parent(), "fg-el-container ui-sortable-handle"));
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));
        baseSettingTab.append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);
    }

    updateElement_EditPopUp(element, type) {
        var attributes = new elementAttributes();
        attributes.cssClass = $('#' + idElementEditForm.class).val() + " fg-el-container ui-sortable-handle";
        FgCommon.addAllAttribuets(element.parent().parent(), attributes);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);
    }

}

export default FgColumnEditModeConvertor