
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgRow from "../FgElements/row.js"
import FgRowEditMode from "../FgElementsEditMode/rowEditMode.js"

import FgColumnEditMode from "../FgElementsEditMode/columnEditMode.js"
import FgColumnEditModeConvertor from "./columnEditModeConvertor.js"


import FgUtilityConvertor from "./fgUtilityConvertor.js"
import { FgElement, FG_ElementTypeEnum } from "../FgElements/fgElement.js";
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgRowEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }
    //convert from json element to jquery object 
    toJQueryObject(fgRowElementEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgRowElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // fgRow
        let fgRow = fgRowElementEditMode.fgElement;

        let rowJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgRowElementEditMode)
            .attr("data-isFooter", fgRow.isFooter == true)
            .addClass("row-fluid clearfix form-row");

        FgCommon.setVisibilityCodeObjectToElement(rowJQueryObject, fgRow.expressionVisibilityCode);
        // columns
        for (var col of fgRow.columns) {
            rowJQueryObject.append(new FgColumnEditModeConvertor().toJQueryObject(FgColumnEditMode.createColumn(col, col.cssClass)));
        }

        elPlaceholderJqObj.append(rowJQueryObject);

        elementContainerJqObj.addClass('rowElementContent');

        // sortable cols in row
        rowJQueryObject.sortable();

        return elementContainerJqObj;
    }

    fromJQueryObject(rowElementContainer) {
        var columns = [];

        let rowElement = FgUtilityConvertor.getFgElChildByType(rowElementContainer, FG_ElementTypeEnum.ROW);

        $.each(FgUtilityConvertor.getFgElChildrenByType(rowElement, FG_ElementTypeEnum.COLUMN), function () {
            let fgColumnContainer = FgUtilityConvertor.getFgContainerElementJqueryObj($(this));
            let fgColumnEditMode = new FgColumnEditModeConvertor().fromJQueryObject(fgColumnContainer);
            let fgColumn = fgColumnEditMode.fgElement;
            columns.push(fgColumn);
        });
        var fgRow = FgRow.createRow(
            rowElement.attr('id'),
            columns,
            rowElement.attr('class').replace('row-fluid', '').replace('clearfix', '').replace('ui-sortable', '').replace('form-row', ''),
            FgCommon.getVisibilityCodeObjectFromElement(rowElement),
            rowElement.attr('data-isFooter') == "true"
        );
        var fgRowEditMode = FgRowEditMode.createRow(fgRow);
        return fgRowEditMode;
    }

    generateElementEditPopUp(type, element, modalBody, baseSettingTab) {
        // Class name
        baseSettingTab.append(FgCommon.createClassNameDiv_EditPopUp(element, "row-fluid clearfix ui-sortable form-row"));
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));
        baseSettingTab.append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code
        baseSettingTab.append(FgRowEditModeConvertor.createIsFooterFieldDiv_EditPopUp(element));//Is this a footer?
        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);
    }

    updateElement_EditPopUp(element, type) {
        var attributes = new elementAttributes();
        attributes.cssClass = $('#' + idElementEditForm.class).val() + " row-fluid clearfix ui-sortable form-row";
        FgCommon.addAllAttribuets(element, attributes);
        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);
        FgRowEditModeConvertor.updatIsFooterFiled_EditPopUp(element);
    }

    static createIsFooterFieldDiv_EditPopUp(element) {
        let isFooter = element.attr('data-isFooter') == "true";
        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.isFooterName, checked: isFooter, id: idElementEditForm.chkIsFooterField });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);

        let col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    static updatIsFooterFiled_EditPopUp(element) {
        if (document.getElementById(idElementEditForm.chkIsFooterField).checked)
            element.get(0).setAttribute('data-isFooter', true);
        else
            element.get(0).setAttribute('data-isFooter', false);
    }

}

export default FgRowEditModeConvertor