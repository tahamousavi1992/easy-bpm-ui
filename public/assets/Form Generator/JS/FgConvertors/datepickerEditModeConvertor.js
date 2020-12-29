
'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgDatepickerEditMode from "../FgElementsEditMode/datepickerEditMode.js"
import FgDatepicker from "../FgElements/datepicker/datepicker.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import { FG_ElementTypeEnum } from "../fgElements/fgElement.js";
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgDatepickerEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    toJQueryObject(fgDatepickerElementEditMode) {

        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgDatepickerElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // datepicker
        let fgDatepicker = fgDatepickerElementEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgDatepicker);
       
        let datepickerJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgDatepickerElementEditMode)
            .attr("type", 'text')
            .attr("fg_element_type", FgDatepicker.getType())
            .attr("data-fill", fgDatepicker.fillBinding)
            .attr("data-map", fgDatepicker.mapBinding)
            .attr("data-readonly", fgDatepicker.readOnly)
            .attr("data-val-group", fgDatepicker.validationGroup)
            .attr("data-showtype", fgDatepicker.showtype) 
            .attr("data-dateformat", fgDatepicker.dateformat)
            .attr("data-parameter", fgDatepicker.parameter);
  
        // isRequired
        FgUtilityConvertor.addRequiredFieldToJqObj(fgDatepicker, datepickerJQueryObject);
 
        FgCommon.setVisibilityCodeObjectToElement(datepickerJQueryObject, fgDatepicker.expressionVisibilityCode);
        FgCommon.addEventsToElements(datepickerJQueryObject, fgDatepicker.events);
        fgDatepicker.fontIconCssClass = 'fa fa-clock';
        // Add fontIconCssClass
        FgUtilityConvertor.addFontIconCssClass(fgDatepicker, datepickerJQueryObject, elPlaceholderJqObj);
         
        return elementContainerJqObj;
    }

    fromJQueryObject(datepickerElementContainer) {

        // Get fgElement
        let datepickerElement = FgUtilityConvertor.getFgElChild(datepickerElementContainer);

        if (FgUtilityConvertor.getFgElType(datepickerElement) !== FgDatepicker.getType())
            console.error("The type of this element isn't DATEPICKER for converting to fgDatepicker.");

        let fgDatepicker = FgDatepicker.createDatepicker(datepickerElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(datepickerElementContainer),
            FgUtilityConvertor.getHelpMessageText(datepickerElementContainer),
            datepickerElement.attr("placeholder"),
            FgUtilityConvertor.hasRequiredClass(datepickerElement),
            datepickerElement.attr("class"),
            datepickerElement.attr("data-showtype"),
            datepickerElement.attr("data-dateformat"),
            datepickerElement.attr("data-fill"),
            datepickerElement.attr("data-map"),
            FgCommon.getEventsFromElement(datepickerElement),
            datepickerElement.attr("data-readonly"),
            FgCommon.getVisibilityCodeObjectFromElement(datepickerElement),
            datepickerElement.attr("data-val-group"),
            datepickerElement.attr("data-parameter")
        );

        let datepickerEditMode = FgDatepickerEditMode.createDatepicker(fgDatepicker,
            datepickerElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(datepickerElementContainer)
        );

        return datepickerEditMode;
    }

    // Fill setting pop up by Captcha attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, scriptTab) {

        baseSettingTab.append(FgCommon.createLabelElementDiv_EditPopUp(type, element));
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));
        baseSettingTab.append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code
        baseSettingTab.append(FgCommon.createReadOnlyFieldDiv_EditPopUp(element));//ReadOnlyField field
        baseSettingTab.append(FgCommon.createRequiredFieldDiv_EditPopUp(element)); // Required field
        // Date picker options
        FgDatepickerEditModeConvertor.createDatePickerOptionsDiv_EditPopUp(element, baseSettingTab);

        //Create validation group name Txt
        baseSettingTab.append(FgCommon.createElementValidationGroupDiv_EditPopUp(element));
        // Arranging cols in form group depend to number of cols
        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        //bindingTab initialize
        bindingTab
            .append(FgCommon.createBindingFillTreeDiv_EditPopUp(element)) // Fill of element   
            .append(FgCommon.createBindingMapTreeDiv_EditPopUp(element));  // Map of element  
        bindingTab.append(FgCommon.createBindingVariableParamsDiv_EditPopUp(element));  //BindingVariable 
        initCombooTree();
        var colsList = bindingTab.find('.col-sm-6,.col-sm-12');
        FgCommon.arrangeColsInFormGroupByColNumber(bindingTab, colsList, 1);

        //set ScriptTab
        scriptTab
            .append(FgCommon.createEventDiv_EditPopUp(element, eventType.change, lang.FG.eventTypeChange));
        var colsList = scriptTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(scriptTab, colsList, 1);
    }

    // Update HtmlCode Element atrributes
    updateElement_EditPopUp(element, type) {

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);
 
        element.attr("data-showtype", FgCommon.jq_getElementById(idElementEditForm.ddlDtpType).val());
        element.attr("data-dateformat", FgCommon.jq_getElementById(idElementEditForm.txtDtpFormat).val());
        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);

        // Update event function attribute of element
        FgCommon.updateEventAttribute_EditPopUp(element);

        // Update ReadOnly filed of element
        FgDatepickerEditModeConvertor.updateReadOnlyFiled_EditPopUp(element);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        //Update validation group attribute of element
        FgCommon.updateValidationGroupAttribute_EditPopUp(element);

        // Update required filed of element
        FgCommon.updateRequiredFiled_EditPopUp(element);

        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);

        //initialDatePicker
        window.initialDatePicker();
    }

    static createDatePickerOptionsDiv_EditPopUp(element, modalBody) {
        // showtype
        let ddlDtpType = $(document.createElement("select"))
            .attr("id", idElementEditForm.ddlDtpType)
            .addClass('form-control')
            .append($(document.createElement('option')).text(lang.FG.datePickerDateTime).val("datetime"))
            .append($(document.createElement('option')).text(lang.FG.datePickerDate).val("date"));

        ddlDtpType.val(element.attr('data-showtype'));

        let dtpTypeColContainer = FgCommon.createDefaultColForElementAttribute_EditPopUp(ddlDtpType, lang.FG.datePickerTimeType, "fa fa-file-text-o");
        modalBody.append(dtpTypeColContainer);

        // format
        let formatCol = FgCommon.createInputControl(idElementEditForm.txtDtpFormat, element.attr('data-dateformat'));
        let formatColContainer = FgCommon.createDefaultColForElementAttribute_EditPopUp(formatCol, lang.FG.datePickerFormat, "fa fa-file-text-o");
        modalBody.append(formatColContainer);
    }

    // Update readOnly filed in edit popup
    static updateReadOnlyFiled_EditPopUp(element) {
        var readOnlyFieldElement = FgCommon.jq_getElementById(idElementEditForm.chkReadOnlyField);
        if (readOnlyFieldElement.prop("checked"))
            element.attr('data-readonly', true);
        else
            element.attr('data-readonly', false);
    }
}

export default FgDatepickerEditModeConvertor