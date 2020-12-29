import DatePickerElement from "./DatePickerElement.js"
import InputElement from "./InputElement.js"
import FileElement from "./FileElement.js"
import RadioListElement from "./RadioListElement.js"
import LinkElement from "./LinkElement.js"
import ImageElement from "./ImageElement.js"
import DisplayElement from "./DisplayElement.js"
import CkeditorElement from "./CkeditorElement.js"
import DropDownElement from "./DropDownElement.js"
import CheckListElement from "./CheckListElement.js"
import ComboSearchElement from "./ComboSearchElement.js"
import DataGridElement from "./DataGridElement.js"
import ButtonElement from "./ButtonElement.js"
import ChartElement from "./ChartElement.js"
import CheckBoxElement from "./CheckBoxElement.js"
import CardElement from "./CardElement.js"
import WordCaptchaElement from "./WordCaptchaElement.js"
'use strict';
class BPMSCommon {
    static getElementClass(elementID) {
        let element = BPMSCommon.getById(elementID);
        let type = element.getAttribute('data-type');
        return BPMSCommon.getByType(type, elementID)
    }

    static getByType(type, elementID) {
        switch (type) {
            case "DROPDOWNLIST":
                return new DropDownElement(elementID);
            case "TEXTBOX":
                return new InputElement(elementID);
            case "RADIOBUTTONLIST":
                return new RadioListElement(elementID);
            case "CHECKBOXLIST":
                return new CheckListElement(elementID);
            case "CHECKBOX":
                return new CheckBoxElement(elementID);
            case "IMAGE":
                return new ImageElement(elementID);
            case "LINK":
                return new LinkElement(elementID);
            case "TITLE":
                return new DisplayElement(elementID);
            case "DATEPICKER":
                return new DatePickerElement(elementID);
            case "CKEDITOR":
                return new CkeditorElement(elementID);
            case "HTMLCODE":
                return new DisplayElement(elementID);
            case "FILEUPLOAD":
                return new FileElement(elementID);
            case "DOWNLOADLINK":
                return new LinkElement(elementID);
            case "COMBOSEARCH":
                return new ComboSearchElement(elementID);
            case "DATAGRID":
                return new DataGridElement(elementID);
            case "BUTTON":
                return new ButtonElement(elementID);
            case "CHART":
                return new ChartElement(elementID);
            case "CARD":
                return new CardElement(elementID);
            case "WORDCAPTCHA":
                return new WordCaptchaElement(elementID);
            default:
                return null;
        }
    }

    static callBusiness(target, controlId, commandId, params, callBackFunc) {
        let urlName = BPMSCommon.getContainerFormId(target) + "GetExecuteCodeUrl";
        let url = window[urlName] + (window[urlName].indexOf('?') > 0 ? '&' : '?') + 'formID=' + target.getAttribute('data-formId') + '&' + 'commandId=' + commandId + '&' + 'controlId=' + controlId + '&' + BPMSCommon.convertParams(params).replaceAll(',', '&');
        CallPostApi(url, null, null, null, callBackFunc, null);
    }

    static fromB64(enCodeText) {
        if (enCodeText == null || enCodeText == 'undefined' || enCodeText == '') return '';
        return decodeURIComponent(escape(atob(enCodeText)));
    };

    static getDependentParameter(element, data) {
        let parameter = element.getAttribute('data-parameter');
        if (parameter != null) {
            parameter.split(',').forEach(function (item) {
                if (item != "") {
                    let fControl = FormControl.get(item.split(':')[1]);
                    if (fControl.value != null && (fControl.element.getAttribute('data-type') != 'DATEPICKER' || fControl.value != ''))
                        data[item.split(':')[0]] = fControl.value;
                }

            });
        }
    }

    static convertParams(params) {
        let convertParams = '';
        if (params != null && typeof params != 'string') {
            for (let [key, value] of Object.entries(object1)) {

                convertParams += (convertParams != '' ? ',' : '') + `${key}=${value},`;
            }
        }
        else {
            //it will check wether params string has any controls in it templae
            let matches = params.match(/\[(.*?)\]/g);
            if (matches != null) {
                //replace controls value. controls are indicated with [controlId].Therefore this code replace control value with [controlId]
                matches.forEach(function (item) {
                    let value = FormControl.get(item.replace('[', '').replace(']', '')).value;
                    if (value != null)
                        params = params.replace(item, value);
                    else {
                        //if value is null, this remove parameter from params.with this paterns paramName=[controlId] or ,paramName=[controlId]
                        let rMatch = params.match(new RegExp(",(.*?)=\\[" + item.replace('[', '').replace(']', '') + "\\]", "g"));
                        if (rMatch == null)
                            rMatch = params.match(new RegExp("(.*?)=\\[" + item.replace('[', '').replace(']', '') + "\\]", "g"));
                        params = params.replace(rMatch[0], '');
                    }
                });
                convertParams = trimChar(params, ',');
            }
            else {
                convertParams = params;
            }
        }
        return convertParams;
    }

    static getContainerFormId(element) {
        let container = element.closest('#divBpmsContainer[data-formId]');
        //if element is in modal footer ,container will be null
        if (container == null)
            container = element.closest('.modal-dialog').querySelector('#divBpmsContainer');
        return container.getAttribute('data-formId');
    }

    static getDataModel(element) {
        var formData = $(element).find('select, textarea, input').serializeAndEncode();
        var fileData = new FormData();
        var _files = $(element).find('input[type=file]');
        for (var i = 0; i < _files.length; i++) {
            fileData.append(_files[i].id + "[]", _files[i].files[0]);
        }
        for (var i = 0; i < formData.split('&').length; i++) {
            let key = formData.split('&')[i].split('=')[0];
            if (fileData.get(key) != null) {
                fileData.set(key, fileData.get(key) + "," + decodeURIComponent(formData.split('&')[i].split('=')[1]))
            }
            else {
                if (key != 'g-recaptcha-response')
                    fileData.append(key, decodeURIComponent(formData.split('&')[i].split('=')[1]))
            }
        }

        element.querySelectorAll('[name="g-recaptcha-response"]').forEach(function (item) {
            fileData.append(item.closest('[data-type="CAPTCHA"]').id, item.value);
        });

        return fileData;
    }

    static openPopUpForm(target, formId, params, callBackFunc, width, height) {
        window[BPMSCommon.getContainerFormId(target) + "openPopUpForm"](formId, params, callBackFunc, width, height);
    }

    static doPostBack(target, url) {
        let containerElement = target.closest('.modal-content') != null ? target.closest('.modal-content') : target.closest('#divBpmsContainer');
        CallPostAjax(url, BPMSCommon.getDataModel(containerElement), null, null, function (result) {
            showMessageByContent(result);
            let data = dataMessageToObject(result);
            if (isMessageSuccess(result)) {
                if (data.RedirectUrl != null && data.RedirectUrl != "") {
                    window.location.href = data.RedirectUrl;
                } else {
                    if (data.GetFormUrl != null && data.GetFormUrl != "") {
                        CallGetAjax(data.GetFormUrl, null, 'divBpmsParentContainer', 'divBpmsParentContainer', function () {
                            FormControl.initBpmsEngine();
                        }, null);
                    }
                    else {
                        if (data.IsSubmit == true) {
                            if (target.closest('.modal.show') != null) {
                                FormControl.closeModal();
                                let callBackFuncName = BPMSCommon.getContainerFormId(target) + 'callBackModal';
                                if (window[callBackFuncName] != null)
                                    window[callBackFuncName]();
                            }
                            else closeWinPopUp(true, true, null);
                        }
                        if (data.ListDownloadModel != null && data.ListDownloadModel.length > 0) {
                            data.ListDownloadModel.forEach(function (item) {
                                BPMSCommon.downloadFileModel(item);
                            });
                        }
                    }
                }
            }
            else
                if (data.RedirectUrl != null && data.RedirectUrl != "") {
                    window.location.href = data.RedirectUrl;
                }
        }, null);
    }

    static getChangeFuncName(target) {
        let name = target.getAttribute('data-eventfunction-change');
        if (name == null && target.closest('[data-eventfunction-change]') != null)
            name = target.closest('[data-eventfunction-change]').getAttribute('data-eventfunction-change');
        return name;
    }

    static getById(elementId) {
        //For handeling preview modal that cause two elements,having same id ,existed.
        let element = document.querySelector('[data-form-container="true"] #' + elementId);
        return element == null ? document.getElementById(elementId) : element;
    }

    static callUpdateDependent(target) {
        window["updateDependentListElements"](BPMSCommon.getElementClass(target.id));
    }

    static downloadFileModel(downloadModel) {
        var a = document.createElement("a"); //Create <a>
        a.href = `data:${downloadModel.MimeType};base64,` + downloadModel.FileData; //Image Base64 Goes here
        a.download = downloadModel.FileName; //File name Here
        a.click(); //Downloaded file
    }
}

export default BPMSCommon