
'use strict';
import AbstractConvertorFactory from "./abstractConvertorFactory.js"
import { fgAttributeName, fgCssClassName } from "../FgElementsEditMode/fgElementEditModes.js"
import HelpText from "./helpText.js"

class HelpTextConvertor extends AbstractConvertorFactory {

    toJQueryObject(helpTextElement) {
        let help = document.createElement('i');
        help.classList.add(fgCssClassName.tooltip);
        help.classList.add('fa');
        help.classList.add('fa-exclamation-circle');
        help.setAttribute('data-toggle', 'tooltip');
        help.setAttribute('data-title', helpTextElement.helpMessageText);
        return $(help);
    }

    fromJQueryObject(jQueryElement) {
        let helpText = jQueryElement.find('i').data('original-title');
        if (helpText == '' || helpText == null)
            helpText = jQueryElement.find('i').data('title');
        return HelpText.createHelperText(helpText);
    }

}


export default HelpTextConvertor