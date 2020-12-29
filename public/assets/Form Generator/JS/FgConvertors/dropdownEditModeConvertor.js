'use strict';
import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgDropdownEditMode from "../FgElementsEditMode/dropdownEditMode.js"
import FgDropdown from "../FgElements/dropdown/dropdown.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"

import OptionDropdownConvertor from "./optionDropdownConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgDropdownEditModeConvertor extends ElementEditModeConvertor {

    toJQueryObject(fgDropdownElementEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgDropdownElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // Dropdown
        let fgDropdown = fgDropdownElementEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgDropdown);

        let dropdownJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgDropdownElementEditMode)
            .attr("data-fill", fgDropdown.fillBinding)
            .attr("data-map", fgDropdown.mapBinding)
            .attr("data-text", fgDropdown.fillText)
            .attr("data-key", fgDropdown.fillKey)
            .attr("data-parameter", fgDropdown.parameter)
            .attr("data-optionalcaption", fgDropdown.optionalCaption)
            .attr("disabled", fgDropdown.readOnly)
            .attr("data-val-group", fgDropdown.validationGroup)
            .attr("data-expressionVisibilityCode", fgDropdown.expressionVisibilityCode)
            .attr("data-fillList", fgDropdown.fillListBinding);

        FgCommon.setVisibilityCodeObjectToElement(dropdownJQueryObject, fgDropdown.expressionVisibilityCode);
        FgCommon.addEventsToElements(dropdownJQueryObject, fgDropdown.events);

        // isRequired
        FgUtilityConvertor.addRequiredFieldToJqObj(fgDropdown, dropdownJQueryObject);

        // HelpMessageText
        FgUtilityConvertor.addHelpMessageText(fgDropdown, elPlaceholderJqObj);

        // Add fontIconCssClass
        FgUtilityConvertor.addFontIconCssClass(fgDropdown, dropdownJQueryObject, elPlaceholderJqObj);

        // dropdown options
        for (var option of fgDropdown.options) {
            dropdownJQueryObject.append(new OptionDropdownConvertor().toJQueryObject(option));
        }

        return elementContainerJqObj;
    }

    fromJQueryObject(dropdownElementContainer) {

        // Get fgElement
        let dropdownElement = FgUtilityConvertor.getFgElChild(dropdownElementContainer);

        if (FgUtilityConvertor.getFgElType(dropdownElement) !== FgDropdown.getType())
            console.error("The type of this element isn't DROPDOWNLIST for converting to fgDropdown.");

        // dropdown options
        let dropdownOptionJQueryElements = dropdownElement.find('option');
        let dropdownOptionsList = [];

        $.each(dropdownOptionJQueryElements, function () {
            let optionDropdown = new OptionDropdownConvertor().fromJQueryObject($(this));
            dropdownOptionsList.push(optionDropdown);
        });

        let fgDropdown = FgDropdown.createDropdown(dropdownOptionsList, dropdownElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(dropdownElementContainer),
            FgUtilityConvertor.getHelpMessageText(dropdownElementContainer),
            FgUtilityConvertor.hasRequiredClass(dropdownElement),
            FgUtilityConvertor.getFontIconCssClass(dropdownElementContainer),
            dropdownElement.attr("class"),
            dropdownElement.attr("data-fill"),
            dropdownElement.attr("data-map"),
            dropdownElement.attr("data-key"),
            dropdownElement.attr("data-text"),
            FgCommon.getEventsFromElement(dropdownElement),
            dropdownElement.attr("data-parameter"),
            dropdownElement.attr("data-optionalCaption"),
            dropdownElement.is('[disabled]'),
            FgCommon.getVisibilityCodeObjectFromElement(dropdownElement),
            dropdownElement.attr("data-val-group"),
            dropdownElement.attr("data-fillList"));

        let dropdownEditMode = FgDropdownEditMode.createDropdown(fgDropdown,
            FgUtilityConvertor.getFgElContainerCssClassName(dropdownElementContainer),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(dropdownElementContainer)
        );

        return dropdownEditMode;
    }

    // Fill setting pop up by DropDownList attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, scriptTab) {

        var tabpanel = $(modalBody).find('.editPopUp-tabpanel');
        FgCommon.generateSingleTab_EditPopUp(tabpanel, new BootstrapTab(lang.FG.optionManagmentTab, "#" + idElementEditForm.optionManagmentTab, idElementEditForm.optionManagmentTab, idElementEditForm.optionManagmentTab));
        var optionManagmentTab = FgCommon.jq_getElementById(idElementEditForm.optionManagmentTab);

        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // Class name // label of element
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element)) // Help text 
            .append(FgCommon.createElementIdDiv_EditPopUp(element)) //Create ID Txt
            .append(FgCommon.createHelpTextDiv_EditPopUp(element))
            .append(FgDropdownEditModeConvertor.createElementOptionalCaptionDiv_EditPopUp(element))
            .append(FgCommon.createHasIconFontFieldDiv_EditPopUp(element))
            .append(FgCommon.createRequiredFieldDiv_EditPopUp(element))
            .append(FgCommon.createReadOnlyFieldDiv_EditPopUp(element));

        //expression Visibility Code.
        baseSettingTab.append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));
        //Create validation group name Txt
        baseSettingTab.append(FgCommon.createElementValidationGroupDiv_EditPopUp(element));

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        // Custom font icon
        FgCommon.createCustomIconFontDiv_EditPopUp(element);
        customIconFontSettingTab.prepend(FgCommon.createIconFontNameDiv_EditPopUp(element, iconFontSettingTypeEnum.customIconFonts));

        // optionManagmentTab
        FgCommon.addEditOptionsForDropDownDiv(optionManagmentTab, element);

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


    // Update dropdown atrributes and other properties like label and font icon
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

        // Update ReadOnly filed of element
        FgDropdownEditModeConvertor.updateReadOnlyFiled_EditPopUp(element);

        // Update options
        FgCommon.updateOptionsElement_EditPopUp(element, type);

        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // Update event function attribute of element
        FgCommon.updateEventAttribute_EditPopUp(element);

        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);
 
        //Update OptionalCaption attribute of element
        FgDropdownEditModeConvertor.updateOptionalCaptionAttributes_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);
        //Update validation group attribute of element
        FgCommon.updateValidationGroupAttribute_EditPopUp(element);
    }

    // Update optionalcaption attribute in edit popup
    static updateOptionalCaptionAttributes_EditPopUp(element) {
        let optionalCaption = FgCommon.jq_getElementById(idElementEditForm.optionalCaption).val();
        element.attr("data-optionalcaption", optionalCaption);
    }
  
    static createElementOptionalCaptionDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.optionalCaption, element.attr("data-optionalcaption"));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.dropDownOptionalCaption, "fa fa-css3");
        return formGroup;
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

export default FgDropdownEditModeConvertor