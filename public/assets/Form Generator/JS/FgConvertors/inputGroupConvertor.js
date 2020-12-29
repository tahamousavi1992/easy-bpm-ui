
'use strict';

import AbstractConvertorFactory from "./abstractConvertorFactory.js"
import InputGroup from "./inputGroup.js"
import FgUtilityConvertor from "./fgUtilityConvertor.js"

class InputGroupConvertor extends AbstractConvertorFactory {

    toJQueryObject(inputGroupElement) {
        if (inputGroupElement.fontIconCssClass != null) {
            return $(document.createElement('div'))
                .addClass('input-group')
                .append($(document.createElement('div')).addClass('input-group-prepend').append($(document.createElement('span'))
                    .addClass('input-group-text').append($(document.createElement('i')).addClass(inputGroupElement.fontIconCssClass))))
                .append(inputGroupElement.element);
 
        }
    }

    fromJQueryObject(jQueryElement) {
        return InputGroup.createInputGroup(jQueryElement.find('i').attr('class'), FgUtilityConvertor.getFgElChild(jQueryElement));
    }

}


export default InputGroupConvertor