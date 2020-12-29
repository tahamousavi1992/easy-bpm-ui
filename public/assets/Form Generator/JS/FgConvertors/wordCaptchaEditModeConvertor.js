'use strict';

import { ElementEditModeConvertor, FgElementContainerConvertor } from "./elementEditModeConvertor.js";

import FgWordCaptchaEditMode from "../FgElementsEditMode/wordCaptchaEditMode.js"
import FgWordCaptcha from "../FgElements/wordCaptcha.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"
import FgCommon, { eventAttribute, eventType, idElementEditForm, htmlElementType, elementAttributes, inputTypeEnum, buttonTypeEnum, textBoxTypeEnum, customOption, iconFontSettingTypeEnum, BootstrapTab } from "../FgCommon.js"
import lang from "../../../JS/Languages/lang.js";
class FgWordCaptchaEditModeConvertor extends ElementEditModeConvertor {

    constructor() {
        super();
    }

    toJQueryObject(fgWordCaptchaElementEditMode) {
        let elementContainerJqObj = new FgElementContainerConvertor().toJQueryObject(fgWordCaptchaElementEditMode.elementContainer);
        let elPlaceholderJqObj = FgUtilityConvertor.getFgElPlaceholder(elementContainerJqObj);
        // Captcha
        let fgWordCaptcha = fgWordCaptchaElementEditMode.fgElement;

        let captchaJQueryObject = FgUtilityConvertor.createDefaultFgElementEditModeJqueryObj(fgWordCaptchaElementEditMode)
            .attr("data-expressionVisibilityCode", fgWordCaptcha.expressionVisibilityCode)
            .attr("data-length", fgWordCaptcha.length);
        captchaJQueryObject.attr('class', '');
        FgWordCaptchaEditModeConvertor.createContainer(captchaJQueryObject, fgWordCaptcha);
        FgCommon.setVisibilityCodeObjectToElement(captchaJQueryObject, fgWordCaptcha.expressionVisibilityCode);

        elementContainerJqObj.append(captchaJQueryObject);

        return elementContainerJqObj;
    }

    fromJQueryObject(captchaElementContainer) {
        // Get fgElement
        let captchaElement = FgUtilityConvertor.getFgElChild(captchaElementContainer);

        if (FgUtilityConvertor.getFgElType(captchaElement) !== FgWordCaptcha.getType())
            console.error("The type of this element isn't CAPTCHA for converting.");

        let fgWordCaptcha = FgWordCaptcha.createCaptcha(captchaElement.attr("id"), '',
            captchaElement.get(0).querySelector('input').className,
            captchaElement.attr('data-length'),
            FgCommon.getVisibilityCodeObjectFromElement(captchaElement));

        let captchaEditMode = FgWordCaptchaEditMode.createCaptcha(fgWordCaptcha,
            captchaElementContainer.attr('class'),
            FgUtilityConvertor.getFgElPlaceholderCssClassName(captchaElementContainer)
        );

        return captchaEditMode;
    }

    // Fill setting pop up by Captcha attributes
    generateElementEditPopUp(type, element, modalBody) {
        modalBody
            .append(FgCommon.createClassNameDiv_EditPopUp($(element.get(0).querySelector('input')))) // Class name
            .append(FgCommon.createExpressionVisibilityCodeDiv_EditPopUp(element))//expression Visibility Code
            .append(FgWordCaptchaEditModeConvertor.createLengthDiv_EditPopUp(element));
        //Create ID Txt
        modalBody.append(FgCommon.createElementIdDiv_EditPopUp(element));
        // Arranging cols in form group depend to number of cols
        var colsList = modalBody.find('.col-sm-6');
        FgCommon.arrangeColsInFormGroupByColNumber(modalBody, colsList, 2);
    }

    // Update Captcha Element atrributes
    updateElement_EditPopUp(element, type) {
        debugger;
        element.get(0).querySelector('input').className = document.getElementById(idElementEditForm.class).value;
        // update visibility expression code
        FgCommon.updateVisibilityExpression_EditPopUp(element);

        element.get(0).setAttribute('data-length', document.getElementById(idElementEditForm.txtCaptchaLength).value);
    }

    static createContainer(element, fgElement) {
        return element.html(`<img src="${window["CaptchaUrl"]}?key=${element.attr('id')}" data-captcha="true" />
<div class='input-group'>
<div class="input-group-prepend">
<span class="input-group-text"><a href="javascript:;" class="refresh-captcha"> <i class="fa fa-refresh"></i></a></span>
</div>
<input  class="${fgElement.cssClass}" type="text"/></div>`);
    }


    //length of captcha
    static createLengthDiv_EditPopUp(element) {
        let length = element.attr("data-length");
        var elementAttribute = FgCommon.createInputControl(idElementEditForm.txtCaptchaLength, length);
        var formGroup = FgCommon.createDefaultColForElementAttribute_EditPopUp(elementAttribute, lang.FG.wordCaptchaLength, "fa fa-css3");
        return formGroup;
    }

}


export default FgWordCaptchaEditModeConvertor