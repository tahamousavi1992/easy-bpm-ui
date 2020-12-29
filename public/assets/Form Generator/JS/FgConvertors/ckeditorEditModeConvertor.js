
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgCKEDITOREditMode from "../FgElementsEditMode/ckeditorEditMode.js"
import FgCKEDITOR from "../FgElements/ckeditor.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgCKEDITOREditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }
    //convert from json element to jquery object 
    toJQueryObject(fgCKEDITORElementEditMode) {
        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgCKEDITORElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // CKEDITOR
        let fgCKEDITOR = fgCKEDITORElementEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgCKEDITOR);

        let ckeditorJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgCKEDITORElementEditMode)
            .attr("data-fill", fgCKEDITOR.fillBinding)
            .attr("data-map", fgCKEDITOR.mapBinding)
            .attr("data-parameter", fgCKEDITOR.parameter)
            .attr("data-val-group", fgCKEDITOR.validationGroup);
        FgCommon.setVisibilityCodeObjectToElement(ckeditorJQueryObject, fgCKEDITOR.expressionVisibilityCode);
        FgCommon.addEventsToElements(ckeditorJQueryObject, fgCKEDITOR.events);
        // isRequired
        FgUtilityConvertor.addRequiredFieldToJqObj(fgCKEDITOR, ckeditorJQueryObject);

        // HelpMessageText
        FgUtilityConvertor.addHelpMessageText(fgCKEDITOR, elPlaceholderJqObj);

        elPlaceholderJqObj.append(ckeditorJQueryObject);

        return elementContainerJqObj;
    }

    //convert from jquery element to json object 
    fromJQueryObject(ckeditorElementContainer) {
        // Get fgElement
        let ckeditorElement = FgUtilityConvertor.getFgElChild(ckeditorElementContainer);

        if (FgUtilityConvertor.getFgElType(ckeditorElement) !== FgCKEDITOR.getType())
            console.error("The type of this element isn't CKEDITOR for converting to fgCKEDITOR.");

        let fgCKEDITOR = FgCKEDITOR.createCKEDITOR(ckeditorElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(ckeditorElementContainer),
            FgUtilityConvertor.getHelpMessageText(ckeditorElementContainer),
            FgUtilityConvertor.hasRequiredClass(ckeditorElement),
            ckeditorElement.attr("class"),
            ckeditorElement.attr("data-fill"),
            ckeditorElement.attr("data-map"),
            FgCommon.getEventsFromElement(ckeditorElement),
            FgCommon.getVisibilityCodeObjectFromElement(ckeditorElement),
            ckeditorElement.attr("data-val-group"),
            ckeditorElement.attr("data-parameter"));

        let ckeditorEditMode = FgCKEDITOREditMode.createCKEDITOR(fgCKEDITOR,
            ckeditorElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(ckeditorElementContainer)
        );

        return ckeditorEditMode;
    }

    // Fill setting pop up by CKEDITOR attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, scriptTab) {
        // Class name
        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // calss of element        
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element))  // label name
            .append(FgCommon.createHelpTextDiv_EditPopUp(element)) //  Help 
            .append(FgCommon.createRequiredFieldDiv_EditPopUp(element)) // Required
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element)) //expression Visibility Code
            .append(FgCommon.createElementValidationGroupDiv_EditPopUp(element));//Create validation group name Txt
        //Create ID Txt
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        //bindingTab initialize
        bindingTab
            .append(FgCommon.createBindingFillTreeDiv_EditPopUp(element)) // Fill of element   
            .append(FgCommon.createBindingMapTreeDiv_EditPopUp(element))  // Map of element  
        bindingTab.append(FgCommon.createBindingVariableParamsDiv_EditPopUp(element));//BindingVariable
        initCombooTree();
        var colsList = bindingTab.find('.col-sm-6,.col-sm-12');
        FgCommon.arrangeColsInFormGroupByColNumber(bindingTab, colsList, 1);

        //set ScriptTab
        scriptTab
            .append(FgCommon.createEventDiv_EditPopUp(element, eventType.change, lang.FG.eventTypeChange))
            .append(FgCommon.createEventDiv_EditPopUp(element, eventType.focus, lang.FG.eventTypeFocus))
            .append(FgCommon.createEventDiv_EditPopUp(element, eventType.blur, lang.FG.eventTypeBlur));
        var colsList = scriptTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(scriptTab, colsList, 1);

    }

    // Update textbox atrributes and other properties like label and font icon
    updateElement_EditPopUp(element, type) {

        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);

        // Update help text of element
        FgCommon.updateHelpTextElement_EditPopUp(element);

        // Update required filed of element
        FgCommon.updateRequiredFiled_EditPopUp(element);

        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // Update event function attribute of element
        FgCommon.updateEventAttribute_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        // Update validation group attribute of element
        FgCommon.updateValidationGroupAttribute_EditPopUp(element);
         
        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);
    }
}

export default FgCKEDITOREditModeConvertor