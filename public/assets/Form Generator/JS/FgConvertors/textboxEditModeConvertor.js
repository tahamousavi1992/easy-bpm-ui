
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgTextboxEditMode from "../FgElementsEditMode/textboxEditMode.js"
import FgTextbox from "../FgElements/textbox.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgTextboxEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }
    //convert from json element to jquery object 
    toJQueryObject(fgTextboxElementEditMode) {
        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgTextboxElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // textbox
        let fgTextbox = fgTextboxElementEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgTextbox);

        let textboxJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgTextboxElementEditMode)
            .attr("type", fgTextbox.subtype == 'password' ? fgTextbox.subtype : 'text')
            .attr("data-type", fgTextbox.subtype)
            .attr('placeholder', fgTextbox.placeholderText)
            .attr("maxlength", fgTextbox.maxLength)
            .attr("data-fill", fgTextbox.fillBinding)
            .attr("data-map", fgTextbox.mapBinding)
            .attr("readonly", fgTextbox.readOnly)
            .attr("data-pattern", fgTextbox.pattern)
            .attr("data-isMultiline", fgTextbox.isMultiline)
            .attr("data-val-group", fgTextbox.validationGroup)
            .attr("data-parameter", fgTextbox.parameter);

        FgCommon.setVisibilityCodeObjectToElement(textboxJQueryObject, fgTextbox.expressionVisibilityCode);
        FgCommon.addEventsToElements(textboxJQueryObject, fgTextbox.events);

        if (Number.isInteger(fgTextbox.maxLength)) {
            textboxJQueryObject.attr('maxlength', fgTextbox.maxlength);
        }

        // isRequired
        FgUtilityConvertor.addRequiredFieldToJqObj(fgTextbox, textboxJQueryObject);

        // HelpMessageText
        FgUtilityConvertor.addHelpMessageText(fgTextbox, elPlaceholderJqObj);

        // Add fontIconCssClass
        FgUtilityConvertor.addFontIconCssClass(fgTextbox, textboxJQueryObject, elPlaceholderJqObj);

        return elementContainerJqObj;
    }

    //convert from jquery element to json object 
    fromJQueryObject(textboxElementContainer) {
        // Get fgElement
        let textboxElement = FgUtilityConvertor.getFgElChild(textboxElementContainer);

        if (FgUtilityConvertor.getFgElType(textboxElement) !== FgTextbox.getType())
            console.error("The type of this element isn't TEXTBOX for converting to fgTextbox.");

        let fgTextbox = FgTextbox.createTextbox(textboxElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(textboxElementContainer),
            textboxElement.attr("data-type"),
            FgUtilityConvertor.getHelpMessageText(textboxElementContainer),
            textboxElement.attr("placeholder"),
            textboxElement.attr("maxlength"),
            FgUtilityConvertor.hasRequiredClass(textboxElement),
            FgUtilityConvertor.getFontIconCssClass(textboxElementContainer),
            textboxElement.attr("class"),
            textboxElement.attr("data-fill"),
            textboxElement.attr("data-map"),
            textboxElement.is('[readonly]'),
            textboxElement.attr("data-pattern"),
            FgCommon.getEventsFromElement(textboxElement),
            textboxElement.attr("data-isMultiline"),
            FgCommon.getVisibilityCodeObjectFromElement(textboxElement),
            textboxElement.attr("data-val-group"),
            textboxElement.attr("data-parameter"));

        let textboxEditMode = FgTextboxEditMode.createTextbox(fgTextbox,
            textboxElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(textboxElementContainer)
        );

        return textboxEditMode;
    }

    // Fill setting pop up by TextBox attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab) {
        // Class name
        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // class of element        
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element))  // label of element
            .append(FgCommon.createSubTypeNameDiv_EditPopUp(element))    // SubType name
            .append(FgCommon.createHelpTextDiv_EditPopUp(element)) // Help text
            .append(FgCommon.createPlaceholderDiv_EditPopUp(element)) // Placeholder
            .append(FgCommon.createMaxLengthDiv_EditPopUp(element)) // Max length
            .append(FgCommon.createPatternDiv_EditPopUp(element))
            .append(FgCommon.createElementIdDiv_EditPopUp(element))
            .append(FgCommon.createRequiredFieldDiv_EditPopUp(element)) // Required field
            .append(FgCommon.createHasIconFontFieldDiv_EditPopUp(element))
            .append(FgCommon.createReadOnlyFieldDiv_EditPopUp(element))
            .append(FgTextboxEditModeConvertor.createIsMultilineFieldDiv_EditPopUp(element))
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code

        //Create validation group name Txt
        baseSettingTab.append(FgCommon.createElementValidationGroupDiv_EditPopUp(element));

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

 
        // Custom font icon
        FgCommon.createCustomIconFontDiv_EditPopUp(element);
        customIconFontSettingTab.prepend(FgCommon.createIconFontNameDiv_EditPopUp(element, iconFontSettingTypeEnum.customIconFonts));

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

        // Update Max length attribute of element
        FgCommon.updateMaxlengthAttribute_EditPopUp(element);

        //Update Pattern attribute of element
        FgCommon.updatePatternAttribute_EditPopUp(element);

        // Update TextBoxType of element
        FgCommon.updateTextBoxTypeElement_EditPopUp(element);

        // Update help text of element
        FgCommon.updateHelpTextElement_EditPopUp(element);

        // Update required filed of element
        FgCommon.updateRequiredFiled_EditPopUp(element);

        // Update ReadOnly filed of element
        FgTextboxEditModeConvertor.updateReadOnlyFiled_EditPopUp(element);

        // Update Icon Font of element
        FgCommon.updateIconFontElement_EditPopUp(element);

        // Update Placeholder attribute of element
        FgCommon.updatePlaceholderAttribute_EditPopUp(element);

        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // Update event function attribute of element
        FgCommon.updateEventAttribute_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        element.attr("data-isMultiline", document.getElementById(idElementEditForm.chisMultilineField).checked);

        //Update validation group attribute of element
        FgCommon.updateValidationGroupAttribute_EditPopUp(element);

        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);
    }

    static createIsMultilineFieldDiv_EditPopUp(element) {
        let isMultiline = element.attr('data-isMultiline') == "true";
        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.inputMultiline, checked: isMultiline, id: idElementEditForm.chisMultilineField });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);

        var col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    // Update readOnly filed in edit popup
    static updateReadOnlyFiled_EditPopUp(element) {
        var readOnlyFieldElement = FgCommon.jq_getElementById(idElementEditForm.chkReadOnlyField);
        if (readOnlyFieldElement.prop("checked"))
            element.attr('readonly', true);
        else
            element.attr('readonly', false);
    }
}

export default FgTextboxEditModeConvertor