'use strict';
import BPMSCommon from "./BPMSCommon.js"
class DatePickerElement {
    constructor(elementID) {
        this.element = BPMSCommon.getById(elementID);
    }

    get formId() {
        return BPMSCommon.getContainerFormId(this.element);
    }

    get value() {
        return this.element.value;
    }

    set value(itemValue) {
        this.element.closest('div').querySelector('input').value = itemValue;
        this.element.value = itemValue;
    }
    init() {

    }
    get visibility() {
        return this.element.closest('.bpms-control-container').style.display != 'none';
    }

    set visibility(visible) {
        this.element.closest('.bpms-control-container').style.display = visible ? "" : "none";
    }
    get readOnly() {
        return document.getElementById('cal_' + this.element.id).readOnly;
    }

    set readOnly(readOnly) {
        document.getElementById('cal_' + this.element.id).readOnly = readOnly;
    }

    addChangeEvent() {
        this.element.removeEventListener("change", DatePickerElement.on_change);
        this.element.addEventListener("change", DatePickerElement.on_change);
    }

    addClickEvent() {
        this.element.removeEventListener("click", DatePickerElement.on_click);
        this.element.addEventListener("click", DatePickerElement.on_click);
    }

    static on_change() {
        let funcName = BPMSCommon.getChangeFuncName(event.target);
        if (funcName != null)
            window[funcName](BPMSCommon.getElementClass(event.target.id));
        BPMSCommon.callUpdateDependent(event.target);
    }

    static on_click() {
        window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(event.target.id));
    }

    updateItems() {
        let data = {
            controlId: this.element.id,
            formId: this.element.getAttribute('data-formId')
        };

        BPMSCommon.getDependentParameter(this.element, data);

        let elementID = this.element.id;
        CallGetAjax(window[this.formId + "GetControlValueUrl"], data, null, null, function (result) {
            let datePickerElement = new DatePickerElement(elementID);
            datePickerElement.value = result;
        }, null);
    }

}

export default DatePickerElement