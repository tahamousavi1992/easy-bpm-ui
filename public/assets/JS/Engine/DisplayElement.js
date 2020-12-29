'use strict';
import BPMSCommon from "./BPMSCommon.js"
class DisplayElement {
    constructor(elementID) {
        this.element = BPMSCommon.getById(elementID);
    }

    get value() {
        return this.element.innerHTML;
    }

    get formId() {
        return BPMSCommon.getContainerFormId(this.element);
    }

    set value(itemValue) {
        this.element.innerHTML = itemValue;
    }
    init() {

    }
    get visibility() {
        return this.element.closest('.bpms-control-container').style.display != 'none';
    }

    set visibility(visible) {
        this.element.style.closest('.bpms-control-container').display = visible ? "" : "none";
    }

    addClickEvent() {
        this.element.removeEventListener("click", DisplayElement.on_click);
        this.element.addEventListener("click", DisplayElement.on_click);
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
            let displayElement = new DisplayElement(elementID);
            displayElement.value = result;
        }, null);
    }
}
export default DisplayElement