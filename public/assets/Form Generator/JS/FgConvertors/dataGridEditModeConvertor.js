'use strict';
import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgDataGridEditMode from "../FgElementsEditMode/dataGridEditMode.js"
import FgDataGrid from "../FgElements/dataGrid.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgDataGridEditModeConvertor extends ElementEditModeConvertor {
    constructor() {
        super();
    }
    toJQueryObject(fgDataGridElementEditMode) {
        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgDataGridElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);

        // DataGrid
        let fgDataGrid = fgDataGridElementEditMode.fgElement;

        // Add label
        FgUtilityConvertor.addFgElementLabel(elPlaceholderJqObj, fgDataGrid);

        let dataGridJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgDataGridElementEditMode)
            .attr("data-fillList", fgDataGrid.fillBinding)
            .attr("data-parameter", fgDataGrid.parameter)
            .attr("data-columnSetting", fgDataGrid.columnSetting)
            .attr("data-hasPaging", fgDataGrid.hasPaging)
            .attr("data-pageSize", fgDataGrid.pageSize)
            .attr("data-sortColumn", fgDataGrid.sortColumn)
            .attr("data-sortType", fgDataGrid.sortType)
            .attr("data-showExcel", fgDataGrid.showExcel)
            .attr("data-showPdf", fgDataGrid.showPdf)
            .attr("data-reportHeader", fgDataGrid.reportHeader)
            .attr("data-reportFooter", fgDataGrid.reportFooter)
            .attr("data-reportGridHeaderColor", fgDataGrid.reportGridHeaderColor)
            .attr("data-reportGridFooterColor", fgDataGrid.reportGridFooterColor)
            .attr("data-reportGridEvenColor", fgDataGrid.reportGridEvenColor)
            .attr("data-reportGridOddColor", fgDataGrid.reportGridOddColor)
            .attr("data-reportPaperSize", fgDataGrid.reportPaperSize)
            .attr("data-reportShowDate", fgDataGrid.reportShowDate);

        FgCommon.setVisibilityCodeObjectToElement(dataGridJQueryObject, fgDataGrid.expressionVisibilityCode);
        FgDataGridEditModeConvertor.generateDesignTable(dataGridJQueryObject.get(0),
            fgDataGrid.columnSetting != '' && fgDataGrid.columnSetting != null ? JSON.parse(fgDataGrid.columnSetting) : null);

        elementContainerJqObj.append($('<div class="table-information table-responsive"></div>').append(dataGridJQueryObject));

        return elementContainerJqObj;
    }

    fromJQueryObject(dataGridElementContainer) {
        // Get fgElement
        let dataGridElement = FgUtilityConvertor.getFgElChild(dataGridElementContainer);

        if (FgUtilityConvertor.getFgElType(dataGridElement) !== FgDataGrid.getType())
            console.error("The type of this element isn't DataGrid for converting to FgDataGrid.");

        let fgDataGrid = FgDataGrid.createDataGrid(dataGridElement.attr("id"),
            FgUtilityConvertor.getFgElLabel(dataGridElementContainer),
            dataGridElement.attr("class"),
            dataGridElement.attr("data-fillList"),
            dataGridElement.attr("data-columnSetting"),
            dataGridElement.attr("data-parameter"),
            dataGridElement.attr("data-hasPaging"),
            dataGridElement.attr("data-pageSize"),
            dataGridElement.attr("data-sortColumn"),
            dataGridElement.attr("data-sortType"),
            dataGridElement.attr("data-showExcel"),
            dataGridElement.attr("data-showPdf"),
            dataGridElement.attr("data-reportHeader"),
            dataGridElement.attr("data-reportFooter"),
            dataGridElement.attr("data-reportGridHeaderColor"),
            dataGridElement.attr("data-reportGridFooterColor"),
            dataGridElement.attr("data-reportGridEvenColor"),
            dataGridElement.attr("data-reportGridOddColor"),
            dataGridElement.attr("data-reportPaperSize"),
            dataGridElement.attr("data-reportShowDate"),
            FgCommon.getVisibilityCodeObjectFromElement(dataGridElement));

        let dataGridEditMode = FgDataGridEditMode.createDataGrid(fgDataGrid,
            FgUtilityConvertor.getFgElContainerCssClassName(dataGridElementContainer),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(dataGridElementContainer)
        );

        return dataGridEditMode;
    }

    //Fill setting pop up by Data Grid attributes
    generateElementEditPopUp(type, element, modalBody, baseSettingTab, customIconFontSettingTab, bindingTab, coddingTab, scriptTab) {
        baseSettingTab
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // Class name // label of element
            .append(FgCommon.createLabelElementDiv_EditPopUp(type, element)); // Label

        //Create ID Txt
        baseSettingTab.append(FgCommon.createElementIdDiv_EditPopUp(element));
        //page Size
        baseSettingTab.append(FgDataGridEditModeConvertor.createPageSizeDiv_EditPopUp(element));
        //has Paging
        baseSettingTab.append(FgDataGridEditModeConvertor.createHasPagingDiv_EditPopUp(element));
        //sort Column
        baseSettingTab.append(FgDataGridEditModeConvertor.createSortColumnDiv_EditPopUp(element));
        //sort Type
        baseSettingTab.append(FgDataGridEditModeConvertor.createSortTypeDiv_EditPopUp(element));
        //show Excel
        baseSettingTab.append(FgDataGridEditModeConvertor.createShowExcelDiv_EditPopUp(element));
        //show Pdf
        baseSettingTab.append(FgDataGridEditModeConvertor.createShowPdfDiv_EditPopUp(element));
        //reportHeader
        baseSettingTab.append(FgDataGridEditModeConvertor.createReportHeaderDiv_EditPopUp(element));
        //reportFooter
        baseSettingTab.append(FgDataGridEditModeConvertor.createReportFooterDiv_EditPopUp(element));
        //reportGridHeaderColor
        baseSettingTab.append(FgDataGridEditModeConvertor.createReportGridHeaderColorDiv_EditPopUp(element));
        //reportGridFooterColor
        baseSettingTab.append(FgDataGridEditModeConvertor.createReportGridFooterColorDiv_EditPopUp(element));
        //reportGridEvenColor
        baseSettingTab.append(FgDataGridEditModeConvertor.createReportGridEvenColorDiv_EditPopUp(element));
        //reportGridOddColor
        baseSettingTab.append(FgDataGridEditModeConvertor.createReportGridOddColorDiv_EditPopUp(element));
        //report Pape rSize
        baseSettingTab.append(FgDataGridEditModeConvertor.createReportPaperSizeDiv_EditPopUp(element));
        //report Pape Report Show Date
        baseSettingTab.append(FgDataGridEditModeConvertor.createReportShowDateDiv_EditPopUp(element));
        //expression Visibility Code
        baseSettingTab.append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));

        var colsList = baseSettingTab.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(baseSettingTab, colsList, 2);

        //bindingTab initialize

        bindingTab.append(FgCommon.createBindingFillComboDiv_EditPopUp(element)); // Fill of element 
        bindingTab.append(FgCommon.createBindingVariableParamsDiv_EditPopUp(element));  //Binding Parameters
        bindingTab.append(FgDataGridEditModeConvertor.createColumnList_EditPopUp(element.attr('data-columnSetting'))); // Fill of element   

        var colsList = bindingTab.find('.col-sm-3,.col-sm-6,.col-sm-12');
        FgCommon.arrangeColsInFormGroupByColNumber(bindingTab, colsList, 3);

        initCombooTree();
        jscolor.installByClassName("jscolor");
        //create modal and form for column setting.
        FgDataGridEditModeConvertor.createDataGridColumnSetting();
    }

    // Update dropdown atrributes and other properties like label and font icon
    updateElement_EditPopUp(element, type) {
        FgDataGridEditModeConvertor.updateDataGridColumsJsonObject();
        // Update class attribute of element
        FgCommon.updateCssClassAttributes_EditPopUp(element);

        // Update label of element
        FgCommon.updateLabelElement_EditPopUp(element);

        // Update binding attribute of element
        FgCommon.updateBindingAttribute_EditPopUp(element);
        // Update parameter attribute of element
        FgCommon.updateBindingParameter_EditPopUp(element);

        //update paging
        element.attr('data-pageSize', document.getElementById(idElementEditForm.txtPageSize).value);
        element.attr('data-hasPaging', document.getElementById(idElementEditForm.chkHasPaging).checked);

        //update report
        element.attr('data-showExcel', document.getElementById(idElementEditForm.chkShowExcel).checked);
        element.attr('data-showPdf', document.getElementById(idElementEditForm.chkShowPdf).checked);
        element.attr('data-reportHeader', document.getElementById(idElementEditForm.txtDataGridReportHeader).value);
        element.attr('data-reportFooter', document.getElementById(idElementEditForm.txtDataGridReportFooter).value);
        element.attr('data-reportGridHeaderColor', document.getElementById(idElementEditForm.txtDataGridReportGridHeaderColor).value);
        element.attr('data-reportGridFooterColor', document.getElementById(idElementEditForm.txtDataGridReportGridFooterColor).value);
        element.attr('data-reportGridEvenColor', document.getElementById(idElementEditForm.txtDataGridReportGridEvenColor).value);
        element.attr('data-reportGridOddColor', document.getElementById(idElementEditForm.txtDataGridReportGridOddColor).value);
        element.attr('data-reportPaperSize', document.getElementById(idElementEditForm.ddlReportPaperSizeEnum).value);
        element.attr('data-reportShowDate', document.getElementById(idElementEditForm.chkDataGridReportShowDate).checked);

        //update default sorting
        element.attr('data-sortColumn', document.getElementById(idElementEditForm.txtSortColumn).value);
        element.attr('data-sortType', document.getElementById(idElementEditForm.ddlElementSortTypes).value);

        element.attr('data-columnSetting', JSON.stringify(dataGridColumsJson));

        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        FgDataGridEditModeConvertor.generateDesignTable(element.get(0), dataGridColumsJson);
    }

    static generateDesignTable(tableObj, data) {
        if (tableObj.tHead != null)
            tableObj.tHead.remove();
        tableObj.createTHead();
        let tHeadRow = tableObj.tHead.insertRow(-1);

        if (data != null) {
            data.sort((second, first) => { return second.order >= first.order ? 1 : -1 });
            data.forEach((item) => {
                tHeadRow.insertCell().innerHTML = item.name;
            });
        }
        tHeadRow.innerHTML = replaceAll(tHeadRow.innerHTML, 'td', 'th');
        tableObj.createTBody();
    }

    static createColumnList_EditPopUp(columnSetting) {
        if (columnSetting != null && columnSetting != '')
            dataGridColumsJson = JSON.parse(columnSetting);
        else
            dataGridColumsJson = new Array();

        let tableObj = document.createElement('table');
        tableObj.id = "tbColumns";
        tableObj.className = 'table table-bordered';
        tableObj.createTHead();
        let tHeadRow = tableObj.tHead.insertRow(-1);
        tHeadRow.insertCell().innerHTML = lang.FG.dataGridColumnListName;
        tHeadRow.insertCell().innerHTML = lang.FG.dataGridColumnSettingClassName;
        tHeadRow.insertCell().innerHTML = lang.FG.dataGridColumnSettingSortColumn;
        tHeadRow.insertCell().innerHTML = lang.FG.dataGridColumnSettingShowInReport;
        tHeadRow.insertCell().innerHTML = lang.FG.dataGridColumnSettingOrder;
        tHeadRow.insertCell().innerHTML = lang.FG.dataGridColumnSettingValue;
        tHeadRow.insertCell().innerHTML = lang.FG.dataGridColumnListOperation;
        tHeadRow.cells[4].setAttribute('style', 'width:9%;');
        tHeadRow.cells[6].setAttribute('style', 'width:9%;');
        tHeadRow.innerHTML = replaceAll(tHeadRow.innerHTML, 'td', 'th');
        tableObj.createTBody();

        dataGridColumsJson.sort((second, first) => { return second.order >= first.order ? 1 : -1 });

        dataGridColumsJson.forEach((item, index) => {
            if (item.itemList == null) {
                item.order = index + 1;
                item.itemList = [{
                    id: FgCommon.generateIdwithPrefix(''),
                    name: '[fieldName]',
                    type: 'template',
                }];
            }
            let tBodiesRow = tableObj.tBodies[0].insertRow(-1);
            tBodiesRow.setAttribute('data-id', item.id);
            tBodiesRow.insertCell(0).innerHTML = `<input placeholder="Name" id="txtName" value="${item.name}" class="form-control">`;
            tBodiesRow.insertCell(1).innerHTML = `<input placeholder="Class Name" id="txtClassName" value="${item.className}" class="form-control">`;
            tBodiesRow.insertCell(2).innerHTML = `<input placeholder="Sort Column" id="txtSortColumn" value="${item.sortColumn}" class="form-control">`;
            tBodiesRow.insertCell(3).innerHTML = `<div class="checkbox-inline"><label class="checkbox"><input type="checkbox" id="chkShowInReport" ${item.showInReport ? 'checked="checked"' : ''}><span></span></label></div>`;
            tBodiesRow.insertCell(4).innerHTML = `<input placeholder="Order" id="txtOrder" value="${item.order}" class="form-control">`;
            if (item.itemList[0].type == 'runCode' || item.itemList[0].type == 'openForm') {
                tBodiesRow.insertCell(5).innerHTML = `<a href="#" onclick="openAddEditDataGridColumn(${item.id}); return false;" class="btn btn-sm btn-success">${item.itemList[0].name == '' ? lang.FG.dataGridColumnSettingEditValue : item.itemList[0].name}</a>`;
            }
            else {
                tBodiesRow.insertCell(5).innerHTML = `<textarea placeholder="Template" id="txtValue"  class="form-control">${item.itemList[0].name}</textarea>`;
            }
            tBodiesRow.insertCell(6).innerHTML =
                `<a href="#" onclick="removeDataGridColumn(${item.id}); return false;" class="btn btn-sm btn-clean btn-icon"><span class="svg-icon svg-icon-md"><i class="fad fa-trash-alt"></i></span></a>`;

        });

        return $(`<div class="col-lg-3 pl-0"><div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="ddlDataGridColumnType" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    ${lang.FG.dataGridColumnListNewColumn}
  </button>
  <div class="dropdown-menu" aria-labelledby="ddlDataGridColumnType">
    <a class="dropdown-item" onclick="ddlDataGridColumnType_onChange('template')" href="javascript:;">Template</a>
    <a class="dropdown-item" onclick="ddlDataGridColumnType_onChange('openForm')" href="javascript:;">Open Form</a>
    <a class="dropdown-item" onclick="ddlDataGridColumnType_onChange('runCode')" href="javascript:;">Action</a>
  </div></div></div>
                         <div class="bpms-table bpms-table-bordered  bpms-table-default mt-2"><div class="table-information table-responsive">${tableObj.outerHTML}</div></div>`);
    }

    static removeDataGridColumn(columnId) {
        dataGridColumsJson = dataGridColumsJson.filter((item) => item.id != columnId);
        FgDataGridEditModeConvertor.refereshDataGridColumns();
    }

    //create modal and form for column setting.
    static createDataGridColumnSetting() {
        if (document.getElementById('modalAddDataGridColumnItem') != null) {
            document.getElementById('modalAddDataGridColumnItem').remove();
        }

        let docData = `<div class="modal fade" id="modalAddDataGridColumnItem" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-windows">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id='headerAddDataGritColumnItem'></h5>
                <div class="modal-button">
                    <button type="button" class="btn close window-maximize" data-dismiss="modal" aria-label="Close">
                        <i class="fad fa-expand-alt modal-square"></i>
                    </button>
                    <button type="button" class="btn close" data-dismiss="modal" aria-label="Close">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="modal-body modal-scroll" id="divItemManage">
                <form>
                    <div class="form-group row" id="divDataGridParamItemType">
                        <input type="hidden" id="hdnDataGridColumnItemID" />
                        <input type="hidden" id="hdnDataGridItemType" />
                        <div class="col-lg-6">
                                <label>${lang.FG.txtDataGridItemName}</label>
                                <div class="input-group">
                                    <input id="txtDataGridItemName" class="form-control" type="text">
                                </div>
                        </div>
                        <div class="col-lg-6">
                            <label>${lang.FG.txtDataGridItemClassName}</label>
                            <div class="input-group">
                                <input id="txtDataGridItemClassName" class="form-control" type="text">
                            </div>
                        </div>
                    </div>
                    <div id="divRunCodeOpenFormContainer" style="display:none;">
                        <div class="form-group row" id="divDataGridParamItemName">
                            <div class="col-lg-6">
                                <label>${lang.FG.chkDataGridItemHasExpressionConfirm}</label>
                                <div class="checkbox-inline">
                                    <label class="checkbox">
                                        <input type="checkbox" id="chkDataGridItemHasExpressionConfirm" onchange="chkDataGridItemHasExpressionConfirm_onChange()" name="chkDataGridItemHasExpressionConfirm" value="true"><span></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row" id="divDataGridParamItemExpressionConfirm" style="display:none;">
                            <div class="col-lg-6">
                                <label>${lang.FG.txtDataGridItemExpressionConfirmText}</label>
                                <div class="input-group">
                                    <input id="txtDataGridItemExpressionConfirmText" class="form-control" type="text">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <label>${lang.FG.txtDataGridItemExpressionConfirmCode}</label>
                                <div class="input-group">
                                    <textarea id="txtDataGridItemExpressionConfirmCode" class="form-control" dir="ltr"></textarea>
                                    <div class="input-group-append"><span class="input-group-text">
                                        <a type="button" href="javascript:;"
                                                onclick="openBackEndCode(document.getElementById('txtDataGridItemExpressionConfirmCode').getAttribute('data-code'), document.getElementById('txtDataGridItemExpressionConfirmCode')); return false;">
                                            <i class="fa fa-plus"></i>
                                        </a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row" id="divDataGridParamItemExpressionConfirm1" style="display:none;">
                            <div class="col-lg-6">
                                <label>${lang.FG.chkDataGridItemExpressionConfirmHasFalseAction}</label>
                                <div class="checkbox-inline">
                                    <label class="checkbox">
                                        <input type="checkbox" id="chkDataGridItemExpressionConfirmHasFalseAction" name="chkDataGridItemExpressionConfirmHasFalseAction" value="true"><span></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row" id="divDataGridParamItemConfirm">
                            <div class="col-lg-6">
                                <label>${lang.FG.chkDataGridItemHasConfirm}</label>
                                <div class="checkbox-inline">
                                    <label class="checkbox">
                                        <input type="checkbox" id="chkDataGridItemHasConfirm"  name="chkDataGridItemHasConfirm" value="true"><span></span>
                                    </label>
                                </div>
                            </div>
                            <div class="col-lg-6" id="divDataGridItemConfirmText" style="display:none;">
                                <label>${lang.FG.txtDataGridItemConfirmText}</label>
                                <div class="input-group">
                                    <input id="txtDataGridItemConfirmText" class="form-control" type="text">
                                </div>
                            </div>
                        </div>
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
                        <div class="form-group row" id="divDataGridRunCode" style="display:none;">
                            <div class="col-lg-6">
                                <label>${lang.FG.txtDataGridRunCode}</label>
                                <div class="input-group">
                                    <textarea id="txtDataGridRunCode" value="" class="form-control" style="direction: ltr;" data-code="" readonly></textarea>
                                    <div class="input-group-append"><span class="input-group-text">
                                        <a id="addCodeDataGridRunCode" href="javascript:;" style="text-decoration:none;"
                                                onclick="openDataGridRunCodeDesign(); return false;">
                                            <i class="fa fa-plus"></i>
                                        </button></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="divDataGridParam" style="display:none;">
                            <div class="col-xl-12">
                                <a href="javascript:;" data-toggle="tooltip" data-placement="right" title="${lang.FG.addNewRowDataGridParamsTooltip}" class="btn btn-primary font-weight-bolder" id="addNewRowDataGridParamsId" >
                                     ${lang.FG.addNewRowDataGridParams}
                                </a>
                                <div class="bpms-table bpms-table-bordered  bpms-table-default bpms-table-primary bpms-table-loaded mt-2">
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
                                                    <td><input name="txtDataGridParamName" type="text" class="form-control" /></td>
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
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="btnTestConnectionSrting" onclick="saveAddDataGridColumnItem()" data-dismiss="modal" type="button" class="btn btn-primary font-weight-bold">
                    ${lang.FG.lnkSaveAddEditDataGridColumn}
                </button>
                <button type="button" class="btn btn-light-primary font-weight-bold" data-dismiss="modal">
                    ${lang.FG.lnkCancelAddEditDataGridColumn}
                </button>
            </div>
        </div>
    </div>
</div>`;
        document.getElementById('divDynamicFormContainer').innerHTML = docData;
        document.querySelector('#divDynamicFormContainer #addNewRowDataGridParamsId').onclick = FgDataGridEditModeConvertor.addNewRowDataGridParams;
        document.querySelector('#divDynamicFormContainer #chkDataGridItemHasConfirm').onchange = FgDataGridEditModeConvertor.chkDataGridItemHasConfirm_onChange;

    }

    // This method used for reportPaperSize of element.
    static createReportPaperSizeDiv_EditPopUp(element) {
        let value = element.attr("data-reportPaperSize");
        if (value == null || value == "") value = "A4";
        var elementAttribute = FgCommon.createDropDownHtmlElement(idElementEditForm.ddlReportPaperSizeEnum, value, true, FgCommon.getArrayFromEnum(reportPaperSizeEnum));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.dataGridReportPaperSizeDiv, "fa fa-cog");
        return formGroup;
    }

    //show Excel
    static createShowExcelDiv_EditPopUp(element) {
        let showExcel = element.attr('data-showExcel') == "true";

        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.dataGridShowExcelDiv, checked: showExcel, id: idElementEditForm.chkShowExcel });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);

        var col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    //show Excel
    static createShowPdfDiv_EditPopUp(element) {
        let showPdf = element.attr('data-showPdf') == "true";

        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.dataGridShowPdfDiv, checked: showPdf, id: idElementEditForm.chkShowPdf });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);

        var col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    // This method used for Sort Type of element.
    static createSortTypeDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createDropDownHtmlElement(idElementEditForm.ddlElementSortTypes, element.attr("data-sortType"), true, FgCommon.getArrayFromEnum(sortTypeEnum));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.dataGridSortTypeDiv, "fa fa-cog");
        return formGroup;
    }

    //sort Column
    static createSortColumnDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtSortColumn, element.attr("data-sortColumn"));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.dataGridSortColumn, "fa fa-css3");
        return formGroup;
    }

    //page Size
    static createPageSizeDiv_EditPopUp(element) {
        let pageSize = element.attr("data-pageSize");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtPageSize, pageSize);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.dataGridPageSize, "fa fa-css3");
        return formGroup;
    }

    //has Paging
    static createHasPagingDiv_EditPopUp(element) {
        let hasPaging = element.attr('data-hasPaging') == "true";

        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.dataGridHasPaging, checked: hasPaging, id: idElementEditForm.chkHasPaging });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);

        var col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    //Report Header
    static createReportHeaderDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtDataGridReportHeader, element.attr("data-reportHeader"));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.dataGridReportHeaderDiv, "fa fa-css3");
        return formGroup;
    }

    //Report Footer
    static createReportFooterDiv_EditPopUp(element) {
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtDataGridReportFooter, element.attr("data-reportFooter"));
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.dataGridReportFooterDiv, "fa fa-css3");
        return formGroup;
    }

    //report Grid Header Color
    static createReportGridHeaderColorDiv_EditPopUp(element) {
        let value = element.attr("data-reportGridHeaderColor");
        if (value == "" || value == null) value = "FFFFFF";
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtDataGridReportGridHeaderColor, value, null, null, "jscolor");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.dataGridReportGridHeaderColorDiv, "fa fa-css3");
        return formGroup;
    }

    //report Grid Footer Color
    static createReportGridFooterColorDiv_EditPopUp(element) {
        let value = element.attr("data-reportGridFooterColor");
        if (value == "" || value == null) value = "FFFFFF";
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtDataGridReportGridFooterColor, value, null, null, "jscolor");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.dataGridReportGridFooterColorDiv, "fa fa-css3");
        return formGroup;
    }

    //report Grid Even Color
    static createReportGridEvenColorDiv_EditPopUp(element) {
        let value = element.attr("data-reportGridEvenColor");
        if (value == "" || value == null) value = "FFFFFF";
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtDataGridReportGridEvenColor, value, null, null, "jscolor");
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.dataGridReportGridEvenColorDiv, "fa fa-css3");
        return formGroup;
    }

    //report Grid Odd Color
    static createReportGridOddColorDiv_EditPopUp(element) {
        let value = element.attr("data-reportGridOddColor");
        if (value == "" || value == null) value = "FFFFFF";
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtDataGridReportGridOddColor, value, null, null, "jscolor");
        var col6 = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.dataGridReportGridOddColorDiv, "fa fa-css3");
        return col6;
    }

    //show date
    static createReportShowDateDiv_EditPopUp(element) {
        let reportShowDate = element.attr('data-reportShowDate') == "true";

        let objCustomOption = new customOption({ type: inputTypeEnum.checkbox, text: lang.FG.dataGridReportShowDateDiv, checked: reportShowDate, id: idElementEditForm.chkDataGridReportShowDate });
        let checkbox = FgCommon.createCustomOption(objCustomOption, true);

        var col6 = FgCommon.createDefaultColForPopup();
        col6.append(checkbox);
        FgCommon.addLabelToCheckBox(col6, objCustomOption);

        return col6;
    }

    //referesh table of DataGrid Columns.
    static refereshDataGridColumns() {
        document.getElementById('tbColumns').innerHTML = FgDataGridEditModeConvertor.createColumnList_EditPopUp(JSON.stringify(dataGridColumsJson)).find('table').html();
    }

    //this will open DataGrid column edit form as a modal.
    static openAddEditDataGridColumn(columnId) {
        FgDataGridEditModeConvertor.updateDataGridColumsJsonObject();
        selectedColumnId = columnId;
        let selectedColumn = dataGridColumsJson.find((item) => { return item.id == selectedColumnId });
        FgDataGridEditModeConvertor.openAddDataGridColumnItem(selectedColumn.itemList[0])
    }

    //open modalAddDataGridColumnItem as  modal which is edit form of item.
    static openAddDataGridColumnItem(currentItem) {
        FgDataGridEditModeConvertor.cleanAddDataGridColumnItem();
        if (currentItem != null) {
            document.getElementById('hdnDataGridColumnItemID').value = currentItem.id;
            FgDataGridEditModeConvertor.fillAddDataGridColumnItem(currentItem);
            FgDataGridEditModeConvertor.ddlDataGridItemType_onChange();
        }
        openModal('modalAddDataGridColumnItem', true);
    }

    //clean column item form before oppening
    static cleanAddDataGridColumnItem() {
        document.getElementById('hdnDataGridColumnItemID').value = '';
        FgCommon.setDropDownELement('ddlDataGridOpenPopUpFormId', window.processForms);
        //clear run code xml data and code.
        document.getElementById('txtDataGridRunCode').setAttribute('data-code', '');
        document.getElementById('txtDataGridRunCode').value = '';

        document.getElementById('txtDataGridOpenPopUpWidth').value = '';
        document.getElementById('txtDataGridOpenPopUpHeight').value = '';
        document.getElementById('hdnDataGridItemType').value = '';
        document.getElementById('txtDataGridItemName').value = '';
        document.getElementById('chkDataGridItemHasExpressionConfirm').checked = false;
        document.getElementById('chkDataGridItemExpressionConfirmHasFalseAction').checked = false;
        document.getElementById('chkDataGridItemHasConfirm').checked = false;
        document.getElementById('txtDataGridItemExpressionConfirmText').value = '';
        document.getElementById('txtDataGridItemExpressionConfirmCode').value = '';
        document.getElementById('txtDataGridItemExpressionConfirmCode').setAttribute('data-code', '');
        document.getElementById('txtDataGridItemConfirmText').value = '';

        document.getElementById('txtDataGridItemClassName').value = '';
        for (let i = 1; i < document.getElementById('tblDataGridParams').tBodies[0].rows.length; i++) {
            document.getElementById('tblDataGridParams').tBodies[0].rows[i].remove();
        }
        FgDataGridEditModeConvertor.ddlDataGridItemType_onChange()
        FgDataGridEditModeConvertor.chkDataGridItemHasConfirm_onChange();
        FgDataGridEditModeConvertor.chkDataGridItemHasExpressionConfirm_onChange;
    }

    //It fills column item form in edit mode. It is  Item template .
    static fillAddDataGridColumnItem(currentItem) {
        if (currentItem != null) {
            document.getElementById('hdnDataGridItemType').value = currentItem.type;
            document.getElementById('txtDataGridItemName').value = currentItem.name;
            if (currentItem.type == 'runCode')
                document.getElementById('headerAddDataGritColumnItem').innerHTML = lang.FG.AddDataGridColumnItemCaption + ' ' + lang.FG.dataGridColumnItemRunCode;
            else
                document.getElementById('headerAddDataGritColumnItem').innerHTML = lang.FG.AddDataGridColumnItemCaption + ' ' + lang.FG.dataGridColumnItemOpenForm;
            switch (currentItem.type) {
                case 'runCode':
                case 'openForm':
                    let hasExpressionConfirm = currentItem.hasExpressionConfirm;
                    let expressionConfirmHasFalseAction = currentItem.expressionConfirmHasFalseAction;
                    let params = currentItem.params;

                    document.getElementById('chkDataGridItemHasExpressionConfirm').checked = hasExpressionConfirm == "true"
                    document.getElementById('chkDataGridItemExpressionConfirmHasFalseAction').checked = expressionConfirmHasFalseAction == "true"
                    document.getElementById('txtDataGridItemExpressionConfirmText').value = currentItem.expressionConfirmText;

                    let code = getValueInsideXmlTag('Code', FgCommon.fromB64(currentItem.expressionConfirmCode));
                    document.getElementById('txtDataGridItemExpressionConfirmCode').value = code;
                    document.getElementById('txtDataGridItemExpressionConfirmCode').setAttribute('data-code', currentItem.expressionConfirmCode);
                    document.getElementById('chkDataGridItemHasConfirm').checked = currentItem.hasConfirm == "true"
                    document.getElementById('txtDataGridItemConfirmText').value = currentItem.confirmText;
                    document.getElementById('txtDataGridItemClassName').value = currentItem.className;
                    document.getElementById('txtDataGridOpenPopUpWidth').value = currentItem.formWidth;
                    document.getElementById('txtDataGridOpenPopUpHeight').value = currentItem.formHeight;
                    document.getElementById('ddlDataGridOpenPopUpFormId').selectedIndex = FgCommon.indexMatchingValue(document.getElementById('ddlDataGridOpenPopUpFormId'), currentItem.formId);
                    document.getElementById('txtDataGridRunCode').setAttribute('data-code', currentItem.runCodeData);
                    if (currentItem.type == 'runCode' && currentItem.runCodeData != null) {
                        document.getElementById('txtDataGridRunCode').value = getValueInsideXmlTag('Code', FgCommon.fromB64(currentItem.runCodeData), true);
                    }
                    for (let i = 0; i < params.split(',').length; i++) {
                        if (params.trim() != '') {
                            FgDataGridEditModeConvertor.addNewRowDataGridParams();
                            let tableDataGrid = document.getElementById('tblDataGridParams');
                            let lastRow = tableDataGrid.tBodies[0].rows[tableDataGrid.tBodies[0].rows.length - 1];
                            lastRow.querySelector('[name="txtDataGridParamName"]').value = params.split(',')[i].split(':')[0];
                            let paramType = params.split(',')[i].split(':')[1];
                            lastRow.querySelector('[name="ddlDataGridParamType"]').value = paramType;
                            FgDataGridEditModeConvertor.ddlDataGridParamType_onChange(lastRow.querySelector('[name="ddlDataGridParamType"]'));
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
                    break;
            }

            FgDataGridEditModeConvertor.ddlDataGridItemType_onChange();
            FgDataGridEditModeConvertor.chkDataGridItemHasConfirm_onChange();
            FgDataGridEditModeConvertor.chkDataGridItemHasExpressionConfirm_onChange();
        }
    }

    static ddlDataGridItemType_onChange() {
        let target = document.getElementById('hdnDataGridItemType');
        document.getElementById('divRunCodeOpenFormContainer').style.display = 'none';
        document.getElementById('divDataGridOpenPopUp').style.display = 'none';
        document.getElementById('divDataGridRunCode').style.display = 'none';
        document.getElementById('divDataGridParam').style.display = 'none';
        document.getElementById('divDataGridParamItemType').style.display = '';
        document.getElementById('divDataGridParamItemName').style.display = '';
        switch (target.value) {
            case "openForm":
                document.getElementById('divRunCodeOpenFormContainer').style.display = '';
                document.getElementById('divDataGridOpenPopUp').style.display = '';
                document.getElementById('divDataGridParam').style.display = '';
                break;
            case "runCode":
                document.getElementById('divRunCodeOpenFormContainer').style.display = '';
                document.getElementById('divDataGridRunCode').style.display = '';
                document.getElementById('divDataGridParam').style.display = '';
                break;
        }
    }

    //add new row to param table
    static addNewRowDataGridParams() {
        let tableDataGrid = document.getElementById('tblDataGridParams');
        let newTr = document.createElement('tr');
        newTr.innerHTML = document.getElementById('trDataGridParams').innerHTML;
        tableDataGrid.tBodies[0].appendChild(newTr);
        tableDataGrid.tBodies[0].rows[tableDataGrid.tBodies[0].rows.length - 1].querySelector('[name="txtDataGridParamVariable"]').closest('.input-group').style.display = 'none'
    }

    //when param type is changed,it will call.
    static ddlDataGridParamType_onChange(target) {
        let paramType = target.value;
        target.closest('tr').querySelector('[name="txtDataGridParamColumnName"]').style.display = 'none';
        target.closest('tr').querySelector('[name="txtDataGridParamStaticValue"]').style.display = 'none';
        target.closest('tr').querySelector('[name="txtDataGridParamVariable"]').closest('.input-group').style.display = 'none';
        target.closest('tr').querySelector('[name="ddlDataGridParamControls"]').style.display = 'none';
        switch (paramType) {
            case "":
                break;
            case "1":
                target.closest('tr').querySelector('[name="txtDataGridParamColumnName"]').style.display = '';
                break;
            case "2":
                target.closest('tr').querySelector('[name="txtDataGridParamVariable"]').closest('.input-group').style.display = '';
                break;
            case "3":
                target.closest('tr').querySelector('[name="txtDataGridParamStaticValue"]').style.display = '';
                break;
            case "4":
                let ddlControls = target.closest('tr').querySelector('[name="ddlDataGridParamControls"]');
                ddlControls.style.display = '';
                FgCommon.setddlCoddingRControls(ddlControls);
                break;
        }
    }

    //save Item Type Form and add new edit to template text input.
    static saveAddDataGridColumnItem() {
        let itemId = document.getElementById('hdnDataGridColumnItemID').value;
        let itemResult = { id: itemId, type: document.getElementById('hdnDataGridItemType').value };
        switch (itemResult.type) {
            case 'openForm':
            case 'runCode':
                itemResult['name'] = document.getElementById('txtDataGridItemName').value;
                itemResult['className'] = document.getElementById('txtDataGridItemClassName').value;
                itemResult['formWidth'] = document.getElementById('txtDataGridOpenPopUpWidth').value;
                itemResult['formHeight'] = document.getElementById('txtDataGridOpenPopUpHeight').value;
                itemResult['hasExpressionConfirm'] = document.getElementById('chkDataGridItemHasExpressionConfirm').checked;
                itemResult['expressionConfirmHasFalseAction'] = document.getElementById('chkDataGridItemExpressionConfirmHasFalseAction').checked;
                itemResult['expressionConfirmText'] = document.getElementById('txtDataGridItemExpressionConfirmText').value;
                itemResult['expressionConfirmCode'] = document.getElementById('txtDataGridItemExpressionConfirmCode').getAttribute('data-code');

                itemResult['hasConfirm'] = document.getElementById('chkDataGridItemHasConfirm').checked;
                itemResult['confirmText'] = document.getElementById('txtDataGridItemConfirmText').value;

                let tblDataGridParams = document.getElementById('tblDataGridParams');
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
                itemResult['params'] = params;

                if (itemResult.type == 'openForm') {
                    itemResult['formId'] = document.getElementById('ddlDataGridOpenPopUpFormId').value;
                }
                else {
                    itemResult['runCodeData'] = document.getElementById('txtDataGridRunCode').getAttribute('data-code');
                }
                break;

        }
        let selectedColumn = dataGridColumsJson.find((item) => { return item.id == selectedColumnId });
        //put column items into column itemList property.
        selectedColumn.itemList = [itemResult];
        FgDataGridEditModeConvertor.refereshDataGridColumns();
    }

    //if chkDataGridItemHasConfirm is checked ,it will call.
    static chkDataGridItemHasConfirm_onChange() {
        if (document.getElementById('chkDataGridItemHasConfirm').checked) {

            document.getElementById('divDataGridItemConfirmText').style.display = '';
        }
        else {
            document.getElementById('divDataGridItemConfirmText').style.display = 'none';
        }
    }

    //if chkDataGridItemHasExpressionConfirm is checked ,it will call.
    static chkDataGridItemHasExpressionConfirm_onChange() {
        if (document.getElementById('chkDataGridItemHasExpressionConfirm').checked) {
            document.getElementById('divDataGridParamItemExpressionConfirm').style.display = '';
            document.getElementById('divDataGridParamItemExpressionConfirm1').style.display = '';
        }
        else {
            document.getElementById('divDataGridParamItemExpressionConfirm').style.display = 'none';
            document.getElementById('divDataGridParamItemExpressionConfirm1').style.display = 'none';
        }
    }

    //backend codding
    static openDataGridRunCodeDesign() {
        let backendCoding = document.getElementById('txtDataGridRunCode').getAttribute('data-code');
        backendCoding = FgCommon.fromB64(backendCoding);
        //defined in AddEditDesign.js
        window.openButtonBackEndCode(backendCoding, 'dataGridRunCodeDesignCallBack');
    }

    static dataGridRunCodeDesignCallBack(codeDesign, code) {
        document.getElementById('txtDataGridRunCode').setAttribute('data-code', FgCommon.toB64(codeDesign));
        document.getElementById("txtDataGridRunCode").value = code;
    }
     
    static ddlDataGridColumnType_onChange(value) {
        FgDataGridEditModeConvertor.updateDataGridColumsJsonObject();
        let newItem = {
            id: FgCommon.generateIdwithPrefix(''),
            name: value == 'openForm' ? lang.FG.dataGridColumnItemOpenForm : value == 'runCode' ? lang.FG.dataGridColumnItemRunCode : 'Column Name',
            className: '',
            order: dataGridColumsJson.length + 1,
            sortColumn: '',
            showInReport: true,
        };
        //put column items into column itemList property.

        if (value != '') {
            let itemResult = { id: FgCommon.generateIdwithPrefix(''), type: value };
            switch (value) {
                case 'template':
                    itemResult['name'] = '[fieldName]';
                    break;
                case 'openForm':
                case 'runCode':
                    itemResult['name'] = '';
                    itemResult['className'] = '';
                    itemResult['formWidth'] = '';
                    itemResult['formHeight'] = '';
                    itemResult['hasExpressionConfirm'] = false;
                    itemResult['expressionConfirmHasFalseAction'] = false;
                    itemResult['expressionConfirmText'] = '';
                    itemResult['expressionConfirmCode'] = '';
                    itemResult['hasConfirm'] = false;
                    itemResult['confirmText'] = '';
                    itemResult['params'] = '';
                    if (itemResult.type == 'openForm') {
                        itemResult['formId'] = '';
                    }
                    else {
                        itemResult['runCodeData'] = '';
                    }
                    break;
            }
            newItem.itemList = [itemResult];
            dataGridColumsJson.push(newItem);
            FgDataGridEditModeConvertor.refereshDataGridColumns();

        }

    }

    static updateDataGridColumsJsonObject() {
        let rows = document.querySelector('#bindingTab #tbColumns').tBodies[0].rows;
        for (let i = 0; i < rows.length; i++) {
            let column = rows[i];
            let selectedColumn = dataGridColumsJson.find((item) => { return item.id == Number(column.getAttribute('data-id')) });
            selectedColumn.name = column.querySelector('#txtName').value;
            selectedColumn.className = column.querySelector('#txtClassName').value;
            selectedColumn.order = column.querySelector('#txtOrder').value;
            selectedColumn.sortColumn = column.querySelector('#txtSortColumn').value;
            selectedColumn.showInReport = column.querySelector('#chkShowInReport').checked;
            if (column.querySelector('#txtValue') != null) {
                selectedColumn.itemList[0].name = column.querySelector('#txtValue').value;
            }
        }

    }
}
//data grid colums setting and templates set into this as json
var dataGridColumsJson = new Array();
var selectedColumnId = '';
export var sortTypeEnum = {
    asc: "asc",
    desc: "desc",
};

export var reportPaperSizeEnum = {
    A2: "A2",
    A3: "A3",
    A4: "A4",
    A5: "A5",
};

//to access globally
window["ddlDataGridColumnType_onChange"] = FgDataGridEditModeConvertor.ddlDataGridColumnType_onChange;
window["dataGridRunCodeDesignCallBack"] = FgDataGridEditModeConvertor.dataGridRunCodeDesignCallBack;
window["openDataGridRunCodeDesign"] = FgDataGridEditModeConvertor.openDataGridRunCodeDesign;
window["openAddEditDataGridColumn"] = FgDataGridEditModeConvertor.openAddEditDataGridColumn;
window["ddlDataGridItemType_onChange"] = FgDataGridEditModeConvertor.ddlDataGridItemType_onChange;
window["saveAddDataGridColumnItem"] = FgDataGridEditModeConvertor.saveAddDataGridColumnItem;
window["removeDataGridColumn"] = FgDataGridEditModeConvertor.removeDataGridColumn;
window["ddlDataGridParamType_onChange"] = FgDataGridEditModeConvertor.ddlDataGridParamType_onChange;
window["chkDataGridItemHasExpressionConfirm_onChange"] = FgDataGridEditModeConvertor.chkDataGridItemHasExpressionConfirm_onChange;
export default FgDataGridEditModeConvertor
