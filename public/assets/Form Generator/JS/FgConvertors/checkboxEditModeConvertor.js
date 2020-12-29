
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgCheckboxEditMode from "../FgElementsEditMode/checkboxEditMode.js"
import FgCheckbox from "../FgElements/radioAndCheckboxList/checkbox.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import OptionRadioAndCheckboxListConvertor from "./optionRadioAndCheckboxListConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgCheckboxEditModeConvertor extends ElementEditModeConvertor {

    toJQueryObject(fgCheckboxEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgCheckboxEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // checkbox
        let fgCheckbox = fgCheckboxEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgCheckbox);

        let checkboxJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgCheckboxEditMode)
            .attr("data-fill", fgCheckbox.fillBinding)
            .attr("data-map", fgCheckbox.mapBinding)
            .attr("data-parameter", fgCheckbox.parameter)
            .attr("disabled", fgCheckbox.readOnly);
        FgCommon.setVisibilityCodeObjectToElement(checkboxJQueryObject, fgCheckbox.expressionVisibilityCode);
        FgCommon.addEventsToElements(checkboxJQueryObject, fgCheckbox.events);
 
        //HelpMessageText
        FgUtilityConvertor.addHelpMessageText(fgCheckbox, elPlaceholderJqObj);

        // Radiobuttonlist options
        for (var option of fgCheckbox.options) {
            checkboxJQueryObject.append(new OptionRadioAndCheckboxListConvertor().toJQueryObject(option));
        }

        elPlaceholderJqObj.append(checkboxJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(checkboxElementContainer) {

        // Get fgElement
        let checkboxElement = FgUtilityConvertor.getFgElChild(checkboxElementContainer);

        if (FgUtilityConvertor.getFgElType(checkboxElement) !== FgCheckbox.getType())
            console.error("The type of this element isn't CHECKBOX for converting to FgCheckbox.");

 
        let jQueryOptionElements = checkboxElement.find('.checkbox');
 
        let checkboxOptionsList = [];

        $.each(jQueryOptionElements, function () {
            let option = new OptionRadioAndCheckboxListConvertor().fromJQueryObject($(this));
            checkboxOptionsList.push(option);
        });

        let fgCheckbox = FgCheckbox.createFgCheckbox(checkboxOptionsList,
            false,
            FgUtilityConvertor.getHelpMessageText(checkboxElementContainer),
            checkboxElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(checkboxElementContainer),
            checkboxElement.attr("class"),
            checkboxElement.attr("data-fill"),
            checkboxElement.attr("data-map"),
            false,
            FgCommon.getEventsFromElement(checkboxElement),
            checkboxElement.is('[disabled]'),
            FgCommon.getVisibilityCodeObjectFromElement(checkboxElement),
            checkboxElement.attr("data-parameter"));

        let checkboxEditMode = FgCheckboxEditMode.createCheckbox(fgCheckbox,
            FgUtilityConvertor.getFgElContainerCssClassName(checkboxElementContainer),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(checkboxElementContainer)
        );
        
        return checkboxEditMode;
    }

    // Fill setting pop up by Checkbox attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, scriptTab) {
        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // Class name 
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element)) // label of element
            .append(FgCommon.createHelpTextDiv_EditPopUp(element)) // Help text
            .append(FgCommon.createElementIdDiv_EditPopUp(element)) // ID    
            .append(FgCommon.createReadOnlyFieldDiv_EditPopUp(element))
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code

 
        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        //bindingTab initialize
        bindingTab.append(FgCommon.createBindingFillTreeDiv_EditPopUp(element));// Fill of element    
        bindingTab.append(FgCommon.createBindingMapTreeDiv_EditPopUp(element));// Map of element  
        bindingTab.append(FgCommon.createBindingVariableParamsDiv_EditPopUp(element));//BindingVariable
        var colsList = bindingTab.find('.col-sm-6,.col-sm-3,.col-sm-12');
        FgCommon.arrangeColsInFormGroupByColNumber(bindingTab, colsList, 3);

        //set ScriptTab
        scriptTab
            .append(FgCommon.createEventDiv_EditPopUp(element, eventType.change, lang.FG.eventTypeChange));
        var colsList = scriptTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(scriptTab, colsList, 1);

        initCombooTree();
    }
     
    // Update Checkbox atrributes and other properties like label and font icon
    updateElement_EditPopUp(element, type) {
         
        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);

        // Update help text of element
        FgCommon.updateHelpTextElement_EditPopUp(element);

        // Update ReadOnly filed of element
        FgCheckboxEditModeConvertor.updateReadOnlyFiled_EditPopUp(element);
 
        // Update binding attribute of newElement
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // Update event function attribute of element
        FgCommon.updateEventAttribute_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);
    }

    // Update readOnly filed in edit popup
    static updateReadOnlyFiled_EditPopUp(element) {
        var readOnlyFieldElement = FgCommon.jq_getElementById(idElementEditForm.chkReadOnlyField);
        if (readOnlyFieldElement.prop("checked"))
            element.attr('disabled', true);
        else
            element.attr('disabled', false);
    }

}

export default FgCheckboxEditModeConvertor