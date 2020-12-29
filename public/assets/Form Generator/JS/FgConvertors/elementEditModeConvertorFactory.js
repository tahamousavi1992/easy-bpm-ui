'use strict';
import { FgElement, FG_ElementTypeEnum } from "../fgElements/fgElement.js";
import FgContentEditModeConvertor from "./contentEditModeConvertor.js"
import FgRowEditModeConvertor from "./rowEditModeConvertor.js"
import FgAccordionEditModeConvertor from "./accordionEditModeConvertor.js"
import FgCardEditModeConvertor from "./cardEditModeConvertor.js"
import FgColumnEditModeConvertor from "./columnEditModeConvertor.js";
import FgButtonEditModeConvertor from "./buttonEditModeConvertor.js";
import FgTextboxEditModeConvertor from "./textboxEditModeConvertor.js";
import FgCKEDITOREditModeConvertor from "./ckeditorEditModeConvertor.js";
import FgDropdownEditModeConvertor from "./dropdownEditModeConvertor.js";
import FgComboSearchEditModeConvertor from "./comboSearchEditModeConvertor.js";
import FgRadiobuttonlistEditModeConvertor from "./radiobuttonlistEditModeConvertor.js";
import FgCheckboxlistEditModeConvertor from "./checkboxlistEditModeConvertor.js"
import FgCheckboxEditModeConvertor from "./checkboxEditModeConvertor.js"
import FgFileUploaderEditModeConvertor from "./fileuploaderEditModeConvertor.js"
import FgImageEditModeConvertor from "./imageEditModeConveror.js"
import FgLinkEditModeConvertor from "./linkEditModeConvertor.js"
import FgTitleEditModeConvertor from "./titleEditModeConvertor.js"
import FgCaptchaEditModeConvertor from "./captchaEditModeConvertor.js"
import FgHTMLCODEEditModeConvertor from "./htmlcodeEditModeConvertor.js"
import FgDatepickerEditModeConvertor from "./datepickerEditModeConvertor.js"
import FgDownloadLinkEditModeConvertor from "./downloadLinkEditModeConvertor.js"
import FgDataGridEditModeConvertor from "./dataGridEditModeConvertor.js"
import FgFormEditModeConvertor from "./formEditModeConvertor.js"
import FgChartEditModeConvertor from "./chartEditModeConvertor.js"
import FgWordCaptchaEditModeConvertor from "./wordCaptchaEditModeConvertor.js"
class FgElementEditModeConvertorFactory {

    static toCreateByType(fgElementType) {

        let factoryContainer = {
            content: new FgContentEditModeConvertor(),
            row: new FgRowEditModeConvertor(),
            accordion: new FgAccordionEditModeConvertor(),
            card: new FgCardEditModeConvertor(),
            column: new FgColumnEditModeConvertor(),
            button: new FgButtonEditModeConvertor(),
            textbox: new FgTextboxEditModeConvertor(),
            ckeditor: new FgCKEDITOREditModeConvertor(),
            dropdown: new FgDropdownEditModeConvertor(),
            comboSearch: new FgComboSearchEditModeConvertor,
            radioButtonlist: new FgRadiobuttonlistEditModeConvertor(),
            checkboxlist: new FgCheckboxlistEditModeConvertor(),
            checkbox: new FgCheckboxEditModeConvertor(),
            fileuploader: new FgFileUploaderEditModeConvertor(),
            image: new FgImageEditModeConvertor(),
            link: new FgLinkEditModeConvertor(),
            title: new FgTitleEditModeConvertor(),
            htmlcode: new FgHTMLCODEEditModeConvertor(),
            datepicker: new FgDatepickerEditModeConvertor(),
            captcha: new FgCaptchaEditModeConvertor(),
            downloadLink: new FgDownloadLinkEditModeConvertor(),
            dataGrid: new FgDataGridEditModeConvertor(),
            form: new FgFormEditModeConvertor(),
            chart: new FgChartEditModeConvertor(),
            wordCaptcha: new FgWordCaptchaEditModeConvertor(),
        }

        switch (fgElementType) {
            case FG_ElementTypeEnum.CONTENT:
                return factoryContainer.content;

            case FG_ElementTypeEnum.ROW:
                return factoryContainer.row;

            case FG_ElementTypeEnum.ACCORDION:
                return factoryContainer.accordion;

            case FG_ElementTypeEnum.CARD:
                return factoryContainer.card;

            case FG_ElementTypeEnum.COLUMN:
                return factoryContainer.column;

            case FG_ElementTypeEnum.BUTTON:
                return factoryContainer.button;

            case FG_ElementTypeEnum.TEXTBOX:
                return factoryContainer.textbox;

            case FG_ElementTypeEnum.CKEDITOR:
                return factoryContainer.ckeditor;

            case FG_ElementTypeEnum.DROPDOWNLIST:
                return factoryContainer.dropdown;

            case FG_ElementTypeEnum.COMBOSEARCH:
                return factoryContainer.comboSearch;

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

            case FG_ElementTypeEnum.DOWNLOADLINK:
                return factoryContainer.downloadLink;

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

export default FgElementEditModeConvertorFactory