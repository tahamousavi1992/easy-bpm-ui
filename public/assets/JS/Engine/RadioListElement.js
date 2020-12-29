'use strict';
import BPMSCommon from "./BPMSCommon.js"
class RadioListElement {
    constructor(elementID) {
        this.element = BPMSCommon.getById(elementID);
    }

    get formId() {
        return BPMSCommon.getContainerFormId(this.element);
    }

    clearAll() {
        let allInputs = this.element.querySelectorAll('input[type="radio"]');
        for (let i = 0; i < allInputs.length; i++) {
            this.removeAt(0);
        }
    }
    init() {

    }
    removeAt(index) {
        let allInputs = this.element.querySelectorAll('input[type="radio"]');
        allInputs[0].closest('label').remove();
    }

    removeByValue(itemValue) {
        let allInputs = this.element.querySelectorAll('input[type="radio"]');
        for (var i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value == itemValue)
                allInputs[i].closest('label').remove();
        }
    }

    addItem({ text = '', value = '' }) {

        let newItem = `<label class="sk-radio sk-radio-outline">
                         ${text} &nbsp;
                    <input name="${this.element.id}" type="radio" value=" ${value}"><span>&nbsp;</span>
                </label>`;

        this.element.innerHTML += newItem;
    }

    getItemAt(index) {
        let allInputs = this.element.querySelectorAll('input[type="radio"]');
        return { text: allInputs[index].previousSibling.textContent, value: allInputs[index].value }
    }

    getSelectedItem() {
        let allInputs = this.element.querySelectorAll('input[type="radio"]');
        for (var i = 0; i < allInputs.length; i++) {
            if (allInputs[i].checked)
                return { text: allInputs[i].previousSibling.textContent, value: allInputs[i].value }
        }
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
        return this.element.querySelector('input[type="radio"]').disabled;
    }

    set readOnly(readOnly) {
        this.element.querySelectorAll('input[type="radio"]').forEach((item) => {
            item.disabled = readOnly;
        });
    }

    setValue(itemValue) {
        let allInputs = this.element.querySelectorAll('input[type="radio"]');
        for (var i = 0; i < allInputs.length; i++) {
            allInputs[i].checked = false;
            if (allInputs[i].value == itemValue)
                allInputs[i].checked = true;
        }
    }

    updateItems() {
        let data = {
            controlId: this.element.id,
            formId: this.element.getAttribute('data-formId')
        };

        BPMSCommon.getDependentParameter(this.element, data);

        let elementID = this.element.id;
        CallGetAjax(window[this.formId + "GetListElementUrl"], data, null, null, function (result) {
            new RadioListElement(elementID).clearAll();
            result.forEach((item) => {
                new RadioListElement(elementID).addItem({ text: item.text, value: item.id });
            });
        }, null);
    }

    addChangeEvent() {
        document.getElementById(this.element.id).querySelectorAll('input').forEach(function (item) {
            item.removeEventListener("change", RadioListElement.on_change);
            item.addEventListener("change", RadioListElement.on_change);
        });
    }

    addClickEvent() {
        this.element.removeEventListener("click", RadioListElement.on_click);
        this.element.addEventListener("click", RadioListElement.on_click);
    }

    static on_change() {
        let funcName = BPMSCommon.getChangeFuncName(event.target.closest('div[data-type]'));
        if (funcName != null)
            window[funcName](BPMSCommon.getElementClass(event.target.closest('div[data-type]').id));
        BPMSCommon.callUpdateDependent(event.target.closest('div[data-type]'));
 
    }

    static on_click() {
        window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(event.target.id));
    }
}

export default RadioListElement;