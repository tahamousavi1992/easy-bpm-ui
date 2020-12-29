
'use strict';

import AbstractConvertorFactory from "./abstractConvertorFactory.js"
import { fgAttributeName, fgCssClassName } from "../FgElementsEditMode/fgElementEditModes.js"
import ElementToolbarConvertor from "./elementToolbarConvertor.js"
import ElementPlaceholderConvertor from "./ElementPlaceholderConvertor.js"
import ElementContainer from "../FgElementsEditMode/elementContainer.js"

class FgElementContainerConvertor extends AbstractConvertorFactory {

    toJQueryObject(fgElementContainer) {
        let fgContainerElementJqueryObj = $(document.createElement('div'))
            .addClass(fgCssClassName.container)
            .append(new ElementToolbarConvertor().toJQueryObject(fgElementContainer.elementToolbar))
            .append(new ElementPlaceholderConvertor().toJQueryObject(fgElementContainer.elementPlaceHolder));

        if (fgElementContainer.cssClass) {
            fgContainerElementJqueryObj.addClass(fgElementContainer.cssClass)
        }
        return fgContainerElementJqueryObj;

    }

    fromJQueryObject(jQueryElement) {
        return ElementContainer.creatElementContainer(jQueryElement.attr('class')
            , new ElementToolbarConvertor().fromJQueryObject(jQueryElement.find('.' + fgCssClassName.elementToolbar))
            , new ElementPlaceholderConvertor().fromJQueryObject(jQueryElement.find('.' + fgCssClassName.placeholder))
        );
    }

}

export default FgElementContainerConvertor