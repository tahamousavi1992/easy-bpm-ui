
'use strict';
import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgFormEditMode from "../FgElementsEditMode/formEditMode.js"
import FgForm from "../FgElements/form.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgFormEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }
    //convert from json element to jquery object 
    toJQueryObject(fgFormElementEditMode) {
        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgFormElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // form
        let fgForm = fgFormElementEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgForm);

        let formJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgFormElementEditMode)
            .attr("readonly", fgForm.readOnly)
            .attr("data-formid", fgForm.formId);

        FgCommon.setVisibilityCodeObjectToElement(formJQueryObject, fgForm.expressionVisibilityCode);
        formJQueryObject.append('<div class="panel-body" style="min-height: 31px;"></div>');
        elementContainerJqObj.append(formJQueryObject);

        return elementContainerJqObj;
    }
    //convert from jquery element to json object 
    fromJQueryObject(formElementContainer) {
        // Get fgElement
        let formElement = FgUtilityConvertor.getFgElChild(formElementContainer);

        if (FgUtilityConvertor.getFgElType(formElement) !== FgForm.getType())
            console.error("The type of this element isn't Form for converting to fgForm.");

        let fgForm = FgForm.createForm(formElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(formElementContainer),
            formElement.attr("class"),
            formElement.is('[readonly]'),
            formElement.attr("data-formId"),
            FgCommon.getVisibilityCodeObjectFromElement(formElement));

        let formEditMode = FgFormEditMode.createForm(fgForm,
            formElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(formElementContainer)
        );

        return formEditMode;
    }

    // Fill setting pop up by TextBox attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab) {
        // Class name
        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // class of element        
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element))  // label of element
            .append(FgCommon.createElementIdDiv_EditPopUp(element))
            .append(FgFormEditModeConvertor.createProcessForm(element))
            .append(FgCommon.createReadOnlyFieldDiv_EditPopUp(element))
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code
        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);
    }

    // Update textbox atrributes and other properties like label and font icon
    updateElement_EditPopUp(element, type) {

        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);

        // Update ReadOnly filed of element
        FgFormEditModeConvertor.updateReadOnlyFiled_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);
    }
 
    // Update readOnly filed in edit popup
    static updateReadOnlyFiled_EditPopUp(element) {
        var readOnlyFieldElement = FgCommon.jq_getElementById(idElementEditForm.chkReadOnlyField);
        if (readOnlyFieldElement.prop("checked"))
            element.attr('readonly', true);
        else
            element.attr('readonly', false);
        element.attr('data-formId', document.getElementById(idElementEditForm.formId).value);
    }
    static setDropDownELement(selectId, data) {
        let options = `<option value="">${lang.FG.listItemDefault}</option>`;
        for (let i = 0; i < data.length; i++) {
            options += `<option value="${data[i].value}">${data[i].text}</option>`;
        }
        document.getElementById(selectId).innerHTML = options;
    }

    static createProcessForm(element) {
        var formId = element.attr("data-formId");
        var elementAttribute = FgCommon.createDropDownHtmlElement(idElementEditForm.formId, formId, true, window["processForms"]);
        elementAttribute.attr("type", "text");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.form, "fa fa-text-width", null, "col-sm-6");
        return formGroup;
    }
}

export default FgFormEditModeConvertor