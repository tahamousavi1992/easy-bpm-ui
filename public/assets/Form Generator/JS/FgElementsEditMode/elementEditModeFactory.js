

'use strict';
import { FgElement, FG_ElementTypeEnum } from "../fgElements/fgElement.js";
import FgColumnEditMode from "./columnEditMode.js";
import FgButtonEditMode from "./buttonEditMode.js";
import FgTextboxEditMode from "./textboxEditMode.js";
import FgRowEditMode from "./rowEditMode.js";
import FgContentEditMode from "./contentEditMode.js";
import FgDropdownEditMode from "./dropdownEditMode.js";
import FgComboSearchEditMode from "./comboSearchEditMode.js";
import FgRadiobuttonlistEditMode from "./radiobuttonlistEditMode.js"
import FgCheckboxlistEditMode from "./checkboxlistEditMode.js"
import FgCheckboxEditMode from "./checkboxEditMode.js"
import FgFileuploaderEditMode from "./fileuploaderEditMode.js"
import FgImageEditMode from "./imageEditMode.js"
import FgLinkEditMode from "./linkEditMode.js"
import FgTitleEditMode from "./titleEditMode.js"
import FgHTMLCODEEditMode from "./htmlcodeEditMode.js"
import FgDatepickerEditMode from "./datepickerEditMode.js"
import FgCaptchaEditMode from "./captchaEditMode.js"
import FgCKEDITOREditMode from "./ckeditorEditMode.js"
import FgDownloadLinkEditMode from "./downloadlinkEditMode.js"
import FgDataGridEditMode from "./dataGridEditMode.js";
import FgFormEditMode from "./formEditMode.js";
import FgChartEditMode from "./chartEditMode.js";
import FgWordCaptchaEditMode from "./wordCaptchaEditMode.js"
class FgElementEditModeFactory {

    static toCreateByType(fgElementType) {

        let factoryContainer = {
            content: FgContentEditMode.createContent,
            row: FgRowEditMode.createRow,
            column: FgColumnEditMode.createColumn,
            button: FgButtonEditMode.createButton,
            textbox: FgTextboxEditMode.createTextbox,
            dropdown: FgDropdownEditMode.createDropdown,
            radioButtonlist: FgRadiobuttonlistEditMode.createRadiobuttonlist,
            checkboxlist: FgCheckboxlistEditMode.createCheckboxlist,
            checkbox: FgCheckboxEditMode.createCheckbox,
            fileuploader: FgFileuploaderEditMode.createFileuploader,
            image: FgImageEditMode.createImage,
            link: FgLinkEditMode.createLink,
            title: FgTitleEditMode.createTitle,
            htmlcode: FgHTMLCODEEditMode.createHTMLCODE,
            datepicker: FgDatepickerEditMode.createDatepicker,
            captcha: FgCaptchaEditMode.createCaptcha,
            ckeditor: FgCKEDITOREditMode.createCKEDITOR,
            downloadLink: FgDownloadLinkEditMode.createDownloadLink,
            comboSearch: FgComboSearchEditMode.createComboSearch,
            dataGrid: FgDataGridEditMode.createDataGrid,
            form: FgFormEditMode.createForm,
            chart: FgChartEditMode.createChart,
            wordCaptcha: FgWordCaptchaEditMode.createCaptcha,
        }

        switch (fgElementType) {
            case FG_ElementTypeEnum.CONTENT:
                return factoryContainer.content;
            case FG_ElementTypeEnum.ROW:
                return factoryContainer.row;
            case FG_ElementTypeEnum.COLUMN:
                return factoryContainer.column;
            case FG_ElementTypeEnum.BUTTON:
                return factoryContainer.button;
            case FG_ElementTypeEnum.TEXTBOX:
                return factoryContainer.textbox;
            case FG_ElementTypeEnum.DROPDOWNLIST:
                return factoryContainer.dropdown;
            case FG_ElementTypeEnum.RADIOBUTTONLIST:
                return factoryContainer.radioButtonlist;
            case FG_ElementTypeEnum.CHECKBOXLIST:
                return factoryContainer.checkboxlist;
            case FG_ElementTypeEnum.CHECKBOX:
                return factoryContainer.checkbox;
            case FG_ElementTypeEnum.FILEUPLOAD:
                return factoryContainer.fileuploader;
            case FG_ElementTypeEnum.IMAGE:
                return factoryContainer.image;
            case FG_ElementTypeEnum.LINK:
                return factoryContainer.link;
            case FG_ElementTypeEnum.TITLE:
                return factoryContainer.title;
            case FG_ElementTypeEnum.HTMLCODE:
                return factoryContainer.htmlcode;
            case FG_ElementTypeEnum.DATEPICKER:
                return factoryContainer.datepicker;
            case FG_ElementTypeEnum.CAPTCHA:
                return factoryContainer.captcha;
            case FG_ElementTypeEnum.CKEDITOR:
                return factoryContainer.ckeditor;
            case FG_ElementTypeEnum.DOWNLOADLINK:
                return factoryContainer.downloadLink;
            case FG_ElementTypeEnum.COMBOSEARCH:
                return factoryContainer.comboSearch;
            case FG_ElementTypeEnum.DATAGRID:
                return factoryContainer.dataGrid;
            case FG_ElementTypeEnum.FORM:
                return factoryContainer.form;
            case FG_ElementTypeEnum.CHART:
                return factoryContainer.chart;
            case FG_ElementTypeEnum.WORDCAPTCHA:
                return factoryContainer.wordCaptcha;
        }
    }
}

export default FgElementEditModeFactory