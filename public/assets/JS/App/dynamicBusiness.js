
var BtnConfirm = null;
var _BtnCallBackConfirm = null;
var _params = null;
function DelayDone(target) {
    document.getElementById(target.id).setAttribute("disabled", "disabled");
    setTimeout(function () { StopDelay(target); }, 2000)
    return true;
}

function StopDelay(target) {
    document.getElementById(target.id).removeAttribute("disabled");
}

window.onload = function () {
    addDynamicBusinessConfirmRegion();
    initialFunctions();
}
function addDynamicBusinessConfirmRegion() {
    if (document.getElementById("DynamicBusinessConfirmRegion") == null) {
        var newdiv = document.createElement('div');
        newdiv.setAttribute('id', 'DynamicBusinessConfirmRegion');
        document.body.appendChild(newdiv);

        var newdiv = document.createElement('div');
        newdiv.setAttribute('id', 'DynamicBusinessConfirmRegionMsg');
        document.body.appendChild(newdiv);
    }
}
  
function bpmsConfirm(msg, callBack, params) {
    addDynamicBusinessConfirmRegion();
    var Module = "<div class=\"modal fade bs-example-modal-sm\" id=\"DynamicBusinessConfirmModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">";
    Module = Module + "<div class=\"modal-dialog modal-dialog-centered modal-sm\"><div class=\"modal-content\">  <div class=\"modal-header\">Confirmation</div><div class=\"modal-body\">";
    Module = Module + "<div id=\"ConfirmContent\">...</div>";
    Module = Module + "</div><div class=\"modal-footer\"><button type=\"button\"  onclick=\"bpmsYesConfirmed();return false;\" style=\"margin-right: 10px;\" class=\"btn btn-primary font-weight-bold\">Yes</button><button type=\"button\" class=\"btn btn-light-primary font-weight-bold\"   data-dismiss=\"modal\">No</button></div></div></div>";
    document.getElementById("DynamicBusinessConfirmRegion").innerHTML = Module;
    document.getElementById("ConfirmContent").innerHTML = msg;
    try {
        $('#DynamicBusinessConfirmModal').modal('show');
    }
    catch (ex) {

    }
    window.confirmParams = params;
    window.confirmCallBack = callBack;
}

function bpmsYesConfirmed() {
    try {
        window.confirmCallBack(window.confirmParams);
        $('#DynamicBusinessConfirmModal').modal('hide');
    }
    catch (ex) {
        $('#DynamicBusinessConfirmModal').modal('hide');
    }
}

var selected_tab = 1;
var createCookie = function (name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function SetTab(TabName, index) {
    var mytabs = $("#" + TabName).tabs({
        activate: function (event, ui) {
            selected_tab = ui.newTab.index();
            createCookie(TabName, selected_tab, 1)
        }
    });
    if (index == "") {
        selected_tab = getCookie(TabName) != "" ? parseInt(getCookie(TabName)) : 0;
    }
    else {
        selected_tab = parseInt(index);
        createCookie(TabName, selected_tab, 1);
    }

    mytabs.tabs("option", "active", selected_tab);
}

function FormatNumber(id1) {
    document.getElementById(id1).value = FormatNumberBy3(removeComa(document.getElementById(id1).value));
}
function removeComa(str) {
    while (str.indexOf('،') > 0) {
        str = str.replace('،', '');
    }

    return str;
}
function addComma(str) {
    var objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');

    while (objRegex.test(str)) {
        str = str.replace(objRegex, '$1,$2');
    }

    return str;
}
function FormatNumberBy3(num, decpoint, sep) {
    // check for missing parameters and use defaults if so
    if (arguments.length == 2) {
        sep = "،";
    }
    if (arguments.length == 1) {
        sep = "،";
        decpoint = ".";
    }
    // need a string for operations
    num = num.toString();
    // separate the whole number and the fraction if possible
    a = num.split(decpoint);
    x = a[0]; // decimal
    y = a[1]; // fraction
    z = "";


    if (typeof (x) != "undefined") {
        // reverse the digits. regexp works from left to right.
        for (i = x.length - 1; i >= 0; i--)
            z += x.charAt(i);
        // add seperators. but undo the trailing one, if there
        z = z.replace(/(\d{3})/g, "$1" + sep);
        if (z.slice(-sep.length) == sep)
            z = z.slice(0, -sep.length);
        x = "";
        // reverse again to get back the number
        for (i = z.length - 1; i >= 0; i--)
            x += z.charAt(i);
        // add the fraction back in, if it was there
        if (typeof (y) != "undefined" && y.length > 0)
            x += decpoint + y;
    }
    return x;
}

function keyUp(elemId, evn) { var isNS = (navigator.appName == "Netscape") ? 1 : 0; input = document.getElementById(elemId); if (!isNS) { if ((event.keyCode != 37) && (event.keyCode != 38) && (event.keyCode != 39) && (event.keyCode != 40)) input.value = Comma(filterNum(input.value), 1) } else { if ((evn.which != 37) && (evn.which != 38) && (evn.which != 39) && (evn.which != 40)) input.value = Comma(filterNum(input.value), 1) } } function keyPress(elemId, evn) { var isNS = (navigator.appName == "Netscape") ? 1 : 0; if (!isNS) { if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false } else { if (evn.which < 48 || evn.which > 57) returnfalse } input = document.getElementById(elemId); input.value = Comma(filterNum(input.value), 0) } function filterNum(str) { re = /،/g; return str.replace(re, "") } function Comma(myVal, oneFlag) { var T = '', S = String(myVal), L = S.length - oneFlag, j; for (var j = 0; j <= L; j++) { T += S.charAt(j); if ((j < L) && ((L - j) % 3 == 0)) T += '،' } return T }

function isPostBack() { //function to check if page is a postback-ed one
    return document.referrer.indexOf(document.location.href) > -1;
}

//Requireds
function checkAtLeastOneItem() {
    try {
        var combo = $(".rcbInput");
        if (combo.get_checkedItems().length > 0)
            $(".rcbInput").parent().removeClass('empty-field');
        else
            $(".rcbInput").parent().addClass('empty-field');
    }
    catch (ex) {

    }
}
function checkEmptyInputFields() {
    $('input.required-field, textarea.required-field,input[data-val-required] ,textarea[data-val-required]').each(function () {

        if ($(this).val() != '') {
            $(this).removeClass('empty-field');
        }
        else
            $(this).addClass('empty-field');
    });
}
function checkSelectedItem() {
    $('select.required-field, select[data-val-required]').each(function () {
        if (parseInt($(this).val()) > -1)
            $(this).removeClass('empty-field');
        else
            $(this).addClass('empty-field');
    });
}
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        initialFunctions();
    }
}

function inputChange() {
    $(".required-field, [data-val-required]").on("keydown keyup", function () {
        if ($(this).val() != '') {
            $(this).removeClass('empty-field');
        }
        else
            $(this).addClass('empty-field');
    });
    $('select.empty-field').change(function () {
        if (parseInt($(this).val()) > -1)
            $(this).removeClass('empty-field');
        else
            $(this).addClass('empty-field');
    });
    $('input[type="file"]').change(function () {
        if ($(this).val() != '')
            $(this).removeClass('empty-field');
        else
            $(this).addClass('empty-field');
    });
}

//Accordion
function ReloadAccordion(isAjax) {
    $('.panel-group a[data-toggle="collapse"]').click(function () {
        var target = $(this).attr("href").substring(1, $(this).attr("href").length); // activated tab   
        if (!$($(this).attr("href")).hasClass("in"))
            createCookie(this.closest('.panel-group').id, target, 1);
        else
            createCookie(this.closest('.panel-group').id, '', 1);
    });
    $('.panel-group a[data-toggle="collapse"]').closest('.panel-group').each(function () {
        if (isPostBack() == false && isAjax == false)
            createCookie(this.id, '', 1);
        var activedtab = getCookie(this.id) != null ? getCookie(this.id) : '';
        if (activedtab != '')
            $('a[href="#' + activedtab + '"]').click();
    });
}
//Tabs
function ReloadTabs(isAjax) {
    $('.nav-tabs a').click(function () {
        var target = $(this).attr("href").substring(1, $(this).attr("href").length); // activated tab
        createCookie(this.closest("ul").id, target, 1);
    })

    $('.nav-tabs a').closest("ul").each(function () {
        if (isPostBack() == false && isAjax == false)
            createCookie(this.id, '', 1);
        var activedtab = getCookie(this.id) != null ? getCookie(this.id) : '';
        if (activedtab != '')
            $('.nav-tabs a[href="#' + activedtab + '"]').tab('show')
    });
}

//skin
jQuery(document).ready(function () {
    $('.box-login   i').click(function () {
        $('.user-bar-mobile').stop().slideToggle('2000', "easeOutBounce", function () { });
    })
});
jQuery(document).ready(function () {
    $('.btn-group-mobile   i').click(function () {

        $('.button-right').stop().slideToggle('2000', "easeOutBounce", function () { });
    })
});
//For Mobile Menu:
jQuery(document).ready(function () {
    if ($('.responsive-tabs').responsiveTabs != null) {
        $('.responsive-tabs').responsiveTabs({
            accordionOn: ['xs', 'sm']
        });
    }
});

//uploader
function initialUploader() {
    var upluploader = $("input[type=file]").parent().find('input[type=file]');
    upluploader.val("");
    var uploader = $("input[type=file]").parent().find('.file-upload');
    uploader.val("انتخاب فایل");

    $('body').on("click", ".file-upload", function () {
        $(this).parent().find('input[type="file"]').trigger('click');
    });

    $('body').on("change", "input[type=file]", function () {
        var txtuploader = $(this).parent().find('.file-upload');
        txtuploader.val($(this).val().split('\\').pop());
        if (txtuploader.val() === '') {
            txtuploader.val("انتخاب فایل");
            if (txtuploader.hasClass('required-field') || txtuploader.attr('data-val-required') != null) {
                txtuploader.addClass('empty-field');
            }
        }
        else if (txtuploader.hasClass('required-field') || txtuploader.attr('data-val-required') != null) {
            txtuploader.removeClass('empty-field');
        }
    });
}

//taha add this code to call initial after adding some control to page
function initialFunctions() {
    bpmsInitialValidation();
    //accordion and tabs
    ReloadAccordion(false);
    ReloadTabs(false);
    // Inputs
    inputChange();
    checkEmptyInputFields();
    // DropDowns
    checkSelectedItem();
    // RadComboBox
    checkAtLeastOneItem();
    //Uploader
    initialUploader();
    var txtuploader = $("input[type=file]").parent().find('.file-upload');
    txtuploader.val("Select File");
    //custom.js init
    initCustom();
     
    //initial date pickers
    initialDatePicker();

    initCkeditor();
    $('[data-toggle="tooltip"]').tooltip();
}

//add class to body
document.onreadystatechange = function () {
    document.getElementsByTagName('body')[0].className = document.getElementsByTagName('body')[0].className + (' header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable');
}

//taha add this code to call initial after adding some control to page
function initialDatePicker() {
    document.querySelectorAll('[data-type="DATEPICKER"],[fg_element_type="DATEPICKER"]').forEach((item) => {
        if (item.getAttribute('data-datepicker') != 'true') {
            new dtsel.DTS(item, {
                showTime: item.getAttribute('data-showtype') == 'datetime',
                dateFormat: (item.getAttribute('data-dateformat') != '' && item.getAttribute('data-dateformat') != null) ? item.getAttribute('data-dateformat') : "yyyy/mm/dd",
                timeFormat: "HH:MM:SS"
            });
            item.setAttribute('data-datepicker', 'true');
        }
    });
}
 
function initCkeditor() {
    $('.myCkeditor').each(function () {
        if (document.getElementById('cke_' + $(this).attr("id")) == null) {
            let editor = CKEDITOR.replace($(this).attr("id"));
            editor.on('change', function (evt) {
                document.getElementById(evt.editor.name).innerHTML = evt.editor.getData();
            });
        }
    });
}