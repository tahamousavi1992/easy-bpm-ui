
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgComboSearchEditMode from "../FgElementsEditMode/comboSearchEditMode.js"
import FgComboSearch from "../FgElements/comboSearch.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgComboSearchEditModeConvertor extends ElementEditModeConvertor {

    toJQueryObject(fgComboSearchElementEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgComboSearchElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // ComboSearch
        let fgComboSearch = fgComboSearchElementEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgComboSearch);

        let comboSearchJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgComboSearchElementEditMode)
            .attr("data-fill", fgComboSearch.fillBinding)
            .attr("data-map", fgComboSearch.mapBinding)
            .attr("data-text", fgComboSearch.fillText)
            .attr("data-key", fgComboSearch.fillKey)
            .attr("data-parameter", fgComboSearch.parameter)
            .attr("data-val-group", fgComboSearch.validationGroup)
            .attr("data-fillList", fgComboSearch.fillListBinding);

        FgCommon.setVisibilityCodeObjectToElement(comboSearchJQueryObject, fgComboSearch.expressionVisibilityCode);
        FgCommon.addEventsToElements(comboSearchJQueryObject, fgComboSearch.events);

        // isRequired
        FgUtilityConvertor.addRequiredFieldToJqObj(fgComboSearch, comboSearchJQueryObject);

        // HelpMessageText
        FgUtilityConvertor.addHelpMessageText(fgComboSearch, elPlaceholderJqObj);

        // Add fontIconCssClass
        FgUtilityConvertor.addFontIconCssClass(fgComboSearch, comboSearchJQueryObject, elPlaceholderJqObj);

        return elementContainerJqObj;
    }

    fromJQueryObject(comboSearchElementContainer) {

        // Get fgElement
        let comboSearchElement = FgUtilityConvertor.getFgElChild(comboSearchElementContainer);

        if (FgUtilityConvertor.getFgElType(comboSearchElement) !== FgComboSearch.getType())
            console.error("The type of this element isn't ComboSearch for converting to fgComboSearch.");

        let fgComboSearch = FgComboSearch.createComboSearch(comboSearchElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(comboSearchElementContainer),
            FgUtilityConvertor.getHelpMessageText(comboSearchElementContainer),
            FgUtilityConvertor.hasRequiredClass(comboSearchElement),
            FgUtilityConvertor.getFontIconCssClass(comboSearchElementContainer),
            comboSearchElement.attr("class"),
            comboSearchElement.attr("data-fill"),
            comboSearchElement.attr("data-map"),
            comboSearchElement.attr("data-key"),
            comboSearchElement.attr("data-text"),
            FgCommon.getEventsFromElement(comboSearchElement),
            comboSearchElement.attr("data-parameter"),
            FgCommon.getVisibilityCodeObjectFromElement(comboSearchElement),
            comboSearchElement.attr("data-val-group"),
            comboSearchElement.attr("data-fillList"));

        let comboSearchEditMode = FgComboSearchEditMode.createComboSearch(fgComboSearch,
            FgUtilityConvertor.getFgElContainerCssClassName(comboSearchElementContainer),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(comboSearchElementContainer)
        );

        return comboSearchEditMode;
    }

    //Fill setting pop up by ComboSearch attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab) {

        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // Class name // label of element
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element)) // Help text 
            .append(FgCommon.createHelpTextDiv_EditPopUp(element)) // Required field
            .append(FgCommon.createRequiredFieldDiv_EditPopUp(element)) // Allow Multiple Selections 
            .append(FgCommon.createHasIconFontFieldDiv_EditPopUp(element))
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element)) //expression Visibility Code
            .append(FgCommon.createElementValidationGroupDiv_EditPopUp(element));  //Create validation group name Txt
        
        //Create ID Txt
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        // Custom font icon
        FgCommon.createCustomIconFontDiv_EditPopUp(element);
        customIconFontSettingTab.prepend(FgCommon.createIconFontNameDiv_EditPopUp(element, iconFontSettingTypeEnum.customIconFonts));

        //bindingTab initialize

        bindingTab.append(FgCommon.createBindingFillComboDiv_EditPopUp(element)); // Fill of element   
        bindingTab.append(FgCommon.createBindingFillKeyDiv_EditPopUp(element)); // Fill of element   
        bindingTab.append(FgCommon.createBindingFillTextDiv_EditPopUp(element)); // Fill of element   
        bindingTab.append(FgCommon.createBindingFillTreeDiv_EditPopUp(element));  // Fill of element 
        bindingTab.append(FgCommon.createBindingMapTreeDiv_EditPopUp(element));  // Map of element  
        bindingTab.append(FgCommon.createBindingVariableParamsDiv_EditPopUp(element));  //BindingVariable  

        var colsList = bindingTab.find('.col-sm-6,.col-sm-3,.col-sm-12');
        FgCommon.arrangeColsInFormGroupByColNumber(bindingTab, colsList, 3);

        //set ScriptTab
        scriptTab
            .append(FgCommon.createEventDiv_EditPopUp(element, eventType.change, lang.FG.eventTypeChange));
        var colsList = scriptTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(scriptTab, colsList, 1);

        initCombooTree();
    }

    //Update ComboSearch atrributes and other properties like label and font icon
    updateElement_EditPopUp(element, type) {

        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);

        // Update Max length attribute of element
        FgCommon.updateMaxlengthAttribute_EditPopUp(element);

        // Update help text of element
        FgCommon.updateHelpTextElement_EditPopUp(element);

        // Update required filed of element
        FgCommon.updateRequiredFiled_EditPopUp(element);

        // Update Icon Font of element
        FgCommon.updateIconFontElement_EditPopUp(element);

        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // Update event function attribute of element
        FgCommon.updateEventAttribute_EditPopUp(element);

        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        //Update validation group attribute of element
        FgCommon.updateValidationGroupAttribute_EditPopUp(element);
    }
}

export default FgComboSearchEditModeConvertor