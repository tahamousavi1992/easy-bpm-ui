
function bpmsInitialValidation() {
    document.querySelectorAll("[data-val='true']").forEach(function (element, index) {
        element.removeEventListener('change', bpmsElementCheckElementValidation);
        element.removeEventListener('keypress', bpmsElementCheckElementValidation);
        element.removeEventListener('keyup', bpmsElementCheckElementValidation);

        element.addEventListener('change', bpmsElementCheckElementValidation);
        if (element.hasAttribute("data-val-justnumber") || element.hasAttribute("data-val-justCharacter") ||
            element.hasAttribute("data-val-justEnglishCharacter") || element.hasAttribute("data-val-justPersianCharacter") ||
            element.hasAttribute("data-val-symbol") || element.hasAttribute("data-val-characterAndNumber") ||
            element.hasAttribute("data-val-enCharacterAndNumber") || element.hasAttribute("data-val-allExceptInPersian") ||
            element.hasAttribute("data-val-allExceptInEn")) {
            element.addEventListener('keypress', bpmsElementCheckElementValidation);
            element.addEventListener('keyup', bpmsElementCheckElementValidation);
        }
        if (element.hasAttribute("data-val-codemeli")) {
            element.removeEventListener('keypress', checkCodeMeli);
            element.addEventListener('keypress', checkCodeMeli);
        }
    });
    //document.querySelectorAll("a[data-val-group],button[data-val-group]").forEach(function (element, index) {
    //    let onClick = element.getAttribute('onclick');
    //    if (onClick != null) {
    //        if (onClick.indexOf('checkFormValidation') < 0) {
    //            element.removeAttribute('onclick');
    //            element.setAttribute('onclick', 'if(bpmsFormIsValid()) { ' + onClick + ' ; return true;} else return false;');
    //        }
    //    }
    //    else {
    //        element.setAttribute('onclick', 'if(bpmsFormIsValid()) {return true;} else return false;');
    //    }
    //});
}

function bpmsElementCheckElementValidation() {
    bpmsCheckElementValidation(this, false);
}

function bpmsFormIsValid(valGroupName) {
    if (valGroupName == null)
        valGroupName = event.target.getAttribute('data-val-group');
    popUpMsg = '';
    let result = true;
    document.querySelectorAll("[data-val='true']").forEach(function (element, index) {
        if (element.getAttribute('data-val-group') == valGroupName) {
            if ((event.target.closest('div.modal-dialog') == null && element.closest('div.modal-dialog') == null) ||
                (event.target.closest('div.modal-dialog') == element.closest('div.modal-dialog'))) {
                if (!bpmsCheckElementValidation(element, true, true)) {
                    result = false;
                }
            }
        }
    });
    if (!result && popUpMsg != '' && popUpMsg != null)
        alert(popUpMsg);
    return result;
}

function bpmsCheckElementValidation(element, isPost) {
    let validationMsg = '';
    if (element.getAttribute('data-val') == 'true') {
        //if it is textbox element
        if (element.type == 'text' || element.type == "password") {
            if (event != null && event.type == 'keypress') {
                if (window['lastEvent'] != 'keypress')
                    window['preValue'] = element.value;
                window['lastEvent'] = event.type;
                return;
            }
            else
                if (event != null && event.type != 'keyup') {
                    window['preValue'] = element.value;
                }
            window['lastEvent'] = event != null ? event.type : null;
        }
        //check email
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.email.toLowerCase()) != null) {
            let isValid = vsIsEmailValid(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.email.toLowerCase()) + "<br />";
        }
        //check CodeMeli
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.codeMeli.toLowerCase()) != null) {
            let isValid = vIsCodeMeliValid(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.codeMeli.toLowerCase()) + "<br />";
        }
        //check justCharacter
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.justCharacter.toLowerCase()) != null) {
            let isValid = vIsCharacter(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.justCharacter.toLowerCase()) + "<br />";
        }
        //check justNumber
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.justNumber.toLowerCase()) != null) {
            JustNumeric(element);
            let isValid = vIsNumeric(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.justNumber.toLowerCase()) + "<br />";
        }
        //check postalCode
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.postalCode.toLowerCase()) != null) {
            let isValid = vIsPostalCode(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.postalCode.toLowerCase()) + "<br />";
        }
        //check mobile
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.mobile.toLowerCase()) != null) {
            let isValid = vIsMobile(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.mobile.toLowerCase()) + "<br />";
        }
        //check justEnglishCharacter
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.justEnglishCharacter.toLowerCase()) != null) {
            let isValid = vIsEnglishCharacter(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.justEnglishCharacter.toLowerCase()) + "<br />";
        }
        //check justPersianCharacter
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.justPersianCharacter.toLowerCase()) != null) {
            let isValid = vIsPersianCharacter(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.justPersianCharacter.toLowerCase()) + "<br />";
        }
        //check symbol
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.symbol.toLowerCase()) != null) {
            let isValid = vIsSymbols(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.symbol.toLowerCase()) + "<br />";
        }
        //check characterAndNumber
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.characterAndNumber.toLowerCase()) != null) {
            let isValid = vIsCharacterAndNumber(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.characterAndNumber.toLowerCase()) + "<br />";
        }
        //check sepratorNumber
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.sepratorNumber.toLowerCase()) != null) {
            numberWithCommas(element.id, ',');
            let isValid = vIsNumericWithSeprator(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.sepratorNumber.toLowerCase()) + "<br />";
        }
        //check phone
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.phone.toLowerCase()) != null) {
            let isValid = vIsPhone(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.phone.toLowerCase()) + "<br />";
        }
        //check enCharacterAndNumber
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.enCharacterAndNumber.toLowerCase()) != null) {
            let isValid = vIsEnCharacterAndNumber(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.enCharacterAndNumber.toLowerCase()) + "<br />";
        }
        //check allExceptInPersian
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.allExceptInPersian.toLowerCase()) != null) {
            AllExceptInPersian(element);
            let isValid = vIsAllExceptInPersian(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.allExceptInPersian.toLowerCase()) + "<br />";
        }
        //check allExceptInEn
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.allExceptInEn.toLowerCase()) != null) {
            AllExceptInPersian(AllExceptInEn);
            let isValid = vIsAllExceptInEn(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.allExceptInEn.toLowerCase()) + "<br />";
        }
        //check codeMeliCompany
        if (element.getAttribute('data-val-' + textBoxValTypeEnum.codeMeliCompany.toLowerCase()) != null) {
            let isValid = vIsCodeMeliCompanyValid(element.value);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-' + textBoxValTypeEnum.codeMeliCompany.toLowerCase()) + "<br />";
        }
        //check regular expression
        if (element.getAttribute('data-val-regex-pattern') != null) {
            let valpattern = element.getAttribute('data-val-regex-pattern');
            if (valpattern != '' && valpattern != null) {
                let isValid = vsIsPatternValid(element.value, valpattern);
                if (!isValid)
                    validationMsg += element.getAttribute('data-val-regex') + "<br />";
            }
        }

        //check maxlength
        let valMaxLength = element.getAttribute('data-val-length-max');
        if (valMaxLength != null && valMaxLength != '') {
            let isValid = vsIsMaxLengthValid(element.value, valMaxLength);
            if (!isValid)
                validationMsg += element.getAttribute('data-val-length') + "<br />";
        }

        //checking required validation should be the last check
        if (element.getAttribute('data-val-required') != null) {
            if (isPost) {
                let isValid = vIsRequiredValid(element.value);
                if (!isValid)
                    validationMsg += element.getAttribute('data-val-required') + "<br />";
            }
        }
        if (validationMsg == '')
            bpmsHideValidation(element);
        else {
            validationMsg = validationMsg.trimRight("<br />");
            bpmsShowValidation(element, validationMsg, isPost);
        }
    }
    return validationMsg == '';
}

function bpmsShowValidation(element, validationMsg, isPost) {
   
    let valFor = findHelpToParent(element);
    if (valFor != null) {
        valFor.innerHTML = validationMsg;
    }
}

function findHelpToParent(element) {
    let queryString = '.text-muted[for="' + element.id + '"],.text-muted[htmlfor="' + element.id + '"],.help-block[for="' + element.name + '"],.field-validation-valid[data-valmsg-for="' + element.id + '"],.field-validation-valid[data-valmsg-for="' + element.name + '"]';
    let parent = element.parentElement;
    if (parent != null) {
        if (parent.querySelector(queryString) != null)
            return parent.querySelector(queryString);
        if (parent.parentElement != null) {
            if (parent.parentElement.querySelector(queryString) != null)
                return parent.parentElement.querySelector(queryString);
            if (parent.parentElement.parentElement != null) {
                if (parent.parentElement.parentElement.querySelector(queryString) != null)
                    return parent.parentElement.parentElement.querySelector(queryString);
            }
        }
    }
    return null;
}

function bpmsHideValidation(element) {
    let valFor = document.querySelector('.help-block[for="' + element.name + '"]');
    if (valFor != null) {
        valFor.innerHTML = '';
    }
}


function vIsCodeMeliValid(nid) {
    if (nid == null || nid == '')
        return true;
    var n = 0;
    var m = 0;
    var ld = 0;

    if (nid == '-- کد ملی --' ||
        nid == 'کد ملی')
        return true;

    nid = enNumber(nid);
    if (nid.length < 10) {
        return false;
    }

    if ((nid == "1111111111") || (nid == "2222222222") || (nid == "3333333333") || (nid == "4444444444") || (nid == "5555555555")
        || (nid == "6666666666") || (nid == "7777777777") || (nid == "8888888888") || (nid == "9999999999") || (nid == "0000000000") || (nid == "0123456789")) {
        return false;
    }

    ld = Number(nid.substr(9, 1));

    for (i = 0; i < 10; i++) {
        if (nid.charCodeAt(i) < 46 || nid.charCodeAt(i) > 57) {
            return false;
        }
        if (i < 9)
            n = n + Number(nid.substr(i, 1)) * (10 - i);
    }
    m = n % 11;

    if (!((m == 0 && ld == 0) || (m == 1 && ld == 1) || (m > 1 && ld == 11 - m))) {
        return false;
    }

    return true;
}

function vIsNumeric(input) {
    if (input == null || input == '')
        return true;
    var E = /^[0-9.,/]+$/;
    return input.replaceAll(' ', '') == '' || E.test(input)
}

function vIsCharacter(input) {
    if (input == null || input == '')
        return true;
    var E = /^[a-zA-Z\u0600-\u06FF\s]+$/;
    return E.test(input)
}

function vIsPersianCharacter(input) {
    if (input == null || input == '')
        return true;
    var p = /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\s]+$/;
    return p.test(input);
}

function vIsEnglishCharacter(input) {
    if (input == null || input == '')
        return true;
    var r = /^[a-zA-Z]*$/;
    return r.test(input);
}

function vIsSymbols(input) {
    if (input == null || input == '')
        return true;
    var s = /[-!$%@^&*()_+|~=`{}\[\]:";'<>?,.\/a-zA-Z\u0600-\u06FF\s]/;

    return s.test(input);
}

function vIsCharacterAndNumber(input) {
    if (input == null || input == '')
        return true;
    var E = /^[a-zA-Z0-9\u0600-\u06FF\s]+$/;
    return E.test(input);
}

function vIsNumericWithSeprator(input) {
    if (input == null || input == '')
        return true;
    var E = /^[0-9.,/]+$/;
    return E.test(input)
}

function vIsPostalCode(input) {
    if (input == null || input == '')
        return true;
    var postal_code = input;

    // کد پستی اجباری نیست
    if (postal_code.length == 0) {
        return true;
    }

    if (postal_code.length < 10) {
        return false;
    }
    if (postal_code.length > 10) {
        return false;
    }
    if (postal_code == '1111111111' || postal_code == '0000000000' || postal_code == '2222222222' || postal_code == '3333333333' || postal_code == '4444444444' || postal_code == '5555555555' || postal_code == '6666666666' || postal_code == '7777777777' || postal_code == '8888888888' || postal_code == '9999999999') {
        //کدپستی وارد شده، صحیح نمی باشد
        return false;
    }

    //if (postal_code.charAt(0) == '0' || postal_code.charAt(1) == '0' || postal_code.charAt(2) == '0' || postal_code.charAt(3) == '0' || postal_code.charAt(4) == '0' || postal_code.charAt(5) == '0' || postal_code.charAt(6) == '0' || postal_code.charAt(7) == '0' || postal_code.charAt(8) == '0' || postal_code.charAt(9) == '0') {
    //    //کدپستی وارد شده، صحیح نمی باشد
    //    return false;
    //}
    //else if (postal_code.charAt(0) == '2' || postal_code.charAt(1) == '2' || postal_code.charAt(2) == '2' || postal_code.charAt(3) == '2' || postal_code.charAt(4) == '2' || postal_code.charAt(5) == '2' || postal_code.charAt(6) == '2' || postal_code.charAt(7) == '2' || postal_code.charAt(8) == '2' || postal_code.charAt(9) == '2') {
    //    //کدپستی وارد شده، صحیح نمی باشد
    //    return false;
    //}

    return true;
}

function vIsMobile(input) {
    if (input == null || input == '')
        return true;
    if (input == null || input.trim().length == 0) return true;
    return /09([0-9][0-9])-?[0-9]{3}-?[0-9]{4}/.test(input) || /۰۹([۰-۹][۰-۹])-?[۰-۹]{3}-?[۰-۹]{4}/.test(input);
}

function vIsPhone(input) {
    if (input == null || input == '')
        return true;
    return /^[0-9]+$/.test(input) || /^[۰-۹]+$/.test(input)
}

function vIsEnCharacterAndNumber(input) {
    if (input == null || input == '')
        return true;
    var E = /^[a-zA-Z0-9\s]+$/;
    return E.test(input);
}

function vIsAllExceptInEn(input) {
    if (input == null || input == '')
        return true;
    var E = /[-!$%@^&*()_+|~=`{}\[\]:";'<>?,.\/\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\s]+$/;
    var s = input;
    for (var i = 0; i < s.length; i++) {
        if (E.test(s.charAt(i)) == false) {
            return false;
        }
    }

    return true;
}

function vIsAllExceptInPersian(input) {
    if (input == null || input == '')
        return true;
    var E = /[-!$%@^&*()_+|~=`{}\[\]:";'<>?,.\/a-zA-Z0-9\s]+$/;
    var s = input;
    for (var i = 0; i < s.length; i++) {
        if (E.test(s.charAt(i)) == false) {
            return false;
        }
    }

    return true;
}

function vIsCodeMeliCompanyValid(code) {
    if (code == null || code == '')
        return true;
    var L = code.length;
    if (L < 11 || parseInt(code, 10) == 0) return false;
    if (parseInt(code.substr(3, 6), 10) == 0) return false;
    var c = parseInt(code.substr(10, 1), 10);
    var d = parseInt(code.substr(9, 1), 10) + 2;
    var z = new Array(29, 27, 23, 19, 17);
    var s = 0;
    for (var i = 0; i < 10; i++)
        s += (d + parseInt(code.substr(i, 1), 10)) * z[i % 5];
    s = s % 11; if (s == 10) s = 0;
    return (c == s);
    return true;
}

function vIsRequiredValid(value) {
    return value != '' && value != null;
}

function vsIsEmailValid(value) {
    if (value == null || value == '')
        return true;
    let patt = /[\s\S]*@[a-z|A-Z][a-z|A-Z|0-9|]*\.([a-z|A-Z][a-z|A-Z|0-9]*(\.[a-z|A-Z][a-z|A-Z|0-9]*)?)$/g;
    return patt.test(value);
}

function vsIsPatternValid(value, pattern) {
    if (value == null || value == '')
        return true;
    return pattern.test(value);
}

function vsIsMaxLengthValid(value, maxLength) {
    if (value == null || value == '')
        return true;
    if (Number(maxLength) > 0 && value != null && value != '') {
        return value.length <= Number(maxLength);
    }
    return true;
}

function numberWithCommas(eid, format) {
    var input = document.getElementById(eid).value;
    input = removeSep(input, format);
    var parts = input.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, format);
    document.getElementById(eid).value = parts.join(".");
}

function removeSep(str, format) {
    while (str.indexOf(format) > 0) {
        str = str.replace(format, '');
    }
    return str;
}

function AllExceptInEn(element) {
    if (event != null && event.type == 'keyup') {
        var p = /[-!$%@^&*()_+|~=`{}\[\]:";'<>?,.\/0-9\u0600-\u06FF\s]+$/;
        var prevValue = window['preValue'];

        // check if new value is more or equal to 255
        if (element.value == "" || element.value == " ") {
            return;
        }
        var s = element.value;
        for (var i = 0; i < s.length; i++) {
            if (p.test(s.charAt(i)) == false) {
                element.value = prevValue;
                return;
            }
        }
    }
}

function AllExceptInPersian(element) {
    if (event != null && event.type == 'keyup') {
        var p = /[-!$%@^&*()_+|~=`{}\[\]:";'<>?,.\/a-zA-Z0-9\s]+$/;
        var prevValue = window['preValue'];
        // check if new value is more or equal to 255
        if (element.value == "" || element.value == " ") {
            return;
        }
        var s = element.value;
        for (var i = 0; i < s.length; i++) {
            if (p.test(s.charAt(i)) == false) {
                element.value = prevValue;
                return;
            }
        }
    }
}

function enNumber(inputString) {
    var enEqualNumbers = {
        _1776: 48
        ,
        _1777: 49
        ,
        _1778: 50
        ,
        _1779: 51
        ,
        _1780: 52
        ,
        _1781: 53
        ,
        _1782: 54
        ,
        _1783: 55
        ,
        _1784: 56
        ,
        _1785: 57
    }

    var enNumbers = '';
    var iChar = '';
    var i = 0;
    while (iChar = String(inputString).substr(i, 1)) {
        if (enEqualNumbers["_" + iChar.charCodeAt(0)] + '-' != 'undefined-') {
            enNumbers += String.fromCharCode(enEqualNumbers["_" + iChar.charCodeAt(0)]);
        } else {
            enNumbers += iChar;
        }
        i++;
    }

    return (enNumbers);
}

function JustNumeric(element) {
    if (event != null && event.type == 'keyup') {
        var p = /^[0-9۰-۹.,/]+$/;

        if (element.value == "" || p.test(element.value)) {
        }
        else {
            element.value = window['preValue'];
        }

    }
}


var textBoxValTypeEnum = {
    text: 'text',
    password: 'password',
    email: 'email',
    codeMeli: 'codeMeli',
    justCharacter: 'فقطjustCharacter حروف',
    justNumber: 'justNumber',
    postalCode: 'postalCode',
    mobile: 'mobile',
    justEnglishCharacter: 'justEnglishCharacter',
    justPersianCharacter: 'justPersianCharacter',
    symbol: 'symbol',
    characterAndNumber: 'characterAndNumber',
    sepratorNumber: 'sepratorNumber',
    phone: 'phone',
    enCharacterAndNumber: 'enCharacterAndNumber',
    allExceptInPersian: 'allExceptInPersian',
    allExceptInEn: 'allExceptInEn',
    codeMeliCompany: 'codeMeliCompany',
};

String.prototype.trimRight = function (charlist) {
    if (charlist === undefined)
        charlist = "\s";

    return this.replace(new RegExp("[" + charlist + "]+$"), "");
};