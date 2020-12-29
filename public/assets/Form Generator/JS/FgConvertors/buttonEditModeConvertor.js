'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";
import FgButtonEditMode from "../FgElementsEditMode/buttonEditMode.js"
import FgButton from "../FgElements/button.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgButtonEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    toJQueryObject(fgButtonElementEditMode) {
        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgButtonElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);
        let fgButton = fgButtonElementEditMode.fgElement;
        if (fgButton.backendCoding == 'undefined')
            fgButton.backendCoding = null;

        let buttonJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgButtonElementEditMode)
            .attr("type", fgButton.subtype)
            .attr("data-backendCoding", fgButton.backendCoding)
            .attr("data-accessType", fgButton.accessType)
            .attr("data-accessType", fgButton.accessType)
            .attr("data-openFormParameter", fgButton.openFormParameter)
            .attr("data-openFormId", fgButton.openFormId)
            .attr("data-formWidth", fgButton.formWidth)
            .attr("data-formHeight", fgButton.formHeight)
            .attr("data-openFormCallBackScript", fgButton.openFormCallBackScript)
            .attr("data-hasConfirm", fgButton.hasConfirm)
            .attr("data-confirmText", fgButton.confirmText)
            .attr("data-hasExpressionConfirm", fgButton.hasExpressionConfirm)
            .attr("data-expressionConfirmText", fgButton.expressionConfirmText)
            .attr("data-expressionConfirmHasFalseAction", fgButton.expressionConfirmHasFalseAction)
            .attr("data-val-group", fgButton.validationGroup)
            .text(fgButton.label);

        FgCommon.setConfirmationCodeObjectToElement(buttonJQueryObject, fgButton.expressionConfirmCode);
        FgCommon.setVisibilityCodeObjectToElement(buttonJQueryObject, fgButton.expressionVisibilityCode);
        FgCommon.addEventsToElements(buttonJQueryObject, fgButton.events);

        elPlaceholderJqObj.append(buttonJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(buttonElementContainer) {
        // Get fgElement
        let buttonElement = FgUtilityConvertor.getFgElChild(buttonElementContainer);

        if (FgUtilityConvertor.getFgElType(buttonElement) !== FgButton.getType())
            console.error("The type of this element isn't BUTTON for converting to fgButton.");

        let fgButton = FgButton.createButton(buttonElement.attr("id"),
            buttonElement.text(),
            buttonElement.attr("type"),
            buttonElement.attr("class"),
            FgCommon.getEventsFromElement(buttonElement),
            buttonElement.attr("data-backendCoding"),
            buttonElement.attr("data-accessType"),
            buttonElement.attr("data-openFormParameter"),
            buttonElement.attr("data-openFormId"),
            buttonElement.attr("data-formWidth"),
            buttonElement.attr("data-formHeight"),
            buttonElement.attr("data-openFormCallBackScript"),
            buttonElement.attr("data-hasConfirm") == "true",
            buttonElement.attr("data-confirmText"),
            buttonElement.attr("data-hasExpressionConfirm") == "true",
            buttonElement.attr("data-expressionConfirmText"),
            FgCommon.getConfirmationCodeObjectFromElement(buttonElement),
            buttonElement.attr("data-expressionConfirmHasFalseAction"),
            FgCommon.getVisibilityCodeObjectFromElement(buttonElement),
            buttonElement.attr("data-val-group"));

        return FgButtonEditMode.createButton(fgButton, buttonElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(buttonElementContainer));
    }

    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab) {
        //class name
        baseSettingTab.append(FgCommon.createClassNameDiv_EditPopUp(element));
        //label of element
        baseSettingTab.append(FgCommon.createLabelElementDiv_EditPopUp(type, element));
        //subType name
        baseSettingTab.append(FgCommon.createSubTypeNameDiv_EditPopUp(element));
        //create btn style
        baseSettingTab.append(FgButtonEditModeConvertor.createDivBtnStyle_EditPopUp(element));
        //Create ID Txt
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));
        //AccessType name
        baseSettingTab.append(FgCommon.createAccessTypeDiv_EditPopUp(element));
        //expression Visibility Code.
        baseSettingTab.append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));
        //Has Confirm
        baseSettingTab.append(FgButtonEditModeConvertor.createHasConfirmFieldDiv_EditPopUp(element));
        //Confirm Text
        baseSettingTab.append(FgButtonEditModeConvertor.createConfirmTextDiv_EditPopUp(element));
        //Has Expression Confirm
        baseSettingTab.append(FgButtonEditModeConvertor.createHasExpressionConfirmFieldDiv_EditPopUp(element));
        //Expression Confirm Text
        baseSettingTab.append(FgButtonEditModeConvertor.createExpressionConfirmTextDiv_EditPopUp(element));
        //Expression Confirm Code.
        baseSettingTab.append(FgCommon.createBackEndCodeDiv_EditPopUp(element, idElementEditForm.txtExpressionConfirmCode, lang.FG.txtExpressionConfirmCode, element.attr("data-expressionConfirmCode")));
        //expression Confirm Has False Action.
        baseSettingTab.append(FgButtonEditModeConvertor.createExpressionConfirmHasFalseActionFieldDiv_EditPopUp(element));
        //Create validation group name Txt
        baseSettingTab.append(FgCommon.createElementValidationGroupDiv_EditPopUp(element));
        var colsList = baseSettingTab.find('.col-sm-6,.col-sm-12');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);
        //coddingTab initialize
        coddingTab
            .append(FgButtonEditModeConvertor.createCoddingDiv_EditPopUp(element));

        colsList = coddingTab.find('.col-sm-12');
        FgCommon.arrangeColsInFormGroupByColNumber(coddingTab, colsList, 1);
        initCombooTree();
        //scriptTab initialize

        scriptTab.append(FgCommon.createEventDiv_EditPopUp(element, eventType.click, lang.FG.eventTypeClick));

        colsList = scriptTab.find('.col-sm-6,.col-sm-12');


        scriptTab.append(FgButtonEditModeConvertor.createOpenFormSetting());
        scriptTab.append(FgButtonEditModeConvertor.createCallBackElement(element));

        FgCommon.arrangeColsInFormGroupByColNumber(scriptTab, colsList, 1);

        setTimeout(function () {
            FgButtonEditModeConvertor.cleanAddParameter();
            FgButtonEditModeConvertor.fillAddParameter(element);
            FgButtonEditModeConvertor.ddlDataGridOpenPopUpFormId_onchange(document.querySelector('#divButtonOpenForm #ddlDataGridOpenPopUpFormId'));
            FgButtonEditModeConvertor.chkHasExpressionConfirm_onChange();
            FgButtonEditModeConvertor.chkHasConfirm_onChange();
        }, 500);
    }

    updateElement_EditPopUp(element, type) {
        var attributes = new elementAttributes();
        attributes.cssClass = $('#' + idElementEditForm.class).val();
        attributes.text = $('#' + idElementEditForm.label).val();
        attributes.htmlSubType = $('#' + idElementEditForm.ddlElementSubTypes).val();
        FgCommon.addAllAttribuets(element, attributes);

        element.attr("data-backendCoding", document.getElementById(idElementEditForm.btnAddNewBackendCoding).getAttribute('data-backendCoding'));
        element.attr("data-accessType", document.getElementById(idElementEditForm.ddlElementAccessTypes).value);

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        //confirm setting
        if (document.getElementById(idElementEditForm.chkHasConfirm).checked == true) {
            element.attr("data-hasConfirm", true);
            element.attr("data-confirmText", document.getElementById(idElementEditForm.txtButtonConfirmText).value);
        } else {
            element.attr("data-hasConfirm", false);
            element.attr("data-confirmText", '');
        }
        if (document.getElementById(idElementEditForm.chkHasExpressionConfirm).checked == true) {
            element.attr("data-hasExpressionConfirm", true);
            element.attr("data-expressionConfirmText", document.getElementById(idElementEditForm.txtExpressionConfirmText).value);
            element.attr("data-expressionConfirmCode", document.getElementById(idElementEditForm.txtExpressionConfirmCode).getAttribute('data-code'));
            element.attr("data-expressionConfirmHasFalseAction", document.getElementById(idElementEditForm.chkExpressionConfirmHasFalseAction).checked);
        } else {
            element.attr("data-hasExpressionConfirm", false);
            element.attr("data-expressionConfirmText", '');
            element.attr("data-expressionConfirmCode", '');
            element.attr("data-expressionConfirmHasFalseAction", false);
        }

        //update event
        FgCommon.updateEventAttribute_EditPopUp(element);
        //update open form
        FgButtonEditModeConvertor.updateAddOpenForm(element);

        if ($('#' + idElementEditForm.hdnBootstrapBtnStyle).val())
            FgButtonEditModeConvertor.setBootstrapButtonStyle(element);

        // Update event function attribute of element
        FgCommon.updateEventAttribute_EditPopUp(element);

        //Update validation group attribute of element
        FgCommon.updateValidationGroupAttribute_EditPopUp(element);
    }

    static createConfirmTextDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtButtonConfirmText, element.attr("data-confirmText"));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.confirmText, "fa fa-css3");
        return formGroup;
    }

    static createDivBtnStyle_EditPopUp(element) {
        var attribute = new elementAttributes(htmlElementType.div, "form-group");
        attribute.id = idElementEditForm.divBootstrapBtnStyle;
        var divBtnStyle = FgCommon.createNewChild(attribute);
        var label = FgCommon.createLabelControl(lang.FG.btnStyle);
        var hiddenFieldAttribute = new elementAttributes(htmlElementType.input);
        hiddenFieldAttribute.id = idElementEditForm.hdnBootstrapBtnStyle;
        hiddenFieldAttribute.htmlSubType = FgCommon.getEnumKey(inputTypeEnum, inputTypeEnum.hidden);
        var hiddenField = FgCommon.createNewChild(hiddenFieldAttribute);

        // Append to divBtnStyle
        divBtnStyle.append(label);
        divBtnStyle.append(hiddenField);
        var divParent = FgCommon.createNewChild(new elementAttributes(htmlElementType.div));
        divParent.append(FgButtonEditModeConvertor.createBootstrapStyleButtons(parent, hiddenField, element));
        divBtnStyle.append(divParent);

        return divBtnStyle;
    }

    static createBootstrapStyleButtons(parent, hiddenField, element) {
        var parent = FgCommon.createNewChild(new elementAttributes(htmlElementType.div, "btn-group"));
        var allBootstrapButton = FgButtonEditModeConvertor.getAllBootstrapButtonClassEnum();
        for (var i = 0; i < allBootstrapButton.length; i++) {
            var btnAttribute = new elementAttributes(htmlElementType.button);

            if (element.hasClass(allBootstrapButton[i]))
                btnAttribute.cssClass = allBootstrapButton[i] + " buttonSelected ";
            else
                btnAttribute.cssClass = allBootstrapButton[i];

            btnAttribute.text = allBootstrapButton[i].split('-')[1];
            btnAttribute.htmlSubType = FgCommon.getEnumKey(buttonTypeEnum, buttonTypeEnum.button);
            var styleButton = FgCommon.createNewChild(btnAttribute);

            // Set event for store selected bootstrap button style
            styleButton.click(function () {
                var buttonlist = parent.find('button');
                // Remove all selected class
                buttonlist.removeClass('buttonSelected');
                hiddenField.val(""); // First clear
                hiddenField.val(($(this).attr('class').replace('btn-xs btn ', '')));
                $(this).addClass('buttonSelected');
            });

            parent.append(styleButton);
        }
        return parent;
    }

    static getAllBootstrapButtonClassEnum() {
        return Object.keys(BootstrapButtonClassEnum);
    }

    static getBootstrapButtonClassEnumKeys(enumType) {
        return Object.keys(BootstrapButtonClassEnum);
    }

    static setBootstrapButtonStyle(element) {
        // Check if element has another bootstrap class
        // remove old bootstrap class and add new class
        var classElement = $(element).attr('class');
        var classList = FgButtonEditModeConvertor.getBootstrapButtonClassEnumKeys(BootstrapButtonClassEnum);
        classElement.split(' ').filter(function (_item) {
            classList.find(function (hh) {
                $(element).removeClass(hh);
            })
        });

        //Set bootstrap button style
        var bootstrapClass = FgCommon.jq_getElementById(idElementEditForm.hdnBootstrapBtnStyle).val();
        element.addClass(bootstrapClass);
    }

    //Codding Tab
    static createCoddingDiv_EditPopUp(element) {
        let divContainer = document.createElement('div');
        divContainer.innerHTML = `<a href="javascript:;" class="btn btn-primary font-weight-bolder" id="btnAddNewBackendCoding" onclick="addBackendCoding()" data-backendCoding=${element.attr('data-backendCoding')}>
 <span class="svg-icon svg-icon-md">
     <!--begin::Svg Icon--><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
         <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
             <rect x="0" y="0" width="24" height="24"></rect>
             <circle fill="#000000" cx="9" cy="15" r="6"></circle>
             <path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3"></path>
         </g>
     </svg><!--end::Svg Icon-->
 </span>${lang.FG.addBackendCoding}
</a>
<div class="form-group row mt-2">
    <textarea type="text" readonly="readonly" id="txtDisplayBackendCoding" style="direction:ltr;" class="form-control" rows="6">${ FgCommon.getCodeBodyFromBase64Xml(element.attr('data-backendCoding'))}</textarea>
</div>`;
        let formGroup = FgCommon.createDefaultColForElementAttributeWithoutInputGroup_EditPopUp(divContainer, lang.FG.CoddingDiv);
        return formGroup;
    }

    //backend codding
    static addBackendCoding() {
        let backendCoding = document.getElementById(idElementEditForm.btnAddNewBackendCoding).getAttribute('data-backendCoding');
        backendCoding = FgCommon.fromB64(backendCoding);
        //defined in AddEditDesign.js
        window.openButtonBackEndCode(backendCoding, 'designBackendCodingCallBack');
    }

    static designBackendCodingCallBack(codeDesign, code) {
        document.getElementById(idElementEditForm.btnAddNewBackendCoding).setAttribute('data-backendCoding', FgCommon.toB64(codeDesign));
        document.getElementById("txtDisplayBackendCoding").value = code;
    }

    //open form region
    static createCallBackElement(element) {
        let addCallBack = FgCommon.createTextareaDiv_EditPopUp(idElementEditForm.txtCallBackScript, lang.FG.txtCallBackScript, FgCommon.fromB64(element.attr('data-openFormCallBackScript')), 'col-sm-12');

        $(addCallBack.find('.input-group')[0]).append($(`
<div class="input-group-append"><span class="input-group-text"><a id="addCodeCallBack" 
onclick="openJavaScriptCode(txtCallBackScript.value,txtCallBackScript)"  style="text-decoration:none;" data-elementid="`
            + idElementEditForm.txtCallBackScript + `"> <i class="fa fa-plus"></i></a></span></div>`));

        return '<div class="form-group" id="divCallBack">' + addCallBack.html() + '</div>';
    }

    static createOpenFormSetting() {
        return '<div class="form-group" id="divButtonOpenForm">' + FgButtonEditModeConvertor.generateOpenFormSection() + '</div>';
    }

    static generateOpenFormSection() {
        return `<div id="divRunCodeOpenFormContainer" style="display:none;">
                        <div id="divDataGridOpenPopUp" style="display:none;">
                            <div class="form-group row">
                                <div class="col-lg-6">
                                    <label>${lang.FG.ddlDataGridOpenPopUpFormId}</label>
                                    <div class="input-group">
                                        <select id="ddlDataGridOpenPopUpFormId" class="form-control">
                                            <option value="">${lang.FG.listItemDefault}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-lg-6">
                                    <label>${lang.FG.txtDataGridOpenPopUpWidth}</label>
                                    <div class="input-group">
                                        <input type="text" id="txtDataGridOpenPopUpWidth" class="form-control" />
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <label>${lang.FG.txtDataGridOpenPopUpHeight}</label>
                                    <div class="input-group">
                                        <input type="text" id="txtDataGridOpenPopUpHeight" class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="divDataGridParam" style="display:none;">
                            <div class="col-xl-12">
                                <a href="javascript:;" class="btn btn-primary font-weight-bolder" id="addNewRowAddParameterId"  return false;">
                                   ${lang.FG.addNewRowDataGridParams}
                                </a>
                                <div class="bpms-table bpms-table-bordered  bpms-table-default mt-2">
                                    <div class="table-information table-responsive">
                                        <table id="tblDataGridParams" class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>${lang.FG.tblDataGridParamsTheadParameter}</th>
                                                    <th>${lang.FG.tblDataGridParamsTheadType}</th> 
                                                    <th>${lang.FG.tblDataGridParamsTheadValue}</th>
                                                    <th>${lang.FG.delete}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style="display:none;" id="trDataGridParams">
                                                    <td><input name="txtDataGridParamName" type="text" class="form-control"  /></td> 
                                                    <td>
                                                        <select name="ddlDataGridParamType" onchange="ddlDataGridParamType_onChange(this)" type="text" class="form-control">
                                                            <option value="">${lang.FG.listItemDefault}</option>
                                                            <option value="1">${lang.FG.tblDataGridParamTypeField}</option>
                                                            <option value="2">${lang.FG.tblDataGridParamTypeVariable}</option>
                                                            <option value="3">${lang.FG.tblDataGridParamTypeStatic}</option>
                                                            <option value="4">${lang.FG.tblDataGridParamTypeControl}</option>
                                                        </select>
                                                    </td>
                                                     <td>
                                                        <input name="txtDataGridParamColumnName" style="display:none" type="text" class="form-control" />
                                                        <input name="txtDataGridParamStaticValue" style="display:none" type="text" class="form-control" />
                                                        <div class="input-group">
                                                            <input id="txtDataGridParamVariable" name="txtDataGridParamVariable" value="" class="form-control " type="text" autocomplete="off" readonly="readonly">
                                                            <div class="input-group-append">
                                                                <span class="input-group-text">
                                                                    <a onclick="openVariableList(this);return false;" href="javascript:;" id="lnkAddVariableLink" style="text-decoration:none;">
                                                                        <i class="fa fa-plus"></i>
                                                                    </a>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <select name="ddlDataGridParamControls" class="form-control" style="display:none" />
                                                    </td>
                                                    <td>
                                                        <a class="btn btn-sm btn-clean btn-icon" onclick="this.closest('tr').remove(); return false;">
                                                            <span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
    }

    //clean column item form before oppening
    static cleanAddParameter() {
        let selectFormId = document.querySelector("#divButtonOpenForm #ddlDataGridOpenPopUpFormId");
        FgCommon.setDropDownELementByNode(selectFormId, window["processForms"]);
        for (let i = 1; i < document.querySelector('#divButtonOpenForm #tblDataGridParams').tBodies[0].rows.length; i++) {
            document.querySelector('#divButtonOpenForm #tblDataGridParams').tBodies[0].rows[i].remove();
        }
        document.querySelector('#divButtonOpenForm #divRunCodeOpenFormContainer').style.display = '';
        document.querySelector('#divButtonOpenForm #divDataGridOpenPopUp').style.display = '';
        document.querySelector('#divButtonOpenForm #divDataGridParam').style.display = '';

        selectFormId.onclick = (event) => { FgButtonEditModeConvertor.ddlDataGridOpenPopUpFormId_onchange(event.target); };
        document.querySelector("#divButtonOpenForm #addNewRowAddParameterId").onclick = FgButtonEditModeConvertor.addNewRowAddParameter;

    }

    //fill column item form in edit mode.
    static fillAddParameter(element) {
        let params = element.attr("data-openFormParameter");
        let formId = element.attr("data-openFormId");
        let formWidth = element.attr("data-formWidth");
        let formHeight = element.attr("data-formHeight");
        if (formWidth == null) formWidth = '';
        if (formHeight == null) formHeight = '';
        if (formId != null) {
            document.querySelector('#divButtonOpenForm #ddlDataGridOpenPopUpFormId').value = formId;
            document.querySelector('#divButtonOpenForm #txtDataGridOpenPopUpWidth').value = formWidth;
            document.querySelector('#divButtonOpenForm #txtDataGridOpenPopUpHeight').value = formHeight;
            for (let i = 0; i < params.split(',').length; i++) {
                if (params.trim() != '') {
                    FgButtonEditModeConvertor.addNewRowAddParameter();
                    let tableDataGrid = document.querySelector('#divButtonOpenForm #tblDataGridParams');
                    let lastRow = tableDataGrid.tBodies[0].rows[tableDataGrid.tBodies[0].rows.length - 1];
                    lastRow.querySelector('[name="txtDataGridParamName"]').value = params.split(',')[i].split(':')[0];
                    let paramType = params.split(',')[i].split(':')[1];
                    lastRow.querySelector('[name="ddlDataGridParamType"]').value = paramType;
                    window["ddlDataGridParamType_onChange"](lastRow.querySelector('[name="ddlDataGridParamType"]'));
                    switch (paramType) {
                        case "":
                            break;
                        case "1":
                            lastRow.querySelector('[name="txtDataGridParamColumnName"]').value = params.split(',')[i].split(':')[2];
                            break;
                        case "2":
                            lastRow.querySelector('[name="txtDataGridParamVariable"]').value = params.split(',')[i].split(':')[2];
                            break;
                        case "3":
                            lastRow.querySelector('[name="txtDataGridParamStaticValue"]').value = params.split(',')[i].split(':')[2];
                            break;
                        case "4":
                            lastRow.querySelector('[name="ddlDataGridParamControls"]').value = params.split(',')[i].split(':')[2];
                            break;
                    }
                }
            }
        }
    }

    //add new row to param table
    static addNewRowAddParameter() {
        let tableDataGrid = document.querySelector('#divButtonOpenForm #tblDataGridParams');
        let newTr = document.createElement('tr');
        newTr.innerHTML = document.querySelector('#divButtonOpenForm #trDataGridParams').innerHTML;
        tableDataGrid.tBodies[0].appendChild(newTr);
        tableDataGrid.tBodies[0].rows[tableDataGrid.tBodies[0].rows.length - 1].querySelector('[name="txtDataGridParamVariable"]').closest('.input-group').style.display = 'none'
    }

    //save open form setting.
    static updateAddOpenForm(element) {
        let tblDataGridParams = document.querySelector('#divButtonOpenForm #tblDataGridParams');
        let params = '';
        for (let i = 1; i < tblDataGridParams.tBodies[0].rows.length; i++) {
            let iRow = tblDataGridParams.tBodies[0].rows[i];
            let paramName = iRow.cells[0].querySelector('input').value.trim();
            let paramType = iRow.cells[1].querySelector('select').value.trim();
            let paramValue = '';
            switch (paramType) {
                case "1":
                    paramValue = iRow.querySelector('[name="txtDataGridParamColumnName"]').value;
                    break;
                case "2":
                    paramValue = iRow.querySelector('[name="txtDataGridParamVariable"]').value;
                    break;
                case "3":
                    paramValue = iRow.querySelector('[name="txtDataGridParamStaticValue"]').value;
                    break;
                case "4":
                    paramValue = iRow.querySelector('[name="ddlDataGridParamControls"]').value;
                    break;
                default:
                    break;
            }
            if (paramName != '' && paramValue != '')
                params += (params != '' ? ',' : '') + paramName + ':' + paramType + ':' + paramValue;
        }

        let openFormId = document.querySelector('#divButtonOpenForm #ddlDataGridOpenPopUpFormId').value;
        let formWidth = document.querySelector('#divButtonOpenForm #txtDataGridOpenPopUpWidth').value;
        let formHeight = document.querySelector('#divButtonOpenForm #txtDataGridOpenPopUpHeight').value;

        let openFormParameter = params;
        if (openFormId != null && openFormId != '') {
            element.attr('data-openFormId', openFormId);
            element.attr('data-formWidth', formWidth);
            element.attr('data-formHeight', formHeight);
            element.attr('data-openFormParameter', openFormParameter);
            element.attr('data-openFormCallBackScript', FgCommon.toB64(document.getElementById(idElementEditForm.txtCallBackScript).value));
        }
        else {
            element.attr('data-openFormId', '');
            element.attr('data-formWidth', '');
            element.attr('data-formHeight', '');
            element.attr('data-openFormParameter', '');
            element.attr('data-openFormCallBackScript', '');
        }
    }

    //change open form id selection
    static ddlDataGridOpenPopUpFormId_onchange(target) {
        try {
            if (target.value != '') {
                document.getElementById('txtFunctionName_click').parentElement.parentElement.parentElement.style.display = 'none';
                document.getElementById('txtFunctionName_click').value = '';
                document.querySelector('#divButtonOpenForm #divDataGridParam').style.display = '';
                document.getElementById('divCallBack').style.display = '';

            }
            else {
                document.getElementById('txtFunctionName_click').parentElement.parentElement.parentElement.style.display = '';
                document.querySelector('#divButtonOpenForm #divDataGridParam').style.display = 'none';
                document.getElementById('divCallBack').style.display = 'none';
            }
        }
        catch{

        }
    }

    //create Has Expression.
    static createHasConfirmFieldDiv_EditPopUp(element) {
        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.hasConfirmField, checked: element.attr('data-hasConfirm') == "true", id: idElementEditForm.chkHasConfirm });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);
        checkbox.change(FgButtonEditModeConvertor.chkHasConfirm_onChange);
        var col6 = FgCommon.createDefaultColForPopup('col-sm-6');
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    //create Has Expression.
    static createHasExpressionConfirmFieldDiv_EditPopUp(element) {
        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.hasExpressionConfirmField, checked: element.attr('data-hasExpressionConfirm') == "true", id: idElementEditForm.chkHasExpressionConfirm });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);
        checkbox.change(FgButtonEditModeConvertor.chkHasExpressionConfirm_onChange);
        var col6 = FgCommon.createDefaultColForPopup('col-sm-12');
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    static createExpressionConfirmTextDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtExpressionConfirmText, element.attr("data-expressionConfirmText"));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.expressionConfirmText, "fa fa-css3");
        return formGroup;
    }


    //create expression Confirm Has False Action.
    static createExpressionConfirmHasFalseActionFieldDiv_EditPopUp(element) {
        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.hasFalseActionField, checked: element.attr('data-expressionConfirmHasFalseAction') == "true", id: idElementEditForm.chkExpressionConfirmHasFalseAction });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);
        var col6 = FgCommon.createDefaultColForPopup("col-sm-12");
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    //when chkHasConfirm is changing,it will called.
    static chkHasConfirm_onChange() {
        if (document.getElementById(idElementEditForm.chkHasConfirm).checked) {
            document.getElementById(idElementEditForm.chkHasConfirm).closest('.form-group').querySelectorAll('.col-sm-6')[1].style.display = '';;
        } else {
            document.getElementById(idElementEditForm.chkHasConfirm).closest('.form-group').querySelectorAll('.col-sm-6')[1].style.display = 'none';
        }
    }

    //when chkHasExpressionConfirm is changing,it will called.
    static chkHasExpressionConfirm_onChange() {
        if (document.getElementById(idElementEditForm.chkHasExpressionConfirm).checked) {
            document.getElementById(idElementEditForm.txtExpressionConfirmText).closest('.row').style.display = "";
            document.getElementById(idElementEditForm.txtExpressionConfirmText).closest('.row').nextElementSibling.style.display = '';
        } else {
            document.getElementById(idElementEditForm.txtExpressionConfirmText).closest('.row').style.display = "none";
            document.getElementById(idElementEditForm.txtExpressionConfirmText).closest('.row').nextElementSibling.style.display = 'none';
        }
    }
}

var BootstrapButtonClassEnum = {
    'btn-default': 1,
    'btn-danger': 2,
    'btn-info': 3,
    'btn-primary': 4,
    'btn-success': 5,
    'btn-warning': 6
};
window["addBackendCoding"] = FgButtonEditModeConvertor.addBackendCoding;
window["designBackendCodingCallBack"] = FgButtonEditModeConvertor.designBackendCodingCallBack;
export default FgButtonEditModeConvertor