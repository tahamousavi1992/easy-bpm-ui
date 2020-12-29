
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";
import FgRowEditMode from "../FgElementsEditMode/rowEditMode.js"
import FgRowEditModeConvertor from "./rowEditModeConvertor.js"

import FgCard from "../FgElements/card.js"
import FgCardEditMode from "../FgElementsEditMode/cardEditMode.js"

import FgUtilityConvertor from "./fgUtilityConvertor.js"
import { FgElement, FG_ElementTypeEnum } from "../FgElements/fgElement.js";
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";

class FgCardEditModeConvertor extends ElementEditModeConvertor {
    constructor() {
        super();
    }
    //convert from json element to jquery object 
    toJQueryObject(fgCardElementEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgCardElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // fgCard
        let fgCard = fgCardElementEditMode.fgElement;

        let cardJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgCardElementEditMode)
            .addClass("row-fluid clearfix form-row")
            .attr("data-expressionVisibilityCode", fgCard.expressionVisibilityCode)
            .attr("data-label", fgCard.label);
        FgCommon.setVisibilityCodeObjectToElement(cardJQueryObject, fgCard.expressionVisibilityCode);
        //rows
        for (var row of fgCard.rows) {
            let rowJqueryObj = new FgRowEditModeConvertor().toJQueryObject(FgRowEditMode.createRow(row));
            cardJQueryObject.append(rowJqueryObj);
        }

        elPlaceholderJqObj.append(cardJQueryObject);

        elementContainerJqObj.addClass('cardElementContent');

        // sortable cols in card
        cardJQueryObject.sortable({
            connectWith: "#content,[fg_element_type =\"CARD\"]",
        });

        return elementContainerJqObj;
    }

    fromJQueryObject(cardElementContainer) {

        var rows = [];

        let cardElement = FgUtilityConvertor.getFgElChildByType(cardElementContainer, FG_ElementTypeEnum.CARD);

        $.each(FgUtilityConvertor.getFgElChildrenByType(cardElement, FG_ElementTypeEnum.ROW), function () {
            let fgRowContainer = FgUtilityConvertor.getFgContainerElementJqueryObj($(this));
            let fgRowEditMode = new FgRowEditModeConvertor().fromJQueryObject(fgRowContainer);
            let fgRow = fgRowEditMode.fgElement;
            rows.push(fgRow);
        });

        var fgCard = FgCard.createCard(
            cardElement.attr('id'),
            cardElement.attr('data-label'),
            rows,
            cardElement.attr('class').replace('row-fluid', '').replace('clearfix', '').replace('ui-sortable', '').replace('form-row',''),
            FgCommon.getVisibilityCodeObjectFromElement(cardElement)
        );

        var fgCardEditMode = FgCardEditMode.createCard(fgCard);

        return fgCardEditMode;

    }

    generateElementEditPopUp(type, element, modalBody, baseSettingTab) {
        // Class name
        baseSettingTab.append(FgCommon.createClassNameDiv_EditPopUp(element, "row-fluid clearfix ui-sortable form-row"));
        baseSettingTab.append(FgCardEditModeConvertor.createElementLabelDiv_EditPopUp(element))  // label of element
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));
        baseSettingTab.append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);
    }

    updateElement_EditPopUp(element, type) {
        var attributes = new elementAttributes();
        attributes.cssClass = $('#' + idElementEditForm.class).val() + " row-fluid clearfix ui-sortable form-row";
        FgCommon.addAllAttribuets(element, attributes);
        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);
        element.attr("data-label", document.getElementById(idElementEditForm.label).value);

    }

    static createElementLabelDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.label, element.attr("data-label"));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.txtLabel, "fa fa-css3");
        return formGroup;
    }
}

export default FgCardEditModeConvertor