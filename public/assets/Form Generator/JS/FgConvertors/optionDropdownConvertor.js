

'use strict';
import AbstractConvertorFactory from "./abstractConvertorFactory.js"
import OptionDropdown from "../FgElements/dropdown/optionDropdown.js"

class OptionDropdownConvertor extends AbstractConvertorFactory {

    toJQueryObject(optionDropdownElement) {
        let optionDropdown = $(document.createElement('option'))
            .val(optionDropdownElement.value)
            .text(optionDropdownElement.label);

        if (optionDropdownElement.selected) {
            optionDropdown.prop("selected", true);
        }
        return optionDropdown;
    }

    fromJQueryObject(jQueryElement) {
        return new OptionDropdown(jQueryElement.text(), jQueryElement.attr('value'), jQueryElement.attr("selected")!=null);
    }

}

export default OptionDropdownConvertor