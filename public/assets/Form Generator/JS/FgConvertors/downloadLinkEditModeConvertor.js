
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgDownloadLinkEditMode from "../FgElementsEditMode/downloadlinkEditMode.js"
import FgDownloadLink from "../FgElements/downloadlink.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgDownloadLinkEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    toJQueryObject(fgDownloadLinkEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgDownloadLinkEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // Link
        let fgDownloadLink = fgDownloadLinkEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgDownloadLink);

        let linkJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgDownloadLinkEditMode)
            .attr("data-entityvariableid", fgDownloadLink.entityVariableId)
            .attr("data-documentDefId", fgDownloadLink.documentDefId)
            .text(lang.FG.newDownloadLink);

        FgCommon.setVisibilityCodeObjectToElement(linkJQueryObject, fgDownloadLink.expressionVisibilityCode);
        elementContainerJqObj.append(linkJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(linkElementContainer) {

        // Get fgElement
        let linkElement = FgUtilityConvertor.getFgElChild(linkElementContainer);

        if (FgUtilityConvertor.getFgElType(linkElement) !== FgDownloadLink.getType())
            console.error("The type of this element isn't LINK for converting.");

        let docFolderid = window["documentDefs"].filter(item => item.id == linkElement.attr("data-documentDefid")).length > 0 ?
            linkElement.attr("data-documentDefid") : null;

        let fgDownloadLink = FgDownloadLink.createDownloadLink(linkElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(linkElementContainer),
            linkElement.attr("class"),
            linkElement.attr("data-entityvariableid"),
            docFolderid == null ? linkElement.attr("data-documentDefId") : null,
            docFolderid,
            FgCommon.getVisibilityCodeObjectFromElement(linkElement));

        let downloadLinkEditMode = FgDownloadLinkEditMode.createDownloadLink(fgDownloadLink,
            linkElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(linkElementContainer)
        );

        return downloadLinkEditMode;
    }

    //Fill setting pop up by Download Link attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab) {
        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // Class name
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element)) // label of element
            .append(FgCommon.createEntityVariableComboDiv_EditPopUp(element))
            .append(FgCommon.createDocumentDefTreeDiv_EditPopUp(element))
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code

        //Create ID Txt
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));

        // Arranging cols in form group depend to number of cols
        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        initCombooTree();
    }

    // Update FileUploadElement atrributes and other properties like label
    updateElement_EditPopUp(element, type) {
        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);

        //Update EntityVariableId
        FgCommon.updateEntityVariableIdElement_EditPopUp(element);

        //Update DocumentDefID
        FgCommon.updateDocumentDefIDElement_EditPopUp(element);

        // Update help text of element
        FgCommon.updateHelpTextElement_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);
    }
}

export default FgDownloadLinkEditModeConvertor