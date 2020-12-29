'use strict';
import BPMSCommon from "./BPMSCommon.js"
class CardElement {
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
        return this.element.style.display != 'none';
    }

    set visibility(visible) {
        this.element.style.display = visible ? "" : "none";
    }

    addClickEvent() {
        this.element.removeEventListener("click", CardElement.on_click);
        this.element.addEventListener("click", CardElement.on_click);
    }

    static on_click() {
        window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(event.target.id));
    }
}
export default CardElement