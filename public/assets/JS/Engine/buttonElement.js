'use strict';
import BPMSCommon from "./BPMSCommon.js"
class ButtonElement {
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
    addChangeEvent() {

    }

    addClickEvent() {
        if (this.element.getAttribute('data-confirmText') != null) {
            this.element.removeEventListener("click", ButtonElement.on_clickConfirmText);
            this.element.addEventListener("click", ButtonElement.on_clickConfirmText);
        }
        else {
            if (this.element.getAttribute('data-hasExpressionConfirm') == "true") {
                this.element.removeEventListener("click", ButtonElement.on_clicKHasExpressionConfirm);
                this.element.addEventListener("click", ButtonElement.on_clicKHasExpressionConfirm);
            }
            else {
                this.element.removeEventListener("click", ButtonElement.on_clickNonExpression);
                this.element.addEventListener("click", ButtonElement.on_clickNonExpression);
            }
        }
    }

    static on_clickNonExpression() {
        window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(event.target.id));
    }

    static on_clicKHasExpressionConfirm() {
        let elId = event.target.id;
        FormControl.showExpressionConfirm(event.target, function () {
            window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(elId))
        });
    }
    static on_clickConfirmText() {
        let elId = event.target.id;
        FormControl.showConfirm(event.target, event.target.getAttribute('data-confirmText'), function () {
            window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(elId))
        });
    }
}
export default ButtonElement