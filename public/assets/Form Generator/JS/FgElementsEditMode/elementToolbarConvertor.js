
'use strict';

import elementToolbarButton from "../FgElementsEditMode/fgElementEditMode.js"
import AbstractConvertorFactory from "./abstractConvertorFactory.js"
import { fgAttributeName, fgCssClassName } from "../FgElementsEditMode/fgElementEditModes.js"
  
class FgElementToolbarConvertor extends AbstractConvertorFactory {

    toJQueryObject(fgElementToolbarButtonContainer) {
        var toolbar = $(document.createElement('div'))
            .addClass(fgCssClassName.elementToolbar);

        for (let button of fgElementToolbarButtonContainer.buttons) {
            toolbar.append(new fgElementToolbarButtonConvertor().toJQueryObject(button));
        }
        return toolbar;
    }

    fromJQueryObject(jQueryElement) {
        buttons = [];
        $.each(jQueryElement.children(), function () {
            buttons.push(new fgElementToolbarButtonConvertor().fromJQueryObject(button));
        });

        return new elementToolbar(buttons);
    }
}

class fgElementToolbarButtonConvertor extends AbstractConvertorFactory {

    toJQueryObject(fgElementToolbarButtonContainer) {
        return $(document.createElement('a'))
            .text(fgElementToolbarButtonContainer.text)
            .addClass(fgElementToolbarButtonContainer.cssClass);
    }

    fromJQueryObject(jQueryElement) {
        elementToolbarButton
        return new elementToolbarButton(jQueryElement.text, jQueryElement.attr('class'));
    }
}

export default FgElementToolbarConvertor