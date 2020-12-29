'use strict';
import BPMSCommon from "./BPMSCommon.js"
class InputElement {
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
        this.element.value = itemValue;
    }

    get readOnly() {
        return this.element.readOnly;
    }

    set readOnly(readOnly) {
        this.element.readOnly = readOnly;
    }

    get visibility() {
        return this.element.closest('.bpms-control-container').style.display != 'none';
    }

    set visibility(visible) {
        this.element.closest('.bpms-control-container').style.display = visible ? "" : "none";
    }
    init() {

    }
    addChangeEvent() {
        this.element.removeEventListener("input", InputElement.on_change);
        this.element.addEventListener("input", InputElement.on_change);
    }

    addClickEvent() {
        this.element.removeEventListener("click", InputElement.on_click);
        this.element.addEventListener("click", InputElement.on_click);
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
            let inputElement = new InputElement(elementID);
            inputElement.value = result;
        }, null);
    }
}
export default InputElement