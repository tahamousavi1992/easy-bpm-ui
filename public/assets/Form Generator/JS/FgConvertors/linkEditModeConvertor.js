
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgLinkEditMode from "../FgElementsEditMode/linkEditMode.js"
import FgLink from "../FgElements/link.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgLinkEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    toJQueryObject(fgLinkElementEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgLinkElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // Link
        let fgLink = fgLinkElementEditMode.fgElement;

        // Add label

        let linkJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgLinkElementEditMode)
            .attr("href", fgLink.address)
            .attr("data-fill", fgLink.fillBinding)
            .attr("data-width", fgLink.width)
            .attr("data-height", fgLink.height)
            .attr("data-type", fgLink.linkType)
            .text(fgLink.label);

        FgCommon.setVisibilityCodeObjectToElement(linkJQueryObject, fgLink.expressionVisibilityCode);
        FgCommon.addEventsToElements(linkJQueryObject, fgLink.events);

        elementContainerJqObj.append(linkJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(linkElementContainer) {

        // Get fgElement
        let linkElement = FgUtilityConvertor.getFgElChild(linkElementContainer);

        if (FgUtilityConvertor.getFgElType(linkElement) !== FgLink.getType())
            console.error("The type of this element isn't LINK for converting.");

        let fgLink = FgLink.createLink(linkElement.attr("id"),
            linkElement.text(),
            linkElement.attr("class"),
            linkElement.attr("href"),
            linkElement.attr("data-fill"),
            linkElement.attr("data-width"),
            linkElement.attr("data-height"),
            linkElement.attr("data-type"),
            FgCommon.getEventsFromElement(linkElement),
            FgCommon.getVisibilityCodeObjectFromElement(linkElement));

        let linkEditMode = FgLinkEditMode.createLink(fgLink,
            linkElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(linkElementContainer)
        );

        return linkEditMode;
    }

    // Fill setting pop up by link attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, scriptTab) {
        // In DnnModal status we need to set width and height of dnnModal
        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // Class name
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element)) // label of element    
            .append(FgLinkEditModeConvertor.createHrefLinkElementDiv_EditPopUp(element)) // Link element
            .append(FgLinkEditModeConvertor.createWidthDnnPopUpDiv_EditPopUp(element))
            .append(FgLinkEditModeConvertor.createHeightDnnPopUpDiv_EditPopUp(element))
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code
        //Create ID Txt
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));

        // href setting
        FgLinkEditModeConvertor.addHrefSettingDiv_EditPopUp(baseSettingTab, element);

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        //bindingTab initialize
        bindingTab
            .append(FgCommon.createBindingFillTreeDiv_EditPopUp(element)); // Fill of element   
        initCombooTree();
        var colsList = bindingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(bindingTab, colsList, 1);

        //set ScriptTab
        scriptTab
            .append(FgCommon.createEventDiv_EditPopUp(element, eventType.click, lang.FG.eventTypeClick));
        var colsList = scriptTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(scriptTab, colsList, 1);
    }

    // Update link Element atrributes
    updateElement_EditPopUp(element, type) {
        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);

        // Update href
        FgLinkEditModeConvertor.updateHrefLinkElementAttributes_EditPopUp(element);

        // Update href depened to HrefTypes (newTab, dnnModal, default)
        FgLinkEditModeConvertor.updateHrefTypeLinkElementAttributes_EditPopUp(element);

        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // Update event function attribute of element
        FgCommon.updateEventAttribute_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);
    }

    // This method used for href setting element
    static addHrefSettingDiv_EditPopUp(modalBody, element) {
        var dropDownListId = idElementEditForm.ddlHrefTypes;
        var elementAttribute = FgCommon.createSubTypeHtmlElement(dropDownListId, Object.values(hrefTypeEnum));
        var hrefElement = element.attr("href");
        var linkType = element.attr("data-type");

        elementAttribute.val(linkType);
        var col6 = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.linkHrefType, "fa fa-cog");
        modalBody.append(col6);

        elementAttribute.on('change', function () {
            FgLinkEditModeConvertor.linkHrefSettingChange(this.value);
        });
        FgLinkEditModeConvertor.linkHrefSettingChange(linkType);
        return col6;
    }

    static linkHrefSettingChange(value) {
        if (value === hrefTypeEnum.dnnModal) {
            FgCommon.jq_getElementById(idElementEditForm.txtWidthDnnModal).closest('div.col-sm-6').show();
            FgCommon.jq_getElementById(idElementEditForm.txtHeightDnnModal).closest('div.col-sm-6').show();
        }
        else {
            FgCommon.jq_getElementById(idElementEditForm.txtWidthDnnModal).closest('div.col-sm-6').hide();
            FgCommon.jq_getElementById(idElementEditForm.txtHeightDnnModal).closest('div.col-sm-6').hide();
        }
    }

    // Create div for set width for image element or like it
    static createWidthDnnPopUpDiv_EditPopUp(element) {
        var widthElement = element.attr("data-width");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtWidthDnnModal, widthElement);
        elementAttribute.attr("type", "number");
        elementAttribute.attr("min", "1");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.linkPopUpWidth, "fa fa-text-width");
        return formGroup;
    }

    // Create div for set href for LINK element
    static createHrefLinkElementDiv_EditPopUp(element) {
        // Fill hrefLink by type href
        var hrefLink = element.attr("href"); // Default and newTab are same
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtHrefLink, hrefLink, true, "http//:DynamicBusiness.ir");
        var col6 = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.linkHref, "fa fa-link");
 
        return col6;
    }


    // Create div for set height for image element or like it
    static createHeightDnnPopUpDiv_EditPopUp(element) {
        var heightElement = element.attr("data-height");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtHeightDnnModal, heightElement);
        elementAttribute.attr("type", "number");
        elementAttribute.attr("min", "1");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.linkPopUpHeigth, "fa fa-text-height");
        return formGroup;
    }

 
    // Update href attribute of element in edit popup
    static updateHrefLinkElementAttributes_EditPopUp(element) {
        var href = FgCommon.jq_getElementById(idElementEditForm.txtHrefLink).val();
        element.removeAttr("href");
        element.attr("href", href);
    }

    static updateHrefTypeLinkElementAttributes_EditPopUp(element) {
        var hrefType = FgCommon.jq_getElementById(idElementEditForm.ddlHrefTypes).val();
        if (hrefType === hrefTypeEnum.newTab)
            element.attr("target", "_blank");
        else
            element.attr("target", "");
        element.attr('data-type', hrefType);

        if (hrefType === hrefTypeEnum.dnnModal) {
            element.attr('data-height', FgCommon.jq_getElementById(idElementEditForm.txtHeightDnnModal).val());
            element.attr('data-width', FgCommon.jq_getElementById(idElementEditForm.txtWidthDnnModal).val());
        }
    }

}
// Bootstrap class names for image
var hrefTypeEnum = {
    default: "default",
    newTab: "newTab",
    dnnModal: "dnnModal",
};
export default FgLinkEditModeConvertor