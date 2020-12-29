
'use strict';
import { FgElement, FG_ElementTypeEnum } from "./fgElement.js";

class FgDataGrid extends FgElement {

    constructor(id, label, cssClass, fillBinding, columnSetting, parameter, hasPaging, pageSize, sortColumn, sortType, showExcel, showPdf, reportHeader, reportFooter, reportGridHeaderColor, reportGridFooterColor, reportGridEvenColor, reportGridOddColor, reportPaperSize, reportShowDate, expressionVisibilityCode) {
        super(id, FgDataGrid.getType(), cssClass, label, expressionVisibilityCode);
        this.fillBinding = fillBinding;
        /*
        paramName:type is 1:field 2:variable 3:value
        [
        {"name":"caption","className"="btn","id":"123456","order":"0","sortColumn":"Name","showInReport"="true","itemList":{type:'openForm',formId:'', params:'paramName:type:columnName,' ,hasConfirm:'true' ,confirmText:'' ,hasExpressionConfirm:'true' ,expressionConfirmText:'' ,expressionConfirmCode='' ,expressionConfirmHasFalseAction='false' }  />"},
        {"name":"caption","className"="btn","id":"123456","order":"0","sortColumn":"Name","showInReport"="true","itemList":{type:'runCode',runCodeData:'', params:'paramName:type:columnName,' ,hasConfirm:'true' ,confirmText:'' ,hasExpressionConfirm:'true' ,expressionConfirmText:'' ,expressionConfirmCode='' ,expressionConfirmHasFalseAction='false' }  />"},
        ]
        */
        this.columnSetting = columnSetting;
        this.parameter = parameter;
        this.hasPaging = hasPaging;
        this.pageSize = pageSize;
        this.sortColumn = sortColumn;
        this.sortType = sortType;
        this.showExcel = showExcel;
        this.showPdf = showPdf;
        this.reportHeader = reportHeader;
        this.reportFooter = reportFooter;
        this.reportGridHeaderColor = reportGridHeaderColor;
        this.reportGridFooterColor = reportGridFooterColor;
        this.reportGridEvenColor = reportGridEvenColor;
        this.reportGridOddColor = reportGridOddColor;
        this.reportPaperSize = reportPaperSize;
        this.reportShowDate = reportShowDate;
    }

    static createDataGrid(id, label, cssClass, fillBinding, columnSetting, parameter, hasPaging, pageSize, sortColumn, sortType, showExcel, showPdf, reportHeader, reportFooter, reportGridHeaderColor, reportGridFooterColor, reportGridEvenColor, reportGridOddColor, reportPaperSize, reportShowDate, expressionVisibilityCode) {
        return new FgDataGrid(id, label, cssClass, fillBinding, columnSetting, parameter, hasPaging, pageSize, sortColumn, sortType, showExcel, showPdf, reportHeader, reportFooter, reportGridHeaderColor, reportGridFooterColor, reportGridEvenColor, reportGridOddColor, reportPaperSize, reportShowDate, expressionVisibilityCode);
    }

    static getType() {
        return FG_ElementTypeEnum.DATAGRID;
    }
}

export default FgDataGrid