'use strict';
import BPMSCommon from "./BPMSCommon.js"
import FormControl from "./BPMS.js"
class DataGridElement {
    constructor(elementID) {
        this.element = BPMSCommon.getById(elementID);
    }

    init() {

    }

    get formId() {
        return BPMSCommon.getContainerFormId(this.element);
    }

    get visibility() {
        return this.element.closest('.bpms-control-container').style.display != 'none';
    }

    set visibility(visible) {
        this.element.closest('.bpms-control-container').style.display = visible ? "" : "none";
    }

    updateItems(keepPaging) {
        let elementID = this.element.id;
        let data = this.getParams();
        if (keepPaging == true) {
            if (document.querySelector("#divDataGrid_" + elementID + " .datatable-pager-link-active") != null)
                data["PageIndex"] = document.querySelector("#divDataGrid_" + elementID + " .datatable-pager-link-active").innerHTML;
        }
        CallGetAjax(window[this.formId + "GetDataGridElementUrl"], data, null, null, function (result) {
            //defined in react DataGridHtml
            window['DatagridUpdateItems' + elementID](result); 
        }, null);
    }

    //sortType =>{ asc , desc}
    sort(sortColumn, sortType) {
        let elementID = this.element.id;
        let data = this.getParams();
        data["SortColumn"] = sortColumn;
        data["SortType"] = sortType;
        CallGetAjax(window[this.formId + "GetDataGridElementUrl"], data, null, null, function (result) {
            //defined in react DataGridHtml
            window['DatagridUpdateItems' + elementID](result); 
        }, null);
    }

    getParams() {
        let data = {
            controlId: this.element.id,
            formId: this.element.getAttribute('data-formid'),
        };

        BPMSCommon.getDependentParameter(this.element, data);

        //get current sort type and sort column
        let sortColumnElement = this.element.querySelector('th a.active');
        if (sortColumnElement != null) {
            data["SortColumn"] = sortColumnElement.getAttribute('data-sortColumn');
            data["SortType"] = sortColumnElement.getAttribute('data-sortType');
        }

        return data;
    }

    openForm(formId, params, width, height) {
        let dataGridId = this.element.id;
        FormControl.openFormPopUp(this.element, formId, params, function () {
            new DataGridElement(dataGridId).updateItems(true);
        }, width, height);
    }

    callBusiness(commandId, params) {
        let dataGridId = this.element.id;
        BPMSCommon.callBusiness(this.element, dataGridId, commandId, params, function (result) {
            new DataGridElement(dataGridId).updateItems(true);
            if (result.listMessage != null)
                result.listMessage.forEach(c => { showMessage(c.DisplayMessageType, c.Message); });
        });
    }

    addClickEvent() {
        this.element.removeEventListener("click", DataGridElement.on_click);
        this.element.addEventListener("click", DataGridElement.on_click);
    }

    static on_click() {
        window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(event.target.id));
    }
}

export default DataGridElement;