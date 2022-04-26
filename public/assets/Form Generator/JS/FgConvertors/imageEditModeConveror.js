'use strict'
import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";
import FgImageEditMode from "../FgElementsEditMode/imageEditMode.js"
import FgImage from "../FgElements/image.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgImageEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    toJQueryObject(fgImageElementEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgImageElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // image
        let fgImage = fgImageElementEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgImage);

        let imageJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgImageElementEditMode)
            .attr("width", fgImage.width)
            .attr("height", fgImage.height)
            .attr("src", fgImage.address)
            .attr("data-parameter", fgImage.parameter)
            .attr("data-fill", fgImage.fillBinding);

        FgCommon.setVisibilityCodeObjectToElement(imageJQueryObject, fgImage.expressionVisibilityCode);
        FgCommon.addEventsToElements(imageJQueryObject, fgImage.events);

        elementContainerJqObj.append(imageJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(imageElementContainer) {

        // Get fgElement
        let imageElement = FgUtilityConvertor.getFgElChild(imageElementContainer);

        if (FgUtilityConvertor.getFgElType(imageElement) !== FgImage.getType())
            console.error("The type of this element isn't IMAGE for converting.");

        let fgImage = FgImage.createImage(imageElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(imageElementContainer),
            imageElement.attr("width"),
            imageElement.attr("height"),
            imageElement.attr("class"),
            imageElement.attr("src"),
            imageElement.attr("data-fill"),
            FgCommon.getEventsFromElement(imageElement),
            FgCommon.getVisibilityCodeObjectFromElement(imageElement),
            imageElement.attr("data-parameter")
        );

        let imageEditMode = FgImageEditMode.createImage(fgImage,
            imageElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(imageElementContainer)
        );

        return imageEditMode;
    }

    // Fill setting pop up by FileUpload attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab) {
        var hideClassListName = Object.values(imageBootstrapTypeEnum);
        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element, hideClassListName)) // Class name
            .append(FgImageEditModeConvertor.createBootstrapClassNamesDiv_EditPopUp(element)) // Bootstrap image class name
            .append(FgImageEditModeConvertor.createWidthElementDiv_EditPopUp(element)) // Width element
            .append(FgImageEditModeConvertor.createHeightElementDiv_EditPopUp(element)) // Height element
            .append(FgImageEditModeConvertor.createSrcImageElementDiv_EditPopUp(element)) // Src element
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code

        //Create ID Txt
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        //bindingTab initialize
        bindingTab
            .append(FgCommon.createBindingFillTreeDiv_EditPopUp(element)); // Fill of element
        bindingTab.append(FgCommon.createBindingVariableParamsDiv_EditPopUp(element));//BindingVariable
        initCombooTree();
        var colsList = bindingTab.find('.col-sm-6,.col-sm-12');
        FgCommon.arrangeColsInFormGroupByColNumber(bindingTab, colsList, 1);

        //set ScriptTab
        scriptTab
            .append(FgCommon.createEventDiv_EditPopUp(element, eventType.click, lang.FG.eventTypeClick));
        var colsList = scriptTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(scriptTab, colsList, 1);
    }


    // Update Image Element atrributes
    updateElement_EditPopUp(element, type) {

        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update bootstrap class attribute of element
        // First we should apply update css
        FgImageEditModeConvertor.updateBootsrapClassNameElement_EditPopUp(element);

        // Update width of image
        FgImageEditModeConvertor.updateWidthElementAttributes_EditPopUp(element);

        // Update height of image
        FgImageEditModeConvertor.updateHeightElementAttributes_EditPopUp(element);

        // Update src of image
        FgImageEditModeConvertor.updateSrcImageElementAttributes_EditPopUp(element);

        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // Update event function attribute of element
        FgCommon.updateEventAttribute_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);
    }

    // Update src attribute of element in edit popup
    static updateSrcImageElementAttributes_EditPopUp(element) {
        var src = FgCommon.jq_getElementById(idElementEditForm.txtSrcImage).val();
        element.removeAttr("src");
        element.attr("src", src);
    }

    // Update width attribute of element in edit popup
    static updateHeightElementAttributes_EditPopUp(element) {
        var height = FgCommon.jq_getElementById(idElementEditForm.txtHeightElement).val();
        element.removeAttr("height");
        element.attr("height", height);
    }

    // Update width attribute of element in edit popup
    static updateWidthElementAttributes_EditPopUp(element) {
        var width = FgCommon.jq_getElementById(idElementEditForm.txtWidthElement).val();
        element.removeAttr("width");
        element.attr("width", width);
    }

    // Update html type of element in edit popup
    static updateBootsrapClassNameElement_EditPopUp(element) {
        if (element.attr("class")) {
            // Remove all bootstrap classes
            var elClass = element.attr("class").split(' ');
            if (elClass.length > 0)
                element.removeClass(elClass.filter(item => Object.values(imageBootstrapTypeEnum).includes(item)).join(' '));
        }
        // Add new bootstrap class
        var newClass = FgCommon.jq_getElementById(idElementEditForm.ddlElementClassNames).val();
        element.addClass(newClass);
    }

    // Create div for set src for image element
    static createSrcImageElementDiv_EditPopUp(element) {
        var srcImage = element.attr("src");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtSrcImage, srcImage);
        var col6 = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.imageSrc, "fa fa-location-arrow");
        // It's better to use col12 for src
        col6.removeClass("col-sm-6").addClass("col-sm-12");
        col6.find('input').css("direction", "ltr");

        return col6;
    }

    // Create div for set height for image element or like it
    static createHeightElementDiv_EditPopUp(element) {
        var heightElement = element.attr("height");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtHeightElement, heightElement);
        elementAttribute.attr("type", "number");
        elementAttribute.attr("min", "1");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.imageHeigth, "fa fa-text-height");
        return formGroup;
    }

    // Create div for set width for image element or like it
    static createWidthElementDiv_EditPopUp(element) {
        var widthElement = element.attr("width");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtWidthElement, widthElement);
        elementAttribute.attr("type", "number");
        elementAttribute.attr("min", "1");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.imageWidth, "fa fa-text-width");
        return formGroup;
    }

    // This method used for sub type of class for element
    static createBootstrapClassNamesDiv_EditPopUp(element) {
        var dropDownListId = idElementEditForm.ddlElementClassNames;
        var elementAttribute = FgCommon.createSubTypeHtmlElement(dropDownListId, Object.values(imageBootstrapTypeEnum));

        var classElement = element.attr("class");
        var selectedValue = "";
        if (classElement)
            selectedValue = classElement.split(' ').filter(item => Object.values(imageBootstrapTypeEnum).includes(item)).join(' ');
        // Set sub type
        if (selectedValue)
            elementAttribute.val(selectedValue);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.type, "fa fa-cog");
        return formGroup;
    }
}

// Bootstrap class names for image
var imageBootstrapTypeEnum = {
    rounded: "img-rounded",
    circle: "img-circle",
    thumbnail: "img-thumbnail",
    responsive: "img-responsive",
};

export default FgImageEditModeConvertor