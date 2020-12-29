'use strict';
import BPMSCommon from "./BPMSCommon.js"
import FormControl from "./BPMS.js"
class ChartElement {
    constructor(elementID) {
        this.element = BPMSCommon.getById(elementID);
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

    init() {

    }

    updateItems() {
        let elementID = this.element.id;
        let data = this.getParams();
        CallGetAjax(window[this.formId + "GetChartElementUrl"], data, null, null, function (result) {
            //defined in react DataGridHtml
            window['ChartUpdateItems' + elementID](result);
        }, null);
    }

    getParams() {
        let data = {
            controlId: this.element.id,
            formId: this.element.getAttribute('data-formId'),
        };

        BPMSCommon.getDependentParameter(this.element, data);

        return data;
    }

    addClickEvent() {
        this.element.addEventListener("click", ChartElement.on_click);
    }
    static on_click() {
        window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(event.target.id));
    }
}

export default ChartElement;