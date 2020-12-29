'use strict';
import BPMSCommon from "./BPMSCommon.js"

class LinkElement {
    constructor(elementID) {
        this.element = BPMSCommon.getById(elementID);
    }

    get formId() {
        return BPMSCommon.getContainerFormId(this.element);
    }

    get href() {
        return this.element.href;
    }

    set href(itemValue) {
        this.element.href = itemValue;
    }

    get visibility() {
        return this.element.closest('.bpms-control-container').style.display != 'none';
    }

    set visibility(visible) {
        this.element.closest('.bpms-control-container').style.display = visible ? "" : "none";
    }
    init() {

    }
    addClickEvent() {
        this.element.removeEventListener("click", LinkElement.on_click);
        this.element.addEventListener("click", LinkElement.on_click);
    }

    static on_click() {
        window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(event.target.id));
    }
}
export default LinkElement