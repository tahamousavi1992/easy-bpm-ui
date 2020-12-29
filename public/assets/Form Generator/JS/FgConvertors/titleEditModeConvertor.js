
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgTitleEditMode from "../FgElementsEditMode/titleEditMode.js"
import FgTitle from "../FgElements/title.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"

class FgTitleEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    toJQueryObject(fgTitleElementEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgTitleElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // Title
        let fgTitle = fgTitleElementEditMode.fgElement;

        let titleJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgTitleElementEditMode)
            .attr("data-fill", fgTitle.fillBinding)
            .attr("data-parameter", fgTitle.parameter)
            .text(fgTitle.label);

        FgCommon.setVisibilityCodeObjectToElement(titleJQueryObject, fgTitle.expressionVisibilityCode);
        elementContainerJqObj.append(titleJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(titleElementContainer) {

        // Get fgElement
        let titleElement = FgUtilityConvertor.getFgElChild(titleElementContainer);

        if (FgUtilityConvertor.getFgElType(titleElement) !== FgTitle.getType())
            console.error("The type of this element isn't TITLE for converting.");

        let fgTitle = FgTitle.createTitle(titleElement.attr("id"),
            titleElement.text(),
            titleElement.attr("class"),
            titleElement.prop("tagName"),
            titleElement.attr("data-fill"),
            FgCommon.getVisibilityCodeObjectFromElement(titleElement),
            titleElement.attr("data-parameter"));

        let titleEditMode = FgTitleEditMode.createTitle(fgTitle,
            titleElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(titleElementContainer)
        );

        return titleEditMode;
    }

    // Fill setting pop up by Title attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab) {
        // Class name
        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // label of element        
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element))  // SubType name
            .append(FgCommon.createSubTypeNameDiv_EditPopUp(element)) // SubType name;
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code

        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        //bindingTab initialize
        bindingTab
            .append(FgCommon.createBindingFillTreeDiv_EditPopUp(element)); // Fill of element   
        bindingTab.append(FgCommon.createBindingVariableParamsDiv_EditPopUp(element));//BindingVariable
        initCombooTree();
        var colsList = bindingTab.find('.col-sm-6,.col-sm-12');
        FgCommon.arrangeColsInFormGroupByColNumber(bindingTab, colsList, 1);
    }
     
    // Update textbox atrributes and other properties like label and font icon
    updateElement_EditPopUp(element, type) {

        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);

        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // Update Html type of element
        FgCommon.updateHtmlTitleElementTagName_EditPopUp(element);

        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);
    }


}

export default FgTitleEditModeConvertor