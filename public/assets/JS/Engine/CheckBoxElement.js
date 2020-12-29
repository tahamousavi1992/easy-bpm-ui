'use strict';
import BPMSCommon from "./BPMSCommon.js"
class CheckBoxElement {
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

    get checked() {
        return this.element.checked;
    }

    set checked(itemValue) {
        this.element.checked = itemValue;
    }

    get visibility() {
        return this.element.closest('.bpms-control-container').style.display != 'none';
    }

    set visibility(visible) {
        this.element.closest('.bpms-control-container').style.display = visible ? "" : "none";
    }

    get readOnly() {
        return this.element.disabled;
    }

    set readOnly(readOnly) {
        this.element.disabled = readOnly;
    }

    init() {

    }

    addChangeEvent() {
        this.element.addEventListener("input", CheckBoxElement.on_change);
    }

    addClickEvent() {
        this.element.removeEventListener("click", CheckBoxElement.on_click);
        this.element.addEventListener("click", CheckBoxElement.on_click);
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
            let checkBoxElement = new CheckBoxElement(elementID);
            checkBoxElement.checked = result == true;
        }, null);
    }
}
export default CheckBoxElement