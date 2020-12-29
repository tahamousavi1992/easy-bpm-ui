'use strict';

class FgElement {

    constructor(id, type, cssClass, label, expressionVisibilityCode) {
        this.id = id;
        this.type = type;
        this.cssClass = cssClass != null ? cssClass.replaceAll('empty-field', '') : '';
        this.label = label;
        this.expressionVisibilityCode = expressionVisibilityCode;
    }

    static getType() {
    }
}

var FG_ElementTypeEnum = {
    CONTENT: 'CONTENT',
    ROW: 'ROW',
    ACCORDION: 'ACCORDION',
    CARD: 'CARD',
    BUTTON: 'BUTTON',
    TEXTBOX: 'TEXTBOX',
    DROPDOWNLIST: 'DROPDOWNLIST',
    COLUMN: 'COLUMN',
    RADIOBUTTONLIST: 'RADIOBUTTONLIST',
    CHECKBOXLIST: 'CHECKBOXLIST',
    CHECKBOX: 'CHECKBOX',
    FILEUPLOAD: 'FILEUPLOAD',
    IMAGE: 'IMAGE',
    LINK: 'LINK',
    CAPTCHA: 'CAPTCHA',
    WORDCAPTCHA: 'WORDCAPTCHA',
    TITLE: 'TITLE',
    DATEPICKER: 'DATEPICKER',
    CKEDITOR: 'CKEDITOR',
    HTMLCODE: 'HTMLCODE',
    DOWNLOADLINK: 'DOWNLOADLINK',
    COMBOSEARCH: 'COMBOSEARCH',
    DATAGRID: 'DATAGRID',
    FORM: 'FORM',
    CHART: 'CHART',
};

export { FgElement, FG_ElementTypeEnum }