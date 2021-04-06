'use strict';
import BPMSCommon from "./BPMSCommon.js"
class WordCaptchaElement {
    constructor(elementID) {
        //element is a input
        this.element = BPMSCommon.getById(elementID);
    }
    get src() {
        return this.element.src;
    }

    get formId() {
        return BPMSCommon.getContainerFormId(this.element);
    }

    init() {
        //set image url of captcha
        let url = window[this.formId + "GetCaptchaUrl"];
        this.element.closest('.bpms-control-container').querySelector('img').src = `${url}${url.includes("?") ? '&' : '?'}key=${this.element.id}&formId=${this.formId}`;
    }

    refresh() {
        //set image url of captcha
        let url = window[this.formId + "GetCaptchaUrl"];
        this.element.closest('.bpms-control-container').querySelector('img').src = `${url}${url.includes("?") ? '&' : '?'}key=${this.element.id}&formId=${this.formId}&a=${Math.floor(Math.random() * 100)}`;
    }

    get visibility() {
        return this.element.closest('.bpms-control-container').style.display != 'none';
    }

    set visibility(visible) {
        this.element.closest('.bpms-control-container').style.display = visible ? "" : "none";
    }

    addClickEvent() {
        this.element.removeEventListener("click", WordCaptchaElement.on_click);
        this.element.addEventListener("click", WordCaptchaElement.on_click);
    }

    static on_click() {
        window[event.target.getAttribute('data-eventfunction-click')](BPMSCommon.getElementClass(event.target.id));
    }
}

export default WordCaptchaElement