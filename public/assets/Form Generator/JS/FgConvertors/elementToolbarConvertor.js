
'use strict';

import AbstractConvertorFactory from "./abstractConvertorFactory.js"
import { fgAttributeName, fgCssClassName } from "../FgElementsEditMode/fgElementEditModes.js"
import ElementToolbarButtonConvertor from "./elementToolbarButtonConvertor.js"

class ElementToolbarConvertor extends AbstractConvertorFactory {

    toJQueryObject(fgElementToolbarButtonContainer) {
        var toolbar = $(document.createElement('div'))
            .addClass(fgCssClassName.elementToolbar);

        for (let button of fgElementToolbarButtonContainer.buttons) {
            toolbar.append(new ElementToolbarButtonConvertor().toJQueryObject(button));
        }
        return toolbar;
    }

    fromJQueryObject(jQueryElement) {
        buttons = [];
        $.each(jQueryElement.children(), function () {
            buttons.push(new ElementToolbarButtonConvertor().fromJQueryObject(button));
        });

        return new elementToolbar(buttons);
    }
}

export default ElementToolbarConvertor