'use strict';
import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";
import FgRadiobuttonlistEditMode from "../FgElementsEditMode/radiobuttonlistEditMode.js"
import FgRadiobuttonlist from "../FgElements/radioAndCheckboxList/radiobuttonlist.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import OptionRadioAndCheckboxListConvertor from "./optionRadioAndCheckboxListConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import { FgElement, FG_ElementTypeEnum } from "../FgElements/fgElement.js";
import lang from "../../../JS/Languages/lang.js";
class FgRadiobuttonlistEditModeConvertor extends ElementEditModeConvertor {

    toJQueryObject(fgRadiobuttonlistEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgRadiobuttonlistEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // Radiobuttonlist
        let fgRadiobuttonlist = fgRadiobuttonlistEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgRadiobuttonlist);

        let radiobuttonlistJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgRadiobuttonlistEditMode)
            .attr("data-fill", fgRadiobuttonlist.fillBinding)
            .attr("data-map", fgRadiobuttonlist.mapBinding)
            .attr("data-text", fgRadiobuttonlist.fillText)
            .attr("data-key", fgRadiobuttonlist.fillKey)
            .attr("data-isRequired", fgRadiobuttonlist.isRequired == true ? "true" : "false")
            .attr("data-parameter", fgRadiobuttonlist.parameter)
            .attr("disabled", fgRadiobuttonlist.readOnly)
            .attr("data-val-group", fgRadiobuttonlist.validationGroup)
            .attr("data-fillList", fgRadiobuttonlist.fillListBinding);

        FgCommon.setVisibilityCodeObjectToElement(radiobuttonlistJQueryObject, fgRadiobuttonlist.expressionVisibilityCode);
        FgCommon.addEventsToElements(radiobuttonlistJQueryObject, fgRadiobuttonlist.events);

        FgUtilityConvertor.setInlineRadioAndCheckboxList(fgRadiobuttonlist, radiobuttonlistJQueryObject);

        //HelpMessageText
        FgUtilityConvertor.addHelpMessageText(fgRadiobuttonlist, elPlaceholderJqObj);

        // Radiobuttonlist options
        for (var option of fgRadiobuttonlist.options) {
            radiobuttonlistJQueryObject.append(new OptionRadioAndCheckboxListConvertor().toJQueryObject(option));
        }

        elPlaceholderJqObj.append(radiobuttonlistJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(radiobuttonlistElementContainer) {

        // Get fgElement
        let radiobuttonlistElement = FgUtilityConvertor.getFgElChild(radiobuttonlistElementContainer);

        if (FgUtilityConvertor.getFgElType(radiobuttonlistElement) !== FgRadiobuttonlist.getType())
            console.error("The type of this element isn't RADIOBUTTONLIST for converting to fgradiobuttonlist.");

        // radiobuttonlist options
        let radiobuttonlistJQueryElements = radiobuttonlistElement.find('.radio');
        let radiobuttonlistOptionsList = [];

        $.each(radiobuttonlistJQueryElements, function () {
            let option = new OptionRadioAndCheckboxListConvertor().fromJQueryObject($(this));
            radiobuttonlistOptionsList.push(option);
        });

        let fgRadiobuttonlist = FgRadiobuttonlist.createFgRadiobuttonlist(radiobuttonlistOptionsList,
            FgUtilityConvertor.isInlineRadioAndCheckboxList(radiobuttonlistElement),
            FgUtilityConvertor.getHelpMessageText(radiobuttonlistElementContainer),
            radiobuttonlistElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(radiobuttonlistElementContainer),
            radiobuttonlistElement.attr("class"),
            radiobuttonlistElement.attr("data-isRequired") == "true",
            radiobuttonlistElement.attr("data-fill"),
            radiobuttonlistElement.attr("data-map"),
            radiobuttonlistElement.attr("data-key"),
            radiobuttonlistElement.attr("data-text"),
            FgCommon.getEventsFromElement(radiobuttonlistElement),
            radiobuttonlistElement.attr("data-parameter"),
            radiobuttonlistElement.is('[disabled]'),
            FgCommon.getVisibilityCodeObjectFromElement(radiobuttonlistElement),
            radiobuttonlistElement.attr("data-val-group"),
            radiobuttonlistElement.attr("data-fillList"));

        let radiobuttonlistEditMode = FgRadiobuttonlistEditMode.createRadiobuttonlist(fgRadiobuttonlist,
            FgUtilityConvertor.getFgElContainerCssClassName(radiobuttonlistElementContainer),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(radiobuttonlistElementContainer)
        );

        return radiobuttonlistEditMode;
    }

    // Fill setting pop up by RadioButtonList attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab) {
        // create new tab for add edit options
        var tabpanel = $(modalBody).find('.editPopUp-tabpanel');
        FgCommon.generateSingleTab_EditPopUp(tabpanel, new BootstrapTab(lang.FG.optionManagmentTab, "#" + idElementEditForm.optionManagmentTab, idElementEditForm.optionManagmentTab, idElementEditForm.optionManagmentTab));
        var optionManagmentTab = FgCommon.jq_getElementById(idElementEditForm.optionManagmentTab);

        // Class name
        baseSettingTab.append(FgCommon.createClassNameDiv_EditPopUp(element));

        // label of element
        baseSettingTab.append(FgCommon.createLabelElementDiv_EditPopUp(type, element));

        // Help text
        baseSettingTab.append(FgCommon.createHelpTextDiv_EditPopUp(element));

        //Create ID Txt
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));

        // inline of checkboxs
        baseSettingTab.append(FgCommon.createInlineElementDiv_EditPopUp(type, element));

        // Required field
        baseSettingTab.append(FgCommon.createRequiredFieldDiv_EditPopUp(element));

        baseSettingTab.append(FgCommon.createReadOnlyFieldDiv_EditPopUp(element));

        baseSettingTab.append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code

        //Create validation group name Txt
        baseSettingTab.append(FgCommon.createElementValidationGroupDiv_EditPopUp(element));

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        // optionManagmentTab
        FgRadiobuttonlistEditModeConvertor.addEditOptionsForRadioButtonListDiv(optionManagmentTab, type, element);

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

        // Update inline class of element
        FgCommon.updateInlineClass_EditPopUp(element);

        // Update options
        FgCommon.updateOptionsElement_EditPopUp(element, type);

        // Update ReadOnly filed of element
        FgRadiobuttonlistEditModeConvertor.updateReadOnlyFiled_EditPopUp(element);

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
            FgRadiobuttonlistEditModeConvertor.addOptionToRadioButtonList_EditPopUp(divOptions, type, label, $(this).val(), selected);
        });

        // Set sortable for divOptions
        FgCommon.setSortableForDivOptions(divOptions);

        // Add option
        addOptionButton.click(function () {
            // We have to use JavaScript element in this function
            var label = "";
            var value = "";
            FgRadiobuttonlistEditModeConvertor.addOptionToRadioButtonList_EditPopUp(divOptions, type, label, value, false);
            // Set effect for new option
            FgCommon.addOptionEffect(divOptions);
        });
    }

    // Add options for RadioButtonList
    static addOptionToRadioButtonList_EditPopUp(divOptions, type, label, value, selected) {
        var parent = $('<div class="input-group"> </div>').append(parent);

        FgRadiobuttonlistEditModeConvertor.addOption(parent, type.valueType, selected);

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
        var spanInputForSelectOption = $('<label class="radio"></label>');
        if (type === FG_ElementTypeEnum.RADIOBUTTONLIST) {
            inputForSelectOption.attr("type", "radio");
            inputForSelectOption.attr("name", idElementEditForm.divOptions);
        }
        if (type === FG_ElementTypeEnum.CHECKBOXLIST || type === FG_ElementTypeEnum.CHECKBOX)
            inputForSelectOption.attr("type", "checkbox");

        spanInputForSelectOption.append(inputForSelectOption);
        parent.append($('<div class="radio-list"></div>').append(spanInputForSelectOption));
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

export default FgRadiobuttonlistEditModeConvertor