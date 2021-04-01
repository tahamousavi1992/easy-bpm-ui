'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElements/fgElement.js";
import FgChart from "./fgElements/chart.js";
import lang from "../../JS/Languages/lang.js";
import FgCaptcha from "./FgElements/captcha.js";
class FgCommon {
    static toB64(plainText) {
        if (plainText == null || plainText == 'undefined' || plainText == '' || plainText == '[object Object]') return '';
        return btoa(unescape(encodeURIComponent(plainText)));
    };
    static fromB64(enCodeText) {
        if (enCodeText == null || enCodeText == 'undefined' || enCodeText == "null" || enCodeText == '' || enCodeText == '[object Object]') return '';
        return decodeURIComponent(escape(atob(enCodeText)));
    };

    //it is for selecting value in dropdown list when dynamically adding to forms.
    static indexMatchingValue(eleSelect, value) {
        for (var i = 0; i < eleSelect.options.length; i++) {
            if (eleSelect.options[i].value === value) {
                return i;
            }
        }
        return null;
    }

    static generateIdwithPrefix(prefix) {
        return prefix + Math.floor(Math.random() * 10000);
    }

    static setDropDownELement(selectId, data) {
        let options = `<option value="">${lang.FG.listItemDefault}</option>`;
        for (let i = 0; i < data.length; i++) {
            options += `<option value="${data[i].value}">${data[i].text}</option>`;
        }
        document.getElementById(selectId).innerHTML = options;
    }

    static setDropDownELementByNode(selectNode, data) {
        let options = `<option value="">${lang.FG.listItemDefault}</option>`;
        for (let i = 0; i < data.length; i++) {
            options += `<option value="${data[i].value}">${data[i].text}</option>`;
        }
        selectNode.innerHTML = options;
    }

    //add event attributes to a specific element.
    static addEventsToElements(jqElement, events) {
        if (events != null && events != '')
            events.forEach((item) => {
                jqElement.get(0).setAttribute(eventAttribute.data_eventfunction + "-" + item.eventName, item.eventFunction);
                jqElement.get(0).setAttribute(eventAttribute.data_eventcode + "-" + item.eventName, item.eventCode);
            })
    }


    //set Confirmation code expression as object
    static setConfirmationCodeObjectToElement(jqElement, expressionConfirmCode) {
        jqElement.get(0).setAttribute('data-expressionConfirmCode', expressionConfirmCode != null ? expressionConfirmCode : "");
    }

    //get Confirmation code expression as object
    static getConfirmationCodeObjectFromElement(jqElement) {
        let expression = jqElement.get(0).getAttribute('data-expressionConfirmCode');
        return expression == null || expression == 'undefined' || expression == '[object Object]' || FgCommon.fromB64(expression).indexOf('<Code></Code>') > -1 ? '' : expression;
    }

    //set visibility code expression as object
    static setVisibilityCodeObjectToElement(jqElement, expressionVisibilityCode) {
        jqElement.get(0).setAttribute('data-expressionVisibilityCode', expressionVisibilityCode != null ? expressionVisibilityCode : "");
    }

    //get visibility code expression as object
    static getVisibilityCodeObjectFromElement(jqElement) {
        let expression = jqElement.get(0).getAttribute('data-expressionVisibilityCode');
        return expression == null || expression == 'undefined' || expression == '[object Object]' || FgCommon.fromB64(expression).indexOf('<Code></Code>') > -1 ? '' : expression;
    }

    //get events a array from a specific element.  data-eventfunction-{eventName}="{function name}" and data-eventcode-{eventName}="{function code}".
    static getEventsFromElement(jqElement) {
        let events = [];
        for (let i = 0; i < jqElement.get(0).attributes.length; i++) {
            let attrName = jqElement.get(0).attributes[i].name;
            if (attrName.startsWith(eventAttribute.data_eventfunction + "-")) {
                let eventName = jqElement.get(0).attributes[i].name.replace(eventAttribute.data_eventfunction + '-', '');
                let eventFunction = jqElement.get(0).getAttribute(eventAttribute.data_eventfunction + '-' + eventName);
                let eventCode = jqElement.get(0).getAttribute(eventAttribute.data_eventcode + '-' + eventName);
                events.push({ eventName: eventName, eventFunction: eventFunction, eventCode: eventCode })
            }
        }
        return events;
    }

    //add a link to end of input.
    static createAddEventCodeLink(jqElement) {
        let _div = document.createElement('div');
        _div.className = "input-group-append";

        let _span = document.createElement('span');
        _span.className = 'input-group-text';

        let _button = document.createElement('a');
        _button.onclick = function (event) {
            let inputElement = document.getElementById(event.target.closest('a').getAttribute('data-elementid'));
            openJavaScriptCode(inputElement.getAttribute('data-eventcode'), inputElement); return false;
        };
        _button.id = "addCode_" + Math.floor(Math.random() * 101);
        _button.setAttribute('style', 'text-decoration:none;');
        _button.setAttribute('data-elementid', jqElement.get(0).id)
        _button.innerHTML = ' <i class="fa fa-plus"></i>';
        _span.appendChild(_button);
        _div.appendChild(_span);
        jqElement.get(0).parentNode.insertBefore(_div, jqElement.get(0).nextSibling);
    }

    //add a link to end of input.
    static createAddBackEndCodeLink(jqElement) {
        let _div = document.createElement('div');
        _div.className = "input-group-append";

        let _span = document.createElement('span');
        _span.className = 'input-group-text';

        let _button = document.createElement('a');
        _button.onclick = function (event) {
            let inputElement = document.getElementById(event.target.closest('a').getAttribute('data-elementid'));
            openBackEndCode(inputElement.getAttribute('data-code'), inputElement); return false;
        };
        _button.href = 'javascript:;';
        _button.id = "addCode_" + Math.floor(Math.random() * 101);
        _button.setAttribute('style', 'text-decoration:none;');
        _button.setAttribute('data-elementid', jqElement.get(0).id)
        _button.innerHTML = ' <i class="fa fa-plus"></i>';
        _span.appendChild(_button);
        _div.appendChild(_span);

        jqElement.get(0).parentNode.insertBefore(_div, jqElement.get(0).nextSibling);
    }


    // This function is for utility
    static jq_getElementById(id) {
        return $('#' + id);
    }

    //this create a add button to the end of a control
    static createAddVariableButton(addVariableId, variableControlID) {
        //data-variablecontrol is id of controls that user select its variable.
        return `<span onclick="clearVariableInput(this)" class="form-control-feedback fa fa-times-circle-o"></span>
<div class="input-group-append"><span class="input-group-text">
        <a onclick="openVariableList(document.getElementById('${variableControlID}'));return false;" href="javascript:;" id="${addVariableId}"  style="text-decoration:none;">
            <i class="fa fa-plus"></i>
        </a></span> </div>`;
    }

    // This method is new version ES6
    static getHFG_ElementTypeEnumKey(value) {
        return Object.keys(FG_ElementTypeEnum).find(k => FG_ElementTypeEnum[k] === value);
    }
    // This method is new version ES6
    static getEnumKey(enumClass, value) {
        return Object.keys(enumClass).find(k => enumClass[k] === value);
    }

    // This method is new version ES6
    static gethtmlElementTypeKey(value) {
        return Object.keys(htmlElementType).find(k => htmlElementType[k] === value);
    }

    // textAsInnerHtmlElements retuns html elements that 
    static textAsInnerHtmlElements() {
        var tagNames = [];
        tagNames.push(FgCommon.gethtmlElementTypeKey(htmlElementType.button));
        tagNames.push(FgCommon.gethtmlElementTypeKey(htmlElementType.label));
        tagNames.push(FgCommon.gethtmlElementTypeKey(htmlElementType.option));
        tagNames.push(FgCommon.gethtmlElementTypeKey(htmlElementType.a));
        tagNames.push(FgCommon.gethtmlElementTypeKey(htmlElementType.h));
        return tagNames.join(',');
    }

    static addAllAttribuets(element, elementAttributes) {
        if (element.is(FgCommon.textAsInnerHtmlElements()) || elementAttributes.htmlType === htmlElementType.h || elementAttributes.htmlType === htmlElementType.div) {
            element.html(elementAttributes.text);
        }
        element.attr({
            id: elementAttributes.id,
            value: elementAttributes.value,
            class: elementAttributes.cssClass,
            style: elementAttributes.style,
            type: elementAttributes.htmlSubType,
            name: elementAttributes.name,
            fg_Element_Type: elementAttributes.fg_ElementType,
        });
    }

    static createNewChild(elementAttributes) {
        // Create new html element
        var tagName;

        if (elementAttributes.htmlType === htmlElementType.h)
            tagName = FgCommon.getEnumKey(htmlElementType, elementAttributes.htmlType) + elementAttributes.htmlSubType;
        else
            tagName = FgCommon.getEnumKey(htmlElementType, elementAttributes.htmlType);

        var newElement = $(document.createElement(tagName));

        // Add attributes
        FgCommon.addAllAttribuets(newElement, elementAttributes);

        return newElement;
    }

    static createInputControl(inputId, value, leftToRight, placeHolder, cssClass) {
        var attribute = new elementAttributes(htmlElementType.input);
        attribute.id = inputId;
        attribute.cssClass = "form-control " + (cssClass != null ? cssClass : "");
        if (leftToRight)
            attribute.style = "direction:ltr;";
        if (value != undefined && value != null)
            attribute.value = value;
        attribute.htmlSubType = FgCommon.getEnumKey(inputTypeEnum, inputTypeEnum.text);
        var inputControl = FgCommon.createNewChild(attribute);
        if (placeHolder)
            inputControl.attr("placeholder", placeHolder);
        inputControl.attr('autocomplete', 'off');
        return inputControl;
    }

    static createTextareaControl(inputId, value, leftToRight, placeHolder) {
        var attribute = new elementAttributes(htmlElementType.textarea);
        attribute.id = inputId;
        attribute.cssClass = "form-control";
        if (leftToRight)
            attribute.style = "direction:ltr;";
        if (value != undefined)
            attribute.value = value;
        var inputControl = FgCommon.createNewChild(attribute);
        if (value != undefined)
            inputControl.html(value);
        if (placeHolder)
            inputControl.attr("placeholder", placeHolder);
        return inputControl;
    }

    static createDefaultColForPopup(colClass) {
        if (colClass == null) colClass = "col-sm-6";
        var defaultCol = FgCommon.createNewChild(new elementAttributes(htmlElementType.div, colClass));
        return defaultCol;
    }

    static createLabelControl(text) {
        var attribute = new elementAttributes();
        attribute.htmlType = htmlElementType.label;
        attribute.text = text;
        var controlLabel = FgCommon.createNewChild(attribute);
        return controlLabel;
    }

    // Create help text for inputs and after label in edit popup
    static createHelpTextForInput(helpText) {
        var toolTipAtrr = new elementAttributes(htmlElementType.i, 'fa fa-exclamation-circle fg_TooltipElement');
        var toolTip = FgCommon.createNewChild(toolTipAtrr);
        toolTip.attr("data-toggle", "tooltip");
        toolTip.attr('data-original-title', helpText);
        toolTip.tooltip();
        return toolTip;
    }

    // Create 
    static createDefaultIconFontDiv_EditPopUp(fontIcon) {
        var divInputGroup = $(document.createElement("div")).addClass("input-group");
        return divInputGroup;
    }

    // Default form in edit popup
    static createDefaultColForElementAttribute_EditPopUp(elementAttribute, labelName, fontIcon, helpText, colClass) {
        var rootDiv = FgCommon.createDefaultColForPopup(colClass);
        // Add label
        var label = FgCommon.createLabelControl(labelName);
        rootDiv.append(label);

        // Help text for filling field easily
        if (helpText !== undefined && helpText != null) {
            var toolTip = FgCommon.createHelpTextForInput(helpText);
            rootDiv.append(toolTip);
        }

        // Add this block code for icon
        // First add a div with input-group class 
        // Second add span with input-group-prepend
        var divInputGroup = FgCommon.createDefaultIconFontDiv_EditPopUp(fontIcon);

        // Add elementAttribute to input-group
        divInputGroup.append(elementAttribute);

        // Add elements
        rootDiv.append(divInputGroup);
        return rootDiv;
    }

    //create class input for settings
    static createClassNameDiv_EditPopUp(element, hideClassListName) {
        var classElement = element.attr("class");
        if (hideClassListName != undefined && element.attr("class")) {
            if (Array.isArray(hideClassListName))
                classElement = classElement.split(' ').filter(item => !hideClassListName.includes(item))
            else
                classElement = classElement.split(' ').filter(item => !hideClassListName.split(' ').includes(item))
        }

        var elementAttribute = FgCommon.createInputControl(idElementEditForm.class, classElement != null ? classElement.toString().replaceAll(',', ' ') : "", true);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.className, "fa fa-css3");
        return formGroup;
    }

    //create  input for settings
    static createTextareaDiv_EditPopUp(elementId, elementName, value, colClass) {
        var elementAttribute = FgCommon.createTextareaControl(elementId, value, true);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, elementName, "fa fa-css3", '', colClass);
        return formGroup;
    }

    static getDefaultLabelElementText(element) {
        return element.closest(".fg-el-placeholder").findFgElLabel();
    }

    // This method used for get label of element depending to element
    static getlabelElementByType(type, element) {
        var elements = {};

        elements[FG_ElementTypeEnum.BUTTON] = element.html();
        elements[FG_ElementTypeEnum.TEXTBOX] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.CKEDITOR] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.DROPDOWNLIST] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.COMBOSEARCH] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.RADIOBUTTONLIST] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.CHECKBOXLIST] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.CHECKBOX] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.FILEUPLOAD] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.LINK] = element.html();
        elements[FG_ElementTypeEnum.TITLE] = element.html();
        elements[FG_ElementTypeEnum.DATEPICKER] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.DOWNLOADLINK] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.DATAGRID] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.FORM] = FgCommon.getDefaultLabelElementText(element);
        elements[FG_ElementTypeEnum.CHART] = FgCommon.getDefaultLabelElementText(element);
        return (elements[type.valueType]);
    }

    static createLabelElementDiv_EditPopUp(type, element) {
        var labelElement = FgCommon.getlabelElementByType(type, element);
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.label, labelElement);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.label, "fa fa-tag");
        return formGroup;
    }

    static createSubTypeHtmlElementByEntries(dropDownListId, allSubTypes) {
        var select = FgCommon.createNewChild(new elementAttributes(htmlElementType.select, "form-control", dropDownListId));
        for (var i = 0; i < allSubTypes.length; i++) {
            var optionAttribute = new elementAttributes(htmlElementType.option);
            optionAttribute.text = allSubTypes[i][1];
            optionAttribute.value = allSubTypes[i][0];
            var subTypeOption = FgCommon.createNewChild(optionAttribute);
            select.append(subTypeOption);
        }
        return select;
    }

    static createSubTypeHtmlElement(dropDownListId, allSubTypes) {
        var select = FgCommon.createNewChild(new elementAttributes(htmlElementType.select, "form-control", dropDownListId));
        for (var i = 0; i < allSubTypes.length; i++) {
            var optionAttribute = new elementAttributes(htmlElementType.option);
            optionAttribute.text = allSubTypes[i];
            optionAttribute.value = allSubTypes[i];
            var subTypeOption = FgCommon.createNewChild(optionAttribute);
            select.append(subTypeOption);
        }
        return select;
    }

    // This method used for sub type of element of sub type of class for element
    static createSubTypeNameDiv_EditPopUp(element) {
        var dropDownListId = idElementEditForm.ddlElementSubTypes;
        var elementAttribute;
        let subTypeElement = '';
        let typeLabel = lang.FG.type;
        if (element.prop("tagName").toLowerCase() === FgCommon.getEnumKey(htmlElementType, htmlElementType.button)) {
            elementAttribute = FgCommon.createSubTypeHtmlElement(dropDownListId, Object.keys(buttonTypeEnum));
            typeLabel = lang.FG.buttonTypeLabel;
        }
        else if (element.prop("tagName").toLowerCase() === FgCommon.getEnumKey(htmlElementType, htmlElementType.input)) {
            elementAttribute = FgCommon.createSubTypeHtmlElementByEntries(dropDownListId, Object.entries(textBoxTypeEnum));
            subTypeElement = element.attr("data-type");
        }
        else if (element.prop("tagName").toLowerCase().match(/\h[1-9]/) != null) {
            elementAttribute = FgCommon.createSubTypeHtmlElement(dropDownListId, Object.keys(headerTagTypeEnum));
            subTypeElement = element.prop("tagName").toLowerCase().match(/\h[1-9]/)[0];
        }
        if (subTypeElement == '' || subTypeElement == null)
            subTypeElement = element.attr("type");
        // Set sub type
        elementAttribute.val(subTypeElement);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, typeLabel, "fa fa-cog");
        return formGroup;
    }

    // This method used for access type of element.
    static createAccessTypeDiv_EditPopUp(element, colClass) {
        var dropDownListId = idElementEditForm.ddlElementAccessTypes;
        var elementAttribute = FgCommon.createDropDownHtmlElement(dropDownListId, element.attr("data-accessType"), true, FgCommon.getArrayFromEnum(accessTypeEnum));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.accessType, "fa fa-cog", null, colClass);
        return formGroup;
    }

    static getArrayFromEnum(data) {
        let dataArray = new Array();
        for (let [key, value] of Object.entries(data)) {
            dataArray.push({ text: key, value: value });
        }
        return dataArray;
    }

    static createHelpTextDiv_EditPopUp(element) {
        let toolTipElement = element.closest(".fg-el-placeholder").find('.fg_TooltipElement');
        let helpText = toolTipElement.attr('data-original-title');
        helpText = (helpText == '' || helpText == null) ? toolTipElement.attr('data-title') : helpText;
        let elementAttribute = FgCommon.createInputControl(idElementEditForm.helpText, helpText);
        let formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.helpText, "fa fa-exclamation-circle");
        return formGroup;
    }

    static createElementIdDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.id, element.attr("id"), true);
        elementAttribute.attr('readonly', 'readonly');
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.idName, "fa fa-css3");
        return formGroup;
    }

    static createPlaceholderDiv_EditPopUp(element) {
        var placeholderElement = element.attr("placeholder");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.placeholderField, placeholderElement);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.placeholder, "fa fa-file-text-o");
        return formGroup;
    }

    static createElementValidationGroupDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.validationGroup, element.attr("data-val-group"), true);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.groupNameForValidation, "fa fa-css3");
        return formGroup;
    }

    static createMaxLengthDiv_EditPopUp(element) {
        var maxlengthElement = element.attr("maxlength");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.maxLengthField, maxlengthElement);
        elementAttribute.attr("type", "number");
        elementAttribute.attr("min", "1");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.maxlength, "fa fa-text-width");
        return formGroup;
    }

    static createPatternDiv_EditPopUp(element) {
        var patternElement = element.attr("data-pattern");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.patternField, patternElement, true);
        elementAttribute.attr("type", "text");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.pattern, "fa fa-text-width");
        return formGroup;
    }

    //FormGoup
    static createFormGoup(id) {
        var formGoup = FgCommon.createNewChild(new elementAttributes(htmlElementType.div, "form-group row", id));
        return formGoup;
    }

    static createCustomOption(objOptions, onlyLabel) {
        let labels = [];
        if (Array.isArray(objOptions) == false) {
            objOptions = [objOptions];
        }
        objOptions.forEach(function (objOption) {
            var newOption = $(document.createElement('input'))
                .attr("type", FgCommon.getEnumKey(inputTypeEnum, objOption.type))
                .attr("id", objOption.id)
                .val(objOption.value)
                .prop("checked", objOption.checked);

            var newLabel = $(document.createElement("label"))
                .append(newOption)
                .append($('<span></span>'));
            if (objOption.text != null && !onlyLabel) {
                newLabel.append(objOption.text);
            }
            // Switch layout
            if (objOption.isSwitch)
                newLabel.append('<span class="slider round"></span>');

            switch (objOption.type) {
                case inputTypeEnum.radio:
                    newLabel.addClass("radio");
                    newOption.attr("id", objOption.parentId);
                    break;
                case inputTypeEnum.checkbox:
                    if (objOption.isSwitch)
                        newLabel.addClass("switch");
                    else {
                        newLabel.addClass("checkbox");
                    }
                    break;
            }
            labels.push(newLabel);
        });

        let divcheckbox = $(document.createElement('div'));
        if (objOptions.length > 0) {
            switch (objOptions[0].type) {
                case inputTypeEnum.radio:
                    divcheckbox.addClass('radio-inline');
                    break;
                case inputTypeEnum.checkbox:
                    divcheckbox.addClass('checkbox-inline');
                    break;
            }
        }

        labels.forEach((item) => {
            divcheckbox.append(item);
        });
        return divcheckbox;
    }

    static addLabelToCheckBox(col6, objOption) {
        if (objOption != null)
            col6.prepend(`<label>${objOption.text}</label >`);
        return col6;
    }

    static createRequiredFieldDiv_EditPopUp(element) {
        let isChecked = element.hasClass("required-field empty-field") || element.hasClass("required-field") || element.attr('data-isRequired') == "true";

        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.requiredName, checked: isChecked, id: idElementEditForm.chkRequriedField });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);

        let col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    // This method used for hide or show icon font of element
    // For hiding or showing icon font we need to hide/show link (a tag) that it has following format:
    // <a href="#customIconFontSettingTab">
    static changeVisibilityIconFont(visiblity) {
        if (visiblity === true) {
            $("a[href='#" + idElementEditForm.customIconFontSettingTab + "']").show();
        }
        else {
            $("a[href='#" + idElementEditForm.customIconFontSettingTab + "']").hide();
        }
    }

    static createHasIconFontFieldDiv_EditPopUp(element) {
        var isChecked = false;
        // If it has this class, it didn't has icon font
        // Because for having icon font it          
        if (element.parent().find('span[class="input-group-text"]').length == 0) {
            FgCommon.changeVisibilityIconFont(false);
        }
        else {
            isChecked = true;
            FgCommon.changeVisibilityIconFont(true);
        }

        var objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.hasIconFontField, checked: isChecked, id: idElementEditForm.chkHasIconFontField });
        let checkboxPlaceHolder = FgCommon.createCustomOption(objCustomOption, true);

        var col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkboxPlaceHolder);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);
        // Set event for showing icon font checkbox
        let checkbox = checkboxPlaceHolder.find('input[type="checkbox"]');
        checkbox.click(function () {
            FgCommon.changeVisibilityIconFont(checkbox.prop("checked"));
        });

        return col6;
    }

    static createReadOnlyFieldDiv_EditPopUp(element) {
        let isReadOnly = element.is('[readonly]') || element.is('[disabled]') || element.attr('data-readonly') == "true";

        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.readOnlyField, checked: isReadOnly, id: idElementEditForm.chkReadOnlyField });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);

        var col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    // Arrange cols form colsList to parentCol
    // For example convert single col
    static arrangeColsInFormGroupByColNumber(parentCol, colsList, colnumber) {
        var currentFormGroup;
        $.each(colsList, function (index, col) {
            if (currentFormGroup == null || col.className == "col-sm-12"
                || (currentFormGroup != null && currentFormGroup.find('div.col-sm-6,div.col-sm-3').length == colnumber)
                || (currentFormGroup != null && currentFormGroup.find('div.col-sm-12').length > 0)) {
                currentFormGroup = FgCommon.createFormGoup();
                parentCol.append(currentFormGroup);
            }

            $(col).detach().appendTo(currentFormGroup);
        });
    }

    //it is used for controls that need combotree for binding map variable's like input,chekbox,datepicker,radiobutton
    //because this controls need all type of variables.
    static createBindingMapTreeDiv_EditPopUp(element) {
        var bindingMapElement = element.attr("data-map");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.bindingMapElement, bindingMapElement);
        elementAttribute.attr("type", "text");
        elementAttribute.attr("readonly", "readonly");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.bindingMapTree, "fa fa-text-width");

        formGroup.find('.input-group').append(FgCommon.createAddVariableButton(idElementEditForm.addVariableLinkForMap, idElementEditForm.bindingMapElement));

        return formGroup;
    }

    //it is used for controls that need combotree for binding fill variable's like input,chekbox,datepicker,radiobutton
    //because this controls need all type of variables.
    static createBindingFillTreeDiv_EditPopUp(element) {
        var bindingFillElement = element.attr("data-fill");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.bindingFillElement, bindingFillElement);
        elementAttribute.attr("type", "text");
        elementAttribute.attr("readonly", "readonly");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.bindingFillTree, "fa fa-text-width");

        formGroup.find('.input-group').append(FgCommon.createAddVariableButton(idElementEditForm.addVariableLinkForFill, idElementEditForm.bindingFillElement));

        return formGroup;
    }

    //it is used for controls that need combo for binding fill variable's like chekboxlist,radiobuttonlist,dropdownlist.
    //because this controls only need list variable
    static createBindingFillComboDiv_EditPopUp(element) {
        var bindingFillElement = element.attr("data-fillList");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.bindingFillListElement, bindingFillElement);
        elementAttribute.attr("type", "text");
        elementAttribute.attr("data-isListVariable", "true");
        elementAttribute.attr("readonly", "readonly");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.bindingFillCombo, "fa fa-text-width", null, "col-sm-6");
        formGroup.find('.input-group').append(FgCommon.createAddVariableButton(idElementEditForm.addVariableLinkForFillList, idElementEditForm.bindingFillListElement));
        return formGroup;
    }

    //script tab section
    static createEventDiv_EditPopUp(jqElement, eventName, caption) {
        var eventfunction = jqElement.attr(eventAttribute.data_eventfunction + "-" + eventName);
        var eventcode = jqElement.attr(eventAttribute.data_eventcode + "-" + eventName);

        var elementAttribute = FgCommon.createInputControl(idElementEditForm.FunctionName + "_" + eventName, eventfunction, true);
        elementAttribute.attr("data-eventcode", eventcode)

        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, caption, "fa fa-css3");
        FgCommon.createAddEventCodeLink(elementAttribute);
        return formGroup;
    }

    //expression visibility Code
    static createExpressionVisibilityCodeDiv_EditPopUp(jqElement) {
        return FgCommon.createBackEndCodeDiv_EditPopUp(jqElement, idElementEditForm.txtExpressionVisibilityCode, lang.FG.expressionVisibilityCode, jqElement.attr("data-expressionVisibilityCode"))
    }

    //c# code section
    static createBackEndCodeDiv_EditPopUp(jqElement, elementId, caption, code) {
        let elementAttribute = FgCommon.createTextareaControl(elementId, FgCommon.getCodeBodyFromBase64Xml(code), true);
        elementAttribute.attr('data-code', code);
        elementAttribute.attr('readonly', 'readonlys');
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, caption, "fa fa-css3");
        FgCommon.createAddBackEndCodeLink(elementAttribute);
        return formGroup;
    }

    //this would get c# code body from a base64 code xml template 
    static getCodeBodyFromBase64Xml(base64Code) {
        return window.getBusinessRuleName(FgCommon.fromB64(base64Code));
    }

    static createBindingFillKeyDiv_EditPopUp(element) {
        var bindingFillElementKey = element.attr("data-key");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.bindingFillElementKey, bindingFillElementKey);
        elementAttribute.attr("type", "text");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.bindingFillKey, "fa fa-text-width", null, "col-sm-3");
        return formGroup;
    }

    //FillText
    static createBindingFillTextDiv_EditPopUp(element) {
        var bindingFillElementText = element.attr("data-text");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.bindingFillElementText, bindingFillElementText);
        elementAttribute.attr("type", "text");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.bindingFillText, "fa fa-text-width", null, "col-sm-3");
        return formGroup;
    }

    // Default form in edit popup
    static createFormGroupForElementAttribute(elementAttribute, labelName, fontIcon) {
        var rootDiv = FgCommon.createFormGoup();
        let divCol = $('<div class="col-lg-6"></div>');

        // Add label
        var label = FgCommon.createLabelControl(labelName);
        // Add this block code for icon
        // First add a div with input-group class 
        var inputGroupAtrr = new elementAttributes(htmlElementType.div, "input-group");
        var divInputGroup = FgCommon.createNewChild(inputGroupAtrr);
        // Add elements
        divCol.append(label);
        divCol.append(divInputGroup);
        //spanInputGroupAddOn.append(fontIcon);
        rootDiv.append(divCol);
        // Add elementAttribute to input-group
        divInputGroup.append(elementAttribute);

        return rootDiv;
    }

    // Font awesome
    static createIconFontNameDiv_EditPopUp(element, iconFontSettingType) {
        var iconFontElement = element.parent().find('.input-group-text').find('i').attr('class');
        var elementAttribute;
        var formGroup;
        if (iconFontSettingType === iconFontSettingTypeEnum.defaultIconFonts) {
            elementAttribute = FgCommon.createInputControl(idElementEditForm.fontIcon, iconFontElement, true);
            formGroup = FgCommon.createFormGroupForElementAttribute(elementAttribute, lang.FG.iconFontNameSelected, "fa fa-font-awesome");
        }
        else if (iconFontSettingType === iconFontSettingTypeEnum.customIconFonts) {
            var customIconFonts = $('#divCustomFontIcons').find('i');
            if (customIconFonts.hasClass(iconFontElement))
                elementAttribute = FgCommon.createInputControl(idElementEditForm.customfontIcon, iconFontElement, true);
            else
                elementAttribute = FgCommon.createInputControl(idElementEditForm.customfontIcon, "", true);

            formGroup = FgCommon.createFormGroupForElementAttribute(elementAttribute, lang.FG.iconCustomFontNameSelected, "fa fa-pencil");
        }
        return formGroup;
    }


    //this make a dropdown with items of variables list type.
    static createSelectVariableHtmlElement(dropDownListId, value) {
        var select = FgCommon.createNewChild(new elementAttributes(htmlElementType.select, "form-control", dropDownListId));
        window["addVariableDataOption"](select);
        if (value != null)
            select.val(value);

        return select;
    }

    //gggggggggggggggggggggg
    // Add options and add button to optionManagmentTab
    static addEditOptionsForDropDownDiv(optionManagmentTab, element) {

        // Add addOptionButton for adding new options
        var addOptionButtonAtrr = new elementAttributes(htmlElementType.button, "btn btn-success", idElementEditForm.btnAddOptions, lang.FG.addOptions);
        addOptionButtonAtrr.htmlSubType = FgCommon.getEnumKey(buttonTypeEnum, buttonTypeEnum.button);
        var addOptionButton = FgCommon.createNewChild(addOptionButtonAtrr);
        optionManagmentTab.append(addOptionButton);

        var divOptions = $('<div id="' + idElementEditForm.divOptions + '" class="row"> </div>');
        optionManagmentTab.append(divOptions);
        var optionsList = element.find("option");
        $.each(optionsList, function () {
            FgCommon.addOptionToDropDown_EditPopUp(divOptions, this);
        });

        // Set sortable for divOptions
        FgCommon.setSortableForDivOptions(divOptions);

        // Add option
        addOptionButton.click(function () {
            // We have to use JavaScript element in this function
            // Because in FgCommon.addOptionToDropDown_EditPopUp we need JavaScript element
            var newOption = document.createElement('option');
            FgCommon.addOptionToDropDown_EditPopUp(divOptions, newOption);
            // Set effect for new option
            FgCommon.addOptionEffect(divOptions);
        });
    }

    // Effect for add option in edit pop up
    static addOptionEffect(divOptions) {
        divOptions.find(".input-group:last").effect("highlight", {
            color: '#4cae4c'
        }, 1000);
        // Set focus on new option and label input (first input)
        divOptions.find(".input-group:last").find("input[type=text]").first().focus();
    }

    // Call sortable method for active sortable
    static setSortableForDivOptions(divOptions) {
        $('#' + idElementEditForm.divOptions).sortable({
            opacity: 0.6,
            cursor: 'move',
            placeholder: "dragSortableOption",
        });
    }

    // Set events removeOption
    static setEventsForRemoveOptionButton(removeButton, parent) {
        // Change background color of parent   
        // removeButton mouseover and mouseout
        removeButton.mouseover(function () {
            parent.addClass("delete");
        });

        removeButton.mouseout(function () {
            parent.removeClass("delete");
        });

        // Remove option div after effect
        removeButton.click(function () {
            parent.effect("highlight", {
                color: '#f97a76'
            }, 500);
            parent.fadeOut(function () {
                this.remove();
            });
        });
    }

    // It used for create two input for setting label and value of option in dropdown
    static createInputForOption(value, placeholder, cssClass) {
        var input = $(document.createElement('input'));
        input.val(value);
        input.attr('type', "text");
        input.attr('placeholder', placeholder);
        input.addClass("form-control");
        input.addClass(cssClass);

        return input;
    }

    // Add options for drop down
    static addOptionToDropDown_EditPopUp(divOptions, option) {
        var parent = $('<div class="input-group"></div>');
        divOptions.append(parent);

        FgCommon.addOption(parent, option.hasAttribute("selected"));

        var labelOption = $('<span class="col-sm-5"> </span >');
        labelOption.append(FgCommon.createInputForOption(option.innerHTML, lang.FG.label, "option-label"));
        parent.append(labelOption);

        var valueOption = $('<span class="col-sm-5"> </span >');
        valueOption.append(FgCommon.createInputForOption(option.value, lang.FG.value, "option-value"));
        parent.append(valueOption);

        // removeButton used for remove option
        var removeOption = $('<span class="col-sm-1 text-center"> </span >');
        var removeButton = $('<a class="remove btn btn-sm btn-clean btn-icon"><span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span></a>');
        removeOption.append(removeButton);
        parent.append(removeOption);

        // Set events removeOption
        FgCommon.setEventsForRemoveOptionButton(removeButton, parent);
    }

    static addOption(parent, selected) {
        var inputForSelectOption = $('<input aria-label="Checkbox for following text input"/>');
        var spanInputForSelectOption = $('<label class="radio"></label>');

        inputForSelectOption.attr("type", "radio");
        inputForSelectOption.attr("name", idElementEditForm.divOptions);

        spanInputForSelectOption.append(inputForSelectOption);
        parent.append($('<div class="radio-list"></div>').append(spanInputForSelectOption));
        spanInputForSelectOption.append('<span></span>');
        // .prop and .attr in if ($(option).prop("selected")) doesn't work!!!
        // We have to use JavaScript in this issue
        if (selected)
            inputForSelectOption.prop("checked", true);
    }

    // This method used for cancel icon font
    static createCancelButtonIconFont(iconFontSettingType) {
        var inputFontIcon;
        var otherFontIcon;
        var cancelCustomIconFont = $('<div class="input-group-prepend"><span class="input-group-text cancel-Icon-Font"><i class="fa fa-times" style="color: red;"></i></span ></div>');
        if (iconFontSettingType === iconFontSettingTypeEnum.customIconFonts) {
            inputFontIcon = FgCommon.jq_getElementById(idElementEditForm.customfontIcon);
            otherFontIcon = FgCommon.jq_getElementById(idElementEditForm.fontIcon);
            otherFontIcon.attr("title", lang.FG.selectedCustomFontIcon);
        }
        else {
            inputFontIcon = FgCommon.jq_getElementById(idElementEditForm.fontIcon);
            otherFontIcon = FgCommon.jq_getElementById(idElementEditForm.customfontIcon);
            otherFontIcon.attr("title", lang.FG.selectedFontIcon);
        }
        otherFontIcon.val("");
        otherFontIcon.prop("readonly", true);
        // Set bootstrap tooltip
        otherFontIcon.tooltip({
            placement: 'bottom'
        });

        inputFontIcon.after(cancelCustomIconFont);

        // Event cancel icon font
        cancelCustomIconFont.click(function () {
            inputFontIcon.val("");
            otherFontIcon.prop("readonly", false);
            // destroy tooltip
            otherFontIcon.tooltip('destroy');
            otherFontIcon.removeAttr("title");
            cancelCustomIconFont.remove();
        });
    }

    // This method used for get custom icon font from font-awesome.min.css
    static getCustomIconFonts(element) {
        var isElementHasFontIcon = false;
        //var iconList = [];
        var iconFontElement = element.parent().find('.input-group-text').find('i').attr('class');
        var customIconFonts = $(document.createElement("div"));
        customIconFonts.attr("id", idElementEditForm.divCustomFontIcons);


        $.ajax({
            url: "/DesktopModules/MVC/DynamicBusiness.Bpms/Resources/assets/css/font-awesome.min.css",
            dataType: "text",
            success: function (data) {
                var inputCustomfontIcon = $('#' + idElementEditForm.customfontIcon);
                // Remove new lines in string
                var normalData = data.replace(/(\r\n|\n|\r)/gm, "");
                // Regular experision
                var re = /\.fa.*?before/ig
                var match;
                while ((match = re.exec(normalData)) != null) {
                    var icon = match[0],
                        re1 = /value="(.*?)"/ig;
                    // Add iconList
                    //iconList.push(icon.replace(':before', ''));
                    var iTag = FgCommon.createNewChild(new elementAttributes(htmlElementType.i, icon.replace(':before', '').replace('.', 'fa ')));
                    customIconFonts.append(iTag);
                    if (!isElementHasFontIcon && iconFontElement != null && iconFontElement != '') {
                        inputCustomfontIcon.val(iconFontElement);
                        $('#' + idElementEditForm.fontIcon).val("");
                        isElementHasFontIcon = true;
                        FgCommon.createCancelButtonIconFont(iconFontSettingTypeEnum.customIconFonts);
                    }

                    iTag.click(function () {
                        if (!inputCustomfontIcon.prop("readonly")) {
                            inputCustomfontIcon.val($(this).attr("class"));
                            if (inputCustomfontIcon.parent().find('.cancel-Icon-Font').length === 0)
                                FgCommon.createCancelButtonIconFont(iconFontSettingTypeEnum.customIconFonts);
                        }
                    });
                }
                //return customIconFonts;
            }
        }).done(function () {
            // Add icon fonts to customIconFontSettingTab
            $('#' + idElementEditForm.customIconFontSettingTab).append(customIconFonts);
            // Add events
        });
        //return iconList;
    }

    static createCustomIconFontDiv_EditPopUp(element) {
        // Add custom icon fonts to custom panel by ajax
        FgCommon.getCustomIconFonts(element);
    }

    static labelIsOutOfElements() {
        var tagNames = [];
        tagNames.push(FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.TEXTBOX));
        return tagNames;
    }

    static getDefaultLabelElement(element) {
        return element.closest(".fg-el-placeholder").find('.fg-Label-element');
    }

    static saveParam() {
        let tblParam = document.getElementById(idElementEditForm.tableBindingParams);
        let savedData = '';
        for (let i = 1; i < tblParam.rows.length; i++) {
            let paramName = tblParam.rows[i].cells[1].querySelector(`#${idElementEditForm.bindingVariableParamName}`).value;
            let paramValue = tblParam.rows[i].cells[3].querySelector('#' + idElementEditForm.bindingVariableParamControls).value;
            let paramIsDependent = tblParam.rows[i].cells[0].querySelector('#' + idElementEditForm.bindingVariableParamIsDependent).checked;
            savedData += paramName + ":" + paramValue + ":" + paramIsDependent + ',';
        }
        return savedData.trim(',');
    }

    static updateBindingParameter_EditPopUp(element) {
        element.attr("data-parameter", FgCommon.saveParam());
    }

    // Update css class attribute in edit popup
    static updateCssClassAttributes_EditPopUp(element) {
        var cssClass = FgCommon.jq_getElementById(idElementEditForm.class).val();
        element.removeAttr("class");
        element.addClass(cssClass);
    }

    // Update label of element in edit popup
    // Label of element has "fg-Label-element" class
    // In LINK element, label is .html element and we need to change only it's html
    static updateLabelElement_EditPopUp(element) {

        var labelElement = FgCommon.getDefaultLabelElement(element);
        // This used for LINK element
        /*if (Object.keys(FG_ElementTypeEnum).filter(item => item === element.attr('fg_element_type')).length > 0)*/
        if (element.attr('fg_element_type') === FgCommon.getEnumKey(FG_ElementTypeEnum, FG_ElementTypeEnum.LINK)) {
            labelElement = element;
            labelElement.html(FgCommon.jq_getElementById(idElementEditForm.label).val());
            return;
        }
        if (element.attr('fg_element_type') === FgCommon.getEnumKey(FG_ElementTypeEnum, FG_ElementTypeEnum.TITLE)) {
            labelElement = element;
            labelElement.html(FgCommon.jq_getElementById(idElementEditForm.label).val());
            return;
        }
        if ($.inArray(FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.TEXTBOX), FgCommon.labelIsOutOfElements()) === 0) {
            labelElement.html(FgCommon.jq_getElementById(idElementEditForm.label).val());
            return
        }
    }

    static updateBindingAttribute_EditPopUp(element) {
        var fillElement = FgCommon.jq_getElementById(idElementEditForm.bindingFillElement);
        var fillListElement = FgCommon.jq_getElementById(idElementEditForm.bindingFillListElement);
        var mapElement = FgCommon.jq_getElementById(idElementEditForm.bindingMapElement);
        var fillElementKey = FgCommon.jq_getElementById(idElementEditForm.bindingFillElementKey);
        var fillElementText = FgCommon.jq_getElementById(idElementEditForm.bindingFillElementText);
        if (fillListElement != null)
            element.attr("data-fillList", fillListElement.val());
        if (fillElement != null)
            element.attr("data-fill", fillElement.val());
        if (mapElement != null)
            element.attr("data-map", mapElement.val());
        if (fillElementKey != null)
            element.attr("data-key", fillElementKey.val());
        if (fillElementText != null)
            element.attr("data-text", fillElementText.val());
    }

    // Update Max length of element in edit popup
    static updateMaxlengthAttribute_EditPopUp(element) {
        var maxLengthElement = FgCommon.jq_getElementById(idElementEditForm.maxLengthField);
        if (maxLengthElement.val()) {
            element.attr("maxlength", maxLengthElement.val());
        }
    }

    // Update help text of element in edit popup
    static updateHelpTextElement_EditPopUp(element) {
        let labelElement = FgCommon.getDefaultLabelElement(element);
        let helpTextElement = FgCommon.jq_getElementById(idElementEditForm.helpText);
        if (helpTextElement.val()) {
            let toolTipElement = element.closest(".fg-el-placeholder").find('.fg_TooltipElement');
            if (toolTipElement.length > 0)
                toolTipElement.attr('data-original-title', helpTextElement.val());
            else {
                let toolTipAtrr = new elementAttributes(htmlElementType.i, 'fa fa-exclamation-circle fg_TooltipElement');
                let toolTip = FgCommon.createNewChild(toolTipAtrr);
                toolTip.attr("data-toggle", "tooltip");
                toolTip.attr('data-original-title', helpTextElement.val());
                toolTip.insertAfter(labelElement);
                toolTip.tooltip();
            }
        }
        else {
            let toolTipElement = element.closest(".fg-el-placeholder").find('.fg_TooltipElement');
            if (toolTipElement.length > 0)
                toolTipElement.remove();
        }
    }

    //Once
    //Update aloow select multiple files in edit popup
    static updateAllowSelectMultipleFilesElement_EditPopUp(element) {
        var allowSelectMultipleFiles = FgCommon.jq_getElementById(idElementEditForm.chkSelectMultipleFiles);
        if (allowSelectMultipleFiles.prop("checked"))
            element.prop("multiple", true);
        else
            element.prop("multiple", false);
    }

    // Update entityVariableId
    static updateEntityVariableIdElement_EditPopUp(element) {
        var entityVariableId = FgCommon.jq_getElementById(idElementEditForm.entityVariableId);
        element.attr("data-entityvariableid", entityVariableId.val());
    }

    // Update DocumentDefID
    static updateDocumentDefIDElement_EditPopUp(element) {
        element.attr("data-DocumentDefID", getComboTreeValues(window["documentDefComboTree"]));
    }

    //update all inputs related to Events attributes.
    static updateEventAttribute_EditPopUp(jqElement) {
        document.querySelectorAll('input[data-eventcode]').forEach(function (item) {
            let code = item.getAttribute('data-eventcode');
            let functionName = item.value;
            let eventName = item.id.replace(idElementEditForm.FunctionName + "_", "");
            if (functionName != "") {
                jqElement.get(0).setAttribute(eventAttribute.data_eventcode + '-' + eventName, code);
                jqElement.get(0).setAttribute(eventAttribute.data_eventfunction + '-' + eventName, functionName);
            } else {
                jqElement.get(0).removeAttribute(eventAttribute.data_eventcode + '-' + eventName);
                jqElement.get(0).removeAttribute(eventAttribute.data_eventfunction + '-' + eventName);
            }
        });
    }

    //update visibility expression code
    static updateVisibilityExpression_EditPopUp(jqElement) {
        jqElement.attr("data-expressionVisibilityCode", document.getElementById(idElementEditForm.txtExpressionVisibilityCode).getAttribute('data-code'));
    }

    //Once
    // Update html data-type of element in edit popup
    static updateTextBoxTypeElement_EditPopUp(element) {
        var htmlType = FgCommon.jq_getElementById(idElementEditForm.ddlElementSubTypes).val();
        //if it is password set type equals to password otherwise set type equals to text
        if (htmlType == FgCommon.getEnumKey(textBoxTypeEnum, textBoxTypeEnum.password)) {
            element.attr("type", htmlType);
        }
        else {
            element.attr("type", FgCommon.getEnumKey(textBoxTypeEnum, textBoxTypeEnum.text));
        }
        element.attr("data-type", htmlType);
    }

    //Once
    // Update Pattern of element in edit popup
    static updatePatternAttribute_EditPopUp(element) {
        var patternElement = FgCommon.jq_getElementById(idElementEditForm.patternField);
        element.attr("data-pattern", patternElement.val());
    }

    // Update validation group name of element in edit popup
    static updateValidationGroupAttribute_EditPopUp(element) {
        var validationGroup = FgCommon.jq_getElementById(idElementEditForm.validationGroup);
        element.attr("data-val-group", validationGroup.val());
    }

    // Update required filed as class of element in edit popup
    static updateRequiredFiled_EditPopUp(element) {
        var requiredFieldElement = FgCommon.jq_getElementById(idElementEditForm.chkRequriedField);
        if (requiredFieldElement.prop("checked"))
            element.addClass("required-field empty-field");
        else
            element.removeClass("required-field empty-field");
    }

    // Update Icon font of element in edit popup
    static updateIconFontElement_EditPopUp(element) {
        debugger;
        if (FgCommon.jq_getElementById(idElementEditForm.chkHasIconFontField).prop("checked")) {

            if (!element.parent().hasClass("input-group")) {
                // Maybe element didn't have icon font before
                var defaultIconFontDiv = FgCommon.createDefaultIconFontDiv_EditPopUp();
                element.parent().append(defaultIconFontDiv);

                // This code moves element to input group
                element.detach()
                    .appendTo(defaultIconFontDiv);
            }

            // Custom font icon
            var customfontIconElement = FgCommon.jq_getElementById(idElementEditForm.customfontIcon);
            if (customfontIconElement.val()) {
                FgCommon.setFontIcon(element, customfontIconElement.val());
            }
        }
        else {
            // Remove icon font span of element
            if (element.parent().hasClass("input-group")) {
                var oldParentElement = element.parent();
                element.parent().parent().append(element);
                oldParentElement.remove();
            }
        }
    }

    static setFontIcon(element, value) {
        if (element.get(0).parentElement.querySelector('.input-group-prepend') != null)
            element.get(0).parentElement.querySelector('.input-group-prepend').remove();
        element.parent().prepend(`<div class="input-group-prepend"><span class="input-group-text"><i class="${value}"></i></span></div>`)
    }

    // Update options of element in edit popup
    static updateOptionsElement_EditPopUp(element, type) {
        var isSwitch = false;
        // Clear options
        if (type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.DROPDOWNLIST))
            element.find("option").remove();
        if (type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.RADIOBUTTONLIST))
            element.find(".radio").remove();
        if (type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CHECKBOXLIST) ||
            type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CHECKBOX)) {
            var label = element.find('label');

            if (label.hasClass("checkbox"))
                element.find(".checkbox").remove();

            if (label.hasClass("switch")) {
                element.find(".switch").remove();
                isSwitch = true;
            }
        }

        var divOptions = FgCommon.jq_getElementById(idElementEditForm.divOptions);
        var optionsList = divOptions.find(".input-group");

        let optionsLabels = [];
        $.each(optionsList, function () {
            var opDiv = this;
            let selected;
            if (type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.RADIOBUTTONLIST) || type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.DROPDOWNLIST))
                selected = $(opDiv).find('input[type=radio]').prop("checked");

            else if (type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CHECKBOXLIST) ||
                type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CHECKBOX))
                selected = $(opDiv).find('input[type=checkbox]').prop("checked");

            var label = $(opDiv).find('.option-label').val();
            var value = $(opDiv).find('.option-value').val();

            if (type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.DROPDOWNLIST))
                FgCommon.createOptionForDropDownElement(element, label, value, selected);
            else if (type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.RADIOBUTTONLIST)) {
                var objCustomOption = new customOption({ type: inputTypeEnum.radio, text: label, value: value, checked: selected });
                optionsLabels.push(objCustomOption);
            }
            else if (type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CHECKBOXLIST) ||
                type === FgCommon.getHFG_ElementTypeEnumKey(FG_ElementTypeEnum.CHECKBOX)) {
                var objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: label, value: value, checked: selected });
                optionsLabels.push(objCustomOption);
            }

        });
        element.find('div').remove();
        element.append(FgCommon.createCustomOption(optionsLabels));
        element.find('div')[0].className = element.get(0).className;
    }

    // Create option for dropdown (select)
    static createOptionForDropDownElement(dropDown, text, value, selected) {
        var optionAtrr = new elementAttributes();
        optionAtrr.htmlType = htmlElementType.option;
        optionAtrr.text = text;
        optionAtrr.value = value;

        var option = FgCommon.createNewChild(optionAtrr);
        if (selected === true) {
            // .prop method chenges DOM but doesn't chenge HTML source code
            // For this situation we need to use .atrr method like below
            option.attr("selected", true);
        }

        dropDown.append(option);
    }

    // Update inline class of element in edit popup
    static updateInlineClass_EditPopUp(element) {
        var chkIsInline = FgCommon.jq_getElementById(idElementEditForm.chkIsInline);
        let typeKey = element.attr('fg_element_type');
        if (typeKey != null) {
            let elementTypeName = element.find('input').attr('type');

            // The class
            let reGetInlineClass = new RegExp('(?:^|\\s)' + elementTypeName + '-(.*?)((?!\\S)|$)');
            let editedClass = FgCommon.getInlineClassInputs(false, elementTypeName, chkIsInline.prop("checked"));
            //change both element and children class
            element.attr('class', element.attr('class').replace(reGetInlineClass, editedClass));
            $(element.children()[0]).attr('class', $(element.children()[0]).attr('class').replace(reGetInlineClass, editedClass));
        }

    }

    // Update switch class of element in edit popup
    static updateSwitchClass_EditPopUp(element) {
        var chkIsSwitch = FgCommon.jq_getElementById(idElementEditForm.chkIsSwitch);
        var label = element.find('label');
        label.removeAttr("class");
        if (chkIsSwitch.prop("checked")) {
            label.addClass("switch");
        }
        else {
            label.addClass("checkbox");
        }
    }


    // Update required filed as attribute of element in edit popup
    static updateRequiredFiledAttribute_EditPopUp(element) {
        var requiredFieldElement = document.getElementById(idElementEditForm.chkRequriedField);
        if (requiredFieldElement.checked == true)
            element.attr("data-isRequired", 'true');
        else
            element.attr("data-isRequired", 'false');
    }

    //Once  updateDropDownElement_EditPopUp
    // Update Placeholder of element in edit popup
    static updatePlaceholderAttribute_EditPopUp(element) {
        var placeholderFieldElement = FgCommon.jq_getElementById(idElementEditForm.placeholderField);
        if (placeholderFieldElement.val()) {
            element.attr("placeholder", placeholderFieldElement.val());
        }
    }

    //Once  updateTitleElement_EditPopUp
    // Update html h(1-9) tagName of element in edit popup
    static updateHtmlTitleElementTagName_EditPopUp(element) {
        var htmlType = FgCommon.jq_getElementById(idElementEditForm.ddlElementSubTypes).val();
        if (htmlType != null) {
            element.attr("type", htmlType);
            var _object = document.getElementById(element.attr('id'));
            _object.outerHTML = _object.outerHTML.replace(new RegExp(_object.tagName.toLowerCase(), "g"), htmlType);
        }
    }

    // Default form in edit popup without input-group
    static createDefaultColForElementAttributeWithoutInputGroup_EditPopUp(elementAttribute, colClass) {
        var rootDiv = FgCommon.createDefaultColForPopup(colClass);
        // Add elements
        rootDiv.append(elementAttribute);
        return rootDiv;
    }

    static createDocumentDefTreeDiv_EditPopUp(element) {
        var documentDefID = element.attr("data-DocumentDefID");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.documentdefid, documentDefID);
        elementAttribute.attr("type", "text");
        elementAttribute.attr("data-isDocumentDefComboTree", "true");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.documentDefTree, "fa fa-text-width");
        return formGroup;
    }

    static createDropDownHtmlElement(dropDownListId, value, hasOptionalItem, data) {
        var select = FgCommon.createNewChild(new elementAttributes(htmlElementType.select, "form-control", dropDownListId));
        if (hasOptionalItem) {
            var optionAttribute = new elementAttributes(htmlElementType.option);
            optionAttribute.text = lang.FG.listItemDefault;
            optionAttribute.value = '';
            var subTypeOption = FgCommon.createNewChild(optionAttribute);
            select.append(subTypeOption);
        }

        let options = '';
        for (let i = 0; i < data.length; i++) {
            options += `<option value="${data[i].value}">${data[i].text}</option>`;
        }
        select.append(options);

        select.val(value);
        return select;
    }

    static createEntityDropDownHtmlElement(dropDownListId, value, hasOptionalItem) {
        var select = FgCommon.createNewChild(new elementAttributes(htmlElementType.select, "form-control", dropDownListId));
        if (hasOptionalItem) {
            var optionAttribute = new elementAttributes(htmlElementType.option);
            optionAttribute.text = lang.FG.listItemDefault;
            optionAttribute.value = '';
            var subTypeOption = FgCommon.createNewChild(optionAttribute);
            select.append(subTypeOption);
        }
        window["addEntityVariablesOption"](select);

        select.val(value);
        return select;
    }

    //it is used for binding variable which its types are entity to controls like file uploader variable. 
    static createEntityVariableComboDiv_EditPopUp(element) {
        var bindingEntityVariableId = element.attr("data-entityvariableid");
        var elementAttribute = FgCommon.createEntityDropDownHtmlElement(idElementEditForm.entityVariableId, bindingEntityVariableId, true);
        elementAttribute.attr("type", "text");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.entityVariableCombo, "fa fa-text-width", null, "col-sm-6");

        formGroup.find('.input-group').append(FgCommon.createAddVariableButton(idElementEditForm.addVariableLinkForDocumentEntity, idElementEditForm.entityVariableId));

        return formGroup;
    }

    // Generate Single Tab for edit popup
    static generateSingleTab_EditPopUp(tabPanel, item) {

        var ul = tabPanel.find('ul');
        var tabContent = tabPanel.find('.tab-content');

        var aTag = $(`<a role="tab" data-toggle="tab" class="nav-link ${item.label.indexOf(lang.FG.baseSettingTab) > -1 ? 'active show' : ''}"></a>`)
            .attr("href", item.href)
            .attr("aria-controls", item.ariaControls)
            .html(item.label);

        // Tab li
        var li = $(`<li role="presentation" class="nav-item ${item.label.indexOf(lang.FG.baseSettingTab) > -1 ? 'active' : ''} "> </li>`)
            .addClass(item.cssClass)
            .append(aTag);

        // Add to ul
        ul.append(li);

        // tabDiv
        var tabDiv = $('<div role="tabpanel" class="tab-pane"> </div>');
        tabDiv.addClass(item.cssClass);
        tabDiv.attr("id", item.id);
        // Add to ul
        tabContent.append(tabDiv);
    }

    // This method used for getting css class of inputs according 
    static getInlineClassInputs(isEnum, inputType, isInline = false) {
        let inlineArray = isEnum ? [FgCommon.getEnumKey(inputTypeEnum, inputType)] : [inputType];
        if (isInline) {
            inlineArray.push(inlineClassEnum.inline);
        }
        else
            inlineArray.push(inlineClassEnum.list);

        return inlineArray.join("-");
    }

    // This method used for inline (horizontally) or vertically
    static createInlineElementDiv_EditPopUp(type, element) {
        let col6 = FgCommon.createDefaultColForPopup();

        let isChecked = element.find('.' + FgCommon.getInlineClassInputs(true, inputTypeEnum.checkbox, true)).length > 0;
        if (!isChecked)
            isChecked = element.hasClass(FgCommon.getInlineClassInputs(true, inputTypeEnum.checkbox, true));
        if (!isChecked)
            isChecked = element.find('.' + FgCommon.getInlineClassInputs(true, inputTypeEnum.radio, true)).length > 0;
        if (!isChecked)
            isChecked = element.hasClass(FgCommon.getInlineClassInputs(true, inputTypeEnum.radio, true));

        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.InlineElementName, checked: isChecked, id: idElementEditForm.chkIsInline });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);

        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);
        return col6;
    }

    // This method used for inline (horizontally) or vertically
    static createIsSwitchDiv_EditPopUp(type, element) {
        var col6 = FgCommon.createDefaultColForPopup();
        var isChecked = element.find('label').hasClass('switch');

        var objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.IsSwitchName, checked: isChecked, id: idElementEditForm.chkIsSwitch });
        var checkbox = FgCommon.createCustomOption(objCustomOption, true);

        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);
        return col6;
    }

    static createBimdindParamsTableControl(inputId, ParamValues) {
        let tblParam = document.createElement('table');
        tblParam.id = inputId;
        tblParam.className = 'table table-bordered';
        tblParam.createTHead();
        let tHeadRow = tblParam.tHead.insertRow(-1);
        tHeadRow.className = 'text-center';
        tHeadRow.insertCell().innerHTML = lang.FG.paramsTableAutoUpdate;
        tHeadRow.insertCell().innerHTML = lang.FG.paramsTableParameter;
        tHeadRow.cells[1].style.width = "30%";
        tHeadRow.insertCell().innerHTML = lang.FG.paramsTableOperand;
        tHeadRow.insertCell().innerHTML = lang.FG.paramsTableControl;
        tHeadRow.cells[3].style.width = "30%";
        tHeadRow.insertCell().innerHTML = lang.FG.paramsTableOperation;
        tHeadRow.innerHTML = replaceAll(tHeadRow.innerHTML, 'td', 'th');
        tblParam.createTBody();

        if (ParamValues != null && ParamValues != '') {
            for (let i = 0; i < ParamValues.split(',').length; i++) {
                let _code = ParamValues.split(',')[i];
                if (_code != '') {
                    let tBodiesRow = tblParam.tBodies[0].insertRow(-1);
                    tBodiesRow.className = 'text-center';

                    let paramName = _code.split(':')[0];
                    let paramValue = _code.split(':')[1];
                    let paramIsDependent = _code.split(':')[2];


                    tBodiesRow.insertCell(0).innerHTML = `<input type="checkbox" name="${idElementEditForm.bindingVariableParamIsDependent}" id="${idElementEditForm.bindingVariableParamIsDependent}" ${paramIsDependent == "true" ? "checked" : ""} />`;
                    tBodiesRow.insertCell(1).innerHTML = `<input id="${idElementEditForm.bindingVariableParamName}" type="text" class="form-control" style="direction:ltr;" value="${paramName}" />`;
                    tBodiesRow.insertCell(2).innerHTML = "=";
                    tBodiesRow.insertCell(3).innerHTML = `<select id="${idElementEditForm.bindingVariableParamControls}" name="ddlParamControls" class="form-control"></select>`;
                    FgCommon.setddlParamControls(tBodiesRow.cells[3].querySelector('#' + idElementEditForm.bindingVariableParamControls), paramValue);
                    tBodiesRow.insertCell(4).innerHTML = ` <a href="#" class="delete-row btn btn-sm btn-clean btn-icon" title="${lang.FG.delete}"><span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span></a>`;
                }
            }
        }

        return tblParam;
    }
    //set a select html element using form controls
    static setddlParamControls(_ddlParamControls, selected) {
        _ddlParamControls.innerHTML = `<option value="-1">${lang.FG.listItemDefault}</option>`;
        JSON.parse(FormGeneratorMethod.saveContent()).rows.forEach(function (item) {

            if (item.type == FG_ElementTypeEnum.ACCORDION) {
                item.cards.forEach(function (card) {
                    card.rows.forEach(function (row) {
                        row.columns.forEach(function (column) {
                            column.children.forEach(function (element) {
                                _ddlParamControls.innerHTML += `<option value="${element.id}" ${selected == element.id ? "selected" : ""}>${(element.label == '' || element.label == null || element.type == 'HTMLCODE') ? element.id : element.label}</option>`;
                            })
                        })
                    })
                })
            }
            else {
                item.columns.forEach(function (column) {
                    column.children.forEach(function (element) {
                        _ddlParamControls.innerHTML += `<option value="${element.id}" ${selected == element.id ? "selected" : ""}>${(element.label == '' || element.label == null || element.type == 'HTMLCODE') ? element.id : element.label}</option>`;
                    })
                })
            }
        })
    }

    static addParamRow() {
        let tblBindingParams = document.getElementById(idElementEditForm.tableBindingParams);
        let tBodiesRow = tblBindingParams.tBodies[0].insertRow(-1);
        tBodiesRow.className = 'text-center';

        tBodiesRow.insertCell(0).innerHTML = `<input type="checkbox" name="${idElementEditForm.bindingVariableParamIsDependent}" id="${idElementEditForm.bindingVariableParamIsDependent}" />`;
        tBodiesRow.insertCell(1).innerHTML = `<input id="${idElementEditForm.bindingVariableParamName}" type="text" value="" style="direction:ltr;" class="form-control" />`;
        tBodiesRow.insertCell(2).innerHTML = "=";
        tBodiesRow.insertCell(3).innerHTML = `<select id="${idElementEditForm.bindingVariableParamControls}" type="text" value="" class="form-control" ></select>`;
        tBodiesRow.insertCell(4).innerHTML = `<a href="#" class="delete-row btn btn-sm btn-clean btn-icon btn-icon-md" title="${lang.FG.delete}"><span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span></a>`;
        FgCommon.setddlParamControls(tBodiesRow.cells[3].querySelector('#' + idElementEditForm.bindingVariableParamControls), '');
    }

    //dependent 
    static createBindingVariableParamsDiv_EditPopUp(element) {
        var bindingVariableParams = element.attr("data-parameter");
        let divContainer = document.createElement('div');
        divContainer.innerHTML = `<a href="javascript:;" class="btn btn-danger font-weight-bolder" id="btnAddNewParamRow" onclick="addParamRow(); return false;">
                        	${lang.FG.newParameter}</a>`;

        var elementAttribute = FgCommon.createBimdindParamsTableControl(idElementEditForm.tableBindingParams, bindingVariableParams);
        divContainer.innerHTML += '<div class="bpms-table bpms-table-bordered bpms-table-head-custom bpms-table-default mt-2"><div class="table-information table-responsive">' + elementAttribute.outerHTML + '</div></div>';
        let formGroup = FgCommon.createDefaultColForElementAttributeWithoutInputGroup_EditPopUp(divContainer, "col-sm-12");
        return formGroup;
    }

    //set a select html element using form controls
    static setddlCoddingRControls(_ddlCoddingRControls, selected) {
        _ddlCoddingRControls.innerHTML = `<option value="-1">${lang.FG.listItemDefault}</option>`;
        JSON.parse(FormGeneratorMethod.saveContent()).rows.forEach(function (item) {

            if (item.type == FG_ElementTypeEnum.ACCORDION) {
                item.cards.forEach(function (card) {
                    card.rows.forEach(function (row) {
                        row.columns.forEach(function (column) {
                            column.children.forEach(function (element) {
                                _ddlParamControls.innerHTML += `<option value="${element.id}" ${selected == element.id ? "selected" : ""}>${(element.label == '' || element.label == null || element.type == 'HTMLCODE') ? element.id : element.label}</option>`;
                            })
                        })
                    })
                })
            }
            else {
                item.columns.forEach(function (column) {
                    column.children.forEach(function (element) {
                        _ddlCoddingRControls.innerHTML += `<option value="${element.id}" ${selected == element.id ? "selected" : ""}>${(element.label == '' || element.label == null || element.type == 'HTMLCODE') ? element.id : element.label}</option>`;
                    })
                })
            }
        })
    }
}


var eventAttribute = {
    data_eventfunction: "data-eventfunction",
    data_eventcode: "data-eventcode",
}

var eventType = {
    change: "change",
    click: "click",
    blur: "blur",
    focus: "focus",
}

const inlineClassEnum = {
    list: "list",
    inline: "inline",
}

// This ids use for editting element in edit popup
var idElementEditForm = {
    id: "txtIdElement",
    optionalCaption: "txtOptionalcaption",
    class: "txtClassElement",
    label: "txtLableElement",
    txtWidthElement: "txtWidthElement",
    txtHeightElement: "txtHeightElement",
    txtWidthDnnModal: "txtWidthDnnModal",
    txtHeightDnnModal: "txtHeightDnnModal",
    txtExpressionVisibilityCode: "txtExpressionVisibilityCode",
    txtSrcImage: "txtSrcImage",
    txtHrefLink: "txtHrefLink",
    txtSitekey: "txtSitekey",
    txtPrivatekey: "txtPrivatekey",
    ddlElementSubTypes: "ddlElementSubTypes",
    ddlElementAccessTypes: "ddlElementAccessTypes",
    ddlElementForms: "ddlElementForms",
    ddlElementClassNames: "ddlElementClassNames",
    ddlHrefTypes: "ddlHrefTypes",
    ddllanguageListsGoogleCaptcha: "ddllanguageListsGoogleCaptcha",
    divBootstrapBtnStyle: "divBootstrapBtnStyle",
    hdnBootstrapBtnStyle: "hdnBootstrapBtnStyle",
    helpText: "txtHelpText",
    chkRequriedField: "chkRequriedField",
    chkIsFooterField: "chkIsFooterField",
    chkhasOptionalField: "chkhasOptionalField",
    chkReadOnlyField: "chkReadOnlyField",
    chisMultilineField: "chisMultilineField",
    displayLegend: "txtDisplayLegend",
    chartIsSmooth: "ddlChartIsSmooth",
    chkRefreshedParentAfterClosingPopUp: "chkRefreshedParentAfterClosingPopUp",
    chkAllowMultipleSelectionsField: "chkAllowMultipleSelectionsField",
    chkHasIconFontField: "chkHasIconFontField",
    chkIsInline: "chkIsInline",
    chkIsSwitch: "chkIsSwitch",
    chkFileTypeImage: "chkFileTypeImage",
    chkFileTypeVideo: "chkFileTypeVideo",
    chkFileTypeAduio: "chkFileTypeAduio",
    chkSelectMultipleFiles: "chkSelectMultipleFiles",
    cblThemeListsGoogleCaptcha: "cblThemeListsGoogleCaptcha",
    maxLengthField: "txtMaxLengthField",
    patternField: "txtpatternField",
    placeholderField: "txtPlaceholderField",
    divFontawesomeList: "divFontawesomeList",
    fontIcon: "txtFontIconElement",
    customfontIcon: "txtCustomFontIconElement",
    divCustomFontIcons: "divCustomFontIcons",
    customIconFontSettingTab: "customIconFontSettingTab",
    optionManagmentTab: "optionManagmentTab",
    popUpManagmentTab: "popUpManagmentTab",
    divOptions: "divOptions",
    btnAddOptions: "btnAddOptions",
    txtAvailableCustomFileType: "txtAvailableCustomFileType",
    imgForDrag: "imgForDrag",
    edithtmlCkEditor: "edithtmlCkEditor",
    entityVariableId: "entityVariableId",
    documentdefid: "documentdefid",
    formId: "formId",
    validationGroup: "validationGroup",
    selectVariable: "selectVariable",
    //binding
    bindingTab: "bindingTab",
    bindingFillElement: "ddlBindingFillElement",
    bindingFillListElement: "ddlbindingFillListElement",
    bindingFillElementText: "txtBindingFillElementText",
    bindingFillElementKey: "txtBindingFillElementKey",
    bindingMapElement: "ddlBindingMapElement",
    bindingVariableParamName: "txtBindingVariableParamName",
    bindingVariableParamControls: "ddlParamControls",
    bindingVariableParamIsDependent: "chkIsDependent",
    tableBindingParams: "tblBindingParams",
    addVariableLinkForFill: "lnkAddVariableLinkForFill",
    addVariableLinkForFillList: "lnkAddVariableLinkForFillList",
    addVariableLinkForMap: "lnkAddVariableLinkForMap",
    addVariableLinkForDocumentEntity: "lnkAddVariableLinkForDocumentEntity",
    //backend codding
    btnAddNewBackendCoding: "btnAddNewBackendCoding",
    //codding
    coddingTab: "coddingTab",
    tableCodding: "tblCodding",
    //Script
    scriptTab: "scriptTab",
    FunctionName: "txtFunctionName",
    txtCallBackScript: "txtCallBackScript",
    // Date picker
    chkDtpWatchingOptions: "chkDtpWatchingOptions",
    ddlDtpCalType: "ddlDtpCalType",
    ddlDtpType: "ddlDtpType",
    ddlDtpDefault: "ddlDtpDefault",
    txtDtpDisabled: "txtDtpDisabled",
    chkDtpFreezeInput: "chkDtpFreezeInput",
    chkDtpSmartDisabling: "chkDtpSmartDisabling",
    txtDtpFormat: "txtDtpFormat",
    chkDtpMultiple: "chkDtpMultiple",
    chkDtpAutoClose: "chkDtpAutoClose",
    chkDtpTransition: "chkDtpTransition",
    txtDtpGregorianStartDay: "txtDtpGregorianStartDay",
    txtDtpGregorianDic: "txtDtpGregorianDic",
    txtDtpJalaliDic: "txtDtpJalaliDic",
    txtDtpZindex: "txtDtpZindex",
    //data grid
    txtPageSize: "txtPageSize",
    chkHasPaging: "chkHasPaging",
    chkShowExcel: "chkShowExcel",
    chkShowPdf: "chkShowPdf",
    chkAutoPaging: "chkAutoPaging",
    ddlElementSortTypes: "ddlElementSortTypes",
    txtSortColumn: "txtSortColumn",
    txtDataGridReportHeader: "txtDataGridReportHeader",
    txtDataGridReportFooter: "txtDataGridReportFooter",
    txtDataGridReportGridHeaderColor: "txtDataGridReportGridHeaderColor",
    txtDataGridReportGridFooterColor: "txtDataGridReportGridFooterColor",
    txtDataGridReportGridEvenColor: "txtDataGridReportGridEvenColor",
    txtDataGridReportGridOddColor: "txtDataGridReportGridOddColor",
    ddlReportPaperSizeEnum: "ddlReportPaperSizeEnum",
    chkDataGridReportShowDate: "chkDataGridReportShowDate",
    //file uploader
    txtUploaderdeleteClass: " txtUploaderdeleteClass",
    txtUploaderdownloadClass: " txtUploaderdownloadClass",
    txtUploaderdeleteCaption: " txtUploaderdeleteCaption",
    txtUploaderdownloadCaption: " txtUploaderdownloadCaption",
    //button
    chkHasConfirm: "chkHasConfirm",
    txtButtonConfirmText: "txtButtonConfirmText",
    txtButtonConfirmAccept: "txtButtonConfirmAccept",
    txtButtonConfirmReject: "txtButtonConfirmReject",
    chkHasExpressionConfirm: "chkHasExpressionConfirm",
    chkExpressionConfirmHasFalseAction: "chkExpressionConfirmHasFalseAction",
    txtExpressionConfirmText: "txtExpressionConfirmText",
    txtExpressionConfirmCode: "txtExpressionConfirmCode",
    //FgChart
    chartType: "ddlChartType",
    ddlChartPieColorType: "ddlChartPieColorType",
    tableBindingDataSet: "tblChartBindingDataSet",
    bindingChartVariableDataSet: "ddlChartVariableDataSet",
    bindingChartVariableDataSetField: "ddlChartVariableDataSetField",
    bindingChartColorDataSet: "txtChartColorDataSet",
    bindingChartLabelDataSet: "txtChartLabelDataSet",
    chartLabelDataField: "txtChartLabelDataField",
    chartPieColorFieldName: "txtchartPieColorFieldName",
    bindingChartFillListLabel: "ddlBindingChartFillListLabel",
    chartTableInputPieColor: "txtChartTablePieColor",
    chartTablePieColor: "chartTablePieColor",
    //Captcha
    txtCaptchaLength: "txtCaptchaLength",
};

// html element type enum
var htmlElementType = {
    div: 'div',
    a: 'a',
    button: 'button',
    input: 'input',
    span: 'span',
    i: 'i',
    label: 'label',
    select: 'select',
    option: 'option',
    img: 'img',
    h: 'h',
    textarea: 'textarea',
    ul: 'ul',
    li: 'li',
    table: 'table',
};

export { FgCommon as default, eventAttribute, eventType, idElementEditForm, htmlElementType }

// html element type enum
export var headerTagTypeEnum = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    h6: 6,
};

export class elementAttributes {
    constructor(htmlType, cssClass, id, text, value, style, htmlSubType, name, fg_ElementType) {
        this.htmlType = htmlType;
        this.cssClass = cssClass;
        if (id != 'undefind')
            this.id = id;
        this.text = text;
        this.value = value;
        this.style = style;
        this.htmlSubType = htmlSubType;
        this.name = name;
    }
}

export var inputTypeEnum = {
    radio: 'radio',
    checkbox: 'checkbox',
    file: 'file',
    text: 'text',
    hidden: 'hidden',
};

export var buttonTypeEnum = {
    submit: "submit",
    button: "button",
    reset: "reset",
};

export var accessTypeEnum = {
    add: "1",
    edit: "2",
    delete: "3",
    view: "4",
};

export var textBoxTypeEnum = {
    text: lang.FG.textBoxTypetext,
    threadTaskDescription: lang.FG.textBoxTypethreadTaskDescription,
    password: lang.FG.textBoxTypepassword,
    email: lang.FG.textBoxTypeemail,
    codeMeli: lang.FG.textBoxTypecodeMeli,
    justCharacter: lang.FG.textBoxTypejustCharacter,
    justNumber: lang.FG.textBoxTypejustNumber,
    postalCode: lang.FG.textBoxTypepostalCode,
    mobile: lang.FG.textBoxTypemobile,
    justEnglishCharacter: lang.FG.textBoxTypejustEnglishCharacter,
    symbol: lang.FG.textBoxTypesymbol,
    characterAndNumber: lang.FG.textBoxTypecharacterAndNumber,
    money: lang.FG.textBoxTypeMoney,
    phone: lang.FG.textBoxTypephone,
    enCharacterAndNumber: lang.FG.textBoxTypeenCharacterAndNumber,
    codeMeliCompany: lang.FG.textBoxTypecodeMeliCompany,
};
// This class uses Destructuring assignment for having dynamic parameters
export class customOption {
    constructor({ type = "", text = "", value, checked = false, id, name, parentId, isSwitch = false }) {
        this.type = type;
        this.text = text;
        this.value = value;
        this.checked = checked;
        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.isSwitch = isSwitch;
    }
}

export var iconFontSettingTypeEnum = {
    defaultIconFonts: "defaultIconFonts",
    customIconFonts: "customIconFonts",
}
export function BootstrapTab(label, href, ariaControls, id, cssClass) {
    this.label = label;
    this.href = href;
    this.ariaControls = ariaControls;
    this.id = id;
    this.cssClass = cssClass;
}

const fgLabelElementCssClassName = 'fg-Label-element';
const containerCssClassName = 'fg-el-container';
const placeHolderCssClassName = 'fg-el-container';
const fgElementTypeAttributeName = 'fg_element_type';

$.fn.findFgElLabel = function () {
    let fgLabelElement = this.find('.' + fgLabelElementCssClassName);
    if (!fgLabelElement)
        console.log("There isn't any label for element.");
    return fgLabelElement.first().text();
}

window["addParamRow"] = FgCommon.addParamRow;


