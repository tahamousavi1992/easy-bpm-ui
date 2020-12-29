'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElements/fgElement.js";
import factory from "./fgElements/fgElements.js";
import FgElementEditModeConvertorFactory from "./FgConvertors/elementEditModeConvertorFactory.js";
import FgUtilityConvertor from "./FgConvertors/fgUtilityConvertor.js";
import lang from "../../JS/Languages/lang.js";
import FgCommon, { headerTagTypeEnum, eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "./FgCommon.js"

// This id is used for changing edit modal fg element
var editedElementId = "";

//this append a new column to a current row element
function addNewColumn(target) {
    var type1 = new FG_ElementType(FG_ElementTypeEnum.COLUMN, getCssClassColumn('4'));
    var el = new FG_Element(type1)
    $(target).closest('.fg-el-container').find('[fg_element_type="ROW"]').append(el.html);
}

function getRawElementContainer(type) {

    // Container
    let rawElementContainer = $(document.createElement("div")).addClass('fg-el-container');

    // Add Toolbar
    addToolbarButtons(rawElementContainer, type.valueType);

    // Add Placeholder
    let elementPlaceholder = $(document.createElement("div")).addClass('fg-el-placeholder');
    rawElementContainer.append(elementPlaceholder);

    return rawElementContainer;
}

//#region FG_Element class
function FG_Element(FG_ElementType) {
    this.type = FG_ElementType;
    this.id = generateId(FgCommon.getEnumKey(FG_ElementTypeEnum, this.type.valueType)); // Generate id by type and random number
    this.html = generateHtmlElement(this.type, this.id);
}

// Get FG_Element id
FG_Element.prototype.getId = function () {
    return this.id;
};

FG_Element.prototype.getFromHtml = function (htmlElement) {
    let elementType = $(htmlElement).attr('fg_element_type');
    this.id = $(htmlElement).attr('id');
    this.type = new FG_ElementType(elementType);

};

function generateHtmlElement(type, id) {

    var elements = {
        'default': 'undefined'
    };

    // Container
    let fgElementContainer = getRawElementContainer(type);
    var fgElementPlaceholder = fgElementContainer.find('.fg-el-placeholder');

    elements[FG_ElementTypeEnum.ROW] = generateRowElement;
    elements[FG_ElementTypeEnum.ACCORDION] = generateAccordionElement;
    elements[FG_ElementTypeEnum.CARD] = generateCardElement;
    elements[FG_ElementTypeEnum.COLUMN] = generateColumnElement;
    elements[FG_ElementTypeEnum.BUTTON] = generateButtonElement;
    elements[FG_ElementTypeEnum.TEXTBOX] = generateTextBoxElement;
    elements[FG_ElementTypeEnum.DROPDOWNLIST] = generateDropDownListElement;
    elements[FG_ElementTypeEnum.COMBOSEARCH] = generateComboSearchElement;
    elements[FG_ElementTypeEnum.RADIOBUTTONLIST] = generateRadioButtonListElement;
    elements[FG_ElementTypeEnum.CHECKBOXLIST] = generateCheckboxListElement;
    elements[FG_ElementTypeEnum.CHECKBOX] = generateCheckboxElement;
    elements[FG_ElementTypeEnum.FILEUPLOAD] = generateFileUploadElement;
    elements[FG_ElementTypeEnum.IMAGE] = generateImageElement;
    elements[FG_ElementTypeEnum.LINK] = generateLinkElement;
    elements[FG_ElementTypeEnum.CAPTCHA] = generateCaptchaGoogleElement;
    elements[FG_ElementTypeEnum.WORDCAPTCHA] = generateCaptchaWordElement;
    elements[FG_ElementTypeEnum.TITLE] = generateTitleElement;
    elements[FG_ElementTypeEnum.DATEPICKER] = generateDatePickerElement;
    elements[FG_ElementTypeEnum.CKEDITOR] = generateCkEditorElement;
    elements[FG_ElementTypeEnum.HTMLCODE] = generateHtmlCodeElement;
    elements[FG_ElementTypeEnum.DOWNLOADLINK] = generateDownloadLinkElement;
    elements[FG_ElementTypeEnum.DATAGRID] = generateDataGridElement;
    elements[FG_ElementTypeEnum.FORM] = generateFormElement;
    elements[FG_ElementTypeEnum.CHART] = generateChartElement;
    return (elements[type.valueType](fgElementContainer, fgElementPlaceholder, type, id) || elements['default'](type, id));
}

function generateChartElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    var newChartAtrr = new elementAttributes(htmlElementType.div, "row panel panel-default", elementId, "", lang.FG.chart);
    newChartAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CHART);
    // Create new  
    var formElement = FgCommon.createNewChild(newChartAtrr);

    if (formElement != 'undefind') {
        formElement.append('<div class="panel-body" style="min-height: 31px;"></div>');
        fgElementPlaceholder.append(formElement);
    }
    else
        console.error('Chart Element is undefind');

    fgElementPlaceholder.prepend($(document.createElement("label")).addClass("fg-Label-element").text(lang.FG.newChart));
    return fgElementContainer;
}

function generateFormElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    var newFormAtrr = new elementAttributes(htmlElementType.div, "", elementId, "", lang.FG.form);

    newFormAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.FORM);

    // Create new  
    var formElement = FgCommon.createNewChild(newFormAtrr);

    if (formElement != 'undefind') {
        formElement.append('<div class="panel-body" style="min-height: 31px;"></div>');
        fgElementPlaceholder.append(formElement);
    }
    else
        console.error('Form Element is undefind');

    fgElementPlaceholder.prepend($(document.createElement("label")).addClass("fg-Label-element").text(lang.FG.newForm));
    return fgElementContainer;
}

function generateCardElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    // generate new card
    var newCardAtrr = new elementAttributes(htmlElementType.div, "row-fluid clearfix form-row", elementId);
    newCardAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CARD);
    //Get row element
    let fgElement = FgCommon.createNewChild(newCardAtrr);

    fgElementPlaceholder.append(fgElement);
    fgElementContainer.addClass("cardElementContent");
    // This code makes columns of row sortable
    fgElement.sortable({
        connectWith: "#content,[fg_element_type =\"CARD\"]",
    });
    return fgElementContainer;
}

function generateAccordionElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    //generate new accordion
    var newAccordionAtrr = new elementAttributes(htmlElementType.div, "row-fluid clearfix form-row accordion  accordion-toggle-arrow", elementId);
    newAccordionAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.ACCORDION);
    //Get row element
    let fgElement = FgCommon.createNewChild(newAccordionAtrr);

    fgElementPlaceholder.append(fgElement);
    fgElementContainer.addClass("accordionElementContent");
    // This code makes columns of row sortable
    fgElement.sortable();
    return fgElementContainer;
}

function generateRowElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    var newRowAtrr = new elementAttributes(htmlElementType.div, "row-fluid clearfix row form-row", elementId);
    newRowAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.ROW);
    //Get row element
    let fgElement = FgCommon.createNewChild(newRowAtrr);
    // Check subType for generate columns of row
    // Get number of column
    if (type.subType != "undefined")
        generateColumns1(type.subType, fgElement);
    fgElementPlaceholder.append(fgElement);
    fgElementContainer.addClass("rowElementContent");
    // This code makes columns of row sortable
    fgElement.sortable();
    return fgElementContainer;
}

function generateColumnElement(fgElementContainer, fgElementPlaceholder, type, elementId) {

    //fgElementContainer.addClass("fg-column");

    var newColumnAtrr = new elementAttributes(htmlElementType.div, "fg-column column clearfix", elementId);
    newColumnAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.COLUMN);
    // Create new column element
    let columnElement = FgCommon.createNewChild(newColumnAtrr);

    fgElementPlaceholder.append(columnElement);

    // Calling sortable method to setting sortable in order to column children
    // Unfortunately we can't call this method before creating column element
    // So we need method below for doing that after creating it.
    callSortableForColOfRow(columnElement);

    // Add type.subType class to parrent for showing column in right position
    fgElementContainer.addClass(type.subType);

    return fgElementContainer;
}

function generateButtonElement(fgElementContainer, fgElementPlaceholder, type, elementId) {

    var newButtonAtrr = new elementAttributes(htmlElementType.button, "align-btn-end btn btn-success", elementId, lang.FG.newButton);
    newButtonAtrr.htmlSubType = FgCommon.getEnumKey(buttonTypeEnum, buttonTypeEnum.button);
    newButtonAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.BUTTON);

    // Create new button
    var buttonElement = FgCommon.createNewChild(newButtonAtrr);
    if (buttonElement != 'undefind')
        fgElementPlaceholder.append(buttonElement);
    else
        console.error('buttonElement in addButton is undefind');

    return fgElementContainer;
}

function generateTextBoxElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    var newTextBoxAtrr = new elementAttributes(htmlElementType.input, "form-control", elementId);
    newTextBoxAtrr.htmlSubType = FgCommon.getEnumKey(textBoxTypeEnum, textBoxTypeEnum.text);
    newTextBoxAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.TEXTBOX);

    // Create new TextBox
    let fgElement = FgCommon.createNewChild(newTextBoxAtrr);
    if (fgElement != 'undefind')
        fgElementPlaceholder.append(fgElement);
    else
        console.error('textBoxElement in addTextBox is undefind');

    addRawDivInputGroup(fgElementPlaceholder, fgElement, lang.FG.newInput, "fa fa-hashtag");
    return fgElementContainer;
}

// First: Createing a div with InputGroup class that named divInputGroup
// Secound: Appending label of element
// Third: Appending fgElemet to divInputGroup and after that appending divInputGroup to fgElementPlaceholder
function addRawDivInputGroup(placeholder, fgElement, elementLabel, fontIcon) {

    // Add this block code for icon
    // First add a div with input-group class 
    // Second add span with input-group-prepend     <div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">#</span></div>
    let divInputGroup = fontIcon == null ? $(document.createElement("div")).addClass("input-group") :
        $(document.createElement("div")).addClass("input-group")
            .append($(document.createElement("div")).addClass("input-group-prepend")
                .append($(document.createElement("span")).addClass("input-group-text")
                    .append($(document.createElement("i")).addClass(fontIcon))));

    // Add label for textbox    
    placeholder.append($(document.createElement("label")).addClass("fg-Label-element").text(elementLabel));

    // Apending fgElement
    divInputGroup.append(fgElement);

    // Appending divInputGroup to fgElementPlaceholder
    placeholder.append(divInputGroup);
}

function generateComboSearchElement(fgElementContainer, fgElementPlaceholder, type, elementId) {

    var newComboSearchAtrr = new elementAttributes(htmlElementType.select, "form-control", elementId);
    newComboSearchAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.COMBOSEARCH);

    // Create new TextBox
    var fgElement = FgCommon.createNewChild(newComboSearchAtrr);
    if (fgElement != 'undefind') {
        fgElementPlaceholder.append(fgElement);
    }
    else
        console.error('comboSearchElement in addComboSearch is undefind');

    addRawDivInputGroup(fgElementPlaceholder, fgElement, lang.FG.newComboSearch, "fa fa-check");

    return fgElementContainer;
}

function generateDropDownListElement(fgElementContainer, fgElementPlaceholder, type, elementId) {

    var newDropDownListAtrr = new elementAttributes(htmlElementType.select, "form-control", elementId);
    newDropDownListAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.DROPDOWNLIST);

    // Create new TextBox
    var fgElement = FgCommon.createNewChild(newDropDownListAtrr);
    if (fgElement != 'undefind') {
        fgElementPlaceholder.append(fgElement);

        // Add two options for default        
        FgCommon.createOptionForDropDownElement(fgElement, lang.FG.ListItemOne, "1");
        FgCommon.createOptionForDropDownElement(fgElement, lang.FG.ListItemTwo, "2");
    }
    else
        console.error('dropDownListElement in   is undefind');

    addRawDivInputGroup(fgElementPlaceholder, fgElement, lang.FG.newDropDown, "fa fa-check");

    return fgElementContainer;
}

function generateRadioButtonListElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    fgElementPlaceholder.append($(document.createElement("label")).addClass("fg-Label-element").text(lang.FG.newRadionButtonList));

    var newRadioButtonListAtrr = new elementAttributes();
    newRadioButtonListAtrr.htmlType = htmlElementType.div;
    newRadioButtonListAtrr.id = elementId;
    newRadioButtonListAtrr.cssClass = "radio-list";
    newRadioButtonListAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.RADIOBUTTONLIST);

    // Create new radioButtonList
    var fgElement = FgCommon.createNewChild(newRadioButtonListAtrr);
    if (fgElement != 'undefind') {
        fgElementPlaceholder.append(fgElement);

        fgElement.append(FgCommon.createCustomOption([
            new customOption({ type: inputTypeEnum.radio, text: lang.FG.RadioItemOne, value: 1, checked: true }),
            new customOption({ type: inputTypeEnum.radio, text: lang.FG.RadioItemTwo, value: 2 })
        ]));
        fgElement.find('div')[0].className = fgElement.get(0).className;
    }
    else
        console.error('radioButtonListElement in addRadioButtonList is undefind');

    return fgElementContainer;
}

function generateCheckboxListElement(fgElementContainer, fgElementPlaceholder, type, elementId) {

    fgElementPlaceholder.append($(document.createElement("label")).addClass("fg-Label-element").text(lang.FG.newCheckBoxList));

    var newCheckBoxListAtrr = new elementAttributes();
    newCheckBoxListAtrr.htmlType = htmlElementType.div;
    newCheckBoxListAtrr.id = elementId;
    newCheckBoxListAtrr.cssClass = "checkbox-list";
    newCheckBoxListAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CHECKBOXLIST);

    // Create new radioButtonList 
    var fgElement = FgCommon.createNewChild(newCheckBoxListAtrr);
    if (fgElement != 'undefind') {
        fgElementPlaceholder.append(fgElement);
        // true argument use for checked option
        fgElement.append(FgCommon.createCustomOption([
            new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.RadioItemOne, value: 1, checked: true }),
            new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.RadioItemTwo, value: 2 })
        ]));
        fgElement.find('div')[0].className = fgElement.get(0).className;
    }
    else
        console.error('radioButtonListElement in addRadioButtonList is undefind');

    return fgElementContainer;
}

function generateCheckboxElement(fgElementContainer, fgElementPlaceholder, type, elementId) {

    fgElementPlaceholder.append($(document.createElement("label")).addClass("fg-Label-element").text(lang.FG.newCheckBox));

    var newCheckBoxAtrr = new elementAttributes();
    newCheckBoxAtrr.htmlType = htmlElementType.div;
    newCheckBoxAtrr.id = elementId;
    newCheckBoxAtrr.cssClass = "checkbox-list";
    newCheckBoxAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CHECKBOX);

    var fgElement = FgCommon.createNewChild(newCheckBoxAtrr);
    if (fgElement != 'undefind') {
        fgElementPlaceholder.append(fgElement);
        // true argument use for checked option
        fgElement.append(FgCommon.createCustomOption(new customOption({ type: inputTypeEnum.checkbox, text: "", value: true })));
        fgElement.find('div')[0].className = fgElement.get(0).className;
    }
    else
        console.error('element is undefind');

    return fgElementContainer;
}

function generateFileUploadElement(fgElementContainer, fgElementPlaceholder, type, elementId) {

    var newfileUploadAtrr = new elementAttributes(htmlElementType.input, "form-control", elementId);
    newfileUploadAtrr.htmlSubType = FgCommon.getEnumKey(inputTypeEnum, inputTypeEnum.file);
    newfileUploadAtrr.style = "display:none";
    newfileUploadAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.FILEUPLOAD);

    // Create new TextBox
    var fgElement = FgCommon.createNewChild(newfileUploadAtrr);

    fgElement.attr('data-deleteClass', 'btn btn-sm btn-clean btn-icon btn-icon-md');
    fgElement.attr('data-downloadClass', 'btn btn-sm btn-clean btn-icon btn-icon-md');
    fgElement.attr('data-deleteCaption', '<span class="svg-icon svg-icon-md"><i class="fad fa-times"></i></span>');
    fgElement.attr('data-downloadCaption', '<span class="svg-icon svg-icon-md"><i class="fad fa-download"></i></span>');

    if (fgElement != 'undefind') {
        fgElementPlaceholder.append(fgElement);

        addRawDivInputGroup(fgElementPlaceholder, fgElement, lang.FG.newFileUpload, "fa fa-upload");

        fgElement.on('change', function (e) {
            //do whatever you want
            if ($(this).attr("accept")) {
                var files = e.target.files;
                var validFiles = Object.values(e.target.files).filter((_item) => $(this).attr("accept").split(",").filter(item => item.split('/')[0] === _item.type.split('/')[0]).length > 0);
                if (validFiles.length < files.length) {
                    alert(lang.FG.notPermittedFiles);
                    $(this).fgElementPlaceholder().find('input[type=text]').val("");
                    $(this).val('');
                }
            }
        });

        // input for display UploadFile file name
        // This input used for open UploadFile dialog by clicking on it.
        var newTextBoxAtrr = new elementAttributes(htmlElementType.input, "form-control file-upload");
        newTextBoxAtrr.htmlSubType = FgCommon.getEnumKey(inputTypeEnum, inputTypeEnum.text);
        //newTextBoxAtrr.style = "cursor: pointer;";
        // Create new TextBox
        var textBoxElement = FgCommon.createNewChild(newTextBoxAtrr)
            .prop("readonly", "readonly")
            .val(lang.FG.pickFile);


        fgElementPlaceholder.find('.input-group').append(textBoxElement);
    }
    else
        console.error('fileUploadElement in addFileUpload is undefind');


    return fgElementContainer;
}

function generateImageElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    var newButtonAtrr = new elementAttributes(htmlElementType.img, "img-rounded", elementId, lang.FG.newImage);
    newButtonAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.IMAGE);

    // Create new image
    var buttonElement = FgCommon.createNewChild(newButtonAtrr);
    if (buttonElement != 'undefind') {
        buttonElement.attr('src', '/DesktopModules/MVC/DynamicBusiness.Bpms/Resources/assets/Images/image_background.jpg');
        fgElementPlaceholder.append(buttonElement);
    }
    else
        console.error('buttonElement in addButton is undefind');

    return fgElementContainer;
}

function generateDataGridElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    fgElementPlaceholder.append($(document.createElement("label")).addClass("fg-Label-element").text(lang.FG.newDataGrid));

    let newDataGridAtrr = new elementAttributes(htmlElementType.table, "table", elementId, lang.FG.newDataGrid, lang.FG.dataGrid);
    newDataGridAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.DATAGRID);

    // Create new button
    let dataGrigElement = FgCommon.createNewChild(newDataGridAtrr);
    dataGrigElement.attr('data-columnsetting', `[{"id":"7831","name":"${lang.FG.dataGridFirstColumn}","className":"","template":"","order":"","sortColumn":"","showInReport":false},{"id":"5859","name":"${lang.FG.dataGridSecondColumn}","className":"","template":"","order":"","sortColumn":"","showInReport":false}]`);
    dataGrigElement.html(`<thead><tr><th>${lang.FG.dataGridFirstColumn}</th><th>${lang.FG.dataGridSecondColumn}</th> </tr> </thead><tbody></tbody>`);

    if (dataGrigElement != 'undefind') {
        fgElementPlaceholder.append($('<div class="table-information table-responsive"></div>').append(dataGrigElement));
    }
    else
        console.error('dataGridElement is undefind');

    return fgElementContainer;
}

function generateDownloadLinkElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    var newDownloadLinkId = generateId(FgCommon.getEnumKey(FG_ElementTypeEnum, FG_ElementTypeEnum.DOWNLOADLINK));
    var newLinkAtrr = new elementAttributes(htmlElementType.a, "btn btn-link", elementId, lang.FG.newDownloadLink, lang.FG.downloadLink);
    newLinkAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.DOWNLOADLINK);

    // Create new button
    var fgElement = FgCommon.createNewChild(newLinkAtrr);
    fgElement.attr("href", "#");
    if (fgElement != 'undefind') {
        fgElementPlaceholder.append(fgElement);
    }
    else
        console.error('buttonElement in addButton is undefind');

    addRawDivInputGroup(fgElementPlaceholder, fgElement, '', null);

    return fgElementContainer;
}

function generateLinkElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    var newLinkId = generateId(FgCommon.getEnumKey(FG_ElementTypeEnum, FG_ElementTypeEnum.LINK));
    var newLinkAtrr = new elementAttributes(htmlElementType.a, "btn btn-link", elementId, lang.FG.newLink, lang.FG.link);
    newLinkAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.LINK);

    // Create new button
    var linkElement = FgCommon.createNewChild(newLinkAtrr);
    linkElement.attr("href", "http://your-site-url-put-here.com/");
    if (linkElement != 'undefind') {
        fgElementPlaceholder.append(linkElement);
    }
    else
        console.error('buttonElement in addButton is undefind');

    return fgElementContainer;
}

function generateCaptchaGoogleElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    // Add new captcha
    let defaultSiteKey = '6LeLzA4UAAAAANNRnB8kePzikGgmZ53aWQiruo6O';
    let newCaptchaAtrr = new elementAttributes();
    newCaptchaAtrr.htmlType = htmlElementType.div;
    newCaptchaAtrr.id = elementId;
    newCaptchaAtrr.cssClass = "google-cpatcha";
    newCaptchaAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CAPTCHA);

    // Create new captcha
    var captchaElement = FgCommon.createNewChild(newCaptchaAtrr);

    fgElementPlaceholder.append(captchaElement);
    setTimeout(function () {
        grecaptcha.render(elementId, {
            'theme': "dark",
            'sitekey': defaultSiteKey
        });
    }, 10);
    captchaElement.attr("data-sitekey", defaultSiteKey);
    captchaElement.attr("data-privatekey", '');

    return fgElementContainer;
}

function generateCaptchaWordElement(fgElementContainer, fgElementPlaceholder, type, elementId) {
    // Add new captcha
    var newDivAtrr = new elementAttributes(htmlElementType.div, "", elementId, lang.FG.newWordCaptcha);
    newDivAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.WORDCAPTCHA);

    // Create new captcha
    var divElement = FgCommon.createNewChild(newDivAtrr);
    if (divElement != 'undefind') {
        divElement.html(`<img src="${window["CaptchaUrl"]}?key=${elementId}" data-captcha="true" />
<div class='input-group'>
<div class="input-group-prepend">
<span class="input-group-text"><a href="javascript:;" class="refresh-captcha"><i class="fa fa-refresh"></i></a></span>
</div>
<input name="${elementId}" class="form-control" type="text"/></div>`);
        fgElementPlaceholder.append(divElement);
    }
    else
        console.error('divElement is undefind');

    return fgElementContainer;
}

function generateTitleElement(fgElementContainer, fgElementPlaceholder, type, elementId) {

    var newTitleAtrr = new elementAttributes(htmlElementType.h);
    newTitleAtrr.id = elementId;
    newTitleAtrr.text = lang.FG.newTitle;
    newTitleAtrr.htmlSubType = headerTagTypeEnum.h1;
    newTitleAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.TITLE);

    // Create new title
    var titleElement = FgCommon.createNewChild(newTitleAtrr);
    if (titleElement != 'undefind') {
        fgElementPlaceholder.append(titleElement);
    }
    else
        console.error('buttonElement in addButton is undefind');

    return fgElementContainer;
}

function generateDatePickerElement(fgElementContainer, fgElementPlaceholder, type, elementId) {

    var newTextBoxAtrr = new elementAttributes(htmlElementType.input, "form-control", elementId);
    newTextBoxAtrr.htmlSubType = FgCommon.getEnumKey(textBoxTypeEnum, textBoxTypeEnum.text);
    newTextBoxAtrr.fg_ElementType = FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.DATEPICKER);

    // Create new TextBox
    let fgElement = FgCommon.createNewChild(newTextBoxAtrr);
    if (fgElement != 'undefind') {
        fgElement.attr('data-showtype', 'date');
        fgElement.attr('data-dateformat', 'yyyy/mm/dd');
        fgElementPlaceholder.append(fgElement);
    }
    else
        console.error('DatePicker in addDatePicker is undefind');

    addRawDivInputGroup(fgElementPlaceholder, fgElement, lang.FG.newDatePicker, "fa fa-clock");
    return fgElementContainer;
}

function generateCkEditorElement(fgElementContainer, fgElementPlaceholder, type, elementId) {

    var newCkeditor = $(document.createElement('textarea'));
    // fg_element_type
    newCkeditor.attr("fg_element_type", FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CKEDITOR));

    newCkeditor.attr("id", elementId);
    newCkeditor.addClass("myCkeditor");
     
    addRawDivInputGroup(fgElementPlaceholder, newCkeditor, lang.FG.newCkeditor, null);
    return fgElementContainer;
}

function generateHtmlCodeElement(fgElementContainer, fgElementPlaceholder, type, elementId) {

    // Add html element

    var newHtmlCodeAtrr = new elementAttributes();
    newHtmlCodeAtrr.id = elementId;
    newHtmlCodeAtrr.htmlType = htmlElementType.div;
    newHtmlCodeAtrr.text = lang.FG.defaultContentHtmlCode;

    // Create new HtmlCode
    var htmlCodeElement = FgCommon.createNewChild(newHtmlCodeAtrr);
    htmlCodeElement.attr("fg_element_type", FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.HTMLCODE));
    if (htmlCodeElement != 'undefind') {
        fgElementPlaceholder.append(htmlCodeElement);
    }
    else
        console.error('htmlCodeElement in   is undefind');

    return fgElementContainer;
}

function generateColumns1(subType, parent) {
    var columns = subType.split('-');
    for (var i = 0; i < columns.length; i++) {
        var cssClass = getCssClassColumn(columns[i]);
        // Add column element
        var typeEnum = FG_ElementTypeEnum.COLUMN;
        var type1 = new FG_ElementType(typeEnum, cssClass);
        var el = new FG_Element(type1);
        //$col = el.html;
        let col = el.html;
        parent.append(col);
    }
}

// Get column class
function getCssClassColumn(type) {
    var cssClasses = {
        '12': 'col-sm-12',
        '6': 'col-sm-6',
        '4': 'col-sm-4',
        'default': 'col-sm-12'
    };
    return (cssClasses[type] || cssClasses['default']);
}

// add toolbar buttons
function addToolbarButtons(parent, type) {
    var toolBarDiv = $(document.createElement("div")).addClass("toolbarElement");
    parent.append(toolBarDiv);

    var editButton = $(document.createElement("a"))
        .addClass("editElement label")
        .html('<i class="fa fa-pencil-square-o" aria-hidden="true"></i>');
    var removeButton = $(document.createElement("a"))
        .addClass("fg-delete-element label label-important")
        .html('<i class="fa fa-trash-o" aria-hidden="true"></i>');

    if (FG_ElementTypeEnum.ROW == type) {
        var addButton = $(document.createElement("a"))
            .addClass("fg-add-column addNewElement label label-important")
            .html('<i class="fa fa-columns" aria-hidden="true"></i>');
        toolBarDiv.append(addButton);
    }

    if (FG_ElementTypeEnum.ACCORDION == type) {
        var addButton = $(document.createElement("a"))
            .addClass("fg-add-card addNewElement label label-important")
            .html('<i class="fa fa-square-o" aria-hidden="true"></i>');
        toolBarDiv.append(addButton);
    }

    if (FG_ElementTypeEnum.CARD == type) {
        var addButton = $(document.createElement("a"))
            .addClass("fg-add-row addNewElement label label-important")
            .html('<i class="fa fa-align-justify" aria-hidden="true"></i>');
        toolBarDiv.append(addButton);
    }

    toolBarDiv.append(editButton);
    toolBarDiv.append(removeButton);
}

//#endregion FG_Element class


//#region FG_ElementType class
function FG_ElementType(valueType, subType) {
    this.valueType = valueType;
    this.subType = subType;
}

// Get FG_ElementType name
FG_ElementType.prototype.getName = function () {
    return this.name;
};

//#endregion FG_ElementType class

//#endregion Public methods

//#region generate element Id

function generateId(type) {
    var id = type + randomNumber();
    return id;
}

function randomNumber() {
    return randomFromInterval(1, 1e6);
}

function randomFromInterval(e, t) {
    return Math.floor(Math.random() * (t - e + 1) + e);
}

//#endregion generate element Id

//#region html

function callSortableForColOfRow(col) {
    col.sortable({
        cursor: "move",
        connectWith: ".fg-column",
        // This method used like drop in droppable but have following different 
        // drop: has ui.helper but stop: has ui.item
        stop: function (event, ui) {
            let item = $(ui.item);
            // For fit to parent when drop
            item.attr("style", "");
            item.removeClass('whenDrag');
            if (item.find('[fg_element_type="DATEPICKER"]').length > 0)
                window.initialDatePicker();
            window.initCkeditor();
        }
    }).disableSelection();
}

function callDraggableForElementNew(typeEnum) {
    // Get element class name by FG_ElementType
    var className = generateClassNameElement(typeEnum);
    if (className != 'undefined') {
        var draggableElement = $("." + className);
        draggableElement.draggable({
            connectToSortable: '.fg-column',
            containment: '#content',
            cursor: 'move',
            helper: helperMethod(typeEnum),
            revert: false,
            start: function (event, ui) {
                $(ui.helper).addClass("whenDrag");
            },

        });
    }
    else {
        console.error('class name in callDraggableForElement is undefined.')
    }
}

function helperMethod(typeEnum) {
    var elements = {};
    elements[FG_ElementTypeEnum.ROW] = 'clone';
    elements[FG_ElementTypeEnum.BUTTON] = addNewButton;
    elements[FG_ElementTypeEnum.TEXTBOX] = addNewTextBox;
    elements[FG_ElementTypeEnum.DROPDOWNLIST] = addNewDropDownList;
    elements[FG_ElementTypeEnum.COMBOSEARCH] = addComboSearchDashboard;
    elements[FG_ElementTypeEnum.RADIOBUTTONLIST] = addRadioButtonListDashboard;
    elements[FG_ElementTypeEnum.CHECKBOXLIST] = addCheckBoxListDashboard;
    elements[FG_ElementTypeEnum.CHECKBOX] = addCheckBoxDashboard;
    elements[FG_ElementTypeEnum.FILEUPLOAD] = addFileUploadDashboard;
    elements[FG_ElementTypeEnum.IMAGE] = addImageDashboard;
    elements[FG_ElementTypeEnum.LINK] = addLinkDashboard;
    elements[FG_ElementTypeEnum.CAPTCHA] = addCaptchaGoogleDashboard;
    elements[FG_ElementTypeEnum.WORDCAPTCHA] = addCaptchaWordDashboard;
    elements[FG_ElementTypeEnum.TITLE] = addTitleDashboard;
    elements[FG_ElementTypeEnum.DATEPICKER] = addDatePickerDashboard;
    elements[FG_ElementTypeEnum.CKEDITOR] = addCkeditorDashboard;
    elements[FG_ElementTypeEnum.HTMLCODE] = addHtmlCodeDashboard;
    elements[FG_ElementTypeEnum.DOWNLOADLINK] = addDownloadLinkDashboard;
    elements[FG_ElementTypeEnum.DATAGRID] = addDataGridDashboard;
    elements[FG_ElementTypeEnum.FORM] = addFormDashboard;
    elements[FG_ElementTypeEnum.CHART] = addChartDashboard;
    return (elements[typeEnum]);
}

function addChartDashboard() {
    var typeEnum = FG_ElementTypeEnum.CHART;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addDataGridDashboard() {
    var typeEnum = FG_ElementTypeEnum.DATAGRID;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addFormDashboard() {
    var typeEnum = FG_ElementTypeEnum.FORM;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addDownloadLinkDashboard() {
    var typeEnum = FG_ElementTypeEnum.DOWNLOADLINK;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addHtmlCodeDashboard() {
    var typeEnum = FG_ElementTypeEnum.HTMLCODE;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addCkeditorDashboard() {
    var typeEnum = FG_ElementTypeEnum.CKEDITOR;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addDatePickerDashboard() {
    var typeEnum = FG_ElementTypeEnum.DATEPICKER;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addTitleDashboard() {
    var typeEnum = FG_ElementTypeEnum.TITLE;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addCaptchaGoogleDashboard() {
    var typeEnum = FG_ElementTypeEnum.CAPTCHA;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addCaptchaWordDashboard() {
    var typeEnum = FG_ElementTypeEnum.WORDCAPTCHA;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}


function addLinkDashboard() {
    var typeEnum = FG_ElementTypeEnum.LINK;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addImageDashboard() {
    var typeEnum = FG_ElementTypeEnum.IMAGE;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addFileUploadDashboard() {
    var typeEnum = FG_ElementTypeEnum.FILEUPLOAD;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addCheckBoxListDashboard() {
    var typeEnum = FG_ElementTypeEnum.CHECKBOXLIST;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addCheckBoxDashboard() {
    var typeEnum = FG_ElementTypeEnum.CHECKBOX;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addNewButton() {
    var typeEnum = FG_ElementTypeEnum.BUTTON;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addNewTextBox() {
    var typeEnum = FG_ElementTypeEnum.TEXTBOX;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1);
    return el.html;
}

function addNewDropDownList() {
    var typeEnum = FG_ElementTypeEnum.DROPDOWNLIST;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1)
    return el.html;
}

function addComboSearchDashboard() {
    var typeEnum = FG_ElementTypeEnum.COMBOSEARCH;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1)
    return el.html;
}

function addRadioButtonListDashboard() {
    var typeEnum = FG_ElementTypeEnum.RADIOBUTTONLIST;
    var type1 = new FG_ElementType(typeEnum);
    var el = new FG_Element(type1)
    return el.html;
}

function generateClassNameElement(type) {
    var elements = {
        'default': 'undefined'
    };
    elements[FG_ElementTypeEnum.ROW] = 'rowDashboard';
    elements[FG_ElementTypeEnum.ACCORDION] = 'accordionDashboard';
    elements[FG_ElementTypeEnum.CARD] = 'cardDashboard';
    elements[FG_ElementTypeEnum.BUTTON] = 'buttonDashboard';
    elements[FG_ElementTypeEnum.TEXTBOX] = 'inputDashboard';
    elements[FG_ElementTypeEnum.DROPDOWNLIST] = 'dropDownListDashboard';
    elements[FG_ElementTypeEnum.COMBOSEARCH] = 'comboSearchDashboard';
    elements[FG_ElementTypeEnum.RADIOBUTTONLIST] = 'radioButtonListDashboard';
    elements[FG_ElementTypeEnum.CHECKBOXLIST] = 'checkBoxListDashboard';
    elements[FG_ElementTypeEnum.CHECKBOX] = 'checkBoxDashboard';
    elements[FG_ElementTypeEnum.FILEUPLOAD] = 'fileUploaderDashboard';
    elements[FG_ElementTypeEnum.IMAGE] = 'imageDashboard';
    elements[FG_ElementTypeEnum.LINK] = 'linkDashboard';
    elements[FG_ElementTypeEnum.CAPTCHA] = 'captchaGoogleDashboard';
    elements[FG_ElementTypeEnum.WORDCAPTCHA] = 'captchaWordDashboard';
    elements[FG_ElementTypeEnum.TITLE] = 'titleDashboard';
    elements[FG_ElementTypeEnum.DATEPICKER] = 'datePickerDashboard';
    elements[FG_ElementTypeEnum.CKEDITOR] = 'ckEditorDashboard';
    elements[FG_ElementTypeEnum.HTMLCODE] = 'htmlCodeDashboard';
    elements[FG_ElementTypeEnum.DOWNLOADLINK] = 'downloadLinkDashboard';
    elements[FG_ElementTypeEnum.DATAGRID] = 'dataGridDashboard';
    elements[FG_ElementTypeEnum.FORM] = 'dataFormDashboard';
    elements[FG_ElementTypeEnum.CHART] = 'chartDashboard';
    return (elements[type] || elements['default']);
}
//#endregion draggable and droppable


// #endregion

// region editPopup
// This method used for showing edit pop up an get attributes
function fillEditPopupFileds(elementId, type) {
    let fgElementEditModeConvertor = FgElementEditModeConvertorFactory.toCreateByType(type.valueType);
    // Save edited element id
    // editedElementId definded in Main.ascx
    editedElementId = elementId;

    var element = $('#' + elementId);

    var modal = $('#settingElementPopUp');

    // Get modabody for filling
    var modalBody = modal.find('.modal-body .form');

    // Clear modalBody and reset
    modalBody.html("");

    // Tabs Panel
    var parentForAppend = createDefaultTabPanel_EditPopUp();
    modalBody.append(parentForAppend);

    // Load setting
    var baseSettingTab = parentForAppend.find('#baseSettingTab');
    var bindingTab = parentForAppend.find('#' + idElementEditForm.bindingTab);
    var coddingTab = parentForAppend.find('#' + idElementEditForm.coddingTab);
    var scriptTab = parentForAppend.find('#' + idElementEditForm.scriptTab);
    var customIconFontSettingTab = FgCommon.jq_getElementById(idElementEditForm.customIconFontSettingTab);

    fgElementEditModeConvertor.generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab);

    // Code below removes the sections that have any childs.
    let tabpanellinks = modalBody.find('.editPopUp-tabpanel');

    removeTabPanel(tabpanellinks, baseSettingTab);

    removeTabPanel(tabpanellinks, customIconFontSettingTab);
    removeTabPanel(tabpanellinks, bindingTab);
    removeTabPanel(tabpanellinks, coddingTab);
    removeTabPanel(tabpanellinks, scriptTab);

    let tabContainer = modalBody.find(".tab-content");
    if (tabContainer.children().length == 0)
        tabContainer.closest('.editPopUp-tabpanel').remove();

    // Show modal
    modal.modal({ backdrop: "static", show: true });
    window.initialFunctions('');
}

function removeTabPanel(tabpanellinks, settingTab) {
    if (settingTab.children().length == 0) {
        tabpanellinks.find('[href="#' + settingTab.attr("id") + '"]').parent().remove();
        settingTab.remove();
    }
}


// Create tabs panel for edit pop up
function createDefaultTabPanel_EditPopUp() {

    var baseSettingTab = new BootstrapTab(lang.FG.baseSettingTab, "#baseSettingTab", "baseSettingTab", "baseSettingTab", "active");
    var customIconFontSettingTab = new BootstrapTab(lang.FG.customIconFontSettingTab, "#" + idElementEditForm.customIconFontSettingTab, idElementEditForm.customIconFontSettingTab, idElementEditForm.customIconFontSettingTab);
    var optionManagmentTab = new BootstrapTab(lang.FG.optionManagmentTab, "#" + idElementEditForm.optionManagmentTab, idElementEditForm.optionManagmentTab, idElementEditForm.optionManagmentTab);
    var bindingTab = new BootstrapTab(lang.FG.bindingTab, "#" + idElementEditForm.bindingTab, idElementEditForm.bindingTab, idElementEditForm.bindingTab);
    var coddingTab = new BootstrapTab(lang.FG.coddingTab, "#" + idElementEditForm.coddingTab, idElementEditForm.coddingTab, idElementEditForm.coddingTab);
    var scriptTab = new BootstrapTab(lang.FG.scriptTab, "#" + idElementEditForm.scriptTab, idElementEditForm.scriptTab, idElementEditForm.scriptTab);

    var tabsList = [baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab];

    return generateTabPanel_EditPopUp(tabsList);
}

// Add two tabs for EditPopUp
function generateTabPanel_EditPopUp(tabsList) {
    var ul = $('<ul class="nav nav-tabs nav-tabs-line" role="tablist"> </ul>');
    var tabContent = $('<div class="tab-content mt-5 clearfix border-white"> </div>');
    // Add ul and tabDiv to tabPanel
    var tabPanel = $('<div role="tabpanel" class="editPopUp-tabpanel p-2"> </div>')
        .append(ul)
        .append(tabContent);

    for (var item of tabsList)
        FgCommon.generateSingleTab_EditPopUp(tabPanel, item);

    return tabPanel;
}


window["addVariableDataOption"] = (jqSelect, value) => {
    if (jqSelect != null) {
        jqSelect.html('');
        var data = window["variableData"];

        let optionAttribute = new elementAttributes(htmlElementType.option);
        optionAttribute.text = lang.FG.listItemDefault;
        optionAttribute.value = "";
        var subTypeOption = FgCommon.createNewChild(optionAttribute);
        jqSelect.append(subTypeOption);

        for (let i = 0; i < data.length; i++) {
            optionAttribute = new elementAttributes(htmlElementType.option);
            optionAttribute.text = data[i].text;
            optionAttribute.value = data[i].value;
            var subTypeOption = FgCommon.createNewChild(optionAttribute);
            if (value != null && value != '' && value == subTypeOption.get(0).value) {
                subTypeOption.get(0).selected = true;
                subTypeOption.get(0).setAttribute('selected', 'selected')
            }
            jqSelect.append(subTypeOption);
        }
    }
}

window["addEntityVariablesOption"] = (jqSelect) => {
    if (jqSelect != null) {
        jqSelect.html('');
        var data = window["entityVariables"];

        let optionAttribute = new elementAttributes(htmlElementType.option);
        optionAttribute.text = lang.FG.listItemDefault;
        optionAttribute.value = "";
        var subTypeOption = FgCommon.createNewChild(optionAttribute);
        jqSelect.append(subTypeOption);

        for (let i = 0; i < data.length; i++) {
            optionAttribute = new elementAttributes(htmlElementType.option);
            optionAttribute.text = data[i].text;
            optionAttribute.value = data[i].value;
            var subTypeOption = FgCommon.createNewChild(optionAttribute);
            jqSelect.append(subTypeOption);
        }
    }
}

// region Do Changes in edit Popup
function setElementAttributes_EditPopUp() {

    var element = $('#' + editedElementId);
    if (element != 'undefind') {
        let typeKey = element.attr("fg_element_type");
        var elements = {
            'default': 'undefined'
        };
        let fgElementEditModeConvertor = FgElementEditModeConvertorFactory.toCreateByType(typeKey);
        fgElementEditModeConvertor.updateElement_EditPopUp(element, typeKey);
    }
    else
        Console.error('edited element in setElementAttributes_EditPopUp in not defind!');
}

// This enum used for working with custom classes that added to project for working with form generator elements
var customClassNameEnum = {
    el_dropped: "el-dropped",
};

// #endregion Do Changes in edit Popup

class FormGeneratorMethod {
    static callDraggableForAllElementNew() {
        for (let key in FG_ElementTypeEnum) {
            if (FG_ElementTypeEnum.hasOwnProperty(key)) {
                if (FG_ElementTypeEnum[key] != FG_ElementTypeEnum.CONTENT)
                    if (FG_ElementTypeEnum[key] != FG_ElementTypeEnum.COLUMN)
                        if (FG_ElementTypeEnum[key] != FG_ElementTypeEnum.ROW)
                            if (FG_ElementTypeEnum[key] != FG_ElementTypeEnum.ACCORDION)
                                callDraggableForElementNew(FG_ElementTypeEnum[key]);
            }
        }
    }

    static configEditToolbarButtons() {
        $('body').on('click', '#btnSetElementAttributes_EditPopUp', function () {
            setElementAttributes_EditPopUp();
        });
        $('body').on('click', '.editElement', function () {
            let element = $(this).closest('.fg-el-container').find('[fg_element_type]');
            let elementId = element.attr('id');
            let fgElementTypeEnum = FG_ElementTypeEnum[element.attr('fg_element_type')];
            var type = new FG_ElementType(fgElementTypeEnum);

            fillEditPopupFileds(elementId, type);

        });

        $('body').on('click', '.fg-delete-element', function () {

            let containerElement = $(this).closest('.fg-el-container');
            containerElement.remove();
        });

        $('body').on('click', '.fg-add-column', function () {
            addNewColumn(this);
        });

        //if user click on new card in accordion ,it will be fired.
        $('body').on('click', '.fg-add-card', function () {
            FormGeneratorMethod.addCardToAccordion($(this).closest('.fg-el-container'));
        });

        //if user click on new row in card ,it will be fired.
        $('body').on('click', '.fg-add-row', function () {
            let row = FormGeneratorMethod.addNewRow('4-4-4');
            $(this).closest('.fg-el-container').find('[fg_element_type="CARD"]').append(row);
            $(this).closest('.fg-el-container').find('.rowElementContent').sortable({
                cursor: "move",
                items: '.fg-column',
                connectToSortable: '.rowElementContent',
            });
        });
    }

    //return json
    static saveContent() {
        let content = $('.fg-content').parent();
        let fgElementType = FG_ElementTypeEnum.CONTENT;
        let fgElementContainer = content.clone();
        let fgElementEditModeConvertor = FgElementEditModeConvertorFactory.toCreateByType(fgElementType);
        let fgElementEditMode = fgElementEditModeConvertor.fromJQueryObject(fgElementContainer);
        let fgElementJson = fgElementEditModeConvertor.toFgElementJson(fgElementEditMode);

        return fgElementJson;
    }

    //get json and load html
    static loadContent(contentJson) {
        let fgElementType = FG_ElementTypeEnum.CONTENT;
        let fgElementContainer = content;
        let fgElementEditModeConvertor = FgElementEditModeConvertorFactory.toCreateByType(fgElementType);
        let fgElementEditMode = fgElementEditModeConvertor.fromFgElementJson(contentJson);
        let fgElementEditModeJquery = fgElementEditModeConvertor.toJQueryObject(fgElementEditMode);

        window.initialDatePicker();
        //DynamicBusiness.js function
        initialFunctions();
    }

    static addNewRow(colNumber) {
        var type1 = new FG_ElementType(FG_ElementTypeEnum.ROW, colNumber);
        var el = new FG_Element(type1)
        return el.html;
    }

    static addNewAccordion() {
        var type1 = new FG_ElementType(FG_ElementTypeEnum.ACCORDION, null);
        var el = new FG_Element(type1)
        return el.html;
    }

    static addNewCard() {
        var type1 = new FG_ElementType(FG_ElementTypeEnum.CARD, null);
        var el = new FG_Element(type1)
        return el.html;
    }

    //.fg-el-container
    static addCardToAccordion(accordion) {
        let card = FormGeneratorMethod.addNewCard();
        accordion.find('[fg_element_type="ACCORDION"]').append(card);

        let row = FormGeneratorMethod.addNewRow('4-4-4');
        card.find('[fg_element_type="CARD"]').append(row);

        $(card).find('.rowElementContent').sortable({
            cursor: "move",
            items: '.fg-column',
            connectToSortable: '.rowElementContent',
        });
    }
}
// Remove elem from string
Array.prototype.remove = function (elem) {
    if (this.findIndex !== "-1")
        this.splice(this.findIndex(el => el === elem), 1);
    return this;
};

window.FormGeneratorMethod = FormGeneratorMethod;
export { FG_ElementTypeEnum, callSortableForColOfRow, FormGeneratorMethod };