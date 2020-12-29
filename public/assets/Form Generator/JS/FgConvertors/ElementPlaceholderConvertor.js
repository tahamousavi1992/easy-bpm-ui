
'use strict';

import AbstractConvertorFactory from "./abstractConvertorFactory.js"
import { fgAttributeName, fgCssClassName } from "../FgElementsEditMode/fgElementEditModes.js"

class ElementPlaceHolderConvertor extends AbstractConvertorFactory {

    toJQueryObject(fgElementPlaceHolder) {
        return $(document.createElement('div'))
            .addClass(fgCssClassName.placeholder)
            .addClass(fgElementPlaceHolder.cssClass);
    }

    fromJQueryObject(jQueryElement) {
        return new elementPlaceHolder(jQueryElement.attr('class'));
    }
}

export default ElementPlaceHolderConvertor