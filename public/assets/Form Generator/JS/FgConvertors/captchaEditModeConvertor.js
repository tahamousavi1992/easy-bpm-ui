'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgCaptchaEditMode from "../FgElementsEditMode/captchaEditMode.js"
import FgCaptcha from "../FgElements/captcha.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgCaptchaEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    toJQueryObject(fgCaptchaElementEditMode) {
        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgCaptchaElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);
        // Captcha
        let fgCaptcha = fgCaptchaElementEditMode.fgElement;

        let captchaJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgCaptchaElementEditMode)
            .attr("data-language", fgCaptcha.language)
            .attr("data-sitekey", fgCaptcha.sitekey)
            .attr("data-expressionVisibilityCode", fgCaptcha.expressionVisibilityCode)
            .attr("data-privatekey", fgCaptcha.privatekey);
        FgCommon.setVisibilityCodeObjectToElement(captchaJQueryObject, fgCaptcha.expressionVisibilityCode);
        window["fgCaptcha.id"] = fgCaptcha.id;
        window["fgCaptcha.sitekey"] = fgCaptcha.sitekey;
        // Create new captcha     
        setTimeout(function () {
            grecaptcha.render(window["fgCaptcha.id"], {
                'theme': "dark",
                'sitekey': window["fgCaptcha.sitekey"]
            });
        }, 1000);

        elementContainerJqObj.append(captchaJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(captchaElementContainer) {

        // Get fgElement
        let captchaElement = FgUtilityConvertor.getFgElChild(captchaElementContainer);

        if (FgUtilityConvertor.getFgElType(captchaElement) !== FgCaptcha.getType())
            console.error("The type of this element isn't CAPTCHA for converting.");

        let fgCaptcha = FgCaptcha.createCaptcha(captchaElement.attr("id"), '',
            captchaElement.attr("class"),
            captchaElement.attr("data-language"),
            captchaElement.attr("data-sitekey"),
            captchaElement.attr("data-privatekey"),
            FgCommon.getVisibilityCodeObjectFromElement(captchaElement));

        let captchaEditMode = FgCaptchaEditMode.createCaptcha(fgCaptcha,
            captchaElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(captchaElementContainer)
        );

        return captchaEditMode;
    }

    // Fill setting pop up by Captcha attributes
    generateElementEditPopUp(type, element, modalBody) {
        modalBody
            .append(FgCommon.createClassNameDiv_EditPopUp(element)) // Class name
            .append(FgCaptchaEditModeConvertor.createSitekeyCaptchaDiv_EditPopUp(type, element)) // site key
            .append(FgCaptchaEditModeConvertor.createPrivatekeyCaptchaDiv_EditPopUp(type, element))//private key
            .append(FgCaptchaEditModeConvertor.createLanguagesGoogleCaptchaDiv_EditPopUp(type, element))//language of Google Captcha
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element));//expression Visibility Code
        //Create ID Txt
        modalBody.append(FgCommon.createElementIdDiv_EditPopUp(element));
        // Arranging cols in form group depend to number of cols
        var colsList = modalBody.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(modalBody, colsList, 2);
    }

    // Update Captcha Element atrributes
    updateElement_EditPopUp(element, type) {
        element.attr('data-sitekey', FgCommon.jq_getElementById(idElementEditForm.txtSitekey).val());
        element.attr('data-privatekey', FgCommon.jq_getElementById(idElementEditForm.txtPrivatekey).val());
        element.attr("class", $('#' + idElementEditForm.class).val());
        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);
        // Update language code
        FgCaptchaEditModeConvertor.updateGoogleCaptchaLanguage(element);
    }

    // At first, we need to get language code 
    // The language in Google captcha is in src attribute of ifram tag and is between "&hl=" and "&v"
    // I get language with Regex and it's pattern is /hl=(.*?)&/
    static updateGoogleCaptchaLanguage(element) {

        // Get GoogleCaptcha iframe
        var iframeGoogleCaptcha = $(element).find('iframe');

        // Get language code from iframe 
        var language = iframeGoogleCaptcha.length != 0 ? iframeGoogleCaptcha.attr("src").match(/hl=(.*?)&/).pop() : "";

        // Get selected language code from drop down in setting popup
        var selectedLanguage = FgCommon.jq_getElementById(idElementEditForm.ddllanguageListsGoogleCaptcha).val();
        $(element).attr('data-language', 'selectedLanguage');
        // Check if language code of element is not equal by selected language, we need to set new language code
        // We can supersede by selected language code
        if (language !== selectedLanguage) {
            // For setting new language 
            iframeGoogleCaptcha.attr("src", iframeGoogleCaptcha.attr("src").replace(/hl=(.*?)&/, 'hl=' + selectedLanguage + '&'));
        }
    }

    // This method used for showing GoogleCaptcha language
    static createLanguagesGoogleCaptchaDiv_EditPopUp(type, element) {
        //var sitekey = element.attr("sitekey");
        var selectedLanguage = $(element).find('iframe').length != 0 ? $(element).find('iframe').attr("src").match(/hl=(.*?)&/).pop() : '';
        var elementAttribute = FgCaptchaEditModeConvertor.createLanguagesGoogleCaptcha(idElementEditForm.ddllanguageListsGoogleCaptcha, selectedLanguage);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.languagesGoogleCaptcha, "fa fa-language");
        return formGroup;
    }

    // This method used for Google Captcha
    // For selecting language we need to a dropdoan that includes available language that Google supports them.
    static createLanguagesGoogleCaptcha(dropDownListId, selectedLanguage) {
        var select = FgCommon.createNewChild(new elementAttributes(htmlElementType.select, "form-control", dropDownListId));
        for (let key in languageListsGoogleCaptchaEnum) {
            var optionAttribute = new elementAttributes(htmlElementType.option);
            optionAttribute.text = key;
            optionAttribute.value = languageListsGoogleCaptchaEnum[key];
            var subTypeOption = FgCommon.createNewChild(optionAttribute);
            select.append(subTypeOption);
        }
        // Set selected language
        select.val(selectedLanguage);
        return select;
    }

    static createSitekeyCaptchaDiv_EditPopUp(type, element) {
        var sitekey = element.attr("data-sitekey");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtSitekey, sitekey);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.sitekeyCaptchaDiv, "fa fa-key");
        return formGroup;
    }

    static createPrivatekeyCaptchaDiv_EditPopUp(type, element) {
        var sitekey = element.attr("data-privatekey");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtPrivatekey, sitekey);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.privatekeyCaptchaDiv, "fa fa-key");
        return formGroup;
    }
}
// This enum used for choising language Google captcha
var languageListsGoogleCaptchaEnum = {
    Arabic: "ar",
    Afrikaans: "af",
    Amharic: "am",
    Armenian: "hy",
    Azerbaijani: "az",
    Basque: "eu",
    Bengali: "bn",
    Bulgarian: "bg",
    Catalan: "ca",
    Chinese_HongKong: "zh-HK",
    Chinese_Simplified: "zh-CN",
    Chinese_Traditional: "zh-TW",
    Croatian: "hr",
    Czech: "cs",
    Danish: "da",
    Dutch: "nl",
    English_UK: "en-GB",
    English_US: "en",
    Estonian: "et",
    Filipino: "fil",
    Finnish: "fi",
    French: "fr",
    French_Canadian: "fr-CA",
    Galician: "gl",
    Georgian: "ka",
    German: "de",
    German_Austria: "de-AT",
    German_Switzerland: "de-CH",
    Greek: "el",
    Gujarati: "gu",
    Hebrew: "iw",
    Hindi: "hi",
    Hungarain: "hu",
    Icelandic: "is",
    Indonesian: "id",
    Italian: "it",
    Japanese: "ja",
    Kannada: "kn",
    Korean: "ko",
    Laothian: "lo",
    Latvian: "lv",
    Lithuanian: "lt",
    Malay: "ms",
    Malayalam: "ml",
    Marathi: "mr",
    Mongolian: "mn",
    Norwegian: "no",
    Persian: "fa",
    Polish: "pl",
    Portuguese: "pt",
    Portuguese_Brazil: "pt-BR",
    Portuguese_Portugal: "pt-PT",
    Romanian: "ro",
    Russian: "ru",
    Serbian: "sr",
    Sinhalese: "si",
    Slovak: "sk",
    Slovenian: "sl",
    Spanish: "es",
    Spanish_LatinAmerica: "es-419",
    Swahili: "sw",
    Swedish: "sv",
    Tamil: "ta",
    Telugu: "te",
    Thai: "th",
    Turkish: "tr",
    Ukrainian: "uk",
    Urdu: "ur",
    Vietnamese: "vi",
    Zulu: "zu",
};

export default FgCaptchaEditModeConvertor