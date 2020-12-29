
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";
import FgCardEditMode from "../FgElementsEditMode/cardEditMode.js"
import FgCardEditModeConvertor from "./cardEditModeConvertor.js"

import FgAccordion from "../FgElements/accordion.js"
import FgAccordionEditMode from "../FgElementsEditMode/accordionEditMode.js"
 
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import { FgElement, FG_ElementTypeEnum } from "../FgElements/fgElement.js";
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"

class FgAccordionEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    //convert from json element to jquery object 
    toJQueryObject(fgAccordionElementEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgAccordionElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // fgAccordion
        let fgAccordion = fgAccordionElementEditMode.fgElement;

        let accordionJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgAccordionElementEditMode)
            .addClass("row-fluid clearfix form-row");
        FgCommon.setVisibilityCodeObjectToElement(accordionJQueryObject, fgAccordion.expressionVisibilityCode);
        //cards
        for (var card of fgAccordion.cards) {
            let cardJqueryObj = new FgCardEditModeConvertor().toJQueryObject(FgCardEditMode.createCard(card));
            accordionJQueryObject.append(cardJqueryObj);
        }
         
        elPlaceholderJqObj.append(accordionJQueryObject);

        elementContainerJqObj.addClass('accordionElementContent');

        // sortable cols in accordion
        accordionJQueryObject.sortable();

        return elementContainerJqObj;
    }

    fromJQueryObject(accordionElementContainer) {
        var cards = [];
        let accordionElement = FgUtilityConvertor.getFgElChildByType(accordionElementContainer, FG_ElementTypeEnum.ACCORDION);

        $.each(FgUtilityConvertor.getFgElChildrenByType(accordionElement, FG_ElementTypeEnum.CARD), function () {
            let fgCardContainer = FgUtilityConvertor.getFgContainerElementJqueryObj($(this));
            let fgCardEditMode = new FgCardEditModeConvertor().fromJQueryObject(fgCardContainer);
            let fgCard = fgCardEditMode.fgElement;
            cards.push(fgCard);
        });

        var fgAccordion = FgAccordion.createAccordion(
            accordionElement.attr('id'),
            cards,
            accordionElement.attr('class').replace('row-fluid', '').replace('clearfix', '').replace('ui-sortable', '').replace('form-row', ''),
            FgCommon.getVisibilityCodeObjectFromElement(accordionElement),
        );

        var fgAccordionEditMode = FgAccordionEditMode.createAccordion(fgAccordion);

        return fgAccordionEditMode;

    }

    generateElementEditPopUp(type, element, modalBody, baseSettingTab) {
        // Class name
        baseSettingTab.append(FgCommon.createClassNameDiv_EditPopUp(element, "row-fluid clearfix ui-sortable form-row"));
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
    }
}

export default FgAccordionEditModeConvertor