//نمایش پیام ها به صورت پاپ آپ
function showMessage(type, Msg) {
    toastr.options =
    {
        'closeButton': true,
        'debug': false,
        'positionClass': 'toast-bottom-left',
        'onclick': null,
        'showDuration': '300',
        'hideDuration': '1000',
        "preventDuplicates": false,
        "newestOnTop": false,
        'timeOut': '5000',
        'extendedTimeOut': '1000',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut'
    };
    toastr[type](Msg, '');
}
function showMessageByContent(_content) {

    try {
        if ($(_content).find('[data-message]').length <= 0) {
            toastr.clear();
            toastr.options =
            {
                'closeButton': true,
                'debug': false,
                'positionClass': 'toast-bottom-left',
                'onclick': null,
                'showDuration': '1000',
                'hideDuration': '1000',
                'timeOut': '10000',
                'extendedTimeOut': '1000',
                'showEasing': 'swing',
                'hideEasing': 'linear',
                'showMethod': 'fadeIn',
                'hideMethod': 'fadeOut'
            };
            if (type == null) {
                type = "error";
                Msg = "failed";
            }
            toastr[type](Msg, '');
        }
        else {
            toastr.clear();
            $(_content).find('[data-message]').each(function () {
                var type = this.getAttribute("class");
                var Msg = this.innerText;

                toastr.options =
                {
                    'closeButton': true,
                    'debug': false,
                    'positionClass': 'toast-bottom-left',
                    'onclick': null,
                    'showDuration': '300',
                    'hideDuration': '1000',
                    "preventDuplicates": false,
                    "newestOnTop": false,
                    'timeOut': '5000',
                    'extendedTimeOut': '1000',
                    'showEasing': 'swing',
                    'hideEasing': 'linear',
                    'showMethod': 'fadeIn',
                    'hideMethod': 'fadeOut'
                };
                if (type == null) {
                    type = "error";
                    Msg = "failed";
                }
                toastr[type](Msg, '');
            });
        }

    }
    catch (ex) {

    }
}
$.fn.serializeAndEncode = function () {
    return $.map(this.serializeArray(), function (val) {
        return [val.name, encodeURIComponent(val.value)].join('=');
    }).join('&');
};
//download file using url
function downloadFile(url) {
    var link = document.createElement("a");
    link.href = url;
    link.click();
}
function isMessageSuccess(_content) {
    var type = $(_content).find('[data-isSuccess]').attr("data-isSuccess");
    return type == "true";
}
function setListModelBinding(containerID, newName) {
    var _Container = document.getElementById(containerID);

    for (var i = 1; i < _Container.rows.length; i++) {
        $(_Container.rows[i]).find('input, select, textarea').each(function (index, item) {
            item.name = item.name.replace(/.*?\./i, newName + '[' + (i - 1) + '].');
        });
    }
}

function CallGetAjax(url, data, sourceID, resultTargetID, successFunc, sourceElement) {

    $.ajaxSetup({
        type: "GET",

    });
    $.ajax({
        url: url,
        data: data,
        error: function (result) {
            local = false;
        },
        success: function (result) {
            if (isCorrectDataType(this)) {
                if (sourceID != null) {
                    let resultObject = getResultHtmlFromAjax(result, resultTargetID);
                    $('#' + sourceID).children().remove();
                    if (sourceID == resultTargetID) {
                        if ($(result).attr('id') == resultTargetID)
                            $('#' + sourceID).append($($(result).html()));
                        else
                            $('#' + sourceID).append($(resultObject.html()));
                    }
                    else
                        $('#' + sourceID).append(resultObject);
                }
                else
                    if (sourceElement != null) {
                        let resultObject = getResultHtmlFromAjax(result, resultTargetID);
                        $(sourceElement).children().remove();
                        $(sourceElement).append(resultObject);
                    }

                if (successFunc != null) {
                    successFunc(result);
                }
            }

        }
    });
}
function CallPostAjax(url, data, sourceID, resultTargetID, successFunc, sourceElement) {
    if (data != null && data.append == null) {
        let newData = new FormData();
        for (let [key, value] of Object.entries(data)) {
            newData.append(String(key), value);
        }
        data = newData;
    }
    if (data == null)
        data = new FormData();
    $.ajaxSetup({
        type: "POST"
    });
    $.ajax({
        url: url,
        contentType: false,
        processData: false,
        data: data,
        dataType: "html",
        error: function (xhr, ajaxOptions, thrownError) {
            showMessageByContent(xhr.responseText);
        },
        success: function (result) {
            if (isCorrectDataType(this)) {
                if (sourceID != null) {
                    let resultObject = getResultHtmlFromAjax(result, resultTargetID);
                    $('#' + sourceID).children().remove();
                    $('#' + sourceID).append(resultObject);
                }
                else
                    if (sourceElement != null) {
                        let resultObject = getResultHtmlFromAjax(result, resultTargetID);
                        $(sourceElement).children().remove();
                        $(sourceElement).append(resultObject);
                    }

                if (successFunc != null) {
                    successFunc(result);
                }
            }
        }
    });
}
function CallPostApi(url, data, sourceID, resultTargetID, successFunc, sourceElement) {
    if (data != null && data.append == null) {
        let newData = new FormData();
        for (let [key, value] of Object.entries(data)) {
            newData.append(String(key), value);
        }
        data = newData;
    }
    if (data == null)
        data = new FormData();
    $.ajaxSetup({
        type: "POST"
    });
    $.ajax({
        url: url,
        contentType: false,
        processData: false,
        data: data,
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            showMessageByContent(xhr.responseText);
        },
        success: function (result) {
            if (isCorrectDataType(this)) {
                if (sourceID != null) {
                    let resultObject = getResultHtmlFromAjax(result, resultTargetID);
                    $('#' + sourceID).children().remove();
                    $('#' + sourceID).append(resultObject);
                }
                else
                    if (sourceElement != null) {
                        let resultObject = getResultHtmlFromAjax(result, resultTargetID);
                        $(sourceElement).children().remove();
                        $(sourceElement).append(resultObject);
                    }

                if (successFunc != null) {
                    successFunc(result);
                }
            }
        }
    });
}
function CallGetApi(url, data, sourceID, resultTargetID, successFunc, sourceElement) {
    $.ajaxSetup({
        type: "GET"
    });
    $.ajax({
        url: url,
        data: data,
        dataType: "json",
        error: function (result) {
        },
        success: function (result) {

            if (isCorrectDataType(this)) {
                if (sourceID != null) {
                    let resultObject = getResultHtmlFromAjax(result, resultTargetID);
                    $('#' + sourceID).children().remove();
                    if (sourceID == resultTargetID) {
                        if ($(result).attr('id') == resultTargetID)
                            $('#' + sourceID).append($($(result).html()));
                        else
                            $('#' + sourceID).append($(resultObject.html()));
                    }
                    else
                        $('#' + sourceID).append(resultObject);
                }
                else
                    if (sourceElement != null) {
                        let resultObject = getResultHtmlFromAjax(result, resultTargetID);
                        $(sourceElement).children().remove();
                        $(sourceElement).append(resultObject);
                    }

                if (successFunc != null) {
                    successFunc(result);
                }
            }
        }
    });
}
function getResultHtmlFromAjax(result, resultTargetID) {
    let resultObject = $(result).find('#' + resultTargetID);
    if (resultObject == null || resultObject.length == 0)
        resultObject = $('<div>' + result + '</div>').find('#' + resultTargetID);
    return resultObject;
}

function openModal(targetId, backdrop) {
    //if the modal is in another modal ,it will move it to body
    if (document.getElementById(targetId).closest('.modal-body') != null ||
        document.getElementById(targetId).closest('.modal-dialog') != null) {
        if (document.querySelector(`body > #${targetId}`) != null) {
            document.querySelector(`body > #${targetId}`).remove()
        }
        document.getElementsByTagName('body')[0].appendChild(document.getElementById(targetId));
    }
    else {
        if (document.querySelectorAll("#" + targetId).length > 1) {
            if (document.querySelector(`body > #${targetId}`) != null) {
                document.querySelector(`body > #${targetId}`).remove()
            }
            document.getElementsByTagName('body')[0].appendChild(document.getElementById(targetId));
        }
    }
    if (backdrop == true) {
        $("#" + targetId).modal({ backdrop: "static", show: true });
    }
    else
        $("#" + targetId).modal("show");
}
function closeModal(targetId) {
    $('#' + targetId).modal('toggle');
}
function closeModalByChildId(childId) {
    $('#' + childId).closest('div[role="dialog"]').modal('toggle');
}
function getDataModel(_targetContainerID) {
    var formData = $('#' + _targetContainerID).find('select, textarea, input').serializeAndEncode();
    var fileData = new FormData();
    var _files = $('#' + _targetContainerID + ' :input[type=file]');
    for (var i = 0; i < _files.length; i++) {
        fileData.append(_files[i].id + "[]", _files[i].files[0]);
    }
    for (var i = 0; i < formData.split('&').length; i++) {
        let key = formData.split('&')[i].split('=')[0];
        if (fileData.get(key) != null) {
            fileData.set(key, fileData.get(key) + "," + decodeURIComponent(formData.split('&')[i].split('=')[1]))
        }
        else
            fileData.append(key, decodeURIComponent(formData.split('&')[i].split('=')[1]))
    }

    return fileData;
}
//when ajax load a jquery object,it load script src url through ajax setup and our success function must ignore it.
function isCorrectDataType(target) {
    return target.dataType != "script";
}
function getDataModelAsArray(_targetContainerID) {
    let data = $('#' + _targetContainerID).find('select, textarea, input').serializeArray();
    return data;
}

//Make a loading element for ajax operations.
function addLoadingBMP() {
    var loading = document.createElement('div');
    loading.setAttribute('id', '_loadingBpm');
    loading.innerHTML = `<div class="blockUI blockOverlay" style="z-index: 10; border: none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(0, 0, 0); opacity: 0.05; cursor: wait; position: fixed;"></div>
<div class="blockMsg blockElement" style="z-index:999999999999;position: fixed;padding: 0px;margin: 0px;width: 170px;top: 50%;left:50%;text-align: center;color: rgb(0, 0, 0);border: 0px;cursor: wait;transform: translate(-50%,-50%);">
    <div class="blockui ">
        <span>در حال بارگذاری...</span>
        <span class="spinner  spinner-primary "></span>
    </div>
</div>` ;
    return loading;
}

function startLoading() {
    //start loading
    let container = null;
    if (document.getElementsByClassName('flex-root').length > 0)
        container = document.getElementsByClassName('flex-root')[0];
    else
        container = document.getElementsByClassName('flex-root')[0];
    container.appendChild(addLoadingBMP());
}

function stopLoading() {
    //stop loading
    if (document.getElementById('_loadingBpm') != null) {
        if (document.getElementsByClassName('skin-wrapper').length > 0)
            document.querySelector('.flex-root').removeChild(document.getElementById('_loadingBpm'));
        else
            document.querySelector('.flex-root').removeChild(document.getElementById('_loadingBpm'));
    }
}

//paging
function loadSearchForm(url, isAjax, formId, targetId, extraParams, getParameterFunction) {
    if (isAjax != null && isAjax == true) {
        let sourse = document.getElementById(formId);
        let paramsArray = new Array();
        if (sourse != null) {
            paramsArray = getDataModelAsArray(formId);
            //if has advance search
            if (sourse.querySelector('.advsearch') != null) {
                let value = sourse.querySelector('.advsearch div.show') != null ? '2' : '1';
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
        CallGetAjax(url, paramsArray, formId, targetId, function (result) {
            $('#' + formId).children().remove();
            if ($(result)[0] != null && $(result)[0].id == targetId) {
                document.getElementById(formId).innerHTML = result;
            }
            else
                $('#' + formId).append($(result).find('#' + targetId));
        }, null);
    }
    else {
        window.location.href = url + "&" + extraParams;
    }
}

//ComboTree
function setComboTreeValues(comboTreeElement, values) {
    if (values != null && values != '') {
        comboTreeElement.setSelection(values.split(','));
    }
}

function getComboTreeValues(comboTreeElement) {
    let rolesName = '';
    if (comboTreeElement.getSelectedIds() != false) {
        if (Array.isArray(comboTreeElement.getSelectedIds()))
            comboTreeElement.getSelectedIds().forEach(function (e) {
                rolesName += e + ',';
            });
        else
            rolesName = comboTreeElement.getSelectedIds();
    }
    if (rolesName == null) return rolesName;
    return rolesName.replace(/,\s*$/, "");
}

//tab
function reInitTabs(containerId, ulId) {
    $('#' + containerId).on('click', `#${ulId} a`, function (e) {
        e.preventDefault();
        var url = $(this).attr("data-url");

        if (typeof url !== "undefined") {
            var pane = $(this), href = this.hash;

            // ajax load from data-url
            $(href).load(url, function (result) {
                pane.tab('show');
            });
        } else {
            $(this).tab('show');
        }
    });
}

$(document).ready(function () {
    initAllComboSearchs();
});
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
function replaceAll(str, search, replacement) {
    return str.replace(new RegExp(search, 'g'), replacement);
};
//check form change
function setFormChangeStatus(formTarget) {
    window[formTarget + "checkedStr"] = '';
    document.getElementById(formTarget).querySelectorAll('input,select').forEach(function (item) {
        window[formTarget + "checkedStr"] += "&" + item.value;
    });
}
function checkFormHasChanged(formTarget) {
    let lastInput = '';
    document.getElementById(formTarget).querySelectorAll('input,select').forEach(function (item) {
        lastInput += "&" + item.value;
    });
    return window[formTarget + "checkedStr"] != lastInput;
}

//add a hidden field form to specify whether it is applying or saving
function applyForm() {
    if (document.getElementById('hdnIsApply') != null)
        document.getElementById('hdnIsApply').remove();

    let inputElement = document.createElement('input')
    inputElement.type = "hidden";
    inputElement.id = "hdnIsApply";
    inputElement.name = "hdnIsApply";

    document.getElementsByTagName('form')[0].appendChild(inputElement);
}
//remove a hidden field
function saveForm() {
    if (document.getElementById('hdnIsApply') != null)
        document.getElementById('hdnIsApply').remove();
}
//convert returned data message to object
function dataMessageToObject(result) {
    if ($(result).find('#bpmsData') != null && $(result).find('#bpmsData').html() != null)
        return JSON.parse($(result).find('#bpmsData').html().trim())
    else return null;
}

//CKEditor
//this put value in code editor
function insertAtCaret(element, text) {
    if (document.selection) {
        element.focus();
        var sel = document.selection.createRange();
        sel.text = text;
        element.focus();
    } else if (element.selectionStart || element.selectionStart === 0) {
        var startPos = element.selectionStart;
        var endPos = element.selectionEnd;
        var scrollTop = element.scrollTop;
        element.value = element.value.substring(0, startPos) +
            text + element.value.substring(endPos, element.value.length);
        element.focus();
        element.selectionStart = startPos + text.length;
        element.selectionEnd = startPos + text.length;
        element.scrollTop = scrollTop;
    } else {
        element.value += text;
        element.focus();
    }
}

//trim section
function trimChar(string, charToRemove) {
    while (string.charAt(0) == charToRemove) {
        string = string.substring(1);
    }

    while (string.charAt(string.length - 1) == charToRemove) {
        string = string.substring(0, string.length - 1);
    }

    return string;
}
function trimStartChar(string, charToRemove) {
    while (string.charAt(0) == charToRemove) {
        string = string.substring(1);
    }
    return string;
}
function trimEndChar(string, charToRemove) {
    while (string.charAt(string.length - 1) == charToRemove) {
        string = string.substring(0, string.length - 1);
    }
    return string;
}

//combo search
function initAllComboSearchs() {
    $('[data-iscombosearch]').each(function (index, item) {
        $(item).select2({
            ajax: {
                url: this.getAttribute('data-sourceUrl'),
                dataType: 'json',
                data: function (term, page) {
                    let data = {
                        query: term.term,
                    };
                    if (this[0].getAttribute('data-parameter') != null) {
                        data[this[0].getAttribute('data-parameter').split('=')[0]] = this[0].getAttribute('data-parameter').split('=')[1]
                    }
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
    })
}
//for decode and encodeing base 64 string
function toB64(plainText) {
    if (plainText == null || plainText == 'undefined' || plainText == '' || plainText == '[object Object]') return '';
    return btoa(unescape(encodeURIComponent(plainText)));
}
function fromB64(enCodeText) {
    if (enCodeText == null || enCodeText == 'undefined' || enCodeText == "null" || enCodeText == '' || enCodeText == '[object Object]') return '';
    return decodeURIComponent(escape(atob(enCodeText)));
}
//regular expression
function getValueInsideXmlTag(tagName, value, removeCDATA) {
    let matches = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, 's').exec(value);
    if (matches == null && value.indexOf(`<${tagName}>`) > -1) {
        let result = value.substring(value.indexOf(`<${tagName}>`) + `<${tagName}>`.length, value.indexOf(`</${tagName}>`));
        return (removeCDATA == true ? result.replace('<![CDATA[', '').replace(']]>', '') : result)
    }
    return matches != null && matches.length > 0 ? (removeCDATA == true ? matches[1].replace('<![CDATA[', '').replace(']]>', '') : matches[1]) : '';
}
//regular expression
function getValueInsideString(start, end, value) {
    let matches = new RegExp(`${start}(.*?)${end}`, 's').exec(value);
    return matches != null && matches.length > 0 ? matches[1] : '';
}
//get business rule generator name  
function getBusinessRuleName(value) {
    let result = '';
    let reRule = /<Name>(.*?)<\/Name>/g;
    let m;
    do {
        m = reRule.exec(value);
        if (m) {
            result += m[1] + ' ,';
        }
    } while (m);
    return trimEndChar(result, ',');
}
function selectVariable(varSelected) {

    if (window.selectedTarget.getAttribute('onchange') != null) {
        window.selectedTarget.value = varSelected;
        window.selectedTarget.onchange();
    }
    else {

        try {
            if (window.selectedTarget.getAttribute('data-isinner') === 'true') {
                window.insertAtCaret(window.selectedTarget, "[" + varSelected + "]");
            }
            else {
                //for firing react onchange event, I add this piece of code to add value in different way 
                //and call change event after that.
                let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                nativeInputValueSetter.call(window.selectedTarget, varSelected);
                let ev2 = new Event('change', { bubbles: true });
                window.selectedTarget.dispatchEvent(ev2);
            }

        }
        catch {
            window.selectedTarget.value = varSelected;
        }
    }
}
//clear variable input
function clearVariableInput(target) {
    target.closest('div').querySelector('input').value = '';
}

Date.prototype.YYYYMMDDHHMMSS = function () {
    var yyyy = this.getFullYear().toString();
    var MM = pad(this.getMonth() + 1, 2);
    var dd = pad(this.getDate(), 2);
    var hh = pad(this.getHours(), 2);
    var mm = pad(this.getMinutes(), 2)
    var ss = pad(this.getSeconds(), 2)
    var ss = pad(this.getMilliseconds(), 4)
    return yyyy + MM + dd + hh + mm + ss;
};

function getDate() {
    d = new Date();
    alert(d.YYYYMMDDHHMMSS());
}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}