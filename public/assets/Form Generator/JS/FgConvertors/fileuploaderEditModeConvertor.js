
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";
import FgFileuploaderEditMode from "../FgElementsEditMode/fileuploaderEditMode.js"
import FgFileuploader from "../FgElements/fileuploader.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgFileUploaderEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    toJQueryObject(fgFileuploaderElementEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgFileuploaderElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // file uploader
        let fgFileuploader = fgFileuploaderElementEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgFileuploader);

        let fileuploaderJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgFileuploaderElementEditMode)
            .attr('placeholder', fgFileuploader.placeholderText)
            .attr("type", "file")
            .attr("data-documentDefid", fgFileuploader.documentDefId)
            .attr("data-entityvariableid", fgFileuploader.entityVariableId)
            .attr("data-deleteClass", fgFileuploader.deleteClass)
            .attr("data-downloadClass", fgFileuploader.downloadClass)
            .attr("data-deleteCaption", fgFileuploader.deleteCaption)
            .attr("data-downloadCaption", fgFileuploader.downloadCaption)
            .prop('multiple', fgFileuploader.multiple)
            .attr("data-val-group", fgFileuploader.validationGroup)
            .hide();

        FgCommon.setVisibilityCodeObjectToElement(fileuploaderJQueryObject, fgFileuploader.expressionVisibilityCode);
        FgCommon.addEventsToElements(fileuploaderJQueryObject, fgFileuploader.events);

        // isRequired
        FgUtilityConvertor.addRequiredFieldToJqObj(fgFileuploader, fileuploaderJQueryObject);

        // HelpMessageText
        FgUtilityConvertor.addHelpMessageText(fgFileuploader, elPlaceholderJqObj);

        // Add fontIconCssClass
        FgUtilityConvertor.addFontIconCssClassToUploader(fgFileuploader, fileuploaderJQueryObject, elPlaceholderJqObj);

        return elementContainerJqObj;
    }

    fromJQueryObject(fileuploaderElementContainer) {
        // Get fgElement
        let fileuploaderElement = FgUtilityConvertor.getFgElChild(fileuploaderElementContainer);

        if (FgUtilityConvertor.getFgElType(fileuploaderElement) !== FgFileuploader.getType())
            console.error("The type of this element isn't FILEUPLOAD for converting to fgFileuploader.");

        let fgFileuploader = FgFileuploader.createFileuploader(fileuploaderElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(fileuploaderElementContainer),
            FgUtilityConvertor.getHelpMessageText(fileuploaderElementContainer),
            fileuploaderElement.next().val(),
            FgUtilityConvertor.hasRequiredClass(fileuploaderElement),
            FgUtilityConvertor.getFontIconCssClass(fileuploaderElementContainer),
            fileuploaderElement.attr("class"),
            fileuploaderElement.attr("data-entityvariableid"),
            fileuploaderElement.attr("data-documentDefid"),
            window["documentDefs"].filter(item => item.id == fileuploaderElement.attr("data-documentDefid")).length > 0 ?
                fileuploaderElement.attr("data-documentDefid") : '',
            fileuploaderElement.prop("multiple"),
            FgCommon.getEventsFromElement(fileuploaderElement),
            fileuploaderElement.attr("data-deleteClass"),
            fileuploaderElement.attr("data-downloadClass"),
            fileuploaderElement.attr("data-deleteCaption"),
            fileuploaderElement.attr("data-downloadCaption"),
            FgCommon.getVisibilityCodeObjectFromElement(fileuploaderElement),
            fileuploaderElement.attr("data-val-group"));

        let fileuploaderEditMode = FgFileuploaderEditMode.createFileuploader(fgFileuploader,
            fileuploaderElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(fileuploaderElementContainer)
        );

        return fileuploaderEditMode;
    }

    // Fill setting pop up by FileUpload attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab) {
        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // Class name
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element)) // label of element
            .append(FgCommon.createHelpTextDiv_EditPopUp(element)) // Help text
            .append(FgFileUploaderEditModeConvertor.createAllowSelectMulitiFilesDiv_EditPopUp(element)) // Allow select multiple files
            .append(FgCommon.createEntityVariableComboDiv_EditPopUp(element))
            .append(FgCommon.createDocumentDefTreeDiv_EditPopUp(element))
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code
        //Create ID Txt
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));
        //Create validation group name Txt
        baseSettingTab.append(FgCommon.createElementValidationGroupDiv_EditPopUp(element));

        baseSettingTab.append(FgFileUploaderEditModeConvertor.createDeleteClassDiv_EditPopUp(element));
        baseSettingTab.append(FgFileUploaderEditModeConvertor.createDownloadClassDiv_EditPopUp(element));
        baseSettingTab.append(FgFileUploaderEditModeConvertor.createDeleteCaptionDiv_EditPopUp(element));
        baseSettingTab.append(FgFileUploaderEditModeConvertor.createDownloadCaptionDiv_EditPopUp(element));

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        //set ScriptTab
        scriptTab
            .append(FgCommon.createEventDiv_EditPopUp(element, eventType.change, "تابع تغییر"));
        var colsList = scriptTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(scriptTab, colsList, 1);

        initCombooTree();
    }

    // Update FileUploadElement atrributes and other properties like label
    updateElement_EditPopUp(element, type) {
        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);

        // Update multiple attribute of element
        FgCommon.updateAllowSelectMultipleFilesElement_EditPopUp(element);

        //Update EntityVariableId
        FgCommon.updateEntityVariableIdElement_EditPopUp(element);

        //Update DocumentDefID
        FgCommon.updateDocumentDefIDElement_EditPopUp(element);

        // Update help text of element
        FgCommon.updateHelpTextElement_EditPopUp(element);

        element.attr('data-deleteClass', document.getElementById(idElementEditForm.txtUploaderdeleteClass).value);
        element.attr('data-downloadClass', document.getElementById(idElementEditForm.txtUploaderdownloadClass).value);
        element.attr('data-deleteCaption', document.getElementById(idElementEditForm.txtUploaderdeleteCaption).value);
        element.attr('data-downloadCaption', document.getElementById(idElementEditForm.txtUploaderdownloadCaption).value);
        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);
        // Update event function attribute of element
        FgCommon.updateEventAttribute_EditPopUp(element);
        //Update validation group attribute of element
        FgCommon.updateValidationGroupAttribute_EditPopUp(element);
    }

    //delete Class
    static createDeleteClassDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtUploaderdeleteClass, element.attr("data-deleteClass"));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.fileUploaderDeleteClass, "fa fa-css3");
        return formGroup;
    }

    //download Class
    static createDownloadClassDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtUploaderdownloadClass, element.attr("data-downloadClass"));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.fileUploaderDownloadClass, "fa fa-css3");
        return formGroup;
    }

    //delete Caption
    static createDeleteCaptionDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtUploaderdeleteCaption, element.attr("data-deleteCaption"));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.fileUploaderDeleteCaption, "fa fa-css3");
        return formGroup;
    }

    //download Caption
    static createDownloadCaptionDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtUploaderdownloadCaption, element.attr("data-downloadCaption"));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.fileUploaderDownloadCaption, "fa fa-css3");
        return formGroup;
    }

    static createAllowSelectMulitiFilesDiv_EditPopUp(element) {
        let isChecked = element.prop("multiple");
        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.fileUploaderAllowSelectMulitiFiles, checked: isChecked, id: idElementEditForm.chkSelectMultipleFiles });
        let checkbox = FgCommon.createCustomOption(objCustomOption);
        var col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);
        col6.get(0).querySelector('input').onchange = (event) => {
            document.getElementById(idElementEditForm.class).value =
                event.target.checked ?
                document.getElementById(idElementEditForm.class).value.replace("form-control", "table") :
                document.getElementById(idElementEditForm.class).value.replace("table", "form-control");

        };
        return col6;
    }
}

export default FgFileUploaderEditModeConvertor