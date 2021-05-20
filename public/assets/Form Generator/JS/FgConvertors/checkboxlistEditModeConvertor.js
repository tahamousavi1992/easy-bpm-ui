
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgCheckboxlistEditMode from "../FgElementsEditMode/checkboxlistEditMode.js"
import FgCheckboxlist from "../FgElements/radioAndCheckboxList/checkboxlist.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import OptionRadioAndCheckboxListConvertor from "./optionRadioAndCheckboxListConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import { FgElement, FG_ElementTypeEnum } from "../FgElements/fgElement.js";
import lang from "../../../JS/Languages/lang.js";
class FgCheckboxlistEditModeConvertor extends ElementEditModeConvertor {

    toJQueryObject(fgCheckboxlistEditMode) {
        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgCheckboxlistEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // checkboxlist
        let fgCheckboxlist = fgCheckboxlistEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgCheckboxlist);

        let checkboxlistJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgCheckboxlistEditMode)
            .attr("data-fill", fgCheckboxlist.fillBinding)
            .attr("data-map", fgCheckboxlist.mapBinding)
            .attr("data-text", fgCheckboxlist.fillText)
            .attr("data-key", fgCheckboxlist.fillKey)
            .attr("data-isRequired", fgCheckboxlist.isRequired == true ? "true" : "false")
            .attr("data-parameter", fgCheckboxlist.parameter)
            .attr("disabled", fgCheckboxlist.readOnly)
            .attr("data-val-group", fgCheckboxlist.validationGroup)
            .attr("data-fillList", fgCheckboxlist.fillListBinding);

        FgCommon.setVisibilityCodeObjectToElement(checkboxlistJQueryObject, fgCheckboxlist.expressionVisibilityCode);
        FgCommon.addEventsToElements(checkboxlistJQueryObject, fgCheckboxlist.events);

        FgUtilityConvertor.setInlineRadioAndCheckboxList(fgCheckboxlist, checkboxlistJQueryObject);

        //HelpMessageText
        FgUtilityConvertor.addHelpMessageText(fgCheckboxlist, elPlaceholderJqObj);

        // Radiobuttonlist options
        for (var option of fgCheckboxlist.options) {
            checkboxlistJQueryObject.append(new OptionRadioAndCheckboxListConvertor().toJQueryObject(option));
        }

        elPlaceholderJqObj.append(checkboxlistJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(checkboxlistElementContainer) {
        // Get fgElement
        let checkboxlistElement = FgUtilityConvertor.getFgElChild(checkboxlistElementContainer);

        if (FgUtilityConvertor.getFgElType(checkboxlistElement) !== FgCheckboxlist.getType())
            console.error("The type of this element isn't CHECKBOXLIST for converting to FgCheckboxlist.");

        // radiobuttonlist options
        let isSwitch = false;
        let jQueryOptionElements = checkboxlistElement.find('.checkbox');
        if (jQueryOptionElements.length == 0) {
            jQueryOptionElements = checkboxlistElement.find('.switch');
            if (jQueryOptionElements.length == 0)
                isSwitch = true;
        }
        let checkboxlistOptionsList = [];

        $.each(jQueryOptionElements, function () {
            let option = new OptionRadioAndCheckboxListConvertor().fromJQueryObject($(this));
            checkboxlistOptionsList.push(option);
        });

        let fgCheckboxlist = FgCheckboxlist.createFgCheckboxlist(checkboxlistOptionsList,
            FgUtilityConvertor.isInlineRadioAndCheckboxList(checkboxlistElement),
            FgUtilityConvertor.getHelpMessageText(checkboxlistElementContainer),
            checkboxlistElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(checkboxlistElementContainer),
            checkboxlistElement.attr("class"),
            checkboxlistElement.attr("data-isRequired") == "true",
            checkboxlistElement.attr("data-fill"),
            checkboxlistElement.attr("data-map"),
            checkboxlistElement.attr("data-key"),
            checkboxlistElement.attr("data-text"),
            FgCommon.getEventsFromElement(checkboxlistElement),
            checkboxlistElement.attr("data-parameter"),
            checkboxlistElement.is('[disabled]'),
            FgCommon.getVisibilityCodeObjectFromElement(checkboxlistElement),
            checkboxlistElement.attr("data-val-group"),
            checkboxlistElement.attr("data-fillList"));

        let checkboxlistEditMode = FgCheckboxlistEditMode.createCheckboxlist(fgCheckboxlist,
            FgUtilityConvertor.getFgElContainerCssClassName(checkboxlistElementContainer),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(checkboxlistElementContainer)
        );

        return checkboxlistEditMode;
    }

    // Fill setting pop up by CheckboxList attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab) {

        // create new tab for add edit options
        var tabpanel = $(modalBody).find('.editPopUp-tabpanel');
        FgCommon.generateSingleTab_EditPopUp(tabpanel, new BootstrapTab(lang.FG.optionManagmentTab, "#" + idElementEditForm.optionManagmentTab, idElementEditForm.optionManagmentTab, idElementEditForm.optionManagmentTab));
        var optionManagmentTab = FgCommon.jq_getElementById(idElementEditForm.optionManagmentTab);

        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // Class name 
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element)) // label of element
            .append(FgCommon.createHelpTextDiv_EditPopUp(element)) // Help text
            .append(FgCommon.createElementIdDiv_EditPopUp(element))
            .append(FgCommon.createInlineElementDiv_EditPopUp(type, element)) // inline of checkboxs    
            .append(FgCommon.createIsSwitchDiv_EditPopUp(type, element)) // switch display of checkboxs
            .append(FgCommon.createRequiredFieldDiv_EditPopUp(element)) // Required field
            .append(FgCommon.createReadOnlyFieldDiv_EditPopUp(element))
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element))//expression Visibility Code
            .append(FgCommon.createElementValidationGroupDiv_EditPopUp(element));// Create validation group name Txt


        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        // optionManagmentTab
        FgCheckboxlistEditModeConvertor.addEditOptionsForRadioButtonListDiv(optionManagmentTab, type, element);

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

    // Update RadioButtonElement atrributes and other properties like label and font icon
    updateElement_EditPopUp(element, type) {

        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);

        // Update help text of element
        FgCommon.updateHelpTextElement_EditPopUp(element);

        // Update ReadOnly filed of element
        FgCheckboxlistEditModeConvertor.updateReadOnlyFiled_EditPopUp(element);

        // Update inline class of element
        FgCommon.updateInlineClass_EditPopUp(element);

        // Update options
        FgCommon.updateOptionsElement_EditPopUp(element, type);

        // Update switch class of element    
        FgCommon.updateSwitchClass_EditPopUp(element);

        // Update binding attribute of newElement
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // Update required filed of element
        FgCommon.updateRequiredFiledAttribute_EditPopUp(element);

        // Update event function attribute of element
        FgCommon.updateEventAttribute_EditPopUp(element);

        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        //Update validation group attribute of element
        FgCommon.updateValidationGroupAttribute_EditPopUp(element);
    }


    // Add options and add button to optionManagmentTab
    static addEditOptionsForRadioButtonListDiv(optionManagmentTab, type, element) {

        // Add addOptionButton for adding new options
        var addOptionButtonAtrr = new elementAttributes(htmlElementType.button, "btn btn-success", idElementEditForm.btnAddOptions, lang.FG.addOptions);
        addOptionButtonAtrr.htmlSubType = FgCommon.getEnumKey(buttonTypeEnum, buttonTypeEnum.button);
        var addOptionButton = FgCommon.createNewChild(addOptionButtonAtrr);

        var divOptions = $('<div id="' + idElementEditForm.divOptions + '" class="row"> </div>');
        optionManagmentTab
            .append(addOptionButton)
            .append(divOptions);

        var optionsList = element.find("input");

        $.each(optionsList, function () {
            //var label = $(this).parent().find('.text-option').html();
            let label = $(this).parent().text();
            //var selected = $(this).prop("checked");
            var selected = $(this).parent().find('input').prop("checked");
            FgCheckboxlistEditModeConvertor.addOptionToRadioButtonList_EditPopUp(divOptions, type, label, $(this).val(), selected);
        });

        // Set sortable for divOptions
        FgCommon.setSortableForDivOptions(divOptions);

        // Add option
        addOptionButton.click(function () {
            // We have to use JavaScript element in this function
            var label = "";
            var value = "";
            FgCheckboxlistEditModeConvertor.addOptionToRadioButtonList_EditPopUp(divOptions, type, label, value, false);
            // Set effect for new option
            FgCommon.addOptionEffect(divOptions);
        });
    }

    // Add options for RadioButtonList
    static addOptionToRadioButtonList_EditPopUp(divOptions, type, label, value, selected) {
        var parent = $('<div class="input-group"></div>').append(parent);

        FgCheckboxlistEditModeConvertor.addOption(parent, type.valueType, selected);

        var labelOption = $('<span class="col-sm-5"> </span >').append(FgCommon.createInputForOption(label, lang.FG.label, "option-label"));
        parent.append(labelOption);

        var valueOption = $('<span class="col-sm-5"> </span >').append(FgCommon.createInputForOption(value, lang.FG.value, "option-value"));
        parent.append(valueOption);

        // removeButton used for remove option
        var removeOption = $('<span class="col-sm-1 text-center"> </span >');
        var removeButton = $('<a class="remove btn btn-sm btn-clean btn-icon"><span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span></a>');
        parent.append(removeOption.append(removeButton));
 
        // Set events removeOption
        FgCommon.setEventsForRemoveOptionButton(removeButton, parent);

        divOptions.append(parent);
    }

    static addOption(parent, type, selected) {
        var inputForSelectOption = $('<input aria-label="Checkbox for following text input"/>');
        var spanInputForSelectOption = $('<label class="checkbox"></label>');
        if (type === FG_ElementTypeEnum.RADIOBUTTONLIST) {
            inputForSelectOption.attr("type", "radio");
            inputForSelectOption.attr("name", idElementEditForm.divOptions);
        }
        if (type === FG_ElementTypeEnum.CHECKBOXLIST || type === FG_ElementTypeEnum.CHECKBOX)
            inputForSelectOption.attr("type", "checkbox");

        spanInputForSelectOption.append(inputForSelectOption);
        parent.append($('<div class="checkbox-list"></div>').append(spanInputForSelectOption));
        spanInputForSelectOption.append('<span></span>');
        // .prop and .attr in if ($(option).prop("selected")) doesn't work!!!
        // We have to use JavaScript in this issue
        if (selected)
            inputForSelectOption.prop("checked", true);
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

export default FgCheckboxlistEditModeConvertor