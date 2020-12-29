
'use strict'

import { fgAttributeName, fgCssClassName } from "../FgElementsEditMode/fgElementEditModes.js"
import HelperText from "./helpText.js"
import HelpTextConvertor from "./helpTextConvertor.js"
import InputGroup from "./inputGroup.js"
import InputGroupConvertor from "./inputGroupConvertor.js"
import FgUtility from "../fgUtility.js"
import { FgElement, FG_ElementTypeEnum } from "../FgElements/fgElement.js"
import { FgRadioAndCheckboxList, inlineClassEnum } from "../FgElements/radioAndCheckboxList/radioAndCheckboxList.js"


class FgUtilityConvertor {

    static refereshCalendarAngular() {

    }

    static getFgContainerElementJqueryObj(fgElementJqueryObj) {
        return fgElementJqueryObj.closest('.' + fgCssClassName.container);
    }

    static getFgElType(fgElementJqueryObj) {
        return fgElementJqueryObj.attr(fgAttributeName.elementType);
    }

    static getFgElChildren(fgElementJqueryObj) {
        return fgElementJqueryObj.find('[' + fgAttributeName.elementType + ']');
    }

    static getFgElChildrenByType(fgElementJqueryObj, fgElementType) {
        return fgElementJqueryObj.find('[' + fgAttributeName.elementType + '=' + fgElementType + ']');
    }

    static getFgElChild(fgContainerElementJqueryObj) {
        let fgElChildren = fgContainerElementJqueryObj.find('[' + fgAttributeName.elementType + ']');
        if (fgElChildren.length > 1)
            console.error("There are more than one fgElement childs in this element.")
        if (fgElChildren.length == 0)
            console.error("There isn't any fgElement childs in this element.")
        return fgElChildren.first();
    }

    static getFgElChildByType(fgContainerElementJqueryObj, fgElementType) {
        let fgElChildren = fgContainerElementJqueryObj.find('[' + fgAttributeName.elementType + '=' + fgElementType + ']');
        if (fgElChildren.length > 1)
            console.error("There are more than one fgElement childs in this element.")
        if (fgElChildren.length == 0)
            console.error("There isn't any fgElement childs in this element.")
        return fgElChildren.first();
    }

    static getFgElPlaceholderCssClassName(fgContainerElementJqueryObj) {
        return fgContainerElementJqueryObj.find('.' + fgCssClassName.placeholder).removeClass(fgCssClassName.placeholder).attr('class');
    }

    static getFgElContainerCssClassName(fgContainerElementJqueryObj) {
        return fgContainerElementJqueryObj.removeClass(fgCssClassName.container).attr('class');
    }

    // Add fg element label
    static addFgElementLabel(labelParentJqObj, fgElement) {
        labelParentJqObj.append($(document.createElement('label')).addClass(fgCssClassName.label).text(fgElement.label));
    }

    static addFgElTypeToJqueryObj(fgElementJqueryObj, fgElement) {
        fgElementJqueryObj.attr(fgAttributeName.elementType, fgElement.type);
    }

    static addHelpMessageText(fgElement, elPlaceholderJqObj) {
        let fgElementHelpMessageText = fgElement.helpMessageText;
        if (fgElementHelpMessageText !== null) {
            let helpTextElement = HelperText.createHelperText(fgElementHelpMessageText);
            let helpTextJQueryObject = new HelpTextConvertor().toJQueryObject(helpTextElement);
            elPlaceholderJqObj.append(' ');
            elPlaceholderJqObj.append(helpTextJQueryObject);
        }
    }

    static addRequiredFieldToJqObj(fgElement, fgElementJqueryObj) {
        if (fgElement.isRequired) {
            fgElementJqueryObj.addClass(fgCssClassName.requiredField);
        }
    }

    static addFontIconCssClass(fgElement, fgElementJqueryObj, elPlaceholderJqObj) {
        if (/fa-(.*)/.test(fgElement.fontIconCssClass)) {
            let inputGroupElement = InputGroup.createInputGroup(fgElement.fontIconCssClass, fgElementJqueryObj);
            elPlaceholderJqObj.append(new InputGroupConvertor().toJQueryObject(inputGroupElement));
        }
        else {
            let inputGroupElement = InputGroup.createInputGroup(null, fgElementJqueryObj);
            elPlaceholderJqObj.append(inputGroupElement.element);
        }
    }

    static addFontIconCssClassToUploader(fgElement, fgElementJqueryObj, elPlaceholderJqObj) {
        if (/fa-(.*)/.test(fgElement.fontIconCssClass)) {
            let inputGroupElement = InputGroup.createInputGroup(fgElement.fontIconCssClass, fgElementJqueryObj);
            elPlaceholderJqObj.append(new InputGroupConvertor().toJQueryObject(inputGroupElement));

            let inputAfterUploader = $(document.createElement('input')).val(fgElement.placeholder).addClass("form-control file-upload").attr("readonly", "readonly");
            inputAfterUploader.insertAfter(fgElementJqueryObj);
        }
    }

    static createDefaultFgElementEditModeJqueryObj(fgElementEditMode) {
        let fgElement = fgElementEditMode.fgElement;
        let defaultJqueryObj = FgUtility.getJqueryObjectByTagName(fgElementEditMode.htmlType)
            .attr("id", fgElement.id)
            .addClass(fgElement.cssClass)
            .attr(fgAttributeName.elementType, fgElement.type)
        return defaultJqueryObj;
    }

    static createDefaultFgColumnEditModeJqueryObj(fgColumnEditMode) {
        let fgElement = fgColumnEditMode.fgElement;
        let defaultJqueryObj = FgUtility.getJqueryObjectByTagName(fgColumnEditMode.htmlType)
            .attr("id", fgElement.id)
            .attr(fgAttributeName.elementType, fgElement.type)
        return defaultJqueryObj;
    }

    static getFgElPlaceholder(fgContainerElementJqueryObj) {
        return fgContainerElementJqueryObj.find('.' + fgCssClassName.placeholder);
    }

    static getFontIconCssClass(fgContainerElementJqueryObj) {
        let inputGroupJqueyObject = fgContainerElementJqueryObj.find('.' + fgCssClassName.inputGroup);
        let inputGroupElement = inputGroupJqueyObject.length == 1 ? new InputGroupConvertor().fromJQueryObject(inputGroupJqueyObject) : null;
        return inputGroupElement !== null ? inputGroupElement.fontIconCssClass : null;
    }

    static getFgElLabel(fgContainerElementJqueryObj) {
        let fgLabelElement = fgContainerElementJqueryObj.find('.' + fgCssClassName.label);
        if (fgLabelElement.length > 1)
            console.error("There are more than one labels in this container element.");
        //if (fgLabelElement.length == 0)
        //    console.error("There isn't any label in this container element.")
        return fgLabelElement.text();
    }

    // Get help message
    static getHelpMessageText(fgContainerElementJqueryObj) {
        let fgTooltipElement = fgContainerElementJqueryObj.find('.' + fgCssClassName.tooltip);
        let helpText = fgTooltipElement.length == 1 ? fgTooltipElement.data('original-title') : null;
        helpText = (((helpText == '' || helpText == null) && fgTooltipElement.length == 1) ? fgTooltipElement.data('title') : helpText);
        return helpText;
    }

    static hasRequiredClass(fgElementJqueryObj) {
        return fgElementJqueryObj.hasClass(fgCssClassName.requiredField);
    }


    static getInputGroup(fgContainerElementJqueryObj) {

    }

    static isInlineRadioAndCheckboxList(element) {
        let reGexptInlineClass = new RegExp('(?:^|\\s)sk-(radio|checkbox)-inline');
        return reGexptInlineClass.test(element.attr('class'));
    }

    static setInlineRadioAndCheckboxList(radioOrCheckboxlistElement, fgElementJqueryObj) {
        let inlineElementType = radioOrCheckboxlistElement.isInline ? inlineClassEnum.inline : inlineClassEnum.list;
        let elementType = radioOrCheckboxlistElement === FG_ElementTypeEnum.RADIOBUTTONLIST ? "radio" : "checkbox";
        fgElementJqueryObj.addClass("sk-" + elementType + "-" + inlineElementType);
    }

}

export default FgUtilityConvertor