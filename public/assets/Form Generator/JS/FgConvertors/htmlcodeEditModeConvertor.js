
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgHTMLCODEEditMode from "../FgElementsEditMode/htmlcodeEditMode.js"
import FgHTMLCODE from "../FgElements/htmlcode.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgHTMLCODEEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    toJQueryObject(fgHTMLCODEElementEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgHTMLCODEElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // HTMLCODE
        let fgHTMLCODE = fgHTMLCODEElementEditMode.fgElement;

        let htmlcodeJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgHTMLCODEElementEditMode)
            .attr("data-fill", fgHTMLCODE.fillBinding)
            .attr("data-parameter", fgHTMLCODE.parameter)
            .html(fgHTMLCODE.label);

        FgCommon.setVisibilityCodeObjectToElement(htmlcodeJQueryObject, fgHTMLCODE.expressionVisibilityCode);
        elementContainerJqObj.append(htmlcodeJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(htmlcodeElementContainer) {

        // Get fgElement
        let htmlcodeElement = FgUtilityConvertor.getFgElChild(htmlcodeElementContainer);

        if (FgUtilityConvertor.getFgElType(htmlcodeElement) !== FgHTMLCODE.getType())
            console.error("The type of this element isn't HTMLCODE for converting.");

        let fgHTMLCODE = FgHTMLCODE.createHTMLCODE(htmlcodeElement.attr("id"),
            htmlcodeElement.html(),
            htmlcodeElement.attr("class"),
            htmlcodeElement.attr("data-fill"),
            FgCommon.getVisibilityCodeObjectFromElement(htmlcodeElement),
            htmlcodeElement.attr("data-parameter"));

        let htmlcodeEditMode = FgHTMLCODEEditMode.createHTMLCODE(fgHTMLCODE,
            htmlcodeElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(htmlcodeElementContainer)
        );

        return htmlcodeEditMode;
    }

    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab) {
        var editor = $('<textarea id="edithtmlCkEditor"></textarea>');
        editor.attr("id", idElementEditForm.edithtmlCkEditor);

        baseSettingTab.append(editor);

        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));
        baseSettingTab.append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code

        CKEDITOR.replace(editor.attr("id"));
        var objEditor = CKEDITOR.instances[editor.attr("id")];
        objEditor.setData(element.html());

        var colsList = baseSettingTab.find('.col-sm-12');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 1);

        //bindingTab initialize
        bindingTab
            .append(FgCommon.createBindingFillTreeDiv_EditPopUp(element)); // Fill of element   
        bindingTab.append(FgCommon.createBindingVariableParamsDiv_EditPopUp(element));//BindingVariable
        initCombooTree();
        var colsList = bindingTab.find('.col-sm-6,.col-sm-12');
        FgCommon.arrangeColsInFormGroupByColNumber(bindingTab, colsList, 1);
    }

    // Update HtmlCode Element atrributes
    updateElement_EditPopUp(element, type) {
        // Get html code form htmlCkEditor
        var objEditor = CKEDITOR.instances[idElementEditForm.edithtmlCkEditor];
        var ckEditor = objEditor.getData();
        // Set default value
        if (ckEditor === "")
            objEditor.setData(lang.FG.defaultContentHtmlCode);
        element.html(objEditor.getData());

        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);
         
        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);
    }
 
}

export default FgHTMLCODEEditModeConvertor