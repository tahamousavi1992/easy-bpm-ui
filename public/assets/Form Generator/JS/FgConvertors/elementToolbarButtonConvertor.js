
'use strict';

import AbstractConvertorFactory from "./abstractConvertorFactory.js"

class ElementToolbarButtonConvertor extends AbstractConvertorFactory {

    toJQueryObject(fgElementToolbarButtonContainer) {
        return $(document.createElement('a'))
            .html(fgElementToolbarButtonContainer.text)
            .addClass(fgElementToolbarButtonContainer.cssClass);
    }

    fromJQueryObject(jQueryElement) {
        return new elementToolbarButton(jQueryElement.text, jQueryElement.attr('class'));
    }
}

export default ElementToolbarButtonConvertor