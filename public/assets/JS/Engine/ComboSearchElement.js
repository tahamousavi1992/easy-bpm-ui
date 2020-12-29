'use strict';
import BPMSCommon from "./BPMSCommon.js"
class ComboSearchElement {
    constructor(elementID) {
        this.element = BPMSCommon.getById(elementID);
    }

    clearAll() {
        this.element.value = '';
    }

    getSelectedItem() {
        let _item = this.element.options[this.element.selectedIndex]
        return { text: _item.text, value: (_item.value == "" ? null : _item.value) }
    }
    init() {

    }
    get formId() {
        return BPMSCommon.getContainerFormId(this.element);
    }

    get value() {
        return this.getSelectedItem().value;
    }

    set value(itemValue) {
        return this.setValue(itemValue);
    }
    get readOnly() {
        return this.element.disabled;
    }

    set readOnly(readOnly) {
        this.element.disabled = readOnly;
    }
    get visibility() {
        return this.element.closest('.bpms-control-container').style.display != 'none';
    }

    set visibility(visible) {
        this.element.closest('.bpms-control-container').style.display = visible ? "" : "none";
    }

    updateItems() {

    }

    setValue(itemValue) {
        this.element.value = itemValue;
    }

    addChangeEvent(functionName) {
        $('#' + this.element.id).on('select2:select', function (event) {
            let funcName = BPMSCommon.getChangeFuncName(event.target);
            if (funcName != null)
                window[funcName](BPMSCommon.getElementClass(event.target.id));
            BPMSCommon.callUpdateDependent(event.target);
            //window[functionName](BPMSCommon.getElementClass(event.target.id));
        });
    }

    addClickEvent() {
        this.element.removeEventListener("click", ComboSearchElement.on_click);
        this.element.addEventListener("click", ComboSearchElement.on_click);
    }
    static on_click() {
        window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(event.target.id));
    }
}

export default ComboSearchElement;