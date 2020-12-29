'use strict';
import BPMSCommon from "./BPMSCommon.js"
class DropDownElement {
    constructor(elementID) {
        this.element = BPMSCommon.getById(elementID);
    }

    get formId() {
        return BPMSCommon.getContainerFormId(this.element);
    }

    clearAll() {
        var length = this.element.options.length;
        for (let i = 0; i < length; i++) {
            this.removeAt(0);
        }
    }
    init() {

    }
    removeAt(index) {
        this.element.remove(index);
    }

    removeByValue(itemValue) {
        for (var i = 0; i < this.element.length; i++) {
            if (this.element.options[i].value == itemValue)
                this.element.remove(i);
        }
    }

    addItem({ text = '', value = '' }) {
        var option = document.createElement("option");
        option.text = text;
        option.value = value;
        this.element.add(option);
    }

    getItemAt(index) {
        let _item = this.element.options[i];
        return { text: _item.text, value: _item.value }
    }

    getSelectedItem() {
        let _item = this.element.options[this.element.selectedIndex]
        return { text: _item.text, value: (_item.value == "" ? null : _item.value) }
    }
    get value() {
        return this.getSelectedItem() != null ? this.getSelectedItem().value : '';
    }

    set value(itemValue) {
        return this.setValue(itemValue);
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
    setValue(itemValue) {
        this.element.value = itemValue;
    }

    updateItems() {
        let data = {
            controlId: this.element.id,
            formId: this.element.getAttribute('data-formId')
        };

        BPMSCommon.getDependentParameter(this.element, data);

        let elementID = this.element.id;
        CallGetAjax(window[this.formId + "GetListElementUrl"], data, null, null, function (result) {
            let dropDownElement = new DropDownElement(elementID);
            dropDownElement.clearAll();
            if (document.getElementById(elementID).getAttribute('data-hasoptional') == "true")
                dropDownElement.addItem({ text: document.getElementById(elementID).getAttribute('data-optionalcaption'), value: "" });

            result.forEach((item) => {
                dropDownElement.addItem({ text: item.text, value: item.id });
            });
        }, null);
    }

    addChangeEvent(functionName) {
        this.element.removeEventListener("change", DropDownElement.on_change);
        this.element.addEventListener("change", DropDownElement.on_change);
    }

    addClickEvent(functionName) {
        this.element.removeEventListener("click", DropDownElement.on_click);
        this.element.addEventListener("click", DropDownElement.on_click);
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
}

export default DropDownElement;