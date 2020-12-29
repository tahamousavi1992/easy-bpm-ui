
import BpmsConfig from '../Shared/BpmsConfig'
const $ = window.$;
class UtilityService {
    constructor() {

    }

    static getDateAsStr(date) {
        return date != null ? date.split('T')[0].replaceAll("-", "/") : '';
    }

    static showConfirm(msg, callBack, params) {
        window.bpmsConfirm(msg, callBack, params)
    }

    static getFormDataByElement(element, additionalData) {
        let _formData = $(element).find('select, textarea, input').serializeAndEncode();
        var fileData = new FormData();
        var _files = $(element).find('input[type=file]');
        for (var i = 0; i < _files.length; i++) {
            fileData.append(_files[i].id + "[]", _files[i].files[0]);
        }
        for (var i = 0; i < _formData.split('&').length; i++) {
            let key = _formData.split('&')[i].split('=')[0];
            if (fileData.get(key) != null) {
                fileData.set(key, fileData.get(key) + "," + decodeURIComponent(_formData.split('&')[i].split('=')[1]))
            }
            else {
                if (key != 'g-recaptcha-response')
                    fileData.append(key, decodeURIComponent(_formData.split('&')[i].split('=')[1]))
            }
        }
        //add not included checkbox list and radio list into form data.
        document.querySelectorAll('[data-type="CHECKBOXLIST"],[data-type="RADIOBUTTONLIST"],[data-type="CHECKBOX"]').forEach((item) => {
            if (_formData.indexOf(item.id) == -1)
                fileData.append(item.id, null)
        });
        //add ckeditor innerHtml instead of value.
        document.querySelectorAll('[data-type="CKEDITOR"]').forEach((item) => {
            if (_formData.indexOf(item.id) > -1)
                fileData.set(item.id, item.innerText)
        });
        element.querySelectorAll('[name="g-recaptcha-response"]').forEach(function (item) {
            fileData.append(item.closest('[data-type="CAPTCHA"]').id, item.value);
        });
        return fileData;
    }

    static getFormData(formId, additionalData) {
        let _formData = $('#' + formId).find('select, textarea, input').serializeAndEncode();
        let fileData = new FormData();
        let _files = $('#' + formId + ' :input[type=file]');
        for (let i = 0; i < _files.length; i++) {
            fileData.append(_files[i].name + "[]", _files[i].files[0]);
        }

        for (var i = 0; i < _formData.split('&').length; i++) {
            let key = _formData.split('&')[i].split('=')[0];
            if (fileData.get(key) != null) {
                fileData.set(key, fileData.get(key) + "," + decodeURIComponent(_formData.split('&')[i].split('=')[1]))
            }
            else
                if (key != 'g-recaptcha-response')
                    fileData.append(key, decodeURIComponent(_formData.split('&')[i].split('=')[1]))
        }
        document.getElementById(formId).querySelectorAll('[name="g-recaptcha-response"]').forEach(function (item) {
            fileData.append(item.closest('[data-type="CAPTCHA"]').id, item.value);
        });
        //add not included checkbox list and radio list into form data.
        document.querySelectorAll('[data-type="CHECKBOXLIST"],[data-type="RADIOBUTTONLIST"],[data-type="CHECKBOX"]').forEach((item) => {
            if (_formData.indexOf(item.id) == -1)
                fileData.append(item.id, null)
        });
        //add ckeditor innerHtml instead of value.
        document.querySelectorAll('[data-type="CKEDITOR"]').forEach((item) => {
            if (_formData.indexOf(item.id) > -1)
                fileData.set(item.id, item.innerText)
        });
        if (additionalData != null) {
            for (let [key, value] of Object.entries(additionalData)) {
                fileData.append(String(key), value);
            }
        }
        return fileData;
    }

    async getData(urlString = '', data = {}) {
        window.startLoading();
        let url = new URL(urlString)
        Object.keys(data).forEach(key => { if (data[key] != null) { url.searchParams.append(key, data[key]) } })
        let resultObj = {};
        await fetch(url)
            .then(res => res.json()).then((result) => { resultObj = result; }, (error) => { resultObj.ResultType = 'error'; }
            );
        window.stopLoading();
        return resultObj;
    }

    async postData(url = '', data) {
        window.startLoading();
        if (data != null && data.append == null) {
            let result = await this.postAsJson(url, data);
            window.stopLoading();
            return result;
        }
        else {
            let result = await this.postAsFormData(url, data);
            window.stopLoading();
            return result;
        }
    }

    async deleteData(urlString = '', data = {}) {
        window.startLoading();
        let url = new URL(urlString)
        Object.keys(data).forEach(key => { if (data[key] != null) { url.searchParams.append(key, data[key]) } })
        let resultObj = {};
        // Default options are marked with *
        const response = await fetch((url), {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            resultObj = result;
        }, (error) => {
            resultObj.ResultType = resultObj == null ? 'error' : 'error';
        });
        window.stopLoading();
        return resultObj;
    }

    async postAsJson(url = '', data = {}) {
        let resultObj = {};
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then(res => res.json()).then((result) => {
            resultObj = result;
        }, (error) => {
            resultObj.ResultType = resultObj == null ? 'error' : 'error';
        });
        return resultObj;
    }

    async postAsFormData(url = '', formData) {
        let resultObj = {};
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: formData // body data type must match "Content-Type" header
        }).then(res => {
            return res.json();
        }).then((result) => {
            resultObj = result;
        }, (error) => {
            resultObj.ResultType = resultObj == null ? 'error' : 'error';
        });
        return resultObj;
    }

    static handelChange(event, state) {
        const value =
            event.target.type === "checkbox" ? event.target.checked : event.target.type == 'file' ?
                event.target.files[0] : event.target.value;
        if (event.target.name.indexOf('.') == -1)
            return {
                [event.target.name]: value
            };
        else {
            let data = { ...state[event.target.name.split('.')[0]] }
            data[event.target.name.split('.')[1]] = value;
            return { [event.target.name.split('.')[0]]: data };
        }
    }

    async doSearch(getListFunc, stateModel, reLoad, isAdvSearch, GetPagingProperties) {
        let data = { ...stateModel };
        if (isAdvSearch != null) data['IsAdvSearch'] = isAdvSearch;
        if (reLoad == true)
            return await getListFunc({ ...data, ...stateModel.GetPagingProperties, PageIndex: 1 });
        else
            return await getListFunc({ ...data, ...stateModel.GetPagingProperties, ...GetPagingProperties });
    }

    static showMessage(resultType, message) {
        if (resultType == 'error' && (message == '' || message == null)) {
            window.showMessage(resultType, 'there is a error in server rsponse');
        }
        else
            window.showMessage(resultType, message);
    }

    static showMessageByList(messageList) {
        if (messageList == 'error') {
            window.showMessage("error", 'there is a error in server rsponse');
        }
        else {
            if (Array.isArray(messageList)) {
                for (let i = 0; i < messageList.length; i++) {
                    UtilityService.showMessage(messageList[i].ResultType, messageList[i].Message);
                }
            }
            else {
                if (messageList != null)
                    UtilityService.showMessage(messageList.ResultType, messageList.Message);
            }
        }
    }
}

export default UtilityService;