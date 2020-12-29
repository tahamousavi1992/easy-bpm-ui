'use strict';
import BPMSCommon from "./BPMSCommon.js"
class ImageElement {
    constructor(elementID) {
        this.element = BPMSCommon.getById(elementID);
    }
    get src() {
        return this.element.src;
    }

    get formId() {
        return BPMSCommon.getContainerFormId(this.element);
    }

    set src(itemValue) {
        this.element.src = itemValue;
    }
    init() {

    }
    get visibility() {
        return this.element.closest('.bpms-control-container').style.display != 'none';
    }

    set visibility(visible) {
        this.element.closest('.bpms-control-container').style.display = visible ? "" : "none";
    }

    addClickEvent() {
        this.element.removeEventListener("click", ImageElement.on_click);
        this.element.addEventListener("click", ImageElement.on_click);
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
            let imageElement = new ImageElement(elementID);
            imageElement.src = result;
        }, null);
    }
}

export default ImageElement