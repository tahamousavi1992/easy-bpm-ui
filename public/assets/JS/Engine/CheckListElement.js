'use strict';
import BPMSCommon from "./BPMSCommon.js"
class CheckListElement {
    constructor(elementID) {
        this.element = BPMSCommon.getById(elementID);
    }
    init() {

    }
    get formId() {
        return BPMSCommon.getContainerFormId(this.element);
    }

    clearAll() {
        let allInputs = this.element.querySelectorAll('input[type="checkbox"]');
        for (let i = 0; i < allInputs.length; i++) {
            this.removeAt(0);
        }
    }

    removeAt(index) {
        let allInputs = this.element.querySelectorAll('input[type="checkbox"]');
        allInputs[index].closest('label').remove();
    }

    removeByValue(itemValue) {
        let allInputs = this.element.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value == itemValue)
                allInputs[i].closest('label').remove();
        }
    }

    addItem({ text = '', value = '' }) {
        let newItem = `<label class="checkbox checkbox-outline">
                         ${text} &nbsp;
                    <input name="${this.element.id}" type="checkbox" value=" ${value}"><span>&nbsp;</span>
                </label>`;
        this.element.innerHTML += newItem;
    }

    getItemAt(index) {
        let allInputs = this.element.querySelectorAll('input[type="checkbox"]');
        return { text: allInputs[index].previousSibling.textContent, value: allInputs[index].value }
    }

    getSelectedItem() {
        let allInputs = this.element.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < allInputs.length; i++) {
            if (allInputs[i].checked)
                return { text: allInputs[i].previousSibling.textContent, value: allInputs[i].value }
        }
    }

    getSelectedItems() {
        let list = new Array();
        let allInputs = this.element.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < allInputs.length; i++) {
            if (allInputs[i].checked)
                list.push({ text: allInputs[i].previousSibling.textContent, value: allInputs[i].value });
        }
        return list;
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
        return this.element.querySelector('input[type="checkbox"]').disabled;
    }

    set readOnly(readOnly) {
        this.element.querySelectorAll('input[type="checkbox"]').forEach((item) => {
            item.disabled = readOnly;
        });
    }
    setValue(itemValue) {
        let allInputs = this.element.querySelectorAll('input[type="checkbox"]');
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
            new CheckListElement(elementID).clearAll();
            result.forEach((item) => {
                new CheckListElement(elementID).addItem({ text: item.text, value: item.id });
            });
        }, null);
    }

    addChangeEvent() {
        document.getElementById(this.element.id).querySelectorAll('input').forEach(function (item) {
            item.removeEventListener("change", CheckListElement.on_change);
            item.addEventListener("change", CheckListElement.on_change);
        });
    }

    addClickEvent() {
        this.element.removeEventListener("click", CheckListElement.on_click);
        this.element.addEventListener("click", CheckListElement.on_click);
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

export default CheckListElement