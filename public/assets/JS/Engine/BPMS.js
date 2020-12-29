'use strict';
import BPMSCommon from "./BPMSCommon.js"

class FormControl {
    static get(elementID) {
        if (elementID == null || elementID.toString().trim() == '')
            return null;
        return BPMSCommon.getElementClass(elementID);
    }
    //this will get element with element type like BUTTONS.
    static getByType(type, elementID) {
        if (elementID == null || elementID.toString().trim() == '')
            return null;
        return BPMSCommon.getByType(type, elementID);
    }
    //params is object with this patern => {id:"1",name:"book"} or is string wwith this patern => paramName=paramValue,paramName=paramValue .
    static openFormPopUp(target, formId, params, callBackFunction, width, height) {
        BPMSCommon.openPopUpForm(target, formId, BPMSCommon.convertParams(params), callBackFunction, width, height);
    }
    //show customize confirm after clicking on buttons which have data-confirm in their attributes. 
    static showConfirm(target, confirmText, callBackFunc) {
        FormControl.addDynamicBusinessConfirmRegion();
        window["bpmsCallBackFunc"] = callBackFunc;
        window["bpms_target"] = target;
        var Module =
            `<div class="modal fade bs-example-modal-sm" id="DynamicBusinessConfirmModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
           <div class="modal-dialog modal-dialog-centered modal-sm"><div class="modal-content">  <div class="modal-header">Confirmation</div><div class="modal-body"> 
           <div id="ConfirmContent">${confirmText}</div> 
           </div><div class="modal-footer"><button type="button" style="float:left;"
           onclick="$('#DynamicBusinessConfirmModal').modal('toggle');FormControl.showExpressionConfirm(window['bpms_target'],window['bpmsCallBackFunc']);return false;" style="margin-right: 10px;" class="btn btn-primary">Accept</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div></div></div>`;
        document.getElementById("DynamicBusinessConfirmRegion").innerHTML = Module;
        $('#DynamicBusinessConfirmModal').modal('toggle');
    }

    static showExpressionConfirm(target, callBackFunc) {
        FormControl.addDynamicBusinessConfirmRegion();
        if (target.getAttribute('data-hasExpressionConfirm') == "true") {
            window["bpmsCallBackFunc"] = callBackFunc;
            let isGridCommand = target.getAttribute('data-command') == 'true';
            let confirmHasFalseAction = target.getAttribute('data-expressionConfirmHasFalseAction');
            let confirmParams = target.getAttribute('data-expressionConfirmParams');
            let confirmText = target.getAttribute('data-expressionConfirmText');
            CallGetAjax(window['GetConfirmResultUrl'] + (window['GetConfirmResultUrl'].indexOf('?') > 0 ? "&" : "?") + confirmParams, {
                controlId: target.id,
                gridId: (isGridCommand == true ? target.closest('table').id : '0'),
                isGridCommand: isGridCommand,
                formId: (isGridCommand == true ? target.closest('table').getAttribute('data-formId') : target.getAttribute('data-formId')),
            }, null, null, function (result) {
                if (result == true) {
                    var Module = `<div class="modal fade bs-example-modal-sm" id="DynamicBusinessConfirmModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                     <div class="modal-dialog modal-dialog-centered modal-sm"><div class="modal-content">  <div class="modal-header">Confirmation</div><div class="modal-body"> 
                     <div id="ConfirmContent">${confirmText}</div></div><div class="modal-footer">`;
                    if (confirmHasFalseAction == "true")
                        Module += `<button type="button" style="float:left;" onclick="$('#DynamicBusinessConfirmModal').modal('toggle');window['bpmsCallBackFunc']();return false;" style="margin-right: 10px;" class="btn btn-primary">Accept</button><button type="button" class="btn btn-default"  data-dismiss="modal">Cancel</button></div></div></div></div>`;
                    else
                        Module += `<button type="button" class="btn btn-default" style="float:left;" data-dismiss="modal">تایید</button></div></div></div></div>`;
                    document.getElementById("DynamicBusinessConfirmRegion").innerHTML = Module;
                    $('#DynamicBusinessConfirmModal').modal('toggle');
                } else {
                    window['bpmsCallBackFunc']();
                }
            }, null);


        }
        else {
            window['bpmsCallBackFunc']();
        }
    }

    static addDynamicBusinessConfirmRegion() {
        if (document.getElementById("DynamicBusinessConfirmRegion") != null) {
            var newdiv = document.createElement('div');
            newdiv.setAttribute('id', 'DynamicBusinessConfirmRegion');
            newdiv.setAttribute('style', 'direction:rtl;text-align:right;');
            document.body.appendChild(newdiv);
        }
    }

    //paging
    static loadPagingForm(url, pageIndex, formId, targetId, extraParams, getParameterFunction) {
        url = url + (url.indexOf("?") >= 0 ? "&" : "?") + "PageIndex=" + pageIndex;
        let sourse = document.getElementById(formId);
        let paramsArray = new Array();
        if (sourse != null) {
            paramsArray = getDataModelAsArray(formId);
            //if has advance search
            if (sourse.querySelector('.panel-default') != null) {
                let value = sourse.querySelector('div.in') != null ? '2' : '1';
                paramsArray.push({ name: "AdvSearchStatus", value: value })
            }

        }
        if (getParameterFunction != null) {
            let data = getParameterFunction();
            if (data != null) {
                for (let [key, value] of Object.entries(data)) {
                    paramsArray.push({ name: key, value: value });
                }
            }
        }
        //distinct parameters
        if (extraParams != null) {
            for (var i = 0; i < extraParams.split('&').length; i++) {
                if (paramsArray.find(function (value) { value.name == extraParams.split('&')[i].split('=')[0] }) == null) {
                    paramsArray.push({ name: extraParams.split('&')[i].split('=')[0], value: extraParams.split('&')[i].split('=')[1] })
                }
            }
        }
        CallGetAjax(url, paramsArray, formId, targetId, null, null);

    }

    static postForm(target, goNext) {
        if (window.bpmsFormIsValid()) {
            let url = window[target.closest('[data-formId]').getAttribute('data-formId') + "GetPostUrl"];
            if (url != '') {
                if (target.getAttribute('data-type') != null) {
                    url += (url.indexOf("?") > 0 ? "&controlId=" : "?controlId=") + target.id;
                }
                if (goNext != null) {
                    url += (url.indexOf("?") > 0 ? "&goNext=" : "?goNext=") + goNext.toString().toLowerCase();
                }
                BPMSCommon.doPostBack(target, url);
            }
        }
    }

    //close modal
    static closeModal() {
        let latestOpenModal = document.querySelectorAll('.modal.show')[document.querySelectorAll('.modal.show').length - 1];
        $('#' + latestOpenModal.id).modal('toggle');
    }
    //initial js
    static initBpmsEngine() {
        initElement();
        initFormsEvents();
        initComboSearchs();
        initListElementDependents();
        //DynamicBusiness.js initialize all required fields and accordion and tabs
        initialFunctions();
    }
}

window["FormControl"] = FormControl;

function initFormsEvents() {
    document.querySelectorAll('[data-eventfunction-change],[data-eventfunction-click],[data-eventfunction-blur],[data-eventfunction-focus]').forEach(function (item, index) {
        for (let i = 0; i < item.attributes.length; i++) {
            let attrName = item.attributes[i].name;
            if (attrName.startsWith("data-eventfunction")) {

                let eventName = item.attributes[i].name.replace('data-eventfunction-', '');
                let eventFunction = item.getAttribute('data-eventfunction-' + eventName);
                switch (eventName) {
                    case "change":
                        BPMSCommon.getElementClass(item.id).addChangeEvent(eventFunction);
                        break;
                    case "click":
                        BPMSCommon.getElementClass(item.id).addClickEvent(eventFunction);
                        break;
                    case "blur":
                        item.addEventListener("focusin", function () { window[eventFunction](BPMSCommon.getElementClass(event.target.id)); });
                        break;
                    case "focus":
                        item.addEventListener("focusout", function () { window[eventFunction](BPMSCommon.getElementClass(event.target.id)); });
                        break;
                }
            }
        }
    });
}

function initComboSearchs() {
    document.querySelectorAll('[data-type="COMBOSEARCH"]').forEach(function (item) {
        $(item).select2({
            ajax: {
                url: window[BPMSCommon.getContainerFormId(item) + "GetListElementUrl"],
                dataType: 'json',
                data: function (term, page) {
                    let data = {
                        query: (term.term != null ? term.term.trim() : term.term),
                        controlId: this[0].id,
                        formId: this[0].getAttribute('data-formId')
                    };

                    let parameter = this[0].getAttribute('data-parameter');
                    parameter.split(',').forEach(function (item) {
                        if (item != "")
                            data[item.split(':')[0]] = FormControl.get(item.split(':')[1]).value;
                    });
                    return data;
                },
                processResults: function (data) {
                    return {
                        results: data
                    };
                }
            },
        });
        item.parentElement.querySelector('.select2-selection').classList.toggle('form-control');
    });
}

//this will add a event to change events of listItemElement to update elements depended to them.
function initListElementDependents() {
    document.querySelectorAll('[data-type]').forEach((item) => {
        if (BPMSCommon.getElementClass(item.id) != null &&
            BPMSCommon.getElementClass(item.id).addChangeEvent != null)
            BPMSCommon.getElementClass(item.id).addChangeEvent("updateDependentListElements");
    });
}

function initElement() {
    document.querySelectorAll('[data-type]').forEach((item) => {
        if (BPMSCommon.getElementClass(item.id) != null && BPMSCommon.getElementClass(item.id).init != null) {
            BPMSCommon.getElementClass(item.id).init();
        }
    });
}

//this method updates controls which are dependent on changed control passed to this method.
function updateDependentListElements(classObj) {
    let elementId = classObj.element.id;
    //sample data-parameter is "BookID:DROPDOWNLIST703942:true,"
    document.querySelectorAll('[data-parameter]').forEach((item) => {
        let parameter = item.getAttribute('data-parameter');
        if (parameter != "" && parameter.includes(":" + elementId + ":true")) {
            BPMSCommon.getElementClass(item.id).updateItems();
        }
    });
}

window["updateDependentListElements"] = updateDependentListElements;

export default FormControl